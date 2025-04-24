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
  return (
    <html lang="en">
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
                      <Container sx={{ paddingTop: 2, paddingBottom: 2}}>
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
