// src/components/Footer.jsx
import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { FaDiscord, FaTwitch, FaXTwitter } from 'react-icons/fa6';
import { SiKofi } from 'react-icons/si';

function Footer() {
  return (
    <Container sx={{ mt: 4 }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            py: { xs: 4, sm: 6 },
            gap: 2,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          {/* Copyright Text */}
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} Once Architect. All rights reserved.
          </Typography>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size='small'
              href='https://ko-fi.com/oncearchitect'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'text.secondary',
                '&:hover': { color: '#FF5E5B' },
              }}
              aria-label='Ko-fi'
            >
              <SiKofi style={{ fontSize: '1.25rem' }} />
            </IconButton>

            <IconButton
              size='small'
              href='https://x.com/jesstronbuilds'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'text.secondary',
                '&:hover': { color: '#000' },
              }}
              aria-label='Twitter/X'
            >
              <FaXTwitter style={{ fontSize: '1.25rem' }} />
            </IconButton>

            <IconButton
              size='small'
              href='https://www.twitch.tv/therealjesstron'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'text.secondary',
                '&:hover': { color: '#9146FF' },
              }}
              aria-label='Twitch'
            >
              <FaTwitch style={{ fontSize: '1.25rem' }} />
            </IconButton>

            <IconButton
              size='small'
              href='https://discord.com/invite/vRHTtVqKpT'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'text.secondary',
                '&:hover': { color: '#5865F2' },
              }}
              aria-label='Discord'
            >
              <FaDiscord style={{ fontSize: '1.25rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default Footer;
