'use client';
import { AppBar, BackToTopButton } from '@digital-www-pwa/components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: 'relative',

        '&::before': {
          content: '""',
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          maxWidth: '800px',
          zIndex: '-1000',
          backgroundImage: "url('/background.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          backgroundPositionX: 'center',
          backgroundPositionY: 'bottom',
          filter: 'blur(0.8px)',
          opacity: 0.8,
        },
      }}
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
  );
}
