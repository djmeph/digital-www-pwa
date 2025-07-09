'use client';
import type {
  ParsedEventTime,
  CampItem,
  ProcessedDataContextProps,
  ProcessedEventItem,
} from '@digital-www-pwa/types';
import { EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState, useEffect, createContext, useContext } from 'react';

import { useAuthContext } from './AuthProvider';
import { useFeedContext } from './FeedProvider';

const INITIAL_DATA: ProcessedDataContextProps = {
  arts: null,
  events: null,
  eventTimes: null,
  camps: null,
  radios: null,
  vehicles: null,
};

export const ProcessedDataContext =
  createContext<ProcessedDataContextProps>(INITIAL_DATA);

export function useEvents() {
  return useContext(ProcessedDataContext).events;
}

export function useEvent(id?: string) {
  const events = useEvents();
  return (events && id && events[id]) || null;
}

export function useEventTimes() {
  return useContext(ProcessedDataContext).eventTimes;
}

export function useEventTime(id?: string) {
  const eventTimes = useEventTimes();
  return (eventTimes && id && eventTimes[id]) || null;
}

export function useArts() {
  return useContext(ProcessedDataContext).arts;
}

export function useArt(id?: string) {
  const arts = useArts();
  return (arts && id && arts[id]) || null;
}

export function useCamps() {
  return useContext(ProcessedDataContext).camps;
}

export function useCamp(id?: string) {
  const camps = useCamps();
  return (camps && id && camps[id]) || null;
}

export function useRadios() {
  return useContext(ProcessedDataContext).radios;
}

export function useRadio(id?: string) {
  const radios = useRadios();
  return (radios && id && radios[id]) || null;
}

export function useVehicles() {
  return useContext(ProcessedDataContext).vehicles;
}

export function useVehicle(id?: string) {
  const vehicles = useVehicles();
  return (vehicles && id && vehicles[id]) || null;
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

    const locationsMap = Object.fromEntries(
      locations.map((location) => [location.id, location])
    );

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

    const processedCamps: CampItem[] = camps
      .filter((camp) => camp.description)
      .map((camp) => {
        const location = locationsMap[camp.location_id];
        return {
          ...camp,
          location_name: location?.camp_site_identifier
            ? `Site ${location.camp_site_identifier}`
            : location?.name,
        };
      });

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
      camps: Object.fromEntries(processedCamps.map((camp) => [camp.id, camp])),
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
    }));
  }, [feed, isOver18]);

  return (
    <ProcessedDataContext.Provider value={processedData}>
      {children}
    </ProcessedDataContext.Provider>
  );
}
