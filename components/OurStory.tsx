'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { storyInfo } from '@/lib/storyData';
import { MixedFontText } from '@/lib/mixedFontText';

export default function OurStory() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="historia" className="section-padding">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl text-black text-center mb-16 md:mb-20"
        >
          {storyInfo.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-soft bg-gray-100 flex items-center justify-center"
          >
            {!imageFailed ? (
              <Image
                src={storyInfo.image}
                alt="José e Ianca"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <Heart className="text-black/40" size={40} />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-5 text-xl text-black leading-relaxed text-left"
          >
            {storyInfo.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <MixedFontText text={paragraph} />
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}