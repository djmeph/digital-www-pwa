'use client';
import { Header, ShiftView } from '@digital-www-pwa/components';
import { ShiftsProvider, useAuthContext } from '@digital-www-pwa/providers';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';

export function ShiftPage({ id }: { id: string }) {
  const theme = useTheme();
  const auth = useAuthContext();

  if (auth.checking) {
    return (
      <>
        <Header>{'Volunteer Shifts'}</Header>
        <LinearProgress />
      </>
    );
  }

  if (auth.isAuthenticated) {
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
        href={'/api/login'}
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
