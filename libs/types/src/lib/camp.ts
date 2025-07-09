import type { LocationItem } from './location';

export interface CampItem {
  id: number;
  name: string;
  description: string | null;
  location_name: string;
  location_id: number;
  event_count: number;
  hosted_event_count: number;
}
