// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { db } from '../firebase'; // Adjust path if needed
import { collection, getDocs } from 'firebase/firestore';

function HomePage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'galleryItems')); // Fetch from 'galleryItems' collection
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the Firestore document ID
          ...doc.data(),
        }));
        setGalleryItems(items);
        setError(null); // Clear any previous errors
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
      <Container
        maxWidth='lg'
        sx={{ py: 4, display: 'flex', justifyContent: 'center' }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        My Gallery Portfolio (Firebase)
      </Typography>
      <Grid container spacing={3}>
        {galleryItems.length > 0 ? (
          galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              {' '}
              {/* Use Firestore ID */}
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  height='200'
                  image={item.image} // Use the image URL from Firestore
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant='h6' align='center' color='textSecondary'>
              No gallery items found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default HomePage;
