// src/components/TutorialCard.jsx
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
import { styled } from '@mui/material/styles'; // Import styled

// Use styled components like the template
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Ensure full height
  // Use outlined variant styling
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider, // Use theme divider color
  backgroundColor: (theme.vars || theme).palette.background.paper, // Use theme paper color
  '&:hover': {
    // Optional: Add a subtle hover effect
    backgroundColor: (theme.vars || theme).palette.action.hover,
  },
  borderRadius: theme.shape.borderRadius, // Use theme border radius
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1, // Ensure content takes available space
  padding: 16, // Match template padding
  '&:last-child': {
    paddingBottom: 16, // Match template padding
  },
});

function TutorialCard({ item }) {
  return (
    <StyledCard variant='outlined'>
      {' '}
      {/* Use outlined variant */}
      {item.image && (
        <CardMedia
          component='img'
          height='194'
          image={item.image} // Use 'image' field from Firebase
          alt={item.title}
          sx={{
            borderBottom: '1px solid', // Add border below image like template
            borderColor: (theme) => (theme.vars || theme).palette.divider,
          }}
        />
      )}
      <StyledCardContent>
        {' '}
        {/* Use styled CardContent */}
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
      </StyledCardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
        {' '}
        {/* Match template padding */}
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
    </StyledCard>
  );
}

export default TutorialCard;
