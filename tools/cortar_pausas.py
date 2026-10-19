"""Corta as pausas longas de uma voz gerada, para o ritmo de Reels.

Uso:
    python tools/cortar_pausas.py "<entrada>.mp3" "<saida>.wav" [--pausa 0.2] [--min 0.25]
           [--frases transcricao/<voz>/palavras.json] [--pausa-frase 0.45] [--velocidade 0.95]

Respiração e ruído antes da primeira e depois da última fala saem.
Toda pausa com mais de --min segundos vira uma pausa de --pausa segundos
(0,13 s depois da fala + 0,07 s antes da próxima). A pausa é medida pela
energia do próprio áudio, quadro a quadro (10 ms), e não pelos tempos do
Whisper, que às vezes marcam o começo da palavra tarde e cortam sílabas.

Cadência (opcional): --frases <palavras.json da voz original> garante uma pausa
maior (--pausa-frase, padrão 0,45 s) depois de cada ponto final ou interrogação,
inserindo silêncio no ponto mais silencioso quando a voz emenda as frases; e
--velocidade 0.95 deixa a fala 5% mais lenta sem mudar o tom. Use quando o
vídeo apresenta algo novo e precisa respirar (ex.: destaques 1 e 2 do projeto 002).

Cortes suaves (opcional): --cauda 0.8 mantém mais da pausa logo depois da palavra
(o fim de "nova", "mais" etc. não some), --limiar 30 trata o fim baixinho das
palavras como fala e --fade 0.04 deixa a saída de cada trecho menos abrupta.
Padrão dos Reels de dica desde o 012: --cauda 0.8 --limiar 30 --fade 0.04.

Rode em TODA voz baixada da Higgsfield, antes de transcrever. A saída é a
voz oficial do vídeo; o arquivo original nunca é alterado.
"""
import argparse
import array
import json
import math
import subprocess
import sys

TAXA = 16000          # análise em mono 16 kHz
QUADRO = 0.01         # 10 ms
ABAIXO_DO_PICO = 28   # dB abaixo do percentil 90 = silêncio
ABAIXO_DO_PICO_BORDAS = 20  # no começo e no fim, respiração também sai


def energia(caminho):
    bruto = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', caminho, '-ac', '1', '-ar', str(TAXA), '-f', 's16le', '-'],
        capture_output=True, check=True).stdout
    amostras = array.array('h', bruto[:len(bruto) // 2 * 2])
    n = int(TAXA * QUADRO)
    db = []
    for i in range(0, len(amostras) - n + 1, n):
        bloco = amostras[i:i + n]
        rms = math.sqrt(sum(a * a for a in bloco) / n) / 32768
        db.append(20 * math.log10(rms + 1e-9))
    return db, len(amostras) / TAXA


def pausas(db, minimo, abaixo=ABAIXO_DO_PICO):
    limiar = sorted(db)[int(len(db) * 0.9)] - abaixo
    trechos, i = [], 0
    while i < len(db):
        if db[i] < limiar:
            j = i
            while j < len(db) and db[j] < limiar:
                j += 1
            if (j - i) * QUADRO >= minimo:
                trechos.append((i * QUADRO, j * QUADRO))
            i = j
        else:
            i += 1
    return trechos


def fins_de_frase(caminho, db, total):
    """Pontos de corte entre uma frase e a próxima (palavra terminada em . ? ! e a seguinte), no quadro mais silencioso."""
    palavras = json.loads(open(caminho, encoding='utf-8').read())
    cortes = []
    for w, prox in zip(palavras, palavras[1:]):
        if not w['w'].rstrip().endswith(('.', '?', '!')):
            continue
        a = max(0, int((w['e'] - 0.06) / QUADRO))
        b = min(len(db) - 1, int((prox['s'] + 0.06) / QUADRO))
        if b <= a:
            continue
        k = min(range(a, b + 1), key=lambda j: db[j])
        cortes.append(min(total, k * QUADRO + QUADRO / 2))
    return cortes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('entrada')
    ap.add_argument('saida')
    ap.add_argument('--pausa', type=float, default=0.2, help='duração de cada pausa depois do corte (s)')
    ap.add_argument('--min', type=float, default=0.25, help='pausas maiores que isso são encurtadas (s)')
    ap.add_argument('--frases', help='palavras.json da voz ORIGINAL: garante --pausa-frase depois de cada fim de frase')
    ap.add_argument('--pausa-frase', type=float, default=0.45, help='pausa depois de ponto final/interrogação, com --frases (s)')
    ap.add_argument('--velocidade', type=float, default=1.0, help='ritmo da fala (0,95 = 5%% mais lenta, mesmo tom de voz)')
    ap.add_argument('--cauda', type=float, default=0.65, help='fração da pausa mantida DEPOIS da fala (o resto fica antes da próxima); maior = fim de palavra menos cortado')
    ap.add_argument('--limiar', type=float, default=ABAIXO_DO_PICO, help='dB abaixo do pico que contam como silêncio; maior = fins de palavra baixinhos contam como fala')
    ap.add_argument('--fade', type=float, default=0.012, help='fade de saída de cada trecho (s); maior = corte menos abrupto')
    a = ap.parse_args()

    db, total = energia(a.entrada)
    # Começo e fim: respiração e ruído baixo também saem (fala = até 20 dB abaixo do pico).
    fala = sorted(db)[int(len(db) * 0.9)] - ABAIXO_DO_PICO_BORDAS
    idx = [i for i, d in enumerate(db) if d > fala]
    ini_fala, fim_fala = idx[0] * QUADRO, (idx[-1] + 1) * QUADRO
    frases = fins_de_frase(a.frases, db, total) if a.frases else []

    # Pausas medidas (ini, fim) e pontos de fim de frase sem pausa medida (c, c). Cada item vira ("audio", ini, fim) ou ("silencio", s).
    eventos = [(ini, fim) for ini, fim in pausas(db, a.min, a.limiar) if fim > ini_fala and ini < fim_fala - QUADRO]
    eh_frase = lambda ini, fim: any(ini - 0.08 <= c <= fim + 0.08 for c in frases)
    eventos += [(c, c) for c in frases if not any(ini - 0.08 <= c <= fim + 0.08 for ini, fim in eventos) and ini_fala < c < fim_fala]
    eventos.sort()

    pre0 = a.pausa * (1 - a.cauda)
    partes, cursor = [], max(0.0, ini_fala - pre0)
    for ini, fim in eventos:
        alvo = a.pausa_frase if (a.frases and eh_frase(ini, fim)) else a.pausa
        if fim - ini >= alvo:                 # pausa longa: encurta para o alvo
            partes.append(('audio', cursor, ini + alvo * a.cauda))
            cursor = fim - alvo * (1 - a.cauda)
        else:                                 # pausa curta no fim de frase: completa com silêncio no meio
            meio = (ini + fim) / 2
            partes += [('audio', cursor, meio), ('silencio', alvo - (fim - ini) - (0.05 if fim == ini else 0))]
            cursor = meio
    partes.append(('audio', cursor, min(total, fim_fala + a.pausa * a.cauda)))
    partes = [p for p in partes if p[0] == 'audio' or p[1] > 0.01]

    filtro = ''
    for k, p in enumerate(partes):
        if p[0] == 'audio':
            filtro += f'[0:a]atrim={p[1]:.3f}:{p[2]:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.008,areverse,afade=t=in:d={a.fade:.3f},areverse[s{k}];'
        else:
            filtro += f'[0:a]atrim=0:{p[1]:.3f},asetpts=PTS-STARTPTS,volume=0[s{k}];'
    filtro += ''.join(f'[s{k}]' for k in range(len(partes))) + f'concat=n={len(partes)}:v=0:a=1'
    filtro += f',atempo={a.velocidade}[o]' if a.velocidade != 1.0 else '[o]'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.entrada, '-filter_complex', filtro,
                    '-map', '[o]', '-ar', '48000', a.saida], check=True)

    novo = sum((p[2] - p[1]) if p[0] == 'audio' else p[1] for p in partes) / a.velocidade
    n_frases = sum(1 for ini, fim in eventos if a.frases and eh_frase(ini, fim))
    print(f'{a.entrada}: {total:.2f} s -> {novo:.2f} s ({len(eventos)} pausas ajustadas, {n_frases} de fim de frase) -> {a.saida}')


if __name__ == '__main__':
    sys.exit(main())
