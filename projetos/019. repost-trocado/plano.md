# 019. repost-trocado: plano

Reels vertical 1080×1920, ~45 s, com a Luísa (guia 6, seção 0). Roteiro, gancho e fontes em [roteiro.md](roteiro.md). Código-base: `src/videos/responder-comentario/` (018), com a abertura "erro fatal" (freada, alerta vermelho, carimbo, contador).

## Geração (Higgsfield) — estimativa, nada gerado

| Asset | Modelo | Configuração | Custo |
|---|---|---|---|
| Voz: gancho | `elevenlabs_v4` | clone oficial `1c0dd5f2…`, português normal | ~0,5 |
| Voz: meio | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | ~3,3 |
| Voz e clipe do CTA | — | reaproveitados do 015 (mesma frase) | 0 |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, 4 s, `start_image` = `4312127e…`, referência com a duração exata do clipe | 4 |
| **Total** | | | **~7,8 créditos** |

Valores exatos pelo `get_cost` antes de cada geração; cada uma só com o "sim" do Diogo, voz aprovada antes do clipe.

## Cenas

| # | Fala | Luísa | Na tela |
|---|---|---|---|
| 0 | (primeiro quadro) | fora (motion) | feed rolando rápido e freando no post da "sua.lojinha" |
| 1 | "Esse erro faz o Instagram trocar…" | tela cheia, punch-in em "trocar" | post vira como carta → post do "@criador.original"; carimbo "TROCADO ✕"; alerta vermelho |
| 2 | "…o seu post pelo de outra pessoa." | tela cheia | contador "⏳ o erro aparece em Ns" |
| 3 | "O erro é repostar…" / "dois posts iguais" | fora | dois cards idênticos com "=" |
| 4 | "recomenda só o original" / "quem ainda não te segue" | fora | ORIGINAL ✓, repost apaga; celular de quem não segue; selo de fonte Social Media Today |
| 5 | "foto e carrossel" / "sai da recomendação" | fora | Reels ✓ → foto ✓ → carrossel ✓ "DESDE ABRIL/2026"; selo TechCrunch |
| 6 | Dica 1 | fora | DICA 1; "IDEIA DELE" → "SUA VERSÃO" |
| 7 | Dica 2 | fora | DICA 2; camadas "🎙️ sua narração", "💬 seu comentário", "créditos: @criador" |
| 8 | CTA (áudio e clipe do 015) | tela cheia | cartão Seguir → Seguindo ✓; "TODA SEMANA TEM MAIS" |
| 9 | (1,4 s depois) | — | tela final com a logo |

- Card de voz da Luísa no topo durante o meio, como no 015–018.
- Imagem do clipe adiantada 3 quadros; render a −14 LUFS.
- Boca conferida quadro a quadro no gancho (guia 6, seção 0, item 4 da sincronia); elementos no peito abaixo de ~1340 px.

## Pontos de aprovação

1. Este roteiro e o custo (~7,8 créditos).
2. A voz gerada, antes do clipe.
3. Prancha de revisão antes do render final.
