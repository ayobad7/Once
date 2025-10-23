// src/components/Latest.jsx
import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

function Latest({ items }) {
  // Accept items as prop
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant='h4' component='h2' gutterBottom align='center'>
        Latest Posts
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {' '}
            {/* 3 per row on medium screens */}
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {item.mainImage && (
                <CardMedia
                  component='img'
                  height='194'
                  image={item.mainImage}
                  alt={item.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant='h5' component='h2'>
                  {item.title}
                </Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>View</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Latest;
