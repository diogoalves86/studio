"""Corta as pausas longas de uma voz gerada, para o ritmo de Reels.

Uso:
    python tools/cortar_pausas.py "<entrada>.mp3" "<saida>.wav" [--pausa 0.2] [--min 0.25]

Respiração e ruído antes da primeira e depois da última fala saem.
Toda pausa com mais de --min segundos vira uma pausa de --pausa segundos
(0,13 s depois da fala + 0,07 s antes da próxima). A pausa é medida pela
energia do próprio áudio, quadro a quadro (10 ms), e não pelos tempos do
Whisper, que às vezes marcam o começo da palavra tarde e cortam sílabas.

Rode em TODA voz baixada da Higgsfield, antes de transcrever. A saída é a
voz oficial do vídeo; o arquivo original nunca é alterado.
"""
import argparse
import array
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


def pausas(db, minimo):
    limiar = sorted(db)[int(len(db) * 0.9)] - ABAIXO_DO_PICO
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('entrada')
    ap.add_argument('saida')
    ap.add_argument('--pausa', type=float, default=0.2, help='duração de cada pausa depois do corte (s)')
    ap.add_argument('--min', type=float, default=0.25, help='pausas maiores que isso são encurtadas (s)')
    a = ap.parse_args()

    pos, pre = a.pausa * 0.65, a.pausa * 0.35
    db, total = energia(a.entrada)
    # Começo e fim: respiração e ruído baixo também saem (fala = até 20 dB abaixo do pico).
    fala = sorted(db)[int(len(db) * 0.9)] - ABAIXO_DO_PICO_BORDAS
    idx = [i for i, d in enumerate(db) if d > fala]
    ini_fala, fim_fala = idx[0] * QUADRO, (idx[-1] + 1) * QUADRO
    manter, cursor = [], max(0.0, ini_fala - pre)
    for ini, fim in pausas(db, a.min):
        if fim <= ini_fala:                   # antes da primeira fala: já descartado
            continue
        if ini >= fim_fala - QUADRO:          # depois da última fala: tratado abaixo
            break
        manter.append((cursor, ini + pos))
        cursor = fim - pre
    manter.append((cursor, min(total, fim_fala + pos)))

    filtro = ''.join(
        f'[0:a]atrim={i:.3f}:{f:.3f},asetpts=PTS-STARTPTS,'
        f'afade=t=in:d=0.008,areverse,afade=t=in:d=0.012,areverse[s{k}];'
        for k, (i, f) in enumerate(manter))
    filtro += ''.join(f'[s{k}]' for k in range(len(manter))) + f'concat=n={len(manter)}:v=0:a=1[o]'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.entrada, '-filter_complex', filtro,
                    '-map', '[o]', '-ar', '48000', a.saida], check=True)

    novo = sum(f - i for i, f in manter)
    print(f'{a.entrada}: {total:.2f} s -> {novo:.2f} s ({len(manter) - 1} pausas encurtadas) -> {a.saida}')


if __name__ == '__main__':
    sys.exit(main())
