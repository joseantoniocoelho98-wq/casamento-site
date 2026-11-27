'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Cor da cortina (o mesmo dourado dos títulos). Troque aqui se quiser outra.
const CURTAIN_COLOR = '#C79122';
// Quantidade de "faixas de tecido" por lado: mais faixas = mais pregas
const STRIPS = 8;
// Duração do movimento de abertura, em segundos
const OPEN_DURATION = 1.7;
// Atraso entre uma faixa e a seguinte (o tecido é puxado do centro para fora)
const STAGGER = 0.07;

const SLOT = 100 / STRIPS; // largura de cada faixa, em % do lado da cortina
const OVERLAP = 2.2; // cada faixa é mais larga que seu espaço, para as pregas se sobreporem
const GATHER = 0.92; // quanto a cortina se junta nas laterais ao abrir
const SQUEEZE = 0.3; // quanto cada faixa se comprime ao abrir

type Side = 'left' | 'right';

function Strip({ d, side, opening, onDone }: { d: number; side: Side; opening: boolean; onDone?: () => void }) {
  // d = distância da borda da tela (0 = encostada na lateral, última = no centro)
  const dir = side === 'left' ? -1 : 1;
  const delay = (STRIPS - 1 - d) * STAGGER; // o centro se move primeiro
  const gatherX = `${dir * d * ((GATHER * SLOT) / (OVERLAP * SLOT)) * 100}%`;

  const closedAnim = {
    x: 0,
    scaleX: 1,
    skewX: [0, 0.7 * dir, -0.7 * dir, 0],
  };
  const closedTransition = {
    x: { duration: 0 },
    scaleX: { duration: 0 },
    skewX: {
      duration: 5 + d * 0.35,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const openAnim = {
    x: gatherX,
    scaleX: SQUEEZE,
    // A parte de baixo fica para trás e balança, como um tecido de verdade
    skewX: [0, -dir * 10, dir * 5, -dir * 3, 0],
  };
  const openTransition = {
    x: { duration: OPEN_DURATION, delay, ease: [0.45, 0, 0.2, 1] as [number, number, number, number] },
    scaleX: { duration: OPEN_DURATION, delay, ease: [0.45, 0, 0.2, 1] as [number, number, number, number] },
    skewX: {
      duration: OPEN_DURATION + 0.9,
      delay,
      times: [0, 0.3, 0.55, 0.8, 1],
      ease: 'easeInOut' as const,
    },
  };

  return (
    <motion.div
      className="absolute inset-y-0"
      style={{
        width: `${OVERLAP * SLOT}%`,
        [side]: `${d * SLOT}%`,
        transformOrigin: side === 'left' ? 'left top' : 'right top',
        backgroundColor: CURTAIN_COLOR,
        backgroundImage:
          'linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.16) 30%, rgba(0,0,0,0.25) 62%, rgba(0,0,0,0.42) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0) 15%, rgba(0,0,0,0) 82%, rgba(0,0,0,0.35))',
        boxShadow: `${side === 'left' ? '' : '-'}6px 0 14px rgba(0,0,0,0.3)`,
      }}
      animate={opening ? openAnim : closedAnim}
      transition={opening ? openTransition : closedTransition}
      onAnimationComplete={() => {
        if (opening && onDone) onDone();
      }}
    />
  );
}

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

  const indexes = Array.from({ length: STRIPS }, (_, i) => i);

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
          transition={{ duration: 0.4 }}
        >
          {/* Cortina esquerda */}
          <div className="absolute inset-y-0 left-0 w-[50.5%]">
            {indexes.map((d) => (
              <Strip key={`l${d}`} d={d} side="left" opening={opening} onDone={d === 0 ? () => setVisible(false) : undefined} />
            ))}
          </div>

          {/* Cortina direita */}
          <div className="absolute inset-y-0 right-0 w-[50.5%]">
            {indexes.map((d) => (
              <Strip key={`r${d}`} d={d} side="right" opening={opening} />
            ))}
          </div>

          {/* Varão no alto */}
          <motion.div
            className="absolute inset-x-0 top-0 h-3"
            style={{
              background:
                'linear-gradient(to bottom, #f3d58a, #8a6213 60%, #5a3f0a)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            }}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.6, delay: opening ? 1.2 : 0 }}
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