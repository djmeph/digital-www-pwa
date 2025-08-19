'use client';
import { Header, ShiftsView } from '@digital-www-pwa/components';
import { ShiftsProvider, useAuthContext } from '@digital-www-pwa/providers';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';

export function ShiftsPage() {
  const theme = useTheme();
  const authContext = useAuthContext();
  const queryParams = new URLSearchParams({
    redirect_target: '/volunteer-shifts',
  });

  if (authContext.checking) {
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
        <ShiftsView />
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
          textWrap: 'wrap',
          textAlign: 'center',
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
