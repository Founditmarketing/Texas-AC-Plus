import React, { useRef, useEffect } from 'react';
import { MapPin, Phone, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

/* ── Location data ── */
export interface LocationData {
  id: string;
  city: string;
  county: string;
  tagline: string;
  stat: string;
  statLabel: string;
  accentColor: string;
  bgColor: string;
  heroImage: string;
  description: string;
}

export const LOCATIONS: LocationData[] = [
  {
    id: 'mcallen',
    city: 'McAllen',
    county: 'Hidalgo County',
    tagline: "The Valley's Largest City",
    stat: '400+',
    statLabel: 'Local Customers',
    accentColor: 'oklch(35% 0.18 260)',
    bgColor: 'oklch(28% 0.12 260)',
    heroImage: '/images/city-mcallen.jpg',
    description: 'Serving McAllen homes and businesses with fast, professional HVAC service.',
  },
  {
    id: 'edinburg',
    city: 'Edinburg',
    county: 'Hidalgo County',
    tagline: 'Our Home Base',
    stat: '34+',
    statLabel: 'Years Here',
    accentColor: 'oklch(42% 0.22 22)',
    bgColor: 'oklch(34% 0.16 22)',
    heroImage: '/images/city-edinburg.jpg',
    description: "Edinburg is where Texas AC Plus was born. We know this community — because we're part of it.",
  },
  {
    id: 'harlingen',
    city: 'Harlingen',
    county: 'Cameron County',
    tagline: 'Cameron County Proud',
    stat: '60 mi',
    statLabel: 'Service Reach',
    accentColor: 'oklch(45% 0.18 140)',
    bgColor: 'oklch(36% 0.14 140)',
    heroImage: '/images/city-harlingen.jpg',
    description: 'Full HVAC coverage for Harlingen and all of Cameron County.',
  },
  {
    id: 'mission',
    city: 'Mission',
    county: 'Hidalgo County',
    tagline: 'Heart of the Citrus Belt',
    stat: '24/7',
    statLabel: 'Emergency Service',
    accentColor: 'oklch(52% 0.14 65)',
    bgColor: 'oklch(40% 0.12 65)',
    heroImage: '/images/city-mission.jpg',
    description: 'Reliable HVAC repair, installation, and maintenance for Mission residents and businesses.',
  },
  {
    id: 'weslaco',
    city: 'Weslaco',
    county: 'Hidalgo County',
    tagline: 'Where Nature Meets Community',
    stat: '4.9★',
    statLabel: 'Customer Rating',
    accentColor: 'oklch(48% 0.15 180)',
    bgColor: 'oklch(38% 0.12 180)',
    heroImage: '/images/city-weslaco.jpg',
    description: 'Top-rated HVAC service in Weslaco, from tune-ups to full system replacement.',
  },
  {
    id: 'pharr',
    city: 'Pharr',
    county: 'Hidalgo County',
    tagline: 'Growing Fast, Staying Cool',
    stat: '200+',
    statLabel: 'Pharr Jobs Done',
    accentColor: 'oklch(38% 0.2 280)',
    bgColor: 'oklch(28% 0.14 280)',
    heroImage: '/images/city-pharr.jpg',
    description: "Pharr's trusted HVAC team for residential and commercial climate control.",
  },
];

/* ── Location Card ── */
const LocationCard = ({ loc }: { loc: LocationData }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-6px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
  };

  return (
    <a
      ref={cardRef}
      href={`#locations/${loc.id}`}
      className="location-card block relative overflow-hidden group"
      style={{
        backgroundColor: loc.bgColor,
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '2rem',
        textDecoration: 'none',
        boxShadow: '0 4px 20px oklch(0% 0 0 / 0.18)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${loc.heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${loc.accentColor.replace(')', ' / 0.75)')} 0%, oklch(12% 0.04 258 / 0.85) 100%)`,
          transition: 'opacity 300ms',
        }}
      />

      {/* Stat badge */}
      <div
        className="absolute top-4 right-4 text-center"
        style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '0.5rem 0.75rem',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span className="block font-black font-barlow text-white" style={{ fontSize: '1.4rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {loc.stat}
        </span>
        <span className="block font-barlow uppercase text-white/70" style={{ fontSize: '0.55rem', letterSpacing: '0.1em', marginTop: '2px' }}>
          {loc.statLabel}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span className="block font-barlow font-semibold uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)' }}>
          {loc.tagline}
        </span>
        <h3 className="font-black italic uppercase text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', letterSpacing: '-0.02em', lineHeight: 0.95 }}>
          {loc.city}
        </h3>
        <p className="font-barlow text-white/70 mb-4" style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}>
          <MapPin className="w-3 h-3 inline mr-1" />
          {loc.county}
        </p>
        <span
          className="inline-flex items-center gap-2 font-bold uppercase font-barlow"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            color: 'var(--color-gold)',
            transition: 'gap 200ms',
          }}
        >
          View Location
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </a>
  );
};

/* ── Locations Hub Page ── */
export const LocationsPage = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-off-white)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: 'var(--color-navy)',
          paddingTop: '9rem',
          paddingBottom: '5rem',
        }}
      >
        {/* Animated star field */}
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${1 + Math.random() * 2.5}px`,
              height: `${1 + Math.random() * 2.5}px`,
              backgroundColor: 'white',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Texas outline watermark */}
        <svg
          viewBox="0 0 500 500"
          style={{
            position: 'absolute',
            right: '-5%',
            bottom: '-10%',
            width: 'clamp(280px, 40vw, 560px)',
            opacity: 0.06,
            fill: 'white',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <path d="M 200 20 L 420 20 L 440 60 L 460 60 L 460 90 L 480 120 L 480 150 L 460 180 L 450 230 L 420 270 L 400 310 L 380 360 L 340 390 L 300 420 L 260 450 L 220 480 L 180 460 L 140 430 L 100 390 L 60 350 L 40 300 L 20 260 L 10 200 L 30 160 L 60 130 L 80 90 L 100 50 L 140 30 Z" />
        </svg>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <a href="#home" className="back-btn mb-8 inline-flex" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Home
          </a>
          <span className="section-label" style={{ color: 'var(--color-gold)' }}>Service Coverage</span>
          <h1
            className="font-black italic uppercase text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.025em', lineHeight: 0.9, marginBottom: '1.25rem' }}
          >
            We Come<br />
            <span style={{ color: 'var(--color-gold)' }}>To You.</span>
          </h1>
          <p className="font-barlow font-light" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem', maxWidth: '42rem', lineHeight: 1.6 }}>
            Based in Edinburgh — serving the entire Rio Grande Valley. Click your city to see how we serve your community.
          </p>
        </div>
      </section>

      {/* Location Cards Grid */}
      <section ref={ref} style={{ padding: '5rem 1.5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          >
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="reveal">
                <LocationCard loc={loc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Not seeing your city?" strip */}
      <div style={{ backgroundColor: 'var(--color-navy)', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <p className="font-barlow font-light" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', marginBottom: '1rem' }}>
          Not seeing your city? We serve within 60 miles of Edinburgh.
        </p>
        <a href="tel:9562253834" className="btn-primary">
          <Phone className="w-4 h-4" />
          Call to Confirm Your Area
        </a>
      </div>
    </div>
  );
};
