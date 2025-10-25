// src/components/AppAppBar.jsx (Revised with Mobile Drawer)
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useScrollTrigger,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger icon
import { Link } from 'react-router-dom'; // Import Link for routing
import { useTheme } from '@mui/material/styles'; // Use useTheme hook to get current theme
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AppAppBar({ onToggleTheme }) {
  // Accept onToggleTheme prop
  const theme = useTheme(); // Use useTheme hook to get current theme object
  const currentMode = theme.palette.mode; // Get the current mode from the theme
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Define semi-transparent colors for light and dark modes
  const appBarBgColor =
    currentMode === 'dark'
      ? `rgba(${theme.palette.background.defaultChannel || '30, 30, 30'}, 0.4)`
      : `rgba(${
          theme.palette.background.defaultChannel || '255, 255, 255'
        }, 0.4)`;

  const appBarBorderColor =
    currentMode === 'dark' ? theme.palette.divider : theme.palette.divider;

  const appBarShadow = trigger ? (theme.vars || theme).shadows[1] : 'none';

  // Mobile Navigation Items
  const mobileNavItems = [
    { text: 'Features', href: '/' },
    { text: 'Showcase', href: '/showcase' },
    { text: 'Gallery', href: '/gallery' },
    { text: 'Event', href: '/event' },
    { text: 'About', href: '/about' },
    { text: 'FAQ', href: '/faq' },
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
            ml: { xs: '33px', sm: '48px', md: '48px' },
            mr: { xs: '33px', sm: '48px', md: '48px' },
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexGrow: 1,
              }}
            >
              <img
                src='/capy.svg'
                alt='Once Architect Logo'
                style={{ height: '32px', width: '32px' }}
              />
              <Typography variant='h6' color='inherit' noWrap>
                Once Architect
              </Typography>
            </Box>
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
                  component={Link}
                  to={item.href}
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
            {/* Sign In / Post Button */}
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
              {isLoggedIn ? 'Post' : 'Sign in'}
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
              borderRadius: '0 0 20px 20px', // Rounded bottom corners
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
            {/* Logo and Title in Mobile Menu */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                px: 1,
              }}
            >
              <img
                src='/capy.svg'
                alt='Once Architect Logo'
                style={{ height: '32px', width: '32px' }}
              />
              <Typography variant='h6' color='inherit' noWrap>
                Once Architect
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {mobileNavItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.href}
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
              {/* Sign In / Post Link in Mobile Menu */}
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to='/admin'
                  onClick={handleDrawerToggle}
                  sx={{ borderRadius: '20px', mx: 1 }}
                >
                  {' '}
                  {/* Pill shape for list items */}
                  <ListItemText primary={isLoggedIn ? 'Post' : 'Sign in'} />
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
