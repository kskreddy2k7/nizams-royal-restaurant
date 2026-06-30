import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ChefStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgContainer = imageContainerRef.current;
    const img = imageRef.current;
    if (!imgContainer || !img) return;

    // Image reveal animation
    gsap.fromTo(imgContainer,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imgContainer,
          start: 'top 80%',
        }
      }
    );

    // Zoom-in effect on scroll
    gsap.fromTo(img,
      { scale: 1.25 },
      {
        scale: 1.0,
        scrollTrigger: {
          trigger: imgContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Text items animation
    const textChildren = textRef.current?.children;
    if (textChildren) {
      gsap.fromTo(Array.from(textChildren),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Timeline items reveal
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-node');
    if (timelineItems) {
      timelineItems.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === imgContainer || t.vars.trigger === textRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  const milestones = [
    {
      year: '1985',
      title: 'Old Gharana Mentorship',
      desc: 'Mastered woodfire dum cooking, spice chemistry, and stone-grinding ratios under royal family Ustads in Old Hyderabad.'
    },
    {
      year: '2002',
      title: 'The Royal Falaknuma Palace',
      desc: 'Appointed Grand Chef of Royal Nizam Cuisine, restoring lost banquet recipes for state delegates and global royalty.'
    },
    {
      year: '2024',
      title: 'Nizam\'s Daawat Concept',
      desc: 'Founded Nizam\'s Daawat to align ancestral clay pot cooking with modern cinematic sensory theater.'
    }
  ];

  return (
    <section
      ref={containerRef}
      id="chef"
      className="relative w-full min-h-screen section-padding bg-[#0A0A0A] z-10 overflow-hidden border-t border-charcoal"
    >
      {/* Accent Background Glow */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Chef Image Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={imageContainerRef}
            className="w-full max-w-[480px] aspect-[3/4] bg-charcoal overflow-hidden border border-copper/10 relative"
          >
            <img
              ref={imageRef}
              src="chef_portrait.png"
              alt="Ustad Chef Yusuf Ali"
              className="w-full h-full object-cover object-center filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
            {/* Corner Decorative Borders */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-copper/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-copper/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-copper/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-copper/40" />
          </div>
        </div>

        {/* Right Side: Narrative Timeline */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div ref={textRef}>
            <span className="text-xs uppercase tracking-[0.3em] text-copper mb-6 font-semibold block">
              02 • THE MASTER
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight mb-8">
              Ustad Chef <br />
              Yusuf Ali
            </h2>
            <p className="text-sm md:text-base text-warm-white/70 font-light leading-relaxed max-w-xl mb-12">
              "We do not cook to simply satisfy hunger; we create culinary architecture to connect generations. Slow-cooking under dum is a balance of heat, moisture, and time."
            </p>
          </div>

          {/* Milestone timeline */}
          <div ref={timelineRef} className="relative pl-8 border-l border-charcoal space-y-12">
            {milestones.map((item, idx) => (
              <div key={idx} className="timeline-node relative">
                {/* Copper bullet point dot */}
                <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-bg-dark border border-copper flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-copper" />
                </div>
                
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-copper font-serif block mb-1">
                  {item.year}
                </span>
                <h4 className="text-lg md:text-xl font-serif text-warm-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-warm-white/50 leading-relaxed font-light max-w-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
export default ChefStory;
