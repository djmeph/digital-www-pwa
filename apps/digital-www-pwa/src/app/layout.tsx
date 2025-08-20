'use client';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { useEffect } from 'react';

import { AppShell, HeadComponent } from '@digital-www-pwa/components';
import {
  FavoritesProvider,
  FeedProvider,
  GeolocationProvider,
  ProcessedDataProvider,
  SearchIndexProvider,
  AuthProvider,
  StorageProvider,
} from '@digital-www-pwa/providers';
import { theme } from '@digital-www-pwa/utils';

import '@fontsource/quattrocento';
import '@fontsource/cinzel';
import '@fontsource/cinzel-decorative';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (process.env['NEXT_PUBLIC_SERVICE_WORKERS_DISABLED'] === 'true') {
      return;
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <HeadComponent />
        <body style={{ fontFamily: theme.typography.fontFamily }}>
          <AppRouterCacheProvider>
            <CssBaseline />
            <AuthProvider>
              <FeedProvider>
                <StorageProvider>
                  <FavoritesProvider>
                    <ProcessedDataProvider>
                      <SearchIndexProvider>
                        <GeolocationProvider>
                          <AppShell>{children}</AppShell>
                        </GeolocationProvider>
                      </SearchIndexProvider>
                    </ProcessedDataProvider>
                  </FavoritesProvider>
                </StorageProvider>
              </FeedProvider>
            </AuthProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
