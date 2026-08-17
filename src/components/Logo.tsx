import React from 'react';

interface LogoProps {
  variant?: 'white' | 'navy';
  className?: string;
  /** Logo image height in px (default 52) */
  imgHeight?: number;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'white', className = '', imgHeight = 52 }) => {
  const textColor = variant === 'white' ? 'white' : 'var(--color-navy)';
  const subColor = variant === 'white' ? 'rgba(255,255,255,0.75)' : 'var(--color-steel)';

  return (
    <a
      href="/"
      aria-label="Texas AC Plus — Home"
      className={`flex items-center gap-3 group ${className}`}
      style={{ textDecoration: 'none' }}
    >
      {/* Real logo image */}
      <img
        src="/images/logo.png"
        alt="Texas AC Plus HVAC Services logo"
        style={{
          height: `${imgHeight}px`,
          width: 'auto',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          filter: variant === 'white' ? 'drop-shadow(0 2px 8px oklch(0% 0 0 / 0.35))' : 'none',
        }}
        className="group-hover:scale-105"
      />

      {/* Wordmark — hidden on very small screens to save space, logo alone reads fine */}
      <div className="hidden sm:flex flex-col leading-none" style={{ color: textColor }}>
        <span
          className="font-barlow font-black uppercase"
          style={{ fontSize: '1.3rem', letterSpacing: '0.06em', lineHeight: 1 }}
        >
          Texas AC Plus
        </span>
        <span
          className="font-barlow font-semibold uppercase"
          style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: subColor, marginTop: '2px' }}
        >
          HVAC Services
        </span>
      </div>
    </a>
  );
};
