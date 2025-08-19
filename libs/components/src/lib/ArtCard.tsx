'use client';
import type { ArtItem } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

export function ArtCard({ art }: { art: ArtItem }) {
  return (
    <Grid size={{ xxs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardActionArea component={NextLink} href={`/art/${art.id}`}>
          <CardHeader title={art.title} subheader={art.artist} />
          <CardContent>
            <Typography variant="subtitle1">
              {art.description.length > MAX_DESCRIPTION_LENGTH
                ? `${art.description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
                : art.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
