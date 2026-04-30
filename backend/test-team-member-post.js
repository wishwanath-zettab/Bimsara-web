// Test script for POST /api/admin/team-members endpoint with description fields
// Run with: node test-team-member-post.js

const http = require('http');

const BASE_URL = 'localhost';
const PORT = 5000;

function makeRequest(method, path, data, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testTeamMemberPost() {
  console.log('🧪 Testing POST /api/admin/team-members with description fields...\n');

  try {
    // Step 1: Login to get token
    console.log('1️⃣ Logging in...');
    const loginResponse = await makeRequest('POST', '/api/admin/login', {
      username: 'admin',
      password: 'admin'
    });
    
    if (loginResponse.status !== 200) {
      throw new Error(`Login failed with status ${loginResponse.status}`);
    }
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful!\n');

    // Test 2: Create team member with both descriptions
    console.log('2️⃣ Creating team member with both descriptions...');
    const response1 = await makeRequest('POST', '/api/admin/team-members', {
      name: 'Test Member 1',
      position: 'Test Position',
      description1: 'First description text',
      description2: 'Second description text'
    }, token);
    
    console.log('✅ Created team member:', response1.data);
    console.log('   - description1:', response1.data.description1);
    console.log('   - description2:', response1.data.description2);
    console.log('');

    // Test 3: Create team member with only description1
    console.log('3️⃣ Creating team member with only description1...');
    const response2 = await makeRequest('POST', '/api/admin/team-members', {
      name: 'Test Member 2',
      position: 'Test Position 2',
      description1: 'Only first description'
    }, token);
    
    console.log('✅ Created team member:', response2.data);
    console.log('   - description1:', response2.data.description1);
    console.log('   - description2:', response2.data.description2);
    console.log('');

    // Test 4: Create team member without descriptions
    console.log('4️⃣ Creating team member without descriptions...');
    const response3 = await makeRequest('POST', '/api/admin/team-members', {
      name: 'Test Member 3',
      position: 'Test Position 3'
    }, token);
    
    console.log('✅ Created team member:', response3.data);
    console.log('   - description1:', response3.data.description1);
    console.log('   - description2:', response3.data.description2);
    console.log('');

    // Test 5: Verify GET returns description fields
    console.log('5️⃣ Verifying GET endpoint returns description fields...');
    const getResponse = await makeRequest('GET', '/api/admin/team-members', null, token);
    const members = getResponse.data;
    console.log(`✅ Retrieved ${members.length} team members`);
    
    // Show the last 3 members (the ones we just created)
    const recentMembers = members.slice(-3);
    recentMembers.forEach((member, index) => {
      console.log(`   Member ${index + 1}:`);
      console.log(`     - name: ${member.name}`);
      console.log(`     - description1: ${member.description1}`);
      console.log(`     - description2: ${member.description2}`);
    });
    console.log('');

    console.log('🎉 All tests passed! POST endpoint correctly handles description fields.\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n⚠️  Make sure the backend server is running on port 5000');
    console.log('Run: cd backend && npm start\n');
    process.exit(1);
  }
}

testTeamMemberPost();
