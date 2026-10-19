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

**Resultado:** o Diogo reprovou a voz: "não ficou nada a ver com a personagem".

## Segunda rodada de voz (19/10/2026)

Análise: o F0 mediano da Kayla em português foi 186 Hz (mais jovem que a personagem). Foram testadas vozes mais graves e quentes, mais uma criada a partir da imagem dela:

| # | Voz | F0 | |
|---|---|---|---|
| 1 | `seed_audio` + `image_references` = imagem oficial | 235 Hz | **escolhida** |
| 2 | ElevenLabs Onyx | 186 Hz | |
| 3 | ElevenLabs Soraya | 167 Hz | |
| 4 | ElevenLabs Sienna | 203 Hz | |
| 5 | ElevenLabs Nadine | 190 Hz | |

A voz criada pela imagem muda a cada geração, então a amostra 1 (job `f2303dcf-150b-43ac-a939-a1f6a16e502b`) virou `audio_references`. A clonagem manteve o timbre (235 Hz).

Grafias: "djíca"/"djica" saíram como "de dica"/"dia", então "dica" fica normal; o Diogo pediu "Tôda semana" (não "Tóda").

## Vídeo de teste 2

- Texto da voz: "Ôi, gênti! Eu sou a nova cara do Dígo Sociáu. Tôda semana tem dica de Instagrâ aqui. Ségui o Dígo Sociáu!"
- Voz: job `b801f406-bfc5-487c-9a0a-baae07135a30`, 8,02 s → 6,29 s no corte de dica.
- Clipe: job `b632fda4-89f5-4144-b59a-1ee1e637822c`. Sincronia: atraso mediano 5 ms, 4% das janelas acima de 45 ms.
- Saída: `video/teste_apresentadora_v2.mp4`, −14,4 LUFS, pico −1,7 dBTP.

**Resultado:** ainda não encaixou. Diagnóstico por medição: a voz estava aguda demais para a idade (~240 Hz), plana e mais rápida que a boca do clipe.

## Terceira rodada: tom e velocidade

Mesma voz clonada com `pitch_rate` −2 (211 Hz) e −4 (193 Hz). O Diogo preferiu o −4 (V2) a 1,3×, mas ainda achou robotizada. Medição: o `pitch_rate` cria saltos bruscos de tom (2,3% dos quadros contra 0,4–0,6% numa voz natural), e o corte seco tirou toda a respiração (3 pausas iguais em 5,9 s). **Conclusão: nunca baixar o tom com `pitch_rate`; achar uma voz que já nasça grave.**

## Quarta rodada: vozes naturalmente graves, com respiro

Sem `pitch_rate`, `speech_rate` 0, corte `--pausa 0.25 --pausa-frase 0.45 --cauda 0.8 --limiar 30 --fade 0.06 --velocidade 1.1`. Texto com conectivos falados: "Ôi, gênti! Eu sou a nova cara do Dígo Sociáu. Ó, tôda semana tem dica de Instagrâ aqui, tá? Então ségui o Dígo Sociáu!"

| # | Origem | Job | F0 | Faixa tonal |
|---|---|---|---|---|
| 1 | `image_references` = imagem oficial `4312127e…` | `3bddd87e-a7e9-44ff-a36e-686ba17cd96a` | 208 Hz | 6,8 st |
| 2 | `image_references` = rosto 2 sem logo | `26c98ae4…` | 262 Hz | 10,5 st |
| 3 | `image_references` = versão anterior `79addd0d…` | `f9f2e083-585e-4950-9dd5-336502191d1b` | 246 Hz | 10,2 st |
| 4 | `audio_references` = amostra Soraya | `3e929b4a…` | 162 Hz | 12,4 st |

O Diogo gostou da 1 e da 3. Vídeos de teste (Seedance 2 Mini): voz 1 = clipe `d691757e-1ebf-4388-86ad-09c9b22482b6` (atraso mediano 5 ms, 8% > 45 ms); voz 3 = clipe `71e6ae09-07db-4e39-82c5-b0af7948ec8f` (10 ms, 19% > 45 ms, com gestos de mão).
