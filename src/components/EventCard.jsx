// src/components/EventCard.jsx - Landscape Event Card Component
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaDiscord } from 'react-icons/fa6';
import EventIcon from '@mui/icons-material/Event'; // Event icon
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'; // Builder Spotlight icon
import DescriptionWithLinks from './DescriptionWithLinks';

// Color mappings for chips
const regionColors = {
  'North America': 'error',
  Europe: 'info',
  'South America': 'warning',
  'Southeast Asia': 'success',
  'Other Regions': 'secondary',
  'Custom Server': 'primary',
};

const buildColors = {
  'Base Design': 'error',
  'Room Design': 'secondary',
  Tutorial: 'info',
  Outfit: 'primary',
  Character: 'warning',
  Decoration: 'success',
  Bug: 'error',
  'Weapon Build': 'secondary',
  Deviation: 'warning',
  Update: 'info',
  Class: 'success',
};

// Styled Card - Horizontal Layout
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  height: '100%',
  minHeight: '200px',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column', // Stack vertically on mobile
  },
}));

// Styled Content
const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

// Typography with line clamp for description - 4 lines for events
const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Author section component
function Author({ email, timestamp }) {
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Unknown Date';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (email) => {
    if (!email) return '?';
    const parts = email.split('@')[0];
    return parts.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem' }}>
          {getInitials(email)}
        </Avatar>
        <Typography variant='caption'>
          {email ? email.split('@')[0] : 'Anonymous'}
        </Typography>
      </Box>
      <Typography variant='caption'>{formatDate(timestamp)}</Typography>
    </Box>
  );
}

function EventCard({ item, onClick }) {
  return (
    <StyledCard variant='outlined' onClick={onClick} tabIndex={0}>
      {/* Image Section - 40% width on desktop */}
      {item.image && (
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '40%' },
            minWidth: { md: '300px' },
            flexShrink: 0,
          }}
        >
          <CardMedia
            component='img'
            alt={item.title}
            image={item.image}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: { xs: '16 / 9', md: 'auto' },
            }}
          />
          {/* Builder Spotlight Chip - Positioned on top-left of image */}
          {item.spotlightDate && (
            <Chip
              icon={
                <MapsHomeWorkIcon
                  sx={{
                    fontSize: '0.85rem !important',
                    color: 'inherit !important',
                  }}
                />
              }
              label={`Builder Spotlight - ${
                item.spotlightDate.toDate
                  ? item.spotlightDate.toDate().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })
                  : 'Featured'
              }`}
              size='small'
              color='warning'
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: '22px',
                border: 'none',
                boxShadow: 'none',
                '& .MuiChip-icon': {
                  marginLeft: '6px',
                },
              }}
            />
          )}
        </Box>
      )}

      {/* Content Section - 60% width on desktop */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <StyledCardContent>
          {/* Event Badge with Icon */}
          <Chip
            icon={
              <EventIcon
                sx={{
                  fontSize: '0.85rem !important',
                  color: 'inherit !important',
                }}
              />
            }
            label='Event'
            size='small'
            color='warning'
            variant='filled'
            sx={{
              alignSelf: 'flex-start',
              fontWeight: 'bold',
              fontSize: '0.65rem',
              height: '22px',
              border: 'none',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#000' : undefined,
              mb: 1,
              '& .MuiChip-icon': {
                marginLeft: '6px',
              },
            }}
          />

          {/* Display Chips and Social Icons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
              mb: 1,
            }}
          >
            <Stack
              direction='row'
              spacing={0.5}
              flexWrap='wrap'
              sx={{ gap: 0.5, flex: 1 }}
            >
              {item.regions &&
                item.regions.slice(0, 2).map((region) => (
                  <Chip
                    key={region}
                    label={region}
                    size='small'
                    color={regionColors[region] || 'default'}
                    variant='filled'
                    sx={{
                      fontSize: '0.65rem',
                      height: '20px',
                      border: 'none',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#000' : undefined,
                    }}
                  />
                ))}
              {item.builds &&
                item.builds.slice(0, 2).map((build) => (
                  <Chip
                    key={build}
                    label={build}
                    size='small'
                    color={buildColors[build] || 'default'}
                    variant='filled'
                    sx={{
                      fontSize: '0.65rem',
                      height: '20px',
                      border: 'none',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#000' : undefined,
                    }}
                  />
                ))}
              {(item.regions?.length > 2 || item.builds?.length > 2) && (
                <Typography
                  variant='caption'
                  sx={{ ml: 0.5, alignSelf: 'center' }}
                >
                  +
                  {(item.regions?.length || 0) + (item.builds?.length || 0) - 4}
                </Typography>
              )}
            </Stack>

            {/* YouTube and Discord Icons */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {item.youtubeLink && (
                <IconButton
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.youtubeLink, '_blank');
                  }}
                  sx={{
                    padding: '4px',
                    color: '#FF0000',
                    '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' },
                  }}
                >
                  <YouTubeIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              )}
              {item.discordLink && (
                <IconButton
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.discordLink, '_blank');
                  }}
                  sx={{
                    padding: '4px',
                    color: '#5865F2',
                    '&:hover': { backgroundColor: 'rgba(88, 101, 242, 0.1)' },
                  }}
                >
                  <FaDiscord style={{ fontSize: '1.2rem' }} />
                </IconButton>
              )}
            </Box>
          </Box>

          <Typography gutterBottom variant='h6' component='div'>
            {item.title}
          </Typography>

          <StyledTypography variant='body2' color='text.secondary' gutterBottom>
            <DescriptionWithLinks description={item.description} />
          </StyledTypography>
        </StyledCardContent>

        <Author email={item.email} timestamp={item.timestamp} />
      </Box>
    </StyledCard>
  );
}

export default EventCard;
