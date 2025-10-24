// src/components/AppAppBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useScrollTrigger, Container } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { useTheme } from '@mui/material/styles'; // Use useTheme hook to get current theme

function AppAppBar({ onToggleTheme }) { // Accept onToggleTheme prop
  const theme = useTheme(); // Use useTheme hook to get current theme object
  const currentMode = theme.palette.mode; // Get the current mode from the theme
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // Define semi-transparent colors for light and dark modes, considering the blur effect
  // These colors are based on the theme's background and text colors for better integration
  const appBarBgColor = currentMode === 'dark'
    ? `rgba(${theme.palette.background.defaultChannel || '30, 30, 30'}, 0.4)` // Use theme channel if available, fallback to rgba(30,30,30, 0.4)
    : `rgba(${theme.palette.background.defaultChannel || '255, 255, 255'}, 0.4)`; // Use theme channel if available, fallback to rgba(255,255,255, 0.4)

  // Define border color based on mode
  const appBarBorderColor = currentMode === 'dark'
    ? theme.palette.divider // Use theme divider color for dark mode
    : theme.palette.divider; // Use theme divider color for light mode

  // Define shadow based on mode and scroll
  const appBarShadow = trigger
    ? (theme.vars || theme).shadows[1] // Use theme shadow when scrolled
    : 'none'; // No shadow when at top

  return (
    <AppBar
      position="fixed"
      color="default"
      enableColorOnDark // Enable color adjustments for dark mode
      sx={{
        boxShadow: 0, // Remove default AppBar shadow
        bgcolor: 'transparent', // Make AppBar background transparent
        backgroundImage: 'none', // Ensure no background image
        mt: '28px', // Add top margin if needed, adjust value as necessary
        // Optional: Add margin to center if needed, but Container usually handles width
        // mx: 'auto',
      }}
    >
      <Container maxWidth="lg"> {/* Constrain width like HomePage */}
        <Toolbar
          variant="dense" // Use dense variant if desired
          disableGutters // Disable default gutters if you want full control
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`, // Apply rounded corners
            backdropFilter: 'blur(24px)', // Apply blur effect
            border: '1px solid', // Add border
            borderColor: appBarBorderColor, // Use dynamic border color
            backgroundColor: appBarBgColor, // Use dynamic semi-transparent background color
            boxShadow: appBarShadow, // Use dynamic shadow
            padding: '8px 12px', // Adjust padding as needed
            // Optional: Add margin if needed within the container
            // mx: 2,
            // my: 2,
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Sitemark
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="inherit" size="small">
                Features
              </Button>
              <Button variant="text" color="inherit" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="inherit" size="small">
                Highlights
              </Button>
              <Button variant="text" color="inherit" size="small">
                Pricing
              </Button>
              <Button variant="text" color="inherit" size="small" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant="text" color="inherit" size="small" sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button variant="outlined" color="inherit" size="small" sx={{ my: 1, mx: 1.5 }}>
              Sign in
            </Button>
            <Button variant="contained" color="inherit" size="small" sx={{ my: 1, mx: 1.5 }}>
              Sign up
            </Button>
            {/* Dark/Light Mode Toggle Button */}
            <Button
              onClick={onToggleTheme}
              color="inherit"
              size="small" // Match button size
              sx={{ my: 1, mx: 1.5 }}
              startIcon={currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            >
              {currentMode === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </Box>
          {/* Mobile menu button would go here if needed */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppAppBar;
