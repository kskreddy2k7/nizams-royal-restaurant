import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const KitchenScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Spark Particle Class for Tandoor Coals
  class EmberParticle {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    size: number = 0;
    alpha: number = 0;
    life: number = 0;
    maxLife: number = 0;
    wobbleSpeed: number = 0;
    wobbleAmount: number = 0;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.reset(canvasWidth, canvasHeight, true);
    }

    reset(canvasWidth: number, canvasHeight: number, initial = false) {
      this.x = Math.random() * canvasWidth;
      this.y = initial ? Math.random() * canvasHeight : canvasHeight + 10;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = -1.2 - Math.random() * 2.8;
      this.size = 1.0 + Math.random() * 3.8;
      this.alpha = 0;
      this.maxLife = 100 + Math.random() * 150;
      this.life = initial ? Math.random() * this.maxLife : 0;
      this.wobbleSpeed = 0.02 + Math.random() * 0.05;
      this.wobbleAmount = 0.2 + Math.random() * 0.8;
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.life * this.wobbleSpeed) * this.wobbleAmount;
      this.life++;

      // Fade-in and fade-out based on life stage
      if (this.life < 20) {
        this.alpha = this.life / 20;
      } else {
        this.alpha = 1 - (this.life - 20) / (this.maxLife - 20);
      }

      if (this.life >= this.maxLife || this.y < -10) {
        this.reset(canvasWidth, canvasHeight);
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235, 140, 60, ${this.alpha * 0.6})`;
      ctx.shadowBlur = this.size * 2.5;
      ctx.shadowColor = '#eb8c3c';
      ctx.fill();
    }
  }

  useEffect(() => {
    // Parallax on background image
    const bgImage = bgImageRef.current;
    if (bgImage) {
      gsap.fromTo(bgImage,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }

    // Text Reveal
    const textChildren = textRef.current?.children;
    if (textChildren) {
      gsap.fromTo(Array.from(textChildren),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Canvas Sparks setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: EmberParticle[] = [];
    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      particles = Array.from({ length: 60 }, () => new EmberParticle(canvas.width, canvas.height));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // reset
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current || t.vars.trigger === textRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center z-10 overflow-hidden border-t border-charcoal"
    >
      {/* Background Image Container (Parallax) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          ref={bgImageRef}
          src="kitchen_fire.png"
          alt="Clay Tandoor Cooking"
          className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover filter brightness-[0.24] contrast-105"
        />
      </div>

      {/* Spark Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="max-w-4xl mx-auto px-6 md:px-12 w-full text-center relative z-20"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-copper mb-6 font-semibold block">
          05 • THE ALCHEMY OF HEARTH
        </span>
        <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight mb-8">
          The Sacred Tandoor, <br />
          Woodsmoke & Ghee
        </h2>
        <div className="w-16 h-[1px] bg-copper/40 mx-auto mb-8" />
        <p className="text-sm md:text-xl text-warm-white/70 font-serif italic max-w-xl mx-auto font-light leading-relaxed">
          "Under the intense white heat of clay walls and embers, raw dough transforms into royal bread, and spice-marinated proteins lock in their essential juices."
        </p>
      </div>
    </section>
  );
};
export default KitchenScene;
