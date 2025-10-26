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
  Stack,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';
import { FaDiscord } from 'react-icons/fa6';
import EventIcon from '@mui/icons-material/Event'; // Event icon
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'; // Builder Spotlight icon
import TimerIcon from '@mui/icons-material/Timer'; // Days left icon
import LanguageIcon from '@mui/icons-material/Language'; // Region icon
import FoundationIcon from '@mui/icons-material/Foundation'; // Base Design
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; // Room Design
import LocationCityIcon from '@mui/icons-material/LocationCity'; // City Build
import PlumbingIcon from '@mui/icons-material/Plumbing'; // Tutorial
import CheckroomIcon from '@mui/icons-material/Checkroom'; // Outfit
import PersonSearchIcon from '@mui/icons-material/PersonSearch'; // Character
import ChairIcon from '@mui/icons-material/Chair'; // Decoration
import BugReportIcon from '@mui/icons-material/BugReport'; // Bug
import WhatshotIcon from '@mui/icons-material/Whatshot'; // Weapon Build
import PetsIcon from '@mui/icons-material/Pets'; // Deviation
import UpdateIcon from '@mui/icons-material/Update'; // Update & Class
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
  'City Build': 'primary',
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

// Icon mappings for categories
const buildIcons = {
  'Base Design': FoundationIcon,
  'Room Design': MeetingRoomIcon,
  'City Build': LocationCityIcon,
  Tutorial: PlumbingIcon,
  Outfit: CheckroomIcon,
  Character: PersonSearchIcon,
  Decoration: ChairIcon,
  Bug: BugReportIcon,
  'Weapon Build': WhatshotIcon,
  Deviation: PetsIcon,
  Update: UpdateIcon,
  Class: UpdateIcon,
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

function EventCard({ item, onClick, showTypePill = false }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
  const getEventStatus = () => {
    if (!item.eventStartDate || !item.eventEndDate) {
      return null; // No dates set
    }

    const now = new Date();
    const startDate = new Date(item.eventStartDate);
    const endDate = new Date(item.eventEndDate);

    // Set time to start of day for accurate comparison
    now.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (now < startDate) {
      return { label: 'Upcoming', color: 'info' }; // Blue
    } else if (now >= startDate && now <= endDate) {
      return { label: 'Ongoing', color: 'success' }; // Green
    } else {
      return { label: 'Event Ended', color: 'default' }; // Gray
    }
  };

  // Calculate days remaining for ongoing events
  const getDaysRemaining = () => {
    if (!item.eventEndDate || !eventStatus || eventStatus.label !== 'Ongoing') {
      return null;
    }

    const now = new Date();
    const endDate = new Date(item.eventEndDate);

    now.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const timeDiff = endDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? daysLeft : 0;
  };

  const eventStatus = getEventStatus();
  const daysRemaining = getDaysRemaining();

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
          {eventStatus && (
            <Chip
              label={eventStatus.label}
              size='small'
              color={eventStatus.color}
              variant='filled'
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: '22px',
                border: 'none',
                boxShadow: 2,
                color: (theme) =>
                  theme.palette.mode === 'dark' &&
                  eventStatus.color !== 'default'
                    ? '#000'
                    : undefined,
              }}
            />
          )}

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
              color='warning'
              sx={{
                position: 'absolute',
                top: eventStatus ? 42 : 12, // Position below status pill
                left: 12,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: '22px',
                border: 'none',
                boxShadow: 2,
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
            <Stack
              direction='row'
              spacing={0.5}
              flexWrap='wrap'
              sx={{ gap: 0.5, flex: 1 }}
            >
              {/* Days Remaining Chip - Only for ongoing events */}
              {daysRemaining !== null && (
                <Chip
                  icon={
                    <TimerIcon
                      sx={{
                        fontSize: '0.75rem !important',
                        color: 'inherit !important',
                      }}
                    />
                  }
                  label={`${daysRemaining} ${
                    daysRemaining === 1 ? 'day' : 'days'
                  } left`}
                  size='small'
                  color='warning'
                  variant='filled'
                  sx={{
                    fontSize: '0.65rem',
                    height: '20px',
                    border: 'none',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#000' : undefined,
                    '& .MuiChip-icon': {
                      marginLeft: '6px',
                    },
                  }}
                />
              )}
              {item.regions &&
                item.regions.slice(0, 2).map((region) => (
                  <Chip
                    key={region}
                    icon={
                      <LanguageIcon
                        sx={{
                          fontSize: '0.75rem !important',
                          color: 'inherit !important',
                        }}
                      />
                    }
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
                      '& .MuiChip-icon': {
                        marginLeft: '6px',
                      },
                    }}
                  />
                ))}
              {item.builds &&
                item.builds.slice(0, 2).map((build) => {
                  const IconComponent = buildIcons[build];
                  return (
                    <Chip
                      key={build}
                      icon={
                        IconComponent ? (
                          <IconComponent
                            sx={{
                              fontSize: '0.75rem !important',
                              color: 'inherit !important',
                            }}
                          />
                        ) : undefined
                      }
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
                        '& .MuiChip-icon': {
                          marginLeft: '6px',
                        },
                      }}
                    />
                  );
                })}
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
