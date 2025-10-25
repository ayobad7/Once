// src/components/ShowcaseCard.jsx - Styled to match MUI Blog Template
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Card matching MUI template
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

// Styled Content matching MUI template
const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

// Typography with 2-line clamp for description
const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Author section component
function Author({ email, timestamp }) {
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Unknown Date';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
        }}
      >
        {email ? (
          <>
            <AvatarGroup max={3}>
              <Avatar
                alt={email}
                src='/static/images/avatar/1.jpg'
                sx={{ width: 24, height: 24 }}
              />
            </AvatarGroup>
            <Typography variant='caption'>{email.split('@')[0]}</Typography>
          </>
        ) : (
          <Typography variant='caption'>Anonymous</Typography>
        )}
      </Box>
      <Typography variant='caption'>{formatDate(timestamp)}</Typography>
    </Box>
  );
}

function ShowcaseCard({ item, layout, onClick }) {
  // Determine image aspect ratio and height based on layout
  const getImageStyle = () => {
    switch (layout) {
      case 'spotlight':
        return {
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        };
      case 'showcase':
        return {
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        };
      case 'information':
        return {
          height: { sm: 'auto', md: '50%' },
          aspectRatio: { sm: '16 / 9', md: '' },
        };
      default:
        return {
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        };
    }
  };

  return (
    <StyledCard
      variant='outlined'
      onClick={onClick}
      tabIndex={0}
      sx={{ height: '100%' }}
    >
      {item.image && (
        <CardMedia
          component='img'
          alt={item.title}
          image={item.image}
          sx={getImageStyle()}
        />
      )}
      <StyledCardContent>
        <Typography gutterBottom variant='caption' component='div'>
          {item.category || 'Uncategorized'}
        </Typography>
        <Typography gutterBottom variant='h6' component='div'>
          {item.title}
        </Typography>
        <StyledTypography variant='body2' color='text.secondary' gutterBottom>
          {item.description}
        </StyledTypography>
      </StyledCardContent>
      <Author email={item.email} timestamp={item.timestamp} />
    </StyledCard>
  );
}

export default ShowcaseCard;
