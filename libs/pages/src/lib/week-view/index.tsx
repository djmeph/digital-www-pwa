'use client';
import { AgendaView } from '@digital-www-pwa/components';
import { useFeedContext } from '@digital-www-pwa/providers';
import type {
  CalendarEvent,
  EventItem,
  EventTime,
} from '@digital-www-pwa/types';
import { getMergedEventTimes } from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export function WeekViewPage() {
  const feed = useFeedContext();
  const calendarEvents = useMemo(() => {
    return feed.events.reduce(
      (calendarEvents: CalendarEvent[], feedEvent: EventItem) => {
        const newEvents = getMergedEventTimes(feedEvent).map(
          (eventTime: EventTime) => ({
            id: eventTime.event_time_id,
            start: dayjs(eventTime.starting).toDate(),
            end: dayjs(eventTime.ending).toDate(),
            title: feedEvent.title,
          })
        );
        return [...calendarEvents, ...newEvents];
      },
      []
    );
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
