# Padrão Digo Social: Reels com avatar de IA

Este é o **padrão obrigatório** para todo vídeo do canal **Digo Social (@digo.social)** feito com o avatar de IA do Diogo. Ele saiu do projeto `001. reels-avatar`, aprovado depois de cinco rodadas de ajuste. A implementação de referência está em [src/videos/reels-avatar/](../src/videos/reels-avatar/) e o plano completo em `projetos/001. reels-avatar/plano.md`.

Para um vídeo novo, **siga este guia do começo ao fim** e copie o código de referência. A direção editorial ([guia 5](5-direcao-editorial.md)) continua valendo: o roteiro de cada vídeo decide as cenas, e este guia decide **como** elas são feitas. Se o Diogo pedir algo diferente, siga o pedido e registre no `plano.md`.

---

## 1. Regras inegociáveis

1. **Geração econômica na Higgsfield:**
   - avatar gerado no **Seedance 2 Mini** (`seedance_2_0_mini`, 720p, 9:16);
   - **voz gerada separada** (`seed_audio`);
   - nunca usar modelo mais caro sem aprovação;
   - nenhum crédito sem custo aprovado.
2. **Só a voz natural** dos áudios separados vai para o vídeo. O som que o Seedance gera junto com o clipe soa robótico e nunca entra na mixagem. Ele serve só para sincronizar a boca.
3. **Ritmo de Reels:** pausas encurtadas para ~0,2 s (`tools/narracao.py`). Trechos de voz embaralhada ("o Aquad vê esse neitinho…") são cortados.
4. **Boca sincronizada quadro a quadro** com a voz natural (`tools/sincronizar_avatar.py`). A meta é atraso mediano ≤ 10 ms e no máximo ~5% de janelas acima de 45 ms.
5. **O avatar só fica em tela cheia onde o movimento é natural.** Todo momento listado em "Momentos artificiais" no `sincronia.md` fica coberto por **motion em tela cheia** ou com o **avatar em card**.
6. **Logo oficial** como foto de perfil e na tela final. É `~/Documents/DigoSocial Logo Quadrada 1024x1024.png`, copiada para `projetos/<NNN>/prints/logo.png`. Nunca usar um quadro do avatar nem recriar a logo.
7. **Todo gatilho sai de uma palavra falada** (`marcas.ts`). Nunca use um tempo em segundos solto no código. Conteúdo não aparece antes da palavra; um contêiner pode entrar até ~0,25 s antes, vazio.
8. **Mídia não é versionada:** vídeo, áudio e imagem ficam fora do git (ver seção 10).

## 2. O que pedir na Higgsfield (ou achar no histórico)

O conector oficial pode estar **só de leitura** (saldo, histórico e modelos, sem gerar). Nesse caso, o Diogo gera pelo site e o Claude baixa pelo histórico (`show_generations` → `hf/`).

| Asset | Modelo | Configuração | Observação |
|---|---|---|---|
| Voz de cada trecho | `seed_audio` | o texto do trecho | um arquivo por bloco do roteiro (gancho, exemplo, …) |
| Avatar falando | `seedance_2_0_mini` | 720p, 9:16, 4–15 s, `generate_audio: true` | o áudio nativo **com o mesmo texto** é o que permite sincronizar a boca |
| Clipes de apoio | `seedance_2_0_mini` | 8 s, sem áudio | viram fundo desfocado das cenas animadas |

- Não é preciso ter clipe do avatar para todos os trechos. Trechos sem clipe viram cena 100% animada.
- Teste pendente: gerar o avatar com `audio_references` igual à voz separada, para a boca já nascer sincronizada. Se funcionar, a sincronia vira só um ajuste fino. Continue rodando o relatório.

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
2. **Transcrever cada arquivo** (áudios separados e clipes com som):
   `python tools/transcrever.py "<projeto>/hf/<arquivo>" "<projeto>/transcricao/<id8>" pt`
   Leia as transcrições: encontre a **ordem do roteiro** e os **trechos embaralhados** (palavras sem sentido) para cortar.
3. **Escrever `narracao.json`** (modelo em `projetos/001. reels-avatar/narracao.json`): trechos na ordem do roteiro, com `cortes`, e os `clipes` de avatar com a transcrição do próprio clipe.
4. **Montar a narração:**
   `python tools/narracao.py "<projeto>" --ts src/videos/<slug>/palavras.ts`
5. **Sincronizar o avatar:**
   `python tools/sincronizar_avatar.py "<projeto>"`
   Leia `transcricao/narracao/sincronia.md`: os momentos artificiais definem onde entra motion ou card.
6. **Gerar os efeitos sonoros:** `python tools/gerar_sfx.py "<projeto>"`.
7. **Plano (aprovação):** escreva o `plano.md` com a timeline por palavra, seguindo as seções 4 a 8.
8. **Programar:** copie `src/videos/reels-avatar/` para `src/videos/<slug>/` e troque cenas, marcas e caminhos. Registre a composição em `src/Root.tsx`.
9. **Revisar** com preview em meia resolução e prancha de quadros. Depois vêm o **render final** e a **validação** (seção 9).

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
