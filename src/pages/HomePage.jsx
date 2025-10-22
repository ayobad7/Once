import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { getGalleryItems } from '../data/galleryData'; // We'll create this next

function HomePage() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const items = getGalleryItems();
    setGalleryItems(items);
  }, []);

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        My Gallery Portfolio
      </Typography>
      <Grid container spacing={3}>
        {galleryItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component='img'
                height='200'
                image={item.image}
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
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
