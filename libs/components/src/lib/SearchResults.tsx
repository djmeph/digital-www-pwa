'use client';
import {
  useEvents,
  useArts,
  useCamps,
  useRadios,
  useVehicles,
} from '@digital-www-pwa/providers';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import lunr from 'lunr';
import Link from 'next/link';
import { useMemo } from 'react';

import { ArtSearchResult } from './ArtSearchResult';
import { CampSearchResult } from './CampSearchResult';
import { EventSearchResult } from './EventSearchResult';
import { RadioSearchResult } from './RadioSearchResult';
import { VehicleSearchResult } from './VehicleSearchResult';

interface UnifiedResult {
  node: React.ReactNode;
  result: lunr.Index.Result;
  href: string;
}

export function SearchResults({
  eventResults,
  artResults,
  campResults,
  radioResults,
  vehicleResults,
  onClick,
}: {
  eventResults: lunr.Index.Result[];
  artResults: lunr.Index.Result[];
  campResults: lunr.Index.Result[];
  radioResults: lunr.Index.Result[];
  vehicleResults: lunr.Index.Result[];
  onClick: (e: any) => void;
}) {
  const events = useEvents();
  const arts = useArts();
  const camps = useCamps();
  const radios = useRadios();
  const vehicles = useVehicles();

  const unifiedResults = useMemo(() => {
    if (
      events === null ||
      arts === null ||
      camps === null ||
      radios === null ||
      vehicles === null
    ) {
      return [];
    }
    return [
      ...eventResults.map((result: lunr.Index.Result) => ({
        result,
        node: <EventSearchResult result={result} event={events[result.ref]} />,
        href: `/events/${events[result.ref].event_times[0].event_time_id}`,
      })),
      ...artResults.map((result: lunr.Index.Result) => ({
        result,
        node: <ArtSearchResult result={result} art={arts[result.ref]} />,
        href: `/art/${result.ref}`,
      })),
      ...campResults.map((result: lunr.Index.Result) => ({
        result,
        node: <CampSearchResult result={result} camp={camps[result.ref]} />,
        href: `/camps/${result.ref}`,
      })),
      ...radioResults.map((result: lunr.Index.Result) => ({
        result,
        node: <RadioSearchResult result={result} radio={radios[result.ref]} />,
        href: `/radio/${result.ref}`,
      })),
      ...vehicleResults.map((result: lunr.Index.Result) => ({
        result,
        node: (
          <VehicleSearchResult result={result} vehicle={vehicles[result.ref]} />
        ),
        href: `/vehicles/${result.ref}`,
      })),
    ].toSorted((a, b) => b.result.score - a.result.score);
  }, [
    events,
    eventResults,
    arts,
    artResults,
    camps,
    campResults,
    radios,
    radioResults,
    vehicles,
    vehicleResults,
  ]);

  return (
    <MenuList>
      {unifiedResults.map((result: UnifiedResult) => {
        return (
          <MenuItem
            key={result.href}
            component={Link}
            href={result.href}
            onClick={onClick}
          >
            {result.node}
          </MenuItem>
        );
      })}
    </MenuList>
  );
}
