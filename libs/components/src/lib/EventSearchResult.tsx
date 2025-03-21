'use client';
import lunr from 'lunr';
import type {
  ProcessedEventItem,
  Highlight,
  LunrPosition,
} from '@digital-www-pwa/types';
import { useMemo } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from 'next/link';

import EventIcon from '@mui/icons-material/Event';

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
        [],
      ),
    [result],
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
