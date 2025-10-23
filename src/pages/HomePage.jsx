// src/pages/HomePage.jsx (Revamped - Fixed State Management)
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ImageList,
  ImageListItem,
  CircularProgress,
  Alert,
  styled,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from '../firebase'; // Adjust path if needed
import { collection, getDocs } from 'firebase/firestore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

function HomePage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to track which item's collapse is expanded
  // Using an object where keys are item IDs and values are booleans
  const [expandedItems, setExpandedItems] = useState({});

  // Fetch gallery items on component mount
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'galleryItems'));
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

  // Function to handle the expand/collapse click for a specific item
  const handleExpandClick = (itemId) => {
    setExpandedItems((prevState) => ({
      // Spread the previous state
      ...prevState,
      // Toggle the state for the clicked item
      [itemId]: !prevState[itemId],
    }));
  };

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
        My Gallery Portfolio
      </Typography>

      <Grid container spacing={3}>
        {galleryItems.length > 0 ? (
          galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label='user'>
                      {item.email ? item.email.charAt(0).toUpperCase() : 'U'}{' '}
                      {/* First letter of email */}
                    </Avatar>
                  }
                  action={
                    // Only show settings icon if user is logged in
                    // You need to check authentication state here
                    // For now, we'll assume a simple check for demo
                    // In a real app, you would use Firebase Auth state
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.title}
                  subheader={
                    item.timestamp
                      ? item.timestamp.toDate().toLocaleString()
                      : 'Unknown Date'
                  }
                />
                <CardMedia
                  component='img'
                  height='200'
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ShareIcon />
                  </IconButton>
                  {/* Add an ExpandMoreIcon for collapse/expand */}
                  <ExpandMore
                    expand={expandedItems[item.id] || false} // Use the state for this specific item
                    onClick={() => handleExpandClick(item.id)} // Call the handler with the item's ID
                    aria-expanded={expandedItems[item.id] || false} // Use the state for this specific item
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                {/* Collapse section for additional images */}
                <Collapse
                  in={expandedItems[item.id] || false}
                  timeout='auto'
                  unmountOnExit
                >
                  {' '}
                  {/* Use the state for this specific item */}
                  <CardContent>
                    <Typography sx={{ marginBottom: 2 }}>
                      Additional Images:
                    </Typography>
                    {/* Check if there are additional images */}
                    {item.additionalImages &&
                    item.additionalImages.length > 0 ? (
                      <ImageList
                        sx={{ width: 500, height: 450 }}
                        variant='quilted'
                        cols={4}
                        rowHeight={121}
                      >
                        {item.additionalImages.map((imgUrl, index) => (
                          <ImageListItem key={index} cols={1} rows={1}>
                            <img
                              src={imgUrl}
                              alt={`Additional Image ${index + 1}`}
                              loading='lazy'
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    ) : (
                      <Typography>No additional images.</Typography>
                    )}
                  </CardContent>
                </Collapse>
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
