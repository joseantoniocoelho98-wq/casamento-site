'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Copy, Gift, Loader2, X } from 'lucide-react';
import * as giftModule from '@/lib/giftData';

// Pega os dados do Pix do seu lib/giftData.ts (title, message, pixKey, pixOwner)
const giftInfo = Object.values(giftModule)[0] as {
  title: string;
  message: string;
  pixKey: string;
  pixOwner: string;
};

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
};

const formatPrice = (value: number) =>
  Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function GiftListSection() {
  const [open, setOpen] = useState(false);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState<GiftItem | null>(null);
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    supabase
      .from('gifts')
      .select('id, name, description, image, price')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setGifts((data as GiftItem[]) ?? []);
        setLoading(false);
      });

    // Abre sozinho ao voltar do pagamento ou ao acessar #presentes
    const params = new URLSearchParams(window.location.search);
    const status = params.get('presente');
    if (status === 'ok') setNotice('Pagamento recebido! Muito obrigado pelo carinho. 💛');
    if (status === 'pendente')
      setNotice('Seu pagamento está em análise. Assim que for aprovado, ele será registrado.');
    if (status || window.location.hash === '#presentes') setOpen(true);
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

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(giftInfo.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="presentes" className="section-padding bg-white">
      <div className="section-container">
        {/* Frase antes da lista: deixa claro que presentear não é obrigação */}
         <p className="mx-auto mb-14 max-w-xl text-center font-body text-xl text-black md:mb-12">
          {giftInfo.title}
        </p>

        {/* Título clicável */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mx-auto flex w-full flex-col items-center text-center"
        >
          <span className="flex items-center gap-3">
            <span className="font-display text-5xl text-[#C79122] md:text-6xl">{TITLE}</span>
            <ChevronDown
              className={`h-8 w-8 shrink-0 text-black transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </span>
          {!open && (
            <span className="mt-3 font-body text-xl text-black">Clique para ver os presentes</span>
          )}
        </button>

        {notice && <p className="mt-6 text-center font-body text-xl text-black">{notice}</p>}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <p className="mx-auto mt-6 max-w-xl text-center font-body text-xl text-black">
                {SUBTITLE}
              </p>

              {/* Presentes: 2 por linha no celular, 3 no computador */}
              <div className="mt-10">
                {loading ? (
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-black" />
                  </div>
                ) : gifts.length === 0 ? (
                  <p className="text-center font-body text-xl text-black">
                    Em breve, a lista de presentes estará disponível.
                  </p>
                ) : (
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
                    {gifts.map((gift) => (
                      <div
                        key={gift.id}
                        className="flex flex-col overflow-hidden rounded-2xl border border-black/20 bg-white"
                      >
                        <div className="flex aspect-square items-center justify-center bg-white">
                          {gift.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={gift.image}
                              alt={gift.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Gift className="h-12 w-12 text-black" />
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-3 sm:p-5">
                          <h3 className="font-body text-base leading-snug text-black sm:text-2xl">
                            {gift.name}
                          </h3>
                          {gift.description && (
                            <p className="mt-2 hidden font-body text-lg text-black sm:block">
                              {gift.description}
                            </p>
                          )}
                          <p className="mt-3 font-numeros text-lg text-black sm:mt-4 sm:text-2xl">
                            {formatPrice(gift.price)}
                          </p>

                          <button
                            onClick={() => {
                              setChosen(gift);
                              setError('');
                            }}
                            className="mt-auto rounded-full border border-black px-3 py-2 font-body text-base text-black transition hover:bg-black hover:text-white sm:mt-5 sm:px-6 sm:py-3 sm:text-xl"
                          >
                            Presentear
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pix, ao final da lista */}
              <div className="mx-auto mt-14 max-w-xl border-t border-black pt-10 text-center">
                 <p className="mb-3 font-body text-xl text-black">Se pensou em outro valor</p>
                 <p className="font-body text-xl text-black">{giftInfo.message}</p>

                {!qrError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/images/pix-qr.png"
                    alt="QR Code do Pix"
                    onError={() => setQrError(true)}
                    className="mx-auto mt-6 h-52 w-52"
                  />
                )}

                <p className="mt-6 font-numeros text-2xl text-black">{giftInfo.pixKey}</p>
                <p className="mt-1 font-body text-lg text-black">{giftInfo.pixOwner}</p>

                <button
                  onClick={copyPix}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 font-body text-xl text-black transition hover:bg-black hover:text-white"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? 'Chave copiada!' : 'Copiar chave Pix'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Janela de pagamento */}
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

            <h3 className="pr-8 font-body text-2xl leading-snug text-black">{chosen.name}</h3>
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