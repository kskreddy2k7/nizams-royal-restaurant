import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IngredientStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const floatingGroupRef = useRef<HTMLDivElement>(null);

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

    // Parallax on floating elements
    const floaters = floatingGroupRef.current?.querySelectorAll('.floater');
    if (floaters) {
      floaters.forEach((floater, idx) => {
        const speed = (idx + 1) * 60;
        gsap.to(floater, {
          y: -speed,
          rotation: speed * 0.25,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === textEl || t.vars.trigger === containerRef.current) {
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
      className="relative w-full min-h-screen flex items-center justify-start section-padding z-10 overflow-hidden"
    >
      {/* Floating 2D Parallax Elements (Spices) */}
      <div ref={floatingGroupRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Cardamom pod outline */}
        <div
          className="floater absolute top-[15%] right-[10%] w-24 h-24 rounded-br-[100px] rounded-tl-[100px] border border-copper/15 rotate-12 flex items-center justify-center opacity-30"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="w-16 h-16 rounded-br-[70px] rounded-tl-[70px] border border-copper/10" />
        </div>
        
        {/* Star Anise outline */}
        <div
          className="floater absolute bottom-[20%] left-[5%] w-32 h-32 rounded-full border border-copper/10 border-dashed opacity-25 flex items-center justify-center"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="w-12 h-12 border border-copper/20 rotate-45" />
          <div className="absolute w-12 h-12 border border-copper/10 -rotate-45" />
        </div>

        {/* Small drifting pepper grain */}
        <div
          className="floater absolute top-[45%] right-[35%] w-4 h-4 rounded-full bg-copper/10 blur-[1px] opacity-40"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />

        {/* Decorative Mandala Circle */}
        <div
          className="floater absolute bottom-[10%] right-[20%] w-48 h-48 rounded-full border border-copper/5 opacity-20"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left spacing for WebGL canvas alignment */}
        <div className="hidden lg:block lg:col-span-6" />

        {/* Text Story panel */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-copper-light mb-6 font-semibold block">
            01 • THE ALCHEMY OF SPICE
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight mb-8">
            The Legend of <br />
            Deccan Spices
          </h2>
          
          <div
            ref={textRef}
            className="text-lg md:text-2xl font-serif font-light text-warm-white/90 leading-relaxed max-w-xl select-none"
          >
            {renderRevealText("We believe that fine dining is a tribute to heritage. Our kitchens roast whole pods, grind fresh masalas daily, and balance cooking fire to release the essential oils of cardamom, star anise, and cinnamon. Saffron from Kashmir, black gold pepper from Malabar, and cardamom from Coorg find their alignment here.")}
          </div>

          <div className="h-[1px] bg-copper/10 w-full my-8" />

          <p className="text-xs uppercase tracking-[0.25em] text-warm-white/40 leading-loose max-w-md">
            All masalas are ground by hand using traditional stone mortar-pestles to retain natural oil structures.
          </p>
        </div>
      </div>
    </section>
  );
};
export default IngredientStory;
