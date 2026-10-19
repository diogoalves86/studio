# 014. Nova apresentadora

Personagem de IA que substitui o avatar do Diogo em todos os vídeos do Digo Social a partir de 19/10/2026. O padrão de uso está na seção 0 do [guia 6](../../guias/6-padrao-reels-avatar.md).

## Voz

Todas as vozes prontas da Higgsfield são nativas em inglês (as amostras foram conferidas com o Whisper: 100% `en`). Teste com a mesma frase de dica em português:

| Amostra | Motor | Voz | Resultado |
|---|---|---|---|
| A | ElevenLabs | Kayla | **escolhida**: "a mais aceitável" |
| B | ElevenLabs | Naomi | |
| C | ElevenLabs | Maya | |
| D | MiniMax | Kayla | |
| E | MiniMax | Naomi | engoliu "some" ("som") |
| F | MiniMax | Maya | |
| G | ElevenLabs | Kayla, texto fonético | "ficou muito melhor" |

Texto da amostra G (escrito como se fala):

> Você pósta e sômi, né? Então, présta atenção, porque o Instagram móstra o seu póst primeiro pra pôuca gênti. Se essa djíca tchi ajudou, ségui o Dígo Sociáu.

Ajustes pedidos depois: "Instagrâm" e, no teste em vídeo, "Instagrâ" (sem o "m").

Voz oficial: `text2speech_v2`, `variant: elevenlabs`, `voice_type: preset`, `voice_id: 5c615d8a-5135-539d-8ab0-497b7ceabbae`.

## Rosto

`gpt_image_2_5` (high, 2k, 9:16), com a imagem oficial do avatar antigo (job `ab4aaba1-b3ad-4857-bbd1-ad2489e44341`) como referência de cenário e enquadramento.

1. Quatro rostos: mulher negra brasileira de ~30 anos, cabelo cacheado natural, camiseta marinho lisa. O Diogo escolheu o **2** (job `f0f2f870-7601-4b01-a691-87ac838e9cb3`).
2. Logo oficial na camiseta (media `869123c7-8f7c-4dc7-b540-9d9ef880215c`). O Diogo pediu: logo do outro lado, com "@digo.social", e o texto **ao lado** da logo.
3. Versão final: **B** da rodada "ao lado", job `4312127e-0351-40fb-8acd-4902cae5c0b0`. Ela é o `start_image` de todos os clipes da apresentadora.

## Custo

Cerca de 15,5 créditos: 7 testes de voz (~4,2), 4 rostos (2,75) e 3 rodadas de logo na camiseta (2,75 cada).

## Vídeo de teste (19/10/2026)

- Fala: "Oi, gente! Eu sou a nova cara do Digo Social. Toda semana tem dica de Instagram aqui. Segue o @digo.social!"
- Texto da voz: "Ôi, gênti! Eu sou a nova cara do Dígo Sociáu. Tóda semana tem djíca de Instagrâ aqui. Ségui o Dígo Sociáu!" (o Diogo corrigiu "Instagrâm" para "Instagrâ").
- Voz: job `8538c71b-4e43-4704-865a-b6f08e39af21`, 8,56 s → 6,68 s no corte de dica (1,2×).
- Clipe: Seedance 2 Mini 720p 9:16, 8 s, `start_image` = `4312127e…`, `audio_references` = voz `_ritmo` com 0,4 s de silêncio na frente. Job `e456cee0-57d3-4d08-820a-ec6db9711737` (8 créditos).
- Sincronia: atraso mediano 10 ms, 4% das janelas acima de 45 ms, velocidade 0,72–1,65×. Momentos artificiais: «Oi,» (0,01–0,13 s) e «Instagram aqui.» (4,76–4,93 s).
- Saída: `video/teste_apresentadora.mp4`, 1080×1920, −14,4 LUFS, pico −4,5 dBTP.
