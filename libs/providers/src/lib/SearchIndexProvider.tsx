'use client';
import type { SearchIndexContextProps } from '@digital-www-pwa/types';
import lunr from 'lunr';
import { useState, useEffect, createContext, useContext } from 'react';

import {
  useEvents,
  useArts,
  useCamps,
  useRadios,
  useVehicles,
} from './ProcessedDataProvider';

const INITIAL_DATA: SearchIndexContextProps = {
  events: lunr(function () {}), // eslint-disable-line @typescript-eslint/no-empty-function
  art: lunr(function () {}), // eslint-disable-line @typescript-eslint/no-empty-function
  camps: lunr(function () {}), // eslint-disable-line @typescript-eslint/no-empty-function
  radio: lunr(function () {}), // eslint-disable-line @typescript-eslint/no-empty-function
  vehicles: lunr(function () {}), // eslint-disable-line @typescript-eslint/no-empty-function
};

export const SearchIndexContext =
  createContext<SearchIndexContextProps>(INITIAL_DATA);

export function useEventsIndex(): lunr.Index {
  return useContext(SearchIndexContext).events;
}

export function useArtIndex(): lunr.Index {
  return useContext(SearchIndexContext).art;
}

export function useCampsIndex(): lunr.Index {
  return useContext(SearchIndexContext).camps;
}

export function useRadioIndex(): lunr.Index {
  return useContext(SearchIndexContext).radio;
}

export function useVehiclesIndex(): lunr.Index {
  return useContext(SearchIndexContext).vehicles;
}

export function SearchIndexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const events = useEvents();
  const arts = useArts();
  const camps = useCamps();
  const radios = useRadios();
  const vehicles = useVehicles();
  const [searchIndex, setSearchIndex] = useState(INITIAL_DATA);

  useEffect(() => {
    if (events === null) {
      return;
    }
    setSearchIndex((previous) => ({
      ...previous,
      events: lunr(function () {
        this.ref('event_id');
        this.field('title');
        this.field('event_description');

        this.metadataWhitelist = ['position'];

        Object.values(events).forEach((event) => {
          this.add(event);
        });
      }),
    }));
  }, [events]);

  useEffect(() => {
    if (arts === null) {
      return;
    }
    setSearchIndex((previous) => ({
      ...previous,
      art: lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('description');
        this.field('artist');

        this.metadataWhitelist = ['position'];

        Object.values(arts).forEach((art) => {
          this.add(art);
        });
      }),
    }));
  }, [arts]);

  useEffect(() => {
    if (camps === null) {
      return;
    }
    setSearchIndex((previous) => ({
      ...previous,
      camps: lunr(function () {
        this.ref('id');
        this.field('name');
        this.field('description');
        this.field('location_name');

        this.metadataWhitelist = ['position'];

        Object.values(camps).forEach((camp) => {
          this.add(camp);
        });
      }),
    }));
  }, [camps]);

  useEffect(() => {
    if (radios === null) {
      return;
    }
    setSearchIndex((previous) => ({
      ...previous,
      radio: lunr(function () {
        this.ref('id');
        this.field('radio_dj_name');
        this.field('radio_description');

        this.metadataWhitelist = ['position'];

        Object.values(radios).forEach((radio) => {
          this.add(radio);
        });
      }),
    }));
  }, [radios]);

  useEffect(() => {
    if (vehicles === null) {
      return;
    }
    setSearchIndex((previous) => ({
      ...previous,
      vehicles: lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('description');

        this.metadataWhitelist = ['position'];

        Object.values(vehicles).forEach((vehicle) => {
          this.add(vehicle);
        });
      }),
    }));
  }, [vehicles]);

  return (
    <SearchIndexContext.Provider value={searchIndex}>
      {children}
    </SearchIndexContext.Provider>
  );
}
