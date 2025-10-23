// src/components/GalleryCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
  Box,
  ImageList,
  ImageListItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { stringToColor } from './utils'; // Import the utility
import ShowcaseCard from './ShowcaseCard';
import TutorialCard from './TutorialCard';

// Styled ExpandMoreIcon component for the collapse functionality
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GalleryCard = ({ item, currentUser }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Determine the avatar color based on the author's email (or a default)
  const avatarColor = item.email ? stringToColor(item.email) : '#ccc';

  // Render different card styles based on itemType
  if (item.itemType === 'tutorial') {
    return (
      <TutorialCard
        item={item}
        avatarColor={avatarColor}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        currentUser={currentUser}
      />
    );
  } else {
    // Default to Showcase style for 'showcase' or any other type
    return (
      <ShowcaseCard
        item={item}
        avatarColor={avatarColor}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        currentUser={currentUser}
      />
    );
  }
};

export default GalleryCard;
