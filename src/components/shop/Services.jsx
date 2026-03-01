import React from 'react';
import ServiceCard from '../clientservice/ServiceCard';

const Services = ({services,loading}) => {


  return (
    <section className="py-5 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 italic">Featured Services</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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