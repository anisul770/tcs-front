import { Link } from "react-router";
import AddToCartButton from "./AddToCartButton";

const ServiceCard = ({ service }) => {
  return (

    <div className="flex bg-base-100 rounded-2xl overflow-hidden shadow-sm border border-base-300 hover:shadow-lg transition-shadow">
      {/* Price Section */}
      <div className="bg-primary text-primary-content w-28 flex flex-col items-center justify-center font-bold">
        <span className="text-[10px] uppercase opacity-70">Price</span>
        <span className="text-xl">${service.price}</span>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-grow">
        <Link to={`/services/${service.id}`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg leading-tight">{service.name}</h4>
              <div className="flex flex-col mt-5 gap-2">
                <span className="text-[10px] bg-base-200 px-2 py-1 rounded-md uppercase font-semibold text-gray-500">
                  {service.category.name}
                </span>
                <span>{service.description}</span>
              </div>
            </div>
            <div className="flex items-center text-orange-400 gap-1">
              <span className="text-sm font-bold">{service.avg_rating}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </Link>
        <div className="card-actions justify-end mt-4">
          <AddToCartButton serviceId={service.id} />
        </div>
      </div>
    </div>

  );
};

export default ServiceCard;