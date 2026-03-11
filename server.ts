import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize SQLite database
const db = new Database('database.sqlite');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area TEXT,
    images TEXT,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number };
if (count.count === 0) {
  const insertProperty = db.prepare(`
    INSERT INTO properties (title, description, price, location, category, bedrooms, bathrooms, area, images, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProperty.run(
    'Luxury Villa in Gulberg Greens',
    'Experience luxury living in this beautifully designed villa located in the heart of Gulberg Greens.',
    'PKR 15 Crore',
    'Block A, Gulberg Greens, Islamabad',
    'House',
    5,
    6,
    '2 Kanal',
    JSON.stringify(['https://picsum.photos/seed/villa1/800/600', 'https://picsum.photos/seed/villa2/800/600']),
    1
  );

  insertProperty.run(
    'Commercial Plot on Main Boulevard',
    'Prime location commercial plot ideal for a multi-story plaza or corporate office.',
    'PKR 25 Crore',
    'Main Boulevard, Gulberg Greens, Islamabad',
    'Commercial',
    0,
    0,
    '1 Kanal',
    JSON.stringify(['https://picsum.photos/seed/plot1/800/600']),
    1
  );

  insertProperty.run(
    'Modern Farmhouse',
    'A stunning modern farmhouse with a large garden and swimming pool.',
    'PKR 35 Crore',
    'Farmhouse Lane, Gulberg Greens, Islamabad',
    'House',
    6,
    7,
    '4 Kanal',
    JSON.stringify(['https://picsum.photos/seed/farmhouse1/800/600', 'https://picsum.photos/seed/farmhouse2/800/600']),
    1
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Get all properties
  app.get('/api/properties', (req, res) => {
    try {
      const { featured, category } = req.query;
      let query = 'SELECT * FROM properties';
      const params: any[] = [];
      const conditions: string[] = [];

      if (featured === 'true') {
        conditions.push('featured = 1');
      }
      if (category) {
        conditions.push('category = ?');
        params.push(category);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      
      query += ' ORDER BY created_at DESC';

      const properties = db.prepare(query).all();
      
      // Parse images JSON
      const formattedProperties = properties.map((p: any) => ({
        ...p,
        images: JSON.parse(p.images || '[]'),
        featured: Boolean(p.featured)
      }));

      res.json(formattedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  });

  // Get single property
  app.get('/api/properties/:id', (req, res) => {
    try {
      const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id) as any;
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      property.images = JSON.parse(property.images || '[]');
      property.featured = Boolean(property.featured);
      
      res.json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  });

  // Create property
  app.post('/api/properties', (req, res) => {
    try {
      const { title, description, price, location, category, bedrooms, bathrooms, area, images, featured } = req.body;
      
      const insert = db.prepare(`
        INSERT INTO properties (title, description, price, location, category, bedrooms, bathrooms, area, images, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const result = insert.run(
        title,
        description || '',
        price,
        location,
        category,
        bedrooms || 0,
        bathrooms || 0,
        area || '',
        JSON.stringify(images || []),
        featured ? 1 : 0
      );
      
      res.status(201).json({ id: result.lastInsertRowid, message: 'Property created successfully' });
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(500).json({ error: 'Failed to create property' });
    }
  });

  // Update property
  app.put('/api/properties/:id', (req, res) => {
    try {
      const { title, description, price, location, category, bedrooms, bathrooms, area, images, featured } = req.body;
      
      const update = db.prepare(`
        UPDATE properties 
        SET title = ?, description = ?, price = ?, location = ?, category = ?, bedrooms = ?, bathrooms = ?, area = ?, images = ?, featured = ?
        WHERE id = ?
      `);
      
      update.run(
        title,
        description || '',
        price,
        location,
        category,
        bedrooms || 0,
        bathrooms || 0,
        area || '',
        JSON.stringify(images || []),
        featured ? 1 : 0,
        req.params.id
      );
      
      res.json({ message: 'Property updated successfully' });
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'Failed to update property' });
    }
  });

  // Delete property
  app.delete('/api/properties/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM properties WHERE id = ?').run(req.params.id);
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Failed to delete property' });
    }
  });

  // Submit lead
  app.post('/api/leads', (req, res) => {
    try {
      const { name, phone, email, message } = req.body;
      
      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }
      
      const insert = db.prepare(`
        INSERT INTO leads (name, phone, email, message)
        VALUES (?, ?, ?, ?)
      `);
      
      insert.run(name, phone, email || '', message || '');
      
      res.status(201).json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
      console.error('Error submitting lead:', error);
      res.status(500).json({ error: 'Failed to submit inquiry' });
    }
  });

  // Get all leads (Admin)
  app.get('/api/leads', (req, res) => {
    try {
      const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
      res.json(leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();
