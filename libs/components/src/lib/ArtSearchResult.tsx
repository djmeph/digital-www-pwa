'use client';
import lunr from 'lunr';
import type { ArtItem, Highlight, LunrPosition } from '@digital-www-pwa/types';
import { useMemo } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import PaletteIcon from '@mui/icons-material/Palette';

import { HighlightedText } from './HighlightedText';

export function ArtSearchResult({
  result,
  art,
}: {
  result: lunr.Index.Result;
  art: ArtItem;
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
        <PaletteIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <HighlightedText text={art.title} highlights={titleHighlights} />
        }
      />
    </>
  );
}
