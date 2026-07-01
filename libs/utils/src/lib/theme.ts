'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
    tertiary: Palette['primary'];
    currentPosition: Palette['primary'];
    alcohol: Palette['primary'];
    crafting: Palette['primary'];
    fire_art: Palette['primary'];
    food: Palette['primary'];
    red_light: Palette['primary'];
    sober: Palette['primary'];
    spectacle: Palette['primary'];
    kid_friendly: Palette['primary'];
  }

  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
    tertiary?: PaletteOptions['primary'];
    currentPosition?: PaletteOptions['primary'];
    alcohol?: PaletteOptions['primary'];
    crafting?: PaletteOptions['primary'];
    fire_art?: PaletteOptions['primary'];
    food?: PaletteOptions['primary'];
    red_light?: PaletteOptions['primary'];
    sober?: PaletteOptions['primary'];
    spectacle?: PaletteOptions['primary'];
    kid_friendly?: PaletteOptions['primary'];
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
    kid_friendly: true;
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
    fontFamily: 'Quattrocento',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#cd2a22',
    },
    secondary: {
      main: '#f23228',
    },
    tertiary: {
      main: '#f23228',
    },
    highlight: {
      main: '#cd2a22',
    },
    text: {
      primary: '#000000',
    },
    background: {
      default: '#FBCA8E',
    },
  },
});

export const theme = responsiveFontSizes(
  createTheme(base, {
    cssVariables: true,
    palette: {
      mode: 'light',
      primary: base.palette.augmentColor({ color: base.palette.primary }),
      secondary: base.palette.augmentColor({ color: base.palette.secondary }),
      highlight: base.palette.augmentColor({ color: base.palette.highlight }),
      tertiary: base.palette.augmentColor({ color: base.palette.tertiary }),
      currentPosition: base.palette.augmentColor({
        color: {
          main: '#0288d1',
        },
      }),
      alcohol: base.palette.augmentColor({
        color: {
          main: '#003F91',
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
          main: '#297045',
        },
      }),
      spectacle: base.palette.augmentColor({
        color: {
          main: '#564787',
        },
      }),
      kid_friendly: base.palette.augmentColor({
        color: {
          main: '#101935',
        },
      }),
    },
    typography: {
      h1: {
        fontFamily: 'Optimus Princeps',
      },
      h2: {
        fontFamily: 'Optimus Princeps',
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
            background: `linear-gradient(0deg, ${base.palette.highlight.main}00, ${base.palette.highlight.main}FF 60%)`,
            '@media print': {
              display: 'none',
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            color: base.palette.text.primary,
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
            fontFamily: 'Optimus Princeps Semi Bold',
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
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: base.palette.background.default,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: base.palette.text.primary,
            fontSize: '1rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            opacity: 0.85,
            padding: base.spacing(2),
            border: 'solid 1px',
            borderColor: base.palette.text.primary,
            borderRadius: base.shape.borderRadius * 3,
            color: base.palette.text.primary,
            '@media print': {
              padding: 0,
              opacity: 1,
              boxShadow: 'none',
              breakInside: 'avoid',
              border: 'none',
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: 0,
          },
          title: {
            fontFamily: 'Optimus Princeps Semi Bold',
          },
          subheader: {
            color: base.palette.highlight.main,
            fontWeight: 'bold',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: 0,
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
