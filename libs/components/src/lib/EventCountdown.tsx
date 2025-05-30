'use client';
import { EVENT_START, EVENT_TIMEZONE } from '@digital-www-pwa/utils';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState, useEffect } from 'react';
import { FlapDisplay } from 'react-split-flap-effect';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(EVENT_TIMEZONE);

const COUNTDOWN_CHARS = '9876543210';

const renderDigits = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Stack direction="row" sx={{ border: 2 }}>
      {children.map((child) => (
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            padding: 1,
          }}
        >
          {child}
        </Box>
      ))}
    </Stack>
  );
};

const FLAP_PROPS = {
  chars: COUNTDOWN_CHARS,
  padChar: '0',
  render: renderDigits,
};

export function EventCountdown() {
  const theme = useTheme();
  const tinyScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [currentTime, setCurrentTime] = useState(dayjs());

  const updateTime = () => setCurrentTime(dayjs());

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
    };
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
    <Stack
      direction="row"
      justifyContent="space-around"
      spacing={2}
      sx={{
        textTransform: 'uppercase',
        '&  [data-kind="digit"]': {
          color: 'text.primary',
          fontWeight: 'bold',
          fontSize: tinyScreen ? 24 : 36,
          backgroundColor: theme.palette.background.default,
          marginBottom: '-0.4em',
        },
      }}
    >
      <Stack direction="column">
        <FlapDisplay {...FLAP_PROPS} length={3} value={days.toString()} />
        days
      </Stack>
      <Stack direction="column">
        <FlapDisplay {...FLAP_PROPS} length={2} value={hours.toString()} />
        hours
      </Stack>
      <Stack direction="column">
        <FlapDisplay {...FLAP_PROPS} length={2} value={minutes.toString()} />
        {tinyScreen ? 'min' : 'minutes'}
      </Stack>
      <Stack direction="column">
        <FlapDisplay {...FLAP_PROPS} length={2} value={seconds.toString()} />
        {tinyScreen ? 'sec' : 'seconds'}
      </Stack>
    </Stack>
  );
}
