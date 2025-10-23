// src/components/RandomLetterAvatar.jsx
import React from 'react';
import { Avatar } from '@mui/material';
import { stringToColor } from './utils'; // We'll create this utility function

const RandomLetterAvatar = ({ email, size = 40 }) => {
  const initials = email ? email.charAt(0).toUpperCase() : 'U';

  return (
    <Avatar
      sx={{
        bgcolor: stringToColor(initials + email), // Use email for consistent color
        width: size,
        height: size,
      }}
    >
      {initials}
    </Avatar>
  );
};

export default RandomLetterAvatar;
