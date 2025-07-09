import type { ArtItem } from './art';
import type { CampItem } from './camp';
import type { EventItem } from './event';
import { LocationItem } from './location';
import type { RadioItem } from './radio';
import { VehicleItem } from './vehicle';

export interface Feed {
  events: EventItem[];
  art: ArtItem[];
  camps: CampItem[];
  radios: RadioItem[];
  vehicles: VehicleItem[];
  locations: LocationItem[];
}
