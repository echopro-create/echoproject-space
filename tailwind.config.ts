// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Темный текст #111
        'primary-text': '#111111',
        // Вторичный #555
        'secondary-text': '#555555',
        // Акцент #0A84FF (Apple Blue)
        'accent': '#0A84FF',
        // Границы #E5E7EB
        'border-light': '#E5E7EB',
      },
      fontFamily: {
        // Типографика: Inter
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Базовый размер 16px (1rem)
        base: '1rem', // 16px
        // h1 40-48
        '4xl': '2.5rem', // 40px
        '5xl': '3rem', // 48px
        // h2 28-32
        '2xl': '1.75rem', // 28px
        '3xl': '2rem', // 32px
      },
      lineHeight: {
        // Базовый масштаб 16/24
        base: '1.5rem', // 24px
      },
      maxWidth: {
        // Сетка: max-width 1200px
        'container': '1200px',
      },
      spacing: {
        // Отступы контейнера
        'container-x': '1rem', // 16px
        'container-lg-x': '1.5rem', // 24px
      }
    },
  },
  plugins: [],
};

export default config;