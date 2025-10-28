// src/components/EventCard.jsx - Landscape Event Card Component
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';
import { FaDiscord } from 'react-icons/fa6';
import EventIcon from '@mui/icons-material/Event'; // Event icon
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'; // Builder Spotlight icon
import DescriptionWithLinks from './DescriptionWithLinks';
import RegionChip from './chips/RegionChip';
import CategoryChip from './chips/CategoryChip';
import DaysRemainingChip from './chips/DaysRemainingChip';
import EventStatusChip from './chips/EventStatusChip';
import {
  getEventStatus,
  getDaysRemaining,
  pastelColors,
} from '../utils/cardUtils';

// Styled Card - Horizontal Layout
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  height: '100%',
  minHeight: '200px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? (theme.vars || theme).palette.background.paper
      : '#ffffff',
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

function EventCard({ item, onClick, showTypePill = false }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/build/${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Calculate event status based on dates
  // Use shared utility functions
  const eventStatus = getEventStatus(item.eventStartDate, item.eventEndDate);
  const daysRemaining = getDaysRemaining(
    item.eventStartDate,
    item.eventEndDate
  );

  // Pastel colors for Builder Spotlight and Event type pills
  const spotlightColors = pastelColors.orange[mode];
  const eventTypeColors = pastelColors.yellow[mode];

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
          {/* Event Status Pill - Positioned on top-left of image */}
          <EventStatusChip
            eventStatus={eventStatus}
            fontSize='0.7rem'
            height='22px'
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              boxShadow: 2,
            }}
          />

          {/* Builder Spotlight Chip - Positioned below status pill */}
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
              sx={{
                position: 'absolute',
                top: eventStatus ? 42 : 12, // Position below status pill
                left: 12,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: '22px',
                border: 'none',
                backgroundColor: spotlightColors.bg,
                color: spotlightColors.text,
                boxShadow: 2,
                '& .MuiChip-label': {
                  color: spotlightColors.text,
                },
                '& .MuiChip-icon': {
                  marginLeft: '6px',
                  color: spotlightColors.text,
                },
              }}
            />
          )}
        </Box>
      )}

      {/* Content Section - 60% width on desktop */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <StyledCardContent>
          {/* Event Badge with Icon - Conditionally rendered */}
          {showTypePill && (
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
              sx={{
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                fontSize: '0.65rem',
                height: '22px',
                border: 'none',
                backgroundColor: eventTypeColors.bg,
                color: eventTypeColors.text,
                mb: 1,
                '& .MuiChip-label': {
                  color: eventTypeColors.text,
                },
                '& .MuiChip-icon': {
                  marginLeft: '6px',
                  color: eventTypeColors.text,
                },
              }}
            />
          )}

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
                flex: 1,
              }}
            >
              {/* Days Remaining Chip - Only for ongoing events */}
              <DaysRemainingChip
                daysRemaining={daysRemaining}
                fontSize='0.65rem'
                height='20px'
                iconSize='0.75rem'
              />
              {item.regions &&
                item.regions
                  .slice(0, 2)
                  .map((region) => (
                    <RegionChip
                      key={region}
                      region={region}
                      fontSize='0.65rem'
                      height='20px'
                      iconSize='0.75rem'
                    />
                  ))}
              {item.builds &&
                item.builds
                  .slice(0, 2)
                  .map((build) => (
                    <CategoryChip
                      key={build}
                      category={build}
                      fontSize='0.65rem'
                      height='20px'
                      iconSize='0.75rem'
                    />
                  ))}
              {(item.regions?.length > 2 || item.builds?.length > 2) && (
                <Typography variant='caption' sx={{ alignSelf: 'center' }}>
                  +
                  {(item.regions?.length || 0) + (item.builds?.length || 0) - 4}
                </Typography>
              )}
            </Box>

            {/* YouTube, Discord, and Share Link Icons */}
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
              <IconButton
                size='small'
                onClick={handleCopyLink}
                sx={{
                  padding: '4px',
                  color: 'text.secondary',
                  '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.1)' },
                }}
                title='Copy share link'
              >
                <LinkIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
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

      {/* Snackbar for copy link notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Share link successfully copied!
        </Alert>
      </Snackbar>
    </StyledCard>
  );
}

export default EventCard;
