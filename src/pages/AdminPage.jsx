// src/pages/AdminPage.jsx
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
  Select,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Chip from '@mui/material/Chip';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from '../firebase'; // Adjust path if needed
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '', // Main image URL
    additionalImages: [], // Array to store up to 8 additional image URLs
    cardType: 'showcase', // New field: 'showcase' or 'information'
    regions: [], // Array of selected region chips
    builds: [], // Array of selected build chips
    youtubeLink: '', // YouTube video link
    discordLink: '', // Discord server link
  });
  const [galleryItems, setGalleryItems] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Chip options with MUI theme-aware colors
  const regionOptions = [
    { label: 'North America', color: 'error' },
    { label: 'Europe', color: 'info' },
    { label: 'South America', color: 'warning' },
    { label: 'Southeast Asia', color: 'success' },
    { label: 'Other Regions', color: 'secondary' },
    { label: 'Custom Server', color: 'primary' },
  ];

  const buildOptions = [
    { label: 'Showcase', color: 'error' },
    { label: 'Tutorial', color: 'info' },
    { label: 'Outfit', color: 'default' },
    { label: 'Character', color: 'warning' },
    { label: 'Decoration', color: 'success' },
  ];

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not logged in, redirect to login
        navigate('/login');
      } else {
        // ✅ AUTHORIZATION: Restrict access to specific users
        const allowedEmails = [
          'ayobad7@gmail.com', // Add your allowed email addresses here
          'potato@once.com',
          'oncehumanbuilding@gmail.com',
        ];

        if (!allowedEmails.includes(user.email)) {
          // User is not authorized
          setMessage(
            'Access denied. You are not authorized to access this page.'
          );
          signOut(auth); // Sign them out
          setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } else {
          // User is authorized, load gallery items
          loadGalleryItems();
        }
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

  const handleCardTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      cardType: e.target.value,
    }));
  };

  const handleChipToggle = (chipType, chipLabel) => {
    setFormData((prev) => {
      const currentArray = prev[chipType];
      const isSelected = currentArray.includes(chipLabel);

      return {
        ...prev,
        [chipType]: isSelected
          ? currentArray.filter((item) => item !== chipLabel)
          : [...currentArray, chipLabel],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.imageUrl) {
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      // Get current user's email
      const currentUser = auth.currentUser;
      const userEmail = currentUser?.email || '';

      // Save gallery item data (including image URL) to Firestore
      await addDoc(collection(db, 'galleryItems'), {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl, // Main image URL
        email: userEmail, // Auto-detected from logged-in user
        additionalImages: formData.additionalImages.filter(
          (img) => img.trim() !== ''
        ), // Filter out empty strings
        timestamp: new Date(), // Add a timestamp
        cardType: formData.cardType, // Add the cardType field
        regions: formData.regions, // Add the regions chips
        builds: formData.builds, // Add the builds chips
        youtubeLink: formData.youtubeLink, // YouTube link
        discordLink: formData.discordLink, // Discord link
        isSpotlight: false, // Default to not spotlight
        spotlightDate: null, // Will be set when starred
      });

      setMessage('Gallery item added successfully!');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        additionalImages: [],
        cardType: 'showcase', // Reset to default
        regions: [], // Reset regions
        builds: [], // Reset builds
        youtubeLink: '',
        discordLink: '',
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

  const handleToggleSpotlight = async (itemId, currentSpotlightStatus) => {
    try {
      // If we're setting this as spotlight, unset all others first
      if (!currentSpotlightStatus) {
        const allItems = await getDocs(collection(db, 'galleryItems'));
        const updatePromises = allItems.docs.map((docItem) =>
          updateDoc(doc(db, 'galleryItems', docItem.id), { isSpotlight: false })
        );
        await Promise.all(updatePromises);

        // Set spotlight with permanent date
        await updateDoc(doc(db, 'galleryItems', itemId), {
          isSpotlight: true,
          spotlightDate: new Date(), // Save date when starred
        });
      } else {
        // Remove spotlight but keep the date
        await updateDoc(doc(db, 'galleryItems', itemId), {
          isSpotlight: false,
          // spotlightDate remains - it's permanent
        });
      }

      setMessage(
        !currentSpotlightStatus
          ? 'Item set as spotlight!'
          : 'Spotlight removed!'
      );
      loadGalleryItems(); // Refresh the list
    } catch (error) {
      console.error('Error toggling spotlight:', error);
      setMessage('Failed to update spotlight status');
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
            {/* Card Type - Moved to top with Radio Group */}
            <FormControl component='fieldset' sx={{ mb: 3 }} fullWidth>
              <FormLabel component='legend'>Card Type</FormLabel>
              <RadioGroup
                row
                name='cardType'
                value={formData.cardType}
                onChange={handleCardTypeChange}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value='showcase'
                  control={<Radio />}
                  label='Showcase'
                />
                <FormControlLabel
                  value='information'
                  control={<Radio />}
                  label='Information'
                />
              </RadioGroup>
            </FormControl>

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

            {/* Region Chips */}
            <FormControl component='fieldset' sx={{ mt: 3 }} fullWidth>
              <FormLabel component='legend'>Region (Select Multiple)</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {regionOptions.map((region) => (
                  <Chip
                    key={region.label}
                    label={region.label}
                    color={region.color}
                    variant={
                      formData.regions.includes(region.label)
                        ? 'filled'
                        : 'outlined'
                    }
                    onClick={() => handleChipToggle('regions', region.label)}
                    sx={{
                      fontWeight: formData.regions.includes(region.label)
                        ? 'bold'
                        : 'normal',
                    }}
                  />
                ))}
              </Box>
            </FormControl>

            {/* Build Chips */}
            <FormControl component='fieldset' sx={{ mt: 3 }} fullWidth>
              <FormLabel component='legend'>
                Build Type (Select Multiple)
              </FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {buildOptions.map((build) => (
                  <Chip
                    key={build.label}
                    label={build.label}
                    color={build.color}
                    variant={
                      formData.builds.includes(build.label)
                        ? 'filled'
                        : 'outlined'
                    }
                    onClick={() => handleChipToggle('builds', build.label)}
                    sx={{
                      fontWeight: formData.builds.includes(build.label)
                        ? 'bold'
                        : 'normal',
                    }}
                  />
                ))}
              </Box>
            </FormControl>

            {/* YouTube and Discord Links */}
            <TextField
              fullWidth
              label='YouTube Link (Optional)'
              name='youtubeLink'
              value={formData.youtubeLink}
              onChange={handleInputChange}
              margin='normal'
              placeholder='https://youtube.com/...'
              helperText='Add a YouTube video link'
            />
            <TextField
              fullWidth
              label='Discord Link (Optional)'
              name='discordLink'
              value={formData.discordLink}
              onChange={handleInputChange}
              margin='normal'
              placeholder='https://discord.gg/...'
              helperText='Add a Discord server invite link'
            />

            {/* Additional Images - Full width like title */}
            <FormControl component='fieldset' sx={{ mt: 3 }} fullWidth>
              <FormLabel component='legend'>
                Additional Images (Up to 8)
              </FormLabel>
              <FormGroup>
                {[...Array(8)].map((_, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    type='text'
                    value={formData.additionalImages[index] || ''}
                    onChange={(e) =>
                      handleAdditionalImageChange(index, e.target.value)
                    }
                    placeholder={`Additional Image ${index + 1} URL`}
                    sx={{ mt: 1 }}
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
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      aria-label='toggle spotlight'
                      onClick={() =>
                        handleToggleSpotlight(item.id, item.isSpotlight)
                      }
                      color={item.isSpotlight ? 'warning' : 'default'}
                    >
                      {item.isSpotlight ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleDeleteClick(item.id)} // Pass the Firestore document ID
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {item.cardType === 'showcase'
                          ? 'Showcase'
                          : 'Information'}
                      </Typography>
                      {' — '}
                      {item.description
                        ? item.description.substring(0, 50) + '...'
                        : 'No description'}
                    </>
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
