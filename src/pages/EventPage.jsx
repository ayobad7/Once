// src/pages/EventPage.jsx - Display all event cards
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import CardModal from '../components/CardModal';

function EventPage({ onToggleTheme }) {
  const [eventCards, setEventCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all event cards
  useEffect(() => {
    const fetchEventCards = async () => {
      try {
        setLoading(true);
        // Fetch all items and filter in JavaScript to avoid needing Firestore index
        const q = query(
          collection(db, 'galleryItems'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.cardType === 'event'); // Filter in JS
        setEventCards(items);
        setError(null);
      } catch (err) {
        console.error('Error fetching event cards:', err);
        setError('Failed to load event cards.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventCards();
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
            Events
          </Typography>
          <Typography variant='body1' gutterBottom sx={{ mb: 4 }}>
            Browse all our events and community activities
          </Typography>

          <Grid container spacing={2}>
            {eventCards.map((item) => (
              <Grid item xs={12} key={item.id}>
                <EventCard item={item} onClick={() => handleCardClick(item)} />
              </Grid>
            ))}
          </Grid>

          {eventCards.length === 0 && (
            <Typography variant='body1' align='center' sx={{ mt: 4 }}>
              No event items yet.
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

export default EventPage;
