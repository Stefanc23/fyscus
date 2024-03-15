import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#e9f7ff',
          '100': '#ceecff',
          '200': '#a8dfff',
          '300': '#6dceff',
          '400': '#28b0ff',
          '500': '#0086ff',
          '600': '#005cff',
          '700': '#0042ff',
          '800': '#0036e3',
          '900': '#0035b1',
          '950': '#012169',
        },
      },
    },
  },
  plugins: [],
};
export default config;
