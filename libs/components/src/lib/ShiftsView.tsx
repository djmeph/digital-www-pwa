'use client';
import { useShiftsContext } from '@digital-www-pwa/providers';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ShiftCard } from './ShiftCard';

export function ShiftsView() {
  const shiftsContext = useShiftsContext();
  const upcomingShifts = shiftsContext.shifts.filter(
    (shift) => shift.shift_end.isAfter(new Date()) || true
  );

  if (shiftsContext.loading) {
    return <LinearProgress />;
  }

  if (upcomingShifts.length > 0) {
    return (
      <Stack spacing={2}>
        {upcomingShifts.map((shift) => (
          <ShiftCard shift={shift} />
        ))}
      </Stack>
    );
  }

  return (
    <Typography variant="h3" sx={{ color: 'text.primary' }}>
      No Upcoming Volunteer Shifts
    </Typography>
  );
}
