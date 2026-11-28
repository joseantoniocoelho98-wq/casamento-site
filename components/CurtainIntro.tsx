'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Cor do papel do convite
const PAPER_COLOR = '#FAF4E4';
// Cor do texto e do filete (o mesmo dourado dos títulos)
const GOLD = '#C79122';
// Música: coloque o arquivo em public/audio/ com este nome
const MUSIC_SRC = '/audio/musica.mp3';
const MUSIC_VOLUME = 0.6;

// Tempos, em segundos
const COVER_DURATION = 1.5; // a capa girando
const FADE_DELAY = 0.7; // quando o fundo começa a sumir
const FADE_DURATION = 1.3; // o site surgindo suavemente

const TOTAL_MS = Math.max(COVER_DURATION, FADE_DELAY + FADE_DURATION) * 1000 + 300;

// Textura de papel: grão bem leve, gerado sem usar nenhuma imagem
const PAPER_GRAIN = (() => {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
    "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>" +
    "<feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.1  0 0 0 0.12 0'/></filter>" +
    "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

const paperStyle = {
  backgroundColor: PAPER_COLOR,
  backgroundImage: PAPER_GRAIN,
};

export default function CurtainIntro() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Não mostra a capa quando o link já aponta para uma seção (ex.: QR code do álbum),
  // ao voltar do pagamento ou no modo administrador
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.hash || params.has('presente') || params.has('admin')) {
      setVisible(false);
    }
  }, []);

  // Prepara a música enquanto a capa está fechada
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = MUSIC_VOLUME;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Trava a rolagem enquanto a capa está fechada
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Depois que a capa termina de abrir, remove tudo
  useEffect(() => {
    if (!opening) return;
    const timer = setTimeout(() => setVisible(false), TOTAL_MS);
    return () => clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (opening) return;
    setOpening(true);

    // O clique do convidado libera o som no navegador
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setHasMusic(true);
        })
        .catch(() => setHasMusic(false));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="invite-cover"
            className="fixed inset-0 z-[100] cursor-pointer overflow-hidden [perspective:2200px]"
            style={{ pointerEvents: opening ? 'none' : 'auto' }}
            role="button"
            tabIndex={0}
            aria-label="Abrir convite"
            onClick={open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
              }
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Fundo: some aos poucos e deixa o site surgir com fade */}
            <motion.div
              className="absolute inset-0"
              style={paperStyle}
              animate={{ opacity: opening ? 0 : 1 }}
              transition={{ duration: FADE_DURATION, delay: opening ? FADE_DELAY : 0, ease: 'easeInOut' }}
            />

            {/* Capa do convite: fina, gira pela lateral esquerda */}
            <motion.div
              className="absolute inset-0"
              style={{
                ...paperStyle,
                transformOrigin: 'left center',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow: '0 0 50px rgba(0,0,0,0.25)',
              }}
              animate={{ rotateY: opening ? -105 : 0 }}
              transition={{ duration: COVER_DURATION, ease: [0.5, 0, 0.2, 1] }}
            >
              {/* Filete dourado */}
              <div
                className="absolute inset-5 md:inset-10"
                style={{ border: `1px solid ${GOLD}`, opacity: 0.7 }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.png"
                  alt="José e Ianca"
                  className="w-[62vw] max-w-[380px]"
                />
                <p
                  className="mt-8 animate-pulse font-body text-xl tracking-wide"
                  style={{ color: GOLD }}
                >
                  Clique para abrir
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão para ligar ou desligar a música */}
      {hasMusic && !visible && (
        <button
          onClick={toggleMusic}
          aria-label={playing ? 'Desligar música' : 'Ligar música'}
          className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 shadow"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          {playing ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      )}
    </>
  );
}