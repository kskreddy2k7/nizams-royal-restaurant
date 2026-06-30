import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  source: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "A true culinary time-machine. Tasting Chef Yusuf's slow-cooked Dum Biryani takes you straight to the royal banquets of the Hyderabadi Nizams. The spice balance is absolute poetry.",
    author: "Aditi Rao",
    role: "Lead Gastronomy Critic",
    source: "Times of India Food Guide"
  },
  {
    quote: "The Ghee Roast Dosa is paper-thin and melts like butter, while the saffron aroma in the air is unforgettable. Authentic brass bells and visual details make this India's finest.",
    author: "Vikram Malhotra",
    role: "Travel & Lifestyle Editor",
    source: "Condé Nast Traveller India"
  },
  {
    quote: "Nizam's Daawat merges traditional woodsmoke and clay tandoor methods with high-end, modern architectural design. An absolute masterpiece of heritage dining.",
    author: "Chef Rajeev Brar",
    role: "3-Star Michelin Proprietor",
    source: "Food & Wine India"
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center section-padding bg-bg-dark z-10 overflow-hidden border-t border-charcoal">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full text-center relative z-10">
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full border border-copper/20 flex items-center justify-center text-copper animate-pulse-slow">
            <Quote size={20} />
          </div>
        </div>

        {/* Text Container with Slide Animations */}
        <div className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center overflow-hidden mb-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              <blockquote className="text-xl md:text-3xl font-serif font-light leading-relaxed text-warm-white/90 max-w-3xl italic">
                "{TESTIMONIALS[currentIndex].quote}"
              </blockquote>
              
              <div className="mt-8 flex flex-col items-center">
                <span className="text-sm font-serif text-copper tracking-wide font-medium">
                  {TESTIMONIALS[currentIndex].author}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 mt-1">
                  {TESTIMONIALS[currentIndex].role} — <span className="text-copper/55">{TESTIMONIALS[currentIndex].source}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-charcoal hover:border-copper/30 text-warm-white/50 hover:text-copper flex items-center justify-center transition-all cursor-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Progress Indicators */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-[3px] rounded-full transition-all duration-300 cursor-none ${
                  currentIndex === idx ? 'w-8 bg-copper' : 'w-2 bg-charcoal hover:bg-copper/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-charcoal hover:border-copper/30 text-warm-white/50 hover:text-copper flex items-center justify-center transition-all cursor-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
