// src/pages/AdminPage.jsx
import React, { useState, useEffect, useRef } from 'react';
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
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link'; // Link icon for adding links
import SearchIcon from '@mui/icons-material/Search'; // Search icon
import CloseIcon from '@mui/icons-material/Close'; // Close icon
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'; // Showcase icon
import CollectionsIcon from '@mui/icons-material/Collections'; // Gallery icon
import EventIcon from '@mui/icons-material/Event'; // Event icon
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork'; // Builder Spotlight icon
import YouTubeIcon from '@mui/icons-material/YouTube'; // YouTube icon
import { FaDiscord } from 'react-icons/fa6'; // Discord icon
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
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
    cardType: 'showcase', // New field: 'showcase' or 'gallery'
    regions: [], // Array of selected region chips
    builds: [], // Array of selected build chips
    youtubeLink: '', // YouTube video link
    discordLink: '', // Discord server link
  });
  const [galleryItems, setGalleryItems] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'showcase', 'gallery', 'event'
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering

  // Link modal states
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const navigate = useNavigate();
  const auth = getAuth();
  const descriptionRef = useRef(null);

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
    { label: 'Base Design', color: 'error' },
    { label: 'Room Design', color: 'secondary' },
    { label: 'City Build', color: 'primary' },
    { label: 'Tutorial', color: 'info' },
    { label: 'Outfit', color: 'primary' },
    { label: 'Character', color: 'warning' },
    { label: 'Decoration', color: 'success' },
    { label: 'Bug', color: 'error' },
    { label: 'Weapon Build', color: 'secondary' },
    { label: 'Deviation', color: 'warning' },
    { label: 'Update', color: 'info' },
    { label: 'Class', color: 'success' },
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

  // Link modal functions
  const handleOpenLinkModal = () => {
    // Save current cursor position
    if (descriptionRef.current) {
      const input = descriptionRef.current.querySelector('textarea');
      if (input) {
        setCursorPosition(input.selectionStart);
      }
    }
    setLinkModalOpen(true);
  };

  const handleCloseLinkModal = () => {
    setLinkModalOpen(false);
    setLinkText('');
    setLinkUrl('');
  };

  const handleInsertLink = () => {
    if (!linkText || !linkUrl) {
      return;
    }

    // Create markdown-style link
    const markdownLink = `[${linkText}](${linkUrl})`;

    // Insert at cursor position
    const description = formData.description;
    const newDescription =
      description.slice(0, cursorPosition) +
      markdownLink +
      description.slice(cursorPosition);

    setFormData((prev) => ({
      ...prev,
      description: newDescription,
    }));

    handleCloseLinkModal();
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

      const itemData = {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl, // Main image URL
        email: userEmail, // Auto-detected from logged-in user
        additionalImages: formData.additionalImages.filter(
          (img) => img.trim() !== ''
        ), // Filter out empty strings
        cardType: formData.cardType, // Add the cardType field
        regions: formData.regions, // Add the regions chips
        builds: formData.builds, // Add the builds chips
        youtubeLink: formData.youtubeLink, // YouTube link
        discordLink: formData.discordLink, // Discord link
      };

      if (isEditing && editingId) {
        // Update existing item
        const itemRef = doc(db, 'galleryItems', editingId);
        await updateDoc(itemRef, itemData);
        setMessage('Gallery item updated successfully!');
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new item
        await addDoc(collection(db, 'galleryItems'), {
          ...itemData,
          timestamp: new Date(), // Add a timestamp for new items
          isSpotlight: false, // Default to not spotlight
          spotlightDate: null, // Will be set when starred
        });
        setMessage('Gallery item added successfully!');
      }

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
      setMessage(
        isEditing
          ? 'Failed to update gallery item'
          : 'Failed to save gallery item'
      );
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

  const handleEdit = (item) => {
    // Populate form with existing item data
    setFormData({
      title: item.title || '',
      description: item.description || '',
      imageUrl: item.image || '',
      additionalImages: item.additionalImages || [],
      cardType: item.cardType || 'showcase',
      regions: item.regions || [],
      builds: item.builds || [],
      youtubeLink: item.youtubeLink || '',
      discordLink: item.discordLink || '',
    });
    setIsEditing(true);
    setEditingId(item.id);
    setMessage('');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      additionalImages: [],
      cardType: 'showcase',
      regions: [],
      builds: [],
      youtubeLink: '',
      discordLink: '',
    });
    setMessage('');
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
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          Admin Panel
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => navigate('/')}
            variant='outlined'
            color='primary'
            size='small'
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button
            onClick={handleLogout}
            variant='outlined'
            color='secondary'
            size='small'
          >
            Logout
          </Button>
        </Box>
      </Box>

      {message && (
        <Alert
          severity={message.includes('successfully') ? 'success' : 'error'}
          sx={{ mt: 2, mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Card
        variant='outlined'
        sx={{
          mb: 4,
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant='h6'>
              {isEditing ? 'Edit Gallery Item' : 'Post New Item'}
            </Typography>
            {isEditing && (
              <Button
                onClick={handleCancelEdit}
                variant='outlined'
                size='small'
                color='secondary'
              >
                Cancel Edit
              </Button>
            )}
          </Box>
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
                  value='gallery'
                  control={<Radio />}
                  label='Gallery'
                />
                <FormControlLabel
                  value='event'
                  control={<Radio />}
                  label='Event'
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

            {/* Description with Link Button */}
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='text.secondary'>
                  Description *
                </Typography>
                <IconButton
                  size='small'
                  onClick={handleOpenLinkModal}
                  color='primary'
                  title='Add Link'
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                  }}
                >
                  <LinkIcon fontSize='small' />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
                placeholder='Enter description... Use the link button above to add links.'
                ref={descriptionRef}
              />
            </Box>
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
                      ...(formData.regions.includes(region.label) && {
                        border: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#000' : undefined,
                      }),
                    }}
                  />
                ))}
              </Box>
            </FormControl>

            {/* Category Chips */}
            <FormControl component='fieldset' sx={{ mt: 3 }} fullWidth>
              <FormLabel component='legend'>
                Category (Select Multiple)
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
                      ...(formData.builds.includes(build.label) && {
                        border: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#000' : undefined,
                      }),
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <YouTubeIcon sx={{ color: '#FF0000' }} />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FaDiscord
                      style={{ color: '#5865F2', fontSize: '1.2rem' }}
                    />
                  </InputAdornment>
                ),
              }}
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
              {isEditing ? 'Update Gallery Item' : 'Add to Gallery'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Box>
        {/* Header with Filter Pills */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant='h6'>
            Existing Gallery Items (
            {
              galleryItems.filter((item) => {
                const matchesType =
                  filterType === 'all' ? true : item.cardType === filterType;
                const matchesSearch =
                  searchQuery.trim() === '' ||
                  item.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
              }).length
            }
            )
          </Typography>

          {/* Filter Pills and Search */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {/* Filter Pills */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label='All'
                onClick={() => setFilterType('all')}
                variant={filterType === 'all' ? 'filled' : 'outlined'}
                color='default'
                sx={{
                  fontWeight: filterType === 'all' ? 'bold' : 'normal',
                }}
              />
              <Chip
                icon={
                  <ViewCarouselIcon sx={{ fontSize: '0.9rem !important' }} />
                }
                label='Showcase'
                onClick={() => setFilterType('showcase')}
                variant={filterType === 'showcase' ? 'filled' : 'outlined'}
                color='error'
                sx={{
                  fontWeight: filterType === 'showcase' ? 'bold' : 'normal',
                  ...(filterType === 'showcase' && {
                    border: 'none',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#000' : undefined,
                  }),
                }}
              />
              <Chip
                icon={
                  <CollectionsIcon sx={{ fontSize: '0.9rem !important' }} />
                }
                label='Gallery'
                onClick={() => setFilterType('gallery')}
                variant={filterType === 'gallery' ? 'filled' : 'outlined'}
                color='info'
                sx={{
                  fontWeight: filterType === 'gallery' ? 'bold' : 'normal',
                  ...(filterType === 'gallery' && {
                    border: 'none',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#000' : undefined,
                  }),
                }}
              />
              <Chip
                icon={<EventIcon sx={{ fontSize: '0.9rem !important' }} />}
                label='Event'
                onClick={() => setFilterType('event')}
                variant={filterType === 'event' ? 'filled' : 'outlined'}
                color='warning'
                sx={{
                  fontWeight: filterType === 'event' ? 'bold' : 'normal',
                  ...(filterType === 'event' && {
                    border: 'none',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#000' : undefined,
                  }),
                }}
              />
            </Box>

            {/* Search Bar */}
            <TextField
              size='small'
              placeholder='Search title or description...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      onClick={() => setSearchQuery('')}
                      edge='end'
                    >
                      <CloseIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: { xs: '100%', sm: '250px' } }}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          {galleryItems
            .filter((item) => {
              // Filter by card type
              const matchesType =
                filterType === 'all' ? true : item.cardType === filterType;

              // Filter by search query (title or description)
              const matchesSearch =
                searchQuery.trim() === '' ||
                item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase());

              return matchesType && matchesSearch;
            })
            .map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
                  variant='outlined'
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    {/* Card Type Badge with Icon */}
                    <Chip
                      icon={
                        item.cardType === 'showcase' ? (
                          <ViewCarouselIcon
                            sx={{
                              fontSize: '0.85rem !important',
                              color: 'inherit !important',
                            }}
                          />
                        ) : item.cardType === 'gallery' ? (
                          <CollectionsIcon
                            sx={{
                              fontSize: '0.85rem !important',
                              color: 'inherit !important',
                            }}
                          />
                        ) : (
                          <EventIcon
                            sx={{
                              fontSize: '0.85rem !important',
                              color: 'inherit !important',
                            }}
                          />
                        )
                      }
                      label={
                        item.cardType === 'showcase'
                          ? 'Showcase'
                          : item.cardType === 'gallery'
                          ? 'Gallery'
                          : 'Event'
                      }
                      size='small'
                      color={
                        item.cardType === 'showcase'
                          ? 'error'
                          : item.cardType === 'gallery'
                          ? 'info'
                          : 'warning'
                      }
                      variant='filled'
                      sx={{
                        mb: 1.5,
                        fontSize: '0.65rem',
                        height: '22px',
                        border: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#000' : undefined,
                        '& .MuiChip-icon': {
                          marginLeft: '6px',
                        },
                      }}
                    />

                    {/* Builder Spotlight Badge (if spotlighted) - Permanent Medal */}
                    {item.spotlightDate && (
                      <Chip
                        icon={
                          <MapsHomeWorkIcon
                            sx={{
                              fontSize: '0.85rem !important',
                              color: 'inherit !important',
                            }}
                          />
                        }
                        label='Builder Spotlight'
                        size='small'
                        color='warning'
                        variant='filled'
                        sx={{
                          mb: 1.5,
                          fontSize: '0.65rem',
                          height: '22px',
                          border: 'none',
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? '#000' : undefined,
                          '& .MuiChip-icon': {
                            marginLeft: '6px',
                          },
                        }}
                      />
                    )}

                    {/* Title */}
                    <Typography
                      variant='subtitle1'
                      component='h3'
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* Description Snippet */}
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        mb: 2,
                      }}
                    >
                      {item.description || 'No description'}
                    </Typography>
                  </CardContent>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      borderTop: 1,
                      borderColor: 'divider',
                      p: 0.5,
                    }}
                  >
                    {/* Star button only for showcase cards */}
                    {item.cardType === 'showcase' && (
                      <IconButton
                        size='small'
                        onClick={() =>
                          handleToggleSpotlight(item.id, item.isSpotlight)
                        }
                        color={item.isSpotlight ? 'warning' : 'default'}
                        title='Toggle Builder Spotlight'
                      >
                        {item.isSpotlight ? (
                          <StarIcon fontSize='small' />
                        ) : (
                          <StarBorderIcon fontSize='small' />
                        )}
                      </IconButton>
                    )}
                    <IconButton
                      size='small'
                      onClick={() => handleEdit(item)}
                      color='primary'
                      title='Edit'
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleDeleteClick(item.id)}
                      color='error'
                      title='Delete'
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Empty State */}
        {galleryItems.filter((item) => {
          const matchesType =
            filterType === 'all' ? true : item.cardType === filterType;
          const matchesSearch =
            searchQuery.trim() === '' ||
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesType && matchesSearch;
        }).length === 0 && (
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mt: 4 }}
          >
            {searchQuery.trim() !== ''
              ? `No items match "${searchQuery}"`
              : filterType === 'all'
              ? 'No items yet. Create your first item above!'
              : `No ${filterType} items found.`}
          </Typography>
        )}
      </Box>

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

      {/* Add Link Modal */}
      <Dialog
        open={linkModalOpen}
        onClose={handleCloseLinkModal}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='Text'
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            margin='normal'
            placeholder='Enter the text to display'
            autoFocus
          />
          <TextField
            fullWidth
            label='Link'
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            margin='normal'
            placeholder='https://example.com'
            required
            helperText='Enter the full URL including https://'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLinkModal} color='inherit'>
            Cancel
          </Button>
          <Button
            onClick={handleInsertLink}
            variant='contained'
            disabled={!linkText || !linkUrl}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
