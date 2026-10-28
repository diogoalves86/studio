"""Efeitos sonoros de meme da Galinha Programadora, sintetizados localmente (sem download, sem custo, nada copiado).

Uso:
    python tools/gerar_sfx_meme.py "projetos/034. meu-meme"

Cria em <projeto>/sfx/ (ao lado dos sons padrão de tools/gerar_sfx.py):
    boom      grave dramático para o zoom de "revelação"
    disco     disco arranhando (quando tudo dá errado)
    grilos    silêncio constrangedor (1,2 s)
    trombone  trombone triste descendo ("uón uón uón uóóón")
    plim      arpejo de vitória
    alarme    sirene curta
    vibra     celular vibrando
    fita      fita adesiva sendo puxada
"""
import sys
import wave
from pathlib import Path

import numpy as np

if len(sys.argv) < 2:
    sys.exit(__doc__)
SR = 48000
OUT = Path(sys.argv[1]) / 'sfx'
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(11)


def t(d):
    return np.arange(int(d * SR)) / SR


def salva(nome, x, pico=0.6):
    x = x / (np.abs(x).max() + 1e-9) * pico
    st = np.stack([x, x], 1)
    with wave.open(str(OUT / f'{nome}.wav'), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())


def fade(x, a=0.005, b=0.05):
    n = len(x)
    env = np.ones(n)
    na, nb = int(a * SR), int(b * SR)
    env[:na] = np.linspace(0, 1, na)
    env[n - nb:] = np.linspace(1, 0, nb)
    return x * env


def passa_baixa(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.zeros_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


# boom: seno grave caindo de 90 para 38 Hz, saturado, com cauda longa
tt = t(1.6)
f = 38 + 52 * np.exp(-tt * 6)
boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 2.4)
boom = np.tanh(3 * boom) + 0.25 * passa_baixa(rng.standard_normal(len(tt)), 300) * np.exp(-tt * 18)
salva('boom', fade(boom, 0.002, 0.2), 0.9)

# disco: ruído com "pitch" subindo e descendo rápido (vai e volta da agulha)
tt = t(0.55)
vel = np.sin(2 * np.pi * 2.6 * tt) * 0.5 + 0.5
fase = np.cumsum(400 + 2600 * vel) / SR
disco = np.sin(2 * np.pi * fase) * 0.35 + passa_baixa(rng.standard_normal(len(tt)), 3500) * (0.4 + 0.6 * vel)
salva('disco', fade(disco, 0.003, 0.08), 0.6)

# grilos: pulsos de 4,6 kHz em rajadas de 3, duas vezes
x = np.zeros(int(1.2 * SR))
for ini in (0.1, 0.62):
    for k in range(3):
        a0 = int((ini + k * 0.055) * SR)
        tt = t(0.035)
        x[a0:a0 + len(tt)] += np.sin(2 * np.pi * 4600 * tt) * np.sin(np.pi * tt / 0.035)
salva('grilos', x, 0.35)

# trombone triste: quatro notas descendo, a última longa com vibrato (dente de serra filtrado)
notas = [(392, 0.32), (370, 0.32), (349, 0.32), (330, 1.0)]
partes = []
for i, (f0, d) in enumerate(notas):
    tt = t(d)
    vib = 1 + (0.012 * np.sin(2 * np.pi * 5.5 * tt) * (tt / d) if i == 3 else 0)
    if i == 3:
        f0 = f0 * (1 - 0.04 * tt / d)
    fase = np.cumsum(f0 * vib) / SR
    serra = 2 * (fase % 1) - 1
    env = np.minimum(1, tt / 0.04) * np.minimum(1, (d - tt) / 0.06)
    partes.append(passa_baixa(serra, 1400) * env)
salva('trombone', np.concatenate(partes), 0.6)

# plim: arpejo dó-mi-sol-dó com brilho
x = np.zeros(int(1.0 * SR))
for k, f0 in enumerate([523.25, 659.25, 783.99, 1046.5]):
    a0 = int(k * 0.08 * SR)
    tt = t(0.6)
    nota = (np.sin(2 * np.pi * f0 * tt) + 0.3 * np.sin(2 * np.pi * 2 * f0 * tt)) * np.exp(-tt * 6)
    x[a0:a0 + len(tt)] += nota[: len(x) - a0]
salva('plim', x, 0.5)

# alarme: sirene curta
tt = t(0.7)
alarme = 0.6 * np.sin(2 * np.pi * np.cumsum(700 + 300 * np.sin(2 * np.pi * 3 * tt)) / SR)
salva('alarme', fade(alarme, 0.005, 0.15), 0.6)

# vibra: zumbido de celular em pulsos
tt = t(0.9)
vibra = np.sin(2 * np.pi * 160 * tt) * (np.sin(2 * np.pi * 6 * tt) > 0)
salva('vibra', fade(vibra, 0.005, 0.15), 0.7)

# fita: ruído na faixa média com tremolo rápido
tt = t(0.6)
fita = passa_baixa(rng.standard_normal(len(tt)), 3500) - passa_baixa(rng.standard_normal(len(tt)), 900)
fita *= 0.5 + 0.5 * np.sin(2 * np.pi * 28 * tt)
salva('fita', fade(fita, 0.03, 0.15), 0.5)

print(f'efeitos de meme -> {OUT}')
