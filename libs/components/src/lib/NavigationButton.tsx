'use client';
import type { NavigationLink } from '@digital-www-pwa/types';
import Button from '@mui/material/Button';
import RouterLink from 'next/link';

export function NavigationButton({ linkData }: { linkData: NavigationLink }) {
  const getAnimation = () => {
    if (linkData.path === '/now') {
      return 'breathing 1800ms alternate infinite';
    }

    return null;
  };

  return (
    <Button
      component={RouterLink}
      href={linkData.path}
      sx={{
        '@keyframes breathing': {
          '0%': {
            scale: 1.03,
          },
          '100%': {
            scale: 0.98,
          },
        },
        width: '100%',
        height: '100%',
        padding: 2,
        animation: getAnimation(),
      }}
      color="secondary"
    >
      {linkData.title}
    </Button>
  );
}
