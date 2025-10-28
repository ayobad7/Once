import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import LaunchIcon from '@mui/icons-material/Launch';
import helloGif from '../assets/hello.gif';
import blacklinesGif from '../assets/blacklines.gif';

function AboutPage({ onToggleTheme }) {
  return (
    <>
      <AppAppBar onToggleTheme={onToggleTheme} />
      <MainContent>
        <Container
          maxWidth='lg'
          sx={{
            pt: 12,
            pb: 8,
          }}
        >
          {/* Image Grid Layout */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
              gridTemplateRows: { xs: 'auto auto auto auto', md: '1fr 1fr' },
              gap: 4,
              mb: 4,
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Hello.gif - Top Left */}
            <Box
              sx={{
                gridColumn: { xs: '1', md: '1' },
                gridRow: { xs: '1', md: '1' },
                borderRadius: 3,
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <img
                src={helloGif}
                alt='Hello'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
            </Box>

            {/* About Content 1 - Top Right */}
            <Box
              sx={{
                gridColumn: { xs: '1', md: '2' },
                gridRow: { xs: '2', md: '1' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant='h2'
                component='h1'
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  fontSize: { xs: '2.5rem', md: '3rem' },
                }}
              >
                About Once Architect
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                Once Architect is a building community that created this website
                as a showcase platform: highlighting exceptional builds from
                collaborative town projects in Once Human.
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                All featured creations are carefully selected and uploaded by
                our admin team to ensure quality, creativity, and inspiration.
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: 'text.primary',
                }}
              >
                Players with bases featured here will receive special roles in
                our Discord.
              </Typography>
            </Box>

            {/* About Content 2 - Bottom Left */}
            <Box
              sx={{
                gridColumn: { xs: '1', md: '1' },
                gridRow: { xs: '3', md: '2' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                For player-submitted bases, guides, and a wider range of
                community resources—including guild directories, building
                tutorials, combat builds, and blueprint tools—please visit our
                partner site:{' '}
                <Link
                  href='https://oncehub.cc'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  OnceHub.cc
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Link>
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: 'text.primary',
                  fontStyle: 'italic',
                }}
              >
                Through tutorials, spotlights, community showcases, and
                collaborative projects, Once Architect bridges creativity with
                technical mastery, turning survival into art, and players into
                architects.
              </Typography>
            </Box>

            {/* Blacklines.gif with overlay text - Bottom Right */}
            <Box
              sx={{
                gridColumn: { xs: '1', md: '2' },
                gridRow: { xs: '4', md: '2' },
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16/9',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <img
                src={blacklinesGif}
                alt='Blacklines'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '12px',
                  p: 3,
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                    lineHeight: 1.6,
                  }}
                >
                  A building community showcasing exceptional builds from
                  collaborative town projects in Once Human
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </MainContent>
      <Footer />
    </>
  );
}

export default AboutPage;
