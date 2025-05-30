import * as lunr from 'lunr';

export interface SearchIndexContextProps {
  events: lunr.Index;
  art: lunr.Index;
  camps: lunr.Index;
  radio: lunr.Index;
  vehicles: lunr.Index;
}

export interface LunrPosition {
  0: number; // match start
  1: number; // match length
}
