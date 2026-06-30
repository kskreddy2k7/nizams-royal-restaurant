import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SignatureDish: React.FC = () => {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = pinSectionRef.current;
    const container = pinContainerRef.current;
    if (!section || !container) return;

    const steps = [step1Ref.current, step2Ref.current, step3Ref.current, step4Ref.current];

    // GSAP ScrollTrigger Timeline to handle text transitions
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: 0.8,
      }
    });

    // Make sure first step is visible initially
    gsap.set(steps[0], { opacity: 1, y: 0 });
    gsap.set(steps.slice(1), { opacity: 0, y: 40 });

    // Step 1 -> Step 2
    pinTl
      .to(steps[0], { opacity: 0, y: -40, duration: 1 })
      .to(steps[1], { opacity: 1, y: 0, duration: 1 }, '-=0.2')
      
      // Step 2 -> Step 3
      .to(steps[1], { opacity: 0, y: -40, duration: 1 }, '+=1')
      .to(steps[2], { opacity: 1, y: 0, duration: 1 }, '-=0.2')
      
      // Step 3 -> Step 4
      .to(steps[2], { opacity: 0, y: -40, duration: 1 }, '+=1')
      .to(steps[3], { opacity: 1, y: 0, duration: 1 }, '-=0.2')
      
      .to({}, { duration: 1 }); // buffer at the end

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <div ref={pinSectionRef} id="signature" className="relative w-full h-[400vh] bg-bg-dark z-10">
      {/* Pinned container wrapper */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen flex items-center justify-end relative overflow-hidden"
      >
        {/* Subtle radial background glow */}
        <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-copper/5 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Left panel (Empty for 3D Handi WebGL render) */}
          <div className="lg:col-span-7 h-48 lg:h-auto" />

          {/* Right panel (Dum Biryani Steps) */}
          <div className="lg:col-span-5 relative h-[380px] md:h-[450px] flex items-center">
            
            {/* Step 1: Rice */}
            <div
              ref={step1Ref}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-copper mb-4 font-semibold">
                THE ASSEMBLY • LAYER 01
              </span>
              <h3 className="text-3xl md:text-5xl font-serif tracking-wide mb-6">
                The Saffron Basmati
              </h3>
              <p className="text-sm md:text-lg text-warm-white/70 font-light leading-relaxed max-w-md">
                Parboiled, extra-long grain Basmati rice, infused with cinnamon sticks, cloves, and green cardamom, layered in fluffy, steam-trapping rows.
              </p>
            </div>

            {/* Step 2: Marinade */}
            <div
              ref={step2Ref}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-copper mb-4 font-semibold">
                THE ASSEMBLY • LAYER 02
              </span>
              <h3 className="text-3xl md:text-5xl font-serif tracking-wide mb-6">
                The Nizami Marinade
              </h3>
              <p className="text-sm md:text-lg text-warm-white/70 font-light leading-relaxed max-w-md">
                Tender cuts of grass-fed mutton, marinated for twelve hours in stone-churned yogurt, fresh mint, coriander, and our ancestral spice bouquet.
              </p>
            </div>

            {/* Step 3: Garnishes */}
            <div
              ref={step3Ref}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-copper mb-4 font-semibold">
                THE ASSEMBLY • LAYER 03
              </span>
              <h3 className="text-3xl md:text-5xl font-serif tracking-wide mb-6">
                Gilded Aromatics
              </h3>
              <p className="text-sm md:text-lg text-warm-white/70 font-light leading-relaxed max-w-md">
                Garnished with crisp golden fried onions (birista), fresh mint leaves, rose water drops, saffron threads, and warm cow ghee.
              </p>
            </div>

            {/* Step 4: Seal */}
            <div
              ref={step4Ref}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-copper mb-4 font-semibold">
                THE ASSEMBLY • LAYER 04
              </span>
              <h3 className="text-3xl md:text-5xl font-serif tracking-wide mb-6">
                The Clay Dum Seal
              </h3>
              <p className="text-sm md:text-lg text-warm-white/70 font-light leading-relaxed max-w-md">
                We seal the mouth of the brass handi with soft wheat dough. Slow-cooking under coal pressure allows the ingredients to fuse in their own juices.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default SignatureDish;
