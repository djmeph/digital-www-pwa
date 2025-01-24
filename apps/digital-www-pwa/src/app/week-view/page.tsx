'use client';

import dayjs from 'dayjs';

import { useFeedContext } from '@digital-www-pwa/feed-context';
import { AgendaView, CalendarEvent } from '@digital-www-pwa/page-agenda-view';
import { Event, EventTime } from '@digital-www-pwa/event-types';
import { useMemo } from 'react';

/**
  * For multi-day all-day events, the API returns contiguous event times, one
* for each day. This function merges contiguous event times, to show them
  * properly on the calendar
  */
function getMergedEventTimes(feedEvent : Event) {
  return feedEvent.event_times.reduce((collectedTimes : EventTime[], eventTime: EventTime) => {
    if (collectedTimes.length === 0) {
      // We always need to include the first event time
      return [eventTime];
    }

    // Check to see if any of the existing collected times are contiguous with
    // the new event time we're looking at. If so, modify the new event to include
    // both times
    const existingIndex = collectedTimes.findIndex((collectedTime: EventTime, index : number) => {
      if (collectedTime.ending === eventTime.starting) {
        eventTime.starting = collectedTime.starting;
        return true;
      }
      if (collectedTime.starting === eventTime.ending) {
        eventTime.ending = collectedTime.ending;
        return true;
      }
      return false;
    });
    // If we found an existing event, replace the old one and return the new
    // collection
    if (existingIndex >= 0) {
      collectedTimes[existingIndex] = eventTime;
      return collectedTimes;
    }

    // Otherwise, if the new event isn't contiguous with any existing events,
    // add it to the collected event times.
    return [...collectedTimes, eventTime];
  }, []);
}

export default function Page() {
  const feed = useFeedContext();
  const calendarEvents = useMemo(() => {
    return feed.coalesce.reduce((calendarEvents : CalendarEvent[], feedEvent : Event) => {
      const newEvents = getMergedEventTimes(feedEvent).map((eventTime : EventTime) => ({
          id: eventTime.event_time_id,
          start: dayjs(eventTime.starting).toDate(),
          end: dayjs(eventTime.ending).toDate(),
          title: feedEvent.title,
        }
      ));
      return [...calendarEvents, ...newEvents];
    }, []);
  }, [feed]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Agenda
          </h1>
        </div>
      </header>
      <main>
        <AgendaView
           dates={[
            '2024-07-17',
            '2024-07-18',
            '2024-07-19',
            '2024-07-20',
            '2024-07-21',
          ]}
          events={calendarEvents}
        />
      </main>
    </>
  );
}
