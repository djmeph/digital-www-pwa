'use client';
import { useShiftsContext } from '@digital-www-pwa/providers';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import { ShiftCard } from './ShiftCard';

export function ShiftsView() {
  const shiftsContext = useShiftsContext();
  const upcomingShifts = shiftsContext.shifts.filter((shift) =>
    shift.shift_end.isAfter(new Date())
  );

  if (shiftsContext.loading) {
    return <LinearProgress />;
  }

  if (upcomingShifts.length > 0) {
    return upcomingShifts.map((shift) => <ShiftCard shift={shift} />);
  }

  return (
    <Typography sx={{ color: 'text.primary' }}>
      No Upcoming Volunteer Shifts
    </Typography>
  );
}
