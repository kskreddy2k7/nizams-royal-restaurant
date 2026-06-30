import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SIGNATURE_DISHES = [
  {
    name: 'Hyderabadi Dum Biryani',
    tagline: 'The Crown Jewel of Nizami Cuisine',
    description: 'Aged basmati rice layered with slow-cooked mutton, saffron milk, and 22 hand-ground spices. Sealed with dough and slow-cooked over charcoal for 4 hours in a copper handi.',
    price: '₹749',
    image: 'biryani-hero.png',
    badge: 'Chef\'s Masterpiece',
    prepTime: '4 Hours Dum',
    serves: 'Serves 2',
  },
  {
    name: 'Haleem-e-Nizam',
    tagline: 'A Ramadan Legacy Since 1911',
    description: 'Seven varieties of grain, slow-simmered with hand-pounded mutton for 12 hours until silken. Finished with ghee, fried onions, fresh mint, and a squeeze of lime.',
    price: '₹499',
    image: 'haleem.png',
    badge: 'Heritage Recipe',
    prepTime: '12 Hours Slow',
    serves: 'Serves 1',
  },
  {
    name: 'Royal Kebab Platter',
    tagline: 'Fire-Kissed Perfection',
    description: 'A curated selection of Seekh, Shami, Galouti, and Reshmi kebabs. Each marinated in our secret spice blends and grilled over mesquite charcoal in a traditional tandoor.',
    price: '₹899',
    image: 'mains.png',
    badge: 'Tandoor Special',
    prepTime: 'Live Grill',
    serves: 'Serves 4',
  },
];

export const SignatureDish: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const isDragging = useRef(false);
  const isAnimatingRef = useRef(false);
  const slideDirectionRef = useRef<'next' | 'prev'>('next');
  const isFirstRender = useRef(true);

  const dish = SIGNATURE_DISHES[activeIndex];

  const getDirection = (from: number, to: number): 'next' | 'prev' => {
    const forward = (to - from + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length;
    const backward = (from - to + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length;
    return forward <= backward ? 'next' : 'prev';
  };

  const goToIndex = useCallback((newIndex: number, forcedDirection?: 'prev' | 'next') => {
    if (isAnimatingRef.current || newIndex === activeIndex) return;

    const direction = forcedDirection ?? getDirection(activeIndex, newIndex);
    slideDirectionRef.current = direction;
    const slideOut = direction === 'next' ? -80 : 80;

    isAnimatingRef.current = true;

    gsap.to([imageContainerRef.current, textContainerRef.current], {
      opacity: 0,
      x: slideOut,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setActiveIndex(newIndex),
    });
  }, [activeIndex]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % SIGNATURE_DISHES.length
      : (activeIndex - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length;
    goToIndex(newIndex, direction);
  }, [activeIndex, goToIndex]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const slideIn = slideDirectionRef.current === 'next' ? 80 : -80;

    gsap.fromTo(
      [imageContainerRef.current, textContainerRef.current],
      { opacity: 0, x: slideIn },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power3.out',
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      }
    );
  }, [activeIndex]);

  const handleDragStart = (clientX: number) => {
    if (isAnimatingRef.current) return;
    isDragging.current = true;
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || isAnimatingRef.current) return;
    dragDeltaX.current = clientX - dragStartX.current;

    const damped = dragDeltaX.current * 0.35;
    gsap.set([imageContainerRef.current, textContainerRef.current], {
      x: damped,
      opacity: 1 - Math.min(Math.abs(damped) / 200, 0.35),
    });
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 60;
    if (dragDeltaX.current < -threshold) {
      gsap.set([imageContainerRef.current, textContainerRef.current], { x: 0, opacity: 1 });
      navigate('next');
    } else if (dragDeltaX.current > threshold) {
      gsap.set([imageContainerRef.current, textContainerRef.current], { x: 0, opacity: 1 });
      navigate('prev');
    } else {
      gsap.to([imageContainerRef.current, textContainerRef.current], {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
    dragDeltaX.current = 0;
  };

  useEffect(() => {
    const area = swipeAreaRef.current;
    if (!area) return;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;
      area.setPointerCapture(e.pointerId);
      handleDragStart(e.clientX);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      handleDragMove(e.clientX);
    };
    const onPointerUp = () => handleDragEnd();

    area.addEventListener('pointerdown', onPointerDown);
    area.addEventListener('pointermove', onPointerMove);
    area.addEventListener('pointerup', onPointerUp);
    area.addEventListener('pointercancel', onPointerUp);

    return () => {
      area.removeEventListener('pointerdown', onPointerDown);
      area.removeEventListener('pointermove', onPointerMove);
      area.removeEventListener('pointerup', onPointerUp);
      area.removeEventListener('pointercancel', onPointerUp);
    };
  }, [navigate]);

  // Section entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signature"
      className="relative w-full min-h-screen flex items-center justify-center section-padding z-10 overflow-hidden border-t border-charcoal"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-saffron/4 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-maroon/8 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-copper-light mb-4 font-semibold block">
            02 • SIGNATURE COLLECTION
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-wide leading-tight text-warm-white">
            Dishes That Define <br />
            <span className="copper-gradient-text">Our Legacy</span>
          </h2>
        </div>

        {/* Main Content Grid — swipe / drag enabled */}
        <div
          ref={swipeAreaRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center touch-pan-y cursor-grab active:cursor-grabbing select-none"
        >
          {/* Left: Image Showcase */}
          <div ref={imageContainerRef} className="relative group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 to-transparent" />
              {/* Gold inner border */}
              <div className="absolute inset-3 border border-gold/10 rounded-sm pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="text-[8px] uppercase tracking-[0.3em] text-gold bg-bg-dark/80 backdrop-blur-sm px-3 py-1.5 border border-gold/20 rounded-sm font-bold">
                  {dish.badge}
                </span>
              </div>

              {/* Price tag */}
              <div className="absolute bottom-6 right-6 z-10">
                <span className="text-2xl md:text-3xl font-serif font-bold text-gold drop-shadow-lg">
                  {dish.price}
                </span>
              </div>
            </div>

          </div>

          {/* Right: Text Details */}
          <div ref={textContainerRef} className="flex flex-col justify-center lg:pl-4">
            {/* Dish counter */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl md:text-7xl font-serif font-light text-gold/20">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className="h-[1px] w-12 bg-gold/20" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-white/40">
                of {String(SIGNATURE_DISHES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Dish name */}
            <h3 className="text-3xl md:text-5xl font-serif tracking-wide text-warm-white mb-3 leading-tight">
              {dish.name}
            </h3>

            {/* Tagline */}
            <span className="text-xs uppercase tracking-[0.25em] text-copper font-semibold mb-6 block">
              {dish.tagline}
            </span>

            {/* Description */}
            <p className="text-sm md:text-base text-warm-white/60 font-light leading-relaxed max-w-lg mb-8">
              {dish.description}
            </p>

            {/* Meta info chips */}
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[9px] uppercase tracking-[0.2em] text-warm-white/50 bg-charcoal/50 border border-charcoal px-3 py-1.5 rounded-sm">
                ⏱ {dish.prepTime}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-warm-white/50 bg-charcoal/50 border border-charcoal px-3 py-1.5 rounded-sm">
                🍽 {dish.serves}
              </span>
            </div>

            {/* Dish name tabs */}
            <div className="flex flex-col gap-0 mb-8 border-l border-charcoal">
              {SIGNATURE_DISHES.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => goToIndex(idx)}
                  className={`group flex items-center gap-4 py-3 pl-5 text-left transition-all duration-500 border-l-2 -ml-px ${
                    idx === activeIndex
                      ? 'border-gold text-gold'
                      : 'border-transparent text-warm-white/30 hover:text-warm-white/60 hover:border-gold/25'
                  }`}
                  aria-label={`View ${item.name}`}
                  aria-current={idx === activeIndex ? 'true' : undefined}
                >
                  <span className="text-[9px] font-mono tracking-widest opacity-50">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm md:text-base font-serif tracking-wide truncate">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Progress rail navigation */}
            <div className="space-y-5">
              <div className="relative flex items-center gap-3">
                {SIGNATURE_DISHES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToIndex(idx)}
                    className="relative flex-1 h-10 group"
                    aria-label={`Go to dish ${idx + 1}`}
                  >
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-charcoal overflow-hidden">
                      <div
                        className={`h-full bg-gold transition-all duration-700 ease-out ${
                          idx < activeIndex
                            ? 'w-full'
                            : idx === activeIndex
                              ? 'w-full animate-pulse-slow'
                              : 'w-0'
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-500 ${
                        idx === activeIndex
                          ? 'border-gold bg-gold scale-125 shadow-[0_0_12px_rgba(197,168,128,0.5)]'
                          : idx < activeIndex
                            ? 'border-gold/60 bg-gold/40'
                            : 'border-charcoal bg-bg-dark group-hover:border-gold/30'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate('prev')}
                  className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 hover:text-gold transition-colors duration-300"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-warm-white/25">
                  <span className="relative flex h-[1px] w-8 overflow-hidden bg-charcoal">
                    <span className="absolute inset-y-0 left-0 w-3 bg-gold/60 animate-[slideHint_1.8s_ease-in-out_infinite]" />
                  </span>
                  Drag to Browse
                  <span className="relative flex h-[1px] w-8 overflow-hidden bg-charcoal">
                    <span className="absolute inset-y-0 right-0 w-3 bg-gold/60 animate-[slideHint_1.8s_ease-in-out_infinite_reverse]" />
                  </span>
                </div>

                <button
                  onClick={() => navigate('next')}
                  className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 hover:text-gold transition-colors duration-300"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignatureDish;
