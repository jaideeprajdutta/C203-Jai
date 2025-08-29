const fs = require('fs');
const path = require('path');

// Simple test to verify backend setup
async function testBackend() {
  console.log('🧪 Testing Backend Setup...\n');

  try {
    // Test 1: Check if uploads directory exists
    console.log('1. Checking uploads directory...');
    const uploadsDir = path.join(__dirname, 'uploads');
    
    if (fs.existsSync(uploadsDir)) {
      console.log('✅ Uploads directory exists');
      
      // Check permissions
      try {
        const testFile = path.join(uploadsDir, 'test-write.txt');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);
        console.log('✅ Directory is writable');
      } catch (error) {
        console.log('❌ Directory is not writable:', error.message);
      }
    } else {
      console.log('❌ Uploads directory does not exist');
      console.log('💡 Creating uploads directory...');
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Uploads directory created');
    }

    // Test 2: Check server file
    console.log('\n2. Checking server configuration...');
    const serverFile = path.join(__dirname, 'server.js');
    if (fs.existsSync(serverFile)) {
      console.log('✅ Server file exists');
    } else {
      console.log('❌ Server file missing');
    }

    // Test 3: Check package.json
    console.log('\n3. Checking dependencies...');
    const packageFile = path.join(__dirname, 'package.json');
    if (fs.existsSync(packageFile)) {
      const packageData = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
      console.log('✅ Package.json exists');
      console.log('   Dependencies:', Object.keys(packageData.dependencies || {}).length);
      
      const requiredDeps = ['express', 'multer', 'cors'];
      const missingDeps = requiredDeps.filter(dep => !packageData.dependencies[dep]);
      
      if (missingDeps.length === 0) {
        console.log('✅ All required dependencies present');
      } else {
        console.log('❌ Missing dependencies:', missingDeps.join(', '));
      }
    }

    // Test 4: Test basic HTTP request (if server is running)
    console.log('\n4. Testing server connection...');
    try {
      const http = require('http');
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/health',
        method: 'GET',
        timeout: 3000
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Server is responding');
            console.log('   Health check response:', data);
          } else {
            console.log('❌ Server responded with status:', res.statusCode);
          }
        });
      });

      req.on('error', (error) => {
        console.log('❌ Server connection failed:', error.message);
        console.log('💡 Make sure the server is running: npm run dev');
      });

      req.on('timeout', () => {
        console.log('❌ Server connection timeout');
        req.destroy();
      });

      req.end();

    } catch (error) {
      console.log('❌ HTTP test failed:', error.message);
    }

    console.log('\n🎉 Backend setup test completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Make sure server is running: npm run dev');
    console.log('   2. Test frontend: cd .. && npm start');
    console.log('   3. Visit: http://localhost:3000/enhanced-grievance-form');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testBackend();