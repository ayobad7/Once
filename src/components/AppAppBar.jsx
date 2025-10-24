// src/components/AppAppBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useScrollTrigger } from '@mui/material';
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

  // Define semi-transparent colors for light and dark modes
  const appBarBgColor = currentMode === 'dark'
    ? trigger ? 'rgba(30, 30, 30, 0.8)' : 'rgba(30, 30, 30, 0.5)' // Dark mode colors
    : trigger ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'; // Light mode colors

  // Define text color based on mode
  const appBarTextColor = currentMode === 'dark' ? 'inherit' : 'inherit'; // Use theme's default text color for inherit, or specify explicitly if needed

  return (
    <AppBar
      position="fixed"
      color="default" // Keep color="default" or "transparent" if needed, let sx override
      elevation={trigger ? 4 : 0} // Add shadow when scrolled
      sx={{
        backgroundColor: appBarBgColor, // Apply the semi-transparent color based on mode and scroll
        backdropFilter: 'blur(10px)', // Blur effect for glass-like appearance
        borderRadius: 2, // Rounded corners for the app bar
        mx: 2, // Margin on x-axis for floating effect
        my: 2, // Margin on y-axis for floating effect
        boxShadow: trigger ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none', // Adjust shadow opacity for light mode
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color={appBarTextColor} noWrap sx={{ flexGrow: 1 }}>
          Sitemark
        </Typography>
        <nav>
          <Box sx={{ my: 1, mx: 1.5 }}>
            <Button variant="text" color={appBarTextColor}>
              Features
            </Button>
            <Button variant="text" color={appBarTextColor}>
              Testimonials
            </Button>
            <Button variant="text" color={appBarTextColor}>
              Highlights
            </Button>
            <Button variant="text" color={appBarTextColor}>
              Pricing
            </Button>
            <Button variant="text" color={appBarTextColor}>
              FAQ
            </Button>
            <Button variant="text" color={appBarTextColor}>
              Blog
            </Button>
          </Box>
        </nav>
        <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} color={appBarTextColor}>
          Sign in
        </Button>
        <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }} color={appBarTextColor}>
          Sign up
        </Button>
        {/* Dark/Light Mode Toggle Button */}
        <Button
          onClick={onToggleTheme}
          color={appBarTextColor} // Use theme text color for the button
          sx={{ my: 1, mx: 1.5 }}
          startIcon={currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        >
          {currentMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppAppBar;
