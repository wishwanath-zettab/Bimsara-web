// Test script for PUT /api/admin/team-members/:id endpoint
// Run with: node test-team-member-put.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testPutEndpoint() {
  console.log('🧪 Testing PUT /api/admin/team-members/:id endpoint...\n');

  try {
    // Step 1: Login to get token
    console.log('1️⃣ Logging in...');
    const login = await axios.post(`${BASE_URL}/api/admin/login`, {
      username: 'admin',
      password: 'admin'
    });
    const token = login.data.token;
    console.log('✅ Login successful!\n');

    const authHeaders = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    // Step 2: Get existing team members
    console.log('2️⃣ Fetching existing team members...');
    const getResponse = await axios.get(`${BASE_URL}/api/admin/team-members`, authHeaders);
    const members = getResponse.data;
    
    if (members.length === 0) {
      console.log('❌ No team members found. Please create a team member first.');
      return;
    }
    
    const testMember = members[0];
    console.log(`✅ Found team member: ${testMember.name} (ID: ${testMember.id})\n`);

    // Step 3: Update team member with description fields
    console.log('3️⃣ Updating team member with description fields...');
    const updateData = {
      name: testMember.name,
      position: testMember.position,
      description1: 'Test description 1 - Updated via PUT endpoint',
      description2: 'Test description 2 - Updated via PUT endpoint'
    };

    const updateResponse = await axios.put(
      `${BASE_URL}/api/admin/team-members/${testMember.id}`,
      updateData,
      authHeaders
    );
    console.log('✅ Update response:', updateResponse.data);
    console.log('');

    // Step 4: Verify the update
    console.log('4️⃣ Verifying the update...');
    const verifyResponse = await axios.get(`${BASE_URL}/api/admin/team-members`, authHeaders);
    const updatedMember = verifyResponse.data.find(m => m.id === testMember.id);
    
    console.log('Updated member data:');
    console.log('  Name:', updatedMember.name);
    console.log('  Position:', updatedMember.position);
    console.log('  Description 1:', updatedMember.description1);
    console.log('  Description 2:', updatedMember.description2);
    console.log('');

    // Step 5: Test with NULL values (empty descriptions)
    console.log('5️⃣ Testing with empty descriptions (NULL handling)...');
    const updateDataNull = {
      name: testMember.name,
      position: testMember.position,
      description1: '',
      description2: ''
    };

    await axios.put(
      `${BASE_URL}/api/admin/team-members/${testMember.id}`,
      updateDataNull,
      authHeaders
    );
    console.log('✅ Update with empty descriptions successful\n');

    // Step 6: Verify NULL handling
    console.log('6️⃣ Verifying NULL handling...');
    const verifyNullResponse = await axios.get(`${BASE_URL}/api/admin/team-members`, authHeaders);
    const memberWithNull = verifyNullResponse.data.find(m => m.id === testMember.id);
    
    console.log('Member data after clearing descriptions:');
    console.log('  Description 1:', memberWithNull.description1);
    console.log('  Description 2:', memberWithNull.description2);
    console.log('');

    console.log('🎉 All PUT endpoint tests passed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    console.log('\n⚠️  Make sure:');
    console.log('  1. Backend server is running on port 5000');
    console.log('  2. Database has been migrated with description columns');
    console.log('  3. At least one team member exists in the database\n');
  }
}

testPutEndpoint();
