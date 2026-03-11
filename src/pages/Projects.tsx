import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Diamond Mall & Residency',
      description: 'A state-of-the-art commercial and residential complex located in the heart of Gulberg Greens. Offering luxury apartments and premium retail spaces.',
      image: 'https://picsum.photos/seed/project1/800/600',
      status: 'Under Construction',
      location: 'Block B, Gulberg Greens, Islamabad'
    },
    {
      id: 2,
      title: 'Gulberg Heights',
      description: 'Experience modern living at Gulberg Heights. Featuring spacious apartments with panoramic views of the Margalla Hills and top-notch amenities.',
      image: 'https://picsum.photos/seed/project2/800/600',
      status: 'Completed',
      location: 'Block A, Gulberg Greens, Islamabad'
    },
    {
      id: 3,
      title: 'The Corporate Center',
      description: 'A premium office building designed for modern businesses. Offering flexible workspaces, high-speed internet, and ample parking.',
      image: 'https://picsum.photos/seed/project3/800/600',
      status: 'Upcoming',
      location: 'Main Boulevard, Gulberg Greens, Islamabad'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Latest Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our ongoing and completed projects in Gulberg Greens, Islamabad.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100`}>
              <div className="w-full lg:w-1/2 h-[400px] relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white ${
                    project.status === 'Completed' ? 'bg-emerald-600' : 
                    project.status === 'Under Construction' ? 'bg-amber-500' : 'bg-blue-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
                <div className="flex items-center text-gray-500 mb-6">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                  <span>{project.location}</span>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors group"
                >
                  Inquire About This Project 
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
