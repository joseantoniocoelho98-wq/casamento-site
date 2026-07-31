'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { StoryItem } from '@/lib/storyData';

interface TimelineCardProps {
  item: StoryItem;
  align: 'left' | 'right';
}

export default function TimelineCard({ item, align }: TimelineCardProps) {
  const isLeft = align === 'left';
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-soft bg-gradient-to-br from-lilac-200 via-cream-100 to-cream-200 flex items-center justify-center">
        {!imageFailed ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Heart className="text-lilac-500/60" size={40} />
        )}
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-butter-500 border-4 border-cream-50 shadow-soft" />

      <div className="w-full md:w-1/2 text-center md:text-left">
        <span className="text-xs uppercase tracking-widest text-lilac-600">
          {item.date}
        </span>
        <h3 className="text-2xl md:text-3xl text-lilac-900 mt-2 mb-3">
          {item.title}
        </h3>
        <p className="text-lilac-700 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}