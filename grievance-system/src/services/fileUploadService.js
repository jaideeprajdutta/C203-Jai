/**
 * File Upload Service for Grievance System
 * Handles file uploads, downloads, and management
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class FileUploadService {
  /**
   * Upload files for a grievance
   * @param {FileList} files - Files to upload
   * @param {string} grievanceId - Grievance reference ID
   * @param {string} description - Optional description for the files
   * @param {function} onProgress - Progress callback function
   */
  async uploadFiles(files, grievanceId, description = '', onProgress = null) {
    try {
      const formData = new FormData();
      
      // Add files to form data
      Array.from(files).forEach((file, index) => {
        formData.append('files', file);
      });
      
      formData.append('grievanceId', grievanceId);
      formData.append('description', description);

      const xhr = new XMLHttpRequest();
      
      return new Promise((resolve, reject) => {
        // Track upload progress
        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              onProgress(percentComplete);
            }
          });
        }

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const error = JSON.parse(xhr.responseText);
              reject(new Error(error.error || 'Upload failed'));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('timeout', () => {
          reject(new Error('Upload timeout'));
        });

        xhr.open('POST', `${API_BASE_URL}/upload`);
        xhr.timeout = 300000; // 5 minutes timeout
        xhr.send(formData);
      });

    } catch (error) {
      throw new Error(`Upload preparation failed: ${error.message}`);
    }
  }

  /**
   * Get files for a grievance
   * @param {string} grievanceId - Grievance reference ID
   */
  async getFiles(grievanceId) {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${grievanceId}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch files');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to get files: ${error.message}`);
    }
  }

  /**
   * Download a file
   * @param {string} fileId - File ID
   * @param {string} filename - Original filename
   */
  async downloadFile(fileId, filename) {
    try {
      const response = await fetch(`${API_BASE_URL}/download/${fileId}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Download failed');
      }

      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
  }

  /**
   * Delete a file
   * @param {string} fileId - File ID
   */
  async deleteFile(fileId) {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Delete failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  /**
   * Get file preview URL (for images)
   * @param {string} fileId - File ID
   */
  getPreviewUrl(fileId) {
    return `${API_BASE_URL}/preview/${fileId}`;
  }

  /**
   * Validate file before upload
   * @param {File} file - File to validate
   */
  validateFile(file) {
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPEG, PNG, GIF, PDF, TXT, DOC, and DOCX files are allowed.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File too large. Maximum size is 10MB.'
      };
    }

    return { valid: true };
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get file type icon
   * @param {string} mimetype - File MIME type
   */
  getFileIcon(mimetype) {
    if (mimetype.startsWith('image/')) return '🖼️';
    if (mimetype === 'application/pdf') return '📄';
    if (mimetype.includes('word')) return '📝';
    if (mimetype === 'text/plain') return '📃';
    return '📎';
  }

  /**
   * Check if file is an image
   * @param {string} mimetype - File MIME type
   */
  isImage(mimetype) {
    return mimetype.startsWith('image/');
  }
}

const fileUploadService = new FileUploadService();
export default fileUploadService;