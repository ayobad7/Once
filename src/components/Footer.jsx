// src/components/Footer.jsx
import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: [6, 12],
        textAlign: 'center',
      }}
    >
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        © {new Date().getFullYear()} Sitemark. All rights reserved.
      </Typography>
      <Box>
        <Link color='inherit' href='#' sx={{ px: 1 }}>
          Privacy Policy
        </Link>
        <Link color='inherit' href='#' sx={{ px: 1 }}>
          Terms of Service
        </Link>
        <Link color='inherit' href='#' sx={{ px: 1 }}>
          Contact Us
        </Link>
      </Box>
    </Container>
  );
}

export default Footer;
