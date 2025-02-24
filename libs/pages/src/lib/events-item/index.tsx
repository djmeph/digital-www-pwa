'use client';
import { EventTags, FavoriteButton, Header } from '@digital-www-pwa/components';
import { useEventTime } from '@digital-www-pwa/providers';
import type { ProcessedEventTime } from '@digital-www-pwa/types';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ElementType, useMemo } from 'react';

function formatEventTime(eventTime: ProcessedEventTime) {
  return eventTime.all_day
    ? `${eventTime.starting.format('dddd')} All Day`
    : `${eventTime.starting.format('ddd LT')} - ${eventTime.ending.format(
        'LT'
      )}`;
}

export function EventsItemPage({ id }: { id: string }) {
  const eventTime = useEventTime(id);

  const otherTimes = useMemo(() => {
    if (eventTime === null) {
      return [];
    }

    return eventTime.event.event_times.filter(
      (et) => et.event_time_id !== eventTime.event_time_id
    );
  }, [eventTime]);

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
            <Paper sx={{ width: '100%' }}>
              <ListItemButton
                component={Link as ElementType}
                to={`/events/${otherTime.event_time_id}`}
              >
                <ListItemIcon>
                  <DoubleArrowIcon />
                </ListItemIcon>
                <ListItemText>{formatEventTime(otherTime)}</ListItemText>
              </ListItemButton>
            </Paper>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <>
      <Header>
        {eventTime === null ? <Skeleton /> : eventTime.event.title}
      </Header>
      <Typography variant="h5">
        {eventTime === null ? <Skeleton /> : formatEventTime(eventTime)}
      </Typography>
      <Typography variant="h6">
        {eventTime === null ? (
          <Skeleton />
        ) : eventTime.event.site_id ? (
          `${eventTime.event.hosting_location} - Site ${eventTime.event.site_id}`
        ) : (
          eventTime.event.hosting_location
        )}
      </Typography>
      <EventTags event={eventTime?.event} />
      <Typography variant="body1">
        {eventTime === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : eventTime.event.event_description}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FavoriteButton variant="large" eventTime={eventTime} />
      </Box>

      {renderOtherTimesList()}
    </>
  );
}
