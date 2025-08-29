import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  Image, 
  Download, 
  Eye, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import fileUploadService from '../../services/fileUploadService';

const FileUploadZone = ({ 
  grievanceId, 
  onFilesUploaded, 
  maxFiles = 5, 
  disabled = false,
  existingFiles = []
}) => {
  const [files, setFiles] = useState(existingFiles);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled || uploading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList) => {
    const newFiles = Array.from(fileList);
    
    // Check file count limit
    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. You can upload ${maxFiles - files.length} more files.`);
      return;
    }

    // Validate each file
    const validFiles = [];
    const errors = [];

    for (const file of newFiles) {
      const validation = fileUploadService.validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    if (validFiles.length === 0) return;

    // Upload files
    try {
      setUploading(true);
      setError('');
      setUploadProgress(0);

      const response = await fileUploadService.uploadFiles(
        validFiles,
        grievanceId,
        '',
        (progress) => setUploadProgress(progress)
      );

      // Add uploaded files to state
      const uploadedFiles = response.files.map(file => ({
        ...file,
        uploaded: true
      }));

      setFiles(prev => [...prev, ...uploadedFiles]);
      
      if (onFilesUploaded) {
        onFilesUploaded(uploadedFiles);
      }

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = async (fileId, isUploaded = false) => {
    try {
      if (isUploaded) {
        await fileUploadService.deleteFile(fileId);
      }
      
      setFiles(prev => prev.filter(file => file.id !== fileId));
    } catch (error) {
      setError(`Failed to remove file: ${error.message}`);
    }
  };

  const downloadFile = async (file) => {
    try {
      await fileUploadService.downloadFile(file.id, file.originalName);
    } catch (error) {
      setError(`Download failed: ${error.message}`);
    }
  };

  const previewImage = (file) => {
    if (fileUploadService.isImage(file.mimetype)) {
      setPreviewFile(file);
    }
  };

  const getFileIcon = (file) => {
    if (fileUploadService.isImage(file.mimetype)) {
      return <Image className="h-5 w-5 text-blue-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-[#A2D5C6] bg-[#CFFFE2]/20' 
            : 'border-gray-300 hover:border-[#A2D5C6]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx"
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled || uploading}
        />

        {uploading ? (
          <div className="space-y-3">
            <Loader2 className="h-8 w-8 text-[#A2D5C6] mx-auto animate-spin" />
            <p className="text-sm text-gray-600">Uploading files...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#A2D5C6] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{Math.round(uploadProgress)}% complete</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 text-gray-400 mx-auto" />
            <p className="text-sm text-gray-600">
              Drag and drop files here, or{' '}
              <span className="text-[#A2D5C6] hover:underline font-medium">browse</span>
            </p>
            <p className="text-xs text-gray-500">
              Supported: JPEG, PNG, GIF, PDF, TXT, DOC, DOCX (Max 10MB each, up to {maxFiles} files)
            </p>
            <p className="text-xs text-gray-500">
              {files.length}/{maxFiles} files uploaded
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-700 whitespace-pre-line">{error}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError('')}
            className="ml-auto text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-black">Uploaded Files ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <Card key={file.id} className="border border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">
                          {file.originalName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{fileUploadService.formatFileSize(file.size)}</span>
                          {file.uploaded && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {/* Preview button for images */}
                      {fileUploadService.isImage(file.mimetype) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => previewImage(file)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {/* Download button */}
                      {file.uploaded && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadFile(file)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id, file.uploaded)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl max-h-full p-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium text-black">{previewFile.originalName}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <img
                  src={fileUploadService.getPreviewUrl(previewFile.id)}
                  alt={previewFile.originalName}
                  className="max-w-full max-h-96 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;