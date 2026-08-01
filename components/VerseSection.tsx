'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function VerseSection() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="section-padding">
      <div className="section-container flex flex-col items-center text-center gap-10 max-w-2xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-display text-lilac-900 leading-relaxed"
        >
          &ldquo;Portanto, o que Deus uniu, ninguém separe.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-soft"
        >
          {!imageFailed ? (
            <Image
              src="/images/verse.jpg"
              alt="José e Ianca"
              fill
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cream-200 via-cream-100 to-butter-200" />
          )}
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm tracking-widest uppercase text-lilac-600"
        >
          <span className="font-display text-lg normal-case">Marcos</span>{' '}
          <span className="font-body">10:9</span>
        </motion.span>
      </div>
    </section>
  );
}