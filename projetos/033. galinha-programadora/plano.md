# 033. Galinha Programadora: personagem e voz

Nova linha de Reels da página **@galinhaprogramadora** (dicas rápidas de programação e desenvolvimento de sistemas). O Digo Social entra como parceiro só em alguns vídeos, no final. Este projeto define a personagem e a voz oficiais, como o 014 fez com a Luísa.

## Decisões do Diogo (28/10/2026)

- Personagem já existe: `prints/galinha_original.jpg` (ilustração de traço grosso, galinha marrom-avermelhada, crista rosa, bico amarelo, fone azul no pescoço, fundo verde-água com raios).
- Formato: avatar falando (Seedance 2 Mini + voz separada + boca sincronizada), como a Luísa.
- Voz: nova, **masculina**, só da Galinha, criada pelo mesmo processo da Luísa (vozes prontas do ElevenLabs → escolha → clone de ~70 s).

## Lote 1 (aprovado, 28/10/2026)

Referência enviada: media `0d2d617e-3296-4cf1-9065-66b717e9bb11`.

### Imagens 9:16 (GPT Image 2.5, high, 2k)

| Versão | Job | Arquivo |
|---|---|---|
| A: com notebook | `2f775d11-76be-40a8-a5ea-64193e76b484` | `hf/galinha_a_notebook.png` |
| B: busto de frente | `24397dd7-59f1-4c83-ae2e-1cb2c2628274` | `hf/galinha_b_busto.png` |
| C: 3/4 com símbolos de código | `68f6ae1a-da45-41c2-8463-a277eec4ee5c` | `hf/galinha_c_tres_quartos.png` |

### Vozes de teste (ElevenLabs v4, voz pronta)

Frase: "Fala, dev! Eu sou a Galinha Programadora. Hoje eu vou tchi mostrar um erro que todo iniciante comete no código."

| # | Voz | voice_id | Duração | Voz − fundo | F0 mediano | Variação | Whisper ouviu "dev" como |
|---|---|---|---|---|---|---|---|
| 1 | Callum | `858499d9…` | 7,3 s | 64,7 dB | 152 Hz | 18,1 st | "Dave" |
| 2 | Bram | `549ff70a…` | 6,8 s | 50,6 dB | 222 Hz | 16,2 st | "Deve" |
| 3 | Marcus | `6f98d3dd…` | 7,6 s | 70,8 dB | 157 Hz | 13,8 st | "Deve" |
| 4 | Andre | `f1e8226e…` | 7,2 s | 73,4 dB | 163 Hz | 19,8 st | "Dev" |
| 5 | Julian | `95429266…` | 7,1 s | 71,7 dB | 151 Hz | 19,0 st | "Dev" |

- Todas leram a frase inteira, sem palavra trocada.
- "dev" precisa de grafia fonética nos próximos textos (testar "dévi").
- Custo real: 3 × 2,75 + 5 × 0,69 = **11,70 créditos** (estimado ~12).

O Diogo não gostou de nenhuma das 5 ("não gostei muito da voz") e pediu um teste com a voz dele.

## Lote 2: voz do Diogo (Seed Audio, referência `58086f4c…`)

Texto: "Fala, dévi! Eu sou a Galinha Programadora. Hoje eu vou tchi mostrar um erro que todo iniciante comete no código."

| # | Receita | Job | Bruto → cortado | Voz − fundo | F0 | Variação | Whisper |
|---|---|---|---|---|---|---|---|
| 1 | Reels: `speech_rate` 5, corte padrão | `a3e8c0af…` | 7,58 → 6,62 s | 29,0 dB | 142 Hz | 9,4 st | "sou **Adalinha**…", "te **cheio de** mostrar" |
| 2 | Dica: `speech_rate` −10, corte 0,18 s a 1,2× | `33fe1e3c…` | 8,81 → 6,37 s | 32,3 dB | 140 Hz | 9,5 st | frase certa ("Deve" no lugar de "dev") |

- A versão 2 saiu sem erro; a 1 embolou "a Galinha" e o "tchi".
- O ruído de fundo é bem maior que nas vozes do ElevenLabs (~30 dB contra ~70 dB): vem da gravação de referência, como aconteceu com os primeiros clones da Luísa.
- Entonação mais contida (~9,5 semitons contra 14–20 nas vozes prontas).
- Custo real: 2 × 0,8 = **1,6 crédito**.

### Correção do "te mostrar" (28/10/2026)

O Diogo achou estranho o "hoje eu vou te mostrar" da versão 2. Causa: o texto usava **"tchi"**, que é grafia da Luísa (ElevenLabs). No Seed Audio da voz do Diogo, o "tchi" sai esticado e quebrado. Nos projetos 001–013, o "te" sempre foi escrito normal. **Na voz do Diogo, não use "tchi".**

Só a segunda frase foi regerada (mesma receita da versão 2) e emendada no silêncio depois de "Programadora" (2,72 s do `voz_diogo_2_dica_ritmo.wav` + 0,1 s):

| Versão | Grafia | Job | Arquivo final | Observação |
|---|---|---|---|---|
| 3-te | "te" | `8296b906…` | `hf/voz_diogo_3_te_ritmo.wav` (6,56 s) | o bruto veio com 2,3 s de chiado no início e no fim; recortado (2,35–7,15 s) antes do corte de pausas |
| 3-ti | "ti" | `e8756269…` | `hf/voz_diogo_3_ti_ritmo.wav` (6,37 s) | limpa |

Custo real: 2 × 0,5 = **1,0 crédito**.

**Aprovada pelo Diogo (28/10/2026): versão 3-ti** ("o segundo ficou melhor"). Voz da Galinha = voz do Diogo no Seed Audio (`audio_references` `58086f4c…`, `speech_rate` −10, `loudness_rate` 23, mp3 24 kHz), corte `--pausa 0.18 --velocidade 1.2 --cauda 0.8 --limiar 30 --fade 0.04`, "te" escrito **"ti"**. Referência de voz aprovada: `hf/voz_diogo_3_ti_ritmo.wav`.

## Lote 3: clipe de teste da Galinha falando (28/10/2026)

- Imagem escolhida: **B (busto de frente)**, job `24397dd7-59f1-4c83-ae2e-1cb2c2628274` (`start_image`).
- Referência de voz: `hf/ref_clipe_teste.mp3` (0,15 s de silêncio + `voz_diogo_3_ti_ritmo.wav`, completada até 7,0 s), media `9016329b-26e2-4494-8db1-d8029e036feb`.
- Seedance 2 Mini, 7 s, 720p, 9:16, job `1ed54dac-9068-4d1e-a856-c87970c8998b` → `hf/avatar_teste.mp4` (24 fps). Prompt: animação 2D no mesmo traço, "exact lip-sync… same speed and timing, no extra pauses", câmera parada.
- O clipe falou as 20 palavras; o bico abre e fecha por sílaba, a personagem e o fone ficam iguais à imagem.
- `sincronizar_avatar.py`: **atraso mediano 10 ms, 0% de janelas > 45 ms**. Momento artificial só em 0,00–0,40 s («Fala»: clipe congelado no começo, como sempre), a cobrir com motion na abertura.
- Teste montado: `revisao/galinha_teste_fala.mp4` (1080×1920, voz +100 ms, `highpass=f=70`, −14 LUFS).
- Custo real: **7 créditos**. Total do projeto 033: **21,3 créditos**.

## Resultado (28/10/2026)

- **Personagem oficial:** imagem B (busto de frente), job `24397dd7-59f1-4c83-ae2e-1cb2c2628274`.
- **Voz oficial:** a do Diogo no Seed Audio (versão 3-ti). O clone no ElevenLabs não foi feito.
- **Clipe de teste aprovado tecnicamente** (sync 10 ms). O primeiro Reels foi o `034. na-minha-maquina`.
- Tudo consolidado em `guias/7-padrao-galinha-programadora.md`.
