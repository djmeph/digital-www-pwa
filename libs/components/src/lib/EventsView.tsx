'use client';
import {
  useEventTimes,
  useFavoriteEventTimeIds,
} from '@digital-www-pwa/providers';
import type {
  ParsedEventTime,
  SlugFilters,
  TagItem,
} from '@digital-www-pwa/types';
import { Slugs, TAGS } from '@digital-www-pwa/utils';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { EventCard } from './EventCard';
import { Header } from './Header';
import { SelectDayTabBar } from './SelectDayTabBar';

function getDefaultFilters(): SlugFilters {
  return Object.fromEntries(
    TAGS.map((tag) => [tag.slug, false])
  ) as SlugFilters;
}

export function EventsView({
  favoritesOnly = false,
  happeningAt = null,
  header = 'Events',
  whereType = null,
  whereName = null,
}: {
  favoritesOnly?: boolean;
  happeningAt?: Dayjs | null;
  header?: React.ReactNode;
  whereType?: string | null;
  whereName?: string | null;
}) {
  const theme = useTheme();
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

  const favoriteEventTimeIds = useFavoriteEventTimeIds();
  const eventTimesForPage = useMemo<Array<ParsedEventTime> | null>(() => {
    if (!eventTimes) {
      return null;
    }
    return Object.values(eventTimes)
      .filter(
        (eventTime) =>
          (!favoritesOnly ||
            favoriteEventTimeIds.has(eventTime.event_time_id)) &&
          (!happeningAt ||
            happeningAt.isBetween(eventTime.starting, eventTime.ending)) &&
          (!whereType || eventTime.event.where_type === whereType) &&
          (!whereName || eventTime.event.where_name === whereName)
      )
      .toSorted(
        (a, b) =>
          a.starting.unix() - b.starting.unix() || // Sort first by start time
          a.ending.unix() - b.ending.unix() || // Then by earliest end time
          a.event.title.localeCompare(b.event.title) // Then alphabetically
      );
  }, [
    eventTimes,
    favoriteEventTimeIds,
    favoritesOnly,
    happeningAt,
    whereType,
    whereName,
  ]);

  const filteredEventTimes = useMemo<Array<ParsedEventTime> | null>(() => {
    if (!eventTimesForPage) {
      return null;
    }

    const selectedTagSlugs = [
      ...TAGS.reduce((acc, tag) => {
        if (filters[tag.slug]) {
          acc.add(tag.slug);
        }
        return acc;
      }, new Set<Slugs>()),
    ];

    return eventTimesForPage.filter(
      (eventTime) =>
        selectedTagSlugs.length === 0 ||
        [...selectedTagSlugs].some((slug) => eventTime.event[slug])
    );
  }, [eventTimesForPage, filters]);

  const availableEventDays = useMemo<Array<string> | null>(() => {
    if (!filteredEventTimes) {
      return null;
    }

    const availableDays = [
      ...filteredEventTimes.reduce((eventDays, eventTime) => {
        eventDays.add(eventTime.day_of_week);
        return eventDays;
      }, new Set<string>()),
    ];

    return [...availableDays];
  }, [filteredEventTimes]);

  const [selectedDay, setSelectedDay] = useState<string>(() => {
    if (!availableEventDays) {
      return 'Wednesday';
    }
    if (typeof localStorage === 'undefined') {
      return availableEventDays[0];
    }
    return (
      availableEventDays.find(
        (d) => d === localStorage.getItem('lastSelectedDay')
      ) || availableEventDays[0]
    );
  });

  const availableTags = useMemo<Array<TagItem> | null>(() => {
    if (!eventTimesForPage) {
      return null;
    }

    const availableTags = [
      ...TAGS.reduce((tags, tag) => {
        if (eventTimesForPage.some((eventTime) => eventTime.event[tag.slug])) {
          tags.add(tag);
        }
        return tags;
      }, new Set<TagItem>()),
    ];

    return [...availableTags];
  }, [eventTimesForPage]);

  useEffect(() => {
    if (!availableTags) return;

    setFilters((oldFilters) => {
      let newFilters = oldFilters;
      TAGS.forEach((tag) => {
        if (oldFilters[tag.slug] && !availableTags.includes(tag)) {
          if (newFilters === oldFilters) {
            newFilters = { ...oldFilters };
          }
          delete newFilters[tag.slug];
        }
      });
      return newFilters;
    });
  }, [availableTags]);

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

  useEffect(() => {
    if (
      availableEventDays &&
      availableEventDays?.length > 0 &&
      !availableEventDays.includes(selectedDay)
    ) {
      setSelectedDay(availableEventDays[0]);
    }
  }, [availableEventDays, selectedDay]);

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

  function renderEvents({
    allDay = false,
    eventDay,
  }: {
    allDay: boolean;
    eventDay: string;
  }) {
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
      if (eventDay && eventTime.day_of_week !== eventDay) {
        return null;
      }
      if (allDay !== eventTime.all_day) {
        return null;
      }
      return renderEventTime(eventTime);
    });
  }

  function renderBody() {
    if (!availableEventDays || availableEventDays.length === 0) {
      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2">Nothing Found</Typography>
        </Box>
      );
    }

    return (
      <>
        <Grid container spacing={1}>
          {availableTags?.map((tag) => {
            const IconComponent = tag.icon;
            return (
              <Grid key={tag.slug}>
                <Chip
                  onClick={() => handleFilterToggle(tag.slug)}
                  variant={filters[tag.slug] ? 'filled' : 'outlined'}
                  icon={<IconComponent />}
                  label={tag.name}
                  color={tag.slug}
                  sx={{
                    '@media print': {
                      display: 'none',
                    },
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        {happeningAt ? null : (
          <SelectDayTabBar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            availableDays={availableEventDays}
            id="select-day-tab-bar"
            sx={{
              '@media print': {
                display: 'none',
              },
            }}
          />
        )}
        {availableEventDays.map((day) => {
          return (
            <Box
              key={day}
              sx={{
                display:
                  happeningAt?.format('dddd') === day || day === selectedDay
                    ? 'initial'
                    : 'none',
                '@media print': {
                  display: 'initial',
                },
              }}
            >
              <Typography
                sx={{
                  typography: { sm: 'h2', xxs: 'h4' },
                  display: 'none',
                  '@media print': {
                    display: 'initial',
                  },
                }}
              >
                {day}
              </Typography>
              {filteredEventTimes?.some(
                (e) => e.all_day && e.day_of_week === day
              ) ? (
                <Stack direction="column-reverse">
                  <Collapse in={showAllDayEvents}>
                    <Grid container spacing={2} padding={2}>
                      {renderEvents({ allDay: true, eventDay: day })}
                    </Grid>
                  </Collapse>
                  <Button
                    sx={{
                      margin: 2,
                      padding: 1,
                      position: 'sticky',
                      top: theme.spacing(9),
                      maxWidth: '360px',
                      display: 'flex',
                      backgroundColor: theme.palette.background.default,
                      '@media print': {
                        display: 'none',
                      },
                      [theme.breakpoints.down('xs')]: {
                        fontSize: '4.5vw',
                      },
                    }}
                    variant="outlined"
                    color="primary"
                    onClick={handleToggleAllDayEvents}
                    endIcon={
                      showAllDayEvents ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                  >
                    {showAllDayEvents ? 'Hide ' : 'Show '}All Day Events
                  </Button>
                </Stack>
              ) : null}
              <Grid container spacing={2} padding={2}>
                {renderEvents({ allDay: false, eventDay: day })}
              </Grid>
            </Box>
          );
        })}
      </>
    );
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
              sx={{
                '@media print': {
                  display: 'none',
                },
              }}
            >
              <FilterAltOffIcon />
            </IconButton>
          ) : null
        }
      >
        {header}
      </Header>
      {renderBody()}
    </>
  );
}
