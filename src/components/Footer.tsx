import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6 tracking-tight">
              Gulberg Light <span className="font-light text-emerald-500">Marketing</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in real estate. We specialize in premium properties, commercial plots, and luxury homes in Gulberg Greens, Islamabad.
            </p>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/sardarrizwanrealtor/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/gulberglightmarketing_pvt.ltd/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@Gulberg.Light.Marketing/featured" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-emerald-500 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-emerald-600" /> Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-emerald-500 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-emerald-600" /> Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-500 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-emerald-600" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-emerald-500 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-emerald-600" /> Latest Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-500 transition-colors flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-emerald-600" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                <span>Office no 35 Ground Floor, Diamond Mall & Residency, Service Rd S, Gulberg Greens Block B, Islamabad</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <a href="tel:03185458823" className="hover:text-emerald-500 transition-colors">0318 5458823</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@gulberglightmarketing.com" className="hover:text-emerald-500 transition-colors">info@gulberglightmarketing.com</a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Location</h4>
            <div className="h-48 rounded-lg overflow-hidden border border-gray-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.067332766336!2d73.1557007!3d33.6295556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb00647b1981%3A0x6a0589139268846c!2sGulberg%20Light%20Marketing%20(Pvt).%20Ltd!5e0!3m2!1sen!2s!4v1709664000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} Gulberg Light Marketing (Pvt). Ltd. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-500 text-sm">
            Designed & Developed for Real Estate Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
