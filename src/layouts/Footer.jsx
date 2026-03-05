import React from 'react';
import { useForm } from 'react-hook-form';
import { Facebook, Twitter, Instagram, Linkedin, Send, Sparkles, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubscribe = (data) => {
    console.log("Newsletter Subscription:", data);
    toast.success("Welcome to the inner circle! Check your email.");
    reset();
  };

  return (
    <footer className="bg-base-100 text-base-content border-t border-base-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl rotate-3">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                Transparent <span className="text-primary">Cleaning</span>
              </h2>
            </div>
            <p className="text-sm text-base-content/60 font-medium leading-relaxed max-w-xs">
              Redefining trust in the cleaning industry through total transparency and premium service.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2 bg-base-200 rounded-lg hover:bg-primary hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-base-200 rounded-lg hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-base-200 rounded-lg hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-base-200 rounded-lg hover:bg-primary hover:text-white transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h6 className="font-black italic uppercase text-primary tracking-widest text-xs mb-6">Services</h6>
            <nav className="flex flex-col gap-3">
              {["Residential Cleaning", "Office Cleaning", "Deep Cleaning", "Window Washing"].map((item) => (
                <a key={item} className="link link-hover text-sm font-bold opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Company Section */}
          <div>
            <h6 className="font-black italic uppercase text-primary tracking-widest text-xs mb-6">Company</h6>
            <nav className="flex flex-col gap-3">
              {["About Us", "Contact", "Reviews", "Terms of Service"].map((item) => (
                <a key={item} className="link link-hover text-sm font-bold opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter Section with React Hook Form */}
          <div>
            <h6 className="font-black italic uppercase text-primary tracking-widest text-xs mb-6">Newsletter</h6>
            <p className="text-xs font-bold text-base-content/50 mb-4">Get the latest cleaning tips & offers.</p>
            <form onSubmit={handleSubmit(onSubscribe)} className="flex flex-col gap-2">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="email@example.com" 
                  className={`input input-bordered w-full rounded-xl focus:outline-primary font-bold text-sm ${errors.email ? 'border-error' : ''}`}
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
                  })}
                />
                <button type="submit" className="absolute right-2 top-1.5 btn btn-primary btn-sm rounded-lg">
                  <Send size={14} />
                </button>
              </div>
              {errors.email && <span className="text-[10px] text-error font-black uppercase px-2">{errors.email.message}</span>}
            </form>
            <div className="mt-4 flex items-center gap-2 opacity-40">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-tighter">Your data is secure</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-base-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            © 2026 Transparent Cleaning Co. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
            <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Privacy</a>
            <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Cookies</a>
            <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;