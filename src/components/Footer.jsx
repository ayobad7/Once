// src/components/Footer.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';

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
      <Typography variant='body2' color='text.secondary'>
        © {new Date().getFullYear()} Once Architect. All rights reserved.
      </Typography>
    </Container>
  );
}

export default Footer;
