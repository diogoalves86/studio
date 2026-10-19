# 015. apresentacao-luisa: plano (v2)

Reels vertical 1080×1920, ~50 s, no padrão do guia 6, com a Luísa (seção 0). Roteiro e fontes em [roteiro.md](roteiro.md). Na v2 entrou o porquê da marca d'água, a pedido do Diogo.

## Geração (Higgsfield)

| Asset | Modelo | Configuração | Custo estimado |
|---|---|---|---|
| Voz inteira | `seed_audio` | `speech_rate` 0, `audio_references` = `3bddd87e…`, mp3 | ~7 créditos |
| Clipe A: gancho | `seedance_2_0_mini` | 720p, 9:16, 9 s, `start_image` = `4312127e…`, referência = recorte da voz com a duração exata do clipe | 9 créditos |
| Clipe B: CTA | `seedance_2_0_mini` | idem, 5 s | 5 créditos |
| **Total** | | | **~21 créditos** (até ~25 se uma frase precisar ser regravada) |

Ordem: voz → `cortar_pausas.py` (receita da Luísa, saída `_ritmo.wav`) → transcrição e conferência das grafias novas → recortes de referência → clipes → `narracao.py` → `sincronizar_avatar.py` → voz +100 ms na montagem.

## Cenas

| # | Fala | Luísa | Na tela |
|---|---|---|---|
| 1 | "Oi, gente! Eu sou a Luísa, a nova cara do Digo Social." | tela cheia (clipe A) | etiqueta "LUÍSA" no nome; logo pequena + "nova cara do @digo.social" |
| 2 | "Toda semana eu vou te trazer uma dica… com fonte, nada de achismo." | card (clipe A) | selo "📰 COM FONTE" bate na tela; "ACHISMO" leva risco vermelho |
| 3 | "E a primeira é pra quem baixa o vídeo de outro aplicativo e reposta no Instagram, né?" | fora (motion) | celular: o vídeo desce de um app genérico ("OUTRO APP"), ganha a marca d'água "@outroapp" e é postado no Instagram |
| 4 | "Desde 2021, o Instagram mostra menos Reels com marca d'água…" | fora | selo de fonte (2021); linha do tempo começa: **2021** |
| 5 | "Seus seguidores ainda veem, mas quem não te segue quase não recebe." | fora | diagrama do alcance: círculo de dentro (SEGUIDORES) acende; o de fora (QUEM NÃO TE SEGUE) fica apagado com ✕ |
| 6 | "O motivo: o Instagram quer premiar quem cria." | fora | tipografia grande "PREMIAR QUEM CRIA" (ciano, com brilho) |
| 7 | "O Adam Mosseri, chefe do Instagram, disse que conteúdo original vale mais que conteúdo repostado." | fora | cartão do Mosseri: foto de licença livre, nome, cargo e crédito da foto; selo de fonte (2022); balança ORIGINAL × REPOST pendendo para ORIGINAL; linha do tempo: **2022** |
| 8 | "Só que o Instagram não tem como saber com certeza quem criou o vídeo. Então ele procura pistas." | card | lupa varrendo o vídeo; "?" sobre o autor |
| 9 | "E a marca d'água é a pista mais óbvia de que o vídeo veio de outro lugar." | fora | a lupa para na marca d'água; ela pisca em vermelho e ganha a etiqueta "PISTA" |
| 10 | "Em 2024, ele foi além: quando encontra uma cópia, recomenda o original no lugar." | fora | linha do tempo: **2024**; dois cartões REPOST e ORIGINAL; o dedo arrasta o repost para fora e o original sobe; selo de fonte (2024) |
| 11 | "Então, primeira dica: salva o vídeo no celular antes de publicar no outro aplicativo, e posta esse arquivo original." | fora | passo a passo: 1. editar → 2. **salvar no celular** (destaque) → 3. postar no Instagram; ✓ "ARQUIVO ORIGINAL" |
| 12 | "Segunda: capricha na qualidade. Vídeo em boa resolução, em tela cheia, sem bordas." | card | três celulares ✕ → ✓, um por palavra: pixelado → nítido, com bordas → tela cheia 9:16; selo de fonte (2023) |
| 13 | (fim do meio) | — | cartão "FONTES" ~1,5 s: Instagram (2023), Tubefilter (2021, 2022), Gigazine (2024) |
| 14 | "Se essa dica te ajudou, segue o Digo Social. Toda semana tem mais." | tela cheia (clipe B) | cartão de perfil com a logo oficial: o dedo toca Seguir → Seguindo ✓ |
| 15 | (1,4 s depois) | — | tela final: logo, "Digo Social", "@digo.social" |

- **Linha do tempo 2021 → 2022 → 2024** fixa no topo das cenas 4 a 10, acendendo um ano por vez: costura o porquê.
- Momentos artificiais do `sincronia.md` cobertos por card ou motion. Legenda dinâmica, wipe azul, zoom por frase, textura de câmera e SFX pelo padrão.
- **Foto do Mosseri:** só com licença livre (Wikimedia Commons), com crédito na tela. Se não houver, entra um cartão só com nome e cargo.

## Pontos de aprovação

1. Este plano e o custo (~21 créditos).
2. A voz gerada, antes dos clipes (grafias "Luíza", "rílis", "marca dágua", "bórdas", "repósta", "Ádam Mossêri").
3. Stills de revisão antes do render final.

## Execução (19/10/2026)

- **Voz:** a 1ª geração (Seed Audio com texto todo fonético: "u", "di", "cum") soou "como uma pessoa estrangeira tentando falar português" e foi descartada. A voz final é do **ElevenLabs v4** com o clone **Luísa v2** (`1813c766…`), texto em português normal, cortada a 1,2× (receita da Luísa) e limpa com `highpass=f=90` (2×) e `afftdn=nr=10:nf=-55:tn=1`. O clone v1 (`793ce27b…`) tinha ronco de sala; mesmo no v2, o Diogo ainda nota um pouco de ruído e aceitou seguir.
- **Narração:** 63,8 s, em 4 trechos (`a` 0–8,55 com a Luísa; `meio` 8,55–13,41 pergunta; `corpo` 13,41–59,75; `b` 59,75–63,84 CTA).
- **Clipes:** A = job `a664c1f0-76b8-44cd-9798-2cc6f121e95d` (9 s, referência de 9,0 s); B = job `73dbea26-5a52-4247-8c69-40e30fd4a444` (4 s, referência de 4,0 s).
- **Sincronia:** A com atraso mediano de 5 ms e 3% > 45 ms; B com 5 ms e 13%. O congelamento em «Eu» (0,79–1,19 s) fica coberto pelo "OI! 👋"; os demais caem no card ou no motion. A imagem dos clipes adianta 3 quadros (`trimBefore`), o que equivale à voz +100 ms sem deixar a animação antes da palavra.
- **Revisão:** prancha `hf/prancha_revisao.jpg`. Corrigidos: a pílula "POSTA NO INSTAGRAM" cortada na borda, o título que batia no celular e no diagrama, a tag ORIGINAL sob o selo de fonte e a legenda sobre o cartão Seguir.
- **Custo real:** cerca de 103 créditos. Desse total, 80 foram dos dois clones de voz (40 cada), ~10 das vozes (ElevenLabs, Seed e Qwen, incluindo a geração descartada) e 13 dos clipes.
- **Final:** `edicoes/015. apresentacao-luisa/apresentacao-luisa_final.mp4`, 1080×1920, 30 fps, h264 + AAC estéreo, 65,27 s (fim da fala + 1,4 s), −13,9 LUFS, pico −1,8 dBTP (`volume=1.9dB` antes do limitador; sem ganho dava −15,8). Na prancha final ainda saiu a legenda "OUTRO LUGAR" sobre o texto da cena; foi escondida e o vídeo, renderizado de novo.
- **Aprovado pelo Diogo em 19/10/2026.** É o modelo de Reels com a Luísa: voz ElevenLabs v4 (clone v2), clipes no Seedance Mini e imagem adiantada 3 quadros.
- **Volume:** o Diogo preferiu **−24 LUFS** (pico −10 dBTP), que disfarça o ruído leve da voz. Arquivo para postar: `edicoes/015. apresentacao-luisa/apresentacao-luisa_final_-24LUFS.mp4`. Esse passa a ser o volume padrão dos vídeos da Luísa.

## Versão final com a voz Onyx (19/10/2026)

O ruído do clone v2 incomodava, então o vídeo foi refeito com a voz pronta **Onyx** (ElevenLabs v4, `8911390e…`), escolhida pelo Diogo entre 5 vozes prontas.

- **Voz:** 3 blocos, todas as palavras certas, corte a 1,2× e só um `highpass=f=70` (sem filtro de ruído). A narração tem 59,07 s; o trecho `a` vai até 7,85 s.
- **Clipes:** A = job `60365fba-72e3-4ed6-bda0-ea379de76822` (8 s); B = job `95004fed-496b-4721-9d9f-cb8c08c8b4d0` (4 s).
- **Sincronia:** A com 5 ms e 3% das janelas acima de 45 ms; B com 5 ms e 13%. O "OI! 👋" vai de 0,58 a 1,22 s; no CTA, a Luísa volta em tela cheia em «segue» + 0,2 s e sai em «toda» − 0,2 s.
- **Legenda:** o Whisper escreveu "vêm"; a legenda mostra "veem".
- **Volume:** de volta a −14 LUFS a pedido do Diogo (voz limpa). Com `volume=1.5dB` antes do limitador, deu −14,0 LUFS e pico −1,9 dBTP.
- **Final:** `edicoes/015. apresentacao-luisa/apresentacao-luisa_final.mp4`, 60,5 s. A versão anterior (clone v2) foi guardada em `versao_clone_v2/`.
- **Custo desta refação:** ~17 créditos (~4,9 de voz e 12 de clipes), mais 3,5 do teste das vozes prontas.
- **Aprovado pelo Diogo em 19/10/2026 (versão Onyx).** É o modelo dos próximos Reels com a Luísa.
