'use client';
import type { FavoritesContextProps } from '@digital-www-pwa/types';
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useStorageContext } from './StorageProvider';
import { useAuthContext } from './AuthProvider';

const INITIAL_DATA: FavoritesContextProps = {
  eventTimeIds: new Set(),
  toggleEventTime: (_eventTimeId: number) => {
    //
  },
};

export const FavoritesContext =
  createContext<FavoritesContextProps>(INITIAL_DATA);

export function useFavoriteEventTimeIds(): Set<number> {
  return useContext(FavoritesContext).eventTimeIds;
}

export function useToggleFavoriteEventTime(): (eventTimeId: number) => void {
  return useContext(FavoritesContext).toggleEventTime;
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const authContext = useAuthContext();
  const storageContext = useStorageContext();

  const [eventTimeIds, setEventTimeIds] = useState<Set<number>>(() => {
    try {
      if (typeof localStorage === 'undefined') {
        return new Set();
      }
      const storedIds = JSON.parse(
        localStorage.getItem('favoriteEventTimeIds') || '[]'
      ) as Set<number>;
      return new Set(storedIds);
    } catch (err) {
      return new Set();
    }
  });

  const toggleEventTime = useCallback((eventTimeId: number) => {
    setEventTimeIds((oldIds) => {
      const newIds = new Set([...oldIds]);
      if (oldIds.has(eventTimeId)) {
        newIds.delete(eventTimeId);
        return newIds;
      }
      newIds.add(eventTimeId);
      return newIds;
    });
  }, []);

  const dataState = useMemo(
    () => ({
      eventTimeIds,
      toggleEventTime,
    }),
    [eventTimeIds, toggleEventTime]
  );

  useEffect(() => {
    const jsonStr = JSON.stringify([...eventTimeIds]);
    localStorage.setItem('favoriteEventTimeIds', jsonStr);
  }, [eventTimeIds]);

  useEffect(() => {
    if (storageContext.favorites.favoritesStorage?.favorites) {
      const eventTimeIds = JSON.parse(
        storageContext.favorites.favoritesStorage.favorites
      ) as Set<number>;
      setEventTimeIds(eventTimeIds);
    }
  }, [storageContext.favorites.favoritesStorage]);

  useEffect(() => {
    const jsonStr = JSON.stringify([...eventTimeIds]);
    if (storageContext.favorites.favoritesStorage?.favorites !== jsonStr) {
      storageContext.favorites.upsertFavorites(jsonStr);
    }
  }, [eventTimeIds, authContext.isAuthenticated]);

  return (
    <FavoritesContext.Provider value={dataState}>
      {children}
    </FavoritesContext.Provider>
  );
}
