import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        black: '#1a1a1a',
        pink: {
          DEFAULT: '#ff3366',
          dark: '#cc2952',
        },
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        headline: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
