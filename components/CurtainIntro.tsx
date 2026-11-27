'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Cor da capa. Troque aqui se quiser outra (ex.: couro marrom '#6B4226').
const COVER_COLOR = '#C79122';
// Espessura da capa (em pixels): aparece nas laterais quando ela abre
const DEPTH = 14;
// Duração da abertura, em segundos
const OPEN_DURATION = 1.8;

const TOTAL_MS = OPEN_DURATION * 1000 + 300;

// Textura de couro: grão fino + manchas maiores, geradas sem usar nenhuma imagem
const noise = (frequency: number, alpha: number, size: number) => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='3' stitchTiles='stitch'/>` +
    `<feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${alpha} 0'/></filter>` +
    `<rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const LEATHER = [
  noise(0.9, 0.7, 240),
  noise(0.05, 0.35, 600),
  'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.2), rgba(255,255,255,0) 55%)',
  'radial-gradient(ellipse at 85% 95%, rgba(0,0,0,0.28), rgba(0,0,0,0) 60%)',
].join(', ');

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

  // Depois que a capa termina de abrir, remove tudo
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
          {/* A capa inteira gira pela lombada (lado esquerdo) */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
            animate={opening ? { rotateY: -100 } : { rotateY: [0, -2.5, 0] }}
            transition={
              opening
                ? { duration: OPEN_DURATION, ease: [0.5, 0, 0.2, 1] }
                : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Frente da capa */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateZ(${DEPTH / 2}px)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                backgroundColor: COVER_COLOR,
                backgroundImage: LEATHER,
                boxShadow:
                  'inset 0 0 90px rgba(0,0,0,0.4), inset 0 0 0 3px rgba(255,255,255,0.18)',
              }}
            >
              {/* Junta da lombada */}
              <div
                className="absolute inset-y-0 left-0 w-6 md:w-10"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.12) 45%, rgba(255,255,255,0.18) 60%, rgba(0,0,0,0.25))',
                }}
              />

              {/* Moldura em relevo, sem texto */}
              <div
                className="absolute inset-8 md:inset-14"
                style={{
                  boxShadow:
                    'inset 0 0 0 2px rgba(0,0,0,0.28), 0 0 0 2px rgba(255,255,255,0.28), 0 3px 6px rgba(0,0,0,0.25)',
                }}
              />
              <div
                className="absolute inset-12 md:inset-[4.5rem]"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.2)',
                }}
              />
            </div>

            {/* Lateral direita (a espessura da capa) */}
            <div
              className="absolute inset-y-0"
              style={{
                width: DEPTH,
                right: -DEPTH / 2,
                transform: 'rotateY(90deg)',
                background: `linear-gradient(90deg, #6e4d0c, ${COVER_COLOR} 50%, #6e4d0c)`,
              }}
            />

            {/* Verso (parte de dentro da capa) */}
            <div
              className="absolute inset-0"
              style={{
                transform: `translateZ(${-DEPTH / 2}px) rotateY(180deg)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                backgroundColor: '#FBF3DC',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}