import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, Users, Plus, Edit, Trash2, LogOut } from 'lucide-react';

// Admin Layout Component
function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-emerald-500">Admin Panel</h2>
          <p className="text-sm text-gray-400 mt-1">Gulberg Light Marketing</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/admin" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === '/admin' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            to="/admin/properties" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname.includes('/admin/properties') ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Properties
          </Link>
          <Link 
            to="/admin/leads" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === '/admin/leads' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Leads / Inquiries
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {location.pathname === '/admin' ? 'Dashboard Overview' : 
             location.pathname.includes('/admin/properties') ? 'Manage Properties' : 
             'Customer Inquiries'}
          </h1>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// Dashboard Home
function DashboardHome() {
  const [stats, setStats] = useState({ properties: 0, leads: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/properties').then(res => res.json()),
      fetch('/api/leads').then(res => res.json())
    ]).then(([props, leads]) => {
      setStats({ properties: props.length, leads: leads.length });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Properties</h3>
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Home className="w-6 h-6" />
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.properties}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Inquiries</h3>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.leads}</p>
      </div>
    </div>
  );
}

// Manage Properties
function ManageProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchProperties = () => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      fetchProperties();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Properties List</h2>
        <Link 
          to="/admin/properties/add" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Property
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                  <div className="text-sm text-gray-500">{property.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {property.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.featured ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Featured
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Standard
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add/Edit Property Form
function PropertyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.pathname.includes('/edit/');
  const propertyId = isEdit ? location.pathname.split('/').pop() : null;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'House',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    images: [''],
    featured: false
  });

  useEffect(() => {
    if (isEdit && propertyId) {
      fetch(`/api/properties/${propertyId}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            ...data,
            images: data.images.length > 0 ? data.images : ['']
          });
        });
    }
  }, [isEdit, propertyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = isEdit ? `/api/properties/${propertyId}` : '/api/properties';
    const method = isEdit ? 'PUT' : 'POST';
    
    // Filter out empty image URLs
    const cleanedData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== '')
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData)
      });
      
      if (res.ok) {
        navigate('/admin/properties');
      } else {
        alert('Error saving property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving property');
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input 
              type="text" required
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              rows={4}
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
            <input 
              type="text" required placeholder="e.g. PKR 15 Crore"
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input 
              type="text" required
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select 
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value="House">House</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
            <input 
              type="text" placeholder="e.g. 1 Kanal"
              value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {formData.category === 'House' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <input 
                  type="number" min="0"
                  value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <input 
                  type="number" min="0"
                  value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
            {formData.images.map((img, index) => (
              <div key={index} className="flex mb-2">
                <input 
                  type="text" placeholder="https://..."
                  value={img} onChange={e => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            ))}
            <button 
              type="button" onClick={addImageField}
              className="text-sm text-emerald-600 font-medium mt-2"
            >
              + Add another image URL
            </button>
          </div>

          <div className="md:col-span-2 flex items-center">
            <input 
              type="checkbox" id="featured"
              checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Mark as Featured Property (Shows on Homepage)
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Link 
            to="/admin/properties"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium mr-4 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
          >
            {isEdit ? 'Update Property' : 'Save Property'}
          </button>
        </div>
      </form>
    </div>
  );
}

// View Leads
function ViewLeads() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setLeads(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Inquiries</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                  {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-md">
                  {lead.message || <span className="text-gray-400 italic">No message provided</span>}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/properties" element={<ManageProperties />} />
        <Route path="/properties/add" element={<PropertyForm />} />
        <Route path="/properties/edit/:id" element={<PropertyForm />} />
        <Route path="/leads" element={<ViewLeads />} />
      </Routes>
    </AdminLayout>
  );
}
