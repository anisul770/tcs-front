import React from 'react';

const Features = () => {
  const featureList = [
    {
      title: "Vetted Professionals",
      desc: "Every cleaner undergoes a strict background check and 2-week training.",
      icon: "🛡️"
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden fees or surprise surcharges. What you see is what you pay.",
      icon: "💰"
    },
    {
      title: "Eco-Friendly Tech",
      desc: "We use non-toxic, pet-safe supplies and high-efficiency equipment.",
      icon: "🌿"
    },
    {
      title: "Seamless Booking",
      desc: "Manage your appointments and payments through our easy-to-use portal.",
      icon: "📱"
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The TCS Standard</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We are redefining the cleaning industry through transparency, 
            technology, and top-tier talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featureList.map((f, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;