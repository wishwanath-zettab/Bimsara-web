const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

dotenv.config();

const db = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ============ AUTH ROUTES ============

// Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Simple authentication (username: admin, password: admin)
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ============ CONTACT DETAILS ROUTES ============

// Get contact details
app.get('/api/admin/contact-details', authenticateToken, (req, res) => {
  db.get('SELECT * FROM contact_details ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || { office_address: '' });
  });
});

// Update contact details
app.put('/api/admin/contact-details', authenticateToken, (req, res) => {
  const { office_address } = req.body;

  db.run(
    'UPDATE contact_details SET office_address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
    [office_address],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Contact details updated successfully' });
    }
  );
});

// Get contact categories
app.get('/api/admin/contact-categories', authenticateToken, (req, res) => {
  db.all('SELECT * FROM contact_categories ORDER BY display_order', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create contact category
app.post('/api/admin/contact-categories', authenticateToken, (req, res) => {
  const { category_name, email, phone, display_order } = req.body;

  db.run(
    'INSERT INTO contact_categories (category_name, email, phone, display_order) VALUES (?, ?, ?, ?)',
    [category_name, email, phone, display_order],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ 
        id: this.lastID,
        message: 'Contact category created successfully' 
      });
    }
  );
});

// Update contact category
app.put('/api/admin/contact-categories/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { category_name, email, phone } = req.body;

  db.run(
    'UPDATE contact_categories SET category_name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [category_name, email, phone, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Contact category updated successfully' });
    }
  );
});

// Delete contact category
app.delete('/api/admin/contact-categories/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM contact_categories WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Contact category deleted successfully' });
  });
});

// ============ SERVICE PROVIDERS ROUTES ============

// Get all service providers
app.get('/api/admin/service-providers', authenticateToken, (req, res) => {
  db.all('SELECT * FROM service_providers ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create service provider
app.post('/api/admin/service-providers', authenticateToken, upload.single('logo'), (req, res) => {
  const { company_name } = req.body;
  const logo_path = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    'INSERT INTO service_providers (company_name, logo_path) VALUES (?, ?)',
    [company_name, logo_path],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ 
        id: this.lastID, 
        company_name, 
        logo_path,
        message: 'Service provider created successfully' 
      });
    }
  );
});

// Delete service provider
app.delete('/api/admin/service-providers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  // Get the logo path before deleting
  db.get('SELECT logo_path FROM service_providers WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Delete the file if it exists
    if (row && row.logo_path) {
      const filePath = path.join(__dirname, row.logo_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    db.run('DELETE FROM service_providers WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Service provider deleted successfully' });
    });
  });
});

// ============ TEAM MEMBERS ROUTES ============

// Get all team members
app.get('/api/admin/team-members', authenticateToken, (req, res) => {
  db.all('SELECT * FROM team_members ORDER BY display_order', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create team member
app.post('/api/admin/team-members', authenticateToken, upload.single('photo'), (req, res) => {
  const { name, position, description1, description2 } = req.body;
  const photo_path = req.file ? `/uploads/${req.file.filename}` : null;

  // Get max display_order
  db.get('SELECT MAX(display_order) as max_order FROM team_members', (err, row) => {
    const display_order = (row && row.max_order) ? row.max_order + 1 : 1;

    db.run(
      'INSERT INTO team_members (name, position, photo_path, display_order, description1, description2) VALUES (?, ?, ?, ?, ?, ?)',
      [name, position, photo_path, display_order, description1 || null, description2 || null],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ 
          id: this.lastID, 
          name, 
          position,
          photo_path,
          display_order,
          description1: description1 || null,
          description2: description2 || null,
          message: 'Team member created successfully' 
        });
      }
    );
  });
});

// Update team member
app.put('/api/admin/team-members/:id', authenticateToken, upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, position, description1, description2 } = req.body;

  db.run(
    'UPDATE team_members SET name = ?, position = ?, description1 = ?, description2 = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, position, description1 || null, description2 || null, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Team member updated successfully' });
    }
  );
});

// Update team member order
app.put('/api/admin/team-members/:id/order', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { display_order } = req.body;

  db.run(
    'UPDATE team_members SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [display_order, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Order updated successfully' });
    }
  );
});

// Delete team member
app.delete('/api/admin/team-members/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  // Get the photo path before deleting
  db.get('SELECT photo_path FROM team_members WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Delete the file if it exists
    if (row && row.photo_path) {
      const filePath = path.join(__dirname, row.photo_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    db.run('DELETE FROM team_members WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Team member deleted successfully' });
    });
  });
});

// ============ OTHER SETTINGS ROUTES ============

// Get other settings
app.get('/api/admin/other-settings', authenticateToken, (req, res) => {
  db.get('SELECT * FROM other_settings ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || { commission_rate: '', iso_certificate_path: null });
  });
});

// Update commission rate
app.put('/api/admin/other-settings/commission', authenticateToken, (req, res) => {
  const { commission_rate } = req.body;

  db.run(
    'UPDATE other_settings SET commission_rate = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
    [commission_rate],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Commission rate updated successfully' });
    }
  );
});

// Upload ISO certificate
app.post('/api/admin/other-settings/iso-certificate', authenticateToken, upload.single('certificate'), (req, res) => {
  const certificate_path = req.file ? `/uploads/${req.file.filename}` : null;

  if (!certificate_path) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Get old certificate path
  db.get('SELECT iso_certificate_path FROM other_settings WHERE id = 1', (err, row) => {
    if (!err && row && row.iso_certificate_path) {
      const oldFilePath = path.join(__dirname, row.iso_certificate_path);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update with new certificate
    db.run(
      'UPDATE other_settings SET iso_certificate_path = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
      [certificate_path],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ 
          iso_certificate_path: certificate_path,
          message: 'ISO certificate uploaded successfully' 
        });
      }
    );
  });
});

// Delete ISO certificate
app.delete('/api/admin/other-settings/iso-certificate', authenticateToken, (req, res) => {
  // Get certificate path before deleting
  db.get('SELECT iso_certificate_path FROM other_settings WHERE id = 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Delete the file if it exists
    if (row && row.iso_certificate_path) {
      const filePath = path.join(__dirname, row.iso_certificate_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove from database
    db.run(
      'UPDATE other_settings SET iso_certificate_path = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'ISO certificate removed successfully' });
      }
    );
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
