import { createTheme, alpha } from '@mui/material/styles';

const PRIMARY = {
  lighter: '#E0F7FF',
  light: '#80DEEA',
  main: '#00B8D9',
  dark: '#0088A3',
  darker: '#006577',
};

const SECONDARY = {
  lighter: '#F2E7FE',
  light: '#B388FF',
  main: '#7C4DFF',
  dark: '#5831B9',
  darker: '#3B1F80',
};

const SUCCESS = {
  lighter: '#E6FEF5',
  light: '#86E8AB',
  main: '#36B37E',
  dark: '#1B806A',
  darker: '#0A5554',
};

const WARNING = {
  lighter: '#FFF8E6',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
};

const ERROR = {
  lighter: '#FFE9E9',
  light: '#FFA3A3',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F7F9FC',
  200: '#EDF2F7',
  300: '#E2E8F0',
  400: '#CBD5E0',
  500: '#A0AEC0',
  600: '#718096',
  700: '#4A5568',
  800: '#2F343A',
  900: '#1A1D23',
};

const createCustomTheme = (mode) => {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      warning: WARNING,
      error: ERROR,
      grey: GREY,
      text: {
        primary: isLight ? GREY[800] : GREY[100],
        secondary: isLight ? GREY[600] : GREY[300],
        disabled: isLight ? GREY[500] : GREY[400],
      },
      background: {
        paper: isLight ? '#fff' : GREY[800],
        default: isLight ? '#fff' : GREY[900],
        neutral: isLight ? GREY[200] : GREY[700],
      },
      action: {
        active: isLight ? GREY[600] : GREY[300],
        hover: alpha(GREY[500], 0.08),
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
      },
      divider: alpha(GREY[500], 0.2),
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 800,
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 700,
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 700,
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        lineHeight: 1.5,
      },
      subtitle1: {
        lineHeight: 1.5,
        fontSize: '1rem',
      },
      subtitle2: {
        lineHeight: 1.5,
        fontSize: '0.875rem',
      },
      body1: {
        lineHeight: 1.5,
        fontSize: '1rem',
      },
      body2: {
        lineHeight: 1.5,
        fontSize: '0.875rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 1px 2px rgba(0, 0, 0, 0.08)',
      '0px 1px 5px rgba(0, 0, 0, 0.08)',
      '0px 1px 8px rgba(0, 0, 0, 0.08)',
      '0px 1px 10px rgba(0, 0, 0, 0.08)',
      '0px 2px 4px -1px rgba(0, 0, 0, 0.08), 0px 4px 5px rgba(0, 0, 0, 0.08)',
      '0px 3px 5px -1px rgba(0, 0, 0, 0.08), 0px 5px 8px rgba(0, 0, 0, 0.08)',
      '0px 3px 5px -1px rgba(0, 0, 0, 0.08), 0px 6px 10px rgba(0, 0, 0, 0.08)',
      '0px 4px 5px -2px rgba(0, 0, 0, 0.08), 0px 7px 10px 1px rgba(0, 0, 0, 0.08)',
      '0px 5px 6px -3px rgba(0, 0, 0, 0.08), 0px 9px 12px 1px rgba(0, 0, 0, 0.08)',
      '0px 6px 7px -4px rgba(0, 0, 0, 0.08), 0px 11px 15px 1px rgba(0, 0, 0, 0.08)',
      '0px 7px 8px -4px rgba(0, 0, 0, 0.08), 0px 13px 19px 2px rgba(0, 0, 0, 0.08)',
      '0px 8px 9px -5px rgba(0, 0, 0, 0.08), 0px 15px 22px 2px rgba(0, 0, 0, 0.08)',
      '0px 9px 11px -5px rgba(0, 0, 0, 0.08), 0px 17px 26px 2px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.08)',
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: 'none',
            },
          },
          sizeLarge: {
            height: 48,
          },
          containedInherit: {
            color: isLight ? GREY[800] : GREY[0],
            '&:hover': {
              backgroundColor: isLight ? GREY[400] : GREY[700],
            },
          },
          outlinedInherit: {
            border: `1px solid ${alpha(GREY[500], 0.32)}`,
            '&:hover': {
              backgroundColor: alpha(GREY[500], 0.08),
            },
          },
          textInherit: {
            '&:hover': {
              backgroundColor: alpha(GREY[500], 0.08),
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 16,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: `0px 0px 2px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24)`,
            borderRadius: 16,
            position: 'relative',
            zIndex: 0,
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: 'h6' },
          subheaderTypographyProps: { variant: 'body2' },
        },
        styleOverrides: {
          root: {
            padding: '24px',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '24px',
          },
        },
      },
    },
  });
};

export default createCustomTheme;
