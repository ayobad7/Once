# 🎨 Cloudinary Image Upload Setup

## ✅ Setup Complete!

Your admin page now uses **Cloudinary** for image hosting instead of Discord links.

---

## 🔑 Configuration

Your Cloudinary credentials are stored in:

- **File**: `src/config/cloudinary.js`
- **Cloud Name**: `dv8ez6mka`
- **Upload Preset**: `once_architect_unsigned`
- **Folder**: `once-architect` (all images organized here)

---

## 📸 How to Use

### **Admin Page - Upload Images**

1. Navigate to `/admin` page
2. **Main Image**:
   - Drag & drop an image OR click "Choose Files"
   - Max size: 10MB per image
   - Supported: JPG, PNG, GIF, WebP
3. **Additional Images** (Gallery):
   - Upload multiple images at once (up to 8 total)
   - Same drag & drop interface

### **What Happens Behind the Scenes**

1. Image is uploaded to Cloudinary
2. Cloudinary returns a **permanent URL**
3. URL is automatically saved to your form
4. Image is stored forever (unless you delete it from Cloudinary dashboard)

---

## 📊 Free Tier Limits

- **Storage**: 25GB total
- **Bandwidth**: 25GB/month
- **Transformations**: 25 credits/month (not needed for your use case)

### **Monitor Usage**

Visit [Cloudinary Dashboard](https://console.cloudinary.com/pm/reporting/overview) to check:

- Current storage usage
- Monthly bandwidth usage
- Number of images

---

## 🗂️ Manage Images

### **View All Images**

1. Go to [Media Library](https://console.cloudinary.com/console/media_library)
2. Navigate to `once-architect` folder
3. See all uploaded images

### **Delete Images**

- Click on any image → Delete
- This frees up storage space

---

## 🚀 Features

✅ **Drag & Drop Upload**  
✅ **Multiple File Upload**  
✅ **Progress Bar**  
✅ **Image Preview**  
✅ **Error Handling**  
✅ **Automatic CDN Delivery**  
✅ **Permanent URLs** (never expire!)

---

## ⚠️ Important Notes

1. **Never share your API Secret** (not used in this setup, so safe!)
2. **Unsigned uploads are secure** - Only works with your preset
3. **Old Discord links will still work** - Existing data is safe
4. **New uploads use Cloudinary** - All future uploads permanent

---

## 🔧 Troubleshooting

### **Upload Failed Error**

- Check internet connection
- Verify file is an image (not video/document)
- Ensure file is under 10MB

### **Images Not Loading**

- Check Cloudinary dashboard for usage limits
- Verify upload preset is still "Unsigned"

### **Need More Space?**

- Delete old unused images from Media Library
- Or upgrade to paid plan ($89/month for 75GB)

---

## 📝 Technical Details

### **Files Modified**

- `src/config/cloudinary.js` - Configuration
- `src/components/ImageUpload.jsx` - Upload component
- `src/pages/AdminPage.jsx` - Admin page integration

### **How It Works**

```javascript
// Upload happens client-side (browser)
const result = await uploadToCloudinary(file);
// Returns: { success: true, url: "https://res.cloudinary.com/..." }

// URL is saved to Firebase (your existing database)
// Image is stored on Cloudinary's servers
```

---

## 🎉 Benefits Over Discord Links

| Discord Links          | Cloudinary             |
| ---------------------- | ---------------------- |
| ❌ Expire after ~24hrs | ✅ Never expire        |
| ❌ No management       | ✅ Full media library  |
| ❌ Slow loading        | ✅ CDN-optimized       |
| ❌ No backup           | ✅ Automatic backup    |
| ❌ No transformations  | ✅ Can resize/optimize |

---

## 🆘 Need Help?

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Upload Guide](https://cloudinary.com/documentation/react_integration)
- [Dashboard](https://console.cloudinary.com)

---

**Enjoy permanent, reliable image hosting! 🚀**


