'use client';
import { TAGS } from '@digital-www-pwa/utils';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';

export function EventTags({ event }: { event: any }) {
  if (!event) {
    return null;
  }

  return (
    <Grid container spacing={1}>
      {TAGS.map((tag) => {
        if (!event[tag.slug]) {
          return null;
        }
        const IconComponent = tag.icon;
        return (
          <Grid key={tag.slug}>
            <Chip icon={<IconComponent />} label={tag.name} color={tag.slug} />
          </Grid>
        );
      })}
    </Grid>
  );
}
