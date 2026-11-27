'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Cor da cortina (o mesmo dourado dos títulos). Troque aqui se quiser outra.
const CURTAIN_COLOR = '#C79122';
// Duração da abertura, em segundos
const OPEN_DURATION = 1.8;

const curtainStyle = (side: 'left' | 'right') => ({
  backgroundColor: CURTAIN_COLOR,
  // Dobras do tecido + sombra no alto e embaixo
  backgroundImage:
    'repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0) 26px, rgba(255,255,255,0.14) 52px, rgba(0,0,0,0.22) 78px), linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0) 18%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3))',
  boxShadow:
    side === 'left' ? '8px 0 24px rgba(0,0,0,0.35)' : '-8px 0 24px rgba(0,0,0,0.35)',
});

export default function CurtainIntro() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  // Não mostra a cortina quando o link já aponta para uma seção (ex.: QR code do álbum),
  // ao voltar do pagamento ou no modo administrador
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.hash || params.has('presente') || params.has('admin')) {
      setVisible(false);
    }
  }, []);

  // Trava a rolagem enquanto a cortina está fechada
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
          role="button"
          tabIndex={0}
          aria-label="Abrir convite"
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Cortina esquerda */}
          <motion.div
            className="absolute inset-y-0 left-0 w-[50.5%]"
            style={curtainStyle('left')}
            animate={{ x: opening ? '-100%' : 0 }}
            transition={{ duration: OPEN_DURATION, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => {
              if (opening) setVisible(false);
            }}
          />

          {/* Cortina direita */}
          <motion.div
            className="absolute inset-y-0 right-0 w-[50.5%]"
            style={curtainStyle('right')}
            animate={{ x: opening ? '100%' : 0 }}
            transition={{ duration: OPEN_DURATION, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Texto no centro */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-6xl text-white drop-shadow-lg md:text-8xl">
              José &amp; Ianca
            </h1>
            <p className="mt-3 font-numeros text-2xl tracking-widest text-white drop-shadow-lg md:text-3xl">
              09.01.2027
            </p>
            <p className="mt-10 animate-pulse font-body text-xl text-white drop-shadow-lg">
              Toque para abrir
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}