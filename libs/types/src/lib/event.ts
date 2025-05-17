import { Dayjs } from 'dayjs';

export enum EventRecurrance {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export type EventItem = {
  event_id: number;
  title: string;
  event_description: string;
  site_id: null;
  where_type: string;
  where_name: string;
  event_recurrence: EventRecurrance;
  heart_count: number;
  alcohol: boolean;
  red_light: boolean;
  fire_art: boolean;
  spectacle: boolean;
  crafting: boolean;
  food: boolean;
  sober: boolean;
  event_times: EventTime[];
};

export interface EventTime {
  event_time_id: number;
  starting: string;
  ending: string;
  day_of_week: DayOfWeek;
  all_day: boolean;
}

export interface ProcessedEventTime
  extends Omit<EventTime, 'starting' | 'ending'> {
  starting: Dayjs;
  ending: Dayjs;
}

export interface ProcessedEventItem extends Omit<EventItem, 'event_times'> {
  event_times: ProcessedEventTime[];
}

export interface ParsedEventTime extends ProcessedEventTime {
  event: ProcessedEventItem;
}
