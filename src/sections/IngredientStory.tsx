import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPICE_CARDS = [
  {
    name: 'Kashmiri Saffron',
    detail: 'Hand-harvested from the valleys of Pampore, each strand infuses our biryanis with its signature golden hue.',
    icon: '🌸',
  },
  {
    name: 'Malabar Black Pepper',
    detail: 'Sun-dried on bamboo mats, these bold peppercorns carry the heat of the Western Ghats.',
    icon: '⚫',
  },
  {
    name: 'Coorg Green Cardamom',
    detail: 'Whole pods roasted and cracked moments before use, releasing intense aromatic oils.',
    icon: '🫛',
  },
  {
    name: 'Star Anise & Cinnamon',
    detail: 'Layered into our slow-cooked gravies for a warming, sweet depth that defines Deccani cuisine.',
    icon: '⭐',
  },
];

export const IngredientStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    // Text Reveal Animation
    const chars = textEl.querySelectorAll('.reveal-char');
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: textEl,
        start: 'top 85%',
        end: 'bottom 50%',
        scrub: 0.5,
      }
    });

    textTl.fromTo(chars, 
      { opacity: 0.1, y: 10 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 1 }
    );

    // Image parallax
    if (imageRef.current) {
      gsap.to(imageRef.current.querySelector('img'), {
        y: -60,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // Cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.spice-card');
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === textEl || t.vars.trigger === containerRef.current || t.vars.trigger === imageRef.current || t.vars.trigger === cardsRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  // Split text helper to create reveal items
  const renderRevealText = (text: string) => {
    return text.split(' ').map((word, wIdx) => (
      <span key={wIdx} className="inline-block mr-3 whitespace-nowrap">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="reveal-char inline-block opacity-10">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full min-h-screen flex items-center justify-center section-padding z-10 overflow-hidden border-t border-charcoal"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-saffron/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-maroon/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Top Row: Image + Text side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          
          {/* Left: Large Image with overlay */}
          <div ref={imageRef} className="relative overflow-hidden rounded-sm group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="spices-hero.png"
                alt="Traditional Tandoor Fire Cooking"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
              {/* Gold border accent */}
              <div className="absolute inset-3 border border-gold/15 rounded-sm pointer-events-none" />
            </div>
            {/* Floating label */}
            <div className="absolute bottom-8 left-8 z-10">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold/70 bg-bg-dark/70 backdrop-blur-sm px-3 py-1.5 border border-gold/15 rounded-sm">
                Heritage Kitchen • Est. 1911
              </span>
            </div>
          </div>

          {/* Right: Text Story */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-copper-light mb-6 font-semibold block">
              01 • THE ALCHEMY OF SPICE
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight mb-8 text-warm-white">
              The Legend of <br />
              <span className="copper-gradient-text">Deccan Spices</span>
            </h2>
            
            <div
              ref={textRef}
              className="text-lg md:text-xl font-serif font-light text-warm-white/80 leading-relaxed max-w-xl select-none mb-8"
            >
              {renderRevealText("We believe that fine dining is a tribute to heritage. Our kitchens roast whole pods, grind fresh masalas daily, and balance cooking fire to release the essential oils of cardamom, star anise, and cinnamon. Saffron from Kashmir, black gold pepper from Malabar, and cardamom from Coorg find their alignment here.")}
            </div>

            <div className="h-[1px] bg-copper/10 w-full mb-8" />

            <p className="text-xs uppercase tracking-[0.25em] text-warm-white/40 leading-loose max-w-md">
              All masalas are ground by hand using traditional stone mortar-pestles to retain natural oil structures.
            </p>
          </div>
        </div>

        {/* Bottom Row: 4 Spice Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {SPICE_CARDS.map((spice, idx) => (
            <div
              key={idx}
              className="spice-card group p-6 bg-charcoal/30 border border-charcoal hover:border-gold/30 rounded-sm transition-all duration-500 cursor-default"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{spice.icon}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{spice.name}</span>
              </div>
              <p className="text-xs text-warm-white/50 leading-relaxed font-light group-hover:text-warm-white/70 transition-colors duration-300">
                {spice.detail}
              </p>
              {/* Decorative bottom line */}
              <div className="h-[1px] bg-gold/0 group-hover:bg-gold/20 transition-all duration-500 mt-5 w-0 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default IngredientStory;
