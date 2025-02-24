import type { ArtItem } from './art';
import { CampItem } from './camp';
import type { ParsedEventTime, ProcessedEventItem } from './event';
import { LocationItem } from './location';
import { ProcessedRadioItem } from './radio';
import { VehicleItem } from './vehicle';

export interface ProcessedDataContextProps {
  arts: Record<string, ArtItem>;
  events: Record<string, ProcessedEventItem>;
  eventTimes: Record<string, ParsedEventTime>;
  camps: Record<string, CampItem>;
  radios: Record<string, ProcessedRadioItem>;
  vehicles: Record<string, VehicleItem>;
  locations: Record<string, LocationItem>;
}
