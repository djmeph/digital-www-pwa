'use client';
import type { ParsedEventTime } from '@digital-www-pwa/types';
import { MAX_DESCRIPTION_LENGTH } from '@digital-www-pwa/utils';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { EventTags } from './EventTags';
import { FavoriteButton } from './FavoriteButton';

export function EventCard({ eventTime }: { eventTime: ParsedEventTime }) {
  const theme = useTheme();
  return (
    <Grid size={{ xxs: 12, md: 6, lg: 4 }}>
      <Card sx={{ position: 'relative' }}>
        <CardActionArea
          component={Link}
          href={`/events/${eventTime.event_time_id}`}
        >
          <CardHeader
            title={eventTime.event.title}
            subheader={
              eventTime.all_day
                ? 'All Day'
                : `${eventTime.starting.format(
                    'LT'
                  )} - ${eventTime.ending.format('LT')}`
            }
            sx={{
              '& .MuiCardHeader-title': {
                marginRight: '1em',
              },
            }}
          />
          <CardContent>
            <Typography variant="subtitle1">
              {eventTime.event.event_description.length > MAX_DESCRIPTION_LENGTH
                ? `${eventTime.event.event_description.substring(
                    0,
                    MAX_DESCRIPTION_LENGTH
                  )}…`
                : eventTime.event.event_description}
            </Typography>
            <EventTags event={eventTime.event} />
          </CardContent>
        </CardActionArea>
        <FavoriteButton
          sx={{
            position: 'absolute',
            right: theme.spacing(2),
            top: theme.spacing(2),
          }}
          eventTime={eventTime}
        />
      </Card>
    </Grid>
  );
}
