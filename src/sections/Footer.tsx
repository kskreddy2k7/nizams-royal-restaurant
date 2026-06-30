import React from 'react';
import { Mail, Phone, MapPin, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="location" className="relative w-full bg-bg-dark text-warm-white border-t border-charcoal pt-20 pb-10 z-10 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
        {/* Column 1: Contact Details */}
        <div className="lg:col-span-4 text-left flex flex-col justify-between h-full space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-serif tracking-[0.25em] text-copper uppercase mb-6">
              NIZAM'S DAAWAT
            </h3>
            <p className="text-xs uppercase tracking-widest text-warm-white/40 leading-loose max-w-sm font-light">
              Restoring the royal culinary legacy of the Deccan. A slow-cooked sensory journey near the heritage paths of Charminar.
            </p>
          </div>

          <div className="space-y-4 text-xs font-light tracking-wide text-warm-white/70">
            <div className="flex gap-3 items-center">
              <MapPin size={14} className="text-copper" />
              <span>Chowmahalla Palace Rd, Khilwat, Hyderabad, Telangana, India</span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={14} className="text-copper" />
              <span>+91 40 2345 6789</span>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={14} className="text-copper" />
              <span>royal@nizamsdaawat.com</span>
            </div>
          </div>

          {/* WhatsApp Direct Chat Button */}
          <div className="pt-2">
            <a
              href="https://wa.me/914023456789"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-950/10 hover:bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 transition-all rounded-sm text-xs uppercase tracking-widest font-semibold cursor-none"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.66.986 3.285 1.503 4.908 1.504 5.548 0 10.061-4.512 10.063-10.058.002-2.687-1.043-5.212-2.94-7.11C16.772 1.593 14.25 1.547 12.012 1.547c-5.55 0-10.067 4.512-10.069 10.062-.001 1.763.479 3.484 1.392 5.018L2.313 21.69l5.068-1.328-1.066.666-.668-.874z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Column 2: Hours & Operations */}
        <div className="lg:col-span-3 text-left space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-copper font-semibold block mb-4">
              FEASTING HOURS
            </span>
            <div className="space-y-4 text-xs font-light text-warm-white/60 tracking-wider">
              <div>
                <p className="text-warm-white font-medium mb-1">Tuesday – Sunday</p>
                <p>19:00 — 23:30 (Dinner only)</p>
              </div>
              <div>
                <p className="text-warm-white font-medium mb-1">Mondays</p>
                <p className="text-copper/50">Palace Chambers Closed</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-copper font-semibold block mb-3">
              ROYAL ATTIRE
            </span>
            <p className="text-xs font-light text-warm-white/50 leading-relaxed max-w-xs">
              Traditional royal Indian wear or smart formal attire. We request that gentlemen wear closed shoes.
            </p>
          </div>
        </div>

        {/* Column 3: Custom Vector Location Map (Hyderabad Charminar Region) */}
        <div className="lg:col-span-5 flex flex-col items-start w-full">
          <span className="text-[10px] uppercase tracking-[0.25em] text-copper font-semibold block mb-4 text-left">
            THE GEOMETRY OF PLACE
          </span>
          <div className="relative w-full aspect-[4/3] bg-bg-dark/50 border border-charcoal rounded-sm p-4 overflow-hidden flex flex-col justify-between">
            {/* Custom SVG coordinates map of Hyderabad Charminar & Chowmahalla Palace region */}
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 w-full h-full opacity-35 select-none pointer-events-none"
            >
              {/* Circular wall of the historical Nizam fort boundaries */}
              <circle cx="200" cy="150" r="130" fill="none" stroke="rgba(200, 125, 85, 0.04)" strokeWidth="1" />
              
              {/* Radial street vectors radiating from Charminar */}
              <line x1="200" y1="90" x2="200" y2="290" stroke="rgba(200, 125, 85, 0.08)" strokeWidth="1.5" />
              <line x1="10" y1="150" x2="390" y2="150" stroke="rgba(200, 125, 85, 0.08)" strokeWidth="1.5" />
              
              {/* Charminar intersection arches layout */}
              <rect x="180" y="70" width="40" height="40" rx="4" fill="none" stroke="rgba(200, 125, 85, 0.25)" strokeWidth="1.5" />
              <circle cx="185" cy="75" r="3" fill="rgba(200, 125, 85, 0.2)" />
              <circle cx="215" cy="75" r="3" fill="rgba(200, 125, 85, 0.2)" />
              <circle cx="185" cy="105" r="3" fill="rgba(200, 125, 85, 0.2)" />
              <circle cx="215" cy="105" r="3" fill="rgba(200, 125, 85, 0.2)" />
              <text x="200" y="93" fill="rgba(200, 125, 85, 0.4)" fontSize="8" fontWeight="bold" textAnchor="middle">CHARMINAR</text>

              {/* Chowmahalla Palace Road */}
              <path d="M 200 110 Q 180 180 160 210" fill="none" stroke="rgba(200, 125, 85, 0.12)" strokeWidth="2.5" />

              {/* Pinpoint Location (Nizam's Daawat at Chowmahalla Palace Road) */}
              <circle cx="160" cy="210" r="6" fill="#C87D55" className="animate-pulse-slow" />
              <circle cx="160" cy="210" r="12" fill="none" stroke="#C87D55" strokeWidth="1" strokeOpacity="0.5" />
            </svg>

            {/* Top Coordinate overlay */}
            <div className="z-10 flex justify-between items-center text-[10px] font-mono text-warm-white/40 tracking-wider">
              <span className="flex items-center gap-1"><Compass size={10} className="text-copper" /> N 17° 21' 22.3"</span>
              <span>E 78° 28' 14.5"</span>
            </div>

            {/* Bottom Address label */}
            <div className="z-10 text-left bg-bg-dark/80 backdrop-blur-sm p-3 border border-charcoal max-w-[220px]">
              <span className="text-[9px] uppercase tracking-widest text-copper block font-semibold mb-0.5">
                DAAWAT SITE
              </span>
              <p className="text-[10px] text-warm-white/60 leading-normal font-light">
                Chowmahalla Palace Rd, Khilwat, Hyderabad, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-10 border-t border-charcoal/50 flex flex-col sm:flex-row justify-between items-center text-[10px] text-warm-white/30 tracking-widest gap-6">
        <div>
          © {new Date().getFullYear()} NIZAM'S DAAWAT CO. ALL RIGHTS RESERVED.
        </div>
        
        <div>
          <a
            href="#hero"
            onClick={handleScrollToTop}
            className="hover:text-copper transition-colors uppercase font-medium cursor-none"
          >
            Ascend to Summit ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
