// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { db } from '../firebase'; // Adjust path if needed
import { collection, getDocs, orderBy, query } from 'firebase/firestore'; // Import orderBy and query
// --- Add the import for AppAppBar ---
import AppAppBar from '../components/AppAppBar'; // Adjust the path if AppAppBar is in a different location
// --- Add the import for MainContent and Footer ---
import MainContent from '../components/MainContent'; // Adjust the path
import Footer from '../components/Footer'; // Adjust the path
// --- Add the import for ShowcaseCard and TutorialCard ---
import ShowcaseCard from '../components/ShowcaseCard'; // Adjust the path
import TutorialCard from '../components/TutorialCard'; // Adjust the path

function HomePage({ onToggleTheme }) {
  // Accept onToggleTheme prop
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery items on component mount
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        // Optional: Order by timestamp for consistent display
        const q = query(
          collection(db, 'galleryItems'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGalleryItems(items);
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

  // Separate items by type for layout arrangement
  const showcaseItems = galleryItems.filter(
    (item) => item.itemType === 'showcase'
  );
  const tutorialItems = galleryItems.filter(
    (item) => item.itemType === 'tutorial'
  );

  return (
    <>
      <AppAppBar onToggleTheme={onToggleTheme} />{' '}
      {/* Pass onToggleTheme to AppAppBar */}
      <MainContent>
        {/* Match the Container's sx props from AppAppBar.jsx */}
        <Container maxWidth='lg' sx={{ py: 9, px: 2 }}>
          <Typography variant='h2' component='h1' gutterBottom align='center'>
            We Build Stuff
          </Typography>
          <Typography variant='h6' component='h2' gutterBottom align='center'>
            Even though things always broken
          </Typography>

          {/* Showcase Items - 2 per row */}
          {showcaseItems.length > 0 && (
            <>
              <Grid container spacing={2} justifyContent='center'>
                {showcaseItems.map((item) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    {' '}
                    {/* xs=12, sm=6 means 1 per row on mobile, 2 per row on small screens and up */}
                    <ShowcaseCard item={item} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Tutorial Items - 3 per row */}
          {tutorialItems.length > 0 && (
            <>
              <Typography
                variant='h4'
                component='h2'
                gutterBottom
                sx={{ mt: 4 }}
                align='center'
              >
                Latest Posts
              </Typography>
              <Grid container spacing={2} justifyContent='center'>
                {tutorialItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    {' '}
                    {/* xs=12, sm=6, md=4 means 1 per row on mobile, 2 on small, 3 on medium screens and up */}
                    <TutorialCard item={item} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </MainContent>
      <Footer />
    </>
  );
}

export default HomePage;
