// src/components/ShowcaseCard.jsx - Styled to match MUI Blog Template
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  AvatarGroup,
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
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'; // Showcase icon
import CollectionsIcon from '@mui/icons-material/Collections'; // Gallery icon
import EventIcon from '@mui/icons-material/Event'; // Event icon
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'; // Builder Spotlight icon
import DescriptionWithLinks from './DescriptionWithLinks';
import RegionChip from './chips/RegionChip';
import CategoryChip from './chips/CategoryChip';
import { pastelColors } from '../utils/cardUtils';

// Styled Card matching MUI template
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
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
}));

// Styled Content matching MUI template
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

// Typography with 2-line clamp for description
const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
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
        {email ? (
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
                alt={email}
                src='/static/images/avatar/1.jpg'
                sx={{ width: 24, height: 24 }}
              />
            </AvatarGroup>
            <Typography variant='caption'>{email.split('@')[0]}</Typography>
          </>
        ) : (
          <Typography variant='caption'>Anonymous</Typography>
        )}
      </Box>
      <Typography variant='caption'>{formatDate(timestamp)}</Typography>
    </Box>
  );
}

function ShowcaseCard({ item, layout, onClick, showTypePill = false }) {
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

  // Pastel colors for Builder Spotlight and card type pills
  const spotlightColors = pastelColors.orange[mode];
  const showcaseColors = pastelColors.red[mode];
  const galleryColors = pastelColors.blue[mode];
  const eventColors = pastelColors.yellow[mode];

  // Determine image aspect ratio and height based on layout
  const getImageStyle = () => {
    switch (layout) {
      case 'spotlight':
        return {
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        };
      case 'showcase':
        return {
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        };
      case 'gallery':
        return {
          height: { sm: 'auto', md: '50%' },
          aspectRatio: { sm: '16 / 9', md: '' },
        };
      default:
        return {
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        };
    }
  };

  return (
    <StyledCard
      variant='outlined'
      onClick={onClick}
      tabIndex={0}
      sx={{ height: '100%', position: 'relative' }}
    >
      {item.image && (
        <Box
          sx={{
            position: 'relative',
            ...(layout === 'gallery' && {
              height: { sm: 'auto', md: '50%' },
            }),
          }}
        >
          <CardMedia
            component='img'
            alt={item.title}
            image={item.image}
            sx={{
              ...getImageStyle(),
              ...(layout === 'gallery' && {
                height: '100%',
                objectFit: 'cover',
              }),
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
              sx={{
                position: 'absolute',
                top: 12,
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
      <StyledCardContent>
        {/* Card Type Pill with Icon - Conditionally rendered */}
        {showTypePill &&
          (() => {
            const typeColors =
              item.cardType === 'showcase'
                ? showcaseColors
                : item.cardType === 'gallery'
                ? galleryColors
                : eventColors;

            return (
              <Chip
                icon={
                  item.cardType === 'showcase' ? (
                    <ViewCarouselIcon
                      sx={{
                        fontSize: '0.85rem !important',
                        color: 'inherit !important',
                      }}
                    />
                  ) : item.cardType === 'gallery' ? (
                    <CollectionsIcon
                      sx={{
                        fontSize: '0.85rem !important',
                        color: 'inherit !important',
                      }}
                    />
                  ) : (
                    <EventIcon
                      sx={{
                        fontSize: '0.85rem !important',
                        color: 'inherit !important',
                      }}
                    />
                  )
                }
                label={
                  item.cardType === 'showcase'
                    ? 'Showcase'
                    : item.cardType === 'gallery'
                    ? 'Gallery'
                    : 'Event'
                }
                size='small'
                sx={{
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
                  fontSize: '0.65rem',
                  height: '22px',
                  border: 'none',
                  backgroundColor: typeColors.bg,
                  color: typeColors.text,
                  mb: 1,
                  '& .MuiChip-label': {
                    color: typeColors.text,
                  },
                  '& .MuiChip-icon': {
                    marginLeft: '6px',
                    color: typeColors.text,
                  },
                }}
              />
            );
          })()}

        {/* Display Region/Build Chips and Social Icons */}
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
                +{(item.regions?.length || 0) + (item.builds?.length || 0) - 4}
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

export default ShowcaseCard;
