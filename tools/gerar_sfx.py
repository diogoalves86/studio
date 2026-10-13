"""Gera os efeitos sonoros padrão do Reels, sintetizados localmente (sem download, sem custo).

Uso:
    python tools/gerar_sfx.py "projetos/001. meu-reels"

Cria <projeto>/sfx/ com: whoosh_in (zoom aproximando), whoosh_out (afastando), swoosh (wipe), impacto (punch-in,
carimbo, título forte), pop (etiqueta/palavra entrando), tique (cronômetro), tecla (texto sendo digitado),
toque (dedo no botão), ding (sucesso/"Seguindo") e risco (marca-texto, risco em etiqueta).
A semente é fixa: o mesmo som em todos os vídeos (identidade sonora).
"""
import numpy as np, wave, sys
from pathlib import Path
if len(sys.argv) < 2: sys.exit(__doc__)
SR = 48000; OUT = Path(sys.argv[1]) / 'sfx'; OUT.mkdir(parents=True, exist_ok=True); rng = np.random.default_rng(7)
def salva(nome, x, pico=0.5):
    x = x / (np.abs(x).max() + 1e-9) * pico
    st = np.stack([x, x], 1)
    with wave.open(str(OUT/f'{nome}.wav'), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
def t(d): return np.arange(int(d*SR))/SR
def passa_banda(x, f0, f1, q=0.6):
    # filtro de estado variável com frequência variando no tempo (f0 → f1)
    f = np.geomspace(f0, f1, len(x)); y = np.zeros_like(x); lp = bp = 0.0
    for i, v in enumerate(x):
        g = 2*np.sin(np.pi*f[i]/SR); hp = v - lp - q*bp; bp += g*hp; lp += g*bp; y[i] = bp
    return y
def envelope(d, pico):
    tt = t(d); a = np.where(tt < pico, (tt/pico)**2, np.exp(-(tt-pico)/(0.08*d/0.45))); return a
def whoosh(d, f0, f1, pico):
    return passa_banda(rng.standard_normal(int(d*SR)), f0, f1) * envelope(d, pico)
salva('whoosh_in', whoosh(0.45, 300, 3200, 0.3), 0.45)
salva('whoosh_out', whoosh(0.45, 3000, 280, 0.3), 0.4)
salva('swoosh', whoosh(0.6, 200, 5000, 0.32) + 0.5*whoosh(0.6, 400, 2500, 0.3), 0.5)
tt = t(0.5); thump = np.sin(2*np.pi*(55 + 70*np.exp(-tt*25))*tt) * np.exp(-tt*9)
clk = rng.standard_normal(len(tt)) * np.exp(-tt*120)
salva('impacto', thump + 0.25*passa_banda(clk, 1500, 1500), 0.7)
tt = t(0.09); salva('pop', np.sin(2*np.pi*(700 + 900*tt/0.09)*tt) * np.sin(np.pi*tt/0.09)**2, 0.35)
tt = t(0.03); salva('tique', passa_banda(rng.standard_normal(len(tt)), 3500, 3500, 0.3) * np.exp(-tt*200), 0.25)
tt = t(0.025); salva('tecla', passa_banda(rng.standard_normal(len(tt)), 2200, 1800, 0.5) * np.exp(-tt*260), 0.18)
tt = t(0.06); salva('toque', (np.sin(2*np.pi*180*tt) + 0.6*passa_banda(rng.standard_normal(len(tt)), 2500, 2500)) * np.exp(-tt*80), 0.35)
tt = t(0.9); ding = sum(a*np.sin(2*np.pi*f*tt) for f, a in [(1318.5, 1), (1975.5, .5), (2637, .25)]) * np.exp(-tt*5) * np.minimum(1, tt/0.004)
salva('ding', ding, 0.3)
tt = t(0.22); salva('risco', passa_banda(rng.standard_normal(len(tt)), 900, 2600, 0.4) * np.sin(np.pi*tt/0.22), 0.3)
print(f'efeitos sonoros -> {OUT}')
