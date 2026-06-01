import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

/**
 * MobileBottomDock — sticky CTA bar visible only on mobile.
 * Standard pattern from client-website-conventions.
 */
export const MobileBottomDock = () => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        borderTop: '2px solid var(--color-gold)',
        boxShadow: '0 -4px 24px oklch(0% 0 0 / 0.2)',
      }}
      id="mobile-bottom-dock"
    >
      <a
        href="tel:5555555555"
        className="flex-1 flex items-center justify-center gap-2 font-barlow font-bold uppercase py-4"
        style={{
          backgroundColor: 'var(--color-red)',
          color: 'white',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
        }}
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <a
        href="mailto:Info@domain.com"
        className="flex-1 flex items-center justify-center gap-2 font-barlow font-bold uppercase py-4"
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'white',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
        }}
      >
        <MessageSquare className="w-4 h-4" />
        Email Us
      </a>
    </div>
  );
};
