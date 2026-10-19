# 011. taticas-da-eleicao: plano e execução

> Reels de dica no padrão do guia 6 (seção 12). Roteiro em [roteiro.md](roteiro.md). Pedidos do Diogo (18/10/2026):
> - imparcialidade mostrada, não declarada ("não importa em quem você vota");
> - pontos fortes de cada campanha, sem dizer qual é melhor;
> - nomes mantidos, inclusive no gancho (risco de alcance explicado e aceito);
> - comparativo com quem tem negócio próprio depois de cada bloco;
> - animações caprichadas.

## Gerado na Higgsfield (~19 créditos; estimado ~16)

| Asset | Arquivo | Créditos |
|---|---|---|
| Voz completa (receita de dica) | `hf/voz_eleicao.mp3` → `_ritmo.wav` (68,8 → 52,4 s) | ~7,5 |
| Frase nova do "No seu negócio 1" | `hf/voz_frase_cliente.mp3` → `_ritmo.wav`, emendada em `hf/voz_eleicao_v2_ritmo.wav` (54,8 s) | ~0,6 |
| Avatar A (5 s) e B (6 s) | `hf/avatar_A.mp4`, `hf/avatar_B.mp4` → `sync_*.mp4` | 11 |

- **Revisão do Diogo:** "chamar outras pessoas para gravar" era fraco para a lojinha. A frase virou **"E deixa o cliente falar por você: reposta o story de quem te marcou e pede um vídeo curtinho de quem amou."** É a versão realista da rede de vozes. Gerei só a frase, cortei as pausas a 1,3× e emendei.
- **Lição:** a voz emendada precisa terminar em `_ritmo` no nome. Sem isso, `tools/narracao.py` recorta as pausas de novo e muda a cadência aprovada.
- **Sincronia:**
  - **A:** atraso mediano de 0 ms; "jeito que dá" (3,26 s) vira motion.
  - **B:** atraso mediano de 5 ms, mas 21% das janelas acima de 45 ms. O avatar só fica cheio em "pra quem tem negócio" e "segue o Digo Social"; o resto é motion ("MANDA", "PRA QUEM PRECISA APARECER", "TODA SEMANA TEM MAIS").

## Neutralidade na tela

- Cartões "CAMPANHA LULA" e "CAMPANHA FLÁVIO" idênticos (270 px, cinza/azul, nada de vermelho, verde ou amarelo).
- A mesma estrutura em cada bloco ("o que faz" → "💪 PONTO FORTE") e os mesmos sons.
- Nenhum placar.
- Tempo de fala: ~9,5 s no bloco do Lula e ~7,5 s no do Flávio, porque o texto do Lula tem mais informação. O Diogo foi avisado e aprovou assim.

## Render e validação

- Código em `src/videos/taticas-da-eleicao/`, composição `TaticasDaEleicao`.
- Final: `edicoes/011. taticas-da-eleicao/taticas-da-eleicao_final.mp4`: 1080×1920, 30 fps, h264 + AAC 48 kHz, 56,2 s (54,8 + 1,4), **−14,2 LUFS**, pico **−1,9 dBTP**. Cópia leve em `frames/final_celular.mp4`.
