# 017. carrossel-segunda-chance: plano

Reels vertical 1080×1920, ~48 s, com a Luísa (guia 6, seção 0). Roteiro, gancho e fonte em [roteiro.md](roteiro.md). Código-base: `src/videos/faz-a-conta/` (016).

## Geração (Higgsfield) — pré-calculado com `get_cost`, nada gerado

| Asset | Modelo | Configuração | Custo |
|---|---|---|---|
| Voz: gancho | `elevenlabs_v4` | clone oficial `1c0dd5f2…`, português normal | 0,46 |
| Voz: meio | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | 3,45 |
| Voz e clipe do CTA | — | reaproveitados do 015 (mesma frase) | 0 |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, ~4 s (o gancho novo é curto), `start_image` = `4312127e…`, referência com a duração exata do clipe | ~4 |
| **Total** | | | **~7,9 créditos** |

Cada geração só acontece com o "sim" do Diogo. A voz é gerada e aprovada antes do clipe.

## Cenas

| # | Fala | Luísa | Na tela |
|---|---|---|---|
| 0 | (primeiro quadro, antes da fala) | fora (motion) | carrossel no feed com ⚠️ e o texto **"ESSE ERRO TIRA A 2ª CHANCE DO SEU CARROSSEL"** (cobre o congelamento do começo do clipe) |
| 1 | "Esse erro faz o seu carrossel…" | tela cheia | etiqueta "⚠️ ERRO" no topo |
| 2 | "…perder a segunda chance." | tela cheia, punch-in em "perder" | selo "2ª CHANCE" acende e leva risco vermelho |
| 3 | "Quem contou foi o chefe do Instagram, o Adam Mosseri." | fora | cartão do Mosseri (foto CC BY 2.0 com crédito) + selo de fonte |
| 4 | "a pessoa vê o seu carrossel, não arrasta, e passa." | fora | celular com feed: o carrossel (capa, pontinhos 1/5) passa direto, e o dedo rola para baixo |
| 5 | "Depois, o Instagram pode mostrar ele de novo, já no segundo slide, sem a capa. Essa é a segunda chance." | fora | o mesmo carrossel volta no feed, agora no slide 2 (pontinhos 2/5 acesos) + selo "2ª CHANCE" |
| 6 | "E o erro é esse: o slide dois só faz sentido depois da capa." | fora | selo "⚠️ O ERRO"; o slide 2 "ERRO 1" sozinho, com "???" em volta |
| 7 | "Primeira dica: faz o slide dois funcionar sozinho, como se fosse uma segunda capa." | fora | DICA 1; o slide 2 ganha uma "coroa de capa" |
| 8 | "a capa diz 'três erros que deixam o seu bolo seco'…" | fora | a capa do exemplo (🍰, marcada "exemplo") |
| 9 | "O slide dois não pode ser só 'erro um'." | fora | slide "ERRO 1" com ✕ vermelho |
| 10 | "Ele tem que ser 'forno quente demais seca o seu bolo'." | fora | slide "🔥 FORNO QUENTE DEMAIS SECA SEU BOLO" com ✓ verde, lado a lado com o ruim |
| 11 | "Assim, quem cai direto nele já entende." | fora | selo "ENTENDE SEM A CAPA ✓" |
| 12 | "Segunda: na capa, faz uma pergunta que só se responde arrastando." | fora | DICA 2; capa "QUAL DESSES 3 ERROS VOCÊ COMETE? 👉" com seta pulsando |
| 13 | "A pessoa arrasta logo na primeira vez. E se não arrastar, o slide dois pega ela na volta." | fora | o dedo arrasta (1ª vez ✓); a linha "1ª VEZ → capa · 2ª VEZ → slide 2" com os dois ✓ |
| 14 | CTA (áudio e clipe do 015) | tela cheia | cartão Seguir → Seguindo ✓; "TODA SEMANA TEM MAIS" |
| 15 | (1,4 s depois) | — | tela final com a logo |

- Card de voz da Luísa no topo durante o meio, como no 015 e no 016.
- Imagem do clipe adiantada 3 quadros; render a −14 LUFS.
- Momentos artificiais do `sincronia.md` cobertos por motion.

## Pontos de aprovação

1. Este roteiro e o custo (~7,9 créditos).
2. A voz gerada, antes do clipe (comparada com a do 015).
3. Prancha de revisão antes do render final.

## Execução

- Gasto real: vozes do gancho e do meio (clone oficial) + clipe A Seedance 2 Mini 4 s; CTA reaproveitado do 015.
- Sincronia: clipe A mediana 2 ms (0% das janelas > 45 ms); clipe B (015) 5 ms.
- Gancho reforçado no visual (a voz sozinha não prendia): feed que rola rápido e freia no carrossel com flash vermelho e tremida, alerta vermelho pulsando, carimbos "2ª CHANCE" → "PERDIDA ✕" e contador "o erro aparece em Ns" até a revelação.
- Prancha de revisão corrigida: fonte e slides do exemplo saíram de cima da legenda; legenda desligada onde o texto já está na tela.
- Final: `edicoes/017. carrossel-segunda-chance/carrossel-segunda-chance_final.mp4`, 52,6 s, 1080×1920, −13,9 LUFS, pico −1,8 dBTP.
- **Aprovado pelo Diogo em 20/10/2026**, pronto para postar.
