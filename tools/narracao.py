"""Monta a narração de um Reels de avatar a partir dos áudios gerados separados (voz natural).

Uso:
    python tools/narracao.py "projetos/001. meu-reels" [--ts src/videos/<slug>/palavras.ts]

Lê <projeto>/narracao.json:
    {
      "saida": "video/narracao.wav",                     (opcional; padrão video/narracao.wav)
      "trechos": [
        {"nome": "gancho", "audio": "hf/audio_....mp3", "transcricao": "transcricao/<pasta>",
         "cortes": [[9.10, 13.95]]},                     (opcional: trechos [início, fim) a excluir, ex. voz embaralhada)
        ...
      ],
      "clipes": { ... }                                  (usado por tools/sincronizar_avatar.py)
    }

Para cada áudio: normaliza em -14 LUFS (pico -1,5 dBTP), corta os trechos ruins, junta as palavras em blocos de fala
e encurta toda pausa para ~0,2 s (PRE + POS). Depois concatena tudo na ordem.

Gera:
    <saida>                                  a narração final (WAV 48 kHz estéreo)
    transcricao/narracao/mapa.json           limites de cada trecho e o tempo de cada palavra na narração final
    --ts <arquivo>                           palavras.ts para o Remotion (PALAVRAS, TRECHOS e os helpers palavra/em)
"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

PRE, POS = 0.07, 0.13   # respiro antes/depois de cada bloco de fala → pausas de ~0,2 s (ritmo de Reels)
JUNTA = 0.30            # palavras separadas por menos que isso ficam no mesmo bloco (pausa natural preservada)
LOUDNORM = "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000"


def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True)


def blocos_de_fala(palavras, cortes):
    ws = [w for w in palavras if not any(a <= w["s"] < b for a, b in cortes)]
    blocos = []
    for w in ws:
        corte_entre = blocos and any(blocos[-1][1] <= a < w["s"] for a, _ in cortes)
        if blocos and w["s"] - blocos[-1][1] < JUNTA and not corte_entre:
            blocos[-1][1] = w["e"]
            blocos[-1][2].append(w)
        else:
            blocos.append([w["s"], w["e"], [w]])
    return blocos


def palavras_ts(mapa):
    tr = {x["nome"]: x for x in mapa["trechos"]}
    linhas = ",\n".join(f"  {{w: {json.dumps(p['w'], ensure_ascii=False)}, s: {p['s']}, e: {p['e']}}}" for p in mapa["palavras"])
    trechos = ", ".join(f"{n}: {x['inicio']}" for n, x in tr.items()) + f", fim: {mapa['trechos'][-1]['fim']}"
    return f"""// Gerado por tools/narracao.py a partir de transcricao/narracao/mapa.json. Não editar à mão.
export type Palavra = {{w: string; s: number; e: number}};

export const PALAVRAS: Palavra[] = [
{linhas},
];

// Início de cada trecho na narração (s). Os clipes sincronizados começam exatamente aqui.
export const TRECHOS = {{{trechos}}};

const norm = (w: string) => w.toLowerCase().replace(/[^a-zà-ú0-9]/g, '');

// Palavra falada (primeira ocorrência depois de `depois`): todo gatilho sai daqui, nunca de um número solto.
export const palavra = (texto: string, depois = -1): Palavra => {{
  const p = PALAVRAS.find((x) => x.s > depois && norm(x.w) === norm(texto));
  if (!p) throw new Error(`palavra não encontrada: ${{texto}} depois de ${{depois}}`);
  return p;
}};
export const em = (texto: string, depois = -1) => palavra(texto, depois).s;
"""


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    projeto = Path(sys.argv[1])
    cfg = json.loads((projeto / "narracao.json").read_text(encoding="utf-8"))
    saida = projeto / cfg.get("saida", "video/narracao.wav")
    tmp = Path(tempfile.mkdtemp(prefix="narracao-"))
    partes, palavras, trechos, t_out = [], [], [], 0.0

    for tr in cfg["trechos"]:
        nome, cortes = tr["nome"], [tuple(c) for c in tr.get("cortes", [])]
        src = tmp / f"{nome}.wav"
        ffmpeg("-i", projeto / tr["audio"], "-af", LOUDNORM, "-ac", "2", src)
        ws = json.loads((projeto / tr["transcricao"] / "palavras.json").read_text(encoding="utf-8"))
        inicio = t_out
        for a, b, bw in blocos_de_fala(ws, cortes):
            a0, b0 = max(0.0, a - PRE), b + POS
            for c, _ in cortes:  # a sobra do bloco não pode invadir um trecho cortado
                if a0 < c <= b0:
                    b0 = min(b0, c)
            dur = b0 - a0
            parte = tmp / f"p{len(partes):03d}.wav"
            ffmpeg("-i", src, "-af", f"atrim={a0}:{b0},asetpts=N/SR/TB,afade=t=in:d=0.012,afade=t=out:st={dur - 0.025:.3f}:d=0.025", parte)
            partes.append(parte)
            for w in bw:
                palavras.append({"w": w["w"], "s": round(t_out + w["s"] - a0, 3), "e": round(t_out + w["e"] - a0, 3), "trecho": nome})
            t_out += dur
        trechos.append({"nome": nome, "inicio": round(inicio, 3), "fim": round(t_out, 3)})

    lista = tmp / "lista.txt"
    lista.write_text("".join(f"file '{p}'\n" for p in partes))
    saida.parent.mkdir(parents=True, exist_ok=True)
    ffmpeg("-f", "concat", "-safe", "0", "-i", lista, "-c:a", "pcm_s16le", saida)

    mapa = {"trechos": trechos, "palavras": palavras}
    pasta = projeto / "transcricao" / "narracao"
    pasta.mkdir(parents=True, exist_ok=True)
    (pasta / "mapa.json").write_text(json.dumps(mapa, ensure_ascii=False, indent=1), encoding="utf-8")
    if "--ts" in sys.argv:
        Path(sys.argv[sys.argv.index("--ts") + 1]).write_text(palavras_ts(mapa), encoding="utf-8")

    for x in trechos:
        print(f"{x['nome']:>12}: {x['inicio']:6.2f} – {x['fim']:6.2f} s")
    print(f"narração: {t_out:.2f} s -> {saida}")


if __name__ == "__main__":
    main()
