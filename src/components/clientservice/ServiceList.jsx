import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import apiClient from '../../services/api-client';
import { LayoutGrid, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true by default
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient.get("/services/?ordering=-avg_rating")
      .then((res) => {
        // Handle both direct array or paginated .results
        const data = res.data.results || res.data;
        setServices(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return (
    <div className="text-center py-20 bg-error/5 rounded-3xl m-6">
       <p className="text-error font-black italic uppercase tracking-widest">Failed to load services.</p>
    </div>
  );

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-[10px] mb-4">
              <Sparkles size={14} /> Premium Solutions
            </div>
            <h2 className="text-5xl md:text-6xl font-black italic text-base-content uppercase tracking-tighter leading-none">
              Featured <span className="text-primary text-outline">Services</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mt-6 rounded-full"></div>
          </div>
          
          <Link to="/services" className="group flex items-center gap-3 text-xs font-black uppercase italic tracking-widest opacity-60 hover:opacity-100 transition-all">
            View All Catalog <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* --- LOADING STATE (Skeleton Grid) --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 w-full bg-base-200 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        ) : (
          /* --- COMPACT 4-COLUMN GRID --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        )}

        {/* Bottom Banner for empty space filling */}
        <div className="mt-20 p-10 bg-neutral rounded-[3rem] text-neutral-content flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-primary/20 rounded-2xl">
                 <LayoutGrid className="text-primary" size={32} />
              </div>
              <div>
                 <h3 className="text-xl font-black italic uppercase tracking-tighter">Can't find what you need?</h3>
                 <p className="text-sm opacity-60 italic">Explore our full range of 20+ specialized cleaning services.</p>
              </div>
           </div>
           <Link to={'services'}><button className="btn btn-primary px-8 font-black italic uppercase tracking-widest rounded-2xl">
              Explore Full Menu
           </button></Link>
        </div>

      </div>
    </section>
  );
};

export default ServiceList;