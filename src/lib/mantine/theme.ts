import { createTheme } from '@mantine/core';
import { Merriweather, Montserrat } from 'next/font/google';

export const montserrat = Montserrat({ subsets: ['latin'] });
export const merriweather = Merriweather({ weight: '700', subsets: ['latin'] });

export default createTheme({
  fontFamily: montserrat.style.fontFamily,
  headings: {
    fontFamily: merriweather.style.fontFamily,
  },
  colors: {
    'deep-sapphire': [
      '#CEECFF',
      '#A8DFFF',
      '#6DCEFF',
      '#28B0FF',
      '#0086FF',
      '#005CFF',
      '#0042FF',
      '#0036E3',
      '#0035B1',
      '#012169',
    ],
  },
  primaryColor: 'deep-sapphire',
  primaryShade: 9,
});
