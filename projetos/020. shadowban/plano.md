# 020. shadowban: plano

Reels vertical 1080×1920, ~50 s, com a Luísa (guia 6, seção 0). Roteiro, gancho e fontes em [roteiro.md](roteiro.md). Código-base: `src/videos/repost-trocado/` (019), com a abertura "erro fatal" (freada/alerta/carimbo/contador). Prints reais do app em `prints/` (Configurações e atividade; Status da conta).

## Geração (Higgsfield) — estimativa, nada gerado

| Asset | Modelo | Configuração | Custo |
|---|---|---|---|
| Voz: gancho | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | ~0,5 |
| Voz: meio | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | ~4,2 |
| Voz e clipe do CTA | — | reaproveitados do 015 | 0 |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, 4 s, `start_image` = `4312127e…` | 4 |
| **Total** | | | **~8,7 créditos** |

Valores exatos pelo `get_cost`; cada geração só com o "sim" do Diogo. Corte da voz no ritmo cadenciado aprovado no 019 (`--pausa 0.28 --pausa-frase 0.5 --velocidade 1.12`).

## Cenas

| # | Fala | Luísa | Na tela |
|---|---|---|---|
| 0 | (primeiro quadro) | fora (motion) | perfil com posts ficando cinza e sumindo; olho riscado |
| 1 | gancho | tela cheia, punch-in em "existe" | carimbo "SHADOWBAN EXISTE" e "VOCÊ ESTÁ NELE?"; alerta vermelho; contador "⏳ a tela aparece em Ns" até "Status da conta" |
| 2 | "Funciona assim… quem te segue / não te segue" | fora | celular SEGUIDOR ✓ × NÃO SEGUE ✕ |
| 3 | "perfil inteiro… shadowban" | fora | perfil cinza nas sugestões; carimbo "SHADOWBAN" |
| 4 | "motivos mais comuns" | fora | 🔞 · 🥊 · 🚬; selo Central de Ajuda |
| 5 | "Pra ver…" | fora | Perfil → ☰ → print "Configurações e atividade" (zoom + marca-texto em "Status da conta") |
| 6 | "Qualificação de recomendação… verde" | fora | print "Status da conta", marca-texto no item, ✓ pulsando; selo Instagram para criadores |
| 7 | Dica 1 | fora | DICA 1; item com ⚠️ ("exemplo") → post com EDITAR / APAGAR |
| 8 | Dica 2 | fora | DICA 2; "pedir nova análise" com toque; "A EQUIPE REVISA ✓" |
| 9 | CTA (015) | tela cheia | Seguir → Seguindo ✓; "TODA SEMANA TEM MAIS" |
| 10 | (1,4 s depois) | — | tela final com a logo |

- Prints íntegros (regra 5): zoom e marca-texto por cima, sem editar o conteúdo.
- Boca conferida quadro a quadro no gancho; trechos artificiais cobertos com motion em tela cheia.

## Pontos de aprovação

1. Este roteiro e o custo (~8,7 créditos).
2. A voz gerada, antes do clipe.
3. Prancha de revisão antes do render final.

## Execução

- Gancho trocado para a opção 4 a pedido do Diogo: "O shadowban existe, e o Instagram tem uma tela que mostra se você está nele."
- Gasto real: 9,14 créditos (voz 0,46 + 3,68 com o clone oficial; clipe A Seedance 2 Mini **5 s** = 5, porque o gancho tem 4,5 s). CTA reaproveitado do 015.
- Voz no ritmo cadenciado do 019. "Shadowban" escrito normal; o Diogo ouviu os dois trechos e aprovou a pronúncia.
- Pedido do Diogo: "SHADOWBAN" escrito grande na tela quando ela fala (abertura e "todo mundo chama de shadowban"), com glitch vermelho/ciano.
- Prints reais (Configurações e atividade; Status da conta) com zoom, marca-texto e círculo verde pulsando no ✓ de "Qualificação de recomendação"; o estado com ⚠️ é simulado e marcado "exemplo".
- Sincronia: clipe A mediana 2 ms; a abertura cobre até "e o Instagram"; boca conferida quadro a quadro no resto do gancho.
- Final: `edicoes/020. shadowban/shadowban_final.mp4`, 55,5 s, 1080×1920, −14,0 LUFS, pico −1,9 dBTP.
