# 034. Na minha máquina funciona: plano

Roteiro em `roteiro.md`. **Aprovado pelo Diogo em 28/10/2026, versão completa (~15 créditos, 3 clipes).**

## Vozes (Seed Audio, voz do Diogo `58086f4c…`, `speech_rate` −10, `loudness_rate` 23)

| Bloco | Job | Bruto | Recorte (chiado inicial) | `_ritmo` | Whisper |
|---|---|---|---|---|---|
| gancho | `a7ab25e6…` | 5,23 s | 1,80–4,85 s | 2,53 s | certo |
| meio | `f3adcecd…` | 10,46 s | 1,05–10,40 s | 6,84 s | certo ("pra" → "para a") |
| frase | `ceef5640…` | 4,49 s | 2,50–4,49 s | 1,59 s | certo |
| cta | `4f25e168…` | 6,79 s | 0,38–6,75 s | 4,91 s | "dévi" → "dev" ✓; "ségui" → ouvido como **"seguir"** (conferir) |

- Todas vieram com chiado de 0,4–2,5 s antes da fala (padrão do Seed Audio com essa referência): recortadas antes do `cortar_pausas.py` (`--pausa 0.18 --velocidade 1.2 --cauda 0.8 --limiar 30 --fade 0.04`).
- Prévia em sequência: `revisao/vozes_034_em_sequencia.mp3` (18,3 s, com espaço para a resposta do chefe).
- Custo real: 0,9 + 0,2 + 0,5 + 0,3 = **1,9 crédito**.

## Próximo

Com as vozes aprovadas: clipes A (gancho, 4 s), B (frase, 4 s) e C (CTA, 5 s) no Seedance 2 Mini com a imagem B da Galinha (`24397dd7…`), ~13 créditos.

## Clipes (Seedance 2 Mini, imagem B `24397dd7…`, 720p 9:16)

| Clipe | Duração | Job | Sincronia (`sincronia.md`) | Momentos artificiais → cobertura |
|---|---|---|---|---|
| A · gancho | 4 s | `8dc06365…` | 5 ms, 0% > 45 ms | 0,62–0,76 «mais» → letreiro da abertura até "perigosa" |
| B · frase | 4 s | `89532afb…` | 15 ms, 20% > 45 ms | 9,84–10,18 «minha máquina» (o clipe falou "minha manha máquina") → letreiro amarelo "NA MINHA MÁQUINA" |
| C · CTA | 5 s | `409c9c04…` | 10 ms, 17% > 45 ms | «E seguir a» → cartão de perfil com o botão Seguir |

- No clipe B a Galinha ganhou "mãos" ao dar de ombros; no punch-in de "funciona!" elas saem do quadro.
- Custo real dos clipes: 4 + 4 + 5 = **13 créditos**. Total do 034: **14,9 créditos**.

## Montagem (Remotion: `src/videos/na-minha-maquina/`, composição `NaMinhaMaquina`)

- Identidade da Galinha: verde-água, rosa, azul, amarelo e preto da logo; letreiro em **Bungee**; legenda Montserrat 900 com a palavra falada em amarelo sobre preto; wipe rosa.
- **Pausa muda de 3,4 s** entre a frase e o CTA: a narração toca em duas partes e as palavras do CTA são deslocadas (`PAUSA` no código). Nela: chat do chefe ("Ótimo. Então a gente manda a sua máquina pro cliente. 📦"), notebook na caixa "FRÁGIL · ENVIAR PRO CLIENTE" e a reação congelada (último quadro do clipe B, zoom no olho).
- Legenda: "para a" → "PRA", "seguir" → "SEGUE", "funciona" → "FUNCIONA!".
- Efeitos extras sintetizados no `sfx/`: `alarme`, `vibra`, `fita`.
- Duração: 20,7 s (fim da fala 19,29 s + 1,4 s de tela final). Prévia: `revisao/preview.mp4`.

## Revisão 1 do Diogo (28/10/2026)

Pedidos: (1) "E segue a Galinha Programadora" saiu como "e segue a da linha programadora"; (2) o ritmo ficou rápido demais; (3) depois de ouvir a versão com a voz desacelerada (1,05×), "a cadência ficou legal, mas o áudio ficou claramente não natural": **manter o áudio original e a cadência nova**; (4) a animação da caixa mais lenta.

- **Voz:** volta o corte original (1,2×, `hf/ritmo_rapido/`), sem esticar a fala. A cadência vem só de **silêncio entre as frases**: no meio, +0,45 s depois de "tarde", +0,35 s depois de "computador" e +0,35 s antes de "e o sistema inteiro cai" (cortes no meio dos silêncios medidos pela energia); +0,3 s no fim do gancho. Meio: 6,84 → 8,00 s. A versão desacelerada ficou em `hf/ritmo_lento/` (descartada).
- **CTA:** regerada só a frase final em duas versões (Seed Audio, mesma receita): v1 "E segue a Galinha Programadora." (`8ff55743…`, **usada na prévia**) e v2 "Segue a Galinha Programadora!" (`77aee390…`). Emendada no silêncio depois de "isso" (2,53 s do CTA original) + 0,3 s. Sem clipe novo: o clipe C já fala "segue a galinha programadora"; só a sincronia foi refeita. Custo: 2 × ~0,3 crédito.
- **Sincronia nova:** A 5 ms / 0%; B 15 ms / 20% (só «minha máquina», coberto pelo letreiro); C 5 ms / 0% (só «galinha pro-», acelerado: o cartão de perfil agora fica até o meio de "programadora").
- **Caixa mais lenta:** o notebook cai em 0,55 s, as abas fecham em 0,35 s, a caixa sai em 0,45 s; a pausa muda passou de 3,4 para 5,1 s (a mensagem do chefe fica ~2 s inteiros na tela).
- Duração: 23,3 s.

## Revisão 2: "mais cara de meme" (28/10/2026)

O Diogo achou o vídeo bonito, mas pouco engraçado. Aprovado o pacote gratuito (sem crédito):
- **POV:** "POV: você é o dev 🫠" no topo desde o primeiro quadro; "⚠️ PERIGO" desceu para y 410.
- **Desastre maior:** +0,4 s de respiro depois do "cai" (+1,0 s no total no fim do meio). As janelas de erro derretem e entra um **rack de servidor pegando fogo** com "TÁ TUDO BEM 🙂"; as chamadas do chefe contam de 14 até 99+.
- **Óculos pixelados:** logo depois de "funciona", a Galinha congela no mesmo enquadramento (último quadro do clipe B, `prints/reacao.png`) e os óculos descem até os olhos (centros a 261 px, medidos no quadro); "😎 CONFIA".
- **Grilos:** 1,2 s de silêncio com grilos e "cri… cri…".
- **Reviravolta:** depois da caixa sair (trombone triste), "📍 NO CLIENTE": a caixa cai, abre, o notebook sobe com "✓ funciona" e o cliente manda "Agora funcionou! 👍"; corta para a Galinha de óculos com "😌 EU AVISEI" e o carimbo "FUNCIONA NA MINHA MÁQUINA ✓ COMPROVADO".
- **Sons de meme sintetizados** (`tools/gerar_sfx_meme.py`, reaproveitável nos próximos memes): `boom` (desastre e "funciona"), `disco` (o sistema cai), `grilos`, `trombone`, `plim`, além de `alarme`, `vibra`, `fita`.
- Pausa muda: 9,6 s. Duração: 28,8 s.

## Final (aprovado pelo Diogo em 28/10/2026)

- Arquivo: `edicoes/034. na-minha-maquina/na-minha-maquina_final.mp4`.
- Validação: 1080×1920, 30 fps, h264 + AAC estéreo, **28,8 s** (fim da fala 27,39 s + 1,4 s), **−13,8 LUFS**, pico **−1,5 dBTP**. Prancha: `revisao/prancha_final.jpg`.
- Custo total na Higgsfield: **15,4 créditos** (vozes 1,9 + clipes 13 + frase do CTA 0,5).

### Legenda do post

> POV: você é o dev 🫠
>
> Sexta, 18h, deploy feito… e o sistema inteiro cai. 🔥
> "Mas na minha máquina funciona!" 😎🐔
>
> Marca aquele dev que vive falando isso 👇 e segue a @galinhaprogramadora pra mais memes de TI.
>
> #programacao #memesdeti #devhumor #desenvolvedor #galinhaprogramadora

### Para o próximo

- Próximo meme planejado: **"Dev da família"**, com a ponte para o Digo Social (site, "acessa o Digo"), seguindo a regra de 1 ponte a cada 3 memes.
- Tudo o que foi decidido aqui está consolidado em `guias/7-padrao-galinha-programadora.md`.
