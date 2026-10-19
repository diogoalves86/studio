# Padrão Digo Social: Reels com avatar de IA

Este é o **padrão obrigatório** para todo vídeo do canal **Digo Social (@digo.social)** feito com o avatar de IA do Diogo. Ele saiu do projeto `001. reels-avatar`, aprovado depois de cinco rodadas de ajuste. A implementação de referência está em [src/videos/reels-avatar/](../src/videos/reels-avatar/) e o plano completo em `projetos/001. reels-avatar/plano.md`.

Para um vídeo novo, **siga este guia do começo ao fim** e copie o código de referência. A direção editorial ([guia 5](5-direcao-editorial.md)) continua valendo: o roteiro de cada vídeo decide as cenas, e este guia decide **como** elas são feitas. Se o Diogo pedir algo diferente, siga o pedido e registre no `plano.md`.

## 0. Apresentadora oficial (desde 19/10/2026)

O avatar de IA do Diogo foi **substituído** por uma personagem nova, criada no projeto `014. nova-apresentadora`. Ela é a apresentadora de **todos os vídeos novos**. O avatar antigo e a voz clonada do Diogo ficam só para manutenção dos projetos 001–013.

| Item | Valor |
|---|---|
| Personagem | mulher negra brasileira de ~30 anos, cabelo cacheado natural, brincos pequenos dourados, camiseta azul-marinho com a logo do Digo Social e "@digo.social" **ao lado** da logo, no lado direito do peito dela (lado esquerdo da tela), no mesmo cenário azul com o play ao fundo |
| Imagem oficial (`start_image` dos clipes) | job `4312127e-0351-40fb-8acd-4902cae5c0b0` (cópia local: `projetos/014. nova-apresentadora/hf/apresentadora_oficial.png`) |
| Voz oficial | `seed_audio`, `speech_rate` 0, **sem `pitch_rate`**, `format` mp3, `medias: [{role: audio_references, value: 3bddd87e-a7e9-44ff-a36e-686ba17cd96a}]` (voz que o Seed Audio criou a partir da imagem oficial, ~208 Hz, travada por clonagem) |

- **Por que essa voz (4 rodadas, 19/10/2026):** as vozes prontas da Higgsfield são nativas em inglês, e a ElevenLabs "Kayla" "não tinha nada a ver com a personagem". A voz criada pela imagem com `image_references` saía aguda demais (~240 Hz). Baixar com `pitch_rate` deixava a voz robotizada: o tom dava saltos bruscos em 2,3% dos quadros, contra 0,4–0,6% numa voz natural. A aprovada é a amostra `3bddd87e…`, que nasceu naturalmente mais grave. Como a voz criada pela imagem muda a cada geração, essa amostra vai como `audio_references` em toda fala nova. Custa ~1,1 crédito por frase curta.
- **Ritmo da voz dela:** gere com `speech_rate` 0 e corte com `--pausa 0.25 --pausa-frase 0.45 --cauda 0.8 --limiar 30 --fade 0.06 --velocidade 1.1`. Assim ficam respiros variados entre as frases; o corte seco de 0,18 s a 1,2–1,3× soava como máquina lendo.
- **Com essa voz, a regra 9 vale ainda mais:** a grafia fonética foi o que fez a fala soar brasileira. Grafias aprovadas: "Instagrâ", "Tôda semana" (não "Tóda"), "sômi" (some), "dica" (sem mexer: "djíca"/"djica" saíram como "de dica"/"dia"), "tchi" (te), "gênti" (gente), "présta", "pôuca", "ségui", "Dígo Sociáu". Siga a mesma lógica nas palavras novas: "e" final vira "i", "te" vira "tchi", vogais abertas ganham acento agudo e as fechadas, circunflexo.
- **Sincronia da boca (regras do teste de 19/10/2026):**
  1. a voz já cortada **sempre** se chama `<nome>_ritmo.wav`; sem o sufixo, o `narracao.py` corta as pausas de novo e a narração fica mais curta que a boca;
  2. a referência de áudio do clipe tem **exatamente a duração do clipe** (0,15 s de silêncio no início e a voz cortada logo depois da última palavra), e o prompt pede "exact lip-sync… same speed and timing, no extra pauses". Com folga, o Seedance fala mais devagar e pula palavras;
  3. depois do `sincronizar_avatar.py`, **atrase a voz em 100 ms** na montagem (`adelay=100`), porque a boca gerada vem ~0,1 s depois do som. O Diogo comparou +67, +100 e +133 ms e escolheu +100. O relatório do `sincronia.md` compara áudio com áudio e não enxerga esse atraso;
  4. modelo: **Seedance 2 Mini** continua o padrão. O **Wan 2.7** (`wan2_7`, 1,5 crédito/s) gera a boca a partir da própria voz e não precisa de distorção (0,97–1,01×), mas o Diogo não viu diferença grande. Use só com aprovação.
- **Variações da imagem:** gere a partir da imagem oficial (referência) com `gpt_image_2_5`, `quality: high`, `resolution: 2k`. A logo e o @ na camiseta são as únicas exceções à regra "sem texto em imagem gerada", e só porque o Diogo pediu. Confira sempre a grafia do @ com zoom.

---

## 1. Regras inegociáveis

1. **Geração econômica na Higgsfield:**
   - avatar gerado no **Seedance 2 Mini** (`seedance_2_0_mini`, 720p, 9:16);
   - **voz gerada separada** (`seed_audio` com a voz oficial da seção 0);
   - nunca usar modelo mais caro sem aprovação;
   - nenhum crédito sem custo aprovado.
2. **Só a voz natural** dos áudios separados vai para o vídeo. O som que o Seedance gera junto com o clipe soa robótico e nunca entra na mixagem. Ele serve só para sincronizar a boca.
3. **Ritmo de Reels: pausa longa sempre é cortada.** Toda voz baixada passa por `tools/cortar_pausas.py` **antes de qualquer outra etapa**: pausas acima de 0,25 s viram 0,2 s. A pausa é medida pela energia do áudio, nunca pelos tempos do Whisper, que às vezes marca o começo da palavra tarde e come sílabas ("Especialista" virou "Legalista" no projeto 002). A versão `voz_<trecho>_ritmo.wav` é a voz oficial do vídeo; o arquivo original fica intacto. Trechos de voz embaralhada ("o Aquad vê esse neitinho…") também são cortados.
4. **Boca sincronizada quadro a quadro** com a voz natural (`tools/sincronizar_avatar.py`). A meta é atraso mediano ≤ 10 ms e no máximo ~5% de janelas acima de 45 ms.
5. **O avatar só fica em tela cheia onde o movimento é natural.** Todo momento listado em "Momentos artificiais" no `sincronia.md` fica coberto por **motion em tela cheia** ou com o **avatar em card**.
6. **Logo oficial** como foto de perfil e na tela final. É `~/Documents/DigoSocial Logo Quadrada 1024x1024.png`, copiada para `projetos/<NNN>/prints/logo.png`. Nunca usar um quadro do avatar nem recriar a logo.
7. **Todo gatilho sai de uma palavra falada** (`marcas.ts`). Nunca use um tempo em segundos solto no código. Conteúdo não aparece antes da palavra; um contêiner pode entrar até ~0,25 s antes, vazio.
8. **Mídia não é versionada:** vídeo, áudio e imagem ficam fora do git (ver seção 10).
9. **Texto da voz escrito como é falado (regra crucial).** O que vai para o gerador de voz e para a fala dos clipes do avatar é o texto **do jeito que deve soar**, não o português ortograficamente correto. Acento, grafia e pontuação servem para guiar a pronúncia, mesmo que fiquem "errados" no papel. Exemplo do projeto 003: "Tem **lójinha** no Instagram?" (com acento) fez o "ó" sair aberto, como o Diogo fala; com "lojinha" a voz saiu estranha. O roteiro, a legenda e os textos na tela continuam no português correto. Registre a grafia fonética usada no `plano.md`.

## 2. O que pedir na Higgsfield (ou achar no histórico)

O conector oficial pode estar **só de leitura** (saldo, histórico e modelos, sem gerar). Nesse caso, o Diogo gera pelo site e o Claude baixa pelo histórico (`show_generations` → `hf/`).

| Asset | Modelo | Configuração | Observação |
|---|---|---|---|
| Voz de cada trecho | `seed_audio` com a voz oficial da seção 0 | o texto do trecho **escrito como é falado** (regra 9) | um arquivo por bloco do roteiro (gancho, exemplo, …) |
| Avatar falando | `seedance_2_0_mini` | 720p, 9:16, 4–15 s, `generate_audio: true` | o áudio nativo **com o mesmo texto** é o que permite sincronizar a boca |
| Clipes de apoio | `seedance_2_0_mini` | 8 s, sem áudio | viram fundo desfocado das cenas animadas |

- Não é preciso ter clipe do avatar para todos os trechos. Trechos sem clipe viram cena 100% animada.
- **Ordem de geração (desde o projeto 002):** primeiro as vozes → `tools/cortar_pausas.py` → transcrição → recorte do trecho de cada clipe da voz `_ritmo` (com 0,4 s de silêncio no começo, porque o clipe costuma congelar no início) → upload desse recorte como `audio_references` do clipe do avatar, com `start_image` = a imagem oficial da apresentadora (seção 0; o avatar antigo do Diogo era o job `ab4aaba1-b3ad-4857-bbd1-ad2489e44341`). Assim a boca já nasce no ritmo final, e a sincronia vira só um ajuste fino. Continue rodando o relatório.
- **Voz do Diogo no Seed Audio (só projetos 001–013):** `audio_references` = `58086f4c-58ea-4cc1-8bd4-e9f3402f7c5d`, `speech_rate` 5, `loudness_rate` 23, mp3 24 kHz.
  - **Vídeo de dica / explicação (padrão aprovado no projeto 005):** `speech_rate` **−10** (com 5 a voz sai corrida e chegou a engolir palavra: "esquece de você" virou "esquece de funciona"). O ritmo final é ajustado no corte de pausas (passo 2).
  - **Pergunta não sai em tom de pergunta** com o "?" sozinho. Escreva a pergunta com uma muleta falada no fim, como "Você posta e some, **né?**". Essa foi a única de três grafias testadas que subiu a entonação; "Você posta... e some?!" e "E aí? Você posta e some??" saíram como afirmação. Se a pergunta for o gancho, gere só ela à parte (≈0,2 crédito), compare e emende no lugar.
- **Preço observado (out/2026):** Seedance 2 Mini 720p = **1 crédito por segundo**; Seed Audio ≈ 0,1 crédito por segundo de fala. Confirme com `get_cost` antes de cada lote.

## 3. Pipeline

```text
projetos/<NNN. slug>/
  hf/            downloads da Higgsfield + sync_<trecho>.mp4 (gerados)
  prints/        logo.png (oficial) e prints citados
  transcricao/   uma pasta por áudio/clipe + narracao/ (mapa.json, sincronia.md)
  sfx/           efeitos sonoros gerados
  video/         narração final
  narracao.json  receita da narração e dos clipes
  plano.md
```

1. **Organizar:** crie a pasta do projeto, baixe os áudios e clipes do lote mais recente para `hf/` e copie a logo para `prints/logo.png`.
2. **Cortar as pausas longas de cada voz (obrigatório, automático):**
   `python tools/cortar_pausas.py "<projeto>/hf/voz_<trecho>.mp3" "<projeto>/hf/voz_<trecho>_ritmo.wav"`
   Daqui em diante, use só a versão `_ritmo` (transcrição, referência do avatar, narração). Se o Diogo ainda achar o ritmo lento, rode de novo com `--pausa 0.15`.
   **Vídeo de apresentação** (quem ainda não conhece o Digo, ex.: destaques do perfil): use mais cadência, `--pausa 0.22 --frases "<projeto>/transcricao/voz_<trecho>/palavras.json" --pausa-frase 0.45 --velocidade 0.95`. Isso dá ~15% a mais de duração, com respiro em cada fim de frase. O Diogo aprovou esse ritmo no projeto 002, porque o Reels padrão ficava rápido demais para quem está conhecendo o produto.
   **Vídeo de dica / explicação** (ensinar algo, ex.: como o algoritmo funciona): voz gerada com `speech_rate` −10 e corte com `--pausa 0.18 --frases "<projeto>/transcricao/voz_<trecho>/palavras.json" --pausa-frase 0.32 --velocidade 1.2 --cauda 0.8 --limiar 30 --fade 0.04`. A fala fica clara, com respiro curto em cada fim de frase, sem arrastar. No projeto 005, 46,7 s de voz bruta viraram 35,7 s. O Diogo achou o Reels padrão (speech_rate 5) rápido demais para explicação e a versão 1,2× ainda lenta. **Cortes suaves (desde o 012):** com os padrões antigos, o fim das palavras que terminam baixinho ("gente **nova**") sumia no corte e soava abrupto. `--cauda 0.8` deixa mais respiro logo depois da palavra, `--limiar 30` conta o fim baixinho como fala (34 já trata respiração como fala e deixa buracos de quase 1 s) e `--fade 0.04` suaviza a saída. **Velocidade 1,2× (desde o 013):** o Diogo pediu 1,2× no lugar do 1,3× usado do 005 ao 012, para a fala ficar mais cadenciada e fácil de entender. Ao **emendar** um trecho regravado, corte no silêncio medido pela energia, nunca no fim da palavra do Whisper (no 012, o corte em 10,00 s comeu o "-va" de "nova", que soava até 10,06 s).
3. **Transcrever cada arquivo** (vozes `_ritmo` e clipes com som):
   `python tools/transcrever.py "<projeto>/hf/<arquivo>" "<projeto>/transcricao/<id8>" pt`
   Confira se a última palavra termina perto do fim do áudio: o Whisper às vezes pula a frase final (aconteceu com "Link na bio: digosocial ponto com"). Se pular, transcreva só o final e junte os tempos.
   Leia as transcrições: encontre a **ordem do roteiro** e os **trechos embaralhados** (palavras sem sentido) para cortar.
4. **Escrever `narracao.json`** (modelo em `projetos/001. reels-avatar/narracao.json`): trechos na ordem do roteiro, com `cortes`, e os `clipes` de avatar com a transcrição do próprio clipe.
5. **Montar a narração:**
   `python tools/narracao.py "<projeto>" --ts src/videos/<slug>/palavras.ts`
6. **Sincronizar o avatar:**
   `python tools/sincronizar_avatar.py "<projeto>"`
   Leia `transcricao/narracao/sincronia.md`: os momentos artificiais definem onde entra motion ou card.
7. **Gerar os efeitos sonoros:** `python tools/gerar_sfx.py "<projeto>"`.
8. **Plano (aprovação):** escreva o `plano.md` com a timeline por palavra, seguindo as seções 4 a 8.
9. **Programar:** copie `src/videos/reels-avatar/` para `src/videos/<slug>/` e troque cenas, marcas e caminhos. Registre a composição em `src/Root.tsx`.
10. **Revisar** com preview em meia resolução e prancha de quadros. Depois vêm o **render final** e a **validação** (seção 9).

## 4. Formato, cor e tipografia

- **Formato:** 1080×1920, 30 fps. Deixe ~250 px livres no topo e ~420 px embaixo para a interface do app.
- **Paleta** (`tema.tsx`): marinho `#0A1430`, azul `#2F7BFF`, ciano `#3EC6FF`, branco, cinza `#9AA7C7`, vermelho `#FF4D5E` (errado) e verde `#2EE59D` (certo). A logo usa azul → ciano `#1FB5E8` → verde.
- **Fontes:** **Montserrat** 700/800/900 em títulos, legenda e números; **Inter** 500–700 em rótulos. As duas vêm de `@remotion/google-fonts`.
- **Etiquetas:** `Pilula` (borda 3 px na cor, fundo da cor a 15%, Montserrat 800).

## 5. Avatar: tela cheia, card ou fora de cena

O avatar tem três estados (`camera.ts`), e cada trecho com clipe alterna entre eles conforme o `sincronia.md`:

| Estado | Quando | Como |
|---|---|---|
| **Tela cheia** | onde a velocidade do clipe fica entre 0,65× e 1,6× | zoom por planos (abaixo) e legenda em y 1110 |
| **Card** | momentos artificiais mais longos, ou quando o conteúdo precisa dividir a tela | card 420×560 em (612, 760), raio 40, borda ciano 5 px, rotação 2°; transição de 0,45 s; conteúdo em cima (y 260–740) e à esquerda (x 64–580); legenda em y 1360 |
| **Fora (motion cheio)** | aberturas de trecho (o clipe costuma congelar no começo) e rajadas aceleradas | camada opaca com fundo desfocado; sai com zoom + desfoque e o avatar aparece por baixo |

**Planos de câmera em tela cheia:**
- Corte de zoom a cada frase, alternando ~1,00–1,05 e ~1,12–1,17.
- A troca desliza em 0,30 s (`Easing.inOut(Easing.cubic)`).
- **Punch-in** em palavra de ênfase: até 1,22–1,26 em 0,3 s, com tremor de 9 px que some em 0,3 s.
- O quadro sobe `(escala − 1) × 420 px`, para o queixo nunca ficar sob a legenda.

**Textura de câmera real:** vale para tudo e é o que tira a cara de "vídeo gerado".
- No clipe: `contrast(1.05) saturate(.9) brightness(.98)`.
- Oscilação de câmera na mão (`maoLivre`).
- Grão de filme animado a 9% (overlay) e vinheta.

## 6. Cenas animadas e motion

- **Fundo das cenas:** clipe de apoio com `blur(30px) brightness(.6)`, gradiente marinho por cima e zoom contínuo de 1,18 a 1,32 ao longo da cena.
- **Repertório aprovado** (exemplos no código de referência):
  - tipografia palavra por palavra (título grande; a linha em destaque em ciano com brilho);
  - celular com feed rolando rápido e selo "PASSA DIRETO";
  - cronômetro com anel que enche e fica vermelho;
  - cartões de exemplo "JEITO COMUM ✕ / JEITO CERTO ✓":
    - texto digitado no ritmo da fala;
    - barra de retenção caindo ou subindo;
    - carimbo "PULOU!" e o dedo arrastando o cartão para fora;
    - marca-texto ciano na frase-chave;
  - dois cartões lado a lado (comparação);
  - número grande de retenção com barra;
  - etiqueta que leva um risco vermelho;
  - linha do tempo "PRIMEIROS 3s";
  - gráfico de linha que sobe em "crescer";
  - cartão de perfil branco com a logo oficial e o botão **Seguir**: o dedo toca e ele vira **Seguindo ✓** na palavra do nome do perfil;
  - chips de tópicos;
  - tela final.
- **Densidade:** algo novo na tela a cada 1–2 s. Nunca deixe tela vazia nem câmera parada mais de ~4 s.

## 7. Transições e legenda

- **Wipe azul** (0,44 s, centrado no corte) em **toda troca de trecho** e na entrada da tela final.
- **Zoom + desfoque** entre partes dentro de uma cena: a saída cresce +0,18–0,25 e desfoca 14–16 px em 0,25–0,3 s; a entrada vem de 0,85–0,9 desfocada.
- **Legenda dinâmica** (`Legenda.tsx`):
  - Montserrat 900, 76 px, caixa alta;
  - grupos de até 3 palavras, quebrando na pontuação ou em pausa maior que 0,25 s;
  - a palavra falada fica com fundo azul, e as palavras-chave negativas em vermelho;
  - **some** quando a fala já está escrita na tela (títulos, cartões, cronômetro).

## 8. Efeitos sonoros

Gerados por `tools/gerar_sfx.py` e disparados em `EfeitosSonoros.tsx`, sempre ligados a uma marca ou a um plano de câmera. Volume geral **0,8**.

| Som | Quando | Volume |
|---|---|---|
| `whoosh_in` / `whoosh_out` | cada troca de zoom (aproximar / afastar), card entrando ou saindo, motion saindo; começa 0,27 s antes para o pico cair no movimento | 0,45–0,55 |
| `impacto` | punch-in, carimbo, título forte, logo da tela final | 0,35–0,6 |
| `swoosh` | wipe azul (0,32 s antes do corte) | 0,6 |
| `pop` | etiqueta ou palavra-título entrando | 0,45–0,5 |
| `tique` | cada segundo do cronômetro | 0,6 |
| `tecla` | cada palavra digitada num cartão | 0,7 |
| `risco` | marca-texto e risco em etiqueta | 0,35–0,5 |
| `toque` + `ding` | dedo no botão Seguir / acerto | 0,7 / 0,3–0,45 |

## 9. Tela final, render e validação

- **Tela final** (1,4 s depois da última palavra): fundo radial escuro, logo oficial de 300 px, "Digo Social" (Montserrat 900, 112 px) e "@digo.social" em ciano.
- **Preview** em meia resolução para revisão:
  `npx remotion render src/index.ts <Composicao> <saida>.mp4 --scale=0.5 --crf=22`
- **Final:**
  `npx remotion render src/index.ts <Composicao> /tmp/bruto.mp4 --codec=h264 --crf=17 --audio-bitrate=320k`
  Depois limite o pico sem recomprimir o vídeo:
  `ffmpeg -i bruto.mp4 -c:v copy -af "alimiter=limit=0.84:attack=3:release=60:level=disabled,aresample=48000" -c:a aac -b:a 320k -movflags +faststart "edicoes/<NNN. slug>/<slug>_final.mp4"`
- **Validar:**
  - 1080×1920, 30 fps, h264 com uma trilha AAC estéreo;
  - duração = fim da narração + 1,4 s;
  - **−14 LUFS** e pico **≤ −1,5 dBTP** (`ffmpeg -af loudnorm=print_format=summary -f null -`);
  - se ficar abaixo de −14,5 LUFS (aconteceu no 005, com a voz de dica a 1,3×: −15,2), suba o ganho **antes** do limitador e meça de novo: `-af "volume=1.3dB,alimiter=limit=0.8:attack=3:release=60:level=disabled,aresample=48000"` deu −13,9 LUFS e −1,9 dBTP;
  - prancha de quadros do arquivo final.
- **Legenda do post:** gancho em pergunta, o exemplo ❌/✅, o segredo em uma linha, um pedido para salvar ou compartilhar, o CTA "Segue o @digo.social" e as hashtags (`#marketingdigital #instagram #reels #criadordeconteudo #dicasdeinstagram #crescernoinstagram #socialmedia #digosocial`).

## 10. Git (fork `diogoalves86/studio`)

- `origin` = o fork e `upstream` = `mackswendhell/studio`. Os commits vão para o `main` do fork.
- **Versionar só:** código (`src/`), `package*.json`, `tools/`, guias, e do projeto `plano.md`, `narracao.json` e `transcricao/**` (json/md).
- **Nunca versionar** vídeo, áudio ou imagem. O `.gitignore` bloqueia vídeo e imagem em qualquer pasta, e `projetos/` e `edicoes/` são ignoradas. Ao usar `git add -f` nessas pastas, adicione só os arquivos de texto e confira `git diff --cached --name-only`.

## 11. Problemas conhecidos

- **faster-whisper × PyAV** (`open() got an unexpected keyword argument 'metadata_errors'`): resolvido. `tools/transcrever.py` decodifica com o ffmpeg. Se o `import faster_whisper` falhar, use um venv: `python3 -m venv .venv && .venv/bin/pip install faster-whisper`.
- **Chrome Headless Shell não termina de instalar** (o render sai em silêncio logo depois de "Got Headless Shell"):
  - extraia o zip manualmente para fora do repositório:
    `unzip -q node_modules/.remotion/chrome-headless-shell/chrome-headless-shell-mac-arm64.zip -d /tmp/chs`
  - renderize passando `--browser-executable=/tmp/chs/chrome-headless-shell-mac-arm64/chrome-headless-shell`.
- **Conector da Higgsfield só de leitura:** veja a seção 2.

## 12. Linha de conteúdo preferida: dica que gera valor

O Diogo prefere **Reels de dica que ensinam algo útil de verdade**, sem vender o Digo Social. O modelo é o projeto `005. pare-de-sumir`, aprovado em 16/10/2026. Ao sugerir ideias, priorize esse formato. Reels de venda, como o 004, ficam para quando ele pedir.

- **Gancho em pergunta** que cutuca uma dor real ("Você posta e some, né?"), com a muleta "né?" para a voz subir o tom (seção 2).
- **Fonte na tela (autoridade, pedido do Diogo em 17/10/2026):** toda afirmação factual ganha um selo animado "📰 Fonte: <veículo> · <título traduzido>", que entra junto com a fala, mais um cartão "FONTES" de ~1,5 s no fim do meio com todos os veículos (nome em texto, sem logo de marca). Pessoa citada aparece com foto de licença livre, nome, cargo e crédito da foto.
- **O porquê antes da dica:** explique em uma ou duas frases como a coisa funciona (ex.: o Instagram mostra o post primeiro para pouca gente; quem conversa com você te vê mais). Use só o que o próprio Instagram ou o Adam Mosseri já disseram, e cite as fontes no `roteiro.md`. Nada de números de blog.
- **Duas dicas práticas**, aplicáveis no mesmo dia, cada uma demonstrada na tela com um exemplo (ruim × bom, antes × depois).
- **Sem venda:** o Digo Social não aparece como solução. A logo entra só no CTA e na tela final.
- **CTA para seguir:** "Se essa dica te ajudou, segue o Digo Social. Toda semana tem mais." Na legenda do post, peça para salvar ("💾 Salva pra não esquecer").
- **Hashtags na legenda: no máximo 5, específicas** (o Instagram limita a 5 por post, e o Mosseri diz que hashtag não aumenta o alcance, só ajuda na busca). Nada de genéricas como #reels, #instagram ou #viral.
- **Voz de dica** (seção 2 e passo 2 da seção 3): ~35–40 s.
- **Visual:** a explicação vira diagrama animado (círculo de alcance, conversa VOCÊ ↔ SEGUIDOR, thread de comentários). O avatar fica só na abertura e no "Segue o Digo".
