'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function scrollToRSVP() {
  document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false);

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
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute z-10 inset-x-0 bottom-12 md:bottom-16 section-container text-center flex flex-col items-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight"
        >
          José &amp; Ianca
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl font-numeros text-white"
        >
          09.01.27
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToRSVP}
          className="mt-2 border border-white/70 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full transition-colors duration-300 text-base md:text-lg tracking-wide"
        >
          Confirmar presença
        </motion.button>
      </div>
    </section>
  );
}