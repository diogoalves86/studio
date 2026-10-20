# 016. faz-a-conta: plano

Reels vertical 1080×1920, ~55 s, com a Luísa no padrão do guia 6 (seção 0). Roteiro e fonte em [roteiro.md](roteiro.md). Código-base: `src/videos/apresentacao-luisa/` (015).

## Geração (Higgsfield)

| Asset | Modelo | Configuração | Custo estimado |
|---|---|---|---|
| Voz (gancho, meio, CTA) | `elevenlabs_v4` | voz pronta Onyx `8911390e…`, português normal | ~5 créditos |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, ~6 s, `start_image` = `4312127e…`, referência com a duração exata do clipe | ~6 créditos |
| Clipe B: CTA | `seedance_2_0_mini` | idem, 4 s | 4 créditos |
| **Total** | | | **~15 créditos** (até ~18 se precisar regravar uma frase) |

Depois: corte de pausas a 1,2× → `_ritmo.wav` (+ `highpass=f=70`) → narração → sincronia → imagem do clipe adiantada 3 quadros → render a −14 LUFS.

## Cenas

| # | Fala | Luísa | Na tela |
|---|---|---|---|
| 1 | "Um Reels com quinhentas visualizações pode ser melhor que um com duas mil." | tela cheia | contadores "👁 500" e "👁 2.000" entram; um sinal ">" ilógico entre eles (500 > 2.000) pisca |
| 2 | "Parece mentira, né?" | tela cheia, punch-in | selo "🤯 PARECE MENTIRA?" |
| 3 | "O chefe do Instagram, o Adam Mosseri, já disse…" | fora (motion) | cartão do Mosseri (foto CC BY 2.0 com crédito) + selo de fonte |
| 4 | "…o tempo assistido, as curtidas e os envios." | fora | três ícones acendendo um por palavra: ⏱ TEMPO · ❤️ CURTIDAS · ↗️ ENVIOS |
| 5 | "Mas não o número solto. O Instagram compara com quantas pessoas viram." | fora | "❤️ 100" sozinho leva um "?"; depois vira fração "100 ÷ 👥 quem viu" |
| 6 | "Primeira dica: abre o seu Reels e toca em 'ver insights'." | fora | DICA 1; tela do app recriada (sem marca): o dedo toca em **Ver insights** |
| 7 | "…contas alcançadas, curtidas, compartilhamentos e tempo médio de visualização." | fora | os quatro números acendem um por palavra |
| 8 | "Segunda: faz a conta. Imagina a Ana, que vende bolo." | fora | DICA 2; perfil "Doces da Ana" (exemplo) com avatar 👩🏾‍🍳 |
| 9 | "O do bolo de chocolate… duas mil pessoas e cem curtidas." | fora | Reels 🍫 entra com 👥 2.000 e ❤️ 100 |
| 10 | "O da receita de brigadeiro… quinhentas, e também cem curtidas." | fora | Reels 🍬 entra ao lado com 👥 500 e ❤️ 100 |
| 11 | "Parece empate, né?" | card | balança equilibrada "100 = 100" |
| 12 | "Faz a conta… O bolo deu cinco por cento. O brigadeiro, vinte." | fora | as frações resolvem nos cartões: 5% × **20%**; a balança despenca para o brigadeiro |
| 13 | "E ainda foi compartilhado quarenta vezes." | fora | "↗️ 40" no brigadeiro + selo "4× MAIS" |
| 14 | "Quem agradou de verdade foi o brigadeiro. Então a Ana sabe: o próximo vídeo é receita." | fora | coroa 👑 no brigadeiro; post-it "PRÓXIMO VÍDEO: RECEITA ✓" |
| 15 | "E compara sempre com os seus próprios posts…" | card | gráfico de linha com os seus últimos posts subindo; selo "VOCÊ × VOCÊ" |
| 16 | "Se essa dica te ajudou, segue o Digo Social. Toda semana tem mais." | tela cheia (clipe B) | cartão Seguir → Seguindo ✓; "TODA SEMANA TEM MAIS" |
| 17 | (1,4 s depois) | — | tela final com a logo |

- Card de voz da Luísa no topo durante o meio, como no 015.
- Momentos artificiais do `sincronia.md` cobertos por card ou motion.

## Pontos de aprovação

1. Este roteiro e o custo (~15 créditos).
2. A voz gerada, antes dos clipes.
3. Prancha de revisão antes do render final.
