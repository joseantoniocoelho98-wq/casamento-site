import type { Metadata } from 'next';
import { Cinzel } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const titleFont = localFont({
  src: '../public/fonts/Titulo.ttf',
  variable: '--font-titulo',
  display: 'swap',
});

const textFont = localFont({
  src: '../public/fonts/Texto.otf',
  variable: '--font-texto',
  display: 'swap',
});

// Fonte exclusiva para NÚMEROS — Cinzel, do Google
const numberFont = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-numeros',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'José & Ianca | Nosso Casamento',
  description:
    'Confira todos os detalhes do nosso casamento: cerimônia, recepção, lista de presentes e confirme sua presença.',
  openGraph: {
    title: 'José & Ianca | Nosso Casamento',
    description:
      'Confira todos os detalhes do nosso casamento e confirme sua presença.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${titleFont.variable} ${textFont.variable} ${numberFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}