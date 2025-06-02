'use client';
import type {
  ParsedEventTime,
  ProcessedDataContextProps,
  ProcessedEventItem,
} from '@digital-www-pwa/types';
import { EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState, useEffect, createContext, useContext } from 'react';

import { useFeedContext } from './FeedProvider';
import { useAuthContext } from './AuthProvider';

const INITIAL_DATA: ProcessedDataContextProps = {
  arts: null,
  events: null,
  eventTimes: null,
  camps: null,
  radios: null,
  vehicles: null,
  locations: null,
};

export const ProcessedDataContext =
  createContext<ProcessedDataContextProps>(INITIAL_DATA);

export function useEvents() {
  return useContext(ProcessedDataContext).events;
}

export function useEvent(id: string) {
  const events = useEvents();
  return events && events[id];
}

export function useEventTimes() {
  return useContext(ProcessedDataContext).eventTimes;
}

export function useEventTime(id: string) {
  const eventTimes = useEventTimes();
  return eventTimes && eventTimes[id];
}

export function useArts() {
  return useContext(ProcessedDataContext).arts;
}

export function useArt(id: string) {
  const arts = useArts();
  return arts && arts[id];
}

export function useCamps() {
  return useContext(ProcessedDataContext).camps;
}

export function useCamp(id: string) {
  const camps = useCamps();
  return camps && camps[id];
}

export function useRadios() {
  return useContext(ProcessedDataContext).radios;
}

export function useRadio(id: string) {
  const radios = useRadios();
  return radios && radios[id];
}

export function useVehicles() {
  return useContext(ProcessedDataContext).vehicles;
}

export function useVehicle(id: string) {
  const vehicles = useVehicles();
  return vehicles && vehicles[id];
}

export function useLocations() {
  return useContext(ProcessedDataContext).locations;
}

export function useLocation(id?: string) {
  const locations = useLocations();
  return locations && id && locations[id];
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

dayjs.tz.setDefault(EVENT_TIMEZONE);

export function ProcessedDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const feed = useFeedContext();
  const { isOver18 } = useAuthContext();
  const [processedData, setProcessedData] = useState(INITIAL_DATA);

  useEffect(() => {
    const { events, art, camps, radios, vehicles, locations } = feed;

    if (events.length === 0) {
      return;
    }

    const parsedEvents: ProcessedEventItem[] = events
      .filter((event) => isOver18 || !event.red_light)
      .map((event) => ({
        ...event,
        event_times: event.event_times.map((eventTime) => ({
          ...eventTime,
          starting: dayjs.tz(eventTime.starting, EVENT_TIMEZONE),
          ending: dayjs(eventTime.ending).tz(EVENT_TIMEZONE, true),
        })),
      }));

    const eventTimes: ParsedEventTime[] = parsedEvents.reduce(
      (previousValue, parsedEvent) => {
        return [
          ...previousValue,
          ...parsedEvent.event_times.map((eventTime) => ({
            ...eventTime,
            event: parsedEvent, // Potential circular reference? Omit event_times if it causes problems
          })),
        ];
      },
      [] as ParsedEventTime[]
    );

    // Generate an object that maps from ID to object for quick lookups later
    const eventMap = Object.fromEntries(
      parsedEvents.map((event) => [event.event_id, event])
    );
    const eventTimesMap = Object.fromEntries(
      eventTimes.map((eventTime) => [eventTime.event_time_id, eventTime])
    );

    setProcessedData((previousState) => ({
      ...previousState,
      events: eventMap,
      eventTimes: eventTimesMap,
      arts: Object.fromEntries(art.map((art) => [art.id, art])),
      camps: Object.fromEntries(camps.map((camp) => [camp.id, camp])),
      radios: Object.fromEntries(
        radios.map((radio) => [
          radio.id,
          {
            ...radio,
            radio_time: dayjs(radio.radio_time).tz(EVENT_TIMEZONE, true),
          },
        ])
      ),
      vehicles: Object.fromEntries(
        vehicles.map((vehicle) => [vehicle.id, vehicle])
      ),
      locations,
    }));
  }, [feed, isOver18]);

  return (
    <ProcessedDataContext.Provider value={processedData}>
      {children}
    </ProcessedDataContext.Provider>
  );
}
