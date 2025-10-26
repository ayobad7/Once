// src/components/Footer.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 4, sm: 6 },
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {/* Copyright Text - Centered */}
        <Typography variant='body2' color='text.secondary' align='center'>
          © {new Date().getFullYear()} Once Architect. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default Footer;
