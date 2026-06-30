import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Components
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';


// Import Sections
import { Hero } from './sections/Hero';
import { IngredientStory } from './sections/IngredientStory';
import { SignatureDish } from './sections/SignatureDish';

import { ChefStory } from './sections/ChefStory';
import { Menu } from './sections/Menu';
import { Gallery } from './sections/Gallery';
import { Testimonials } from './sections/Testimonials';
import { KitchenScene } from './sections/KitchenScene';
import { Reservation } from './sections/Reservation';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Hook GSAP ScrollTrigger to update on scroll frame ticks
  useEffect(() => {
    // Refresh scroll triggers when content changes or is loaded
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [isLoading]);

  return (
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {/* 1. Immersive Preloader Screen */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main app wrapper (hidden during initial preloading for cleaner reveals) */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        
        {/* 2. Custom Dual Cursor (hidden on mobile/touch interfaces automatically) */}
        <CustomCursor />

        {/* 3. Global Subtle Grain Overlay (Awwwards texture look) */}
        <div className="noise-bg" />



        {/* 5. Floating Glass Header */}
        <Navbar />

        {/* 6. Page Content (Z-indexed above fixed WebGL canvas) */}
        <main className="relative z-10">
          <Hero />
          <IngredientStory />
          <SignatureDish />
          <ChefStory />
          <Menu />
          <Gallery />
          <Testimonials />
          <KitchenScene />
          <Reservation />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  );
};

export default App;
