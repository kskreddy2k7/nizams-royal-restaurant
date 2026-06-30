import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Mandala & Spark Particle Class
  class EmberSpark {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    size: number = 0;
    alpha: number = 0;
    life: number = 0;
    maxLife: number = 0;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.reset(canvasWidth, canvasHeight, true);
    }

    reset(canvasWidth: number, canvasHeight: number, initial = false) {
      this.x = canvasWidth / 2 + (Math.random() - 0.5) * 120;
      this.y = initial ? canvasHeight * 0.5 + Math.random() * canvasHeight * 0.4 : canvasHeight + 10;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = -0.8 - Math.random() * 1.8;
      this.size = 1.0 + Math.random() * 2.5;
      this.alpha = 0;
      this.maxLife = 120 + Math.random() * 120;
      this.life = initial ? Math.random() * this.maxLife : 0;
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;

      // Fade-in and fade-out
      if (this.life < 20) {
        this.alpha = (this.life / 20) * 0.6;
      } else {
        this.alpha = (1 - (this.life - 20) / (this.maxLife - 20)) * 0.6;
      }

      if (this.life >= this.maxLife || this.y < -10) {
        this.reset(canvasWidth, canvasHeight);
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 125, 85, ${this.alpha})`;
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: EmberSpark[] = [];
    let mandalaRotation = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 40 }, () => new EmberSpark(canvas.width, canvas.height));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Draw a decorative outline mandala on the canvas back
    const drawMandala = (cx: number, cy: number, radius: number, angle: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = 'rgba(200, 125, 85, 0.04)';
      ctx.lineWidth = 1.2;

      // Concentric circles
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
      ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      ctx.stroke();

      // Petal loops
      const petals = 12;
      for (let j = 0; j < 2; j++) {
        const r = radius * (j === 0 ? 0.8 : 0.45);
        ctx.beginPath();
        for (let i = 0; i < petals; i++) {
          const a = (i / petals) * Math.PI * 2;
          const x1 = Math.cos(a) * r;
          const y1 = Math.sin(a) * r;
          
          const aNext = ((i + 1) / petals) * Math.PI * 2;
          const x2 = Math.cos(aNext) * r;
          const y2 = Math.sin(aNext) * r;

          const cx1 = Math.cos(a + Math.PI/petals) * (r * 1.35);
          const cy1 = Math.sin(a + Math.PI/petals) * (r * 1.35);

          if (i === 0) ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(cx1, cy1, x2, y2);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background rotating mandala
      mandalaRotation += 0.0012;
      drawMandala(canvas.width / 2, canvas.height * 0.5, 220, mandalaRotation);
      drawMandala(canvas.width / 2, canvas.height * 0.5, 220, -mandalaRotation * 0.5);

      // Draw embers
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
    };
  }, []);

  // Handle progress counter and loading animation
  useEffect(() => {
    const obj = { val: 0 };
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger completion slide out
        const exitTl = gsap.timeline({
          onComplete: onComplete
        });

        // Split-reveal transition
        exitTl.to(logoRef.current, {
          letterSpacing: '1.4em',
          opacity: 0,
          scale: 1.08,
          duration: 1.6,
          ease: 'power3.inOut'
        });

        exitTl.to(percentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5
        }, '-=1.3');

        exitTl.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.5,
          ease: 'power4.inOut'
        }, '-=0.9');
      }
    });

    tl.to(obj, {
      val: 100,
      duration: 3.8,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      }
    });

    if (barRef.current) {
      tl.to(barRef.current, {
        scaleX: 1,
        duration: 3.8,
        ease: 'power2.out'
      }, 0);
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-bg-dark z-9999 flex flex-col items-center justify-between py-16"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Background Embers Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top Brand Tagline */}
      <div className="z-10 text-[10px] uppercase tracking-[0.3em] text-copper-light/60 font-semibold">
        NIZAM'S DAAWAT • EST. 1911
      </div>

      {/* Middle logo reveal */}
      <div className="z-10 flex flex-col items-center justify-center">
        {/* Ornate Mandala outline shape above text */}
        <div className="w-16 h-16 border border-copper/20 rounded-full flex items-center justify-center mb-6 animate-spin-slow">
          <div className="w-12 h-12 border border-dashed border-copper/10 rounded-full rotate-45" />
          <div className="absolute w-2 h-2 rounded-full bg-copper" />
        </div>

        <h1
          ref={logoRef}
          className="text-4xl md:text-7xl font-serif tracking-[0.45em] text-gold text-center uppercase pl-[0.45em]"
        >
          NIZAM
        </h1>
        <p className="text-xs tracking-[0.35em] uppercase text-warm-white/40 mt-4 font-light">
          The Royal Legacy of the Deccan
        </p>
      </div>

      {/* Bottom loading indicator */}
      <div className="z-10 flex flex-col items-center w-64 px-4">
        {/* Progress percent */}
        <div
          ref={percentRef}
          className="text-copper-light font-light tracking-[0.2em] text-sm mb-4 font-serif"
        >
          {String(progress).padStart(3, '0')}%
        </div>
        {/* Horizontal progress bar */}
        <div className="w-full h-[1px] bg-[#221715] relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute top-0 left-0 w-full h-full bg-copper origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
};
export default Preloader;
