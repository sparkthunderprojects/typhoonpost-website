import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fog: '#EDF2F3',
        mist: '#D6E2E6',
        isobar: '#9FB8C2',
        sea: { DEFAULT: '#0A1C26', 2: '#112B38', 3: '#1B3F50' },
        squall: { DEFAULT: '#0F6CBD', dark: '#0B4F8A', soft: '#DCEBF8' },
        signal: '#FFB000',
        slate: { ink: '#2B4452', muted: '#4B6674' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        window: '0 2px 4px rgb(10 28 38 / 0.06), 0 30px 60px -20px rgb(10 28 38 / 0.35)',
        lift: '0 1px 2px rgb(10 28 38 / 0.08), 0 12px 28px -12px rgb(10 28 38 / 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
