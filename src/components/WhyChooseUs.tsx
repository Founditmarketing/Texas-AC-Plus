import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const reasons = [
  {
    number: '01',
    title: 'Licensed & Insured',
    description: 'Your property is fully protected with our bonding, TACLA license, and comprehensive liability coverage.',
  },
  {
    number: '02',
    title: 'Same-Day Service',
    description: "Available for urgent AC breakdowns. We understand Texas heat doesn't wait for convenient scheduling.",
  },
  {
    number: '03',
    title: 'Free Estimates',
    description: 'Up-front pricing and transparent bidding for all installations and major repairs. No surprises on the invoice.',
  },
  {
    number: '04',
    title: 'Locally Owned',
    description: 'Born and bred in the Rio Grande Valley. We treat our neighbors the way we want to be treated.',
  },
];

export const WhyChooseUs = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, 70);

  return (
    <section
      className="relative"
      ref={ref}
      style={{ backgroundColor: 'white', paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Two-column layout: big heading left, reasons right */}
        <div className="grid md:grid-cols-5 gap-16 items-start">

          {/* Left — heading */}
          <div className="md:col-span-2 reveal">
            <span className="section-label">Why Texas AC Plus</span>
            <h2
              className="font-black italic uppercase"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                color: 'var(--color-navy)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
                marginBottom: '2rem',
              }}
            >
              Texas<br />Standards.<br />
              <span style={{ color: 'var(--color-red)' }}>Texas Pride.</span>
            </h2>

            {/* Gold accent line */}
            <div style={{ width: '56px', height: '4px', backgroundColor: 'var(--color-gold)', marginBottom: '1.75rem' }} />

            <p
              className="font-barlow font-light"
              style={{ color: 'var(--color-steel)', fontSize: '1rem', lineHeight: 1.65, maxWidth: '28rem' }}
            >
              We're not a franchise. We're your neighbors. Every technician is vetted, every job is
              backed by our satisfaction guarantee, and every call gets a real human on the other end.
            </p>

            <a
              href="tel:9562253834"
              className="btn-primary mt-8 inline-flex"
              style={{ backgroundColor: 'var(--color-navy)' }}
            >
              Call Us Now
            </a>
          </div>

          {/* Right — reasons as horizontal rows (not identical card grid) */}
          <div className="md:col-span-3 space-y-10">
            {reasons.map((reason, i) => (
              <div
                key={i}
                id={`reason-${i}`}
                className="reveal flex gap-6 group"
                style={{
                  paddingBottom: i < reasons.length - 1 ? '2.5rem' : '0',
                  borderBottom: i < reasons.length - 1 ? '1px solid oklch(0% 0 0 / 0.06)' : 'none',
                }}
              >
                <span
                  className="font-black italic flex-shrink-0"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '3rem',
                    color: 'var(--color-off-white)',
                    lineHeight: 1,
                    transition: 'color 250ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-red)'; (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-off-white)'; }}
                >
                  {reason.number}
                </span>
                <div>
                  <h3
                    className="font-bold uppercase mb-2"
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontSize: '1rem',
                      letterSpacing: '0.08em',
                      color: 'var(--color-navy)',
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="font-barlow font-light"
                    style={{ fontSize: '0.9rem', color: 'var(--color-steel)', lineHeight: 1.6, maxWidth: '100%' }}
                  >
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
