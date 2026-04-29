const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'bimsara_admin.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Contact Details Table
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      office_address TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Contact Categories Table
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      display_order INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Service Providers Table
  db.run(`
    CREATE TABLE IF NOT EXISTS service_providers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      logo_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Other Settings Table
  db.run(`
    CREATE TABLE IF NOT EXISTS other_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commission_rate TEXT,
      iso_certificate_path TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Team Members Table
  db.run(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      photo_path TEXT,
      display_order INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating team_members table:', err.message);
      return;
    }
    
    // Safe migration: Add description columns if they don't exist
    db.all("PRAGMA table_info(team_members)", (err, columns) => {
      if (err) {
        console.error('Error checking team_members schema:', err.message);
        return;
      }
      
      const hasDescription1 = columns.some(col => col.name === 'description1');
      const hasDescription2 = columns.some(col => col.name === 'description2');
      
      if (!hasDescription1) {
        db.run("ALTER TABLE team_members ADD COLUMN description1 TEXT", (err) => {
          if (err) {
            console.error('Error adding description1 column:', err.message);
          } else {
            console.log('Added description1 column to team_members table');
          }
        });
      }
      
      if (!hasDescription2) {
        db.run("ALTER TABLE team_members ADD COLUMN description2 TEXT", (err) => {
          if (err) {
            console.error('Error adding description2 column:', err.message);
          } else {
            console.log('Added description2 column to team_members table');
          }
        });
      }
    });
  });

  // Initialize default data
  db.get('SELECT COUNT(*) as count FROM contact_details', (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO contact_details (office_address) VALUES ('123 Main Street, City, Country')`);
    }
  });

  db.get('SELECT COUNT(*) as count FROM contact_categories', (err, row) => {
    if (!err && row.count === 0) {
      const categories = [
        ['GENERAL INQUIRIES', 'info@bimsara.com', '+1234567890', 1],
        ['LANDS', 'lands@bimsara.com', '+1234567891', 2],
        ['APARTMENTS', 'apartments@bimsara.com', '+1234567892', 3],
        ['HOUSES', 'houses@bimsara.com', '+1234567893', 4],
        ['RENTALS', 'rentals@bimsara.com', '+1234567894', 5]
      ];
      
      const stmt = db.prepare('INSERT INTO contact_categories (category_name, email, phone, display_order) VALUES (?, ?, ?, ?)');
      categories.forEach(cat => stmt.run(cat));
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM other_settings', (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO other_settings (commission_rate) VALUES ('5%')`);
    }
  });
}

module.exports = db;
