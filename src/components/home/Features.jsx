import React from 'react';
import { ShieldCheck, CircleDollarSign, Leaf, AppWindow, Sparkles } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      title: "Vetted Professionals",
      desc: "Every cleaner undergoes a strict background check and 2-week training.",
      icon: <ShieldCheck size={32} />,
      step: "01"
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden fees or surprise surcharges. What you see is what you pay.",
      icon: <CircleDollarSign size={32} />,
      step: "02"
    },
    {
      title: "Eco-Friendly Tech",
      desc: "We use non-toxic, pet-safe supplies and high-efficiency equipment.",
      icon: <Leaf size={32} />,
      step: "03"
    },
    {
      title: "Seamless Booking",
      desc: "Manage your appointments and payments through our easy-to-use portal.",
      icon: <AppWindow size={32} />,
      step: "04"
    }
  ];

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Brand Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[25vw] font-black italic uppercase">QUALITY</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-[10px] mb-4">
            <Sparkles size={14} /> Our Core Values
          </div>
          <h2 className="text-5xl md:text-6xl font-black italic text-base-content uppercase tracking-tighter leading-none">
            The <span className="text-primary">TCS</span> Standard
          </h2>
          <div className="h-1.5 w-24 bg-primary mt-6 rounded-full"></div>
          <p className="mt-8 text-base-content/60 font-medium italic max-w-2xl text-lg leading-relaxed">
            Redefining the cleaning industry through total transparency, 
            cutting-edge technology, and top-tier professional talent.
          </p>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((f, index) => (
            <div key={index} className="group relative p-8 bg-base-200/30 rounded-[2.5rem] border border-transparent hover:border-primary/20 hover:bg-base-100 transition-all duration-500 shadow-sm hover:shadow-xl">
              
              {/* Step Number Overlay */}
              <span className="absolute top-6 right-8 text-4xl font-black italic opacity-5 group-hover:opacity-10 transition-opacity">
                {f.step}
              </span>

              {/* Icon Container */}
              <div className="w-16 h-16 bg-primary text-primary-content rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-primary/20">
                {f.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-sm font-medium text-base-content/50 leading-relaxed italic">
                {f.desc}
              </p>

              {/* Bottom Decorative Bar */}
              <div className="w-0 group-hover:w-full h-1 bg-primary mt-6 transition-all duration-500 rounded-full opacity-30"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;