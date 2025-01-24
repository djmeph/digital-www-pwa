import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import minMax from 'dayjs/plugin/minMax.js';
import { Route } from 'next';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

const timeSlots = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
] as const;

const colStartClasses = {
  0: 'col-start-[1]',
  1: 'col-start-[2]',
  2: 'col-start-[3]',
  3: 'col-start-[4]',
  4: 'col-start-[5]',
  5: 'col-start-[6]',
  6: 'col-start-[7]',
} as const;

const colSpanClasses = {
  0: 'col-end-[span_0]',
  1: 'col-end-[span_1]',
  2: 'col-end-[span_2]',
  3: 'col-end-[span_3]',
  4: 'col-end-[span_4]',
  5: 'col-end-[span_5]',
  6: 'col-end-[span_6]',
  7: 'col-end-[span_7]',
  8: 'col-end-[span_8]',
  9: 'col-end-[span_9]',
  10: 'col-end-[span_10]',
  11: 'col-end-[span_11]',
  12: 'col-end-[span_12]',
  13: 'col-end-[span_13]',
  14: 'col-end-[span_14]',
  15: 'col-end-[span_15]',
  16: 'col-end-[span_16]',
  17: 'col-end-[span_17]',
} as const;

const rowStartClasses = {
  0: 'row-start-[1]',
  1: 'row-start-[2]',
  2: 'row-start-[3]',
  3: 'row-start-[4]',
  4: 'row-start-[5]',
  5: 'row-start-[6]',
  6: 'row-start-[7]',
  7: 'row-start-[8]',
  8: 'row-start-[9]',
  9: 'row-start-[10]',
  10: 'row-start-[11]',
  11: 'row-start-[12]',
  12: 'row-start-[13]',
  13: 'row-start-[14]',
  14: 'row-start-[15]',
  15: 'row-start-[16]',
  16: 'row-start-[17]',
  17: 'row-start-[18]',
  18: 'row-start-[19]',
  19: 'row-start-[20]',
  20: 'row-start-[21]',
  21: 'row-start-[22]',
  22: 'row-start-[23]',
  23: 'row-start-[24]',
  24: 'row-start-[25]',
  25: 'row-start-[26]',
  26: 'row-start-[27]',
  27: 'row-start-[28]',
  28: 'row-start-[29]',
  29: 'row-start-[30]',
  30: 'row-start-[31]',
  31: 'row-start-[32]',
  32: 'row-start-[33]',
  33: 'row-start-[34]',
  34: 'row-start-[35]',
  35: 'row-start-[36]',
  36: 'row-start-[37]',
  37: 'row-start-[38]',
  38: 'row-start-[39]',
  39: 'row-start-[40]',
  40: 'row-start-[41]',
  41: 'row-start-[42]',
  42: 'row-start-[43]',
  43: 'row-start-[44]',
  44: 'row-start-[45]',
  45: 'row-start-[46]',
  46: 'row-start-[47]',
  47: 'row-start-[48]',
} as const;

const rowSpanClasses = {
  2: 'row-end-[span_2]',
  3: 'row-end-[span_3]',
  4: 'row-end-[span_4]',
  5: 'row-end-[span_5]',
  6: 'row-end-[span_6]',
  7: 'row-end-[span_7]',
  8: 'row-end-[span_8]',
  9: 'row-end-[span_9]',
  10: 'row-end-[span_10]',
  11: 'row-end-[span_11]',
  12: 'row-end-[span_12]',
  13: 'row-end-[span_13]',
  14: 'row-end-[span_14]',
  15: 'row-end-[span_15]',
  16: 'row-end-[span_16]',
  17: 'row-end-[span_17]',
  18: 'row-end-[span_18]',
  19: 'row-end-[span_19]',
  20: 'row-end-[span_20]',
  21: 'row-end-[span_21]',
  22: 'row-end-[span_22]',
  23: 'row-end-[span_23]',
  24: 'row-end-[span_24]',
  25: 'row-end-[span_25]',
  26: 'row-end-[span_26]',
  27: 'row-end-[span_27]',
  28: 'row-end-[span_28]',
  29: 'row-end-[span_29]',
  30: 'row-end-[span_30]',
  31: 'row-end-[span_31]',
  32: 'row-end-[span_32]',
  33: 'row-end-[span_33]',
  34: 'row-end-[span_34]',
  35: 'row-end-[span_35]',
  36: 'row-end-[span_36]',
  37: 'row-end-[span_37]',
  38: 'row-end-[span_38]',
  39: 'row-end-[span_39]',
  40: 'row-end-[span_40]',
  41: 'row-end-[span_41]',
  42: 'row-end-[span_42]',
  43: 'row-end-[span_43]',
  44: 'row-end-[span_44]',
  45: 'row-end-[span_45]',
  46: 'row-end-[span_46]',
  47: 'row-end-[span_47]',
} as const;

export type CalendarEvent = {
  id: number;
  start: Date;
  end: Date;
  title: string;
  isSecondary?: boolean;
};

type Props = {
  dates: `${number}${number}${number}${number}-${number}${number}-${number}${number}`[];
  events: CalendarEvent[];
};

export function AgendaView(props: Props) {
  const timeSlotColCount = 1;

  const events = props.events.map((event) => {
    const end = dayjs(event.end);
    return {
      ...event,
      start: dayjs(event.start),
      end: end,
      isMultiDay: end.diff(event.start, 'hour') >= 24,
    };
  });

  const getEventClassNames = useCallback(
    (event: (typeof events)[number]) => {
      const previousMultiDayEvents = events.filter(
        ({ isMultiDay }, index) => isMultiDay && index < events.indexOf(event),
      );
      const previousNonMultiDayEvents = events.filter(
        ({ isMultiDay }, index) => !isMultiDay && index < events.indexOf(event),
      );
      const isOverlappingNonMultiDay =
        !event.isMultiDay &&
        previousNonMultiDayEvents.reduce(
          (isEventOverlappingPreviousEvents, otherAppointment) => {
            return (
              isEventOverlappingPreviousEvents ||
              (event.start.isBefore(dayjs(otherAppointment.end)) &&
                event.end.isAfter(dayjs(otherAppointment.start)))
            );
          },
          false,
        );

      // Disallow negative index (if date outside of range, the
      // event should start at the first date in props.dates)
      const dateIndex = Math.max(
        0,
        props.dates.findIndex((date) =>
          date.startsWith(event.start.format('YYYY-MM-DD')),
        ),
      );

      return twMerge(
        'flex max-h-full flex-col break-words rounded p-[7px_6px_5px] text-[13px] leading-[20px] no-underline transition-[background-color] hover:z-10 hover:h-min hover:max-h-none hover:min-h-full',
        colStartClasses[
          (timeSlotColCount + dateIndex) as keyof typeof colStartClasses
        ],
        event.isMultiDay &&
          colSpanClasses[
            Math.min(
              props.dates.length - dateIndex,
              event.end.diff(
                dayjs.max(event.start, dayjs(props.dates[0])),
                'days',
              ),
            ) as keyof typeof colSpanClasses
          ],
        rowStartClasses[
          (event.isMultiDay
            ? previousMultiDayEvents.reduce((rowStart, multiDayEvent) => {
                // Move the event down a row if it overlaps with a previous event
                if (
                  event.start.isBefore(dayjs(multiDayEvent.end)) &&
                  event.end.isAfter(dayjs(multiDayEvent.start))
                ) {
                  rowStart++;
                }
                return rowStart;
              }, 1)
            : Math.floor(dayjs(event.start).diff(dayjs(event.start).startOf('day'), 'minute') / 30)) as keyof typeof rowStartClasses
        ],
        !event.isMultiDay &&
          rowSpanClasses[
            Math.ceil(event.end.diff(event.start, 'minute') /
              30) as keyof typeof rowSpanClasses
          ],
        !event.isSecondary
          ? 'bg-slate-800 text-white hover:bg-indigo-900'
          : 'bg-slate-300 text-darkNavyBlue hover:bg-slate-200',
        isOverlappingNonMultiDay &&
          'w-[75%] ml-[25%] border border-white text-right z-20 hover:z-30',
      );
    },
    [props.dates, events, timeSlotColCount],
  );

  return (
    <div className="p-3 min-w-[650px]">
      <div className="grid auto-rows-[32px] grid-cols-[60px_repeat(5,_1fr)] gap-1">
        {props.dates.map((date, index) => {
          return (
            <div
              key={`date-${date}`}
              className={twMerge(
                'text-darkGray col-span-1 p-2 text-center text-[13px] text-xs',
                colStartClasses[
                  (timeSlotColCount + index) as keyof typeof colStartClasses
                ],
              )}
            >
              {dayjs(date).format('dddd')}
            </div>
          );
        })}

        {events
          .filter(({ isMultiDay }) => isMultiDay)
          .map((event) => {
            return (
              <a
                key={`event-${event.id}`}
                className={twMerge(
                  getEventClassNames(event),
                  dayjs(props.dates[0]).startOf('day').isAfter(event.start) &&
                    'rounded-l-none ',
                  dayjs(props.dates[props.dates.length - 1])
                    .add(1, 'day')
                    .startOf('day')
                    .isBefore(event.end) && 'rounded-r-none ',
                )}
              >
                {event.title}
              </a>
            );
          })}
      </div>

      <div className="mt-1 grid grid-cols-[60px_repeat(5,_1fr)] grid-rows-[repeat(17,32px)] gap-1">
        {timeSlots.map((time, index) => {
          return (
            <div
              key={`time-slot-${time}`}
              className={twMerge(
                rowStartClasses[index as keyof typeof rowStartClasses],
                'text-darkGray translate-y-[-16px] text-xs leading-[30px]',
              )}
            >
              {time.endsWith('30') ? <>&nbsp;</> : time}
            </div>
          );
        })}

        {events
          .filter((event) => {
            const hours = event.end.diff(event.start, 'hour');
            return hours < 24;
          })
          .map((event) => {
            return (
              <a
                key={`time-slot-event-${event.id}`}
                className={getEventClassNames(event)}
              >
                <div className="min-h-0 overflow-hidden">{event.title}</div>
                <div className="pt-1 text-[10px]">
                  {dayjs(event.start).format('HH:mm')} -{' '}
                  {dayjs(event.end).format('HH:mm')}
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
