const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const grievanceId = req.body.grievanceId || 'temp';
    const grievanceDir = path.join(uploadsDir, grievanceId);
    
    if (!fs.existsSync(grievanceDir)) {
      fs.mkdirSync(grievanceDir, { recursive: true });
    }
    
    cb(null, grievanceDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter for security
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF, TXT, DOC, and DOCX files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files per upload
  }
});

// In-memory storage for demo (use database in production)
let grievances = {};
let fileMetadata = {};

// Routes

// Upload files for a grievance
app.post('/api/upload', upload.array('files', 5), (req, res) => {
  try {
    const { grievanceId, description } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => {
      const fileId = crypto.randomBytes(16).toString('hex');
      const fileInfo = {
        id: fileId,
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        uploadDate: new Date().toISOString(),
        grievanceId: grievanceId,
        description: description || ''
      };
      
      fileMetadata[fileId] = fileInfo;
      return fileInfo;
    });

    // Update grievance with file references
    if (!grievances[grievanceId]) {
      grievances[grievanceId] = {
        id: grievanceId,
        files: []
      };
    }
    
    grievances[grievanceId].files.push(...uploadedFiles.map(f => f.id));

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles.map(f => ({
        id: f.id,
        originalName: f.originalName,
        size: f.size,
        mimetype: f.mimetype,
        uploadDate: f.uploadDate
      }))
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Get file metadata
app.get('/api/files/:grievanceId', (req, res) => {
  try {
    const { grievanceId } = req.params;
    const grievance = grievances[grievanceId];
    
    if (!grievance) {
      return res.status(404).json({ error: 'Grievance not found' });
    }

    const files = grievance.files.map(fileId => {
      const file = fileMetadata[fileId];
      return file ? {
        id: file.id,
        originalName: file.originalName,
        size: file.size,
        mimetype: file.mimetype,
        uploadDate: file.uploadDate,
        description: file.description
      } : null;
    }).filter(Boolean);

    res.json({ files });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

// Download file
app.get('/api/download/:fileId', (req, res) => {
  try {
    const { fileId } = req.params;
    const file = fileMetadata[fileId];
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Type', file.mimetype);
    
    const fileStream = fs.createReadStream(file.path);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'File download failed' });
  }
});

// Delete file
app.delete('/api/files/:fileId', (req, res) => {
  try {
    const { fileId } = req.params;
    const file = fileMetadata[fileId];
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Remove file from disk
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Remove from grievance
    const grievance = grievances[file.grievanceId];
    if (grievance) {
      grievance.files = grievance.files.filter(id => id !== fileId);
    }

    // Remove metadata
    delete fileMetadata[fileId];

    res.json({ success: true, message: 'File deleted successfully' });
    
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'File deletion failed' });
  }
});

// Get file preview (for images)
app.get('/api/preview/:fileId', (req, res) => {
  try {
    const { fileId } = req.params;
    const file = fileMetadata[fileId];
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'File is not an image' });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    res.setHeader('Content-Type', file.mimetype);
    const fileStream = fs.createReadStream(file.path);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ error: 'File preview failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 5 files per upload.' });
    }
  }
  
  res.status(500).json({ error: error.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadsDir}`);
});