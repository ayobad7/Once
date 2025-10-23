// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Box, Alert, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path if you used src/config/firebase.js
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, redirect to admin page
      navigate('/admin'); // Assuming your admin route is /admin
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Admin Login
      </Typography>

      {message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;