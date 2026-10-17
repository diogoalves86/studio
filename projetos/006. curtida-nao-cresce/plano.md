# 006. curtida-nao-cresce: plano de edição

> Nível 2 (Higgsfield) com montagem no Remotion, no [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md) e na linha de dica de valor (guia 6, seção 12).
> Roteiro aprovado em [roteiro.md](roteiro.md) (17/10/2026), com o **CTA duplo**: "Manda esse vídeo pra quem precisa. E segue o Digo Social: toda semana tem mais."

## Gerado na Higgsfield (15,4 créditos; estimado ~15)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz completa (receita de dica: `speech_rate` −10) | `hf/voz_envio.mp3` → `_ritmo.wav` | 57,0 → 46,6 s | ~6,4 |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 4 s | 4 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 5 s | 5 |

- Corte de pausas: `--pausa 0.18 --pausa-frase 0.32 --velocidade 1.3`.
- Jobs: voz `ff86f361…`, A `7b64b5bf…`, B `a3ab5cad…`. `start_image` = `ab4aaba1…`; referências em `hf/cortes_avatar.json`.
- **Sincronia:** atraso mediano de 8 ms nos dois clipes, mas 17% (A) e 14% (B) das janelas passam de 45 ms, acima da meta de 5%. O clipe acelera a boca em vários trechos. Por isso o avatar só fica em tela cheia onde a boca está natural:
  - **A:** 0,45–1,95 s ("comemora curtida, né?");
  - **B:** 42,66–43,10 s ("Manda") e 44,85 s até o fim ("Toda semana tem mais").

  O resto vira motion em tela cheia. Gerar os clipes de novo custaria mais 9 créditos, sem garantia de ficar melhor.
- **A conferir no áudio:** o Whisper ouviu "o sócio que nunca **aposta**". Pode ser só a transcrição ("nunca posta" e "nunca aposta" soam parecido). A legenda usa o texto do roteiro.

## Formato e estilo

1080×1920, 30 fps, **46,6 s de fala + 1,4 s de tela final = 48,0 s**. Paleta, fontes, legenda dinâmica, wipe azul, textura e SFX do padrão. No meio, o card de voz (foto oficial + onda) fica no topo.

## Linha do tempo (cada gatilho é uma palavra falada)

| Palavra (s) | Estado | O que aparece |
|---|---|---|
| início (0,00) | **MOTION** (cobre 0,14–0,41) | ❤️ pipocando na tela |
| "comemora" (0,52) | avatar CHEIO | contador de curtidas subindo no topo: ❤️ 87 → 342 |
| "né?" (1,54) | avatar CHEIO, punch-in | — |
| "Só que" (1,74) | **MOTION** (cobre 1,98–2,96) | "SÓ QUE NÃO É ELA QUE FAZ SEU PERFIL CRESCER" + contador de seguidores parado em 1.204 |
| "Pensa comigo" (3,48) | wipe azul → MOTION + card de voz | — |
| "Quem já te segue, já te vê" (4,10) | MOTION | círculo pequeno e aceso: SEGUIDORES (já te veem) |
| "Crescer é chegar em quem ainda não te conhece" (5,66) | MOTION | círculo enorme e apagado: QUEM AINDA NÃO TE CONHECE; seta do pequeno para o grande |
| "o chefe do Instagram já explicou" (7,96) | MOTION | card de citação: "Adam Mosseri · chefe do Instagram · jan/2025" |
| "a curtida pesa um pouco mais" (10,64) | MOTION | balança: do lado SEGUIDORES, ❤️ curtida desce |
| "o que pesa mais é o envio" (13,56) | MOTION | do lado NÃO SEGUIDORES, ↗️ envio desce mais |
| "alguém manda o seu post pra um amigo" (15,30) | MOTION | tela de direct: o post enviado para "Ana ✓" |
| "Curtir custa um toque" (17,56) | MOTION | dedo dá um toque no ❤️ + etiqueta "1 TOQUE" |
| "Mandar pra alguém é recomendar" (18,80) | MOTION | balão de direct "Olha isso, é a sua cara!" + selo "RECOMENDAÇÃO" |
| "cada envio leva o seu post direto pra uma pessoa nova" (20,60) | MOTION | o post viaja até um perfil novo que acende: "+1 PESSOA NOVA" |
| "a pergunta muda" (24,28) | MOTION | "QUANTAS CURTIDAS?" é riscado em vermelho em "quantas curtidas" (25,42) |
| "pra quem alguém mandaria esse post" (27,02) | MOTION | "PRA QUEM ALGUÉM MANDARIA?" em ciano |
| "Dica 1" (28,50) | MOTION | selo "DICA 1"; "PENSA NUMA PESSOA" |
| "a amiga que vive no Canva" (31,42) | MOTION | card de pessoa: 👩 "a amiga que vive no Canva" |
| "o sócio que nunca posta" (33,08) | MOTION | card de pessoa: 🧔 "o sócio que nunca posta" |
| "Dica 2" (34,28) | MOTION | selo "DICA 2"; "APOSTA NO QUE SE MANDA" |
| "Lista curta" (36,24) · "passo a passo" (37,00) · "o erro que todo mundo comete" (37,74) | MOTION | três cards de formato entrando um por um |
| "estatísticas do post" (39,74) | MOTION | painel do post: ❤️ 120 |
| "compartilhamentos" (40,96) | MOTION | ↗️ 38 acende em verde e o ❤️ fica esmaecido |
| "Manda" (42,82) | avatar CHEIO | ícone ↗️ "Enviar" pulsando |
| "esse vídeo" (43,04) | **MOTION** (cobre 43,14–44,84) | "MANDA PRA QUEM PRECISA ↗️" e depois o botão "Seguir" → "Seguindo ✓" em "segue" (44,44) |
| "Toda semana tem mais" (45,42) | avatar CHEIO, punch-in | "TODA SEMANA TEM MAIS" |
| fim (46,56) | tela final | logo oficial + Digo Social + @digo.social |

## Legenda do post (sugestão)

> Você comemora curtida? Ela não é o que faz seu perfil crescer 👀
>
> Quem já te segue já te vê. Pra chegar em gente nova, o que mais pesa é o envio, quando alguém manda seu post pra um amigo. Então, antes de postar, pergunta: pra quem alguém mandaria isso?
>
> 1️⃣ Pensa numa pessoa que seu seguidor conhece
> 2️⃣ Aposta no que se manda: lista, passo a passo, erro comum
> 📊 E olha os compartilhamentos, não só as curtidas
>
> ↗️ Manda pra quem precisa ver isso
> 👉 Segue o @digo.social. Toda semana tem mais.
>
> #instagram #dicasdeinstagram #crescernoinstagram #algoritmodoinstagram #engajamento #marketingdigital #reels #criadordeconteudo #socialmedia #empreendedorismo #digosocial

## Render e validação (17/10/2026)

- Pedido do Diogo no plano: **foto e nome do Adam Mosseri** para dar credibilidade. Foto de Anthony Quintano (CC BY 2.0, Wikimedia Commons) em `prints/pessoas/mosseri.jpg`, com o crédito na tela. Na balança, um selo "segundo Adam Mosseri" com a foto.
- Motion caprichado (pedido do Diogo): explosão de corações, multidão que acende, balança que vira, direct com avião, cadeia de perfis novos, contadores de envio e painel de estatísticas.
- Código em `src/videos/curtida-nao-cresce/` (cópia de `pare-de-sumir/`), composição `CurtidaNaoCresce`. Prancha e preview aprovados.
- Final: `edicoes/006. curtida-nao-cresce/curtida-nao-cresce_final.mp4`: 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 48,0 s (46,6 + 1,4), **−14,3 LUFS**, pico **−1,9 dBTP** (limitador padrão, sem ganho extra).
