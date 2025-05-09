'use client';
import { EVENT_START, EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(EVENT_TIMEZONE);

export function EventCountdown() {
  const theme = useTheme();
  const tinyScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [currentTime, setCurrentTime] = useState(dayjs());

  const updateTime = () => setCurrentTime(dayjs());

  useEffect(() => {
    const interval = setInterval(updateTime, 1000)
    return () => {
      clearInterval(interval);
    }
  }, []);

  let difference = Math.max(0, EVENT_START.diff(currentTime, 'seconds'));
  const days = Math.floor(difference / 60 / 60 / 24);
  difference -= days * 60 * 60 * 24;
  const hours = Math.floor(difference / 60 / 60);
  difference -= hours * 60 * 60;
  const minutes = Math.floor(difference / 60);
  difference -= minutes * 60;
  const seconds = difference;

  return (
    <Stack direction="row" justifyContent="space-around" spacing={2}>
      <Typography variant="h5">{days} days</Typography>
      <Typography variant="h5">{hours} hours</Typography>
      <Typography variant="h5">{minutes} {tinyScreen ? 'min' : 'minutes'}</Typography>
      <Typography variant="h5">{seconds} {tinyScreen ? 'sec' : 'seconds'}</Typography>
    </Stack>
  );
}
