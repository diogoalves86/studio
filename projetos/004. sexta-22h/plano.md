# 004. sexta-22h: plano de edição

> Nível 2 (Higgsfield) com montagem no Remotion, no [padrão Reels avatar](../../guias/6-padrao-reels-avatar.md).
> Reels do feed do @digo.social para dono de lojinha, postado na sexta à noite. Roteiro aprovado em [roteiro.md](roteiro.md) (16/10/2026).

## Decisões

- **CTA para seguir o perfil** (pedido do Diogo): em Reels do feed, o fecho é sempre "Segue o Digo Social", nunca link.
- **Economia de créditos:** voz completa no Seed Audio e só 2 clipes curtos do avatar (abertura e CTA). No meio, o avatar aparece no **card de voz** (foto oficial + onda que pulsa só na fala), como no 003.
- **Ritmo padrão de Reels** (`cortar_pausas.py` sem opções): 24,84 → 23,56 s.
- Sem B-roll de IA: tudo é motion no Remotion.

## Gerado na Higgsfield (11,1 créditos; estimado ~13)

| Asset | Arquivo | Duração | Créditos |
|---|---|---|---|
| Voz completa | `hf/voz_sexta.mp3` → `_ritmo.wav` | 24,8 → 23,6 s | 3,1 |
| Avatar A, abertura | `hf/avatar_A.mp4` → `sync_A.mp4` | 4 s | 4 |
| Avatar B, CTA | `hf/avatar_B.mp4` → `sync_B.mp4` | 4 s | 4 |

- **Grafia fonética (regra 9):** "pra **lójinha**"; números por extenso ("dez da noite", "às sete", "três").
- Voz: Seed Audio com a referência do Diogo (`58086f4c…`), `speech_rate` 5, `loudness_rate` 23. Job `2b392c1e…`.
- Avatar: Seedance 2 Mini 720p 9:16, `start_image` = job `ab4aaba1…`, `audio_references` = recorte da voz `_ritmo` com 0,4 s de silêncio (`hf/ref_avatar/`, `hf/cortes_avatar.json`). Jobs `c3d31d78…` (A) e `739f7483…` (B).
- Sincronia: atraso mediano de 5 ms nos dois clipes, 0% de janelas acima de 45 ms (`transcricao/narracao/sincronia.md`).
- O Whisper ouviu "Abriu o **canvas set**" em "Canva às sete" e "dicas **sim**" em "dica assim". A legenda usa o texto do roteiro.

## Formato e estilo

1080×1920, 30 fps, **23,56 s de fala + 1,4 s de tela final = 24,96 s**. Paleta e fontes do padrão (marinho, azul, ciano; Montserrat + Inter). Legenda dinâmica, zoom por frase com punch-in, wipe azul nas trocas, textura de câmera e SFX de `sfx/`.

## Linha do tempo (cada gatilho é uma palavra falada)

| Palavra (s) | Estado | O que aparece | SFX |
|---|---|---|---|
| "Sexta" (0,00) | avatar CHEIO | relógio digital "SEX · 22:00" pisca no topo | tique |
| "e você" (1,40) | **MOTION** (cobre 1,32–1,59) | flash cheio: "E VOCÊ AÍ…" em ciano sobre marinho | whoosh |
| "montando" (1,84) | avatar em CARD (cobre 2,18–2,33) | "MONTANDO POST" em pílula, cursor piscando | — |
| "lojinha" (2,68) | avatar CHEIO, punch-in 1,08 | "PRA LOJINHA?" | pop |
| "Abriu" (3,44) | wipe azul → MOTION + card de voz | tela de edição vazia; relógio "19:00" | wipe |
| "trocou a fonte" (4,50) | MOTION | o título do post troca de fonte | clique |
| "trocou a cor" (5,28) | MOTION | o fundo do post troca de cor | clique |
| "refez a legenda três vezes" (6,22) | MOTION | legenda apagada e redigitada; contador "×3" | teclado |
| "Quando viu" (7,80) | MOTION | relógio dispara 19:00 → 23:47 | tique rápido |
| "E o post?" (9,52) | MOTION | post publicado | — |
| "três curtidas" (10,18) | MOTION, punch-in | contador parado em "3 ♥"; "3" em vermelho | grilo/silêncio |
| "Agora" (11,34) | wipe azul → MOTION | tela clareia, relógio volta | wipe |
| "fechar a loja" (11,96) | MOTION | placa "FECHADO" vira na porta | pop |
| "fim de semana inteiro" (13,40) | MOTION | calendário SÁB / DOM; posts encaixam com "Agendado ✓" | pops |
| "O Digo Social" (15,00) | MOTION | logo oficial entra | whoosh |
| "sugere o post" (15,60) | MOTION | cartão "O DIGO SUGERE" | pop |
| "cria a imagem e a legenda" (16,60) | MOTION | cartão "POST PRONTO" se monta; legenda digitada | teclado |
| "Instagram… Facebook" (18,40) | MOTION | ícones das duas redes acendem | pops |
| "Você só aprova" (19,52) | MOTION + card de voz | dedo toca "Aprovar" → "Agendado ✓" | sucesso |
| "Segue" (20,42) | avatar CHEIO | botão "SEGUIR" + @digo.social embaixo | — |
| "Social" (20,94) | avatar CHEIO | botão é tocado → "Seguindo ✓" | clique + sucesso |
| "e vai" (22,24) | **MOTION** (cobre 22,27–22,46) | flash cheio "BOA SEXTA!" | whoosh |
| "curtir" (22,56) | avatar CHEIO, punch-in | "BOA SEXTA! 🎉" (emoji desenhado) segue em cima | — |
| "sexta" (23,06) → fim | tela final a partir de 23,40 (cobre 23,43–23,56) | logo oficial + Digo Social + @digo.social + "Segue pra mais dicas" | whoosh final |

## Legenda do post

> Sexta, 22h, e você ainda no Canva trocando a fonte pela quinta vez? 🫠
>
> Já foi a época de perder a sexta montando post pra 3 curtidas. Deixa o fim de semana da sua lojinha agendado e vai viver ✨
>
> 💾 Salva pra lembrar na próxima sexta
> 📲 Manda pra aquela amiga que tem lojinha e vive no Canva
>
> 👉 Segue o @digo.social pra mais dica assim pra sua lojinha vender no Instagram.
>
> #lojinha #lojavirtual #empreendedorismo #pequenonegocio #marketingdigital #instagram #reels #dicasdeinstagram #postsparainstagram #canva #socialmedia #vendasonline #sextafeira #digosocial

## Render e validação (16/10/2026)

- Código em `src/videos/sexta-22h/` (cópia de `destaque-lojinha/`), composição `Sexta22h`. Plano, stills e preview aprovados pelo Diogo.
- Legenda dinâmica no texto do roteiro: "Sexta-feira" e "meia-noite" unidos, "Canva às sete", "dica assim", "post?" só em "E o post?"; sem legenda sobre a logo.
- Final: `edicoes/004. sexta-22h/sexta-22h_final.mp4`: 1080×1920, 30 fps, h264 + AAC estéreo 48 kHz, 24,97 s (23,56 + 1,4), **−14,4 LUFS**, pico **−1,5 dBTP**. Prancha do arquivo final em `frames/prancha_final.png`.
- Render local: o Chrome do Remotion não terminava de extrair; foi extraído à mão e passado com `--browser-executable`.
