import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import ConstructionIcon from '@mui/icons-material/Construction';

function AboutPage({ onToggleTheme }) {
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
        <ConstructionIcon
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
          About Us
        </Typography>
        <Typography
          variant='h5'
          color='text.secondary'
          align='center'
          sx={{ mt: 2, maxWidth: '600px' }}
        >
          This page is under construction
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          align='center'
          sx={{ mt: 2, maxWidth: '600px' }}
        >
          We're working hard to bring you more information about our community.
          Check back soon!
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}

export default AboutPage;
