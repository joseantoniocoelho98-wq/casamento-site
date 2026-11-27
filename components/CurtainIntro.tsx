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
// Tempo extra do balanço final, em segundos
const SWAY_EXTRA = 0.9;

const SLOT = 100 / STRIPS; // largura de cada faixa, em % do lado da cortina
const OVERLAP = 2.2; // cada faixa é mais larga que seu espaço, para as pregas se sobreporem
const GATHER = 0.92; // quanto a cortina se junta nas laterais ao abrir
const SQUEEZE = 0.3; // quanto cada faixa se comprime ao abrir

// Tempo total até a cortina terminar de abrir (em milissegundos)
const TOTAL_MS = ((STRIPS - 1) * STAGGER + OPEN_DURATION + SWAY_EXTRA) * 1000 + 100;

type Side = 'left' | 'right';

const EASE: [number, number, number, number] = [0.45, 0, 0.2, 1];

function Strip({ d, side, opening }: { d: number; side: Side; opening: boolean }) {
  // d = distância da borda da tela (0 = encostada na lateral, última = no centro)
  const dir = side === 'left' ? -1 : 1;
  const delay = (STRIPS - 1 - d) * STAGGER; // o centro se move primeiro
  const gatherX = `${dir * d * ((GATHER * SLOT) / (OVERLAP * SLOT)) * 100}%`;

  const closedAnim = {
    x: '0%',
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
    x: { duration: OPEN_DURATION, delay, ease: EASE },
    scaleX: { duration: OPEN_DURATION, delay, ease: EASE },
    skewX: {
      duration: OPEN_DURATION + SWAY_EXTRA,
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
          'linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.16) 30%, rgba(0,0,0,0.25) 62%, rgba(0,0,0,0.42) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0) 15%, rgba(0,0,0,0) 82%,