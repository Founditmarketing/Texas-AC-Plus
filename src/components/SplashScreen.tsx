import React, { useState, useEffect } from 'react';

/**
 * SplashScreen — A short, cinematic loading animation.
 * Texas flag colors sweep in, logo scales up, then the whole overlay
 * slides away to reveal the site.
 */
export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Phase timing: enter(600ms) → hold(800ms) → exit(500ms) → done
    const holdTimer = setTimeout(() => setPhase('hold'), 100);
    const exitTimer = setTimeout(() => setPhase('exit'), 1800);
    const doneTimer = setTimeout(() => onComplete(), 2400);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-navy)',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Background animated diagonal stripes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            oklch(68% 0.13 68 / 0.025) 60px,
            oklch(68% 0.13 68 / 0.025) 61px
          )`,
          animation: 'stripe-drift 8s linear infinite',
        }}
      />

      {/* Subtle pulsing dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          animation: 'dot-pulse 3s ease-in-out infinite',
        }}
      />

      {/* Texas flag color bars sweeping in from left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          display: 'flex',
          transform: phase === 'enter' ? 'scaleX(0)' : 'scaleX(1)',
          transformOrigin: 'left',
          transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(35% 0.18 260)' }} />
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(98% 0.005 100)' }} />
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(42% 0.22 22)' }} />
      </div>

      {/* Bottom flag bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          display: 'flex',
          transform: phase === 'enter' ? 'scaleX(0)' : 'scaleX(1)',
          transformOrigin: 'right',
          transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
        }}
      >
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(42% 0.22 22)' }} />
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(98% 0.005 100)' }} />
        <div style={{ flex: '0 0 33.333%', backgroundColor: 'oklch(35% 0.18 260)' }} />
      </div>

      {/* Center content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.85) translateY(12px)' : phase === 'exit' ? 'scale(1.05)' : 'scale(1) translateY(0)',
          transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo */}
        <img
          src="/images/HVAClogo.png"
          alt="Texas AC Plus"
          style={{
            height: '80px',
            width: 'auto',
            filter: 'drop-shadow(0 4px 20px oklch(0% 0 0 / 0.5))',
          }}
        />

        {/* Company name */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'white',
              lineHeight: 1,
            }}
          >
            Texas AC Plus
          </div>
          <div
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 600,
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginTop: '6px',
            }}
          >
            HVAC Services
          </div>
        </div>

        {/* Animated gold loading bar */}
        <div
          style={{
            width: '120px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            marginTop: '0.75rem',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--color-gold)',
              borderRadius: '1px',
              transform: phase === 'enter' ? 'scaleX(0)' : 'scaleX(1)',
              transformOrigin: 'left',
              transition: 'transform 1400ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
            }}
          />
        </div>
      </div>
    </div>
  );
};
