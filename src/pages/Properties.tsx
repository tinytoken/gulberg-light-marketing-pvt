import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import PropertyCard, { Property } from '../components/PropertyCard';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let url = '/api/properties';
    if (category) {
      url += `?category=${category}`;
    }
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, [category]);

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Properties for Sale</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of premium properties in Gulberg Greens, Islamabad.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by title or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="w-full md:w-64 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none bg-white transition-all"
            >
              <option value="">All Categories</option>
              <option value="House">Houses</option>
              <option value="Plot">Plots</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
            <button 
              onClick={() => { setSearch(''); setCategory(''); }}
              className="mt-4 text-emerald-600 font-medium hover:text-emerald-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
