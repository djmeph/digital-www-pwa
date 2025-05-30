'use client';
import { useShiftsContext } from '@digital-www-pwa/providers';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

import { ShiftCard } from './ShiftCard';

export function ShiftView({ id }: { id: string }) {
  const shiftsContext = useShiftsContext();

  const shift = shiftsContext.shifts.find((shift) => shift.id === id);

  if (shiftsContext.loading) {
    return <LinearProgress />;
  }

  if (shift) {
    return (
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component={NextLink}
            underline="hover"
            color="inherit"
            href={`/volunteer-shifts`}
          >
            Volunteer Shifts
          </Link>
          <Typography sx={{ color: 'text.primary' }}>
            {shift.shift_title}
          </Typography>
        </Breadcrumbs>
        <ShiftCard shift={shift} />
      </>
    );
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href={`/volunteer-shifts`}>
        Volunteer Shifts
      </Link>
      <Typography sx={{ color: 'text.primary' }}>Not Found</Typography>
    </Breadcrumbs>
  );
}
