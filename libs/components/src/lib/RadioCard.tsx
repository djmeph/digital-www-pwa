'use client';
import type { ProcessedRadioItem } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function RadioCard({ radio }: { radio: ProcessedRadioItem }) {
  return (
    <Grid size={{ xxs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardActionArea component={Link} href={`/radio/${radio.id}`}>
          <CardHeader
            title={radio.radio_dj_name}
            subheader={radio.radio_time.format('LT')}
          />
          <CardContent>
            <Typography variant="subtitle1">
              {radio.radio_description.length > MAX_DESCRIPTION_LENGTH
                ? `${radio.radio_description.substring(
                    0,
                    MAX_DESCRIPTION_LENGTH
                  )}…`
                : radio.radio_description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
