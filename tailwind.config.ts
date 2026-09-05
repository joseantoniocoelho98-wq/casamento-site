import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEF7',
          100: '#FFFBEB',
          200: '#FEF6D2',
          300: '#FDF0B4',
          400: '#FCEEA8',
          500: '#F7E27A',
          600: '#EAC94D',
          700: '#C9A62F',
          800: '#9C7F22',
          900: '#6B5716',
        },
        butter: {
          50: '#FFFDF3',
          100: '#FFF6D6',
          200: '#FEEBA8',
          300: '#FCDD73',
          400: '#F7C948',
          500: '#F0B429',
          600: '#D9A521',
          700: '#B8860B',
          800: '#8C6508',
          900: '#5C4305',
        },
        lilac: {
          50: '#FAF7FC',
          100: '#F3EDF9',
          200: '#E9DEF3',
          300: '#DFCFEC',
          400: '#D9C9E9',
          500: '#C3A8DB',
          600: '#A67FC4',
          700: '#855FA0',
          800: '#614575',
          900: '#3D2C4A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'cursive'],
        venue: ['var(--font-venue)', 'cursive'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(61, 44, 74, 0.08)',
        softer: '0 4px 20px rgba(61, 44, 74, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;