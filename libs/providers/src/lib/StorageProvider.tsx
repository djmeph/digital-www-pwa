'use client';
import type {
  FavoritesStorage,
  ProcessedFavoritesStorage,
  StorageState,
} from '@digital-www-pwa/types';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import dayjs from 'dayjs';
import { EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useAuthContext } from './AuthProvider';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

const INITIAL_DATA: StorageState = {
  favorites: {
    checkingFavoritesStorage: true,
    favoritesStorage: null,
    upsertFavorites: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    deleteFavorites: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  },
};

export const StorageContext = createContext<StorageState>(INITIAL_DATA);

export const useStorageContext = () => useContext(StorageContext);

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const authContext = useAuthContext();

  const [checkingFavoritesStorage, setCheckinFavoritesStorage] =
    useState<boolean>(true);
  const [favoritesStorage, setFavoritesStorage] =
    useState<ProcessedFavoritesStorage | null>(null);

  function processFavorites(favorites: FavoritesStorage) {
    setFavoritesStorage({
      id: favorites.id,
      favorites: favorites.favorites,
      version: dayjs.tz(favorites.version, EVENT_TIMEZONE),
    });
  }

  function createFavorites(favorites: string) {
    async function fetchFavoritesCreate() {
      const res = await fetch('/api/entities/favorites', {
        method: 'POST',
        body: JSON.stringify({
          favorites,
        }),
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        processFavorites(data);
      }
    }
    fetchFavoritesCreate();
  }

  function readFavorites() {
    async function fetchFavoritesRead() {
      setCheckinFavoritesStorage(true);
      const res = await fetch('/api/entities/favorites', {
        method: 'GET',
        cache: 'no-store',
      });
      setCheckinFavoritesStorage(false);
      if (res.ok) {
        const data = await res.json();
        processFavorites(data);
        return;
      }
      setFavoritesStorage(null);
    }
    fetchFavoritesRead();
  }

  function updateFavorites(favorites: string) {
    async function fetchFavoritesUpdate() {
      const res = await fetch('/api/entities/favorites', {
        method: 'PUT',
        body: JSON.stringify({
          favorites,
        }),
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        processFavorites(data);
      }
    }
    fetchFavoritesUpdate();
  }

  const upsertFavorites = useCallback((favorites: string) => {
    if (authContext.isAuthenticated) {
      if (favoritesStorage === null) {
        return createFavorites(favorites);
      }
      updateFavorites(favorites);
    }
  }, []);

  const deleteFavorites = useCallback(() => {
    async function fetchFavoritesDelete() {
      const res = await fetch('/api/entities/favorites', {
        method: 'DELETE',
        cache: 'no-store',
      });
      if (res.ok) {
        setFavoritesStorage(null);
      }
    }
    if (authContext.isAuthenticated) {
      fetchFavoritesDelete();
    }
  }, []);

  const favoritesStorageState = useMemo(
    () => ({
      favorites: {
        checkingFavoritesStorage,
        favoritesStorage,
        readFavorites,
        upsertFavorites,
        deleteFavorites,
      },
    }),
    [
      checkingFavoritesStorage,
      favoritesStorage,
      readFavorites,
      upsertFavorites,
      deleteFavorites,
    ]
  );

  useEffect(() => {
    if (authContext.isAuthenticated) {
      readFavorites();
    }
  }, [authContext.isAuthenticated]);

  return (
    <StorageContext.Provider value={favoritesStorageState}>
      {children}
    </StorageContext.Provider>
  );
};
