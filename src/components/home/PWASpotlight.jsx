import { Smartphone, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import InstallPWA from "../InstallPWA";

const PWASpotlight = () => {
  return (
    <section className="px-4 md:px-12 max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-base-100 border border-base-300 rounded-[2rem] p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
        
        {/* Subtle Vertical Brand Accent */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-90"></div>

        {/* Left Side: Minimalist Icon Box */}
        <div className="hidden md:flex shrink-0 w-24 h-24 bg-primary/5 rounded-2xl items-center justify-center text-primary border border-primary/10">
          <Smartphone size={40} strokeWidth={1.5} />
        </div>

        {/* Middle: Text & Benefits */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="bg-primary text-white font-black italic text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
              App Available
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
              <Zap size={10} className="fill-current" />
              Direct Sync
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-3 leading-none">
            The <span className="text-primary">TCS</span> Mobile Hub
          </h2>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4">
             {[
               { icon: <Zap size={12}/>, text: "Instant Load" },
               { icon: <CheckCircle2 size={12}/>, text: "Offline Sync" },
               { icon: <ArrowRight size={12}/>, text: "1-Tap Access" }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                 <span className="text-primary">{item.icon}</span>
                 <span className="text-[10px] font-black opacity-60 uppercase tracking-wide">
                    {item.text}
                 </span>
               </div>
             ))}
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="w-full md:w-auto shrink-0 flex flex-col items-center gap-3">
          <div className="w-full min-w-[220px]">
             <InstallPWA />
          </div>
          <p className="text-[9px] font-black uppercase opacity-25 tracking-[0.3em]">
            iOS • Android • Desktop
          </p>
        </div>

        {/* Elegant Background Watermark */}
        <span className="absolute -bottom-2 -right-4 text-7xl font-black italic uppercase opacity-[0.03] pointer-events-none select-none -rotate-3">
          Digital
        </span>
      </div>
    </section>
  );
};

export default PWASpotlight;