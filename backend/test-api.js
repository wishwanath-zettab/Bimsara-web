// Simple API test script
// Run with: node test-api.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing Bimsara Admin API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health endpoint...');
    const health = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health check:', health.data);
    console.log('');

    // Test 2: Login
    console.log('2️⃣ Testing login...');
    const login = await axios.post(`${BASE_URL}/api/admin/login`, {
      username: 'admin',
      password: 'admin'
    });
    const token = login.data.token;
    console.log('✅ Login successful! Token received.');
    console.log('');

    const authHeaders = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    // Test 3: Get Contact Details
    console.log('3️⃣ Testing contact details...');
    const contactDetails = await axios.get(`${BASE_URL}/api/admin/contact-details`, authHeaders);
    console.log('✅ Contact details:', contactDetails.data);
    console.log('');

    // Test 4: Get Contact Categories
    console.log('4️⃣ Testing contact categories...');
    const categories = await axios.get(`${BASE_URL}/api/admin/contact-categories`, authHeaders);
    console.log('✅ Contact categories:', categories.data.length, 'categories found');
    console.log('');

    // Test 5: Get Service Providers
    console.log('5️⃣ Testing service providers...');
    const providers = await axios.get(`${BASE_URL}/api/admin/service-providers`, authHeaders);
    console.log('✅ Service providers:', providers.data.length, 'providers found');
    console.log('');

    // Test 6: Get Other Settings
    console.log('6️⃣ Testing other settings...');
    const settings = await axios.get(`${BASE_URL}/api/admin/other-settings`, authHeaders);
    console.log('✅ Other settings:', settings.data);
    console.log('');

    console.log('🎉 All tests passed! API is working correctly.\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    console.log('\n⚠️  Make sure the backend server is running on port 5000');
    console.log('Run: cd backend && npm start\n');
  }
}

testAPI();
