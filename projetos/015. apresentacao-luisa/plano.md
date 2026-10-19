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
