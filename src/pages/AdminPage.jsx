import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link, // Import Link for potential GitHub login
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// We'll use localStorage for now, but later this will connect to Netlify CMS
import {
  saveGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
} from '../data/galleryData';

function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '', // This will hold the image URL/path
  });
  const [galleryItems, setGalleryItems] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = () => {
    const items = getGalleryItems();
    setGalleryItems(items);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For local development, we'll use a file input to get the image URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: e.target.result, // This is the data URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      setMessage('Please fill in all fields');
      return;
    }

    saveGalleryItem(formData);
    setFormData({ title: '', description: '', image: '' });
    setMessage('Gallery item saved successfully! (Using localStorage for now)');
    loadGalleryItems(); // Refresh the list

    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteClick = (index) => {
    setItemToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      deleteGalleryItem(itemToDelete);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      loadGalleryItems(); // Refresh the list
      setMessage(
        'Gallery item deleted successfully! (Using localStorage for now)'
      );
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Admin Panel (Local Storage Demo)
      </Typography>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        Note: This current version uses browser localStorage. The final version
        will connect to GitHub via Netlify CMS.
      </Typography>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        To use the live admin panel, go to{' '}
        <Link href='/admin' target='_blank'>
          /admin
        </Link>{' '}
        after deployment.
      </Typography>

      {message && (
        <Alert
          severity={message.includes('successfully') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Add New Gallery Item
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              margin='normal'
              required
            />
            <TextField
              fullWidth
              label='Description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              margin='normal'
              multiline
              rows={3}
              required
            />
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              style={{ marginTop: '16px' }}
            />
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 2 }}
              disabled={
                !formData.title || !formData.description || !formData.image
              }
            >
              Add to Gallery (Local)
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Existing Gallery Items ({galleryItems.length})
          </Typography>
          <List>
            {galleryItems.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => handleDeleteClick(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={item.description.substring(0, 50) + '...'}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this gallery item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
