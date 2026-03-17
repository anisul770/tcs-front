import React from 'react';
import { useNavigate } from 'react-router';
import { Home, ShoppingBag, Search, Trash2, Wind } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        
        {/* Animated Icon Section */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative z-10 p-8 bg-base-100 rounded-full shadow-2xl border-4 border-primary/10">
            <Trash2 className="text-primary animate-bounce" size={80} strokeWidth={1.5} />
            <div className="absolute -right-2 -top-2 bg-error p-2 rounded-lg rotate-12 shadow-lg">
                <Search size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-black italic text-primary uppercase tracking-tighter opacity-10 absolute left-1/2 -translate-x-1/2 -translate-y-24 select-none">
          404
        </h1>

        <div className="relative z-20">
          <h2 className="text-4xl font-black italic uppercase text-base-content tracking-tighter mb-4">
            Page <span className="text-primary">Swept</span> Away
          </h2>
          <p className="text-sm font-bold opacity-60 uppercase tracking-widest leading-relaxed mb-10">
            We’ve cleaned every corner of the server, but the page you’re looking for seems to have disappeared. 
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="btn btn-primary btn-md md:btn-lg font-black italic uppercase tracking-widest gap-2 group"
            >
              <Home size={18} />
              Go Home
            </button>
            
            <button 
              onClick={() => navigate('/services')}
              className="btn btn-outline btn-md md:btn-lg font-black italic uppercase tracking-widest gap-2"
            >
              <ShoppingBag size={18} />
              Browse Services
            </button>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="mt-16 flex items-center justify-center gap-2 opacity-30">
            <Wind size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">TCS.Cleaning Engine v1.0</span>
        </div>

      </div>
    </div>
  );
};

export default NotFound;