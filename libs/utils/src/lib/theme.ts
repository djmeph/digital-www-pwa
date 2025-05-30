'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
    sky: Palette['primary'];
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
    highlight?: PaletteOptions['primary'];
    sky?: PaletteOptions['primary'];
    currentPosition?: PaletteOptions['primary'];
    alcohol?: PaletteOptions['primary'];
    crafting?: PaletteOptions['primary'];
    fire_art?: PaletteOptions['primary'];
    food?: PaletteOptions['primary'];
    red_light?: PaletteOptions['primary'];
    sober?: PaletteOptions['primary'];
    spectacle?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
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
      xs: 480,
      sm: 568,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#e32a36',
    },
    secondary: {
      main: '#1c1c4d',
    },
    highlight: {
      main: '#FF9219',
    },
    text: {
      primary: '#f5c991',
    },
    sky: {
      main: '#193058',
    },
    background: {
      default: '#191031',
    },
  },
});

export const theme = responsiveFontSizes(
  createTheme(base, {
    cssVariables: true,
    palette: {
      mode: 'dark',
      primary: base.palette.augmentColor({ color: base.palette.primary }),
      secondary: base.palette.augmentColor({ color: base.palette.secondary }),
      highlight: base.palette.augmentColor({ color: base.palette.highlight }),
      sky: base.palette.augmentColor({ color: base.palette.sky }),
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
    typography: {
      h1: {
        fontFamily: 'Cinzel',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            '@media print': {
              color: '#000',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'inherit',
            textDecoration: 'none',
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          position: 'sticky',
          elevation: 0,
        },
        styleOverrides: {
          root: {
            background: `linear-gradient(0deg, ${base.palette.sky.main}00, ${base.palette.sky.main}FF 60%)`,
            '@media print': {
              display: 'none',
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            paddingLeft: '24px',
            paddingRight: '24px',
            [base.breakpoints.down('md')]: {
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
        styleOverrides: {
          root: {
            display: 'flex',
            border: 'solid 3px',
            borderColor: base.palette.text.primary,
            borderRadius: base.shape.borderRadius * 3,
            padding: base.spacing(2),
            opacity: 0.85,
            color: base.palette.text.primary,
            fontFamily: 'Cinzel',
            fontSize: '1.5rem',
            textWrap: 'nowrap',
            '@media print': {
              background: 'none',
              opacity: 1,
              color: '#000',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            opacity: 0.85,
            '@media print': {
              opacity: 1,
              boxShadow: 'none',
              breakInside: 'avoid',
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            '@media print': {
              padding: 0,
            },
          },
          title: {
            fontFamily: 'Cinzel',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            '@media print': {
              padding: 0,
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            opacity: 0.9,
            '@media print': {
              display: 'none',
            },
          },
        },
      },
    },
  })
);
