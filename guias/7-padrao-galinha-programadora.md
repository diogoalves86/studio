# Padrão Galinha Programadora: Reels de memes de TI

Este é o **padrão obrigatório** dos vídeos da página **Galinha Programadora (@galinhaprogramadora)** no Instagram, a segunda linha de Reels do Diogo, ao lado do Digo Social. Ele saiu dos projetos `033. galinha-programadora` (personagem e voz, 28/10/2026) e `034. na-minha-maquina` (primeiro Reels, aprovado em 28/10/2026 depois de três rodadas). O código de referência é [src/videos/na-minha-maquina/](../src/videos/na-minha-maquina/), e os planos completos estão em `projetos/033…/plano.md` e `projetos/034…/plano.md`.

**Como este guia se relaciona com o guia 6:** a **técnica** é a mesma do padrão do Digo Social ([guia 6](6-padrao-reels-avatar.md)): avatar no Seedance 2 Mini, voz gerada separada, corte de pausas, boca sincronizada quadro a quadro, momentos artificiais cobertos por motion, legenda dinâmica, efeitos sonoros, −14 LUFS e mídia fora do git. A **identidade**, a **voz**, o **tom** e o **CTA** são da Galinha, e estão aqui. Quando os dois guias divergirem num vídeo da Galinha, **este guia manda**.

Para um vídeo novo da Galinha: leia este guia inteiro, copie `src/videos/na-minha-maquina/` e siga a seção 10 (passo a passo).

---

## 0. Regras inegociáveis (resumo)

1. **Nenhum crédito da Higgsfield sem perguntar antes**, com o custo estimado, inclusive regravação pequena dentro de um orçamento já aprovado. Depois de cada lote, confira o gasto real em `transactions`.
2. **Personagem e voz são sempre os mesmos** (seção 1 e 2). Nada de Luísa, nada da voz da Luísa, nada da paleta azul do Digo.
3. **A voz não é desacelerada.** A cadência vem de **silêncio entre as frases**, nunca de esticar a fala (seção 3).
4. **No texto da voz da Galinha, o "te" é escrito "ti", nunca "tchi".** "Segue" é escrito "segue", nunca "ségui".
5. **Todo gatilho vem de uma palavra falada** (`em('palavra')`). Na pausa muda, os tempos saem do início da pausa (`T.chefe + …`), nunca de um número solto.
6. **Digo Social é um SITE**, não aplicativo: "acessa o Digo, tá no link da bio". Nunca "app", "aplicativo" ou "baixa" (seção 8).
7. **Pontos de aprovação:** roteiro → custo das vozes → vozes → custo dos clipes → prévia (`revisao/preview.mp4`) → render final.
8. **Nunca versionar vídeo, áudio ou imagem.** Commits só com código, guias, `plano.md`, `roteiro.md`, `narracao.json` e transcrições.

## 1. Personagem e identidade

| Item | Valor |
|---|---|
| Página | **Galinha Programadora**, `@galinhaprogramadora` |
| Conteúdo | **memes de TI** e dicas rápidas de programação e desenvolvimento de sistemas |
| Personagem | a galinha da logo enviada pelo Diogo: ilustração de traço preto grosso, estilo quadrinho, penas marrom-avermelhadas, crista e barbela rosa, bico amarelo, olhos com cílios, **fone azul no pescoço**, fundo verde-água com raios |
| Logo | `projetos/033. galinha-programadora/prints/galinha_original.jpg` (1080×1080, com o letreiro "GALINHA PROGRAMADORA"). Em cada projeto, copie para `prints/logo.jpg` |
| **Imagem oficial para falar** (`start_image` dos clipes) | **versão B, busto de frente**, job `24397dd7-59f1-4c83-ae2e-1cb2c2628274` (cópia local: `projetos/033…/hf/galinha_b_busto.png`; em cada projeto, `prints/galinha.png`) |

**Por que a versão B:** das 3 versões geradas a partir da logo (GPT Image 2.5, high, 2k, 9:16, 2,75 créditos cada), a B tem o bico de frente (a boca sincroniza melhor) e deixa o terço de baixo livre para legenda. A A (com notebook) tapava a parte de baixo; a C (3/4, com símbolos `{} </> ;`) tinha o bico de lado e "texto" gerado por IA no fundo.

**Paleta** (`tema.tsx`, tirada da logo):

| Nome | Cor | Uso |
|---|---|---|
| `verde` | `#5CC9A7` | fundo da logo, tela final, balão "eu" no chat |
| `verdeEscuro` / `verdeNoite` | `#0E3B31` / `#072019` | fundo das cenas animadas (com os raios girando) |
| `rosa` | `#FF4F9A` | destaque, botão DEPLOY, wipe |
| `azul` | `#2F6FE0` | etiquetas neutras |
| `amarelo` | `#FFE45C` | letreiro principal, palavra falada na legenda |
| `preto` | `#111111` | fundo dos letreiros e da legenda ativa |
| `vermelho` | `#FF3B3B` | erro, alerta, desastre |
| `terminal` | `#39FF88` | texto de terminal, "✓", sucesso |

**Tipografia:** **Bungee** (`@remotion/google-fonts/Bungee`) nos letreiros, carimbos e no @, imitando o letreiro grosso da logo; **Montserrat 900** na legenda; **Inter** em rótulos, chats e notificações; `Menlo, monospace` no terminal.

## 2. Voz oficial da Galinha

A voz da Galinha é **a voz do Diogo** (a mesma referência usada nos Reels 001–013 do Digo Social), gerada no **Seed Audio**:

| Parâmetro | Valor |
|---|---|
| Modelo | `seed_audio` |
| Referência | `medias: [{value: '58086f4c-58ea-4cc1-8bd4-e9f3402f7c5d', role: 'audio_references'}]` |
| `speech_rate` | **−10** (receita de dica; com 5 a fala embolou: "sou **Adalinha**", "te **cheio de** mostrar") |
| `loudness_rate` | 23 |
| Formato | `mp3`, 24 kHz |
| Custo real | ~0,2–0,9 crédito por bloco (≈ 0,1 crédito por segundo de fala) |
| Referência aprovada | `projetos/033…/hf/voz_diogo_3_ti_ritmo.wav` ("Fala, dev! Eu sou a Galinha Programadora. Hoje eu vou ti mostrar…") |

**Histórico da escolha (para não repetir testes):**
- 5 vozes masculinas prontas do ElevenLabs v4 (Callum, Bram, Marcus, Andre, Julian; 0,69 crédito cada): o Diogo **não gostou de nenhuma** ("não gostei muito da voz"). Andre e Julian foram as mais limpas (72–73 dB voz/fundo).
- O Diogo pediu para testar a voz dele: a versão com `speech_rate` −10 ficou "quase boa"; o único problema era o "tchi" (seção 4). Corrigido com "ti", **aprovada**.
- O clone no ElevenLabs a partir dessa voz (40 créditos) **não foi feito**. Fica como opção se a voz começar a variar entre gerações; pergunte antes.

**Cuidados com essa voz:**
- O Seed Audio com essa referência **devolve 0,4 a 2,5 s de chiado antes da fala** (às vezes também no fim). **Recorte antes de qualquer coisa**: meça a energia a cada 100 ms, ache o começo da fala (onde passa de −25 dB) e corte uns 0,05 s antes (`ffmpeg -af "atrim=<ini>:<fim>,asetpts=N/SR/TB"` → `voz_<bloco>_limpa.wav`). Sem isso, o `cortar_pausas.py` trata o chiado como fala.
- O ruído de fundo é bem maior que o das vozes prontas (~30 dB entre voz e fundo, contra ~70 dB). Na montagem, só o `highpass=f=70` leve.

## 3. Ritmo: cadência com silêncio, nunca com fala lenta (regra do Diogo, 28/10/2026)

1. **Corte de pausas de cada bloco** (o mesmo da voz do Diogo nos vídeos de dica):
   `python tools/cortar_pausas.py --pausa 0.18 --velocidade 1.2 --cauda 0.8 --limiar 30 --fade 0.04 "<projeto>/hf/voz_<bloco>_limpa.wav" "<projeto>/hf/voz_<bloco>_ritmo.wav"`
2. **Respiros entre as frases**, inseridos à mão no meio dos silêncios medidos pela energia (nunca no fim da palavra do Whisper): no 034, +0,45 s depois de "seis da tarde", +0,35 s depois de "computador", +0,35 s antes de "e o sistema inteiro cai" e +0,3 s no fim do gancho. Em zsh, use `anullsrc=r=48000:cl=stereo` com o número escrito (`$SR:cl` vira outra coisa no zsh).
3. **Respiro depois do clímax**: +1,0 s depois do "cai" para o desastre ter tempo de ser visto (`apad=pad_dur=…` no fim do bloco).

**Por quê:** a primeira versão (só o corte a 1,2×) ficou "rápido demais, não dá para entender". A segunda (corte a 1,05× com pausas de 0,25 s) teve "a cadência legal, mas o áudio ficou claramente não natural". A aprovada mantém a fala original e só abre silêncio entre as frases. **Não desacelere a voz.**

## 4. Texto da voz escrito como é falado (voz do Diogo no Seed Audio)

Mesma regra crucial do guia 6 (seção 1, regra 9), com as grafias desta voz:

| Escreva | Não escreva | Por quê |
|---|---|---|
| **"ti"** (ti mostrar) | "tchi", "te" | "tchi" é grafia da Luísa no ElevenLabs; no Seed Audio sai esticado e quebrado no meio da sílaba. "te" passa, mas "ti" saiu mais fluido |
| **"segue"** | "ségui" | "E ségui a Galinha" emendou e soou como "e segue **a da linha** programadora" |
| **"dévi"** ou "dev" | — | "dévi" foi entendido como "dev"; "dev" puro às vezes vira "Deve"/"Dave". Confira no Whisper |
| "pra" | "para" | fala natural |

O roteiro, a legenda e os textos na tela ficam no português correto. Na legenda, corrija o que o Whisper escreve diferente da fala com a tabela `troca` do `NaMinhaMaquina.tsx` (`para a` → PRA, `deve` → DEV, `seguir`/`segui` → SEGUE, `funciona` → FUNCIONA!). Para gatilhos em palavras que o Whisper escreve de jeito variável, use `proxima(em('aquele'))` em vez de `em('dev')`.

## 5. Clipes da Galinha falando (Seedance 2 Mini)

| Item | Valor |
|---|---|
| Modelo | `seedance_2_0_mini`, 720p, 9:16, `generate_audio: true` |
| `start_image` | job `24397dd7-59f1-4c83-ae2e-1cb2c2628274` (imagem B) |
| `audio_references` | a voz `_ritmo` do bloco com **0,15 s de silêncio no começo**, completada até a duração do clipe, em **mp3** (o upload pede `audio/mpeg`) |
| Duração | número inteiro de 4 a 15 s (o mínimo é 4 s, mesmo para frase curta) |
| Custo real | **1 crédito por segundo** (4 s = 4 créditos) |

**Prompt base** (troque a expressão e a fala):

> 2D hand-drawn cartoon animation, same thick black ink outlines and comic illustration style as the image. The cartoon hen looks straight at the camera with a **[expressão: serious, suspicious / innocent, overconfident smile and shrugs her wings / playful, mischievous smile]** and says in Brazilian Portuguese: "**[fala]**" Exact lip-sync: the beak opens and closes in sync with every syllable of the audio reference, same speed and timing, no extra pauses. After speaking, she **[reação: holds the serious look / keeps a smug grin / one quick wink]**. Static camera, same mint-green background with radiating speed lines. No text on screen.

**Quantos clipes:** só onde a Galinha precisa aparecer falando: gancho, a frase-piada e o CTA. O resto é animação no Remotion (de graça). No 034: 3 clipes (4 + 4 + 5 s) = 13 créditos.

**O que aprendemos:**
- O bico sincroniza bem com o traço de quadrinho: atraso mediano de 5–15 ms no `sincronia.md`.
- Ao "dar de ombros", o gerador desenhou **mãozinhas** no lugar das asas. Ficou engraçado, mas no punch-in elas saem do quadro. Se não quiser mãos, peça no prompt "wings, no hands".
- O clipe às vezes fala uma palavra a mais ("minha **manha** máquina"): o `sincronizar_avatar.py` acelera esse trecho e o lista em "Momentos artificiais". Cubra com motion (seção 6).
- Depois de mudar a voz (corte, respiros, frase regerada), **não precisa gerar clipe novo**: rode de novo `narracao.py` e `sincronizar_avatar.py`, que redistorcem o mesmo clipe.

## 6. Montagem no Remotion (referência: `src/videos/na-minha-maquina/`)

Arquivos: `tema.tsx` (paleta, fontes, `ARQ`), `palavras.ts` (gerado pelo `narracao.py`, não editar), `NaMinhaMaquina.tsx` (tudo), `index.tsx`. Composição registrada em `src/Root.tsx` dentro de `<Folder name="034-na-minha-maquina">`.

- **Câmera da Galinha** com dois estados: `cheia` (com zoom por frase e **punch-in** com tremor nas palavras de impacto) e `fora` (motion cheio). **Cortes secos de 0,12 s** (é meme, não aula), em vez dos 0,3–0,45 s do Digo.
- **Momentos artificiais** do `sincronia.md` sempre cobertos: tipografia na abertura (o clipe congela no começo), letreiro amarelo de tela cheia ("NA MINHA MÁQUINA") no trecho acelerado da frase, cartão de perfil com Seguir no trecho acelerado do CTA.
- **Pausa muda** (`PAUSA` no código): entre a frase-piada e o CTA, a narração para (toca em duas `<Sequence>`, a segunda com `trimBefore`) e as palavras do CTA são deslocadas. É ali que entram as piadas visuais sem fala (chat do chefe, caixa, reviravolta). Os tempos internos saem de `T.chefe + …` (`CH` no código).
- **Galinha congelada**: o último quadro do clipe B (`ffmpeg -sseof -0.05 -i hf/sync_B.mp4 -frames:v 1 prints/reacao.png`), mostrado com o mesmo enquadramento do fim do punch-in (`ESCALA_CONGELADA = 1.28`) para o corte não pular. Serve para reações sem gastar crédito. **Refaça o `reacao.png` sempre que refizer a sincronia.**
- **Card de voz** no topo enquanto a Galinha está fora de cena: foto da Galinha, "Galinha", "@galinhaprogramadora" e as barrinhas rosa/amarelo.
- **Legenda dinâmica**: Montserrat 900, 76 px, caixa alta, grupos de até 3 palavras; a palavra falada fica **amarela sobre preto** (vermelha em "cai", rosa em "FUNCIONA!"). Some quando a frase já está escrita na tela.
- **Wipe rosa** (amarelo → rosa → verde) nas trocas de bloco e na tela final.
- **Tela final** (1,4 s): fundo verde com raios girando, a logo grande (640 px, cantos de 60 px, borda preta) e "@galinhaprogramadora" em Bungee preto.
- Textura de grão a 6% e câmera na mão leve, como no Digo.

## 7. Linguagem de meme (o que deixa engraçado)

Na primeira versão, o vídeo ficou "legal, mas sem cara tão engraçada". O diagnóstico: ele **contava** a piada como história. Meme funciona por **ruptura**: silêncio desconfortável, exagero absurdo, som na hora errada, reviravolta. O pacote aprovado (tudo de graça):

| Recurso | Como | Onde no 034 |
|---|---|---|
| **POV** | pílula branca "**POV:** você é o dev 🫠" no topo desde o primeiro quadro | gancho |
| **Exagero** | janelas de erro empilhando e **derretendo**; **servidor em chamas** 🔥 com "TÁ TUDO BEM 🙂" (desenhado por nós, sem usar o meme original); contador "14 → 99+ chamadas perdidas" | desastre |
| **Óculos pixelados** | óculos de pixel desenhados em SVG descendo até os olhos da Galinha congelada + letreiro "😎 CONFIA". Posição dos olhos medida no quadro (no 034: esquerdo (435, 531), direito (696, 549) em 1080×1920; grade de 18 colunas de 29 px) | depois de "funciona!" |
| **Silêncio constrangedor** | 1,2 s de **grilos** com a Galinha parada e "cri… cri…" | antes do chefe |
| **Diálogo mudo** | chat com "digitando…" e a resposta do chefe (~1,9 s inteiros na tela para ler) | pausa muda |
| **Reviravolta** | a caixa chega "📍 NO CLIENTE", abre, o notebook sobe com "✓ funciona", "Agora funcionou! 👍" → Galinha de óculos "😌 EU AVISEI" + carimbo "FUNCIONA NA MINHA MÁQUINA ✓ COMPROVADO" | fim da pausa |
| **Sons de meme** | `boom`, `disco`, `grilos`, `trombone`, `plim` (seção 9) | todo o vídeo |
| **Pedir marcação** | "👇 MARCA AQUELE DEV" + comentário de exemplo "@dev_do_time olha você aqui 😂" | CTA |

**Ritmo de animação:** o Diogo pediu a caixa "um pouco mais lenta": notebook caindo em 0,55 s, abas fechando em 0,35 s, caixa saindo em 0,45 s. Animações que contam a piada precisam ser **vistas**: não acelere.

**Ideia guardada (pergunte antes, ~12 créditos uma vez só):** um **banco de reações** da Galinha sem fala (suando de nervoso, olho tremendo, cara de choque; 3 clipes de 4 s no Seedance Mini, `generate_audio: false`), reaproveitado em todos os memes no lugar do quadro congelado.

## 8. Ponte para o Digo Social (parceiro)

O Digo Social é um **aplicativo parceiro** da página no sentido de parceria, mas na fala é sempre **site** (regra do Digo de 28/10/2026): "O Digo Social é um site que sugere o post, escreve a legenda e agenda. Você só aprova. Acessa o Digo: tá no link da bio." Nunca "app", "aplicativo" nem "baixa".

- **Frequência:** em **1 de cada 3 memes**. Os outros só com a piada e o CTA de seguir a Galinha, para a página não virar vitrine. O 034 (estreia) foi **sem ponte**, de propósito; o próximo planejado é o "Dev da família", **com ponte**.
- **A ponte só funciona se o Digo resolver o problema do próprio meme.** O público da Galinha (devs) tem uma dor real que o Digo resolve: **dev odeia fazer marketing / postar**. Ideias aprovadas:
  1. **"O dev da família / da empresa"** (preferida): o faz-tudo de TI arruma impressora, Wi-Fi e agora "cuida do Instagram da loja". Ponte: "Impressora eu não salvo. Mas o Instagram, o Digo Social resolve…"
  2. **"Dev automatiza tudo… menos o Instagram"**: ✓ deploy, ✓ testes, ✓ backup automáticos; ✗ "post no Instagram: na mão". Ponte: "Se repete, automatiza. O Digo Social sugere o post e agenda; só publica depois que você aprova."
  3. **"O side project sem usuário"**: "1.247 commits, 0 posts, 0 usuários". Ponte: "Código bom não se divulga sozinho…"
- **Regras:** o meme fecha sozinho primeiro; a ponte vem depois da piada, em uma frase; só cita o que o Digo já faz (sugere o post, cria a imagem e a legenda, agenda, publica só depois da aprovação); **selo "🤝 parceiro" na tela e #parceria na legenda** (publicidade identificada, como pede o CONAR).

## 9. Efeitos sonoros

Gere os dois conjuntos em todo projeto da Galinha:
```bash
python tools/gerar_sfx.py "projetos/<NNN. slug>"
```
```bash
python tools/gerar_sfx_meme.py "projetos/<NNN. slug>"
```
O primeiro faz os sons padrão (whoosh, swoosh, impacto, pop, tique, tecla, toque, ding, risco). O segundo faz os sons de meme, **sintetizados localmente** (nada baixado nem copiado): `boom` (grave dramático), `disco` (disco arranhando), `grilos`, `trombone` (triste, descendo), `plim` (vitória), `alarme`, `vibra` (celular) e `fita` (fita adesiva). Volume geral 0,8, como no Digo.

## 10. Passo a passo de um vídeo novo

1. **Ideia e roteiro** (`roteiro.md`): gancho + situação + desastre/exagero + frase-piada + pausa muda (reação, diálogo, reviravolta) + CTA. Diga se leva ponte para o Digo (seção 8). Mostre o custo estimado. **Aprovação.**
2. Pasta `projetos/<NNN. slug>/` com `hf/`, `prints/` (`logo.jpg`, `galinha.png`), `revisao/`.
3. **Vozes** (um bloco por fala; gancho, meio, frase, CTA), seção 2. **Pergunte o custo antes.** Recorte o chiado → `cortar_pausas.py` (seção 3) → `transcrever.py` → confira as grafias no Whisper. Mande as vozes em sequência para o Diogo ouvir. **Aprovação.**
4. **Clipes** (seção 5): referências mp3 com 0,15 s de silêncio, upload, Seedance Mini. **Pergunte o custo antes.** Baixe para `hf/avatar_<X>.mp4`, transcreva cada um.
5. `narracao.json` (trechos `a`, `meio`, `frase`, `b` e os clipes) → `python tools/narracao.py "<projeto>" --ts src/videos/<slug>/palavras.ts` → `python tools/sincronizar_avatar.py "<projeto>"` → leia o `sincronia.md` → extraia o `reacao.png`.
6. **Efeitos** (seção 9).
7. **Código:** copie `src/videos/na-minha-maquina/`, troque `PASTA`, cenas, `M`, `CH`, `ESTADOS`, `EVENTOS`; registre em `src/Root.tsx`; `npm run typecheck`.
8. **Prévia** em meia resolução + prancha de quadros; confira sobreposições (legenda, letreiros, olhos livres). Mande ao Diogo. **Aprovação.**
9. **Render final, limitador e validação** (iguais ao guia 6, seção 9): 1080×1920, 30 fps, h264 + AAC estéreo, duração = fim da fala + 1,4 s, −14 LUFS (±0,5) e pico ≤ −1,5 dBTP. Salve em `edicoes/<NNN. slug>/<slug>_final.mp4`.
10. **Legenda do post** no `plano.md` e commit (só texto).

**Preview e render** (o Chrome Headless do repositório não termina de instalar; use o que está extraído em `/tmp/chs`, ver guia 6, seção 11):
```bash
npx remotion render src/index.ts <Composicao> "projetos/<NNN. slug>/revisao/preview.mp4" --scale=0.5 --crf=22 --browser-executable=/tmp/chs/chrome-headless-shell-mac-arm64/chrome-headless-shell
```

## 11. Legenda do post e CTA

- **CTA falado:** "Marca aquele dev que vive falando isso. E segue a Galinha Programadora." (pede marcação, que é o que mais espalha meme, e depois o seguir).
- **Legenda do post:** o gancho, a piada em uma ou duas linhas, o pedido de marcação 👇, "segue a @galinhaprogramadora pra mais memes de TI" e **no máximo 5 hashtags específicas**: `#programacao #memesdeti #devhumor #desenvolvedor #galinhaprogramadora` (com ponte, troque uma por `#parceria`).

## 12. Custos de referência (out/2026)

| Item | Créditos |
|---|---|
| Imagem GPT Image 2.5 high 2k | 2,75 |
| Voz ElevenLabs v4 (frase curta) | ~0,7 |
| Voz Seed Audio (por bloco) | 0,2–0,9 |
| Seedance 2 Mini 720p | 1 por segundo |
| Clone de voz | 40 |
| **Reels 034 completo** (4 vozes + 3 clipes + 1 frase regerada) | **15,4** |
| Projeto 033 (personagem + testes de voz + clipe de teste) | 21,3 |

## 13. Problemas conhecidos

- **`@remotion/google-fonts` faltando** no `node_modules` do worktree (erro de fonte no typecheck): rode `npm install` na pasta.
- **`faster_whisper` no Python do sistema** não existe: use o venv do repositório principal, `/Users/diogoalves/Documents/Projetos_GIT/studio/.venv/bin/python`. Ao transcrever direto pelo `faster_whisper` (fora do `transcrever.py`), decodifique o áudio com o ffmpeg e passe o array (o PyAV desta versão quebra com `metadata_errors`).
- **ffmpeg sem `drawtext`**: monte pranchas sem texto (`fps=1.5,scale=216:-1,tile=8x5`).
- **Emoji 🦗 sai pequeno** no Chrome Headless: reforce com texto ("cri… cri…") ou desenhe o elemento.
