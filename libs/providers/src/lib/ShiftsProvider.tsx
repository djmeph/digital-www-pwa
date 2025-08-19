'use client';
import type { Shifts, ShiftsFeed } from '@digital-www-pwa/types';
import { EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import cookies from 'js-cookie';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAuthContext } from './AuthProvider';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

dayjs.tz.setDefault(EVENT_TIMEZONE);

export const ShiftsContext = createContext<Shifts>({
  loading: true,
  shifts: [],
});

export const useShiftsContext = () => useContext(ShiftsContext);

export const ShiftsProvider = ({ children }: { children: ReactNode }) => {
  const [shifts, setShifts] = useState<Shifts>({ loading: true, shifts: [] });
  const authContext = useAuthContext();

  function processShifts(shifts: ShiftsFeed[]) {
    setShifts({
      loading: false,
      shifts: shifts.map((shift) => ({
        id: shift.id,
        department_title: shift.department_title,
        shift_title: shift.shift_title,
        shift_description: shift.shift_description,
        shift_start: dayjs.unix(shift.shift_start).tz(EVENT_TIMEZONE),
        shift_end: dayjs.unix(shift.shift_end).tz(EVENT_TIMEZONE),
        shift_location: shift.shift_location,
      })),
    });
  }

  useEffect(() => {
    async function fetchShifts() {
      const token = cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shifts`,
        {
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        processShifts(data || []);
        return;
      }
      setShifts({
        loading: false,
        shifts: [],
      });
      authContext.logout();
    }
    fetchShifts();
  }, []);

  return (
    <ShiftsContext.Provider value={shifts}>{children}</ShiftsContext.Provider>
  );
};
