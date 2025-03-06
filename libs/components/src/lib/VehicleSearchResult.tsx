'use client';
import lunr from 'lunr';
import type {
  VehicleItem,
  Highlight,
  LunrPosition,
} from '@digital-www-pwa/types';
import { useMemo } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import DriveEtaIcon from '@mui/icons-material/DriveEta';

import { HighlightedText } from './HighlightedText';

export function VehicleSearchResult({
  result,
  vehicle,
}: {
  result: lunr.Index.Result;
  vehicle: VehicleItem;
}) {
  const titleHighlights = useMemo(
    () =>
      Object.values(result.matchData.metadata).reduce(
        (highlights: Highlight[], metadata) => {
          if (metadata.title) {
            metadata.title.position.forEach((pos: LunrPosition) => {
              highlights.push({
                start: pos[0],
                end: pos[0] + pos[1],
              });
            });
          }
          return highlights;
        },
        [],
      ),
    [result],
  );

  return (
    <>
      <ListItemIcon>
        <DriveEtaIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <HighlightedText text={vehicle.title} highlights={titleHighlights} />
        }
      />
    </>
  );
}
