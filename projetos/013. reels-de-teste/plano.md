# 013. reels-de-teste: plano de edição

> Reels de dica. Roteiro aprovado em [roteiro.md](roteiro.md) (19/10/2026). O Diogo pediu o passo a passo de publicação no vídeo, com uma animação caprichada, e a voz a **1,2×** (no lugar do 1,3× usado do 005 ao 012).

## Gerado na Higgsfield (21,0 créditos; estimado ~17; a frase extra foi aprovada pelo Diogo)

| Asset | Arquivo | Duração | Observação |
|---|---|---|---|
| Voz (receita de dica) | `hf/voz_teste.mp3` → `voz_teste_ritmo.wav` | 93,3 → 74,8 s | `--velocidade 1.2 --cauda 0.8 --limiar 30 --fade 0.04` |
| Frase dos 200 seguidores | `hf/voz_200.mp3` | 14 s | 0,9 crédito; emendada em 28,66 s da voz bruta → `voz_teste_v2_ritmo.wav` (83,9 s) |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 6 s | |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 6 s | |

- Os dois primeiros recortes de referência (a 1,3×) foram enviados, mas não foram usados: o pedido de 1,2× chegou antes de gerar o avatar, então não houve crédito perdido.
- A transcrição inventou "Tchau, tchau" no silêncio final. Não está no áudio; saiu da legenda.
- **Sincronia:** atraso mediano de 5 ms nos dois clipes. Os momentos artificiais ficam cobertos assim:
  - **A** 1,40–2,81 s → tela de motion "MEDO DE FLOPAR?" com o dedo hesitando no "Compartilhar";
  - **A** 5,34–5,50 s → entra o meio;
  - **B** «Manda» → "↗️ MANDA";
  - **B** «E segue o» → "E SEGUE O DIGO" + botão;
  - **B** «Toda» → tela final.

## Linha do tempo

| Fala | Cena |
|---|---|
| gancho | avatar + "MEDO DE FLOPAR? 🙈"; motion com o dedo hesitando |
| «O próprio Instagram criou uma saída» | avatar com punch-in |
| «Quando lançou, o Instagram admitiu…» | recorte de jornal com a citação da Meta (*"nervous about posting"*) + tradução + rascunhos "nunca postados" + fonte Meta |
| «A saída se chama Reels de teste…» | selo 🧪 REELS DE TESTE; o vídeo vai para "QUEM NÃO TE SEGUE ✓", e os "SEGUIDORES 🚫" ficam de fora; a grade do perfil fica com o espaço "em teste" + fonte Instagram for Creators |
| «Só um detalhe: ela libera quando você chega em 200 seguidores. Confere em Configurações…» | tela **Tipo e ferramentas da conta** recriada a partir do print do Diogo (out/2026): a lista rola até "Reels de teste: quando você alcançar 200 seguidores", que acende; selo 🔓 LIBERA COM 200 SEGUIDORES; caminho ⚙️ Configurações → Tipo e ferramentas da conta |
| **«Pra publicar é fácil…» (tutorial)** | trilha 1·2·3·4; celular com as telas do app recriadas: ＋ → menu → Reels → edição → Avançar → legenda; **zoom no interruptor 🧪 Teste**, que liga com brilho; "compartilhar automaticamente" ligando; Compartilhar → "✓ PUBLICADO COMO TESTE" + fonte Meta + nota de conta pública |
| «Em 24 horas, abre o teste…» | relógio de 24 h; perfil com as abas Posts · Rascunhos · 🧪 Testes; painel com 4 números + "comparado com os seus testes anteriores" |
| «Foi bem? … Foi mal?» | "Compartilhar com todos" tocado; card "FOI MAL" com os seguidores 😴 "NEM VIRAM" |
| «quem não te segue é quem faz você crescer» | curva subindo com 🆕 e 📈 |
| «Dica um» | ABERTURA A × B, com a retenção caindo; a B leva 🏆 |
| «Dica dois» | curtida diminui, tempo assistido e envios crescem + selo do Mosseri + fonte Social Media Today; "COMPARA TESTE COM TESTE" 🧪×🧪 ✓ · 🧪×📌 ✗ |
| CTA | MANDA → avatar ("PRA QUEM TEM MEDO DE POSTAR") → E SEGUE O DIGO + Seguir → avatar → TODA SEMANA TEM MAIS → logo |

## Por que a frase dos 200 seguidores

O Diogo não achou a opção na conta dele. O próprio app mostra, em Configurações → Tipo e ferramentas da conta, "Reels de teste: quando você alcançar 200 seguidores" (e "Canais: 1.000 seguidores"). Sem esse aviso, o vídeo pareceria mentira para quem ainda não tem a função.

## Render

- Código em `src/videos/reels-de-teste/`, composição `ReelsDeTeste`. Preview em `frames/preview.mp4`.
- Ajustes depois da prancha: o título "ADMITIU" ficava escondido atrás do recorte, e o celular do tutorial ficou maior (540 px).
- **Final (19/10/2026):** `edicoes/013. reels-de-teste/reels-de-teste_final.mp4`. 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 85,3 s (83,9 s de fala + 1,4 s de tela final). Áudio com **−14,0 LUFS** (+1,4 dB antes do limitador) e pico de **−1,9 dBTP**. Cópia para celular (crf 24, 25 MB) em `frames/final_celular.mp4`.
