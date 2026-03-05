import {
  Home, Briefcase, Sparkles, Wind, Droplets, Hammer, Trash2, ShieldCheck, Search,
  Refrigerator, LayoutGrid, Truck, Shirt
} from 'lucide-react';
import { Link } from 'react-router';

const CategoryCard = ({ name,id, service_count }) => {
  // Logic to assign a cool icon based on the name
  const getIcon = (catName) => {
    const lowerName = catName.toLowerCase();
    if (lowerName.includes('home') || lowerName.includes('residen')) return <Home size={32} />;
    if (lowerName.includes('office') || lowerName.includes('commer')) return <Briefcase size={32} />;
    if (lowerName.includes('deep')) return <Sparkles size={32} />;
    if (lowerName.includes('water') || lowerName.includes('pool')) return <Droplets size={32} />;
    if (lowerName.includes('repair')) return <Hammer size={32} />;
    if (lowerName.includes('waste') || lowerName.includes('junk')) return <Trash2 size={32} />;
    if (lowerName.includes('sanit')) return <ShieldCheck size={32} />;
    if (lowerName.includes('kitchen') || lowerName.includes('appliance')) return <Refrigerator size={32} />;
    if (lowerName.includes('window') || lowerName.includes('glass')) return <LayoutGrid size={32} />;
    if (lowerName.includes('move')) return <Truck size={32} />;
    if (lowerName.includes('laundry') || lowerName.includes('linen')) return <Shirt size={32} />;
    // Default fallback
    return <Search size={32} />;
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-base-100 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-base-200">
      {/* Decorative Background Blur Circle */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-12 group-hover:bg-primary group-hover:text-white">
          {getIcon(name)}
        </div>

        {/* Text Content */}
        <h3 className="mb-1 text-lg font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
          {name}
        </h3>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">
          {service_count || 0} Specialties
        </p>

        {/* Hover Arrow Indicator */}
        <div className="mt-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link to={`/services/?category=${id}`}><span className="text-xs font-bold text-primary flex items-center gap-1">
            Explore <span className="text-lg">→</span>
          </span></Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;