import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial offscreen positions
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Interactive elements hovers
    const onMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      
      // Cursor style modifications
      gsap.to(ring, {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(197, 168, 128, 0.1)',
        borderColor: '#C5A880',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.2
      });

      // Special hover text labels
      if (target.getAttribute('data-cursor-text')) {
        setCursorText(target.getAttribute('data-cursor-text') || '');
        gsap.to(ring, { width: 80, height: 80, duration: 0.3 });
      }
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        width: 32,
        height: 32,
        backgroundColor: 'transparent',
        borderColor: 'rgba(197, 168, 128, 0.4)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2
      });
      setCursorText('');
    };

    // Attach event listeners to all interactive elements
    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], [data-cursor-hover]'
      );
      elements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    attachHoverListeners();

    // Re-bind when DOM changes
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
      
      const elements = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], [data-cursor-hover]'
      );
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Spring Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/40 pointer-events-none z-9999 flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      >
        {cursorText && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold whitespace-nowrap fade-in">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Direct Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-9999 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
    </>
  );
};
