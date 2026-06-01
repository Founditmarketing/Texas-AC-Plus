import React, { useRef } from 'react';
import { useCursorParallax } from '../hooks/useCursorParallax';
import { useReveal } from '../hooks/useReveal';

const CITIES = [
  'McAllen', 'Edinburg', 'Mission', 'Pharr', 'San Juan',
  'Weslaco', 'Harlingen', 'Mercedes', 'Alamo', 'Donna',
  'Elsa', 'Palmview', 'Sullivan City', 'Roma', 'Rio Grande City',
  'Progreso', 'La Joya', 'Penitas', 'Hidalgo', 'Sharyland',
];

/* Cities with dedicated location pages */
const CITY_LINKS: Record<string, string> = {
  McAllen: '#locations/mcallen',
  Edinburg: '#locations/edinburg',
  Harlingen: '#locations/harlingen',
  Mission: '#locations/mission',
  Weslaco: '#locations/weslaco',
  Pharr: '#locations/pharr',
};

export const ServiceArea = () => {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useReveal(ref, 50, 0.08);
  useCursorParallax(ref as React.RefObject<HTMLElement | null>, bgRef as React.RefObject<HTMLElement | null>, 0.015);

  return (
    <section
      id="service-area"
      className="relative overflow-hidden"
      ref={ref}
      style={{ paddingTop: '7rem', paddingBottom: '7rem' }}
    >
      {/* Background with cursor parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/texas-landscape.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: '1.04',
          transition: 'transform 80ms linear',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0 z-1"
        style={{ background: 'oklch(22% 0.07 258 / 0.88)' }}
      />

      {/* Animated twinkling stars */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(22)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: 'white',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2.5 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Large star watermark */}
      <div
        className="absolute pointer-events-none select-none z-1"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05 }}
      >
        <svg viewBox="0 0 24 24" fill="white" style={{ width: '480px', height: '480px', animation: 'twinkle 5s ease-in-out infinite' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <span className="section-label" style={{ color: 'var(--color-gold)' }}>Coverage Map</span>
          <h2
            className="font-black italic uppercase text-white mx-auto"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              letterSpacing: '-0.02em',
              maxWidth: '42rem',
              lineHeight: 1.0,
              marginBottom: '1.25rem',
            }}
          >
            Within 60 Miles of Edinburgh?<br />
            <span style={{ color: 'var(--color-gold)' }}>We Come to You.</span>
          </h2>
          <p
            className="font-barlow font-light mx-auto"
            style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.1rem', maxWidth: '36rem', marginBottom: '3rem' }}
          >
            Proudly serving Hidalgo County and surrounding Rio Grande Valley communities.
          </p>
        </div>

        {/* City Grid — linked cities go to location pages */}
        <div
          className="grid mb-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem' }}
        >
          {CITIES.map((city, i) => {
            const href = CITY_LINKS[city];
            const isLast = i === CITIES.length - 1;

            const inner = (
              <>
                {city}
                {isLast && <span style={{ color: 'var(--color-gold)' }}> + More</span>}
                {href && (
                  <span
                    className="block"
                    style={{ fontSize: '0.5rem', letterSpacing: '0.08em', color: 'var(--color-gold)', marginTop: '2px', opacity: 0.8 }}
                  >
                    View Page →
                  </span>
                )}
              </>
            );

            const sharedStyle: React.CSSProperties = {
              backgroundColor: href ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.07)',
              border: href ? '1px solid oklch(68% 0.13 68 / 0.4)' : '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.85)',
              padding: '0.65rem 0.5rem',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textAlign: 'center' as const,
              transition: 'background-color 200ms, border-color 200ms',
              display: 'block',
              textDecoration: 'none',
            };

            return href ? (
              <a
                key={city}
                href={href}
                className="reveal font-barlow font-semibold uppercase"
                style={sharedStyle}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.18)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.10)';
                }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={city}
                className="reveal text-center font-barlow font-semibold uppercase"
                style={sharedStyle}
              >
                {inner}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal">
          <a href="tel:9563210400" id="service-area-cta" className="btn-primary">
            Call to Confirm Your Area
          </a>
          <a href="#locations" className="btn-outline">
            View All Location Pages
          </a>
        </div>
      </div>
    </section>
  );
};
