import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="max-w-3xl mx-auto relative px-4">
      <div className="bg-charcoal rounded-[2rem] p-6 md:p-10 text-center relative overflow-hidden shadow-2xl shadow-black/20 border border-white/5">
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(219,39,119,0.1),transparent_50%)]"></div>
        <div className="absolute -top-4 -left-2 text-white/5 font-serif text-[8rem] leading-none select-none pointer-events-none">
          “
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < current.rating ? "#DB2777" : "none"} className={i < current.rating ? "text-primaryDark" : "text-gray-700"} />
                ))}
              </div>

              <p className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-6 font-medium italic">
                "{current.text}"
              </p>

              <div className="border-t border-white/10 pt-4 w-full max-w-[200px] mx-auto">
                <h4 className="font-bold font-sans text-base text-white">{current.name}</h4>
                <p className="text-xs text-pink-400 uppercase tracking-widest mt-1">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-2">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white hover:text-charcoal text-white flex items-center justify-center backdrop-blur-md transition-all pointer-events-auto">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white hover:text-charcoal text-white flex items-center justify-center backdrop-blur-md transition-all pointer-events-auto">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-pink-600' : 'w-1.5 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;