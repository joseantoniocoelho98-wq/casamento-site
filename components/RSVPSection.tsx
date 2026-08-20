'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, PartyPopper } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '@/lib/supabaseClient';

const EMAILJS_SERVICE_ID = 'service_sri61lu';
const EMAILJS_TEMPLATE_ID = 'template_k9ypir8';
const EMAILJS_PUBLIC_KEY = 'R2urcDeUIKREyQo80';

const NOTIFY_EMAILS = ['joseantoniocoelho98@gmail.com', 'iancamaciel456@icloud.com'];

interface Guest {
  id: string;
  full_name: string;
  confirmed: boolean;
}

export default function RSVPSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Guest[]>([]);
  const [selected, setSelected] = useState<Guest | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedThisSession, setConfirmedThisSession] = useState<string[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from('guests')
        .select('id, full_name, confirmed')
        .ilike('full_name', `%${query.trim()}%`)
        .limit(6);

      setResults(data ?? []);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  async function handleConfirm() {
    if (!selected) return;
    setConfirming(true);
    setError(null);

    const { error: updateError } = await supabase
      .from('guests')
      .update({ confirmed: true, confirmed_at: new Date().toISOString() })
      .eq('id', selected.id);

    if (updateError) {
      setError('Não foi possível confirmar. Tente novamente.');
      setConfirming(false);
      return;
    }

    try {
      await Promise.all(
        NOTIFY_EMAILS.map((to_email) =>
          emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            { to_email, guest_name: selected.full_name },
            EMAILJS_PUBLIC_KEY
          )
        )
      );
    } catch (e) {
      console.error('Erro ao enviar e-mail:', e);
    }

    setConfirmedThisSession((prev) => [...prev, selected.full_name]);
    setSelected(null);
    setQuery('');
    setResults([]);
    setConfirming(false);
  }

  return (
    <section id="rsvp" className="section-padding">
      <div className="section-container flex flex-col items-center text-center gap-8 max-w-lg mx-auto">
        <div>
          <span className="text-lg uppercase tracking-widest text-butter-700">
            Confirme sua presença
          </span>
          <h2 className="text-6xl md:text-7xl text-butter-700 mt-3">RSVP</h2>
          <p className="text-xl text-butter-700 mt-4">
            Vai levar acompanhantes? Digite o nome de cada um, um de cada vez.
          </p>
        </div>

        {confirmedThisSession.length > 0 && (
          <div className="w-full flex flex-col gap-2">
            {confirmedThisSession.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-butter-100 text-butter-700 text-lg"
              >
                <Check size={18} className="text-butter-600 shrink-0" />
                {name}
              </div>
            ))}
          </div>
        )}

        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-butter-500" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            placeholder="Digite o nome e sobrenome"
            className="w-full pl-12 pr-4 py-4 rounded-full border border-butter-300 bg-white text-butter-700 text-lg focus:outline-none focus:ring-2 focus:ring-butter-500"
          />
        </div>

        {results.length > 0 && !selected && (
          <div className="w-full flex flex-col gap-2">
            {results.map((guest) => (
              <button
                key={guest.id}
                onClick={() => setSelected(guest)}
                className="w-full text-left px-6 py-3 rounded-xl bg-white hover:bg-butter-50 border border-butter-200 text-butter-700 text-lg transition-colors"
              >
                {guest.full_name}
                {guest.confirmed && (
                  <span className="ml-2 text-sm text-butter-500">(já confirmado)</span>
                )}
              </button>
            ))}
          </div>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <p className="text-butter-600 text-base">
            Não encontramos esse nome na lista. Confira a grafia ou fale com os noivos.
          </p>
        )}

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col items-center gap-4 bg-white rounded-2xl shadow-soft p-6"
            >
              <p className="text-xl text-butter-700">
                Confirmar presença de <strong>{selected.full_name}</strong>?
              </p>

              {selected.confirmed ? (
                <p className="text-butter-600">Essa presença já foi confirmada anteriormente 🎉</p>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="inline-flex items-center gap-2 bg-butter-600 hover:bg-butter-700 text-white px-8 py-4 rounded-full shadow-soft transition-colors duration-300 text-lg tracking-wide disabled:opacity-60"
                >
                  <Check size={20} />
                  {confirming ? 'Confirmando...' : 'Confirmar presença'}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {confirmedThisSession.length > 0 && !selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-butter-700 text-lg"
          >
            <PartyPopper size={22} className="text-butter-600" />
            Obrigado! Pode digitar mais um nome acima, se precisar.
          </motion.div>
        )}

        {error && <p className="text-red-600 text-base">{error}</p>}
      </div>
    </section>
  );
}