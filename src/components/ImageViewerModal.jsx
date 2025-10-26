// src/components/ImageViewerModal.jsx - Simple Image Viewer (100% size)
import React from 'react';
import { Dialog, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ImageViewerModal({ open, onClose, imageUrl, imageName }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          margin: 0,
        },
      }}
      onClick={(e) => {
        // Close on backdrop click (outside image)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Image Container - Scrollable for large images */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          p: 2,
        }}
      >
        <img
          src={imageUrl}
          alt={imageName || 'Full size view'}
          draggable={false}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </Box>

      {/* Instructions */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          px: 3,
          py: 1,
          borderRadius: '20px',
          fontSize: '0.875rem',
          zIndex: 10,
        }}
      >
        Click outside image to close
      </Box>
    </Dialog>
  );
}

export default ImageViewerModal;
