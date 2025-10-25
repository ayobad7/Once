// src/components/CardModal.jsx - Enhanced with Image Gallery
import React, { useState } from 'react';
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
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaDiscord } from 'react-icons/fa6';
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
  Tutorial: 'info',
  Outfit: 'primary',
  Character: 'warning',
  Decoration: 'success',
  Bug: 'error',
  'Weapon Build': 'secondary',
};

function CardModal({ open, onClose, item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset to first image when modal opens
  React.useEffect(() => {
    if (open) {
      setCurrentImageIndex(0);
    }
  }, [open]);

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

      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant='h5' component='div'>
          {item.title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2 } }}>
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
            color='warning'
            sx={{
              fontWeight: 'bold',
              mb: 2,
            }}
          />
        )}

        {/* Chips and Social Icons Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Chips */}
          {((item.regions && item.regions.length > 0) ||
            (item.builds && item.builds.length > 0)) && (
            <Stack
              direction='row'
              spacing={1}
              flexWrap='wrap'
              sx={{ gap: 1, flex: 1 }}
            >
              {item.regions &&
                item.regions.map((region) => (
                  <Chip
                    key={region}
                    label={region}
                    size='small'
                    color={regionColors[region] || 'default'}
                    variant='filled'
                    sx={{
                      fontWeight: 'bold',
                      border: 'none',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#000' : undefined,
                    }}
                  />
                ))}
              {item.builds &&
                item.builds.map((build) => (
                  <Chip
                    key={build}
                    label={build}
                    size='small'
                    color={buildColors[build] || 'default'}
                    variant='filled'
                    sx={{
                      fontWeight: 'bold',
                      border: 'none',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#000' : undefined,
                    }}
                  />
                ))}
            </Stack>
          )}

          {/* Social Icons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {item.youtubeLink && (
              <Button
                variant='contained'
                startIcon={<YouTubeIcon />}
                onClick={() => window.open(item.youtubeLink, '_blank')}
                sx={{
                  backgroundColor: '#FF0000',
                  '&:hover': { backgroundColor: '#CC0000' },
                }}
              >
                YouTube
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
                }}
              >
                Discord
              </Button>
            )}
          </Box>
        </Box>

        {/* Description */}
        <Typography variant='body1' color='text.primary' sx={{ mb: 3 }}>
          <DescriptionWithLinks description={item.description} />
        </Typography>

        {/* Image Gallery */}
        {allImages.length > 0 && (
          <Box sx={{ position: 'relative', mb: 2 }}>
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
                  mt: 2,
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Typography variant='body2' color='text.secondary'>
            By: {item.email ? item.email.split('@')[0] : 'Anonymous'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {formatDate(item.timestamp)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2 } }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardModal;
