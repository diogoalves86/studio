# 018. responder-comentario: plano

Reels vertical 1080×1920, ~45 s, com a Luísa (guia 6, seção 0). Roteiro, gancho e fonte em [roteiro.md](roteiro.md). Código-base: `src/videos/carrossel-segunda-chance/` (017), com a mesma abertura forte (freada, alerta vermelho, carimbo).

## Geração (Higgsfield) — estimativa, nada gerado

| Asset | Modelo | Configuração | Custo |
|---|---|---|---|
| Voz: gancho | `elevenlabs_v4` | clone oficial `1c0dd5f2…`, português normal | ~0,5 |
| Voz: meio | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | ~3,5 |
| Voz e clipe do CTA | — | reaproveitados do 015 (mesma frase) | 0 |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, ~5 s, `start_image` = `4312127e…`, referência com a duração exata do clipe | ~5 |
| **Total** | | | **~9 créditos** |

Os valores exatos saem do `get_cost` quando o conector da Higgsfield estiver autorizado de novo. Cada geração só acontece com o "sim" do Diogo; a voz é aprovada antes do clipe.

## Cenas

| # | Fala | Luísa | Na tela |
|---|---|---|---|
| 0 | (primeiro quadro) | fora (motion) | comentários rolando rápido e freando em "Vocês entregam em outra cidade?" → "Entregamos sim! 😊" |
| 1 | "Para de responder comentário assim." | tela cheia, punch-in em "Para" | ✕ vermelho na resposta em texto, alerta vermelho nas bordas |
| 2 | "Você está perdendo o seu melhor vídeo." | tela cheia | selo "VÍDEO PERDIDO ✕"; contador "⏳ a solução aparece em Ns" |
| 3 | "muita gente ficou com a mesma dúvida…" | fora | 1 comentário vira fileira de rostinhos com "?" |
| 4 | "…fica escondida lá embaixo…" | fora | celular rola; resposta some em "Ver todos os 48 comentários" |
| 5 | "…um botão pra responder comentário com um Reels…" | fora | botão de responder + ícone de Reels acendendo; selo de fonte TechCrunch |
| 6 | "O comentário aparece colado no vídeo…" | fora | Reels com a figurinha do comentário no topo |
| 7 | Dica 1 | fora | DICA 1; comentários ✓ / ✓ / ✕ ("exemplo") |
| 8 | Dica 2 | fora | DICA 2; linha do tempo comentário → resposta em 1 frase → explicação |
| 9 | CTA (áudio e clipe do 015) | tela cheia | cartão Seguir → Seguindo ✓; "TODA SEMANA TEM MAIS" |
| 10 | (1,4 s depois) | — | tela final com a logo |

- Card de voz da Luísa no topo durante o meio, como no 015–017.
- Imagem do clipe adiantada 3 quadros; render a −14 LUFS.
- Legenda desligada onde o texto já está na tela; nada em cima da faixa da legenda (lição da prancha do 017).

## Pontos de aprovação

1. Este roteiro e o custo (~9 créditos, confirmado no `get_cost`).
2. A voz gerada, antes do clipe (comparada com a do 017).
3. Prancha de revisão antes do render final.
