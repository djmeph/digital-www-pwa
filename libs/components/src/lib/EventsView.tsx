'use client';
import {
  useEventTimes,
  useFavoriteEventTimeIds,
} from '@digital-www-pwa/providers';
import type { ParsedEventTime, SlugFilters } from '@digital-www-pwa/types';
import { EVENT_DAYS, Slugs, TAGS } from '@digital-www-pwa/utils';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useEffect, useMemo, useState } from 'react';

import { EventCard } from './EventCard';
import { Header } from './Header';
import { SelectDayTabBar } from './SelectDayTabBar';

function getDefaultFilters(): SlugFilters {
  return Object.fromEntries(
    TAGS.map((tag) => [tag.slug, false])
  ) as SlugFilters;
}

export function EventsView({ favoritesOnly }: { favoritesOnly: boolean }) {
  const eventTimes = useEventTimes();
  const [filters, setFilters] = useState<SlugFilters>(() => {
    try {
      if (typeof localStorage === 'undefined') {
        return getDefaultFilters();
      }
      const storedFilters = JSON.parse(
        localStorage.getItem('lastFilters') || '[]'
      ) as SlugFilters;
      if (storedFilters === null) {
        return getDefaultFilters();
      }
      return Object.fromEntries(
        TAGS.map((tag) => [tag.slug, !!storedFilters[tag.slug]])
      ) as SlugFilters;
    } catch (err) {
      console.error(err);
      return getDefaultFilters();
    }
  });

  const [showAllDayEvents, setShowAllDayEvents] = useState<boolean>(() => {
    if (typeof localStorage === 'undefined') {
      return true;
    }
    return localStorage.getItem('showAllDay') !== 'false';
  });

  const [selectedDay, setSelectedDay] = useState<string>(() => {
    if (typeof localStorage === 'undefined') {
      return 'Wednesday';
    }
    return (
      EVENT_DAYS.find((d) => d === localStorage.getItem('lastSelectedDay')) ||
      'Wednesday'
    );
  });

  const favoriteEventTimeIds = useFavoriteEventTimeIds();
  const sortedEventTimes = useMemo(
    () =>
      eventTimes &&
      Object.values(eventTimes).toSorted(
        (a, b) =>
          a.starting.unix() - b.starting.unix() || // Sort first by start time
          a.ending.unix() - b.ending.unix() || // Then by earliest end time
          a.event.title.localeCompare(b.event.title) // Then alphabetically
      ),
    [eventTimes]
  );

  const filteredEventTimes = useMemo(() => {
    const preFilteredEventTimes = sortedEventTimes?.filter(
      (eventTime) =>
        eventTime.day_of_week === selectedDay &&
        (!favoritesOnly || favoriteEventTimeIds.has(eventTime.event_time_id))
    );
    const selectedTagSlugs = TAGS.reduce((acc, tag) => {
      if (filters[tag.slug]) {
        acc.add(tag.slug);
      }
      return acc;
    }, new Set<Slugs>());
    if (selectedTagSlugs.size === 0) {
      return preFilteredEventTimes;
    }
    return preFilteredEventTimes?.filter((eventTime: ParsedEventTime) =>
      [...selectedTagSlugs].some((slug) => eventTime.event[slug])
    );
  }, [
    sortedEventTimes,
    filters,
    selectedDay,
    favoriteEventTimeIds,
    favoritesOnly,
  ]);

  useEffect(() => {
    const weeklySelectionElement =
      document.getElementById('select-day-tab-bar');
    if (!showAllDayEvents && weeklySelectionElement) {
      weeklySelectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [showAllDayEvents]);

  useEffect(() => {
    localStorage.setItem('lastSelectedDay', selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem('showAllDay', JSON.stringify(showAllDayEvents));
  }, [showAllDayEvents]);

  useEffect(() => {
    localStorage.setItem('lastFilters', JSON.stringify(filters));
  }, [filters]);

  function handleFilterToggle(slug: Slugs) {
    setFilters((oldFilters) => ({
      ...oldFilters,
      [slug]: !filters[slug],
    }));
  }

  function handleToggleAllDayEvents() {
    setShowAllDayEvents(!showAllDayEvents);
  }

  function handleRemoveFilters() {
    setFilters(getDefaultFilters());
    setShowAllDayEvents(true);
  }

  function renderEventTime(eventTime: ParsedEventTime) {
    return <EventCard key={eventTime.event_time_id} eventTime={eventTime} />;
  }

  function renderEvents(allDay = false) {
    if (!filteredEventTimes) {
      return Array(12)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return filteredEventTimes.map((eventTime) => {
      if (allDay !== eventTime.all_day) {
        return null;
      }
      return renderEventTime(eventTime);
    });
  }

  return (
    <>
      <Header
        button={
          !showAllDayEvents || Object.values(filters).some((f) => f) ? (
            <IconButton
              aria-label="Remove filters"
              size="large"
              onClick={handleRemoveFilters}
            >
              <FilterAltOffIcon />
            </IconButton>
          ) : null
        }
      >
        {favoritesOnly ? 'Favorites' : 'Events'}
      </Header>
      <Grid container spacing={1}>
        {TAGS.map((tag) => {
          const IconComponent = tag.icon;
          return (
            <Grid key={tag.slug}>
              <Chip
                onClick={() => handleFilterToggle(tag.slug)}
                variant={filters[tag.slug] ? 'filled' : 'outlined'}
                icon={<IconComponent />}
                label={tag.name}
                color={tag.slug}
              />
            </Grid>
          );
        })}
      </Grid>
      <SelectDayTabBar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        id="select-day-tab-bar"
      />
      {filteredEventTimes?.some((e) => e.all_day) ? (
        <Stack direction="column-reverse">
          <Collapse in={showAllDayEvents}>
            <Grid container spacing={2} padding={2}>
              {renderEvents(true)}
            </Grid>
          </Collapse>
          <Button
            sx={{
              margin: 2,
              padding: 1,
              position: 'sticky',
              top: (theme) => theme.spacing(9),
              display: 'flex',
              backgroundColor: 'white',
            }}
            variant="outlined"
            color="primary"
            onClick={handleToggleAllDayEvents}
            endIcon={showAllDayEvents ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {showAllDayEvents ? 'Hide ' : 'Show '}All Day Events
          </Button>
        </Stack>
      ) : null}
      <Grid container spacing={2} padding={2}>
        {renderEvents(false)}
      </Grid>
    </>
  );
}
