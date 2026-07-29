'use client';

import { useEffect, useState } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calcula quanto tempo falta até uma data-alvo, atualizando a cada segundo.
 * Recebe a data do casamento e retorna dias/horas/minutos/segundos restantes.
 */
export function useCountdown(targetDate: string): TimeLeft {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Começa zerado de propósito: assim o servidor e o cliente renderizam
  // exatamente a mesma coisa na primeira vez (evita erro de hydration).
  // O valor real só é calculado depois, já no navegador.
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calcula o valor real assim que o componente monta no navegador.
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Importante: sempre limpar o intervalo ao desmontar o componente,
    // senão o contador continua rodando "escondido" e consome memória.
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return timeLeft;
}
