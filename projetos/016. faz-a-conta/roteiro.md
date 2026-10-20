# 016. Faz a conta: roteiro (para aprovação)

Reels de **dica que gera valor** (guia 6, seção 12) com a Luísa. Ensina a pessoa a **avaliar o próprio Reels** com a conta que o Instagram faz: curtidas e envios **em relação a quem viu**, não o número solto. ~55 s.

**Não repete o 006 nem o 007.** O 006 explicou por que o envio pesa mais que a curtida, e o 007 explicou o gancho dos 3 primeiros segundos. Aqui o porquê vira só uma frase; o vídeo é prático: onde achar os números e como fazer a conta.

## Fala (português correto: roteiro, legenda e telas) · v2

Mudanças pedidas pelo Diogo: gancho mais chamativo e um **exemplo concreto** (uma confeitaria com dois Reels de verdade), no lugar do "Reels A × Reels B" abstrato.

| Bloco | Fala |
|---|---|
| Gancho (Luísa) | Olha isso: um Reels com quinhentas visualizações pode ser melhor que um com duas mil. Parece mentira, né? |
| O porquê | O chefe do Instagram, o Adam Mosseri, já disse: o que mais pesa é o tempo assistido, as curtidas e os envios. Mas não o número solto. O Instagram compara com quantas pessoas viram. |
| Dica 1 | Então, primeira dica: abre o seu Reels e toca em "ver insights". Ali tem quatro números: contas alcançadas, curtidas, compartilhamentos e tempo médio de visualização. |
| Dica 2 + exemplo | Segunda: faz a conta. Curtidas dividido por contas alcançadas. Imagina a Ana, que vende bolo. O Reels do bolo de chocolate chegou em duas mil pessoas e teve cem curtidas. O da receita de brigadeiro chegou em quinhentas, e também teve cem curtidas. Parece empate, né? Mas o bolo deu cinco por cento. O brigadeiro, vinte. E ainda foi compartilhado quarenta vezes. Quem agradou de verdade foi o brigadeiro. Então a Ana sabe: o próximo vídeo é receita. |
| Fecho | E compara sempre com os seus próprios posts, não com os dos outros. |
| CTA (Luísa) | Se essa dica te ajudou, segue o Digo Social. Toda semana tem mais. |

## Texto da voz

Português normal (ElevenLabs v4, voz Onyx). Números por extenso para não haver leitura errada ("duas mil", "cem", "quinhentas"). "Insights" fica como está (é o nome do botão no app).

## A conta do exemplo (na tela)

| | 🍫 Bolo de chocolate | 🍬 Receita de brigadeiro |
|---|---|---|
| Contas alcançadas | 2.000 | 500 |
| Curtidas | 100 | 100 |
| Curtidas ÷ alcance | **5%** | **20%** (4× mais) |
| Compartilhamentos | 10 | 40 |
| Compartilhamentos ÷ alcance | 0,5% | **8%** |

A Ana e os números são um exemplo ilustrativo (aparece "exemplo" na tela), sem prometer "taxa boa": não existe número oficial. A regra é comparar com os próprios posts.

## Fonte (selo na tela)

| Afirmação | Fonte | Na tela |
|---|---|---|
| Os sinais que mais pesam são tempo assistido, curtidas e envios; o criador deve olhar tempo médio de visualização, curtidas por alcance e envios por alcance | Adam Mosseri, vídeo de jan/2025, noticiado por [Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/) (a mesma fonte do 006) | 📰 Fonte: Social Media Today · "Instagram revela os sinais que mais pesam" (2025) |

- O texto falado diz "o Instagram compara com quantas pessoas viram", que é a leitura de "likes per reach" e "sends per reach".
- **Telas do app recriadas sem marca** (padrão do 013): botão "Ver insights" e os quatro números. Os nomes ("Contas alcançadas", "Compartilhamentos", "Tempo médio de visualização") são os do app em português. Confiro no seu app antes do render, se você puder me mandar um print dos insights de um Reels.

## Legenda do post (rascunho)

> Um Reels com 500 visualizações pode ser melhor que um com 2 mil. Parece mentira? 🤔
>
> O Instagram não olha o número solto: ele compara curtidas e envios com quantas pessoas viram (Adam Mosseri, 2025).
>
> 📊 Faz a conta:
> curtidas ÷ contas alcançadas
> compartilhamentos ÷ contas alcançadas
>
> Exemplo: a Ana, que vende bolo, postou dois Reels com 100 curtidas cada.
> 🍫 Bolo de chocolate: 2.000 pessoas → 5%
> 🍬 Receita de brigadeiro: 500 pessoas → 20% (e 40 compartilhamentos)
> Quem agradou de verdade foi o brigadeiro. Próximo vídeo: receita.
>
> E compara sempre com os seus próprios posts.
>
> 💾 Salva pra fazer a conta no próximo post e segue o @digo.social. Toda semana tem mais.
>
> #dicasdeinstagram #metricasinstagram #crescernoinstagram #reelsdicas #digosocial

## Voz gerada (20/10/2026)

- 1ª geração sem `stability`: a voz saiu diferente da do 015, e o Diogo percebeu (CTA igual: 216 → 188 Hz). Ela foi guardada em `hf/v1_sem_estabilidade/`.
- Versão final: `stability: 0.6`, `similarity_boost: 0.85`. O meio ficou com 198 Hz contra 203 Hz no 015. O CTA é o áudio do 015.
- O "Um" do gancho saiu como "Hum", então o gancho passou a ser "Olha isso: um Reels…". O meio foi enxugado ("Ela postou dois Reels" e o segundo "Faz a conta" saíram).
- Duração: 62,9 s de voz.
