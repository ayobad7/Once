// For development, we'll use localStorage to simulate the gallery data
// In production, this will connect to your CMS system (Netlify CMS reading/writing files in GitHub)

const GALLERY_KEY = 'galleryItems';

// Initialize with some sample data if localStorage is empty
const initializeGallery = () => {
  if (typeof window !== 'undefined') {
    // Check if running in browser
    const existingData = localStorage.getItem(GALLERY_KEY);
    if (!existingData) {
      const sampleData = [
        {
          title: 'Sample Image 1',
          description: 'This is a sample gallery item stored in localStorage.',
          image: 'https://via.placeholder.com/300x200?text=Sample+1',
        },
        {
          title: 'Sample Image 2',
          description:
            'This is another sample gallery item stored in localStorage.',
          image: 'https://via.placeholder.com/300x200?text=Sample+2',
        },
      ];
      localStorage.setItem(GALLERY_KEY, JSON.stringify(sampleData));
    }
  }
};

export const getGalleryItems = () => {
  if (typeof window !== 'undefined') {
    initializeGallery(); // Ensure data exists
    const data = localStorage.getItem(GALLERY_KEY);
    return JSON.parse(data) || [];
  }
  return []; // Return empty array if not in browser (e.g., SSR)
};

export const saveGalleryItem = (item) => {
  if (typeof window !== 'undefined') {
    const items = getGalleryItems();
    items.push(item);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  }
};

export const deleteGalleryItem = (index) => {
  if (typeof window !== 'undefined') {
    const items = getGalleryItems();
    items.splice(index, 1);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  }
};
