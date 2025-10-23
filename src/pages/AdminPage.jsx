// src/pages/AdminPage.jsx (Updated for New Features)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ImageList,
  ImageListItem,
  Input,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from '../firebase'; // Adjust path if needed
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '', // Main image URL
    email: '', // Optional: User's email for avatar
    additionalImages: [], // Array to store up to 8 additional image URLs
  });
  const [galleryItems, setGalleryItems] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not logged in, redirect to login
        navigate('/login');
      } else {
        // User is logged in, load gallery items
        loadGalleryItems();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  // Function to load gallery items from Firestore
  const loadGalleryItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'galleryItems'));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGalleryItems(items);
    } catch (error) {
      console.error('Error loading gallery items:', error);
      setMessage('Failed to load gallery items');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdditionalImageChange = (index, value) => {
    const newAdditionalImages = [...formData.additionalImages];
    newAdditionalImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      additionalImages: newAdditionalImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.imageUrl) {
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      // Save gallery item data (including image URL) to Firestore
      await addDoc(collection(db, 'galleryItems'), {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl, // Main image URL
        email: formData.email, // Optional: User's email
        additionalImages: formData.additionalImages.filter(
          (img) => img.trim() !== ''
        ), // Filter out empty strings
        timestamp: new Date(), // Add a timestamp
      });

      setMessage('Gallery item added successfully!');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        email: '',
        additionalImages: [],
      }); // Reset form
      loadGalleryItems(); // Refresh the list
    } catch (error) {
      console.error('Error saving item to Firestore:', error);
      setMessage('Failed to save gallery item');
    }
  };

  const handleDeleteClick = (id) => {
    // Pass the Firestore document ID
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteDoc(doc(db, 'galleryItems', itemToDelete)); // Delete using the document ID
        setMessage('Gallery item deleted successfully!');
        setDeleteDialogOpen(false);
        setItemToDelete(null);
        loadGalleryItems(); // Refresh the list
      } catch (error) {
        console.error('Error deleting item:', error);
        setMessage('Failed to delete gallery item');
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
      setMessage('Logout failed');
    }
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Admin Panel (Image URL)
      </Typography>
      <Button
        onClick={handleLogout}
        variant='outlined'
        color='secondary'
        size='small'
      >
        Logout
      </Button>

      {message && (
        <Alert
          severity={message.includes('successfully') ? 'success' : 'error'}
          sx={{ mt: 2, mb: 2 }}
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
            <TextField
              fullWidth
              label='Main Image URL'
              name='imageUrl'
              value={formData.imageUrl}
              onChange={handleInputChange}
              margin='normal'
              required
              placeholder='Paste the direct link to your main image'
            />
            <TextField
              fullWidth
              label='Email (Optional)'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              margin='normal'
              placeholder='Enter your email for the avatar'
            />
            <FormControl component='fieldset' sx={{ mt: 2 }}>
              <FormLabel component='legend'>
                Additional Images (Up to 8)
              </FormLabel>
              <FormGroup>
                {[...Array(8)].map((_, index) => (
                  <TextField // Use TextField instead of Input inside FormControlLabel
                    key={index}
                    type='text'
                    value={formData.additionalImages[index] || ''}
                    onChange={(e) =>
                      handleAdditionalImageChange(index, e.target.value)
                    }
                    placeholder={`Additional Image ${index + 1} URL`}
                    sx={{ mt: 1 }}
                    // Optional: Add helper text if needed
                    // helperText={`Link for Image ${index + 1}`}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 2 }}
              disabled={
                !formData.title || !formData.description || !formData.imageUrl
              }
            >
              Add to Gallery
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
            {galleryItems.map((item) => (
              <ListItem
                key={item.id} // Use the Firestore document ID as the key
                secondaryAction={
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => handleDeleteClick(item.id)} // Pass the Firestore document ID
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={
                    item.description
                      ? item.description.substring(0, 50) + '...'
                      : 'No description'
                  }
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
