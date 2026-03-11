import { CheckCircle, Users, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/about/1920/600" 
            alt="About Us" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Gulberg Light Marketing (Pvt). Ltd is your trusted partner in real estate.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Gulberg Light Marketing (Pvt). Ltd is a leading real estate agency based in Islamabad, specializing in premium properties within Gulberg Greens and surrounding areas.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With a team of dedicated professionals, we provide comprehensive real estate services including buying, selling, and investing in residential and commercial properties. Our deep understanding of the local market ensures that our clients receive the best possible advice and achieve their real estate goals.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Verified Properties</h4>
                  <p className="text-gray-600">We only list properties that have been thoroughly vetted and verified.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Expert Guidance</h4>
                  <p className="text-gray-600">Our experienced agents provide personalized guidance throughout the process.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Transparent Transactions</h4>
                  <p className="text-gray-600">We believe in complete transparency and honesty in all our dealings.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600 font-medium">Happy Clients</p>
            </div>
            <div className="bg-emerald-50 p-8 rounded-2xl text-center mt-12">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10+</h3>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
            <div className="bg-emerald-50 p-8 rounded-2xl text-center -mt-12">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600 font-medium">Properties Sold</p>
            </div>
            <div className="bg-emerald-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600 font-medium">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
