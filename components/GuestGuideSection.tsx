'use client';

import { motion } from 'framer-motion';
import { guideItems } from '@/lib/guideData';

export default function GuestGuideSection() {
  return (
    <section className="section-padding">
      <div className="section-container max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-lg uppercase tracking-widest text-butter-700">
            Querido
          </span>
          <h2 className="text-6xl md:text-7xl text-butter-700 mt-3">Convidado</h2>
          <p className="text-xl text-butter-700 mt-4">
            Ajude-nos a deixar esse dia ainda mais especial! Por gentileza:
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {guideItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                className="flex items-start gap-4 text-left"
              >
                <div className="w-11 h-11 shrink-0 rounded-full bg-butter-100 flex items-center justify-center">
                  <Icon className="text-butter-600" size={20} />
                </div>
                <p className="text-lg text-butter-700 leading-relaxed">
                  <strong>{item.title}</strong> {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}