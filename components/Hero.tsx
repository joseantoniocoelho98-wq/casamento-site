'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

// Data do casamento — troque aqui quando tiver a data real.
// Formato: 'AAAA-MM-DDTHH:MM:SS'
const WEDDING_DATE = '2027-02-28T16:00:00';

// Função que rola a página suavemente até a seção de RSVP.
// A seção com id="rsvp" será criada em uma etapa futura.
function scrollToRSVP() {
  document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  // Se a foto ainda não foi adicionada em /public/images/hero.jpg,
  // a imagem falha ao carregar e caímos de volta no gradiente.
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fundo — mostra a foto real do casal se existir, senão o gradiente */}
      {!imageFailed ? (
        <Image
          src="/images/hero.jpg"
          alt="Foto do casal"
          fill
          priority
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
         <div className="absolute inset-0 bg-gradient-to-br from-cream-300 via-cream-200 to-lilac-300" />
      )}
      <div className="absolute inset-0 bg-white/30" />

      {/* Conteúdo central */}
      <div className="relative z-10 section-container text-center flex flex-col items-center gap-8 py-24">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="uppercase tracking-[0.3em] text-sm md:text-base text-lilac-700"
        >
          Estamos nos casando
        </motion.p>

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
          className="mt-4 bg-lilac-700 hover:bg-lilac-800 text-white px-8 py-4 rounded-full shadow-soft transition-colors duration-300 text-sm md:text-base tracking-wide"
        >
          Confirmar presença
        </motion.button>
      </div>

      {/* Indicador de rolagem no rodapé da tela */}
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