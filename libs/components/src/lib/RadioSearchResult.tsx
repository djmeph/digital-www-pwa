'use client';
import lunr from 'lunr';
import type {
  ProcessedRadioItem,
  Highlight,
  LunrPosition,
} from '@digital-www-pwa/types';
import { useMemo } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import RadioIcon from '@mui/icons-material/Radio';

import { HighlightedText } from './HighlightedText';

export function RadioSearchResult({
  result,
  radio,
}: {
  result: lunr.Index.Result;
  radio: ProcessedRadioItem;
}) {
  const nameHighlights = useMemo(
    () =>
      Object.values(result.matchData.metadata).reduce(
        (highlights: Highlight[], metadata) => {
          if (metadata.radio_dj_name) {
            metadata.radio_dj_name.position.forEach((pos: LunrPosition) => {
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
        <RadioIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <HighlightedText
            text={radio.radio_dj_name}
            highlights={nameHighlights}
          />
        }
      />
    </>
  );
}
