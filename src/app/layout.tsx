import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

import './globals.css';
import '@mantine/core/styles.css';

import theme from '@/lib/mantine/theme';

export const metadata: Metadata = {
  title: 'Fyscus: Finance Management App',
  description:
    'Personal finance management application where you can manage expenses, incomes, budgets, and investments.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
