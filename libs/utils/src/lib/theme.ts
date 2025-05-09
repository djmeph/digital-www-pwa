'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    currentPosition: Palette['primary'];
    alcohol: Palette['primary'];
    crafting: Palette['primary'];
    fire_art: Palette['primary'];
    food: Palette['primary'];
    red_light: Palette['primary'];
    sober: Palette['primary'];
    spectacle: Palette['primary'];
  }

  interface PaletteOptions {
    currentPosition?: PaletteOptions['primary'];
    alcohol?: PaletteOptions['primary'];
    crafting?: PaletteOptions['primary'];
    fire_art?: PaletteOptions['primary'];
    food?: PaletteOptions['primary'];
    red_light?: PaletteOptions['primary'];
    sober?: PaletteOptions['primary'];
    spectacle?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides
  {
    xxs: true;
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
  breakpoints: {
    values: {
      xxs: 0,
      xs: 420,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "@media print": {
            boxShadow: 'none',
            breakInside: 'avoid',
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          "@media print": {
            padding: 0,
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "@media print": {
            padding: 0,
          }
        }
      }
    },
  },
  palette: {
    primary: base.palette.augmentColor({ color: base.palette.primary }),
    secondary: base.palette.augmentColor({ color: base.palette.secondary }),
    currentPosition: base.palette.augmentColor({
      color: {
        main: '#0288d1',
      },
    }),
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
