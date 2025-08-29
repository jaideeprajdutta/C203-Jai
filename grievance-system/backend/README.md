# Grievance System Backend

This is the backend API for the Grievance Redressal System with file upload support.

## Features

- **File Upload**: Secure file upload with validation
- **File Management**: Download, preview, and delete files
- **File Types**: Support for images, PDFs, documents, and text files
- **Security**: File type validation, size limits, and secure storage
- **API Endpoints**: RESTful API for file operations

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd grievance-system/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create uploads directory (if not exists):
```bash
mkdir uploads
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production Setup

1. Install dependencies:
```bash
npm install --production
```

2. Start the server:
```bash
npm start
```

## API Endpoints

### File Upload
- **POST** `/api/upload`
- Upload files for a grievance
- **Body**: FormData with files and grievanceId
- **Response**: Array of uploaded file metadata

### Get Files
- **GET** `/api/files/:grievanceId`
- Get all files for a specific grievance
- **Response**: Array of file metadata

### Download File
- **GET** `/api/download/:fileId`
- Download a specific file
- **Response**: File stream

### Delete File
- **DELETE** `/api/files/:fileId`
- Delete a specific file
- **Response**: Success confirmation

### Preview File
- **GET** `/api/preview/:fileId`
- Get image preview (images only)
- **Response**: Image stream

### Health Check
- **GET** `/api/health`
- Check server status
- **Response**: Server status and timestamp

## File Upload Specifications

### Supported File Types
- **Images**: JPEG, PNG, GIF
- **Documents**: PDF, DOC, DOCX, TXT

### File Limits
- **Maximum file size**: 10MB per file
- **Maximum files per upload**: 5 files
- **Total files per grievance**: Unlimited

### Security Features
- File type validation using MIME types
- File size limits
- Secure filename generation
- Organized storage by grievance ID

## Directory Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── uploads/           # File storage directory
│   └── [grievanceId]/ # Files organized by grievance
└── README.md          # This file
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
MAX_FILES_PER_UPLOAD=5
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid file types
- File size exceeded
- Too many files
- Missing files
- Server errors

## CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000` (React development server)
- Add your production domain as needed

## Security Considerations

1. **File Validation**: All files are validated for type and size
2. **Secure Storage**: Files are stored with unique names to prevent conflicts
3. **Access Control**: Implement authentication in production
4. **Rate Limiting**: Consider adding rate limiting for production use
5. **Virus Scanning**: Consider adding virus scanning for uploaded files

## Production Deployment

### Using PM2 (Recommended)

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Start the application:
```bash
pm2 start server.js --name "grievance-backend"
```

3. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Using Docker

1. Create a Dockerfile:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

2. Build and run:
```bash
docker build -t grievance-backend .
docker run -p 5000:5000 -v $(pwd)/uploads:/app/uploads grievance-backend
```

## Monitoring and Logs

- Use PM2 for process monitoring
- Implement logging with Winston or similar
- Monitor file storage usage
- Set up health check endpoints

## Backup Strategy

- Regular backup of uploads directory
- Database backup (when implemented)
- Configuration backup

## Future Enhancements

- Database integration for file metadata
- User authentication and authorization
- File encryption at rest
- CDN integration for file serving
- Automated file cleanup
- Advanced file processing (thumbnails, compression)