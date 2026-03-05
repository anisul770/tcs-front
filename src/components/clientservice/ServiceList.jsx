import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import apiClient from '../../services/api-client';

const ServiceList = () => {
  // Mapping to your API service definition
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient.get("/services/?ordering=-avg_rating")
      .then((res) => setServices(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <div className="text-error text-center py-10">Failed to load services.</div>;

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 italic">Featured Services</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              (i < 4) && <ServiceCard
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

export default ServiceList;