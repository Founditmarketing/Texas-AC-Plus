import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, ChevronDown } from 'lucide-react';
import { useCursorParallax } from '../hooks/useCursorParallax';

/* ── Stat badge data ── */
const STATS = [
  { value: '34+', label: 'Years Serving South Texas' },
  { value: '24/7', label: 'Emergency Response' },
  { value: '60mi', label: 'Service Radius' },
];

/* ── Gold financing CTA — shared style + hover ── */
const financingBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.85rem 2rem',
  backgroundColor: 'var(--color-gold)',
  color: 'var(--color-navy)',
  fontFamily: 'var(--font-barlow)',
  fontWeight: 800,
  fontSize: '0.82rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms',
  boxShadow: '0 4px 20px oklch(68% 0.13 68 / 0.35)',
};

const handleFinancingBtnEnter = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
  e.currentTarget.style.boxShadow = '0 8px 32px oklch(68% 0.13 68 / 0.5)';
};

const handleFinancingBtnLeave = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = 'translateY(0) scale(1)';
  e.currentTarget.style.boxShadow = '0 4px 20px oklch(68% 0.13 68 / 0.35)';
};

/* ─────────────────────────────────────────────
   Canvas Snow — white dot particles
   • Diagonal wind drift (~18° from vertical)
   • Opacity envelope: fade in top 8%, hard-out by 75%
   • Respects prefers-reduced-motion
───────────────────────────────────────────── */
const FADE_OUT_STOP = 0.75; // particles invisible at/below this fraction of canvas height
const FADE_IN_STOP  = 0.08; // fully opaque after this fraction from top
const WIND_ANGLE_DEG = 18;   // rightward diagonal
const WIND_RAD = (WIND_ANGLE_DEG * Math.PI) / 180;

interface Flake {
  x: number;
  y: number;
  r: number;      // radius px
  speed: number;  // px/frame vertical
  alpha: number;  // base max opacity
}

function makeFlake(w: number, h: number): Flake {
  return {
    x: Math.random() * w,
    y: Math.random() * h * FADE_OUT_STOP, // seed anywhere in valid zone
    r: 1.2 + Math.random() * 2.8,
    speed: 0.4 + Math.random() * 1.1,
    alpha: 0.35 + Math.random() * 0.55,
  };
}

const SnowCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Honour prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const COUNT = 200;
    let flakes: Flake[] = [];

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width  = rect.width;
      canvas!.height = rect.height;
      flakes = Array.from({ length: COUNT }, () => makeFlake(canvas!.width, canvas!.height));
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      for (const f of flakes) {
        // Opacity envelope based on vertical position
        // ── Move first, always ──
        f.y += f.speed;
        f.x += f.speed * Math.tan(WIND_RAD);

        // Wrap horizontally
        if (f.x > w) f.x -= w;

        // Reset when past the fade-out ceiling
        if (f.y > h * FADE_OUT_STOP) {
          f.x = Math.random() * w;
          f.y = 0;
        }

        // ── Opacity envelope ──
        const frac = f.y / h;
        let env = 1;
        if (frac < FADE_IN_STOP) {
          env = frac / FADE_IN_STOP;               // fade in from top
        } else if (frac > FADE_OUT_STOP * 0.72) {
          env = 1 - (frac - FADE_OUT_STOP * 0.72) / (FADE_OUT_STOP * 0.28);
          env = Math.max(0, env);
        }

        const opacity = f.alpha * env;
        if (opacity < 0.008) continue;             // skip draw, but particle still moves

        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
};

/* ── Main Hero ── */
export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useCursorParallax(
    sectionRef as React.RefObject<HTMLElement | null>,
    bgRef as React.RefObject<HTMLElement | null>,
    0.018,
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full flex flex-col justify-end overflow-hidden"
      style={{ minHeight: 'clamp(640px, 96vh, 960px)' }}
    >
      {/* ── Background photo with parallax ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero-hvac-tech.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 28%',
          scale: '1.06',
          willChange: 'transform',
        }}
      />

      {/* ── Cinematic multi-layer overlay ── */}
      {/* 1. Deep dark base — bottom-up so text always pops */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            'linear-gradient(to top, oklch(10% 0.05 260 / 0.98) 0%, oklch(14% 0.06 260 / 0.72) 40%, oklch(18% 0.07 260 / 0.32) 72%, transparent 100%)',
        }}
      />
      {/* 2. Left-side directional darkening — keeps copy legible */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            'linear-gradient(100deg, oklch(10% 0.06 260 / 0.78) 0%, oklch(12% 0.05 260 / 0.28) 52%, transparent 100%)',
        }}
      />
      {/* 3. Subtle warm-to-cool color grade (cinematic LUT feel) */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 60% 30%, oklch(30% 0.04 210 / 0.12) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Subtle animated scan line (very understated) ── */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(100% 0 0 / 0.018) 2px, oklch(100% 0 0 / 0.018) 4px)',
        }}
      />

      {/* ── Canvas snow ── */}
      <SnowCanvas />

      {/* ── Hero content ── */}
      <div
        className="relative z-20 w-full"
        style={{ paddingBottom: 'clamp(4rem, 8vh, 6.5rem)', paddingTop: 'clamp(10.5rem, 18vh, 13rem)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="section-label"
              style={{ color: 'var(--color-gold)', marginBottom: '1.25rem' }}
            >
              Hidalgo County · Rio Grande Valley · Since 2009
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-black uppercase"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: '0.95',
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
              maxWidth: '26ch',
            }}
          >
            Most Trusted
            <br />
            <span style={{ color: 'var(--color-gold)' }}>AC, HVAC & Generator</span>
            <br />
            Service in Texas
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: 'oklch(88% 0.008 250)',
              fontSize: 'clamp(1rem, 1.9vw, 1.25rem)',
              lineHeight: '1.6',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              maxWidth: '42rem',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 400,
            }}
          >
            Commercial and residential air conditioning, heating, and
            refrigeration — licensed, insured, and on call around the clock.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
            style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
          >
            <a href="tel:9562253834" id="hero-primary-cta" className="btn-primary">
              <Phone className="w-4 h-4" />
              (956) 225-3834
            </a>
            <a href="/#services" id="hero-secondary-cta" className="btn-outline">
              Our Services
            </a>
            <a
              href="/financing"
              id="hero-financing-cta"
              style={financingBtnStyle}
              onMouseEnter={handleFinancingBtnEnter}
              onMouseLeave={handleFinancingBtnLeave}
            >
              💲 Residential Financing
            </a>
            <a
              href="/#contact"
              id="hero-commercial-financing-cta"
              style={financingBtnStyle}
              onMouseEnter={handleFinancingBtnEnter}
              onMouseLeave={handleFinancingBtnLeave}
            >
              💲 Commercial Financing
            </a>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.72, ease: 'easeOut' }}
            className="flex flex-wrap gap-x-10 gap-y-4"
            style={{
              borderTop: '1px solid oklch(100% 0 0 / 0.14)',
              paddingTop: '1.5rem',
            }}
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
                    lineHeight: 1,
                    color: 'var(--color-gold)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 500,
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'oklch(65% 0.01 250)',
                    marginTop: '0.25rem',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll nudge ── */}
      <motion.a
        href="/#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute z-20 pointer-events-auto"
        style={{
          right: 'clamp(1.5rem, 4vw, 3rem)',
          bottom: 'clamp(2rem, 4vh, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'oklch(55% 0.01 250)',
          textDecoration: 'none',
        }}
        whileHover={{ color: 'oklch(75% 0.01 250)' }}
        aria-label="Scroll to services"
      >
        <span
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          Scroll
        </span>
        <ChevronDown className="w-3.5 h-3.5" style={{ marginTop: '0.2rem' }} />
      </motion.a>
    </section>
  );
};
