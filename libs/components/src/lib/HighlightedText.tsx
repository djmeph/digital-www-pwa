'use client';
import type { Highlight } from '@digital-www-pwa/types';
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: Highlight[];
}) {
  const theme = useTheme();

  if (highlights.length === 0) {
    return <Typography component="span">{text}</Typography>;
  }

  const sortedHighlights = highlights.toSorted((a, b) => a.start - b.start);

  return sortedHighlights.reduce(
    (elements: React.ReactNode[], highlight: Highlight, index: number) => {
      elements.push(
        <Typography
          component="span"
          sx={{ backgroundColor: alpha(theme.palette.highlight.main, 0.8) }}
        >
          {text.substring(highlight.start, highlight.end)}
        </Typography>
      );
      const nextHighlight = sortedHighlights[index + 1];
      if (nextHighlight) {
        elements.push(
          <Typography component="span">
            {text.substring(highlight.end, nextHighlight.start)}
          </Typography>
        );
      } else {
        elements.push(
          <Typography component="span">
            {text.substring(highlight.end, text.length)}
          </Typography>
        );
      }
      return elements;
    },
    [
      <Typography component="span">
        {text.substring(0, sortedHighlights[0].start)}
      </Typography>,
    ] // The unmatched bit before any highlights
  );
}
