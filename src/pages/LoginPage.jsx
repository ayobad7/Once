// src/pages/LoginPage.jsx - Cleaned up with Google Sign-In
import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Card,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '450px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateInputs()) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'Login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setMessage(error.message || 'Google sign-in failed');
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction='column' justifyContent='space-between'>
        <StyledCard variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          {message && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {message}
            </Alert>
          )}

          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id='email'
                type='email'
                name='email'
                placeholder='your@email.com'
                autoComplete='email'
                autoFocus
                required
                fullWidth
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='current-password'
                required
                fullWidth
                variant='outlined'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button type='submit' fullWidth variant='contained'>
              Sign in
            </Button>
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={handleGoogleSignIn}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </Box>
        </StyledCard>
      </SignInContainer>
    </>
  );
}

export default LoginPage;
