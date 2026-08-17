import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const SplitPanels = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, 100);

  return (
    <section className="overflow-hidden relative" ref={ref} id="about" style={{ backgroundColor: 'white' }}>
      <div className="flex flex-col md:flex-row" style={{ minHeight: '560px' }}>

        {/* Residential Panel */}
        <div className="relative flex-1 group overflow-hidden reveal">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
          backgroundImage: 'url("/images/residential.png")',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, oklch(22% 0.07 258 / 0.85) 0%, oklch(22% 0.07 258 / 0.5) 100%)' }}
          />

          <div
            className="relative h-full flex flex-col justify-end p-12 text-white"
            style={{ minHeight: '460px' }}
          >
            <span
              className="font-barlow font-bold uppercase mb-2"
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-gold)', opacity: 0.9 }}
            >
              Homeowners
            </span>
            <h2
              className="font-black italic uppercase mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              Residential
            </h2>
            <ul
              className="font-barlow space-y-3 mb-8"
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}
            >
              {['Central AC Tune-ups', 'Emergency Home Repairs', 'Smart Thermostat Upgrades', 'Mini-Split Installs'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rotate-45"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 font-bold uppercase font-barlow group/link"
              style={{ fontSize: '0.75rem', letterSpacing: '0.14em', color: 'var(--color-gold)', transition: 'color 150ms' }}
            >
              Request Service
              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="hidden md:block w-0.5" style={{ backgroundColor: 'var(--color-gold)', opacity: 0.4 }} />

        {/* Commercial Panel */}
        <div className="relative flex-1 group overflow-hidden reveal">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/images/commercial.png")',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, oklch(42% 0.2 22 / 0.85) 0%, oklch(42% 0.2 22 / 0.45) 100%)' }}
          />

          <div
            className="relative h-full flex flex-col justify-end p-12 text-white"
            style={{ minHeight: '460px' }}
          >
            <span
              className="font-barlow font-bold uppercase mb-2"
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-gold)', opacity: 0.9 }}
            >
              Business Owners
            </span>
            <h2
              className="font-black italic uppercase mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              Commercial
            </h2>
            <ul
              className="font-barlow space-y-3 mb-8"
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}
            >
              {['Rooftop Unit (RTU) Specialists', 'Multi-Zone System Design', 'Preventive Service Contracts', 'Restaurant & Retail HVAC'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rotate-45"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 font-bold uppercase font-barlow group/link"
              style={{ fontSize: '0.75rem', letterSpacing: '0.14em', color: 'var(--color-gold)', transition: 'color 150ms' }}
            >
              Get a Contract Quote
              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
