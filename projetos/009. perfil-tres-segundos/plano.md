# 009. perfil-tres-segundos: plano de edição

> Nível 2 (Higgsfield) com montagem no Remotion, no [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md) e na linha de dica de valor (guia 6, seção 12).
> Roteiro aprovado em [roteiro.md](roteiro.md) com a **abertura 2** escolhida pelo Diogo (18/10/2026): "Para tudo e abre o seu perfil agora. Finge que é de um estranho. Você seguiria, hein?"

## Gerado na Higgsfield (16,8 créditos; estimado ~16)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz completa (receita de dica) | `hf/voz_perfil.mp3` → `_ritmo.wav` → `_final.wav` | 58,8 → 46,4 s | ~5,8 |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 5 s | 5 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 6 s | 6 |

- **"hein?"** subiu a entonação da pergunta. Funciona como o "né?" (guia 6, seção 2).
- Depois do corte de pausas, sobrou um respiro de 1,2 s depois de "agora". Encurtei para ~0,4 s (`_final.wav`).
- O Whisper ouviu "o **Rios** traz a visita". O "Reels" falado em português ("ríous") engana a transcrição, e a legenda usa "Reels".
- A narração montada tem 44,8 s (+ 1,4 s de tela final = **46,2 s**).
- **Sincronia:** atraso mediano de 5 ms (A) e 0 ms (B), mas com 14% e 11% das janelas acima de 45 ms. Os trechos artificiais ficam cobertos assim:
  - **A:** "Para tudo" (0–0,67 s), "Finge" (1,41–1,62 s) e "Você" (2,68–2,95 s);
  - **B:** "perfil · E · segue" (41,47–42,63 s).

## Alternância na abertura (cobre os trechos artificiais)

| Tempo | Estado | O que aparece |
|---|---|---|
| 0–0,70 | **MOTION** | "PARA TUDO ✋" explode na tela (com tremor) |
| 0,70–1,38 «abre o seu perfil agora» | avatar CHEIO | celular pequeno pulsando "ABRE AGORA 📱" no rodapé |
| 1,38–1,65 «Finge» | MOTION | o celular entra girando |
| 1,65–2,65 «…que é de um estranho» | avatar em CARD + celular | perfil fraco ("apaixonada por doces 💕✨", grid aleatório) + selo "PERFIL DE UM ESTRANHO" |
| 2,65–3,95 «Você seguiria, hein?» | MOTION | cursor hesitando em cima do "Seguir" + selo grande "VOCÊ SEGUIRIA?" |

## Meio (tudo dentro do celular com a tela de perfil no padrão do app, sem marca)

| Palavra (s) | O que aparece |
|---|---|
| "quem chega no seu perfil" (4,58) | a visitante chega ao perfil; timer "⏱️ 3 s" corre |
| "três coisas" (8,28) | balões ❓ O QUE FAZ? · ❓ É PRA MIM? · ❓ O QUE EU GANHO? entram em "faz" (9,56), "ela" (10,18) e "ganha" (10,78) |
| "Dica 1" (11,76) | selo "DICA 1"; zoom na bio |
| "apaixonada por doces" (14,62) | a bio fraca aparece e é apagada letra por letra |
| "escreve…" (15,86) | a bio nova é digitada; os balões viram ✓ em "brigadeiro gourmet" (16,38), "festa" (17,28) e "direct" (18,94) |
| "o próprio Instagram recomenda" (19,98) | "brigadeiro gourmet" e "Curitiba" grifados + 📰 Fonte: Instagram (blog oficial) · "Como funciona a busca" |
| "aparece na busca" (26,64) | mini busca "brigadeiro curitiba" → o perfil aparece ✓ (o gancho com o 008) |
| "Dica 2" (27,62) | selo "DICA 2"; o grid do perfil |
| "Fixa no topo" (28,18) | 3 posts sobem para o topo com o 📌 |
| "Dá pra fixar até três" (31,6) | contador "📌 3/3" + 📰 Fonte: TechCrunch / TechRadar · "Instagram deixa fixar até 3 posts" (jun/2022) |
| "resultado · ensina · prova de cliente" (33,52 · 34,48 · 35,5) | rótulos nos 3 fixados: 🏆 RESULTADO · 📚 ENSINA · 💬 PROVA |
| "O Reels traz a visita…" (36,46) | funil ▶️ REELS → 👤 PERFIL → ➕ SEGUIDOR; o "Seguir" do perfil vira "Seguindo ✓" em "seguidor" (39,46); cartão FONTES |

## Fechamento

| Tempo | Estado | O que aparece |
|---|---|---|
| 40,03–41,40 «Manda pra quem precisa arrumar o» | avatar CHEIO | ↗️ "ENVIAR" pulsando |
| 41,40–42,68 «perfil hoje. E segue» | **MOTION** | "ARRUMA O PERFIL HOJE ↗️" → "E SEGUE…" |
| 42,68–43,66 «o Digo Social» | avatar CHEIO | botão "Seguir" → "Seguindo ✓" no rodapé, com toque em "Digo" (42,9) |
| 43,66 «Toda semana tem mais» | avatar CHEIO, punch-in | "TODA SEMANA TEM MAIS" |
| fim | tela final | logo oficial + Digo Social + @digo.social |

## Legenda do post

Já está no [roteiro.md](roteiro.md), com 5 hashtags específicas.

## Render e validação (18/10/2026)

- Código em `src/videos/perfil-tres-segundos/` (cópia de `hashtag-nao-faz-milagre/`), composição `PerfilTresSegundos`. Tela de perfil no padrão do app (sem marca). Prancha e preview aprovados.
- Depois da prancha: "PARA TUDO" menor (não estoura as laterais); celular do meio com 690 px de altura (não cobre o selo de fonte); mini busca no topo, no lugar do selo "DICA 1".
- Final: `edicoes/009. perfil-tres-segundos/perfil-tres-segundos_final.mp4`: 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 46,2 s (44,8 + 1,4), **−14,1 LUFS**, pico **−1,9 dBTP** (limitador padrão). Cópia leve para o celular em `frames/final_celular.mp4`.
