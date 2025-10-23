// src/components/ShowcaseCard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  ImageList,
  ImageListItem,
} from '@mui/material';

function ShowcaseCard({ item }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper', // Use theme's paper color
        color: 'text.primary', // Use theme's text color
        border: '1px solid', // Use theme's divider color
        borderColor: 'divider', // Set border color to theme's divider color
        borderRadius: 4, // Increased border radius for more rounded corners
        boxShadow: 'none', // Remove shadow for flat look
      }}
    >
      {item.image && (
        <CardMedia
          component='img'
          height='250' // Adjust height as needed
          image={item.image} // Use 'image' field from Firebase
          alt={item.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='caption' color='text.secondary' gutterBottom>
          {item.category || 'Category'} {/* Display category field */}
        </Typography>
        <Typography gutterBottom variant='h5' component='h2'>
          {item.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
        {/* Display additional images below the description */}
        {item.additionalImages && item.additionalImages.length > 0 && (
          <>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              sx={{ mt: 2 }}
            >
              Additional Images:
            </Typography>
            <ImageList cols={2} gap={8} sx={{ mt: 1 }}>
              {item.additionalImages.map((imgUrl, index) => (
                <ImageListItem key={`${item.id}-add-${index}`}>
                  <img
                    src={imgUrl}
                    alt={`Additional ${index + 1}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }} // Crop and scale
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {item.email && (
            <Avatar sx={{ bgcolor: '#ccc', mr: 1 }} aria-label='author'>
              {item.email.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography variant='caption' color='text.secondary'>
            {item.email ? item.email.split('@')[0] : 'Anonymous'}
          </Typography>
        </Box>
        <Typography variant='caption' color='text.secondary'>
          {item.timestamp
            ? item.timestamp.toDate().toLocaleString()
            : 'Unknown Date'}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ShowcaseCard;
