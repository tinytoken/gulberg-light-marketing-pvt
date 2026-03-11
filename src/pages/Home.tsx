import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Building, MapPin, ShieldCheck, Users, Star } from 'lucide-react';
import PropertyCard, { Property } from '../components/PropertyCard';

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties?featured=true')
      .then(res => res.json())
      .then(data => {
        setFeaturedProperties(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching featured properties:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/islamabad/1920/1080" 
            alt="Gulberg Greens Islamabad" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Find Your Dream Property in <br className="hidden md:block" />
            <span className="text-emerald-400">Gulberg Greens</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Gulberg Light Marketing offers premium residential and commercial properties in Islamabad's most prestigious location.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-4 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 py-3">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search location, property type..." 
                className="w-full outline-none text-gray-700"
              />
            </div>
            <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 py-3">
              <Building className="w-5 h-5 text-gray-400 mr-3" />
              <select className="w-full outline-none text-gray-700 bg-transparent">
                <option value="">Property Type</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <Link 
              to="/properties"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Search Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Gulberg Light Marketing
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Gulberg Light Marketing (Pvt). Ltd is a premier real estate agency based in Gulberg Greens, Islamabad. With years of experience and a deep understanding of the local market, we provide unparalleled service to our clients.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you are looking to buy a luxury home, invest in commercial property, or find the perfect plot to build your dream house, our team of dedicated professionals is here to guide you every step of the way.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                Read More About Us <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://picsum.photos/seed/office/800/1000" 
                alt="Our Office" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <div className="flex items-center text-white mb-2">
                  <MapPin className="w-6 h-6 text-emerald-400 mr-2" />
                  <span className="text-xl font-semibold">Visit Our Office</span>
                </div>
                <p className="text-gray-300">Diamond Mall & Residency, Gulberg Greens</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties available in Gulberg Greens.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/properties"
              className="inline-flex items-center justify-center px-8 py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg font-semibold transition-colors"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
              We are committed to providing the best real estate services in Islamabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Trusted Agency</h3>
              <p className="text-emerald-100 leading-relaxed">
                A registered and verified real estate agency with a proven track record of successful transactions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-emerald-100 leading-relaxed">
                Deep knowledge of Gulberg Greens and surrounding areas to help you make informed decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Client-Centric</h3>
              <p className="text-emerald-100 leading-relaxed">
                We prioritize your needs and work tirelessly to find the perfect property that matches your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "Gulberg Light Marketing helped me find the perfect commercial plot for my business. Their professionalism and market knowledge are unmatched. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl mr-4">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Client Name {i}</h4>
                    <p className="text-sm text-gray-500">Investor</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Contact us today and let our experts guide you through the process of buying or selling property in Gulberg Greens.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Contact Us Now
            </Link>
            <a 
              href="tel:03185458823"
              className="bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-200 px-8 py-4 rounded-lg font-semibold transition-colors text-lg flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" /> Call 0318 5458823
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
