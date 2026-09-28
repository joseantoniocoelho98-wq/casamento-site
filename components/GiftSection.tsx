'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { giftInfo } from '@/lib/giftData';

export default function GiftSection() {
  const [copied, setCopied] = useState(false);
  // Se o QR Code do Pix não estiver em /public/images/pix-qr.png, ele simplesmente não aparece
  const [qrFailed, setQrFailed] = useState(false);

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(giftInfo.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Se o navegador bloquear a cópia, a chave continua visível para copiar manualmente
    }
  }

  return (
    <section id="presentes" className="section-padding">
      <div className="section-container flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl text-butter-700">{giftInfo.title}</h2>
          <p className="text-xl text-butter-700 mt-4">{giftInfo.message}</p>
        </motion.div>

        {!qrFailed && (
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-soft bg-white">
            <Image
              src="/images/pix-qr.png"
              alt="QR Code do Pix"
              fill
              className="object-contain p-2"
              onError={() => setQrFailed(true)}
            />
          </div>
        )}

        <div className="w-full flex flex-col items-center gap-3 bg-butter-50 rounded-2xl p-6">
          <span className="text-base uppercase tracking-widest text-butter-700">
            Chave Pix
          </span>
          <p className="text-2xl text-butter-700 break-all">{giftInfo.pixKey}</p>
          {giftInfo.pixOwner && (
            <p className="text-base text-butter-600">{giftInfo.pixOwner}</p>
          )}
          <button
            onClick={copyPixKey}
            className="inline-flex items-center gap-2 bg-butter-600 hover:bg-butter-700 text-white px-6 py-3 rounded-full shadow-soft transition-colors duration-300 text-base tracking-wide"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Chave copiada!' : 'Copiar chave'}
          </button>
        </div>
      </div>
    </section>
  );
}