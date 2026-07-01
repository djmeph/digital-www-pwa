'use client';
import { AppBar, BackToTopButton } from '@digital-www-pwa/components';
import { useAuthContext } from '@digital-www-pwa/providers';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

export function AppShell({ children }: { children: React.ReactNode }) {
  const authContext = useAuthContext();
  return (
    <>
      <Box
        sx={(theme) => ({
          color: theme.palette.text.primary,
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <AppBar />
        <Container
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          {children}
          <BackToTopButton />
        </Container>
      </Box>
      <Backdrop
        sx={(theme) => ({
          color: theme.palette.text.primary,
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={authContext.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
