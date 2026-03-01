import React from 'react';

const ServiceSpotlight = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Visual/Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                alt="Professional Cleaning"
                className="w-full h-[400px] object-cover"
              />
            </div>
            {/* Decorative DaisyUI Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary rounded-full -z-0 opacity-20 hidden md:block"></div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2 space-y-6">
            <div className="badge badge-outline badge-primary font-bold px-4 py-3">Most Popular</div>
            <h2 className="text-4xl font-bold leading-tight">
              Experience the <span className="text-primary italic">Transparent</span> Difference
            </h2>
            <p className="text-gray-600 text-lg">
              We don't just clean; we restore your space. Our featured deep-cleaning 
              service uses industrial-grade equipment and transparent checklists so you know exactly what was sanitized.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="bg-success text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="font-medium">Vetted Professional Cleaners</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-success text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="font-medium">Transparent Hourly Rates</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-success text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="font-medium">Eco-Safe Supplies Included</span>
              </li>
            </ul>

            <div className="pt-4 text-center md:text-left">
              <button className="btn btn-primary btn-wide shadow-lg">Check Availability</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSpotlight;