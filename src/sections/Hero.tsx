import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);

  // Magnetic Button Effect Helper
  const setupMagneticButton = (btn: HTMLElement) => {
    const onMouseMove = (e: MouseEvent) => {
      const bound = btn.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;
      
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  };

  useEffect(() => {
    // Intro animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });

      tl.fromTo(titleRef.current, 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
      )
      .fromTo(dividerRef.current, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut' }, 
        '-=0.8'
      )
      .fromTo(subtitleRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 
        '-=0.6'
      )
      .fromTo(btnGroupRef.current, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 
        '-=0.8'
      );
    }, containerRef);

    // Bind magnetic buttons
    const btns = btnGroupRef.current?.querySelectorAll('.magnetic-btn');
    const cleanups: (() => void)[] = [];
    if (btns) {
      btns.forEach((btn) => {
        const cleanup = setupMagneticButton(btn as HTMLElement);
        cleanups.push(cleanup);
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center px-6 py-20 z-10 overflow-hidden"
    >
      {/* Hero Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.88) saturate(1.25) contrast(1.05)' }}
        >
          <source src="vedio.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/55 via-[#0A0A0A]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-[#0A0A0A]/15 to-[#0A0A0A]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(10,10,10,0.65)_0%,rgba(10,10,10,0.25)_50%,transparent_80%)]" />
      </div>

      {/* Spacer to push content center */}
      <div className="h-10" />

      {/* Hero Headings */}
      <div className="relative max-w-4xl flex flex-col items-center select-none px-8 py-10 md:px-16 md:py-14">
        <div
          className="absolute inset-0 -z-10 rounded-sm bg-black/25 backdrop-blur-[2px] border border-white/5"
          aria-hidden
        />

        <h1
          ref={titleRef}
          className="hero-title text-5xl md:text-8xl lg:text-[10rem] font-serif font-normal tracking-[0.25em] leading-none uppercase text-gold-light"
        >
          NIZAM
        </h1>
        
        {/* Subtle Horizontal Divider Line */}
        <div
          ref={dividerRef}
          className="w-40 md:w-80 h-[1px] bg-gold-light/60 my-6 md:my-8 origin-center shadow-[0_0_12px_rgba(0,0,0,0.8)]"
        />

        <p
          ref={subtitleRef}
          className="hero-subtitle text-sm md:text-lg tracking-[0.35em] uppercase text-cream font-normal max-w-2xl leading-relaxed"
        >
          THE ROYAL CULINARY LEGACY OF THE DECCAN
        </p>
      </div>

      {/* Action Buttons & Scroll Indicator */}
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        <div ref={btnGroupRef} className="flex flex-col sm:flex-row gap-6 w-full justify-center px-4">
          <a
            href="#reservation"
            onClick={(e) => handleScrollTo(e, '#reservation')}
            className="magnetic-btn px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] bg-copper hover:bg-copper-light text-bg-dark transition-colors rounded-sm flex items-center justify-center gap-2"
          >
            Book Royal Feast
          </a>
          <a
            href="#signature"
            onClick={(e) => handleScrollTo(e, '#signature')}
            className="magnetic-btn px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-gold-light/40 hover:border-gold-light text-cream hover:text-gold-light transition-colors rounded-sm flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            data-cursor-text="DISCOVER"
          >
            Explore Menu
          </a>
        </div>

        {/* Floating Scroll Icon */}
        <a
          href="#experience"
          onClick={(e) => handleScrollTo(e, '#experience')}
          className="group flex flex-col items-center gap-3 text-cream/80 hover:text-gold-light transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-light">Scroll to Begin</span>
          <div className="w-8 h-8 rounded-full border border-cream/30 group-hover:border-gold-light/50 flex items-center justify-center transition-all duration-500 shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </div>
        </a>
      </div>
    </section>
  );
};
export default Hero;
