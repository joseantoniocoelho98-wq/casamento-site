import type { LucideIcon } from 'lucide-react';
import {
  CheckCircle2,
  Church,
  PartyPopper,
  Cake,
  MailX,
  Clock,
  Camera,
  Heart,
  Shirt,
  Palette,
} from 'lucide-react';

export interface GuideItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const guideItems: GuideItem[] = [
  {
    id: '1',
    icon: CheckCircle2,
    title: 'Confirme sua presença',
    description: 'assim que possível — isso nos ajuda a organizar tudo com carinho.',
  },
  {
    id: '2',
    icon: Church,
    title: 'Participe da cerimônia',
    description: 'com a gente, cada momento fica mais bonito com você por perto.',
  },
  {
    id: '3',
    icon: Clock,
    title: 'Seja pontual',
    description: 'começaremos no horário combinado.',
  },
  {
    id: '4',
    icon: MailX,
    title: 'Convidado não convida',
    description: 'seu convite é pessoal e intransferível.',
  },
  {
    id: '5',
    icon: Shirt,
    title: 'Dress code: esporte fino',
    description: 'capriche com carinho no traje!',
  },
  {
    id: '6',
    icon: Palette,
    title: 'Branco é a cor da noiva',
    description: 'pedimos gentilmente para evitar essa cor no seu look. Assim como amarelo e lilás',
  },
  {
    id: '7',
    icon: Camera,
    title: 'Não atrapalhe os fotógrafos',
    description: 'durante os registros do dia — eles vão eternizar tudo pra gente.',
  },
  {
    id: '8',
    icon: Cake,
    title: 'Aguarde a liberação da mesa de doces',
    description: 'assim garantimos que todos aproveitem igualmente.',
  },
  {
    id: '9',
    icon: Heart,
    title: 'Não saia sem se despedir',
    description: 'queremos um abraço apertado no final!',
  },
  {
    id: '10',
    icon: PartyPopper,
    title: 'Aproveite bastante',
    description: 'e o mais importante: aproveite muito esse dia com a gente!',
  },
];