import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const ServiceSpotlight = () => {
  return (
    <section className="py-24 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* --- LEFT SIDE: THE VISUAL --- */}
          <div className="lg:w-1/2 relative group">
            {/* Background Decorative "Glow" */}
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
            
            {/* The Main Image with Rigid Branding */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-[12px] border-base-200 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                alt="Professional Cleaning"
                className="w-full h-[500px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating "Experience" Badge */}
              <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-base-200 animate-bounce-slow">
                <div className="bg-primary p-3 rounded-xl text-white">
                    <Zap size={24} fill="currentColor" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Established</p>
                    <p className="text-xl font-black italic uppercase tracking-tighter">10+ Years</p>
                </div>
              </div>
            </div>

            {/* Abstract Shape Overlay */}
            <div className="absolute -top-10 -left-10 w-32 h-32 border-[16px] border-primary/10 rounded-full -z-0"></div>
          </div>

          {/* --- RIGHT SIDE: THE CONTENT --- */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Signature Standard</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black italic text-base-content uppercase tracking-tighter leading-tight">
              The <span className="text-primary">Transparent</span> <br /> 
              Difference
            </h2>

            <p className="text-base-content/60 text-lg font-medium italic leading-relaxed max-w-xl">
              We don't just clean; we restore. Using industrial-grade 
              HEPA technology and non-toxic chemistry, we deliver a 
              standard that is visible, verifiable, and total.
            </p>
            
            {/* Icon-Based Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { text: "Vetted Professionals", icon: <ShieldCheck className="text-primary" size={20}/> },
                { text: "Verifiable Checklists", icon: <CheckCircle2 className="text-primary" size={20}/> },
                { text: "Eco-Safe Chemistry", icon: <Zap className="text-primary" size={20}/> },
                { text: "Premium Equipment", icon: <Sparkles className="text-primary" size={20}/> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                  {item.icon}
                  <span className="font-black italic uppercase text-[11px] tracking-widest">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button className="group btn btn-primary btn-lg rounded-2xl px-10 font-black italic uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Check Availability 
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSpotlight;