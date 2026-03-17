import { Link, useParams } from "react-router";
import ServiceInfo from "./ServiceInfo";
import ServicePricingCard from "./ServicePricingCard";
import ServiceReviews from "./ServiceReviews"; 
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ErrorAlert from "../ErrorAlert";

// Skeleton Helper Component
const ServicePageSkeleton = () => (
  <div className="min-h-screen bg-base-100 pt-24 pb-20 animate-pulse">
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-base-300 rounded w-48 mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-96 bg-base-300 rounded-2xl w-full"></div> {/* Image area */}
          <div className="h-10 bg-base-300 rounded w-3/4"></div> {/* Title */}
          <div className="space-y-3">
            <div className="h-4 bg-base-200 rounded w-full"></div>
            <div className="h-4 bg-base-200 rounded w-full"></div>
            <div className="h-4 bg-base-200 rounded w-2/3"></div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-1">
          <div className="h-[450px] bg-base-300 rounded-3xl w-full shadow-xl"></div> {/* Card area */}
        </div>
      </div>
    </div>
  </div>
);

const Service = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { serviceId } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/services/${serviceId}`);
        setService(res.data);
      } catch (error) {
        setError(error.response);
      } finally {
        setLoading(false);
      }
    };
    getInfo();
  }, [serviceId]);

  const demoService = {
    id: 1,
    name: "Premium Deep Home Cleaning",
    category: { name: "Deep Clean" },
    price: 199.99,
    avg_rating: 4.8,
    order_count: 342,
    description: "Our Premium Deep Home Cleaning service is designed for homes that need a thorough, top-to-bottom reset...",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    features: [
      "Dusting of all surfaces",
      "Deep scrubbing of bathrooms",
      "Vacuuming and mopping of all floors",
      "100% Eco-friendly, pet-safe products used"
    ]
  };

  // UPDATED: Swap spinner for the custom skeleton layout
  if (loading) return <ServicePageSkeleton />;

  if (!service) return <div className="text-center py-20">Service not found.</div>;

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {error && <ErrorAlert error={error} />}
        
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs text-gray-500 mb-6">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><span className="text-primary font-medium">{service.name}</span></li>
          </ul>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN: Data-driven Info */}
          <div className="lg:col-span-2">
            <ServiceInfo demoService={demoService} service={service} />

            {/* THE REVIEWS COMPONENT */}
            <div className="pt-12">
              <h3 className="text-2xl font-bold mb-6 italic uppercase tracking-tighter text-base-content">
                Client <span className="text-primary">Reviews</span>
              </h3>
              <ServiceReviews serviceId={serviceId} />
            </div>
          </div>

          {/* RIGHT COLUMN: Checkout Card */}
          <div className="lg:col-span-1">
            <ServicePricingCard price={service.price} service={service} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Service;