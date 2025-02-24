import { Dayjs } from 'dayjs';

export interface RadioItem {
  id: string;
  radio_day: string;
  radio_time: string;
  radio_dj_name: string;
  radio_description: string;
}

export interface ProcessedRadioItem {
  id: string;
  radio_day: string;
  radio_time: Dayjs;
  radio_dj_name: string;
  radio_description: string;
}
