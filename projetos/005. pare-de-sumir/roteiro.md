# 005. pare-de-sumir: roteiro (rascunho para aprovação)

Reels do feed do @digo.social: **dica para crescer no Instagram**, sem vender o Digo Social como solução.
O CTA é só para seguir quem gostou da dica (pedido do Diogo, 16/10/2026).
Formato: Reels 9:16 (1080×1920, 30 fps), ~38 s.

**Cadência de vídeo de dica (aprovada pelo Diogo, guia 6):** voz com `speech_rate` −10 e `cortar_pausas.py --pausa 0.18 --frases <palavras.json> --pausa-frase 0.32 --velocidade 1.3` → 35,7 s.
**Abertura trocada para "Você posta e some, né?"**: com o "?" sozinho, a pergunta saía como afirmação.

**Economia de créditos:** a mesma receita do 004, com voz completa e só 2 clipes curtos do avatar (abertura e CTA). O meio é motion com o card de voz.

---

## Base da explicação (o que o próprio Instagram já disse)

- Cada parte do app (Feed, Stories, Reels, Explorar) tem o próprio ranking.
- **O post é mostrado primeiro para um grupo pequeno**, e o alcance cresce se esse grupo reage bem.
- **Histórico de interação:** quanto mais alguém interage com uma conta (comentários, respostas, direct), mais os posts dela aparecem para essa pessoa no Feed e nos Stories.
- Em 2025, o Adam Mosseri citou **tempo assistido, curtidas por alcance e envios por alcance** como os sinais principais.

Ficaram de fora números que só aparecem em blogs de terceiros (por exemplo, "envio vale 3 a 5 curtidas").

## Texto da narração (português correto: legenda e telas)

> **[A · avatar, ~4 s]** Você posta e some, né? Então o Instagram também esquece de você.
>
> **[meio · motion]** Funciona assim: o Instagram mostra seu post primeiro pra pouca gente. Se essas pessoas interagem, ele mostra pra mais gente.
> E tem mais: quanto mais alguém conversa com você, mais o Instagram mostra os seus posts pra essa pessoa.
> Então, dica um: responde todo comentário. E responde com uma pergunta. O comentário vira conversa, e quem conversou com você volta a te ver no feed.
> Dica dois: comenta nos perfis do seu nicho. Comentário de verdade, não só um coraçãozinho. Quem lê, clica no seu perfil.
>
> **[B · avatar, ~4 s]** Se essa dica te ajudou, segue o Digo Social. Toda semana tem mais.

## Texto para o gerador de voz (escrito como é falado, regra 9)

> Você posta e some, né? Então o Instagram também esquece de você.
> Funciona assim: o Instagram mostra seu post primeiro pra pouca gente. Se essas pessoas interagem, ele mostra pra mais gente.
> E tem mais: quanto mais alguém conversa com você, mais o Instagram mostra os seus posts pra essa pessoa.
> Então, dica um: responde todo comentário. E responde com uma pergunta. O comentário vira conversa, e quem conversou com você volta a te ver no feed.
> Dica dois: comenta nos perfis do seu nicho. Comentário de verdade, não só um coraçãozinho. Quem lê, clica no seu perfil.
> Se essa dica te ajudou, segue o Digo Social. Toda semana tem mais.

- **A conferir no áudio:** "feed" (se sair lido como em português, trocar por "fíd") e "nicho".

## Visual por frase

| Fala | Estado | O que aparece |
|---|---|---|
| "Você posta e some?" | avatar CHEIO | um post sendo publicado e um boneco saindo de cena ("SUMIU 👋") |
| "o Instagram também esquece de você" | avatar CHEIO, punch-in | "O INSTAGRAM ESQUECE" com o perfil ficando cinza |
| "mostra seu post primeiro pra pouca gente" | MOTION + card de voz | o post no centro, com um círculo pequeno de 5 pessoas acendendo em volta |
| "Se essas pessoas interagem" | MOTION | ❤️ 💬 ↗️ saindo das 5 pessoas |
| "ele mostra pra mais gente" | MOTION | o círculo se abre em ondas com mais pessoas: 5 → 50 → 500 |
| "quanto mais alguém conversa com você" | MOTION | duas bolinhas (VOCÊ e SEGUIDOR) com balões de conversa indo e voltando; a linha entre elas engrossa |
| "mais o Instagram mostra os seus posts" | MOTION | o feed do seguidor com o seu post subindo para o topo |
| "dica um: responde todo comentário" | MOTION | selo "DICA 1"; comentário "Amei!" sem resposta, com um relógio parado |
| "responde com uma pergunta" | MOTION | resposta digitada: "Obrigado! Qual você mais gostou?" |
| "vira conversa" | MOTION | a thread cresce com 3 respostas e o contador de comentários sobe |
| "volta a te ver no feed" | MOTION | o seu post aparece no feed daquela pessoa ✓ |
| "dica dois: comenta nos perfis do seu nicho" | MOTION | selo "DICA 2"; post de outro perfil do mesmo nicho |
| "não só um coraçãozinho" | MOTION | um comentário "❤️" riscado em vermelho ✗ |
| "Comentário de verdade" | MOTION | um comentário útil de 2 linhas ✓ |
| "Quem lê, clica no seu perfil" | MOTION | o dedo toca o seu @ e o seu perfil se abre |
| "Se essa dica te ajudou" | avatar CHEIO | selo "DICA SALVA? 💾" |
| "segue o Digo Social" | avatar CHEIO | botão "Seguir" → "Seguindo ✓" (o mesmo do 004) |
| "Toda semana tem mais." | avatar CHEIO, punch-in | "TODA SEMANA TEM MAIS" |
| fim | tela final | logo oficial + Digo Social + @digo.social |

## Custo estimado (Higgsfield)

| Asset | Duração | Créditos |
|---|---|---|
| Voz completa (Seed Audio, voz do Diogo) | ~35 s | ~4 |
| Avatar A, abertura (Seedance 2 Mini 720p) | 4 s | 4 |
| Avatar B, CTA | 4–5 s | 4–5 |
| **Total** | | **~12–13** |

## Fontes da explicação

- [Social Media Today: explicação do Instagram sobre o ranking do Feed, Reels e Stories](https://www.socialmediatoday.com/news/instagram-shares-new-explainer-on-how-its-feed-reels-and-stories-algorithm/651705/)
- [exchange4media: Adam Mosseri explica como o Instagram ranqueia posts](https://www.exchange4media.com/digital-news/how-instagram-ranks-posts-adam-mosseri-explains-the-algorithm-150488.html)
- [Social Samosa: Instagram revela os fatores principais de alcance](https://www.socialsamosa.com/news-2/instagram-reveals-key-factors-for-boosting-reach-8646916)
