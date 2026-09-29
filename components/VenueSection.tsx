'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { venueInfo } from '@/lib/venueData';
import { MixedFontText } from '@/lib/mixedFontText';

export default function VenueSection() {
  const { title, date, ceremonyTime, receptionTime, address } = venueInfo;
  const encodedAddress = encodeURIComponent(address);
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section id="local" className="section-padding">
      <div className="section-container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-lg uppercase tracking-widest text-butter-700">
            Cerimônia e Recepção
          </span>
          <h2 className="text-6xl md:text-7xl text-butter-700 mt-3 mb-8">
            {title}
          </h2>

          <div className="space-y-4 text-xl text-butter-700">
            <div className="flex items-center gap-3">
              <Calendar size={24} className="text-butter-600 shrink-0" />
              <span className="text-2xl">
                <MixedFontText text={date} />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-butter-600 shrink-0" />
              <span className="text-2xl">
                <MixedFontText text={`Cerimônia: ${ceremonyTime}`} />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-butter-600 shrink-0" />
              <span className="text-2xl">
                <MixedFontText text={`Recepção: ${receptionTime}`} />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-butter-600 shrink-0" />
              <span className="text-2xl">
                <MixedFontText text={address} />
              </span>
            </div>
          </div>

          <Link
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8