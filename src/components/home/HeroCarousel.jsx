import React, { useState, useEffect } from "react";
import CarouselCard from "./CarouselCard";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Crystal Clear Homes",
      description: "Professional residential cleaning tailored to your lifestyle.",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Spotless Offices",
      description: "Boost productivity with a clean and sanitized workspace.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Deep Cleaning Experts",
      description: "Going beyond the surface to ensure a healthy environment.",
      // NEW UNIQUE ACCESSIBLE IMAGE: High-detail professional sanitation
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=1600",
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [current]);


  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden mt-18">

      {/* Slides wrapper */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <CarouselCard
              title={slide.title}
              description={slide.description}
              image={slide.image}
              primaryBtnText="Get Started"
              secondaryBtnText="Our Services"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute flex justify-between w-full px-5 top-1/2 -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="btn btn-circle btn-ghost text-white text-2xl hover:bg-white/20"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="btn btn-circle btn-ghost text-white text-2xl hover:bg-white/20"
        >
          ❯
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${current === index
              ? "bg-white scale-125"
              : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
