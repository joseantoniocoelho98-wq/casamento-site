'use client';

import { motion } from 'framer-motion';
import { storyItems } from '@/lib/storyData';
import TimelineCard from './TimelineCard';

export default function OurStory() {
  return (
    <section id="historia" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-base uppercase tracking-widest text-butter-700">
            Nossa jornada
          </span>
          <h2 className="text-5xl md:text-6xl text-butter-700 mt-3">
            Nossa História
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-16 md:gap-24">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-butter-300 -translate-x-1/2" />

          {storyItems.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              align={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}