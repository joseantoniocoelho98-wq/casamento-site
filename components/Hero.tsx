'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const WEDDING_DATE = '2027-02-28T16:00:00';

function scrollToRSVP() {
  document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {!imageFailed ? (
        <Image
          src="/images/hero.jpg"
          alt="Foto do casal"
          fill
          priority
          className="object-cover scale-105 blur-[6px]"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-cream-300 via-cream-200 to-butter-300" />
      )}
      <div className="absolute inset-0 bg-white/55" />

      <div className="relative z-10 section-container text-center flex flex-col items-center gap-8 py-24">
        {!logoFailed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-32 h-32 md:w-48 md:h-48"
          >
            <Image
              src="/images/logo.png"
              alt="Logo do casamento"
              fill
              className="object-contain"
              onError={() => setLogoFailed(true)}
            />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl text-lilac-900 leading-tight"
        >
          José <span className="text-cream-600 italic">&</span> Ianca
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-lilac-700"
        >
          28 de Fevereiro de 2027
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-xl text-sm md:text-base italic text-lilac-800 leading-relaxed"
        >
          &ldquo;Portanto, o que Deus uniu, ninguém separe.&rdquo;
          <span className="block not-italic mt-1 text-xs tracking-wide">
            Marcos 10:9
          </span>
        </motion.blockquote>

        <CountdownTimer targetDate={WEDDING_DATE} />

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToRSVP}
          className="mt-4 bg-butter-600 hover:bg-butter-700 text-white px-8 py-4 rounded-full shadow-soft transition-colors duration-300 text-sm md:text-base tracking-wide"
        >
          Confirmar presença
        </motion.button>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-lilac-600"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}