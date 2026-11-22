'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Camera,
  Cake,
  CheckCircle2,
  Church,
  Clock,
  Heart,
  MailX,
  Palette,
  PartyPopper,
  Shirt,
} from 'lucide-react';
import { guideItems } from '@/lib/guideData';

// Rótulo curto de cada ícone. Se um ícone não estiver aqui, usa o título completo do item.
const iconLabels = new Map<unknown, string>([
  [CheckCircle2, 'Presença'],
  [Church, 'Cerimônia'],
  [Clock, 'Pontualidade'],
  [MailX, 'Convite'],
  [Shirt, 'Traje'],
  [Palette, 'Cores'],
  [Camera, 'Fotógrafos'],
  [Cake, 'Doces'],
  [Heart, 'Despedida'],
  [PartyPopper, 'Aproveite'],
]);

export default function GuestGuideSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [cols, setCols] = useState(2);

  // 2 itens por linha no celular, 4 no computador
  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)');
    const update = () => setCols(media.matches ? 4 : 2);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const rows: (typeof guideItems)[] = [];
  for (let i = 0; i < guideItems.length; i += cols) {
    rows.push(guideItems.slice(i, i + cols));
  }

  return (
    <section className="section-padding">
      <div className="section-container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-lg uppercase tracking-widest text-black">Querido</span>
          <h2 className="mt-3 text-6xl md:text-7xl">Convidado</h2>
          <p className="mt-4 text-xl text-black">
            Ajude-nos a deixar esse dia ainda mais especial! Por gentileza:
          </p>
          <p className="mt-2 text-lg text-black">Toque em cada ícone para ver o que significa.</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {rows.map((row, rowIndex) => {
            const selectedItem = row.find((item) => item.id === selected);

            return (
              <div key={rowIndex}>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {row.map((item) => {
                    const Icon = item.icon;
                    const isOpen = selected === item.id;
                    const label = iconLabels.get(item.icon) ?? item.title;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelected(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        className="flex flex-col items-center gap-3 text-center"
                      >
                        <span
                          className={`flex h-16 w-16 items-center justify-center rounded-full border border-black transition ${
                            isOpen ? 'bg-black text-white' : 'bg-white text-black'
                          }`}
                        >
                          <Icon size={28} />
                        </span>
                        <span className="font-body text-lg leading-tight text-black">{label}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {selectedItem && (
                    <motion.div
                      key={selectedItem.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mx-auto mt-6 max-w-xl rounded-2xl border border-black/20 px-5 py-4 text-center font-body text-xl leading-relaxed text-black">
                        <strong>{selectedItem.title}</strong> {selectedItem.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}