# Grievance System Setup Guide

This guide will help you set up the complete Grievance Redressal System with file upload functionality.

## System Overview

The system consists of:
- **Frontend**: React application with modern UI components
- **Backend**: Node.js/Express API with file upload support
- **File Storage**: Local file system (can be extended to cloud storage)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Quick Start

### 1. Clone and Setup Frontend

```bash
# Navigate to the frontend directory
cd grievance-system

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 2. Setup Backend

```bash
# Navigate to the backend directory
cd grievance-system/backend

# Install dependencies
npm install

# Create uploads directory
mkdir uploads

# Start the backend server
npm run dev
```

The backend API will be available at `http://localhost:5000`

## Detailed Setup Instructions

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd grievance-system
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_UPLOAD_MAX_SIZE=10485760
   REACT_APP_UPLOAD_MAX_FILES=5
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd grievance-system/backend
   npm install
   ```

2. **Create Required Directories**
   ```bash
   mkdir uploads
   ```

3. **Environment Configuration (Optional)**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=10485760
   MAX_FILES_PER_UPLOAD=5
   ```

4. **Start Backend Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Or production mode
   npm start
   ```

## Features Included

### File Upload System
- **Drag & Drop**: Modern drag-and-drop interface
- **File Validation**: Type and size validation
- **Progress Tracking**: Real-time upload progress
- **File Management**: Preview, download, and delete files
- **Security**: Secure file handling and storage

### Supported File Types
- **Images**: JPEG, PNG, GIF
- **Documents**: PDF, DOC, DOCX, TXT
- **Size Limit**: 10MB per file
- **Quantity Limit**: 5 files per grievance

### Enhanced Components
- **EnhancedGrievanceForm**: Complete form with file upload
- **FileUploadZone**: Reusable file upload component
- **TrackingForm**: Enhanced grievance tracking
- **GrievanceStatus**: Detailed status display with timeline

## API Endpoints

### File Operations
- `POST /api/upload` - Upload files
- `GET /api/files/:grievanceId` - Get files for grievance
- `GET /api/download/:fileId` - Download file
- `DELETE /api/files/:fileId` - Delete file
- `GET /api/preview/:fileId` - Preview image files
- `GET /api/health` - Health check

## Usage Instructions

### Submitting a Grievance with Files

1. **Navigate to Enhanced Form**
   - Go to `/enhanced-grievance-form`
   - Fill in all required fields

2. **Upload Supporting Evidence**
   - Drag and drop files into the upload zone
   - Or click to browse and select files
   - Files are uploaded immediately with progress indication

3. **Submit Grievance**
   - Complete the form and submit
   - Receive a reference ID for tracking

### Tracking Grievances

1. **Use Reference ID**
   - Go to `/status-tracking`
   - Enter your reference ID
   - View detailed status and timeline

2. **Download Reports**
   - Generate and download status reports
   - Access uploaded files (if authorized)

## Development Notes

### File Storage Structure
```
backend/uploads/
├── GRV-2024-0116-1234/
│   ├── document1-timestamp-hash.pdf
│   └── image1-timestamp-hash.jpg
└── GRV-2024-0116-5678/
    └── evidence-timestamp-hash.png
```

### Security Considerations
- File type validation using MIME types
- File size limits enforced
- Unique filename generation
- Organized storage by grievance ID

### Error Handling
- Comprehensive client-side validation
- Server-side error responses
- User-friendly error messages
- Graceful fallbacks

## Customization

### Changing File Limits
Update both frontend and backend:

**Frontend (.env):**
```env
REACT_APP_UPLOAD_MAX_SIZE=20971520  # 20MB
REACT_APP_UPLOAD_MAX_FILES=10       # 10 files
```

**Backend (server.js):**
```javascript
limits: {
  fileSize: 20 * 1024 * 1024, // 20MB
  files: 10 // 10 files
}
```

### Adding New File Types
Update the allowed types in both:

**Frontend (fileUploadService.js):**
```javascript
const allowedTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4' // Add new type
];
```

**Backend (server.js):**
```javascript
const allowedTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4' // Add new type
];
```

## Production Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy the build folder to your web server
```

### Backend Deployment
```bash
# Install production dependencies
npm install --production

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "grievance-backend"
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
UPLOAD_DIR=/var/uploads
CORS_ORIGIN=https://yourdomain.com
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend URL
   - Check that API_URL in frontend .env is correct

2. **File Upload Fails**
   - Verify uploads directory exists and is writable
   - Check file size and type restrictions
   - Ensure backend server is running

3. **Files Not Displaying**
   - Check file permissions
   - Verify API endpoints are accessible
   - Check browser console for errors

### Debug Mode
Enable debug logging in backend:
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure both frontend and backend are running
4. Check file permissions and directory structure

## Next Steps

Consider implementing:
- Database integration for file metadata
- Cloud storage (AWS S3, Google Cloud)
- User authentication and authorization
- File encryption
- Automated backups
- Performance monitoring