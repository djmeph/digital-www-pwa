import { Dayjs } from 'dayjs';

export interface FavoritesContextProps {
  eventTimeIds: Set<number>;
  toggleEventTime: (eventTimeId: number) => void;
}

export type FavoritesStorage = {
  id: number;
  favorites: string;
  version: string;
};

export interface ProcessedFavoritesStorage {
  id: number;
  favorites: string;
  version: Dayjs;
}

export interface FavoritesStorageState {
  checkingFavoritesStorage: boolean;
  favoritesStorage: ProcessedFavoritesStorage | null;
  upsertFavorites: (favorites: string) => void;
  deleteFavorites: () => void;
}

export interface StorageState {
  favorites: FavoritesStorageState;
}
