'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {!imageError ? (
        <>
          {/* Fundo desfocado: aparece só no computador, atrás da foto inteira */}
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hidden scale-110 object-cover blur-2xl md:block"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 hidden bg-black/30 md:block" />

          {/* Foto nítida: celular = preenche a tela; computador = aparece inteira */}
          <Image
            src="/images/hero.jpg"
            alt="José e Ianca"
            fill
            priority
            quality={90}
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-center md:object-contain"
            onError={() => setImageError(true)}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-butter-300 to-lilac-300" />
      )}

      {/* Degradê apenas embaixo, para o texto ficar legível sem escurecer a foto toda */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-10 text-center md:pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl text-butter-200 drop-shadow-lg md:text-8xl"
        >
          José &amp; Ianca
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 font-numeros text-2xl tracking-widest text-butter-200 drop-shadow-lg md:text-3xl"
        >
          09.01.2027
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToRSVP}
          className="mt-6 rounded-full border border-white/70 bg-white/10 px-8 py-3 font-body text-xl text-white backdrop-blur-sm transition hover:bg-white/25"
        >
          Confirmar presença
        </motion.button>
      </div>
    </section>
  );
}