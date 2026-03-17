import React from 'react';
import { Sparkles, Rocket, ShieldCheck, Target, Heart, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-6 md:px-12 pt-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 bg-primary/10 rounded-2xl mb-4">
            <Sparkles className="text-primary" size={32} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic text-primary uppercase tracking-tighter mb-4">
            TCS.<span className="text-base-content">Cleaning</span>
          </h1>
          <p className="text-xl font-bold opacity-70 italic uppercase tracking-widest">
            Redefining the standard of professional care.
          </p>
        </div>

        {/* The Grid: What & Why */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* What is the Project? */}
          <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden group">
            <div className="h-2 bg-primary"></div>
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary" size={28} />
                <h2 className="text-2xl font-black italic uppercase tracking-tight">The Vision</h2>
              </div>
              <p className="text-base-content/80 leading-relaxed font-medium">
                TCS.Cleaning is a premium, full-stack service marketplace designed to bridge the gap between 
                top-tier cleaning professionals and clients who value quality and efficiency. 
                We’ve built a platform that treats a cleaning service not just as a task, but as a 
                seamlessly managed asset through our custom-built digital ecosystem.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="badge badge-outline font-bold uppercase text-[10px]">Real-time Booking</div>
                <div className="badge badge-outline font-bold uppercase text-[10px]">Verified Reviews</div>
              </div>
            </div>
          </div>

          {/* Why was it Built? */}
          <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden group">
            <div className="h-2 bg-base-content"></div>
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-primary" size={28} />
                <h2 className="text-2xl font-black italic uppercase tracking-tight">The Origin</h2>
              </div>
              <p className="text-base-content/80 leading-relaxed font-medium">
                The traditional service industry is often bogged down by slow communication and manual 
                scheduling. We built TCS.Cleaning to solve this by implementing a "Cart-first" 
                architecture—allowing for instant booking, transparent pricing, and automated administrative 
                oversight to eliminate the friction between discovery and a clean space.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="badge badge-primary font-bold uppercase text-[10px]">Tech-First Logic</div>
                <div className="badge badge-primary font-bold uppercase text-[10px]">User-Centric UX</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values / Features Strip */}
        <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300">
          <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-50">
            Engineered For Excellence
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary" size={24} />
              </div>
              <h4 className="font-black italic uppercase text-sm mb-2">Trust Secured</h4>
              <p className="text-xs opacity-60 px-4">Role-based access and JWT protection for every user.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="text-primary" size={24} />
              </div>
              <h4 className="font-black italic uppercase text-sm mb-2">Modern Stack</h4>
              <p className="text-xs opacity-60 px-4">Built with React and Django for high-speed performance.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="text-primary" size={24} />
              </div>
              <h4 className="font-black italic uppercase text-sm mb-2">Detail Driven</h4>
              <p className="text-xs opacity-60 px-4">Focused on the nuances that make a service feel premium.</p>
            </div>

          </div>
        </div>

        {/* Bottom CTA or Signature */}
        <div className="mt-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest opacity-30 italic">
            Developed with precision by the TCS.Cleaning Team
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;