# 022. shadowban-causas: plano

Reels vertical 1080×1920, ~60 s, com a Luísa (guia 6, seção 0). Roteiro e fontes em [roteiro.md](roteiro.md). Código-base: `src/videos/shadowban/` (020): PalavraShadowban com glitch, telas animadas do Status, abertura "erro fatal". Telas **animadas**, sem prints (pedido do Diogo).

## Geração (Higgsfield)

| Asset | Modelo | Configuração | Custo |
|---|---|---|---|
| Voz: gancho | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | `get_cost` |
| Voz: meio | `elevenlabs_v4` | clone oficial `1c0dd5f2…` | `get_cost` |
| Voz e clipe do CTA | — | reaproveitados do 015 | 0 |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, 4–5 s conforme o gancho | 4–5 |

Cada geração só com o "sim" do Diogo.

## Pontos de aprovação

1. Este roteiro e o custo.
2. A voz gerada, antes do clipe.
3. Prancha de revisão antes do render final.

## Execução

- Gasto real: 9,37 créditos (voz 0,46 + 3,91 com o clone oficial; clipe A Seedance 2 Mini 5 s = 5). CTA reaproveitado do 015.
- Voz no ritmo cadenciado; "repost" sai "reposti" (jeito brasileiro), aprovado pelo Diogo.
- Sincronia: clipe A mediana 2 ms (0% > 45 ms). O relatório marcou 2,32–2,46 s («e») como artificial: a abertura (4 cartas + "4" + SHADOWBAN) cobre até "você". Boca conferida quadro a quadro no resto do gancho.
- Retenção: no lugar do contador, um marcador "1 2 3 4" acende a cada causa (rodapé). Cada causa é uma carta que vira com o nome em letras grandes.
- Final: `edicoes/022. shadowban-causas/shadowban-causas_final.mp4`, 58,4 s, 1080×1920, −14,0 LUFS, pico −1,9 dBTP.
- **Aprovado pelo Diogo em 23/10/2026**, pronto para postar.
