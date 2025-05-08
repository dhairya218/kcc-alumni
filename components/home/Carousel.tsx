"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Carousel items
const carouselItems = [
  {
    id: 1,
    title: "Welcome to Khodiyar Alumni Portal",
    description: "Connect with fellow alumni and stay updated on campus events",
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    buttonText: "Join Now",
    buttonLink: "/register",
  },
  {
    id: 2,
    title: "Annual Alumni Meet 2025",
    description: "Mark your calendars for the biggest alumni gathering of the year",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    buttonText: "Learn More",
    buttonLink: "/events",
  },
  {
    id: 3,
    title: "Alumni Mentorship Program",
    description: "Share your knowledge and experience with current students",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    buttonText: "Become a Mentor",
    buttonLink: "/dashboard",
  },
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  return (
    <div className="relative overflow-hidden">
      <div 
        className="w-full h-[500px] md:h-[600px] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex h-full">
          {carouselItems.map((item) => (
            <div 
              key={item.id} 
              className="min-w-full h-full relative"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">{item.title}</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl">{item.description}</p>
                <Button asChild size="lg" className="text-base px-8 rounded-full">
                  <a href={item.buttonLink}>{item.buttonText}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
        onClick={prevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}