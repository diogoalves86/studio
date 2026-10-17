# 007. tres-segundos: plano de edição

> Nível 2 (Higgsfield) com montagem no Remotion, no [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md) e na linha de dica de valor (guia 6, seção 12).
> Roteiro aprovado em [roteiro.md](roteiro.md) (17/10/2026). CTA duplo: "Manda pra quem ainda começa com 'oi, gente'. E segue o Digo Social: toda semana tem mais."

## Gerado na Higgsfield (16,8 créditos; estimado ~16)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz completa (receita de dica: `speech_rate` −10) | `hf/voz_3s.mp3` → `_ritmo.wav` | 56,1 → 43,9 s | ~5,8 |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 5 s | 5 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 6 s | 6 |

- Corte de pausas: `--pausa 0.18 --pausa-frase 0.32 --velocidade 1.3`. A voz saiu inteira na primeira tentativa.
- Jobs: voz `d022248b…`, A `98de62bc…`, B `c5e68a2a…`. `start_image` = `ab4aaba1…`; referências em `hf/cortes_avatar.json`.
- **Sincronia:**
  - **A:** atraso mediano de 5 ms, 0% das janelas acima de 45 ms. Só "É exatamente aí que a" (2,12–3,30 s) fica artificial, e esse trecho já era motion no roteiro ("TCHAU 👋").
  - **B:** atraso mediano de 5 ms, mas 22% das janelas acima de 45 ms. Os pontos artificiais são "segue o Digo" (41,53–41,86 s) e o último quadro. O botão Seguir cobre o primeiro em tela cheia, e o wipe da tela final cobre o segundo.
- Foto do Mosseri: a mesma do 006 (Anthony Quintano, CC BY 2.0), com o crédito na tela.

## Formato e estilo

1080×1920, 30 fps, **43,9 s de fala + 1,4 s de tela final = 45,3 s**. Paleta, fontes, legenda dinâmica, wipe azul, textura, grade de pontos no meio e SFX do padrão (iguais ao 006).

**O vídeo faz o que ensina:** desde o **primeiro quadro**, antes da fala, o gancho "SEU REELS MORRE NOS 3 PRIMEIROS SEGUNDOS" fica escrito no topo.

## Linha do tempo (cada gatilho é uma palavra falada)

| Palavra (s) | Estado | O que aparece |
|---|---|---|
| quadro 1 (0,00) | avatar CHEIO | gancho escrito no topo: "SEU REELS MORRE NOS 3 PRIMEIROS SEGUNDOS" |
| "oi, gente" (1,10) | avatar CHEIO | balão "Oi, gente, tudo bem? 👋" |
| "né?" (1,88) | avatar CHEIO, punch-in | — |
| "É exatamente aí" (2,38) | **MOTION** (cobre 2,12–3,30) | o balão é jogado para cima por um swipe: "TCHAU 👋" + contador "−1 pessoa" |
| "Pensa no Reels do lado de quem assiste" (4,24) | wipe → MOTION + card de voz | celular com o feed de Reels |
| "Ninguém escolheu te ver" (6,28) | MOTION | selo "NINGUÉM ESCOLHEU TE VER" |
| "passando o dedo" (8,24) | MOTION | o dedo arrasta e os Reels passam rápido |
| "o próximo vídeo tá a um toque" (9,24) | MOTION | o próximo Reels espiando embaixo: "PRÓXIMO ↓" |
| "o chefe do Instagram já disse" (11,68) | MOTION | foto + nome do Adam Mosseri, "chefe do Instagram", selo "JAN/2025" |
| "o tempo assistido é um dos sinais que mais pesam" (12,94) | MOTION | 3 pílulas (⏱️ TEMPO ASSISTIDO · ❤️ CURTIDAS · ↗️ ENVIOS), com o ⏱️ crescendo; selo "segundo Adam Mosseri" |
| "Quem sai no começo derruba esse tempo" (15,44) | MOTION | barra de tempo assistido despencando de 100% para 12% |
| "testa o vídeo com pouca gente primeiro" (17,96) | MOTION | o círculo de 5 pessoas em volta do post (o mesmo do 005) |
| "vão embora nos primeiros segundos" (20,22) | MOTION | as 5 pessoas apagam uma a uma; relógio "0:01… 0:02" |
| "o seu Reels para ali" (21,54) | MOTION | as ondas de alcance tentam abrir e travam; selo vermelho "PAROU" |
| "O começo decide se o resto vai ser visto" (22,76) | MOTION | gráfico de retenção: a curva despenca de 0 a 3 s, com a faixa "0–3 s" em destaque |
| "Dica 1: começa pela frase mais forte" (25,02) | MOTION | selo "DICA 1"; antes × depois: "Oi, gente, hoje eu vou falar sobre…" ✗ → "Seu Reels morre em 3 segundos." ✓ |
| "O resultado, a dor ou a promessa" (27,56) | MOTION | três chips em sequência: 🏆 RESULTADO · 😩 DOR · 🎯 PROMESSA |
| "O 'oi, gente' fica pra depois, ou sai" (29,48) | MOTION | o balão "oi, gente 👋" escorrega para o fim da linha do tempo e cai na lixeira 🗑️ |
| "Dica 2: escreve o gancho na tela" (31,74) | MOTION | selo "DICA 2"; celular com o texto do gancho surgindo no quadro 1 |
| "já no primeiro segundo" (33,86) | MOTION | marcador "0:00" piscando sobre o texto |
| "Muita gente assiste sem som" (35,16) | MOTION | 🔇 grande; o gancho continua legível ✓ |
| "esse vídeo começou exatamente assim" (36,64) | MOTION | replay em miniatura do começo deste Reels, com setas "FRASE FORTE" e "TEXTO NA TELA" |
| "Manda pra quem ainda começa com 'oi, gente'" (39,22) | avatar CHEIO | ↗️ "ENVIAR" pulsando + balão "oi, gente 👋" riscado |
| "E segue o Digo" (41,28) | **MOTION** (cobre 41,53–41,86) | botão "Seguir" → "Seguindo ✓" em tela cheia |
| "Toda semana tem mais" (42,62) | avatar CHEIO, punch-in | "TODA SEMANA TEM MAIS" |
| fim (43,93) | tela final | logo oficial + Digo Social + @digo.social |

## Legenda do post (sugestão)

> Seu Reels morre nos 3 primeiros segundos ⏱️
>
> No Reels ninguém escolheu te ver. E o chefe do Instagram, Adam Mosseri, já disse: tempo assistido é um dos sinais que mais pesam. Se a pessoa sai no começo, seu vídeo para ali.
>
> 1️⃣ Começa pela frase mais forte: o resultado, a dor ou a promessa
> 2️⃣ Escreve o gancho na tela já no primeiro segundo, porque muita gente assiste sem som
>
> 👀 Repara como esse vídeo começou
> ↗️ Manda pra quem ainda começa com "oi, gente"
> 👉 Segue o @digo.social. Toda semana tem mais.
>
> #instagram #reels #dicasdeinstagram #crescernoinstagram #algoritmodoinstagram #ganchos #marketingdigital #criadordeconteudo #socialmedia #empreendedorismo #digosocial

## Render e validação (17/10/2026)

- Código em `src/videos/tres-segundos/` (cópia de `curtida-nao-cresce/`), composição `TresSegundos`. Plano, prancha e preview aprovados.
- Depois da prancha: gancho do topo menor (fica acima dos olhos) e cartões da Dica 1 mais abaixo do título.
- Final: `edicoes/007. tres-segundos/tres-segundos_final.mp4`: 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 45,3 s (43,9 + 1,4), **−14,3 LUFS**, pico **−1,9 dBTP** (limitador padrão, sem ganho extra). Cópia leve para o celular em `frames/final_celular.mp4`.
