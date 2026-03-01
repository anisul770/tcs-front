import React from 'react';

const ServiceInfo = ({ demoService,service }) => {
  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-base-200 aspect-video relative">
        <img 
          src={demoService.image} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 badge badge-primary uppercase font-bold tracking-widest text-xs p-3">
          {service.category.name}
        </div>
      </div>

      {/* Title & Badges */}
      <div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          {service.name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-1 text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full">
            ⭐ {service.avg_rating} Rating
          </div>
          <div className="flex items-center gap-1 text-gray-500 bg-base-200 px-3 py-1 rounded-full">
            📦 {demoService.order_count} Bookings
          </div>
        </div>

        <div className="divider"></div>

        {/* Description */}
        <h3 className="text-2xl font-bold mb-3 italic">Overview</h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {service.description}
        </p>
      </div>

      {/* Features Checklist */}
      <div className="bg-base-200 p-8 rounded-3xl">
        <h3 className="text-2xl font-bold mb-6 italic">What's Included</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoService.features?.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <svg className="w-6 h-6 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceInfo;