import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

// Fonte serifada para títulos — dá o tom elegante/editorial
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
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
    images: ['/og-image.jpg'], // será substituída na etapa de conteúdo/fotos
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
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
