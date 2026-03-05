import { Link } from "react-router";
import { Star, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

const ServiceCard = ({ service }) => {
  return (
    <div className="group relative bg-base-100 rounded-[2rem] p-1.5 border border-base-200 hover:border-primary/40 transition-all duration-500 hover:shadow-xl flex flex-col h-full overflow-hidden max-w-sm">
      
      {/* --- CONDENSED VISUAL AREA --- */}
      <div className="relative h-32 w-full bg-base-200 rounded-[1.6rem] overflow-hidden">
        {/* Subtle Brand Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none p-2">
            <Zap className="w-full h-full rotate-12" />
        </div>
        
        {/* Badges - Smaller & Sleeker */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[8px] font-black uppercase tracking-widest rounded-full shadow-sm">
            {service.category.name}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full text-white">
          <span className="text-[9px] font-black italic">{service.avg_rating}</span>
          <Star size={8} className="fill-warning text-warning" />
        </div>

        {/* Floating Price Tag - Scaled Down */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-primary text-primary-content px-4 py-1.5 rounded-xl rotate-[-2deg] shadow-lg group-hover:rotate-0 transition-transform duration-500">
                <span className="text-[8px] font-black uppercase block leading-none opacity-80 text-center">From</span>
                <span className="text-xl font-black italic tracking-tighter">${service.price}</span>
            </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/services/${service.id}`} className="flex-grow">
            <h4 className="text-lg font-black italic uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {service.name}
            </h4>
          </Link>
          <Link to={`/services/${service.id}`} className="p-1.5 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-primary-content transition-all ml-2">
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <p className="text-xs font-medium text-base-content/60 italic leading-relaxed mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* --- FOOTER AREA --- */}
        <div className="mt-auto pt-4 border-t border-dashed border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-success/80 tracking-widest">
            <ShieldCheck size={12} /> Verified
          </div>
          
          <div className="transform scale-90 origin-right transition-transform duration-300 group-hover:scale-100">
            <AddToCartButton serviceId={service.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;