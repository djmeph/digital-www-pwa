'use client';
import { EVENT_DAYS } from '@digital-www-pwa/utils';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Dispatch, SetStateAction } from 'react';

interface SelectDayTabBarProps {
  selectedDay: string;
  setSelectedDay: Dispatch<SetStateAction<string>>;
  id?: string;
}

export function SelectDayTabBar({
  selectedDay,
  setSelectedDay,
  ...props
}: SelectDayTabBarProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={selectedDay}
        onChange={(e, newValue) => setSelectedDay(newValue)}
        aria-label="Select day of week"
        variant="scrollable"
        allowScrollButtonsMobile
        {...props}
      >
        {EVENT_DAYS.map((day) => (
          <Tab key={day} label={day} value={day} />
        ))}
      </Tabs>
    </Box>
  );
}
