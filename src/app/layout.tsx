import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

import '@mantine/core/styles.css';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body suppressHydrationWarning={true}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
