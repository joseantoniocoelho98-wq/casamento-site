'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Camera, Loader2, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const SITE_URL = 'https://casamento-site-bay.vercel.app';
const BUCKET = 'album';

interface AlbumFile {
  name: string;
  url: string;
}

export default function AlbumSection() {
  const [files, setFiles] = useState<AlbumFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<AlbumFile | null>(null);

  const loadFiles = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list('', { sortBy: { column: 'created_at', order: 'desc' } });

    if (error || !data) {
      console.error('Erro ao listar arquivos:', error);
      return;
    }

    const withUrls = data
      .filter((f) => f.name !== '.emptyFolderPlaceholder')
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      }));

    setFiles(withUrls);
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;

    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);

    if (error) {
      console.error('Erro ao enviar:', error);
      setError('Não foi possível enviar. Tente novamente.');
    } else {
      await loadFiles();
    }

    setUploading(false);
    e.target.value = '';
  }

  return (
    <section id="album" className="section-padding">
      <div className="section-container flex flex-col items-center text-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-lg uppercase tracking-widest text-butter-700">
            Registre o amor
          </span>
          <h2 className="text-6xl md:text-7xl text-butter-700 mt-3">
            Álbum Compartilhado
          </h2>
          <p className="text-xl text-butter-700 mt-4 max-w-xl mx-auto">
            Escaneie o QR Code ou toque no botão abaixo para enviar suas fotos e vídeos do nosso grande dia!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-soft"
        >
          <QRCodeSVG value={`${SITE_URL}/#album`} size={180} />
        </motion.div>

        <label className="cursor-pointer inline-flex items-center gap-2 bg-butter-600 hover:bg-butter-700 text-white px-8 py-4 rounded-full shadow-soft transition-colors duration-300 text-lg tracking-wide">
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Enviando...
            </>
          ) : (
            <>
              <Camera size={20} />
              Enviar foto ou vídeo
            </>
          )}
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>

        {error && <p className="text-red-600 text-base">{error}</p>}

        {files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
            {files.map((file) => {
              const isVideo = file.name.match(/\.(mp4|mov|webm)$/i);
              return (
                <button
                  key={file.name}
                  onClick={() => setSelected(file)}
                  className="aspect-square rounded-xl overflow-hidden shadow-softer bg-butter-100 cursor-pointer"
                >
                  {isVideo ? (
                    <video src={file.url} className="w-full h-full object-cover pointer-events-none" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={file.url}
                      alt="Foto enviada por um convidado"
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Fechar"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[85vh]"
            >
              {selected.name.match(/\.(mp4|mov|webm)$/i) ? (
                <video
                  src={selected.url}
                  className="max-w-full max-h-[85vh] rounded-lg"
                  controls
                  autoPlay
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.url}
                  alt="Foto ampliada"
                  className="max-w-full max-h-[85vh] rounded-lg object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}