import React from 'react';
import { Award, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

/* Individual animated stat item */
interface StatConfig {
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: React.ElementType;
  separator?: boolean; // insert thousands comma
}

const STATS: StatConfig[] = [
  { target: 15, suffix: '+', label: 'Years in Business', icon: Award },
  { target: 60, suffix: ' mi', label: 'Service Radius', icon: MapPin },
  { target: 2400, suffix: '+', label: 'Jobs Completed', icon: CheckCircle, separator: true },
  { target: 24, suffix: '/7', label: 'Emergency Availability', icon: Clock },
];

function StatItem({ stat }: { stat: StatConfig }) {
  const [count, ref] = useCountUp(stat.target, 1800, 0.2);
  const Icon = stat.icon;

  const displayValue = stat.separator
    ? count.toLocaleString() + stat.suffix
    : (stat.prefix ?? '') + count + stat.suffix;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex items-center gap-4 px-4"
    >
      <div
        className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: 'var(--color-off-white)',
          border: '1.5px solid var(--color-gold)',
        }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--color-gold)' }} />
      </div>
      <div>
        <span
          className="font-black leading-none block"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: '1.85rem',
            color: 'var(--color-red)',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {displayValue}
        </span>
        <span
          className="block uppercase font-semibold"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            color: 'var(--color-steel)',
            marginTop: '1px',
          }}
        >
          {stat.label}
        </span>
      </div>
    </div>
  );
}

export const TrustBar = () => {
  return (
    <div className="floating-trust-bar" id="trust-bar">
      <div className="flex flex-wrap justify-around items-center gap-y-6 px-8 py-8">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <StatItem stat={stat} />
          </div>
        ))}
      </div>
    </div>
  );
};
