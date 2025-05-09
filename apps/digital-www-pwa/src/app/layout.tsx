'use client';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';

import { AppBar, BackToTopButton } from '@digital-www-pwa/components';
import {
  FavoritesProvider,
  FeedProvider,
  GeolocationProvider,
  ProcessedDataProvider,
  SearchIndexProvider,
} from '@digital-www-pwa/providers';
import { theme } from '@digital-www-pwa/utils';
import { useEffect } from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Lakes of Fire 2025 - Doorways in Time</title>
      </head>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <FeedProvider>
              <FavoritesProvider>
                <ProcessedDataProvider>
                  <SearchIndexProvider>
                    <GeolocationProvider>
                      <AppBar />
                      <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
                        {children}
                        <BackToTopButton />
                      </Container>
                    </GeolocationProvider>
                  </SearchIndexProvider>
                </ProcessedDataProvider>
              </FavoritesProvider>
            </FeedProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
