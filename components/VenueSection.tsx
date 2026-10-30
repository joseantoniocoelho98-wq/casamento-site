'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { venueInfo } from '@/lib/venueData';
import MixedFontText from '@/lib/mixedFontText';

export default function VenueSection() {
  const query = encodeURIComponent(venueInfo.mapQuery);
  const mapsUrl = venueInfo.mapsUrl;
  const embedUrl = `https://www.google.com/maps?q=${query}&z=17&output=embed`;

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 font-body text-lg uppercase tracking-widest text-black">
              Cerimônia e Recepção
            </p>

            <h2 className="mb-10 py-2 font-display text-5xl leading-[1.25] text-black md:text-6xl">
              {venueInfo.title}
            </h2>

            <ul className="space-y-5 text-black">
              <li className="flex items-center gap-4">
                <Calendar className="h-7 w-7 shrink-0" />
                <span className="font-body text-2xl">
                  <MixedFontText text={venueInfo.date} />
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="h-7 w-7 shrink-0" />
                <span className="font-body text-2xl">
                  <MixedFontText text={`Cerimônia: ${venueInfo.ceremonyTime}`} />
                </span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-7 w-7 shrink-0" />
                <span className="font-body text-2xl">
                  <MixedFontText text={venueInfo.address} />
                </span>
              </li>
            </ul>

            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-butter-600 px-7 py-3 font-body text-lg text-white shadow-soft transition hover:opacity-90"
            >
              Abrir no Google Maps
              <ExternalLink className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-3xl shadow-soft"
          >
            <iframe
              title="Localização"
              src={embedUrl}
              className="h-[340px] w-full border-0 md:h-[470px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}