export interface FavoritesContextProps {
  eventTimeIds: Set<number>;
  toggleEventTime: (eventTimeId: number) => void;
}
