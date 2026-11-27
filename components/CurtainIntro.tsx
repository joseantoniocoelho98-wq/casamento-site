'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Cor da capa (o mesmo dourado dos títulos). Troque aqui se quiser outra.
const COVER_COLOR = '#C79122';
// Frase abaixo da data. Troque pelo seu texto, ou deixe '' para não mostrar nada.
const COVER_SUBTITLE = 'Uma história de amor';

const EASE: [number, number, number, number] = [0.5, 0, 0.2, 1];

// As três folhas que viram: a capa e duas páginas (duração e atraso, em segundos)
const SHEETS = [
  { duration: 1.6, delay: 0 },
  { duration: 1.4, delay: 0.35 },
  { duration: 1.4, delay: 0.7 },
];

// Tempo total até a última folha terminar de virar (em milissegundos)
const TOTAL_MS = Math.max(...SHEETS.map((s) => s.duration + s.delay)) * 1000 + 300;

function Sheet({
  index,
  opening,
  children,
}: {
  index: number;
  opening: boolean;
  children: React.ReactNode;
}) {
  const { duration, delay } = SHEETS[index];

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        zIndex: SHEETS.length - index,
        transformOrigin: 'left center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      animate={{ rotateY: opening ? -100 : 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const pageStyle = {
  backgroundColor: '#FBF3DC',
  backgroundImage:
    'linear-gradient(90deg, rgba(0,0,0,0.18), rgba(0,0,0,0) 14%), repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 31px, rgba(0,0,0,0.05) 31px, rgba(0,0,0,0.05) 32px)',
};

export default function CurtainIntro() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  // Não mostra a capa quando o link já aponta para uma seção (ex.: QR code do álbum),
  // ao voltar do pagamento ou no modo administrador
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.hash || params.has('presente') || params.has('admin')) {
      setVisible(false);
    }
  }, []);

  // Trava a rolagem enquanto a capa está fechada
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Depois que as folhas terminam de virar, remove tudo
  useEffect(() => {
    if (!opening) return;
    const timer = setTimeout(() => setVisible(false), TOTAL_MS);
    return () => clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="book-cover"
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden [perspective:2200px]"
          role="button"
          tabIndex={0}
          aria-label="Abrir livro"
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Página 2 (a última a virar) */}
          <Sheet index={2} opening={opening}>
            <div className="h-full w-full" style={pageStyle} />
          </Sheet>

          {/* Página 1 */}
          <Sheet index={1} opening={opening}>
            <div className="h-full w-full" style={pageStyle} />
          </Sheet>

          {/* Capa */}
          <Sheet index={0} opening={opening}>
            <div
              className="relative h-full w-full"
              style={{
                backgroundColor: COVER_COLOR,
                backgroundImage:
                  'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.3), rgba(0,0,0,0) 60%)',
              }}
            >
              {/* Lombada */}
              <div
                className="absolute inset-y-0 left-0 w-5 md:w-8"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 70%, rgba(255,255,255,0.15))',
                }}
              />

              {/* Moldura */}
              <div className="absolute inset-6 border-2 border-white/70 md:inset-10" />
              <div className="absolute inset-8 border border-white/40 md:inset-12" />

              {/* Título */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
                <h1 className="font-display text-6xl text-white drop-shadow-lg md:text-8xl">
                  José &amp; Ianca
                </h1>
                <p className="mt-4 font-numeros text-2xl tracking-widest text-white drop-shadow-lg md:text-3xl">
                  09.01.2027
                </p>
                {COVER_SUBTITLE && (
                  <p className="mt-6 font-body text-xl text-white drop-shadow-lg">
                    {COVER_SUBTITLE}
                  </p>
                )}
                <p className="mt-12 animate-pulse font-body text-xl text-white drop-shadow-lg">
                  Toque para abrir
                </p>
              </div>
            </div>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  );
}