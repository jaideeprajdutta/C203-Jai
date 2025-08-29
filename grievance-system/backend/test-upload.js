const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Test script for file upload functionality
async function testFileUpload() {
  const API_URL = 'http://localhost:5000/api';
  
  console.log('🧪 Testing File Upload System...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);

    // Test 2: Create a test file
    console.log('\n2. Creating test file...');
    const testFilePath = path.join(__dirname, 'test-document.txt');
    const testContent = `Test Document for Grievance System
Created: ${new Date().toISOString()}
This is a test file to verify the upload functionality.

Test Details:
- File Type: Text Document
- Size: Small
- Purpose: System Testing
`;
    
    fs.writeFileSync(testFilePath, testContent);
    console.log('✅ Test file created:', testFilePath);

    // Test 3: Upload file
    console.log('\n3. Testing file upload...');
    const formData = new FormData();
    formData.append('files', fs.createReadStream(testFilePath));
    formData.append('grievanceId', 'TEST-2024-0116-9999');
    formData.append('description', 'Test upload for system verification');

    const uploadResponse = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json();
      console.log('✅ File uploaded successfully');
      console.log('   Files:', uploadData.files.length);
      console.log('   First file ID:', uploadData.files[0]?.id);

      const fileId = uploadData.files[0]?.id;
      const grievanceId = 'TEST-2024-0116-9999';

      // Test 4: Get files for grievance
      console.log('\n4. Testing file retrieval...');
      const filesResponse = await fetch(`${API_URL}/files/${grievanceId}`);
      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        console.log('✅ Files retrieved successfully');
        console.log('   File count:', filesData.files.length);
      } else {
        console.log('❌ Failed to retrieve files');
      }

      // Test 5: Download file
      console.log('\n5. Testing file download...');
      const downloadResponse = await fetch(`${API_URL}/download/${fileId}`);
      if (downloadResponse.ok) {
        console.log('✅ File download successful');
        console.log('   Content-Type:', downloadResponse.headers.get('content-type'));
      } else {
        console.log('❌ Failed to download file');
      }

      // Test 6: Delete file
      console.log('\n6. Testing file deletion...');
      const deleteResponse = await fetch(`${API_URL}/files/${fileId}`, {
        method: 'DELETE'
      });
      if (deleteResponse.ok) {
        const deleteData = await deleteResponse.json();
        console.log('✅ File deleted successfully');
      } else {
        console.log('❌ Failed to delete file');
      }

    } else {
      const errorData = await uploadResponse.json();
      console.log('❌ Upload failed:', errorData.error);
    }

    // Cleanup
    console.log('\n7. Cleaning up...');
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
      console.log('✅ Test file cleaned up');
    }

    console.log('\n🎉 File upload system test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5000');
    console.log('   Run: cd backend && npm run dev');
  }
}

// Run the test
if (require.main === module) {
  testFileUpload();
}

module.exports = testFileUpload;