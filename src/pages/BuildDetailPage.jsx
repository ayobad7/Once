// src/pages/BuildDetailPage.jsx - Individual Build Detail Page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  Chip,
  Stack,
  IconButton,
  Avatar,
  AvatarGroup,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';
import { FaDiscord } from 'react-icons/fa6';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import CollectionsIcon from '@mui/icons-material/Collections';
import EventIcon from '@mui/icons-material/Event';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import DescriptionWithLinks from '../components/DescriptionWithLinks';
import ImageViewerModal from '../components/ImageViewerModal';
import RegionChip from '../components/chips/RegionChip';
import CategoryChip from '../components/chips/CategoryChip';
import DaysRemainingChip from '../components/chips/DaysRemainingChip';
import EventStatusChip from '../components/chips/EventStatusChip';
import {
  getEventStatus,
  getDaysRemaining,
  pastelColors,
} from '../utils/cardUtils';

function BuildDetailPage({ onToggleTheme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Pastel colors for Builder Spotlight and card type pills
  const spotlightColors = pastelColors.orange[mode];
  const showcaseColors = pastelColors.red[mode];
  const galleryColors = pastelColors.blue[mode];
  const eventColors = pastelColors.yellow[mode];

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        const docRef = doc(db, 'galleryItems', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBuild({ id: docSnap.id, ...docSnap.data() });
        } else {
          setBuild(null);
        }
      } catch (error) {
        console.error('Error fetching build:', error);
        setBuild(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [id]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date =
      timestamp.toDate instanceof Function
        ? timestamp.toDate()
        : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <AppAppBar onToggleTheme={onToggleTheme} />
        <MainContent>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '80vh',
            }}
          >
            <CircularProgress />
          </Container>
        </MainContent>
        <Footer />
      </>
    );
  }

  if (!build) {
    return (
      <>
        <AppAppBar onToggleTheme={onToggleTheme} />
        <MainContent>
          <Container sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
            <Typography variant='h3' gutterBottom>
              Build Not Found
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
              The build you're looking for doesn't exist or has been removed.
            </Typography>
            <Button
              variant='contained'
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
            >
              Back to Home
            </Button>
          </Container>
        </MainContent>
        <Footer />
      </>
    );
  }

  // Prepare all images
  const allImages = [
    build.image,
    ...(build.additionalImages || []).filter((img) => img),
  ];

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

  const handleImageClick = (imageUrl) => {
    setZoomImageUrl(imageUrl);
    setZoomModalOpen(true);
  };

  const handleCloseZoomModal = () => {
    setZoomModalOpen(false);
    setZoomImageUrl('');
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/build/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Use shared utility functions
  const eventStatus = build
    ? getEventStatus(build.eventStartDate, build.eventEndDate)
    : null;
  const daysRemaining = build
    ? getDaysRemaining(build.eventStartDate, build.eventEndDate)
    : null;

  return (
    <>
      <AppAppBar onToggleTheme={onToggleTheme} />
      <MainContent>
        <Container maxWidth='lg' sx={{ pt: 12, pb: 8 }}>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          {/* Build Content */}
          <Box>
            {/* Title */}
            <Typography
              variant='h3'
              component='h1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {build.title}
            </Typography>

            {/* Chips Section */}
            <Box sx={{ mb: 3 }}>
              {/* Card Type Pill */}
              {(() => {
                const typeColors =
                  build.cardType === 'showcase'
                    ? showcaseColors
                    : build.cardType === 'gallery'
                    ? galleryColors
                    : eventColors;

                return (
                  <Chip
                    icon={
                      build.cardType === 'showcase' ? (
                        <ViewCarouselIcon
                          sx={{
                            fontSize: '0.85rem !important',
                            color: 'inherit !important',
                          }}
                        />
                      ) : build.cardType === 'gallery' ? (
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
                      build.cardType === 'showcase'
                        ? 'Showcase'
                        : build.cardType === 'gallery'
                        ? 'Gallery'
                        : 'Event'
                    }
                    size='small'
                    sx={{
                      mr: 1,
                      mb: 1,
                      fontSize: '0.65rem',
                      height: '22px',
                      border: 'none',
                      backgroundColor: typeColors.bg,
                      color: typeColors.text,
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

              {/* Event Status Pill - Only for event cards */}
              {build.cardType === 'event' && (
                <EventStatusChip
                  eventStatus={eventStatus}
                  fontSize='0.7rem'
                  height='22px'
                  sx={{ mr: 1, mb: 1 }}
                />
              )}

              {/* Builder Spotlight Chip */}
              {build.spotlightDate && (
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
                    build.spotlightDate.toDate
                      ? build.spotlightDate
                          .toDate()
                          .toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })
                      : 'Featured'
                  }`}
                  size='small'
                  sx={{
                    mr: 1,
                    mb: 1,
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

              {/* Region & Build Chips with Social Icons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 2,
                }}
              >
                {/* Left side: Region & Build Chips */}
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
                  {build.regions &&
                    build.regions.map((region) => (
                      <RegionChip
                        key={region}
                        region={region}
                        fontSize='0.65rem'
                        height='20px'
                        iconSize='0.75rem'
                      />
                    ))}
                  {build.builds &&
                    build.builds.map((buildItem) => (
                      <CategoryChip
                        key={buildItem}
                        category={buildItem}
                        fontSize='0.65rem'
                        height='20px'
                        iconSize='0.75rem'
                      />
                    ))}
                </Box>

                {/* Right side: Social Icons */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {build.youtubeLink && (
                    <IconButton
                      size='small'
                      onClick={() => window.open(build.youtubeLink, '_blank')}
                      sx={{
                        padding: '4px',
                        color: '#FF0000',
                        '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' },
                      }}
                    >
                      <YouTubeIcon sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                  )}
                  {build.discordLink && (
                    <IconButton
                      size='small'
                      onClick={() => window.open(build.discordLink, '_blank')}
                      sx={{
                        padding: '4px',
                        color: '#5865F2',
                        '&:hover': {
                          backgroundColor: 'rgba(88, 101, 242, 0.1)',
                        },
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
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <LinkIcon sx={{ fontSize: '1.5rem' }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Description */}
            <Typography variant='body1' sx={{ mb: 4, fontWeight: 300 }}>
              <DescriptionWithLinks description={build.description} />
            </Typography>

            {/* Image Gallery */}
            {allImages.length > 0 && (
              <Box sx={{ position: 'relative', mb: 4 }}>
                {/* Main Image Display */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${build.title} - Image ${currentImageIndex + 1}`}
                    onClick={() =>
                      handleImageClick(allImages[currentImageIndex])
                    }
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      cursor: 'pointer',
                    }}
                  />

                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <IconButton
                        onClick={handlePrevImage}
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                        }}
                      >
                        <ArrowBackIosNewIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleNextImage}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>

                      {/* Image Counter */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: '16px',
                          fontSize: '0.875rem',
                        }}
                      >
                        {currentImageIndex + 1} / {allImages.length}
                      </Box>
                    </>
                  )}
                </Box>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <Stack
                    direction='row'
                    spacing={1}
                    sx={{
                      mt: 2,
                      overflowX: 'auto',
                      pb: 1,
                    }}
                  >
                    {allImages.map((img, index) => (
                      <Box
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        onDoubleClick={() => handleImageClick(img)}
                        sx={{
                          minWidth: '80px',
                          height: '80px',
                          cursor: 'pointer',
                          border: currentImageIndex === index ? 3 : 1,
                          borderColor:
                            currentImageIndex === index
                              ? 'primary.main'
                              : 'divider',
                          borderRadius: 1,
                          overflow: 'hidden',
                          opacity: currentImageIndex === index ? 1 : 0.6,
                          transition: 'all 0.2s',
                          '&:hover': { opacity: 1 },
                          position: 'relative',
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
                  </Stack>
                )}
              </Box>
            )}

            {/* Author and Date */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 3,
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
                {build.email ? (
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
                        alt={build.email}
                        src='/static/images/avatar/1.jpg'
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                    <Typography variant='caption'>
                      {build.email.split('@')[0]}
                    </Typography>
                  </>
                ) : (
                  <Typography variant='caption'>Anonymous</Typography>
                )}
              </Box>
              <Typography variant='caption' color='text.secondary'>
                {formatDate(build.timestamp)}
              </Typography>
            </Box>
          </Box>
        </Container>
      </MainContent>
      <Footer />

      {/* Image Zoom Viewer Modal */}
      <ImageViewerModal
        open={zoomModalOpen}
        onClose={handleCloseZoomModal}
        imageUrl={zoomImageUrl}
        imageName={build?.title}
      />

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
    </>
  );
}

export default BuildDetailPage;
