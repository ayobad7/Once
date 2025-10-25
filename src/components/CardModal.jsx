// src/components/CardModal.jsx (Revised - Added null check)
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  ImageList,
  ImageListItem,
} from '@mui/material';

function CardModal({ open, onClose, item }) {
  // Check if item is null or undefined before rendering its content
  if (!item) {
    // If item is null, render an empty dialog or a loading state, but keep the Dialog open if needed.
    // Often, it's better to ensure 'item' is not null when 'open' is true.
    // This check prevents the error, but the ideal flow is that 'open' is false when 'item' is null.
    // The parent component (HomePage) should manage this state correctly.
    return (
      <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
        {/* Optionally, render a default message or just nothing */}
        {/* <DialogContent>Item not found</DialogContent> */}
      </Dialog>
    );
  }

  // If item exists, render the full modal content
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant='caption' color='text.secondary' gutterBottom>
            {item.category || 'Category'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item.description}
          </Typography>
        </Box>
        {item.image && (
          <Box sx={{ mb: 2 }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </Box>
        )}
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
                    }}
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant='caption' color='text.secondary'>
            {item.email ? item.email.split('@')[0] : 'Anonymous'}
          </Typography>
          <Typography variant='caption' color='text.secondary' sx={{ ml: 2 }}>
            {item.timestamp
              ? item.timestamp.toDate().toLocaleString()
              : 'Unknown Date'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardModal;
