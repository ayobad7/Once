import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

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
        <Route path='/gallery' element={<HomePage />} /> {/* Optional alias */}
        <Route path='/admin' element={<AdminPage />} />
        {/* Redirect any other route to home */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
