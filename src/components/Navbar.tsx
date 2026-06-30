import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Signature', href: '#signature' },
    { name: 'Chef Story', href: '#chef' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reserve', href: '#reservation' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 glass-nav'
            : 'py-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="text-lg md:text-xl font-serif tracking-[0.3em] uppercase text-gold hover:text-gold-light transition-colors relative z-50"
          >
            N I Z A M
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] font-medium text-warm-white/70 hover:text-gold transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-luxury" />
              </a>
            ))}
          </div>

          {/* Action Call to Action Button */}
          <div className="hidden lg:block">
            <a
              href="#reservation"
              onClick={(e) => handleLinkClick(e, '#reservation')}
              className="px-6 py-2.5 text-xs uppercase tracking-widest text-bg-dark bg-gold hover:bg-gold-light transition-all rounded-sm flex items-center gap-2 font-semibold duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Book Table <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-gold-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-luxury -z-0" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gold hover:text-gold-light focus:outline-none relative z-50 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            exit={{ opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-screen bg-bg-dark z-40 flex flex-col justify-between p-12 pt-32"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

            <div className="flex flex-col space-y-6 md:space-y-8 max-w-lg">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.08, duration: 0.6, ease: 'easeOut' }}
                  key={link.name}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-4xl md:text-5xl font-serif text-warm-white hover:text-gold transition-colors block uppercase tracking-wide"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-between border-t border-charcoal pt-8 text-xs text-warm-white/40 tracking-wider gap-4"
            >
              <div>
                <p className="text-gold font-medium mb-1">RESERVATIONS</p>
                <p>+91 40 2345 6789</p>
              </div>
              <div>
                <p className="text-gold font-medium mb-1">HOURS</p>
                <p>Tue – Sun: 19:00 – 23:30</p>
              </div>
              <div>
                <p className="text-gold font-medium mb-1">LOCATION</p>
                <p>Chowmahalla Palace Rd, Hyderabad, India</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
