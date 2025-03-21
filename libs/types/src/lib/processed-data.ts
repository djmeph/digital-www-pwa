import type { ArtItem } from './art';
import { CampItem } from './camp';
import type { ParsedEventTime, ProcessedEventItem } from './event';
import { LocationItem } from './location';
import { ProcessedRadioItem } from './radio';
import { VehicleItem } from './vehicle';

export interface ProcessedDataContextProps {
  arts: Record<string, ArtItem> | null;
  events: Record<string, ProcessedEventItem> | null;
  eventTimes: Record<string, ParsedEventTime> | null;
  camps: Record<string, CampItem> | null;
  radios: Record<string, ProcessedRadioItem> | null;
  vehicles: Record<string, VehicleItem> | null;
  locations: Record<string, LocationItem> | null;
}
