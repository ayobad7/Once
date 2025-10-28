import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Link,
  Grid,
  Card,
} from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import FoundationIcon from '@mui/icons-material/Foundation';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';

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
        }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <FoundationIcon
            sx={{
              fontSize: 80,
              color: 'primary.main',
              mb: 2,
            }}
          />
          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            About Once Architect
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            A building community showcasing exceptional builds from
            collaborative town projects in Once Human
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            mb: 6,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.02) 100%)',
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Once Architect is a building community that created this website as
            a showcase platform: highlighting exceptional builds from
            collaborative town projects in Once Human.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 3,
            }}
          >
            All featured creations are carefully selected and uploaded by our
            admin team to ensure quality, creativity, and inspiration.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Players with bases featured here will receive special roles in our
            Discord.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 3,
            }}
          >
            For player-submitted bases, guides, and a wider range of community
            resources—including guild directories, building tutorials, combat
            builds, and blueprint tools—please visit our partner site:{' '}
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
              lineHeight: 1.8,
              color: 'text.primary',
              fontStyle: 'italic',
            }}
          >
            Through tutorials, spotlights, community showcases, and
            collaborative projects, Once Architect bridges creativity with
            technical mastery, turning survival into art, and players into
            architects.
          </Typography>
        </Paper>

        {/* Feature Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <GroupsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                Community Driven
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Built by the community, for the community
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <EmojiEventsIcon
                sx={{ fontSize: 60, color: 'warning.main', mb: 2 }}
              />
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                Quality Showcase
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Carefully curated exceptional builds
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <SchoolIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                Learn & Grow
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Tutorials and guides to improve skills
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <FoundationIcon
                sx={{ fontSize: 60, color: 'info.main', mb: 2 }}
              />
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                Master Builders
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Turning players into architects
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default AboutPage;
