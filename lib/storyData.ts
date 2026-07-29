export interface StoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  // Caminho da foto dentro da pasta /public. Troque pelos arquivos reais
  // quando tiver as fotos (ex: '/images/story-1.jpg').
  image: string;
}

// Edite os itens abaixo com a história real do casal.
// A ordem no array é a ordem em que aparecem na timeline (de cima para baixo).
export const storyItems: StoryItem[] = [
  {
    id: '1',
    date: 'Julho de 2024',
    title: 'Como nos conhecemos',
    description:
      'Nos conhecemos no hospital, ela era a farmacêutica do plantão, e eu fui "fisgado" pelo sorriso mais lindo do mundo.',
    image: '/images/story-1.jpg',
  },
  {
    id: '2',
    date: 'Agosto de 2024',
    title: 'O primeiro encontro',
    description:
      'Fomos ver Deadpool nos cinemas. Não é grande coisa, mas esse foi o tema de umas das nossas primeiras conversas. Lá passamos pelo parquinho do Shopping, fomos em vários brinquedos. Tentei me exibir no jogo de basquete, mas ela fazia mais cestas que eu.',
    image: '/images/story-2.jpg',
  },
  {
    id: '3',
    date: 'Outubro de 2024',
    title: 'O namoro',
    description:
      'Não demorou muito para entender que o tempo ao lado dela era precioso, e começamos a namorar. Foram dois anos de um relacionamento cheio de carinho e aprendizado, também passamos por dificulades juntos que nos fizeram ter certeza que queriamos a companhia permanente um do outro.',
    image: '/images/story-3.jpg',
  },
  {
    id: '4',
    date: 'Abril de 2026',
    title: 'O pedido',
    description:
      'Em um momento cheio de significado, o "sim" que confirmou o que já sabíamos há tempos.',
    image: '/images/story-4.jpg',
  },
];
