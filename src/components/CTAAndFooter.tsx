import React, { useRef } from 'react';
import { Logo } from './Logo';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const CTABand = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, 60, 0.05);

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      ref={ref}
      style={{ backgroundColor: 'var(--color-navy)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Animated pulsing dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          animation: 'dot-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Diagonal stripe drift */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            oklch(68% 0.13 68 / 0.03) 60px,
            oklch(68% 0.13 68 / 0.03) 61px
          )`,
          animation: 'stripe-drift 18s linear infinite',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="reveal">
          <span className="section-label" style={{ color: 'var(--color-gold)' }}>
            Available Now
          </span>
          <h2
            className="font-black italic uppercase text-white"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              marginBottom: '1.25rem',
            }}
          >
            Ready to Get<br />
            <span style={{ color: 'var(--color-gold)' }}>Comfortable?</span>
          </h2>
          <p
            className="font-barlow font-light mx-auto"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', marginBottom: '2.75rem', maxWidth: '36rem' }}
          >
            Call us now or request a free estimate. Same-day service available for urgent repairs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal">
          <a href="tel:9562253834" className="btn-primary">
            <Phone className="w-4 h-4" />
            Call (956) 225-3834
          </a>
          <a href="mailto:arnold@texasacplus.com" className="btn-outline">
            <Mail className="w-4 h-4" />
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, 60, 0.05);

  return (
    <footer
      className="relative overflow-hidden"
      ref={ref}
      style={{ backgroundColor: 'var(--color-navy-dark)', paddingTop: '4.5rem', paddingBottom: '2.5rem' }}
    >
      {/* Texas flag watermark at 5% opacity */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ bottom: '-14%', right: '-5%', opacity: 0.05 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 900 600" width="420" height="280" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="300" height="600" fill="oklch(35% 0.18 260)" />
          <rect x="300" y="0" width="600" height="300" fill="white" />
          <rect x="300" y="300" width="600" height="300" fill="oklch(42% 0.22 22)" />
          <polygon points="150,80 175,170 265,170 195,225 220,315 150,265 80,315 105,225 35,170 125,170" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-1 reveal">
            <Logo variant="white" className="mb-6" />
            <p
              className="font-barlow font-light italic"
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.5rem' }}
            >
              Premium HVAC service built on Texas standards and Texas pride.
              Serving the Rio Grande Valley since 2009.
            </p>
            <span
              className="font-barlow font-bold uppercase"
              style={{ color: 'var(--color-gold)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
            >
              Edinburgh, TX 78539
            </span>
          </div>

          {/* Links */}
          <div className="reveal">
            <h4
              className="font-bold uppercase font-barlow mb-5"
              style={{ color: 'white', fontSize: '0.7rem', letterSpacing: '0.18em', paddingBottom: '0.6rem', borderBottom: '1px solid oklch(68% 0.13 68 / 0.25)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3 font-barlow" style={{ fontSize: '0.875rem' }}>
              {[
                { href: '#home', label: 'Home' },
                { href: '#services', label: 'Services' },
                { href: '#locations', label: 'Locations' },
                { href: '#financing', label: 'Financing' },
                { href: '#service-area', label: 'Service Area' },
                { href: '#contact', label: 'Contact' },
              ].map(item => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{ color: 'rgba(255,255,255,0.65)', transition: 'color 150ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="reveal">
            <h4
              className="font-bold uppercase font-barlow mb-5"
              style={{ color: 'white', fontSize: '0.7rem', letterSpacing: '0.18em', paddingBottom: '0.6rem', borderBottom: '1px solid oklch(68% 0.13 68 / 0.25)' }}
            >
              Services
            </h4>
            <ul className="space-y-3 font-barlow" style={{ fontSize: '0.8rem' }}>
              {[
                { id: 'ac-install', label: 'AC Installation' },
                { id: 'commercial-hvac', label: 'Commercial HVAC' },
                { id: 'generators', label: 'Generator Sales & Service' },
                { id: 'air-quality', label: 'Air Quality' },
                { id: 'air-balancing', label: 'Air Balancing' },
                { id: 'repair', label: 'Diagnostics & Repair' },
                { id: 'smart-thermostats', label: 'Smart Thermostats' },
                { id: 'heating', label: 'Heating Repair' },
              ].map(s => (
                <li key={s.id}>
                  <a
                    href={`#services/${s.id}`}
                    style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'color 150ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="reveal">
            <h4
              className="font-bold uppercase font-barlow mb-5"
              style={{ color: 'white', fontSize: '0.7rem', letterSpacing: '0.18em', paddingBottom: '0.6rem', borderBottom: '1px solid oklch(68% 0.13 68 / 0.25)' }}
            >
              Contact
            </h4>
            <ul className="space-y-4 font-barlow" style={{ fontSize: '0.875rem' }}>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <span className="block" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Phone</span>
                  <a href="tel:9562253834" className="font-bold text-white" style={{ fontSize: '1rem' }}>
                    (956) 225-3834
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <span className="block" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Email</span>
                  <a
                    href="mailto:arnold@texasacplus.com"
                    style={{ color: 'rgba(255,255,255,0.75)', transition: 'color 150ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
                  >
                    arnold@texasacplus.com
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                <div>
                  <span className="block" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Hours</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>
                    Mon–Fri: 7am – 7pm<br />
                    Sat: 8am – 4pm<br />
                    <span style={{ color: 'var(--color-gold)' }}>24/7 Emergency Service</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid oklch(68% 0.13 68 / 0.15)' }}
        >
          <p
            className="font-barlow uppercase"
            style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.12em' }}
          >
            © 2026 Texas AC Plus · Edinburgh, TX · Licensed &amp; Insured · TACLA License
          </p>
          <div className="flex items-center gap-6">
            <p
              className="font-barlow uppercase"
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.12em' }}
            >
              Serving Hidalgo County &amp; Rio Grande Valley
            </p>
            <a
              href="#terms"
              className="font-barlow uppercase"
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.12em', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
