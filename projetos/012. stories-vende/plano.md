# 012. stories-vende: plano de edição

> Reels de dica. Roteiro v2 aprovado em [roteiro.md](roteiro.md) (19/10/2026, "pode gerar o vídeo"). O argumento ficou mais forte: a fila dos Stories, o ciclo ruim e o ciclo bom, e o dado de 62% da Ipsos.

## Gerado na Higgsfield (20,5 créditos; estimado ~16, +28%; o Diogo aprovou a regravação extra)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz (receita de dica) | `hf/voz_stories.mp3` | 63 s | ~3,5 |
| Voz, trecho regravado (v3/v4, substituído) | `hf/voz_trecho.mp3` | 24 s | ~1 |
| Voz, trecho regravado (v5) | `hf/voz_trecho2.mp3` | 27 s | 2 |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 5 s | 5 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 5 s | 5 |

- **Voz:** a primeira saiu embolada entre "diz que" e "Ninguém respondeu", com metade da frase engolida. Regravei só esse trecho, acelerei 1,15× para casar o ritmo e emendei em 10,0 s → 18,04 s. **v4 (feedback do Diogo, "o corte de pausa cortou antes"):** a emenda passou para 10,11 s, no silêncio depois do "-va" de "nova", e o corte de pausas ficou suave (`--cauda 0.8 --limiar 34 --fade 0.04`). Resultado: `voz_stories_v4.wav` → `_ritmo.wav` (63,1 → 53,0 s). Os clipes do avatar foram ressincronizados com a voz nova, sem novos créditos.
- **v5 (feedback do Diogo, "Funciona assim. O story quase nunca chega" soava estranho):** o gerador tinha atropelado "Funciona assim, story" na voz original (0,3 s). Regravei de "Funciona assim." até "Ninguém respondeu ontem?" numa tomada só, emendei em 7,79 s (silêncio antes de "Funciona") e 18,04 s, apliquei 1,15× e um gate leve (a tomada tinha chiado de respiração a −41/−45 dB) e cortei com `--limiar 30` (o 34 tratou esse chiado como fala). Resultado: `voz_stories_v5_ritmo.wav`, 52,35 s.
- **Sincronia:** os dois clipes têm atraso mediano de 5 ms. Os momentos artificiais ficam cobertos assim:
  - **A** 3,05–3,22 s «não é o» → motion "O PROBLEMA NÃO É O SEU PRODUTO" a partir de «problema».
  - **B** 45,69–45,95 s «Manda» → "↗️ MANDA".
  - **B** 47,79–48,28 s «E segue o» → "E SEGUE O DIGO" + botão Seguir.
  - **B** 48,98–49,12 s «Toda» → "TODA SEMANA TEM MAIS".

## Linha do tempo

| Fala | Estado | Cena |
|---|---|---|
| gancho «Você posta… né?» | CHEIO (punch em «ninguém») | "POSTA STORY TODO DIA E NINGUÉM COMPRA?" |
| «O problema não é o seu produto» | MOTION | texto + "Vendas hoje: 0" |
| «tá indo pro fim da fila» | MOTION + card de voz | barra de Stories: o seu círculo desliza pro fim |
| «Story quase não chega em gente nova» | MOTION | anel de Story + "🚫 EM GENTE NOVA" |
| «O próprio chefe do Instagram» | MOTION | foto e nome do Adam Mosseri |
| «pra isso, o caminho é o Reels…» | MOTION | REELS → GENTE NOVA · STORY → QUEM JÁ TE SEGUE + fonte Social Media Today |
| «E nem pra todos. A ordem é uma aposta…» | MOTION | barra se embaralhando, 🎲, TOCAR/CURTIR/RESPONDER + fonte blog oficial |
| «Ninguém respondeu ontem?…» | MOTION | O CICLO RUIM: 3º → 9º → 17º, 👀 480 → 210 → 90 |
| «o público mais quente» | MOTION | termômetro 🔥 + "QUEM JÁ TE SEGUE" |
| «pesquisa da Ipsos… 62%» | MOTION | anel 62% + fonte Ipsos para Facebook IQ |
| «Dica um…» | MOTION | Story da loja com enquete, caixinha e 🔥; enquete NINHO × BRIGADEIRO |
| «Dica dois…» | MOTION | votos da enquete → direct "Separei um brigadeiro pra você 😉" → "Quero 2!!" → PEDIDO |
| «te coloca no começo da fila» | MOTION | O CICLO BOM: o seu círculo pula pro 1º lugar |
| CTA | alternância | MANDA → avatar → E SEGUE O DIGO + Seguir → avatar → TODA SEMANA TEM MAIS → logo |

## Render

- Código em `src/videos/stories-vende/`, composição `StoriesVende`. Preview em `frames/preview.mp4`.
- Ajustes depois da prancha:
  - "Vendas hoje: 0" só aparece no motion, para não ficar sobre a logo da camiseta;
  - "E SEGUE O DIGO" ganhou tela própria;
  - a legenda sai no trecho do botão Seguir.
- **Final (19/10/2026):** `edicoes/012. stories-vende/stories-vende_final.mp4`. 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 53,8 s (52,35 s de fala + 1,4 s de tela final). Áudio com **−14,0 LUFS** (+1 dB antes do limitador) e pico de **−1,9 dBTP**. Cópia para celular (crf 24, 17 MB) em `frames/final_celular.mp4`.
