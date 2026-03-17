import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact Form Data:", data);
    toast.success("Message sent! The TCS team will contact you shortly.");
    reset();
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6 md:px-12 pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-black italic text-primary uppercase tracking-tighter">
            Get In <span className="text-base-content">Touch</span>
          </h1>
          <p className="text-sm font-bold opacity-50 italic uppercase tracking-widest mt-2">
            Have a question? We have the cleaning solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Contact Details */}
          <div className="space-y-8">
            <div className="card bg-base-100 shadow-xl p-8 border-l-4 border-primary">
              <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2">
                <MessageSquare className="text-primary" size={24} /> Contact Info
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-50">Email Us</p>
                    <p className="font-bold">support@tcs.cleaning</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-50">Call Us</p>
                    <p className="font-bold">+1 (555) TCS-CLEAN</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-50">Operating Hours</p>
                    <p className="font-bold">Mon - Sat: 8am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Notice */}
            <div className="bg-primary p-8 rounded-3xl text-primary-content shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="font-black italic uppercase text-lg mb-2">Urgent Request?</h4>
                    <p className="text-sm font-medium opacity-90">
                        For immediate service adjustments to your cart or existing bookings, please use the admin chat or call our priority line.
                    </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                    <Send size={120} />
                </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl p-8 md:p-12 border border-base-300">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-black uppercase italic text-xs">Full Name</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className={`input input-bordered focus:outline-primary bg-base-200 font-bold ${errors.name ? 'input-error' : ''}`}
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-error text-[10px] font-bold mt-1 uppercase">{errors.name.message}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-black uppercase italic text-xs">Email Address</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className={`input input-bordered focus:outline-primary bg-base-200 font-bold ${errors.email ? 'input-error' : ''}`}
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                      })}
                    />
                    {errors.email && <span className="text-error text-[10px] font-bold mt-1 uppercase">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-black uppercase italic text-xs">Subject</span>
                  </label>
                  <select 
                    className="select select-bordered focus:outline-primary bg-base-200 font-bold uppercase text-xs w-full"
                    {...register("subject")}
                  >
                    <option>General Inquiry</option>
                    <option>Booking Modification</option>
                    <option>Commercial Partnerships</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-black uppercase italic text-xs">How can we help?</span>
                  </label>
                  <textarea 
                    className={`textarea textarea-bordered h-40 focus:outline-primary bg-base-200 font-bold ${errors.message ? 'textarea-error' : ''} w-full`}
                    placeholder="Tell us about your requirements..."
                    {...register("message", { required: "Message cannot be empty", minLength: { value: 10, message: "Tell us a bit more" } })}
                  ></textarea>
                  {errors.message && <span className="text-error text-[10px] font-bold mt-1 uppercase">{errors.message.message}</span>}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary w-full md:w-auto md:px-12 font-black italic uppercase tracking-widest group"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;