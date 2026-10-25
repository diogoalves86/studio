# 026. reels-amador: plano

Reels vertical 1080×1920, ~50 s, com a Luísa. Roteiro e fontes em [roteiro.md](roteiro.md). Código-base: `src/videos/shadowban-negado/` (025) + cartão do Mosseri. Telas animadas (antes × depois), sem prints.

## Geração (Higgsfield)

Voz (clone oficial `1c0dd5f2…`) pelo `get_cost`; clipe A Seedance 2 Mini conforme o gancho; CTA reaproveitado do 015. Cada geração só com o "sim" do Diogo.

## Pontos de aprovação

1. Roteiro e custo da voz.
2. Voz gerada, antes do clipe.
3. Prancha de revisão antes do render final.

## Pedido do Diogo (24/10/2026): mais animação, "como se fosse a própria Luísa gravando"

- Sem gastar crédito extra: as cenas de antes × depois usam a **foto oficial da Luísa** (`luisa-ref.png`) dentro de um celular animado, simulando a câmera dela:
  - **luz:** de costas para a janela (silhueta escura e fundo estourado, por filtro) → de frente para a janela (rosto iluminado);
  - **som:** celular longe (Luísa pequena no quadro, ondas de eco) → a um braço de distância (rosto grande, microfone de lapela);
  - **começo:** a Luísa no celular com a legenda "Oi, gente, tudo bem?" e o dedo passando → corte direto para o resultado;
  - **apoio:** celular tremendo na mão → em pé, apoiado num copo, imagem firme;
  - interface de gravação (botão vermelho REC, contador 00:03, grade de enquadramento) por cima.
- Opção paga, só se o Diogo quiser: 3 imagens novas da Luísa gravando (GPT Image 2.5 high ≈ 2,75 cada ≈ 8,3 créditos).

## Execução

- Gasto real: 8,14 créditos (voz 0,46 + 3,68 com o clone oficial; clipe A Seedance 2 Mini 4 s = 4). O gancho tem 3,87 s, e a referência foi montada com 0,12 s de silêncio para caber em 4 s, economizando 1 crédito. CTA reaproveitado do 015. Sem imagens extras.
- "Luísa gravando": componente `CameraLuisa` (foto oficial dela num celular com REC, cronômetro e grade) com os modos contraluz / luz / longe / perto e tremor; antes × depois animados em cada erro.
- Sincronia: clipe A mediana 8 ms (0% > 45 ms). O fim do clipe (3,66–3,87 s) fica artificial: ela sai 0,22 s antes do meio. Boca conferida quadro a quadro.
- Final: `edicoes/026. reels-amador/reels-amador_final.mp4`, 57,8 s, 1080×1920, −14,0 LUFS, pico −1,9 dBTP.
- **Aprovado pelo Diogo em 25/10/2026**, pronto para postar.
