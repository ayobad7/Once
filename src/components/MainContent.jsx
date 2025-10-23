// src/components/MainContent.jsx
import React from 'react';
import { Container } from '@mui/material';

function MainContent({ children }) {
  return <Container sx={{ mt: 4 }}>{children}</Container>;
}

export default MainContent;
