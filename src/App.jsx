// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage'; // Import the new AdminPage
import LoginPage from './pages/LoginPage'; // Import the new LoginPage

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/gallery' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} /> {/* Add login route */}
        <Route path='/admin' element={<AdminPage />} /> {/* Add admin route */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
