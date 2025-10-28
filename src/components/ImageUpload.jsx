import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  LinearProgress,
  Alert,
  Stack,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { uploadToCloudinary } from '../config/cloudinary';

const ImageUpload = ({
  onUploadComplete,
  multiple = false,
  label = 'Upload Images',
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (files) => {
    setError(null);
    setUploading(true);
    setUploadProgress(0);

    const fileArray = Array.from(files);
    const totalFiles = fileArray.length;
    let completedFiles = 0;
    const newUrls = [];

    for (const file of fileArray) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} is not an image file`);
        continue;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} is too large. Max size is 10MB`);
        continue;
      }

      try {
        const result = await uploadToCloudinary(file);

        if (result.success) {
          newUrls.push(result.url);
          completedFiles++;
          setUploadProgress((completedFiles / totalFiles) * 100);
        } else {
          setError(result.error || 'Upload failed');
        }
      } catch (err) {
        setError(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    setUploadProgress(100);

    if (newUrls.length > 0) {
      setUploadedUrls([...uploadedUrls, ...newUrls]);
      if (onUploadComplete) {
        onUploadComplete(multiple ? newUrls : newUrls[0]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeUrl = (index) => {
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Upload Area */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: 2,
          borderStyle: 'dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          multiple={multiple}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        <CloudUploadIcon
          sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
        />

        <Typography variant='h6' gutterBottom>
          {label}
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Drag & drop images here, or click to select
        </Typography>

        <Button
          variant='contained'
          startIcon={<ImageIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
        >
          Choose Files
        </Button>

        <Typography
          variant='caption'
          display='block'
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          Supported: JPG, PNG, GIF, WebP (Max 10MB per file)
        </Typography>
      </Box>

      {/* Progress Bar */}
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant='determinate' value={uploadProgress} />
          <Typography
            variant='caption'
            sx={{ mt: 1, display: 'block', textAlign: 'center' }}
          >
            Uploading... {Math.round(uploadProgress)}%
          </Typography>
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity='error' sx={{ mt: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Uploaded URLs */}
      {uploadedUrls.length > 0 && (
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Uploaded Images:</Typography>
          {uploadedUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
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
                {url}
              </Typography>
              <IconButton
                size='small'
                onClick={() => removeUrl(index)}
                color='error'
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ImageUpload;
