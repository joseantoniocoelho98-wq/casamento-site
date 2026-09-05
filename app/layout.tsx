import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const verandah = localFont({
  src: '../public/fonts/VerandahReverie.otf',
  variable: '--font-display',
  display: 'swap',
});

// Fonte exclusiva pro nome dos locais (Cerimônia/Recepção)
const venueFont = localFont({
  src: '../public/fonts/VenueName.otf',
  variable: '--font-venue',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      className={`${verandah.variable} ${venueFont.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}