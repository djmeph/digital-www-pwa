'use client';
import { useShiftsContext } from '@digital-www-pwa/providers';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

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
            Upcoming Shifts
          </Link>
          <Typography sx={{ color: 'text.primary' }}>
            {shift.shift_title}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h2">{shift.shift_title}</Typography>
        <Typography variant="h5">{`${shift.shift_start.format(
          'dddd LT'
        )} - ${shift.shift_end.format('LT')}`}</Typography>
        <Typography variant="h6">{shift.department_title}</Typography>
        <Card>
          <CardContent>{shift.shift_description}</CardContent>
        </Card>
      </>
    );
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href={`/volunteer-shifts`}>
        Upcoming Shifts
      </Link>
      <Typography sx={{ color: 'text.primary' }}>Not Found</Typography>
    </Breadcrumbs>
  );
}
