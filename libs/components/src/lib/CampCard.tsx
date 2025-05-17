'use client';
import type { CampItem } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function CampCard({ camp }: { camp: CampItem }) {
  return (
    <Grid size={{ xxs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardActionArea component={Link} href={`/camps/${camp.id}`}>
          <CardHeader
            title={camp.name}
            subheader={camp.location_name}
          />
          <CardContent>
            <Typography variant="subtitle1">
              {camp.event_count} {camp.event_count === 1 ? 'event' : 'events'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
