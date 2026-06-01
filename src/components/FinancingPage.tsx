import React, { useRef } from 'react';
import { Phone, CreditCard, Clock, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const FinancingPage: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <div style={{ backgroundColor: 'var(--color-off-white)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: 'clamp(380px, 60vh, 560px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, var(--color-navy) 0%, oklch(18% 0.06 258) 100%)',
        }}
      >
        {/* Animated pulsing dot grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
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

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 2rem',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.12)',
              animation: 'dot-pulse 3s ease-in-out infinite',
            }}
          >
            <CreditCard className="w-9 h-9" style={{ color: 'var(--color-gold)' }} />
          </div>

          <span
            className="font-barlow font-bold uppercase inline-block mb-4"
            style={{
              color: 'var(--color-gold)',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              backgroundColor: 'rgba(255,255,255,0.06)',
              padding: '0.4rem 1.2rem',
            }}
          >
            Coming Soon
          </span>

          <h1
            className="font-black italic uppercase text-white"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              marginBottom: '1.5rem',
            }}
          >
            Flexible{' '}
            <span style={{ color: 'var(--color-gold)' }}>Financing</span>
          </h1>

          <p
            className="font-barlow font-light mx-auto"
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: '1.15rem',
              lineHeight: 1.65,
              maxWidth: '32rem',
              marginBottom: '2.5rem',
            }}
          >
            We're partnering with <strong style={{ color: 'white', fontWeight: 700 }}>Synchrony Financing</strong> to
            bring you affordable payment options for HVAC installations and repairs. Details coming soon.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a href="tel:9563210400" className="btn-primary">
              <Phone className="w-4 h-4" />
              Call for Details
            </a>
            <a href="#home" className="btn-outline">
              <ArrowRight className="w-4 h-4" />
              Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section ref={ref} className="py-20" style={{ backgroundColor: 'var(--color-off-white)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <h2
              className="font-black italic uppercase"
              style={{
                color: 'var(--color-navy)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}
            >
              What to <span style={{ color: 'var(--color-red)' }}>Expect</span>
            </h2>
            <p
              className="font-barlow font-light mx-auto"
              style={{ color: 'var(--color-steel)', fontSize: '1.05rem', maxWidth: '34rem' }}
            >
              Our financing program will make it easier than ever to keep your home or business comfortable year-round.
            </p>
          </div>

          <div
            className="grid gap-5 reveal"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {[
              {
                icon: CreditCard,
                title: 'Flexible Payment Plans',
                text: 'Monthly payment options designed to fit your budget — from 0% introductory APR to extended-term plans.',
              },
              {
                icon: Clock,
                title: 'Quick Approval',
                text: 'Apply in minutes with a simple online application. Get a decision fast so your project can start right away.',
              },
              {
                icon: Phone,
                title: 'Questions? Call Us',
                text: "Our team can walk you through financing options over the phone. We're happy to help you find the right plan.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    boxShadow: '0 2px 12px oklch(0% 0 0 / 0.06)',
                    transition: 'box-shadow 280ms cubic-bezier(0.16, 1, 0.3, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px oklch(0% 0 0 / 0.14)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px oklch(0% 0 0 / 0.06)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    className="flex items-center justify-center mb-5"
                    style={{
                      width: '52px',
                      height: '52px',
                      backgroundColor: 'var(--color-off-white)',
                      borderRadius: '4px',
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: 'var(--color-red)' }} />
                  </div>
                  <h3
                    className="font-bold uppercase mb-3"
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontSize: '0.95rem',
                      letterSpacing: '0.06em',
                      color: 'var(--color-navy)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-light leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontSize: '0.875rem',
                      color: 'var(--color-steel)',
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div style={{ backgroundColor: 'var(--color-navy)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2
          className="font-black italic uppercase text-white mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
        >
          Need HVAC Service <span style={{ color: 'var(--color-gold)' }}>Now?</span>
        </h2>
        <p
          className="font-barlow font-light mx-auto mb-8"
          style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', maxWidth: '36rem' }}
        >
          Don't wait for financing to launch — call us today for a free estimate. We'll work with you on a solution.
        </p>
        <a href="tel:9563210400" className="btn-primary">
          <Phone className="w-4 h-4" />
          Call (956) 321-0400
        </a>
      </div>
    </div>
  );
};
