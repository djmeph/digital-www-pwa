import { Dayjs } from 'dayjs';

export type ShiftsFeed = {
  id: string;
  department_title: string;
  shift_title: string;
  shift_description: string;
  shift_start: number;
  shift_end: number;
  shift_location: string;
  dust_id: null;
};

export type ProcessedShift = {
  id: string;
  department_title: string;
  shift_title: string;
  shift_description: string;
  shift_start: Dayjs;
  shift_end: Dayjs;
  shift_location: string;
};

export interface Shifts {
  loading: boolean;
  shifts: ProcessedShift[];
}
