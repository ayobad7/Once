// src/theme.js
import { createTheme } from '@mui/material/styles';

// --- Define Color Palettes based on MUI Blog Template ---
const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

// Helper function to create alpha (transparency) colors
function alpha(color, opacity) {
  if (color.startsWith('hsl')) {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      const h = match[1];
      const s = match[2];
      const l = match[3];
      return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
    }
  }
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      const fullHex = hex
        .split('')
        .map((char) => char + char)
        .join('');
      return `#${fullHex}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`;
    } else if (hex.length === 6) {
      return `#${hex}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`;
    }
  }
  return color;
}

// Define Themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: brand[200],
      main: brand[400],
      dark: brand[700],
      contrastText: brand[50],
    },
    background: {
      default: 'hsl(0, 0%, 99%)',
      paper: 'hsl(220, 35%, 97%)', // Light template paper background
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
    },
    divider: alpha(gray[300], 0.4),
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 600,
    },
  },
  // --- Set the default border radius for the theme ---
  shape: {
    borderRadius: 10, // Sets default border radius to 20px (8 default)
  },
  // --- Add Component Customizations ---
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
          borderRadius: (theme.vars || theme).shape.borderRadius, // Use the updated default
          textTransform: 'none',
          variants: [
            {
              props: { variant: 'outlined' },
              style: {
                color: (theme.vars || theme).palette.text.primary,
                border: '1px solid',
                borderColor: gray[200],
                backgroundColor: alpha(gray[50], 0.3),
                '&:hover': {
                  backgroundColor: gray[100],
                  borderColor: gray[300],
                },
                '&:active': {
                  backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                  backgroundColor: gray[800],
                  borderColor: gray[700],
                  '&:hover': {
                    backgroundColor: gray[900],
                    borderColor: gray[600],
                  },
                  '&:active': {
                    backgroundColor: gray[900],
                  },
                }),
              },
            },
            {
              props: { variant: 'text' },
              style: {
                color: gray[600],
                '&:hover': {
                  backgroundColor: gray[100],
                },
                '&:active': {
                  backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                  color: gray[50],
                  '&:hover': {
                    backgroundColor: gray[700],
                  },
                  '&:active': {
                    backgroundColor: alpha(gray[700], 0.7),
                  },
                }),
              },
            },
          ],
        }),
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          borderRadius: '999px', // Pill shape
          [`& .${'MuiChip-label'}`]: {
            // Note: Using string literal for class name
            fontWeight: 600,
          },
          variants: [
            {
              props: { color: 'default' },
              style: {
                borderColor: gray[200],
                backgroundColor: gray[100],
                [`& .${'MuiChip-label'}`]: { color: gray[500] },
                [`& .${'MuiChip-icon'}`]: { color: gray[500] },
                ...theme.applyStyles('dark', {
                  borderColor: gray[700],
                  backgroundColor: gray[800],
                  [`& .${'MuiChip-label'}`]: { color: gray[300] },
                  [`& .${'MuiChip-icon'}`]: { color: gray[300] },
                }),
              },
            },
          ],
        }),
      },
    },
    // --- Add Card Border Radius Customization ---
    MuiCard: {
      styleOverrides: {
        root: {
          // Explicitly set borderRadius to the theme's default (which is now 20)
          borderRadius: (theme) => theme.shape.borderRadius,
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      contrastText: brand[50],
      light: brand[300],
      main: brand[400],
      dark: brand[700],
    },
    background: {
      default: gray[900],
      paper: gray[900], // Match background and paper color in dark mode
    },
    text: {
      primary: 'hsl(0, 0%, 100%)',
      secondary: gray[400],
    },
    divider: alpha(gray[700], 0.6),
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 600,
    },
  },
  // --- Set the default border radius for the theme ---
  shape: {
    borderRadius: 10, // Sets default border radius to 20px (8 default)
  },
  // --- Add Component Customizations ---
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
          borderRadius: (theme.vars || theme).shape.borderRadius, // Use the updated default
          textTransform: 'none',
          variants: [
            {
              props: { variant: 'outlined' },
              style: {
                color: (theme.vars || theme).palette.text.primary,
                border: '1px solid',
                borderColor: gray[200],
                backgroundColor: alpha(gray[50], 0.3),
                '&:hover': {
                  backgroundColor: gray[100],
                  borderColor: gray[300],
                },
                '&:active': {
                  backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                  backgroundColor: gray[800],
                  borderColor: gray[700],
                  '&:hover': {
                    backgroundColor: gray[900],
                    borderColor: gray[600],
                  },
                  '&:active': {
                    backgroundColor: gray[900],
                  },
                }),
              },
            },
            {
              props: { variant: 'text' },
              style: {
                color: gray[600],
                '&:hover': {
                  backgroundColor: gray[100],
                },
                '&:active': {
                  backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                  color: gray[50],
                  '&:hover': {
                    backgroundColor: gray[700],
                  },
                  '&:active': {
                    backgroundColor: alpha(gray[700], 0.7),
                  },
                }),
              },
            },
          ],
        }),
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          borderRadius: '999px', // Pill shape
          [`& .${'MuiChip-label'}`]: {
            // Note: Using string literal for class name
            fontWeight: 600,
          },
          variants: [
            {
              props: { color: 'default' },
              style: {
                borderColor: gray[200],
                backgroundColor: gray[100],
                [`& .${'MuiChip-label'}`]: { color: gray[500] },
                [`& .${'MuiChip-icon'}`]: { color: gray[500] },
                ...theme.applyStyles('dark', {
                  borderColor: gray[700],
                  backgroundColor: gray[800],
                  [`& .${'MuiChip-label'}`]: { color: gray[300] },
                  [`& .${'MuiChip-icon'}`]: { color: gray[300] },
                }),
              },
            },
          ],
        }),
      },
    },
    // --- Add Card Border Radius Customization ---
    MuiCard: {
      styleOverrides: {
        root: {
          // Explicitly set borderRadius to the theme's default (which is now 20)
          borderRadius: (theme) => theme.shape.borderRadius,
        },
      },
    },
  },
});

export { darkTheme, lightTheme };
