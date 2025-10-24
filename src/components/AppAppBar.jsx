// src/components/AppAppBar.jsx (Revised with Mobile Drawer)
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useScrollTrigger, Container, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger icon
import { Link } from 'react-router-dom'; // Import Link for routing
import { useTheme } from '@mui/material/styles'; // Use useTheme hook to get current theme

function AppAppBar({ onToggleTheme }) { // Accept onToggleTheme prop
  const theme = useTheme(); // Use useTheme hook to get current theme object
  const currentMode = theme.palette.mode; // Get the current mode from the theme
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Define semi-transparent colors for light and dark modes
  const appBarBgColor = currentMode === 'dark'
    ? `rgba(${theme.palette.background.defaultChannel || '30, 30, 30'}, 0.4)`
    : `rgba(${theme.palette.background.defaultChannel || '255, 255, 255'}, 0.4)`;

  const appBarBorderColor = currentMode === 'dark'
    ? theme.palette.divider
    : theme.palette.divider;

  const appBarShadow = trigger
    ? (theme.vars || theme).shadows[1]
    : 'none';

  // Mobile Navigation Items
  const mobileNavItems = [
    { text: 'Features', href: '#' },
    { text: 'Testimonials', href: '#' },
    { text: 'Highlights', href: '#' },
    { text: 'Pricing', href: '#' },
    { text: 'FAQ', href: '#' },
    { text: 'Blog', href: '#' },
  ];

  return (
    <AppBar
      position='fixed'
      color='default'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: '28px', // Adjust as needed
      }}
    >
      <Container maxWidth='lg' disableGutters>
        <Toolbar
          variant='dense'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '50px', // Pill shape for Toolbar
            backdropFilter: 'blur(24px)',
            border: '1px solid',
            borderColor: appBarBorderColor,
            backgroundColor: appBarBgColor,
            boxShadow: appBarShadow,
            // Responsive margins
            ml: { xs: '32px', sm: '50px', md: '50px' },
            mr: { xs: '33px', sm: '50px', md: '50px' },
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Sitemark
            </Typography>
            {/* Desktop Navigation Links - Hidden on mobile */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
              }}
            >
              {mobileNavItems.map((item) => (
                <Button
                  key={item.text}
                  variant='text'
                  color='inherit'
                  size='small'
                  href={item.href}
                  sx={{ borderRadius: '20px' }} // Pill shape for buttons
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' }, // Show on medium and large screens
              gap: 1,
              alignItems: 'center',
            }}
          >
            {/* Redirect Sign In to Admin */}
            <Button
              variant='outlined'
              color='inherit'
              size='small'
              component={Link} // Use Link for internal routing
              to='/admin' // Redirect to /admin
              sx={{
                borderRadius: '20px', // Pill shape for button
                my: 1,
                mx: 1.5,
              }}
            >
              Sign in
            </Button>
            {/* Dark/Light Mode Toggle Button */}
            <Button
              onClick={onToggleTheme}
              color='inherit'
              size='small'
              sx={{
                borderRadius: '20px', // Pill shape for button
                my: 1,
                mx: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example light hover
                },
              }}
              startIcon={
                currentMode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )
              }
            >
              {currentMode === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </Box>

          {/* Mobile Menu Button - Hidden on desktop */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button
              onClick={onToggleTheme}
              color='inherit'
              size='small'
              sx={{
                borderRadius: '20px', // Pill shape for mobile toggle
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example light hover
                },
              }}
              startIcon={
                currentMode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )
              }
            >
              {currentMode === 'dark' ? 'L' : 'D'}{' '}
              {/* Shorter text for mobile */}
            </Button>
            <Button
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: '20px',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }} // Pill shape for menu button
            >
              <MenuIcon />
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <nav>
        <Drawer
          anchor='top' // Anchor to the top
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              top: 'calc(28px + 64px)', // Position below the AppBar (adjust 28px if mt changes)
              // Match the width constraints of the main content if needed, otherwise full width is fine
              // width: 'auto', // Or specify a width if desired
              borderRadius: '0 0 50px 50px', // Match the AppBar's bottom corners if desired, or keep square for top anchor
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: appBarBgColor, // Match AppBar background
              border: '1px solid',
              borderColor: appBarBorderColor, // Match AppBar border
              backdropFilter: 'blur(24px)', // Match AppBar blur
            }}
          >
            <List>
              {mobileNavItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component='a'
                    href={item.href}
                    onClick={handleDrawerToggle}
                    sx={{ borderRadius: '20px', mx: 1 }}
                  >
                    {' '}
                    {/* Pill shape for list items */}
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <List>
              {/* Sign In Link in Mobile Menu */}
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to='/admin'
                  onClick={handleDrawerToggle}
                  sx={{ borderRadius: '20px', mx: 1 }}
                >
                  {' '}
                  {/* Pill shape for list items */}
                  <ListItemText primary='Sign in' />
                </ListItemButton>
              </ListItem>
              {/* Theme Toggle in Mobile Menu (Optional) */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    onToggleTheme();
                    handleDrawerToggle();
                  }}
                  sx={{ borderRadius: '20px', mx: 1 }}
                >
                  {' '}
                  {/* Pill shape for list items */}
                  <ListItemText
                    primary={
                      currentMode === 'dark' ? 'Light Mode' : 'Dark Mode'
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>
    </AppBar>
  );
}

export default AppAppBar;
