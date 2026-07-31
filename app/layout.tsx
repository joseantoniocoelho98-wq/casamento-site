import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

// Fonte de títulos e nomes — arquivo local, baixado manualmente
// (não está disponível no Google Fonts). Uso pessoal.
const verandah = localFont({
  src: '../public/fonts/VerandahReverie.otf',
  variable: '--font-display',
  display: 'swap',
});

// Fonte sans-serif para texto corrido — legível e limpa
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
    <html lang="pt-BR" className={`${verandah.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}