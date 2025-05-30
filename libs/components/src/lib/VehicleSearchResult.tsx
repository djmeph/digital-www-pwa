'use client';
import type {
  VehicleItem,
  Highlight,
  LunrPosition,
} from '@digital-www-pwa/types';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import lunr from 'lunr';
import { useMemo } from 'react';

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
        []
      ),
    [result]
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
