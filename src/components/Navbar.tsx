import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white py-2 px-4 sm:px-6 lg:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Gulberg Greens, Islamabad</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:03185458823" className="flex items-center hover:text-emerald-200 transition-colors">
              <Phone className="w-4 h-4 mr-1" /> 0318 5458823
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-900 tracking-tight">Gulberg Light</span>
              <span className="text-2xl font-light text-gray-600 ml-1">Marketing</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive(link.path) ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:03185458823"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:03185458823"
              className="block w-full text-center mt-4 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-md font-medium transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5 inline-block mr-2" />
              0318 5458823
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
