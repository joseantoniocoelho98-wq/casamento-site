/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite imagens externas (ex: fotos hospedadas fora do projeto)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
