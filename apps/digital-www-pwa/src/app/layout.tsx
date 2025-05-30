'use client';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { useEffect } from 'react';

import { AppShell, HeadComponent } from '@digital-www-pwa/components';
import { AuthProvider } from '@digital-www-pwa/providers';
import {
  FavoritesProvider,
  FeedProvider,
  GeolocationProvider,
  ProcessedDataProvider,
  SearchIndexProvider,
} from '@digital-www-pwa/providers';
import { theme } from '@digital-www-pwa/utils';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

import '@fontsource/cinzel';
import '@fontsource/cinzel-decorative';

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
      <HeadComponent />
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <FeedProvider>
                <FavoritesProvider>
                  <ProcessedDataProvider>
                    <SearchIndexProvider>
                      <GeolocationProvider>
                        <AppShell>{children}</AppShell>
                      </GeolocationProvider>
                    </SearchIndexProvider>
                  </ProcessedDataProvider>
                </FavoritesProvider>
              </FeedProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
