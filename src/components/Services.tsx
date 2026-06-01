import React, { useRef } from 'react';
import { Snowflake, Flame, Wind, Wrench, Zap, Building2, Gauge, ChevronRight, Power } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const services = [
  {
    id: 'ac-install',
    icon: Snowflake,
    title: 'AC Installation & Replacement',
    text: 'New system installs, full replacements, and equipment upgrades for homes and businesses. We carry top brands built to handle Texas summers.',
    tag: 'Most Popular',
    accent: 'oklch(35% 0.18 260)',
    bgHint: 'cool',
  },
  {
    id: 'heating',
    icon: Flame,
    title: 'Heating & Furnace Service',
    text: "Furnace tune-ups, heat pump installation, and emergency heating repair. When a Texas cold snap hits, we're ready.",
    tag: null,
    accent: 'oklch(42% 0.22 22)',
    bgHint: 'warm',
  },
  {
    id: 'air-quality',
    icon: Wind,
    title: 'Air Quality & Maintenance',
    text: 'Duct cleaning, air filtration, humidity control, and seasonal maintenance plans to keep your system running year-round.',
    tag: null,
    accent: 'oklch(48% 0.15 180)',
    bgHint: 'fresh',
  },
  {
    id: 'air-balancing',
    icon: Gauge,
    title: 'Air Balancing — Residential & Commercial',
    text: 'Precision airflow testing and balancing for homes and businesses. Eliminate hot spots, improve efficiency, and ensure every room gets the right amount of conditioned air.',
    tag: 'New',
    accent: 'oklch(42% 0.16 290)',
    bgHint: 'balance',
  },
  {
    id: 'repair',
    icon: Wrench,
    title: 'Diagnostics & Repair',
    text: 'Fast diagnosis of refrigerant leaks, compressor issues, thermostat failures, and electrical faults. Most repairs same-day.',
    tag: null,
    accent: 'oklch(52% 0.14 65)',
    bgHint: 'repair',
  },
  {
    id: 'commercial-hvac',
    icon: Building2,
    title: 'Commercial HVAC',
    text: 'Rooftop unit specialists, multi-zone design, and preventive service contracts for restaurants, retail, and office buildings.',
    tag: 'Business',
    accent: 'oklch(30% 0.08 258)',
    bgHint: 'commercial',
  },
  {
    id: 'smart-thermostats',
    icon: Zap,
    title: 'Smart Thermostats',
    text: 'Nest, Ecobee, Honeywell and more. Upgrade to intelligent climate control, remote monitoring, and energy-saving schedules.',
    tag: null,
    accent: 'oklch(45% 0.18 140)',
    bgHint: 'tech',
  },
  {
    id: 'generators',
    icon: Power,
    title: 'Generator Sales & Rentals',
    text: 'Sales and rentals of industrial and commercial generators (250kW+) for hospitals, data centers, and critical facilities.',
    tag: 'New',
    accent: 'oklch(60% 0.18 45)',
    bgHint: 'tech',
  },
];

export const Services = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="services" className="relative py-28 overflow-hidden" ref={ref} style={{ backgroundColor: 'var(--color-off-white)' }}>
      {/* Animated scan-line background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            oklch(22% 0.07 258 / 0.025) 60px,
            oklch(22% 0.07 258 / 0.025) 61px
          )`,
          animation: 'stripe-drift 14s linear infinite',
          backgroundSize: '85px 85px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="reveal mb-16">
          <span className="section-label">What We Do</span>
          <h2
            className="font-black italic uppercase"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: 'var(--color-navy)',
              letterSpacing: '-0.02em',
            }}
          >
            Full-Spectrum HVAC<br />
            <span style={{ color: 'var(--color-red)' }}>Care.</span>
          </h2>
          <p className="font-barlow font-light mt-4" style={{ color: 'var(--color-steel)', fontSize: '1.05rem', maxWidth: '44rem' }}>
            From a broken AC on the hottest day of summer to a full commercial rooftop overhaul — six specialties, one trusted team.
          </p>
        </div>

        {/* Service Grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFeatured = index === 0;

            return (
              <a
                key={service.id}
                id={`service-card-${service.id}`}
                href={`#services/${service.id}`}
                className="reveal group relative block"
                style={{
                  backgroundColor: isFeatured ? 'var(--color-navy)' : 'white',
                  padding: '2rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 280ms cubic-bezier(0.16, 1, 0.3, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 12px oklch(0% 0 0 / 0.06)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px oklch(0% 0 0 / 0.14)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px oklch(0% 0 0 / 0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Tag */}
                {service.tag && (
                  <span
                    className="absolute top-4 right-4 font-barlow font-bold uppercase text-white"
                    style={{
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      backgroundColor: 'var(--color-red)',
                      padding: '0.2rem 0.6rem',
                    }}
                  >
                    {service.tag}
                  </span>
                )}

                {/* Colored accent top-line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    backgroundColor: service.accent,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  // @ts-ignore
                  ref={(el) => {
                    if (el) {
                      const parent = el.closest('a');
                      parent?.addEventListener('mouseenter', () => { el.style.transform = 'scaleX(1)'; });
                      parent?.addEventListener('mouseleave', () => { el.style.transform = 'scaleX(0)'; });
                    }
                  }}
                />

                {/* Icon block */}
                <div
                  className="flex items-center justify-center mb-5"
                  style={{
                    width: '52px',
                    height: '52px',
                    backgroundColor: isFeatured ? 'rgba(255,255,255,0.08)' : 'var(--color-off-white)',
                    borderRadius: '4px',
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: isFeatured ? 'var(--color-gold)' : 'var(--color-red)' }}
                  />
                </div>

                <h3
                  className="font-bold uppercase mb-3"
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.06em',
                    color: isFeatured ? 'white' : 'var(--color-navy)',
                  }}
                >
                  {service.title}
                </h3>

                <p
                  className="font-light leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: '0.875rem',
                    color: isFeatured ? 'rgba(255,255,255,0.72)' : 'var(--color-steel)',
                    maxWidth: '100%',
                  }}
                >
                  {service.text}
                </p>

                <span
                  className="inline-flex items-center gap-1.5 mt-5 font-bold uppercase"
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    color: isFeatured ? 'var(--color-gold)' : 'var(--color-navy)',
                    transition: 'gap 200ms',
                  }}
                >
                  Learn More
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
