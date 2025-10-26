// src/components/CardModal.jsx - Enhanced with Image Gallery
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Avatar,
  AvatarGroup,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { FaDiscord } from 'react-icons/fa6';
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

// MUI theme-aware color mappings for chips
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

// Icon mappings for build categories
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

function CardModal({ open, onClose, item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  // Reset to first image when modal opens
  React.useEffect(() => {
    if (open) {
      setCurrentImageIndex(0);
    }
  }, [open]);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/build/${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  const handleOpenPage = (e) => {
    e.stopPropagation();
    navigate(`/build/${item.id}`);
    onClose(); // Close the modal
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Calculate event status based on dates
  const getEventStatus = () => {
    if (!item || !item.eventStartDate || !item.eventEndDate) {
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

  const eventStatus = getEventStatus();

  if (!item) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
        {/* Empty state */}
      </Dialog>
    );
  }

  // Combine main image with additional images for gallery
  const allImages = [
    item.image,
    ...(item.additionalImages || []).filter((img) => img && img.trim() !== ''),
  ].filter(Boolean);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Unknown Date';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          maxWidth: '1200px',
          width: { xs: '100%', sm: '95%', md: '90%', lg: '1200px' },
          margin: 0,
          position: 'absolute',
          left: { xs: 0, sm: '50%' },
          top: { xs: 0, sm: '50%' },
          transform: {
            xs: 'none',
            sm: 'translate(-50%, -50%)',
          },
          maxHeight: { xs: '100vh', sm: '95vh' },
          borderRadius: { xs: 0, sm: 2 },
        },
      }}
      sx={{
        '& .MuiDialog-container': {
          display: 'block',
          padding: 0,
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      {/* Close button */}
      <IconButton
        aria-label='close'
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant='h5' component='div'>
          {item.title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pt: 0, pb: { xs: 2, sm: 2 } }}>
        {/* Event Status & Builder Spotlight Pills */}
        {(eventStatus || item.spotlightDate) && (
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
            {/* Event Status Pill - Only for event cards */}
            {item.cardType === 'event' && eventStatus && (
              <Chip
                label={eventStatus.label}
                size='small'
                color={eventStatus.color}
                variant='filled'
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  height: '24px',
                  border: 'none',
                  color: (theme) =>
                    theme.palette.mode === 'dark' &&
                    eventStatus.color !== 'default'
                      ? '#000'
                      : undefined,
                }}
              />
            )}

            {/* Builder Spotlight Chip */}
            {item.spotlightDate && (
              <Chip
                label={`Builder Spotlight - ${
                  item.spotlightDate.toDate
                    ? item.spotlightDate.toDate().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })
                    : 'Featured'
                }`}
                size='small'
                color='warning'
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  height: '24px',
                  border: 'none',
                }}
              />
            )}
          </Box>
        )}

        {/* Chips and Social Icons Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1.5,
            flexWrap: 'wrap',
          }}
        >
          {/* Chips */}
          {((item.regions && item.regions.length > 0) ||
            (item.builds && item.builds.length > 0)) && (
            <Stack
              direction='row'
              spacing={0.5}
              flexWrap='wrap'
              sx={{ gap: 0.5, flex: 1 }}
            >
              {item.regions &&
                item.regions.map((region) => (
                  <Chip
                    key={region}
                    icon={
                      <LanguageIcon
                        sx={{
                          fontSize: '0.8rem !important',
                          color: 'inherit !important',
                        }}
                      />
                    }
                    label={region}
                    size='small'
                    color={regionColors[region] || 'default'}
                    variant='filled'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      height: '24px',
                      border: 'none',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#000' : undefined,
                      '& .MuiChip-icon': {
                        marginLeft: '8px',
                      },
                    }}
                  />
                ))}
              {item.builds &&
                item.builds.map((build) => {
                  const IconComponent = buildIcons[build];
                  return (
                    <Chip
                      key={build}
                      icon={
                        IconComponent ? (
                          <IconComponent
                            sx={{
                              fontSize: '0.8rem !important',
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
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        height: '24px',
                        border: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#000' : undefined,
                        '& .MuiChip-icon': {
                          marginLeft: '8px',
                        },
                      }}
                    />
                  );
                })}
            </Stack>
          )}

          {/* Social Icons */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {item.youtubeLink && (
              <Button
                variant='contained'
                startIcon={<YouTubeIcon />}
                onClick={() => window.open(item.youtubeLink, '_blank')}
                sx={{
                  backgroundColor: '#FF0000',
                  '&:hover': { backgroundColor: '#CC0000' },
                  borderRadius: '50px',
                  px: { xs: 1.5, sm: 3 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '& .MuiButton-startIcon': {
                    margin: { xs: 0, sm: '0 8px 0 -4px' },
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  YouTube
                </Box>
              </Button>
            )}
            {item.discordLink && (
              <Button
                variant='contained'
                startIcon={<FaDiscord />}
                onClick={() => window.open(item.discordLink, '_blank')}
                sx={{
                  backgroundColor: '#5865F2',
                  '&:hover': { backgroundColor: '#4752C4' },
                  borderRadius: '50px',
                  px: { xs: 1.5, sm: 3 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '& .MuiButton-startIcon': {
                    margin: { xs: 0, sm: '0 8px 0 -4px' },
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  Discord
                </Box>
              </Button>
            )}
            <Button
              variant='contained'
              startIcon={<LinkIcon />}
              onClick={handleCopyLink}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.08)',
                color: 'text.primary',
                borderRadius: '50px',
                px: { xs: 1.5, sm: 3 },
                minWidth: { xs: 'auto', sm: 'auto' },
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(0, 0, 0, 0.15)',
                  boxShadow: 'none',
                },
                '& .MuiButton-startIcon': {
                  margin: { xs: 0, sm: '0 8px 0 -4px' },
                },
              }}
            >
              <Box
                component='span'
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                Share
              </Box>
            </Button>
            <Button
              variant='contained'
              startIcon={<OpenInNewIcon />}
              onClick={handleOpenPage}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.08)',
                color: 'text.primary',
                borderRadius: '50px',
                px: { xs: 1.5, sm: 3 },
                minWidth: { xs: 'auto', sm: 'auto' },
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(0, 0, 0, 0.15)',
                  boxShadow: 'none',
                },
                '& .MuiButton-startIcon': {
                  margin: { xs: 0, sm: '0 8px 0 -4px' },
                },
              }}
              title='Open in page'
            >
              <Box
                component='span'
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                View
              </Box>
            </Button>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant='body1'
          color='text.primary'
          sx={{ mb: 2, fontWeight: 300 }}
        >
          <DescriptionWithLinks description={item.description} />
        </Typography>

        {/* Image Gallery */}
        {allImages.length > 0 && (
          <Box sx={{ position: 'relative', mb: 1.5 }}>
            {/* Main Image Display */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9', // 16:9 ratio
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <img
                src={allImages[currentImageIndex]}
                alt={`${item.title} - Image ${currentImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: { xs: 4, sm: 8 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon
                      sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: { xs: 4, sm: 8 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}
                    />
                  </IconButton>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                  }}
                >
                  {currentImageIndex + 1} / {allImages.length}
                </Box>
              )}
            </Box>

            {/* Thumbnail Navigation */}
            {allImages.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 1.5,
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': {
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: '4px',
                  },
                }}
              >
                {allImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    sx={{
                      minWidth: '80px',
                      height: '80px',
                      cursor: 'pointer',
                      border:
                        currentImageIndex === index
                          ? '3px solid'
                          : '2px solid transparent',
                      borderColor:
                        currentImageIndex === index
                          ? 'primary.main'
                          : 'transparent',
                      borderRadius: 1,
                      overflow: 'hidden',
                      opacity: currentImageIndex === index ? 1 : 0.6,
                      transition: 'all 0.2s',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Author and Date */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider',
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
            {item.email ? (
              <>
                <AvatarGroup
                  max={3}
                  sx={{
                    '& .MuiAvatar-root': {
                      border: 'none',
                    },
                  }}
                >
                  <Avatar
                    alt={item.email}
                    src='/static/images/avatar/1.jpg'
                    sx={{ width: 24, height: 24 }}
                  />
                </AvatarGroup>
                <Typography variant='caption'>
                  {item.email.split('@')[0]}
                </Typography>
              </>
            ) : (
              <Typography variant='caption'>Anonymous</Typography>
            )}
          </Box>
          <Typography variant='caption' color='text.secondary'>
            {formatDate(item.timestamp)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2 } }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            width: { xs: '100%', sm: 'auto' },
            borderRadius: '50px', // Pill shape
            px: 4, // Extra horizontal padding for oblong shape
          }}
        >
          Close
        </Button>
      </DialogActions>

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
    </Dialog>
  );
}

export default CardModal;
