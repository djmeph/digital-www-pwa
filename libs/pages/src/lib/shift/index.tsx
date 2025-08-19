'use client';
import { Header, ShiftView } from '@digital-www-pwa/components';
import { ShiftsProvider, useAuthContext } from '@digital-www-pwa/providers';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router';

export function ShiftPage() {
  const { id } = useParams();
  const theme = useTheme();
  const authContext = useAuthContext();
  const queryParams = new URLSearchParams({
    redirect_target: `/shift/${id}`,
  });

  if (authContext.checking || !id) {
    return (
      <>
        <Header>{'Volunteer Shifts'}</Header>
        <LinearProgress />
      </>
    );
  }

  if (authContext.isAuthenticated) {
    return (
      <ShiftsProvider>
        <Header>{'Volunteer Shifts'}</Header>
        <ShiftView id={id} />
      </ShiftsProvider>
    );
  }
  return (
    <>
      <Header>{'Volunteer Shifts'}</Header>
      <Button
        href={`${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/login?${queryParams.toString()}`}
        onClick={authContext.enableBackdrop}
        sx={{
          margin: 2,
          padding: 1,
          position: 'sticky',
          top: theme.spacing(9),
          display: 'flex',
          backgroundColor: theme.palette.background.default,
          [theme.breakpoints.down('xs')]: {
            fontSize: '4.5vw',
          },
        }}
        variant="outlined"
        color="primary"
      >
        Login to Volunteeripate to view your upcoming shifts
      </Button>
    </>
  );
}
