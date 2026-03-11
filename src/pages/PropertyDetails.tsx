import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { Property } from '../components/PropertyCard';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setFormData(prev => ({
          ...prev,
          message: `I am interested in the property: ${data.title} (${data.price})`
        }));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
        <Link to="/properties" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://picsum.photos/seed/placeholder/800/600'];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/properties" className="inline-flex items-center text-gray-500 hover:text-emerald-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-[400px] md:h-[500px]">
                <img 
                  src={images[activeImage]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {property.category}
                  </span>
                  {property.featured && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              
              {images.length > 1 && (
                <div className="flex p-4 gap-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === index ? 'border-emerald-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-700 whitespace-nowrap">
                  {property.price}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-gray-100 mb-8">
                {property.category !== 'Commercial' && property.category !== 'Plot' && (
                  <>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                      <Bed className="w-8 h-8 text-emerald-600 mb-2" />
                      <span className="text-sm text-gray-500">Bedrooms</span>
                      <span className="font-bold text-gray-900">{property.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                      <Bath className="w-8 h-8 text-emerald-600 mb-2" />
                      <span className="text-sm text-gray-500">Bathrooms</span>
                      <span className="font-bold text-gray-900">{property.bathrooms}</span>
                    </div>
                  </>
                )}
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <Square className="w-8 h-8 text-emerald-600 mb-2" />
                  <span className="text-sm text-gray-500">Area</span>
                  <span className="font-bold text-gray-900">{property.area}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="font-bold text-gray-900">Available</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description || 'No description available for this property.'}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Agent */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Interested in this property?</h3>
              
              <div className="flex items-center mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-emerald-700">GL</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Gulberg Light Marketing</h4>
                  <p className="text-sm text-gray-500">Real Estate Agency</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <a href="tel:03185458823" className="flex items-center justify-center w-full py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition-colors">
                  <Phone className="w-5 h-5 mr-2" /> 0318 5458823
                </a>
              </div>

              {status === 'success' ? (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg text-center border border-emerald-200">
                  <p className="font-medium">Inquiry Sent Successfully!</p>
                  <p className="text-sm mt-1">Our agent will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text" required placeholder="Your Name"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel" required placeholder="Phone Number"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email" placeholder="Email Address"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4} placeholder="Message"
                      value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit" disabled={status === 'submitting'}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
