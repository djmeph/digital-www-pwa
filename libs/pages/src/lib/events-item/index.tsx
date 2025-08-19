'use client';
import { EventTags, FavoriteButton, Header } from '@digital-www-pwa/components';
import { useEventTime, useCamps } from '@digital-www-pwa/providers';
import type { ProcessedEventTime } from '@digital-www-pwa/types';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { useMemo } from 'react';

function formatEventTime(eventTime: ProcessedEventTime) {
  return eventTime.all_day
    ? `${eventTime.starting.format('dddd')} All Day`
    : `${eventTime.starting.format('ddd LT')} - ${eventTime.ending.format(
        'LT'
      )}`;
}

export function EventsItemPage({ id }: { id: string }) {
  const eventTime = useEventTime(id);
  const camps = useCamps();

  const otherTimes = useMemo(() => {
    if (!eventTime) {
      return [];
    }

    return eventTime.event.event_times.filter(
      (et) => et.event_time_id !== eventTime.event_time_id
    );
  }, [eventTime]);

  const camp = useMemo(() => {
    if (!eventTime || eventTime.event.where_type !== 'camp') {
      return null;
    }
    return Object.values(camps || {}).find(
      (c) => c.name === eventTime.event.where_name
    );
  }, [eventTime, camps]);

  function renderOtherTimesList() {
    if (otherTimes.length === 0) {
      return null;
    }
    return (
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="subtitle1">Other times:</Typography>
          </ListItemText>
        </ListItem>
        {otherTimes.map((otherTime) => (
          <ListItem key={otherTime.event_time_id}>
            <ListItemButton
              component={NextLink}
              href={`/events/${otherTime.event_time_id}`}
            >
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText>{formatEventTime(otherTime)}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }

  function renderWhere() {
    if (eventTime === null) {
      return <Skeleton />;
    }
    if (camp) {
      return (
        <Link component={NextLink} href={`/camps/${camp.id}`}>
          {eventTime.event.where_name}
        </Link>
      );
    }
    return eventTime.event.where_name || eventTime.event.who_name;
  }

  return (
    <>
      <Header>
        {eventTime === null ? <Skeleton /> : eventTime.event.title}
      </Header>
      <Typography variant="h5">
        {eventTime === null ? <Skeleton /> : formatEventTime(eventTime)}
      </Typography>
      <Typography variant="h6">{renderWhere()}</Typography>
      <EventTags event={eventTime?.event} />
      <Card sx={{ width: '100%', marginTop: (theme) => theme.spacing(2) }}>
        <CardContent>
          <Typography variant="body1">
            {eventTime === null
              ? Array(4)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} />)
              : eventTime.event.event_description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {eventTime === null ? (
              <Skeleton variant="rectangular" />
            ) : (
              <FavoriteButton variant="large" eventTime={eventTime} />
            )}
          </Box>

          {renderOtherTimesList()}
        </CardContent>
      </Card>
    </>
  );
}
