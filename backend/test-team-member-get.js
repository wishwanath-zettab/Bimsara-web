/**
 * Test for Task 2.3: Verify GET /api/admin/team-members endpoint returns description fields
 * 
 * This test verifies:
 * - The SELECT query returns all columns including description1 and description2
 * - NULL values are properly serialized in JSON responses
 * 
 * Requirements: 4.1, 4.2, 4.3
 */

const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('./database');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000';
// Generate a valid JWT token for testing
const TEST_TOKEN = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Helper function to create a test team member with specific description values
async function createTestMember(name, position, description1, description2) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO team_members (name, position, description1, description2, display_order) VALUES (?, ?, ?, ?, ?)',
      [name, position, description1, description2, 999],
      function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

// Helper function to clean up test data
async function cleanupTestMembers() {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM team_members WHERE display_order = 999', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Helper function to verify database schema includes description columns
async function verifySchemaHasDescriptionColumns() {
  return new Promise((resolve, reject) => {
    db.all("PRAGMA table_info(team_members)", (err, columns) => {
      if (err) {
        reject(err);
        return;
      }
      
      const hasDescription1 = columns.some(col => col.name === 'description1');
      const hasDescription2 = columns.some(col => col.name === 'description2');
      
      resolve({ hasDescription1, hasDescription2, columns });
    });
  });
}

async function runTests() {
  console.log('=== Task 2.3: GET Endpoint Verification Tests ===\n');
  
  try {
    // Test 1: Verify database schema includes description columns
    console.log('Test 1: Verify SELECT query returns description1 and description2 columns');
    const schemaInfo = await verifySchemaHasDescriptionColumns();
    
    if (!schemaInfo.hasDescription1 || !schemaInfo.hasDescription2) {
      console.error('❌ FAILED: Database schema missing description columns');
      console.log('Columns found:', schemaInfo.columns.map(c => c.name).join(', '));
      return;
    }
    
    console.log('✓ Database schema includes description1 and description2 columns');
    console.log('  Columns:', schemaInfo.columns.map(c => c.name).join(', '));
    console.log();
    
    // Clean up any existing test data
    await cleanupTestMembers();
    
    // Test 2: Create test members with various description scenarios
    console.log('Test 2: Create test team members with different description values');
    
    const testMember1Id = await createTestMember(
      'Test Member With Both Descriptions',
      'Test Position',
      'First description text',
      'Second description text'
    );
    console.log('✓ Created test member with both descriptions (ID:', testMember1Id + ')');
    
    const testMember2Id = await createTestMember(
      'Test Member With NULL Descriptions',
      'Test Position',
      null,
      null
    );
    console.log('✓ Created test member with NULL descriptions (ID:', testMember2Id + ')');
    
    const testMember3Id = await createTestMember(
      'Test Member With One Description',
      'Test Position',
      'Only first description',
      null
    );
    console.log('✓ Created test member with only description1 (ID:', testMember3Id + ')');
    console.log();
    
    // Test 3: Fetch team members via GET endpoint
    console.log('Test 3: Verify GET /api/admin/team-members returns description fields');
    
    const response = await axios.get(`${BASE_URL}/api/admin/team-members`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });
    
    if (response.status !== 200) {
      console.error('❌ FAILED: Expected status 200, got', response.status);
      return;
    }
    console.log('✓ GET request successful (status 200)');
    
    // Test 4: Verify response includes description fields
    console.log('\nTest 4: Verify response includes description1 and description2 fields');
    
    const testMembers = response.data.filter(m => m.display_order === 999);
    
    if (testMembers.length !== 3) {
      console.error('❌ FAILED: Expected 3 test members, found', testMembers.length);
      return;
    }
    console.log('✓ Found all 3 test members in response');
    
    // Verify each test member has description fields
    const member1 = testMembers.find(m => m.id === testMember1Id);
    const member2 = testMembers.find(m => m.id === testMember2Id);
    const member3 = testMembers.find(m => m.id === testMember3Id);
    
    if (!member1 || !member2 || !member3) {
      console.error('❌ FAILED: Could not find all test members in response');
      return;
    }
    
    // Test 5: Verify member with both descriptions
    console.log('\nTest 5: Verify member with both descriptions');
    console.log('Member 1 data:', JSON.stringify(member1, null, 2));
    
    if (!('description1' in member1) || !('description2' in member1)) {
      console.error('❌ FAILED: Response missing description1 or description2 fields');
      return;
    }
    console.log('✓ Response includes description1 and description2 fields');
    
    if (member1.description1 !== 'First description text') {
      console.error('❌ FAILED: description1 value incorrect. Expected "First description text", got:', member1.description1);
      return;
    }
    console.log('✓ description1 value correct:', member1.description1);
    
    if (member1.description2 !== 'Second description text') {
      console.error('❌ FAILED: description2 value incorrect. Expected "Second description text", got:', member1.description2);
      return;
    }
    console.log('✓ description2 value correct:', member1.description2);
    
    // Test 6: Verify NULL value serialization
    console.log('\nTest 6: Verify NULL values are properly serialized in JSON');
    console.log('Member 2 data:', JSON.stringify(member2, null, 2));
    
    if (!('description1' in member2) || !('description2' in member2)) {
      console.error('❌ FAILED: Response missing description1 or description2 fields for NULL values');
      return;
    }
    console.log('✓ Response includes description1 and description2 fields even when NULL');
    
    if (member2.description1 !== null) {
      console.error('❌ FAILED: description1 should be null, got:', member2.description1);
      return;
    }
    console.log('✓ NULL description1 properly serialized as null');
    
    if (member2.description2 !== null) {
      console.error('❌ FAILED: description2 should be null, got:', member2.description2);
      return;
    }
    console.log('✓ NULL description2 properly serialized as null');
    
    // Test 7: Verify partial description values
    console.log('\nTest 7: Verify member with only description1');
    console.log('Member 3 data:', JSON.stringify(member3, null, 2));
    
    if (member3.description1 !== 'Only first description') {
      console.error('❌ FAILED: description1 value incorrect. Expected "Only first description", got:', member3.description1);
      return;
    }
    console.log('✓ description1 value correct:', member3.description1);
    
    if (member3.description2 !== null) {
      console.error('❌ FAILED: description2 should be null, got:', member3.description2);
      return;
    }
    console.log('✓ description2 properly serialized as null when only description1 is set');
    
    // Test 8: Verify SELECT * returns all columns
    console.log('\nTest 8: Verify SELECT * query returns all expected columns');
    const expectedColumns = ['id', 'name', 'position', 'photo_path', 'display_order', 'description1', 'description2', 'created_at', 'updated_at'];
    const actualColumns = Object.keys(member1);
    
    const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
    if (missingColumns.length > 0) {
      console.error('❌ FAILED: Missing columns in response:', missingColumns.join(', '));
      return;
    }
    console.log('✓ All expected columns present in response');
    console.log('  Columns:', actualColumns.join(', '));
    
    console.log('\n=== ALL TESTS PASSED ===');
    console.log('\nSummary:');
    console.log('✓ Database schema includes description1 and description2 columns');
    console.log('✓ SELECT * query returns description fields');
    console.log('✓ Non-NULL description values are correctly returned');
    console.log('✓ NULL description values are properly serialized as null in JSON');
    console.log('✓ Partial description values (only description1) work correctly');
    console.log('✓ All expected columns are present in the response');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
      console.error(error.stack);
    }
  } finally {
    // Clean up test data
    await cleanupTestMembers();
    console.log('\n✓ Test data cleaned up');
    
    // Close database connection
    db.close();
    process.exit(0);
  }
}

// Run tests
runTests();
