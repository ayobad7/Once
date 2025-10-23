// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles'; // Use ThemeProvider
import { CssBaseline } from '@mui/material'; // Import CssBaseline
import { darkTheme, lightTheme } from './theme'; // Import both themes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
// DO NOT import BrowserRouter or Router here
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
