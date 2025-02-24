'use client';
import { createTheme } from '@mui/material/styles';

const base = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#ef4137',
    },
    secondary: {
      main: '#f7931e',
    },
  },
});

export const theme = createTheme(base, {
  cssVariables: true,
  palette: {
    alcohol: base.palette.augmentColor({
      color: {
        main: '#95A5A6',
      },
    }),
    crafting: base.palette.augmentColor({
      color: {
        main: '#9C27B0',
      },
    }),
    fire_art: base.palette.augmentColor({
      color: {
        main: '#FF5722',
      },
    }),
    food: base.palette.augmentColor({
      color: {
        main: '#03A9F4',
      },
    }),
    red_light: base.palette.augmentColor({
      color: {
        main: '#F10000',
      },
    }),
    sober: base.palette.augmentColor({
      color: {
        main: '#8BC34A',
      },
    }),
    spectacle: base.palette.augmentColor({
      color: {
        main: '#F1C40F',
      },
    }),
  },
});
