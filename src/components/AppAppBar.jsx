// src/components/AppAppBar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useScrollTrigger,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { useTheme } from '@mui/material/styles'; // Use useTheme hook to get current theme

function AppAppBar({ onToggleTheme }) {
  // Accept onToggleTheme prop
  const theme = useTheme(); // Use useTheme hook to get current theme object
  const currentMode = theme.palette.mode; // Get the current mode from the theme
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      position='fixed'
      color='default'
      elevation={trigger ? 4 : 0} // Add shadow when scrolled
      sx={{
        backgroundColor: trigger
          ? 'rgba(30, 30, 30, 0.8)'
          : 'rgba(30, 30, 30, 0.5)', // Semi-transparent background
        backdropFilter: 'blur(10px)', // Blur effect for glass-like appearance
        borderRadius: 2, // Rounded corners for the app bar
        mx: 2, // Margin on x-axis for floating effect
        my: 2, // Margin on y-axis for floating effect
        boxShadow: trigger ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none', // Add shadow when scrolled
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Sitemark
        </Typography>
        <nav>
          <Box sx={{ my: 1, mx: 1.5 }}>
            <Button variant='text' color='inherit'>
              Features
            </Button>
            <Button variant='text' color='inherit'>
              Testimonials
            </Button>
            <Button variant='text' color='inherit'>
              Highlights
            </Button>
            <Button variant='text' color='inherit'>
              Pricing
            </Button>
            <Button variant='text' color='inherit'>
              FAQ
            </Button>
            <Button variant='text' color='inherit'>
              Blog
            </Button>
          </Box>
        </nav>
        <Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
          Sign in
        </Button>
        <Button href='#' variant='contained' sx={{ my: 1, mx: 1.5 }}>
          Sign up
        </Button>
        {/* Dark/Light Mode Toggle Button */}
        <Button
          onClick={onToggleTheme} // Call the function passed via prop
          color='inherit'
          sx={{ my: 1, mx: 1.5 }}
          startIcon={
            currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />
          }
        >
          {currentMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppAppBar;
