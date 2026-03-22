import { Sparkles, Smartphone, Zap } from "lucide-react";
import InstallPWA from "../InstallPWA";

const PWASpotlight = () => {
  return (
    <section className="px-4 py-12 md:px-12">
      <div className="relative overflow-hidden bg-base-200 border border-base-300 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 rounded-full"></div>
        
        <div className="flex flex-col gap-4 text-center md:text-left max-w-xl">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Smartphone size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">
              Next-Gen Experience
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">
            Take <span className="text-primary">TCS</span> Everywhere
          </h2>
          
          <p className="text-sm font-bold opacity-60 leading-relaxed">
            Install our official app for instant bookings, real-time updates, and a lightning-fast <span className="italic">TCS Bold</span> interface. No App Store required.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 bg-base-100 p-8 rounded-[2rem] shadow-xl border border-base-200 w-full md:w-auto min-w-[280px]">
          <div className="flex gap-4 mb-2">
            <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Zap size={18} />
                </div>
                <span className="text-[8px] font-black uppercase opacity-40">Fast</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles size={18} />
                </div>
                <span className="text-[8px] font-black uppercase opacity-40">Premium</span>
            </div>
          </div>
          
          {/* Your Install Button Component */}
          <div className="w-full">
             <InstallPWA />
          </div>
          
          <p className="text-[9px] font-bold opacity-40 text-center uppercase tracking-widest">
            Works on iOS, Android & Desktop
          </p>
        </div>
      </div>
    </section>
  );
};

export default PWASpotlight;