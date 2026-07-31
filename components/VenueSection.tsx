'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import type { VenueInfo } from '@/lib/venueData';

interface VenueSectionProps extends VenueInfo {
  id: string;
  background?: 'cream' | 'butter';
}

export default function VenueSection({
  id,
  eyebrow,
  title,
  date,
  time,
  address,
  background = 'cream',
}: VenueSectionProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section
      id={id}
      className={`section-padding ${
        background === 'butter' ? 'bg-butter-100' : 'bg-cream-100'
      }`}
    >
      <div className="section-container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm uppercase tracking-widest text-lilac-600">
            {eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl text-lilac-900 mt-3 mb-8">
            {title}
          </h2>

          <div className="space-y-4 text-lilac-700">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-butter-600 shrink-0" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-butter-600 shrink-0" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-butter-600 shrink-0" />
              <span>{address}</span>
            </div>
          </div>

          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-butter-600 hover:bg-butter-700 text-white px-6 py-3 rounded-full shadow-soft transition-colors duration-300 text-sm tracking-wide"
          >
            Abrir no Google Maps
            <ExternalLink size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-soft"
        >
          <iframe
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa - ${title}`}
          />
        </motion.div>
      </div>
    </section>
  );
}