// Cloudinary configuration
// Note: These values are safe to expose in the frontend when using unsigned upload presets

export const cloudinaryConfig = {
  cloudName: 'dv8ez6mka',
  uploadPreset: 'once_architect_unsigned',
  apiKey: '475479579543983', // Optional - only needed for some features
  folder: 'once-architect', // Images will be organized in this folder
};

// Helper function to generate Cloudinary URL
export const getCloudinaryUrl = (publicId, transformations = '') => {
  if (!publicId) return '';

  // If publicId is already a full URL, return it
  if (publicId.startsWith('http')) return publicId;

  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  return transformations
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`;
};

// Helper function to upload image
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', cloudinaryConfig.folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      thumbnail: data.thumbnail_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};


