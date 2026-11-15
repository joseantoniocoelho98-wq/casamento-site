'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Gift, Loader2, X } from 'lucide-react';

// Textos da seção: edite aqui
const TITLE = 'Lista de Presentes';
const SUBTITLE = 'Escolha um presente e pague por Pix ou cartão, com opção de parcelamento.';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type GiftItem = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  price: number;
  gifted: boolean;
};

const formatPrice = (value: number) =>
  Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function GiftListSection() {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState<GiftItem | null>(null);
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    supabase
      .from('gifts')
      .select('id, name, description, image, price, gifted')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setGifts((data as GiftItem[]) ?? []);
        setLoading(false);
      });

    const status = new URLSearchParams(window.location.search).get('presente');
    if (status === 'ok') setNotice('Pagamento recebido! Muito obrigado pelo carinho. 💛');
    if (status === 'pendente') setNotice('Seu pagamento está em análise. Assim que for aprovado, ele será registrado.');
  }, []);

  const startPayment = async () => {
    if (!chosen) return;
    if (name.trim().length < 2) {
      setError('Digite seu nome.');
      return;
    }
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/gifts/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId: chosen.id, buyerName: name }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Não foi possível iniciar o pagamento.');
        setSending(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Não foi possível iniciar o pagamento.');
      setSending(false);
    }
  };

  return (
    <section id="presentes" className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-5xl text-black md:text-6xl">{TITLE}</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-xl text-black">{SUBTITLE}</p>
          {notice && <p className="mt-6 font-body text-xl text-black">{notice}</p>}
        </motion.div>

        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-black" />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gifts.map((gift) => (
                <div
                  key={gift.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-black/20 bg-white"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-black/5">
                    {gift.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={gift.image} alt={gift.name} className="h-full w-full object-cover" />
                    ) : (
                      <Gift className="h-12 w-12 text-black" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-3xl text-black">{gift.name}</h3>
                    {gift.description && (
                      <p className="mt-2 font-body text-lg text-black">{gift.description}</p>
                    )}
                    <p className="mt-4 font-numeros text-2xl text-black">{formatPrice(gift.price)}</p>

                    <button
                      disabled={gift.gifted}
                      onClick={() => {
                        setChosen(gift);
                        setError('');
                      }}
                      className="mt-5 rounded-full border border-black px-6 py-3 font-body text-xl text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
                    >
                      {gift.gifted ? 'Já presenteado' : 'Presentear'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {chosen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => !sending && setChosen(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-black"
              onClick={() => setChosen(null)}
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="font-display text-3xl text-black">{chosen.name}</h3>
            <p className="mt-1 font-numeros text-2xl text-black">{formatPrice(chosen.price)}</p>

            <label className="mt-6 block font-body text-xl text-black">Seu nome</label>
            <input
              type="text"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como quer ser identificado"
              className="mt-2 w-full rounded-xl border border-black/30 px-4 py-2 font-body text-xl text-black outline-none focus:border-black"
            />

            {error && <p className="mt-3 font-body text-lg text-black">{error}</p>}

            <button
              onClick={startPayment}
              disabled={sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black px-6 py-3 font-body text-xl text-black transition hover:bg-black hover:text-white disabled:opacity-50"
            >
              {sending && <Loader2 className="h-5 w-5 animate-spin" />}
              Ir para o pagamento
            </button>
            <p className="mt-3 text-center font-body text-base text-black">
              Pagamento seguro pelo Mercado Pago, com Pix ou cartão parcelado.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}