import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Locations', href: '#locations' },
  { label: 'Area', href: '#service-area' },
  { label: 'Financing', href: '#financing' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Texas Flag Top Stripe */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 51,
          display: 'flex',
          height: '4px',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(35% 0.18 260)' }} />
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(98% 0.005 100)' }} />
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(42% 0.22 22)' }} />
      </div>

      <nav
        id="main-nav"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: '4px', /* offset below flag stripe */
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'var(--color-navy)',
          borderBottom: isScrolled ? '2px solid var(--color-gold)' : '2px solid transparent',
          boxShadow: isScrolled ? '0 4px 24px oklch(0% 0 0 / 0.25)' : 'none',
          padding: isScrolled ? '0.5rem 0' : '0.9rem 0',
          transition: 'padding 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms, box-shadow 300ms',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo variant="white" />

          {/* Desktop Nav */}
          <div
            className="hidden md:flex items-center gap-7"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.73rem' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors duration-200"
                style={{ position: 'relative' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="tel:9563210400"
            id="nav-cta"
            className="hidden md:flex items-center gap-2 btn-primary"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.78rem' }}
          >
            <Phone className="w-3.5 h-3.5" />
            (956) 321-0400
          </a>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden text-white p-2 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ transition: 'opacity 150ms' }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backgroundColor: 'var(--color-navy)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.75rem',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Texas flag stripe across mobile menu top */}
        <div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', display: 'flex' }}
          aria-hidden="true"
        >
          <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(35% 0.18 260)' }} />
          <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(98% 0.005 100)' }} />
          <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(42% 0.22 22)' }} />
        </div>

        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              color: 'white',
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 350ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, transform 350ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms`,
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="tel:9563210400"
          onClick={() => setMobileOpen(false)}
          className="btn-primary mt-4"
          style={{ fontSize: '1rem' }}
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>
    </>
  );
};
