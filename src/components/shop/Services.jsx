import React from 'react';
import ServiceCard from '../clientservice/ServiceCard';
import { Sparkles } from 'lucide-react';

const Services = ({ services, loading }) => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-[10px] mb-3">
            <Sparkles size={14} /> Premium Selection
          </div>
          <h2 className="text-5xl md:text-6xl font-black italic text-base-content uppercase tracking-tighter leading-none">
            Featured <span className="text-primary">Services</span>
          </h2>
          <div className="h-1.5 w-20 bg-primary mt-6 rounded-full"></div>
        </div>

        {/* --- GRID LOGIC --- */}
        {loading ? (
          /* Skeleton Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 w-full bg-base-200 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        ) : (
          /* Optimized Grid: 
             - 1 col on Mobile
             - 2 cols on Tablet (sm/md)
             - 3 cols on Laptop (lg)
             - 4 cols on Desktop (xl)
          */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;