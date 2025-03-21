'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    alcohol: Palette['primary'];
    crafting: Palette['primary'];
    fire_art: Palette['primary'];
    food: Palette['primary'];
    red_light: Palette['primary'];
    sober: Palette['primary'];
    spectacle: Palette['primary'];
  }

  interface PaletteOptions {
    alcohol?: PaletteOptions['primary'];
    crafting?: PaletteOptions['primary'];
    fire_art?: PaletteOptions['primary'];
    food?: PaletteOptions['primary'];
    red_light?: PaletteOptions['primary'];
    sober?: PaletteOptions['primary'];
    spectacle?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    alcohol: true;
    crafting: true;
    fire_art: true;
    food: true;
    red_light: true;
    sober: true;
    spectacle: true;
  }
}

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
    primary: base.palette.augmentColor({ color: base.palette.primary }),
    secondary: base.palette.augmentColor({ color: base.palette.secondary }),
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
