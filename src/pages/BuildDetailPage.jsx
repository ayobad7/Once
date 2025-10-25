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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YouTubeIcon from '@mui/icons-material/YouTube';
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

// Color mappings (same as CardModal)
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

function BuildDetailPage({ onToggleTheme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
                color={
                  build.cardType === 'showcase'
                    ? 'error'
                    : build.cardType === 'gallery'
                    ? 'info'
                    : 'warning'
                }
                variant='filled'
                sx={{
                  mr: 1,
                  mb: 1,
                  fontSize: '0.65rem',
                  height: '22px',
                  border: 'none',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#000' : undefined,
                  '& .MuiChip-icon': {
                    marginLeft: '6px',
                  },
                }}
              />

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
                  color='warning'
                  sx={{
                    mr: 1,
                    mb: 1,
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

              {/* Region & Build Chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Stack
                  direction='row'
                  spacing={0.5}
                  flexWrap='wrap'
                  sx={{ gap: 0.5 }}
                >
                  {build.regions &&
                    build.regions.map((region) => (
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
                  {build.builds &&
                    build.builds.map((buildItem) => (
                      <Chip
                        key={buildItem}
                        label={buildItem}
                        size='small'
                        color={buildColors[buildItem] || 'default'}
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
                </Stack>

                {/* Social Icons */}
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
                    <AvatarGroup max={3}>
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
    </>
  );
}

export default BuildDetailPage;
