'use client';
import type {
  FavoritesStorage,
  ProcessedFavoritesStorage,
  StorageState,
} from '@digital-www-pwa/types';
import { EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import cookies from 'js-cookie';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

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

  const [checkingFavoritesStorage, setCheckingFavoritesStorage] =
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
      const token = cookies.get('token');
      const body = JSON.stringify({ favorites });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/entities/favorites`,
        {
          method: 'POST',
          body,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': `${body.length}`,
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const data = await res.json();
        processFavorites(data);
      }
    }
    fetchFavoritesCreate();
  }

  function readFavorites() {
    async function fetchFavoritesRead() {
      const token = cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/entities/favorites`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const data = await res.json();
        processFavorites(data);
        setCheckingFavoritesStorage(false);
        return;
      }
      setFavoritesStorage(null);
    }
    fetchFavoritesRead();
  }

  function updateFavorites(favorites: string) {
    async function fetchFavoritesUpdate() {
      const token = cookies.get('token');
      const body = JSON.stringify({ favorites });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/entities/favorites`,
        {
          method: 'PUT',
          body,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': `${body.length}`,
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const data = await res.json();
        processFavorites(data);
      }
    }
    fetchFavoritesUpdate();
  }

  const upsertFavorites = useCallback(
    (favorites: string) => {
      if (authContext.isAuthenticated) {
        if (favoritesStorage === null) {
          return createFavorites(favorites);
        }
        updateFavorites(favorites);
      }
    },
    [authContext.isAuthenticated]
  );

  const deleteFavorites = useCallback(() => {
    async function fetchFavoritesDelete() {
      const token = cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/entities/favorites`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        setFavoritesStorage(null);
      }
    }
    if (authContext.isAuthenticated) {
      fetchFavoritesDelete();
    }
  }, [authContext.isAuthenticated]);

  const favoritesStorageState = useMemo(
    () => ({
      favorites: {
        checkingFavoritesStorage,
        favoritesStorage,
        upsertFavorites,
        deleteFavorites,
      },
    }),
    [
      checkingFavoritesStorage,
      favoritesStorage,
      upsertFavorites,
      deleteFavorites,
    ]
  );

  useEffect(() => {
    if (authContext.isAuthenticated && !checkingFavoritesStorage) {
      readFavorites();
    }
  }, [authContext.isAuthenticated, checkingFavoritesStorage]);

  return (
    <StorageContext.Provider value={favoritesStorageState}>
      {children}
    </StorageContext.Provider>
  );
};
