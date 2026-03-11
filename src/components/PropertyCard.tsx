import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';

export interface Property {
  id: string | number;
  title: string;
  description: string;
  price: string;
  location: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
  featured: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://picsum.photos/seed/placeholder/800/600';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mainImage} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white font-bold text-xl">{property.price}</p>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
        <div className="flex items-start text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
          <p className="text-sm line-clamp-1">{property.location}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 mb-4">
          {property.category !== 'Commercial' && property.category !== 'Plot' && (
            <>
              <div className="flex items-center text-gray-600">
                <Bed className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-sm font-medium">{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Bath className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-sm font-medium">{property.bathrooms} Baths</span>
              </div>
            </>
          )}
          <div className="flex items-center text-gray-600 col-span-1">
            <Square className="w-4 h-4 mr-2 text-emerald-600" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>
        </div>
        
        <Link 
          to={`/properties/${property.id}`}
          className="flex items-center justify-between w-full text-emerald-700 font-semibold hover:text-emerald-800 transition-colors group/link"
        >
          View Details
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
