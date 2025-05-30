'use client';
import type {
  ProcessedEventItem,
  Highlight,
  LunrPosition,
} from '@digital-www-pwa/types';
import EventIcon from '@mui/icons-material/Event';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import lunr from 'lunr';
import { useMemo } from 'react';

import { HighlightedText } from './HighlightedText';

export function EventSearchResult({
  result,
  event,
}: {
  result: lunr.Index.Result;
  event: ProcessedEventItem;
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
        <EventIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <HighlightedText text={event.title} highlights={titleHighlights} />
        }
      />
    </>
  );
}
