import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  // Use environment variable or fallback to a local MongoDB instance
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gulberg';
  
  try {
    cachedDb = await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
  return cachedDb;
}

// Ensure DB connection before handling requests
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Mongoose Schemas
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  images: [String],
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now }
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

// Seed initial data if empty
async function seedDataIfNeeded() {
  try {
    const count = await Property.countDocuments();
    if (count === 0) {
      await Property.create([
        {
          title: 'Luxury Villa in Gulberg Greens',
          description: 'Experience luxury living in this beautifully designed villa located in the heart of Gulberg Greens.',
          price: 'PKR 15 Crore',
          location: 'Block A, Gulberg Greens, Islamabad',
          category: 'House',
          bedrooms: 5,
          bathrooms: 6,
          area: '2 Kanal',
          images: ['https://picsum.photos/seed/villa1/800/600', 'https://picsum.photos/seed/villa2/800/600'],
          featured: true
        },
        {
          title: 'Commercial Plot on Main Boulevard',
          description: 'Prime location commercial plot ideal for a multi-story plaza or corporate office.',
          price: 'PKR 25 Crore',
          location: 'Main Boulevard, Gulberg Greens, Islamabad',
          category: 'Commercial',
          bedrooms: 0,
          bathrooms: 0,
          area: '1 Kanal',
          images: ['https://picsum.photos/seed/plot1/800/600'],
          featured: true
        },
        {
          title: 'Modern Farmhouse',
          description: 'A stunning modern farmhouse with a large garden and swimming pool.',
          price: 'PKR 35 Crore',
          location: 'Farmhouse Lane, Gulberg Greens, Islamabad',
          category: 'House',
          bedrooms: 6,
          bathrooms: 7,
          area: '4 Kanal',
          images: ['https://picsum.photos/seed/farmhouse1/800/600', 'https://picsum.photos/seed/farmhouse2/800/600'],
          featured: true
        }
      ]);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// API Routes
app.get('/api/properties', async (req, res) => {
  try {
    await seedDataIfNeeded();
    const { featured, category } = req.query;
    const query: any = {};
    
    if (featured === 'true') query.featured = true;
    if (category) query.category = category;
    
    const properties = await Property.find(query).sort({ created_at: -1 });
    // Map _id to id for frontend compatibility
    res.json(properties.map(p => ({ ...p.toObject(), id: p._id })));
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json({ ...property.toObject(), id: property._id });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ id: property._id, message: 'Property created successfully' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

app.put('/api/properties/:id', async (req, res) => {
  try {
    await Property.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    await Lead.create(req.body);
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ created_at: -1 });
    res.json(leads.map(l => ({ ...l.toObject(), id: l._id })));
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

export default app;
