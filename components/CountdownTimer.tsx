'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/lib/useCountdown';

interface CountdownTimerProps {
  targetDate: string;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-5xl font-body font-semibold text-butter-600 tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-2 text-xs md:text-sm uppercase tracking-widest text-butter-600/70">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex gap-3 md:gap-5 justify-center"
    >
      <TimeBlock value={days} label="Dias" />
      <TimeBlock value={hours} label="Horas" />
      <TimeBlock value={minutes} label="Min" />
      <TimeBlock value={seconds} label="Seg" />
    </motion.div>
  );
}