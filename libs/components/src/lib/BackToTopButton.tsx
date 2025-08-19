'use client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { usePathname } from 'next/navigation';
import { useState, useLayoutEffect } from 'react';

export function BackToTopButton() {
  const theme = useTheme();
  const pathname = usePathname();
  const [lastScroll, setLastScroll] = useState<number | null>(null);
  const scrolledDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  useLayoutEffect(() => {
    if (scrolledDown) {
      setLastScroll(null);
    }
  }, [scrolledDown]);

  useLayoutEffect(() => {
    setLastScroll(null);
  }, [pathname]);

  const handleClick = () => {
    if (lastScroll) {
      setLastScroll(null);
      window.scroll({ top: lastScroll, behavior: 'smooth' });
    } else {
      setLastScroll(window.scrollY);
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  };

  const biggerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const fabSpacing = theme.spacing(biggerScreen ? 4 : 2);
  const fabSize = biggerScreen ? 'medium' : 'small';

  return (
    <Fade in={scrolledDown || lastScroll !== null}>
      <Fab
        size={fabSize}
        sx={{
          position: 'fixed',
          bottom: fabSpacing,
          right: fabSpacing,
          '@media print': {
            display: 'none',
          },
        }}
        onClick={handleClick}
      >
        {lastScroll ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Fab>
    </Fade>
  );
}
