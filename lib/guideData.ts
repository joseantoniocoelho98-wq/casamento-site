import type { LucideIcon } from 'lucide-react';
import { Clock, MailX, Palette, MessageCircle, Heart, PartyPopper, Wine, Shirt } from 'lucide-react';

export interface GuideItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

// Edite, adicione ou remova cards aqui — cada um vira um cartão na seção "Querido Convidado"
export const guideItems: GuideItem[] = [
  {
    id: '1',
    icon: Clock,
    title: 'Seja pontual',
    description: 'Não se atrase.',
  },
  {
    id: '2',
    icon: MailX,
    title: 'Não convide outras pessoas',
    description: 'O convite é pessoal e intransferível.',
  },
  {
    id: '3',
    icon: Palette,
    title: 'Cores proibidas',
    description: 'Não use branco, amarelo ou lilás.',
  },
  {
    id: '4',
    icon: MessageCircle,
    title: 'Não faça comentários negativos',
    description: 'Hoje é dia de festa!',
  },
  {
    id: '5',
    icon: Heart,
    title: 'Não saia sem se despedir',
    description: 'Vá até os noivos antes de ir embora.',
  },
  {
    id: '6',
    icon: PartyPopper,
    title: 'Aproveite bastante!',
    description: 'Vamos celebrar juntos.',
  },
  {
    id: '7',
    icon: Wine,
    title: 'Não haverá bebidas alcoólicas',
    description: 'Contamos com a sua compreensão.',
  },
  {
    id: '8',
    icon: Shirt,
    title: 'Dress code',
    description: 'Traje esporte fino.',
  },
];