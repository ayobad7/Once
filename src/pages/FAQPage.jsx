import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function FAQPage({ onToggleTheme }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppAppBar onToggleTheme={onToggleTheme} />
      <Container
        maxWidth='lg'
        sx={{
          pt: 12,
          pb: 8,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HelpOutlineIcon
          sx={{
            fontSize: 80,
            color: 'text.secondary',
            mb: 3,
          }}
        />
        <Typography
          variant='h2'
          component='h1'
          gutterBottom
          align='center'
          sx={{ fontWeight: 600 }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          align='center'
          sx={{ mt: 2, maxWidth: '600px' }}
        >
          Coming Soon
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          align='center'
          sx={{ mt: 2, maxWidth: '600px' }}
        >
          We're compiling the most frequently asked questions to help you
          better. Stay tuned!
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}

export default FAQPage;
