import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  size: 'large' | 'medium' | 'small';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'dining',
    src: 'restaurant_interior.png',
    title: 'The Nizami Chamber',
    subtitle: 'Royal Architecture',
    size: 'large',
  },
  {
    id: 'plating',
    src: 'signature_dish.png',
    title: 'The Dum Assembly',
    subtitle: 'Saffron & Spice Plating',
    size: 'medium',
  },
  {
    id: 'kitchen',
    src: 'kitchen_fire.png',
    title: 'The Tandoor Hearth',
    subtitle: 'Live Fire Clay Cooking',
    size: 'medium',
  },
  {
    id: 'chef-action',
    src: 'chef_portrait.png',
    title: 'Ustad Yusuf Ali',
    subtitle: 'The Culinary Director',
    size: 'small',
  }
];

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.gallery-item');
    if (!items) return;

    items.forEach((item) => {
      const img = item.querySelector('.gallery-img');
      if (!img) return;

      // Parallax effect on scroll
      gsap.fromTo(img,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (containerRef.current?.contains(t.vars.trigger as Node)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative w-full min-h-screen section-padding bg-bg-dark z-10 overflow-hidden border-t border-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-copper mb-6 font-semibold block">
            04 • THE GALLERY
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight uppercase">
            Nizami Chronicles
          </h2>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
          {/* Item 1: Dining Room (Large) */}
          <div
            onClick={() => setActivePhoto(GALLERY_ITEMS[0])}
            className="gallery-item lg:col-span-7 aspect-[4/3] bg-charcoal border border-copper/10 overflow-hidden relative cursor-none group select-none"
            data-cursor-text="EXPAND"
          >
            <img
              src={GALLERY_ITEMS[0].src}
              alt={GALLERY_ITEMS[0].title}
              className="gallery-img absolute inset-0 w-full h-[124%] -top-[12%] object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[10px] uppercase tracking-widest text-copper block mb-1">
                {GALLERY_ITEMS[0].subtitle}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-warm-white">
                {GALLERY_ITEMS[0].title}
              </h3>
            </div>
            <Maximize2 size={16} className="absolute top-6 right-6 text-warm-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Item 2: Plating Detail (Medium) */}
          <div
            onClick={() => setActivePhoto(GALLERY_ITEMS[1])}
            className="gallery-item lg:col-span-5 aspect-[4/5] bg-charcoal border border-copper/10 overflow-hidden relative cursor-none group select-none"
            data-cursor-text="EXPAND"
          >
            <img
              src={GALLERY_ITEMS[1].src}
              alt={GALLERY_ITEMS[1].title}
              className="gallery-img absolute inset-0 w-full h-[124%] -top-[12%] object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[10px] uppercase tracking-widest text-copper block mb-1">
                {GALLERY_ITEMS[1].subtitle}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-warm-white">
                {GALLERY_ITEMS[1].title}
              </h3>
            </div>
            <Maximize2 size={16} className="absolute top-6 right-6 text-warm-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Item 3: Kitchen Fire (Medium) */}
          <div
            onClick={() => setActivePhoto(GALLERY_ITEMS[2])}
            className="gallery-item lg:col-span-5 aspect-[1/1] bg-charcoal border border-copper/10 overflow-hidden relative cursor-none group select-none"
            data-cursor-text="EXPAND"
          >
            <img
              src={GALLERY_ITEMS[2].src}
              alt={GALLERY_ITEMS[2].title}
              className="gallery-img absolute inset-0 w-full h-[124%] -top-[12%] object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[10px] uppercase tracking-widest text-copper block mb-1">
                {GALLERY_ITEMS[2].subtitle}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-warm-white">
                {GALLERY_ITEMS[2].title}
              </h3>
            </div>
            <Maximize2 size={16} className="absolute top-6 right-6 text-warm-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Item 4: Chef Portrait (Small) */}
          <div
            onClick={() => setActivePhoto(GALLERY_ITEMS[3])}
            className="gallery-item lg:col-span-7 aspect-[16/9] bg-charcoal border border-copper/10 overflow-hidden relative cursor-none group select-none"
            data-cursor-text="EXPAND"
          >
            <img
              src={GALLERY_ITEMS[3].src}
              alt={GALLERY_ITEMS[3].title}
              className="gallery-img absolute inset-0 w-full h-[124%] -top-[12%] object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-[10px] uppercase tracking-widest text-copper block mb-1">
                {GALLERY_ITEMS[3].subtitle}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-warm-white">
                {GALLERY_ITEMS[3].title}
              </h3>
            </div>
            <Maximize2 size={16} className="absolute top-6 right-6 text-warm-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center p-6 bg-bg-dark/98 backdrop-blur-md">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-8 right-8 text-warm-white/40 hover:text-copper cursor-none p-3 border border-charcoal hover:border-copper/30 rounded-full transition-all"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-5xl w-full aspect-[16/10] overflow-hidden border border-charcoal bg-black flex items-center justify-center"
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-8 left-8 text-left bg-bg-dark/70 backdrop-blur-md p-6 border border-charcoal">
                <span className="text-xs uppercase tracking-widest text-copper block mb-1">
                  {activePhoto.subtitle}
                </span>
                <h3 className="text-2xl font-serif text-warm-white">
                  {activePhoto.title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Gallery;
