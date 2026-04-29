// Check database schema
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'bimsara_admin.db');
const db = new sqlite3.Database(dbPath);

db.all("PRAGMA table_info(team_members)", (err, columns) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  
  console.log('Team Members Table Schema:');
  console.log('===========================');
  columns.forEach(col => {
    console.log(`${col.name} (${col.type}) - ${col.notnull ? 'NOT NULL' : 'NULL'}`);
  });
  
  db.close();
});
