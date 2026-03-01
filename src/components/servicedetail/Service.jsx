import { Link, useParams } from "react-router";
import ServiceInfo from "./ServiceInfo";
import ServicePricingCard from "./ServicePricingCard";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ErrorAlert from "../ErrorAlert";

const Service = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { serviceId } = useParams();
  
  // MOCK DATA (We will swap this for an API call later)
  
  useEffect(() => {
    const getInfo = async() => {
      setLoading(true);
      try{
        const res = await apiClient.get(`/services/${serviceId}`);
        console.log(res.data);
        setService(res.data)
      }catch(error){
        setError(error.response);
      }finally{setLoading(false);}
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!service) return <div className="text-center py-20">Service not found.</div>;

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {error && <ErrorAlert error={error} />}
          {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs text-gray-500 mb-6">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Services</Link></li>
            <li><span className="text-primary font-medium">{service.name}</span></li>
          </ul>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN: Data-driven Info */}
          <div className="lg:col-span-2">
            <ServiceInfo demoService={demoService} service={service} />
            
            {/* You can drop the Reviews component right here later! */}
            <div className="pt-12">
               <h3 className="text-2xl font-bold mb-6 italic">Client Reviews</h3>
               <div className="p-10 border-2 border-dashed border-base-300 rounded-3xl text-center text-gray-400">
                 [ Review Component Goes Here ]
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Checkout Card */}
          <div className="lg:col-span-1">
            <ServicePricingCard price={service.price} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Service;