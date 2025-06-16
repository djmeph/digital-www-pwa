'use client';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router';

import { AppShell, HeadComponent } from '@digital-www-pwa/components';
import {
  HomePage,
  EventsPage,
  ArtPage,
  ArtItemPage,
  CampsPage,
  CampsItemPage,
  HappeningNowPage,
  MapPage,
  RadioPage,
  RadioItemPage,
  ShiftsPage,
  ShiftPage,
  VehiclesPage,
  VehiclesItemPage,
  EventsItemPage,
  FavoritesPage,
} from '@digital-www-pwa/pages';
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

export default function RootLayout() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  const RouterComponent =
    typeof document === 'undefined' ? MemoryRouter : BrowserRouter;
  const RoutesComponent = typeof document === 'undefined' ? () => null : Routes;

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <HeadComponent />
        <body style={{ fontFamily: theme.typography.fontFamily }}>
          <RouterComponent>
            <CssBaseline />
            <AuthProvider>
              <FeedProvider>
                <StorageProvider>
                  <FavoritesProvider>
                    <ProcessedDataProvider>
                      <SearchIndexProvider>
                        <GeolocationProvider>
                          <AppShell>
                            <RoutesComponent>
                              <Route path="/events" element={<EventsPage />} />
                              <Route
                                path="/events/:id"
                                element={<EventsItemPage />}
                              />
                              <Route
                                path="/favorites"
                                element={<FavoritesPage />}
                              />
                              <Route path="/art" element={<ArtPage />} />
                              <Route
                                path="/art/:id"
                                element={<ArtItemPage />}
                              />
                              <Route path="/camps" element={<CampsPage />} />
                              <Route
                                path="/camps/:id"
                                element={<CampsItemPage />}
                              />
                              <Route path="/radio" element={<RadioPage />} />
                              <Route
                                path="/radio/:id"
                                element={<RadioItemPage />}
                              />
                              <Route
                                path="/vehicles"
                                element={<VehiclesPage />}
                              />
                              <Route
                                path="/vehicles/:id"
                                element={<VehiclesItemPage />}
                              />
                              <Route
                                path="/volunteer-shifts"
                                element={<ShiftsPage />}
                              />
                              <Route
                                path="/shift/:id"
                                element={<ShiftPage />}
                              />
                              <Route path="/map" element={<MapPage />} />
                              <Route
                                path="/now"
                                element={<HappeningNowPage />}
                              />
                              <Route index element={<HomePage />} />
                            </RoutesComponent>
                          </AppShell>
                        </GeolocationProvider>
                      </SearchIndexProvider>
                    </ProcessedDataProvider>
                  </FavoritesProvider>
                </StorageProvider>
              </FeedProvider>
            </AuthProvider>
          </RouterComponent>
        </body>
      </html>
    </ThemeProvider>
  );
}
