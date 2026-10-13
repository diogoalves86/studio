"""Sincroniza a boca dos clipes do avatar (Seedance 2 Mini) com a narração de voz natural, quadro a quadro.

Uso:
    python tools/sincronizar_avatar.py "projetos/001. meu-reels" [trecho ...]

Rode depois de tools/narracao.py. Lê os clipes em <projeto>/narracao.json:
    "clipes": {
      "gancho": {"video": "hf/mini_....mp4", "transcricao": "transcricao/<pasta>", "saida": "hf/sync_gancho.mp4"}
    }
"transcricao" é a transcrição do PRÓPRIO clipe (o som que o Seedance gerou junto, que bate com a boca).

Como funciona:
 1. mapa inicial por palavras em comum (início e fim de cada uma) entre a fala do clipe e a narração;
 2. DTW em espectrograma log-mel (40 bandas + variação, normalizado por voz) numa faixa de ±0,25 s em volta desse mapa;
 3. suaviza a curva (mediana 70 ms + gaussiana σ 50 ms), sempre crescente;
 4. gera o vídeo a 30 fps escolhendo, para cada quadro da narração, o quadro do clipe naquele instante.

Relatório em transcricao/narracao/sincronia.md:
 - atraso restante entre a fala do clipe distorcida e a narração (janelas de 0,5 s). Meta: mediana ≤ 10 ms e
   no máximo ~5% de janelas acima de 45 ms;
 - momentos em que o clipe fica congelado (< 0,65×) ou acelerado (> 1,6×). Esses são os trechos que "denunciam a IA"
   e, pelo padrão (guias/6-padrao-reels-avatar.md), ficam cobertos por motion em tela cheia ou com o avatar em card.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np

SR, HOP, WIN = 16000, 160, 400
BANDA = 0.25            # o DTW só procura ±0,25 s em volta do mapa por palavras
FPS = 30
LENTO, RAPIDO = 0.65, 1.6


def audio(src, ini=None, dur=None):
    cmd = ["ffmpeg", "-v", "error"] + (["-ss", str(ini), "-t", str(dur)] if ini is not None else [])
    cmd += ["-i", str(src), "-vn", "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32)


def logmel(x):
    x = np.pad(x, (WIN // 2, WIN // 2))
    n = 1 + (len(x) - WIN) // HOP
    fr = np.lib.stride_tricks.as_strided(x, (n, WIN), (x.strides[0] * HOP, x.strides[0])) * np.hanning(WIN)
    sp = np.abs(np.fft.rfft(fr, 512)) ** 2
    mel = lambda f: 2595 * np.log10(1 + f / 700)
    imel = lambda m: 700 * (10 ** (m / 2595) - 1)
    pts = np.floor(513 * imel(np.linspace(mel(80), mel(7600), 42)) / SR).astype(int)
    fb = np.zeros((40, 257))
    for i in range(40):
        a, b, c = pts[i], pts[i + 1], pts[i + 2]
        fb[i, a:b] = np.linspace(0, 1, b - a, endpoint=False)
        fb[i, b:c] = np.linspace(1, 0, c - b, endpoint=False)
    f = np.log(sp @ fb.T + 1e-8)
    f = f - f.mean(0)                                   # tira o timbre de cada voz
    d = np.diff(f, axis=0, prepend=f[:1])               # variação: marca sílabas
    v = np.hstack([f, 2 * d])
    return v / (np.linalg.norm(v, axis=1, keepdims=True) + 1e-8)


def mapa_palavras(alvo, nativo, inicio):
    n = lambda w: re.sub(r"[^\wà-ú]", "", w.lower())
    anc, j = [], 0
    for w in nativo:
        for k in range(j, min(j + 3, len(alvo))):
            if n(alvo[k]["w"]) == n(w["w"]):
                a = alvo[k]
                anc += [(a["s"] - inicio, w["s"]), (a["e"] - inicio, w["e"])]
                j = k + 1
                break
    anc.sort()
    pts = []
    for u, s in anc:
        if not pts or (u > pts[-1][0] + 0.02 and s > pts[-1][1] + 0.02):
            pts.append((u, s))
    return np.array([p[0] for p in pts]), np.array([p[1] for p in pts])


def dtw_faixa(A, B, s0):
    nb, INF, b = len(B), 1e9, int(BANDA * SR / HOP)
    centro = (s0 * SR / HOP).astype(int)
    lo, hi = np.clip(centro - b, 0, nb - 1), np.clip(centro + b, 0, nb - 1)
    D = np.full((len(A), nb), INF)
    trace = np.zeros((len(A), nb), np.int8)
    for i in range(len(A)):
        js = np.arange(lo[i], hi[i] + 1)
        c = 1 - B[js] @ A[i]
        if i == 0:
            D[0, js] = np.cumsum(c)
            trace[0, js] = 2
            continue
        diag, cima = D[i - 1, np.maximum(js - 1, 0)], D[i - 1, js]
        for kk, jj in enumerate(js):
            esq = D[i, jj - 1] if kk > 0 else INF
            opc = (diag[kk], cima[kk], esq)
            m = int(np.argmin(opc))
            D[i, jj] = c[kk] + opc[m]
            trace[i, jj] = m
    i, jj = len(A) - 1, int(np.argmin(D[-1, lo[-1]:hi[-1] + 1]) + lo[-1])
    s = np.zeros(len(A))
    while i >= 0:
        s[i] = max(s[i], jj * HOP / SR)
        if i == 0:
            break
        m = trace[i, jj]
        if m == 0:
            i, jj = i - 1, jj - 1
        elif m == 1:
            i -= 1
        else:
            jj -= 1
    return s


def suavizar(s):
    k = 7
    pad = np.pad(s, k, mode="edge")
    s = np.array([np.median(pad[x:x + 2 * k + 1]) for x in range(len(s))])
    sig = 5
    g = np.exp(-0.5 * (np.arange(-4 * sig, 4 * sig + 1) / sig) ** 2)
    g /= g.sum()
    return np.maximum.accumulate(np.convolve(np.pad(s, 4 * sig, mode="edge"), g, mode="valid"))


def atraso(alvo, nat, tu, s):
    def env(x):
        e = np.sqrt(np.convolve(x ** 2, np.ones(160) / 160, "same"))[::80]
        e = np.log(e + 1e-4)
        return np.diff(e, prepend=e[0]).clip(0)
    t = np.arange(len(alvo)) / SR
    warp = np.interp(np.interp(t, tu, s) * SR, np.arange(len(nat)), nat).astype(np.float32)
    ea, ew = env(alvo), env(warp)
    lags = []
    for c in range(0, len(ea) - 100, 50):
        a, b = ea[c:c + 100], ew[c:c + 100]
        if a.sum() < 1:
            continue
        xc = [np.dot(a[max(0, -L):100 - max(0, L)], b[max(0, L):100 - max(0, -L)]) for L in range(-30, 31)]
        lags.append((np.argmax(xc) - 30) * 5)
    return np.abs(np.array(lags))


def momentos_artificiais(tu, s, inicio, palavras):
    v = np.convolve(np.gradient(s, tu), np.ones(10) / 10, "same")
    ruim = (v > RAPIDO) | (v < LENTO)
    out, ini = [], None
    for i, r in enumerate(ruim):
        if r and ini is None:
            ini = i
        if (not r or i == len(ruim) - 1) and ini is not None:
            if tu[i] - tu[ini] > 0.12:
                a, b = tu[ini] + inicio, tu[i] + inicio
                fala = " ".join(w["w"] for w in palavras if w["e"] > a and w["s"] < b)
                out.append((a, b, v[ini:i].min(), v[ini:i].max(), fala))
            ini = None
    return out


def gerar_video(clipe, saida, tu, s, dur_u):
    st = json.loads(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries",
                                    "stream=width,height,r_frame_rate,nb_frames", "-of", "json", str(clipe)],
                                   capture_output=True, text=True).stdout)["streams"][0]
    W, H = st["width"], st["height"]
    nn, dd = map(int, st["r_frame_rate"].split("/"))
    fps_s, nf = nn / dd, int(st["nb_frames"])
    idx = [min(nf - 1, int(round(np.interp(q / FPS, tu, s) * fps_s))) for q in range(int(round(dur_u * FPS)))]
    dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(clipe), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
                            "-i", "-", "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p", str(saida)],
                           stdin=subprocess.PIPE)
    tam, atual, quadro = W * H * 3, -1, None
    for q in idx:
        while atual < q:
            quadro = dec.stdout.read(tam)
            atual += 1
        enc.stdin.write(quadro)
    enc.stdin.close()
    enc.wait()
    dec.kill()


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    projeto = Path(sys.argv[1])
    cfg = json.loads((projeto / "narracao.json").read_text(encoding="utf-8"))
    pasta = projeto / "transcricao" / "narracao"
    mapa = json.loads((pasta / "mapa.json").read_text(encoding="utf-8"))
    narracao = projeto / cfg.get("saida", "video/narracao.wav")
    escolhidos = sys.argv[2:] or list(cfg["clipes"])
    relatorio = ["# Sincronia do avatar", "", "Gerado por `tools/sincronizar_avatar.py`.", ""]

    for nome in escolhidos:
        c = cfg["clipes"][nome]
        tr = next(x for x in mapa["trechos"] if x["nome"] == nome)
        alvo = [w for w in mapa["palavras"] if w["trecho"] == nome]
        nativo = json.loads((projeto / c["transcricao"] / "palavras.json").read_text(encoding="utf-8"))
        dur_u = tr["fim"] - tr["inicio"]

        voz = audio(narracao, tr["inicio"], dur_u)
        fala_clipe = audio(projeto / c["video"])
        A, B = logmel(voz), logmel(fala_clipe)
        U, S = mapa_palavras(alvo, nativo, tr["inicio"])
        tu = np.arange(len(A)) * HOP / SR
        s0 = np.interp(tu, U, S)
        s0[tu < U[0]] = np.maximum(0, S[0] - (U[0] - tu[tu < U[0]]))
        s0[tu > U[-1]] = S[-1] + tu[tu > U[-1]] - U[-1]
        s = suavizar(dtw_faixa(A, B, s0))

        gerar_video(projeto / c["video"], projeto / c["saida"], tu, s, dur_u)
        lag = atraso(voz, fala_clipe, tu, s)
        vel = np.diff(s) / (HOP / SR)
        resumo = (f"atraso mediano {np.median(lag):.0f} ms · janelas > 45 ms: {np.mean(lag > 45) * 100:.0f}% · "
                  f"velocidade {np.percentile(vel, 5):.2f}–{np.percentile(vel, 95):.2f}x")
        print(f"{nome}: {resumo} -> {c['saida']}")
        relatorio += [f"## {nome} ({tr['inicio']:.2f}–{tr['fim']:.2f} s)", "", resumo, "",
                      "Momentos artificiais (cobrir com motion ou card):", ""]
        for a, b, lo, hi, fala in momentos_artificiais(tu, s, tr["inicio"], mapa["palavras"]):
            relatorio.append(f"- {a:5.2f}–{b:5.2f} s · {lo:.2f}–{hi:.2f}× · «{fala}»")
        relatorio.append("")

    (pasta / "sincronia.md").write_text("\n".join(relatorio), encoding="utf-8")
    print(f"relatório -> {pasta / 'sincronia.md'}")


if __name__ == "__main__":
    main()
