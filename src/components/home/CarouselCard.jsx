import { Link } from "react-router";
import { Sparkles, ArrowRight } from "lucide-react";

const CarouselCard = ({
  title,
  description,
  image,
  primaryBtnText,
  secondaryBtnText,
}) => {
  return (
    <div className="relative w-full h-full group overflow-hidden">
      
      {/* Background Image with Zoom Effect */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
      />

      {/* Modern Gradient Overlay (Darker on the left/bottom for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/30 lg:to-transparent"></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-start lg:items-start text-left text-white px-8 md:px-20 lg:px-32 max-w-5xl">
        
        {/* Animated Brand Badge */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in-down">
          <div className="bg-primary p-1.5 rounded-lg rotate-3 shadow-lg shadow-primary/30">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-content bg-primary px-3 py-1 rounded-full">
            Premium Service
          </span>
        </div>

        {/* The Bold Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? "text-primary block" : "block"}>
              {word}
            </span>
          ))}
        </h1>

        {/* Sophisticated Description */}
        <p className="max-w-xl mb-10 text-sm md:text-lg font-medium italic opacity-80 leading-relaxed border-l-2 border-primary pl-6">
          {description}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to={'/login'}>
            <button className="group/btn btn btn-primary btn-lg rounded-2xl px-10 font-black italic uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              {primaryBtnText}
              <ArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </Link>
          
          <Link to={'/services'}>
            <button className="btn btn-ghost btn-lg text-white border-white/20 hover:bg-white/10 backdrop-blur-sm rounded-2xl px-10 font-black italic uppercase tracking-widest border-2">
              {secondaryBtnText}
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="flex items-center gap-4 opacity-30 rotate-90 origin-right">
          <div className="h-[1px] w-24 bg-white"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
            Transparent Cleaning Standard
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;