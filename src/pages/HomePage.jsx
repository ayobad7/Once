// src/pages/HomePage.jsx - Fixed Layout with Spotlight, Showcase, and Gallery cards
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import ShowcaseCard from '../components/ShowcaseCard';
import EventCard from '../components/EventCard';
import CardModal from '../components/CardModal';

function HomePage({ onToggleTheme }) {
  const [spotlightCard, setSpotlightCard] = useState(null);
  const [showcaseCards, setShowcaseCards] = useState([]);
  const [galleryCards, setGalleryCards] = useState([]);
  const [eventCards, setEventCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch gallery items on component mount
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, 'galleryItems'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Find spotlight card (only one can be starred)
        const spotlight = items.find((item) => item.isSpotlight);
        setSpotlightCard(spotlight || null);

        // Filter out spotlight card from the rest
        const nonSpotlightItems = items.filter((item) => !item.isSpotlight);

        // Get latest 2 showcase cards (excluding spotlight)
        const showcases = nonSpotlightItems
          .filter((item) => item.cardType === 'showcase')
          .slice(0, 2);
        setShowcaseCards(showcases);

        // Get latest 3 gallery cards (excluding spotlight)
        const gallery = nonSpotlightItems
          .filter((item) => item.cardType === 'gallery')
          .slice(0, 3);
        setGalleryCards(gallery);

        // Get latest 2 event cards (excluding spotlight)
        const events = nonSpotlightItems
          .filter((item) => item.cardType === 'event')
          .slice(0, 2);
        setEventCards(events);

        setError(null);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setError('Failed to load gallery items.');
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  // Function to handle card click
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      <AppAppBar onToggleTheme={onToggleTheme} />
      <MainContent>
        <Container maxWidth='lg' sx={{ pt: 12, pb: 4 }}>
          <Typography variant='h1' component='h1' gutterBottom>
            Build Showcase
          </Typography>
          <Typography variant='body1' gutterBottom sx={{ mb: 4 }}>
            Explore amazing bases from talented builders
          </Typography>

          {/* Fixed Layout: Spotlight + Showcase + Information */}
          <Grid container spacing={2}>
            {/* Spotlight Card - Full Width */}
            {spotlightCard && (
              <Grid item xs={12}>
                <ShowcaseCard
                  item={spotlightCard}
                  layout='spotlight'
                  onClick={() => handleCardClick(spotlightCard)}
                />
              </Grid>
            )}

            {/* Showcase Cards - 2 cards at 50% width each (6 cols each in 12-col grid) */}
            {showcaseCards.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <ShowcaseCard
                  item={item}
                  layout='showcase'
                  onClick={() => handleCardClick(item)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Gallery Section */}
          {galleryCards.length > 0 && (
            <>
              <Typography
                variant='h4'
                component='h2'
                sx={{ mt: 10, mb: 3, fontWeight: 600 }}
              >
                Gallery
              </Typography>
              <Grid container spacing={2}>
                {galleryCards.map((item) => (
                  <Grid item xs={12} md={4} key={item.id}>
                    <ShowcaseCard
                      item={item}
                      layout='gallery'
                      onClick={() => handleCardClick(item)}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Events Section */}
          {eventCards.length > 0 && (
            <>
              <Typography
                variant='h4'
                component='h2'
                sx={{ mt: 10, mb: 3, fontWeight: 600 }}
              >
                Events
              </Typography>
              <Grid container spacing={2}>
                {eventCards.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <EventCard
                      item={item}
                      onClick={() => handleCardClick(item)}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {!spotlightCard &&
            showcaseCards.length === 0 &&
            galleryCards.length === 0 &&
            eventCards.length === 0 && (
              <Typography variant='body1' align='center' sx={{ mt: 4 }}>
                No items to display yet.
              </Typography>
            )}
        </Container>
      </MainContent>
      <Footer />

      {/* Render the Modal */}
      <CardModal
        open={modalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </>
  );
}

export default HomePage;
