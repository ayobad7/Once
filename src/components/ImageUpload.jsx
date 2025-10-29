// src/components/ImageUpload.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Alert,
  IconButton,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadToCloudinary } from '../config/cloudinary';

/**
 * ImageUpload Component
 * Handles drag & drop image uploads to Cloudinary
 * @param {boolean} multiple - Allow multiple file uploads
 * @param {function} onUploadComplete - Callback with uploaded URL(s)
 * @param {string} label - Label for the upload area
 */
function ImageUpload({
  multiple = false,
  onUploadComplete,
  label = 'Upload Images',
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    // Check file type
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.';
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return 'File size exceeds 10MB limit.';
    }

    return null;
  };

  const handleFileSelect = async (files) => {
    setError('');
    const fileArray = Array.from(files);

    // Validate all files first
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Upload files
    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedFiles = [];

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const result = await uploadToCloudinary(file);

        if (!result.success) {
          throw new Error(result.error || 'Upload failed');
        }

        uploadedFiles.push(result.url);

        // Update progress
        setUploadProgress(((i + 1) / fileArray.length) * 100);
      }

      // Update state with uploaded URLs
      const newUrls = [...uploadedUrls, ...uploadedFiles];
      setUploadedUrls(newUrls);

      // Call parent callback
      if (multiple) {
        onUploadComplete(uploadedFiles); // Return array of new URLs
      } else {
        onUploadComplete(uploadedFiles[0]); // Return single URL
      }

      setUploading(false);
      setUploadProgress(0);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (!multiple && files.length > 1) {
        setError('Only one file is allowed.');
        return;
      }
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    document.getElementById(`file-input-${label.replace(/\s/g, '-')}`).click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeUrl = (index) => {
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
  };

  return (
    <Box>
      {/* Drag & Drop Area */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
      >
        <CloudUploadIcon
          sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
        />
        <Typography variant='h6' gutterBottom>
          {label}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Drag & drop {multiple ? 'images' : 'an image'} here, or click to
          browse
        </Typography>
        <Button
          variant='contained'
          onClick={handleButtonClick}
          disabled={uploading}
        >
          Choose {multiple ? 'Files' : 'File'}
        </Button>

        {/* Hidden File Input */}
        <input
          id={`file-input-${label.replace(/\s/g, '-')}`}
          type='file'
          accept='image/jpeg,image/jpg,image/png,image/gif,image/webp'
          multiple={multiple}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </Box>

      {/* Upload Progress */}
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant='determinate' value={uploadProgress} />
          <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>
            Uploading... {Math.round(uploadProgress)}%
          </Typography>
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity='error' sx={{ mt: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Uploaded Images Preview */}
      {uploadedUrls.length > 0 && (
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant='subtitle2' color='text.secondary'>
            Uploaded Images:
          </Typography>
          {uploadedUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
              <Typography
                variant='caption'
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {url.substring(url.lastIndexOf('/') + 1)}
              </Typography>
              <IconButton
                size='small'
                color='error'
                onClick={() => removeUrl(index)}
                title='Remove'
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default ImageUpload;
