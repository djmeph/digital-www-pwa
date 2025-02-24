'use client';
import type { FavoritesContextProps } from '@digital-www-pwa/types';
import { useState, useEffect, createContext, useContext } from 'react';

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
      console.error(err);
      return new Set();
    }
  });
  const [dataState, setDataState] =
    useState<FavoritesContextProps>(INITIAL_DATA);

  function toggleEventTime(eventTimeId: number) {
    setEventTimeIds((oldIds) => {
      const newIds = new Set([...oldIds]);
      if (oldIds.has(eventTimeId)) {
        newIds.delete(eventTimeId);
        return newIds;
      }
      newIds.add(eventTimeId);
      return newIds;
    });
  }

  useEffect(() => {
    setDataState({
      eventTimeIds,
      toggleEventTime,
    });
    localStorage.setItem(
      'favoriteEventTimeIds',
      JSON.stringify([...eventTimeIds])
    );
  }, [eventTimeIds]);

  return (
    <FavoritesContext.Provider value={dataState}>
      {children}
    </FavoritesContext.Provider>
  );
}
