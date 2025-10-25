// src/App.jsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles'; // Use ThemeProvider
import { CssBaseline } from '@mui/material'; // Import CssBaseline
import { darkTheme, lightTheme } from './theme'; // Import both themes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ShowcasePage from './pages/ShowcasePage';
import GalleryPage from './pages/GalleryPage';
import EventPage from './pages/EventPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
// DO NOT import BrowserRouter or Router here
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

function App() {
  // Initialize theme based on user preference or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen for system preference changes (when user hasn't manually set preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === null) {
        setIsDarkMode(e.matches);
      }
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      // Save user's manual choice to localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Select the theme based on the state
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      {' '}
      {/* Pass the selected theme */}
      <CssBaseline />{' '}
      {/* Add CssBaseline to apply the theme's background color */}
      {/* Define the routes here, within the ThemeProvider */}
      <Routes>
        <Route path='/' element={<HomePage onToggleTheme={toggleTheme} />} />
        <Route
          path='/showcase'
          element={<ShowcasePage onToggleTheme={toggleTheme} />}
        />
        <Route
          path='/gallery'
          element={<GalleryPage onToggleTheme={toggleTheme} />}
        />
        <Route
          path='/event'
          element={<EventPage onToggleTheme={toggleTheme} />}
        />
        <Route
          path='/about'
          element={<AboutPage onToggleTheme={toggleTheme} />}
        />
        <Route path='/faq' element={<FAQPage onToggleTheme={toggleTheme} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
