import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, Copy, Check, RotateCcw } from 'lucide-react';
import { PageSEO } from './PageSEO';
import {
  SYSTEM_TYPES,
  TONNAGE_OPTIONS,
  ZONE_OPTIONS,
  EFFICIENCY_TIERS,
  EFFICIENCY_LABEL_OVERRIDES,
  BRAND_TIER_LABELS,
  BASE_PRICES,
  ADD_ONS,
  MARGIN_MIN,
  MARGIN_MAX,
  MARGIN_STEP,
  RANGE_PERCENT,
  ROUND_TO,
  DISCLAIMER,
  SystemTypeId,
  EfficiencyId,
  BrandTierId,
} from '../pricing-config';

/**
 * INTERNAL pricing calculator — intentionally unlinked from nav/footer.
 * All pricing data lives in src/pricing-config.ts; this file is layout +
 * math only.
 */

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

const DEFAULTS = {
  systemType: 'ac_furnace' as SystemTypeId,
  tonnage: '3',
  zones: '2',
  efficiency: 'standard' as EfficiencyId,
  brandTier: 'good' as BrandTierId,
};

/* ── Small shared styles ── */
const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  border: '1px solid oklch(90% 0.01 95)',
  boxShadow: '0 2px 12px oklch(0% 0 0 / 0.05)',
  padding: '1.25rem',
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-barlow)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '0.7rem',
  color: 'var(--color-navy)',
  display: 'block',
  marginBottom: '0.5rem',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-barlow)',
  fontWeight: 600,
  fontSize: '1rem',
  color: 'var(--color-navy)',
  backgroundColor: 'var(--color-off-white)',
  border: '1.5px solid oklch(85% 0.02 95)',
  padding: '0.85rem 1rem',
  appearance: 'none',
  minHeight: '52px',
};

export const PricingCalculatorPage: React.FC = () => {
  const [systemType, setSystemType] = useState<SystemTypeId>(DEFAULTS.systemType);
  const [tonnage, setTonnage] = useState(DEFAULTS.tonnage);
  const [zones, setZones] = useState(DEFAULTS.zones);
  const [efficiency, setEfficiency] = useState<EfficiencyId>(DEFAULTS.efficiency);
  const [brandTier, setBrandTier] = useState<BrandTierId>(DEFAULTS.brandTier);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [margin, setMargin] = useState(0);
  const [showRange, setShowRange] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMiniSplit = systemType === 'mini_split';
  const size = isMiniSplit ? zones : tonnage;
  const sizeOptions = isMiniSplit ? ZONE_OPTIONS : TONNAGE_OPTIONS;

  const efficiencyTiers = EFFICIENCY_TIERS.map((t) => ({
    ...t,
    label: EFFICIENCY_LABEL_OVERRIDES[systemType]?.[t.id] ?? t.label,
  }));

  /* ── Live math — everything derives from pricing-config.ts ── */
  const basePrice = BASE_PRICES[systemType][size][efficiency][brandTier];
  const activeAddOns = ADD_ONS.filter((a) => selectedAddOns.has(a.id));
  const addOnTotal = activeAddOns.reduce((sum, a) => sum + a.price, 0);
  const subtotal = basePrice + addOnTotal;
  const adjustment = Math.round(subtotal * (margin / 100));
  const finalPrice = roundTo(subtotal + adjustment, ROUND_TO);
  const lowPrice = roundTo(finalPrice * (1 - RANGE_PERCENT / 100), ROUND_TO);
  const highPrice = roundTo(finalPrice * (1 + RANGE_PERCENT / 100), ROUND_TO);

  const systemLabel = SYSTEM_TYPES.find((s) => s.id === systemType)!.label;
  const sizeLabel = isMiniSplit
    ? `${zones} zone${zones === '1' ? '' : 's'}`
    : `${tonnage} ton`;
  const efficiencyLabel = efficiencyTiers.find((t) => t.id === efficiency)!.label;

  const quoteText = useMemo(() => {
    const lines = [
      'Texas AC Plus — System Quote',
      '----------------------------',
      `System: ${systemLabel}`,
      `Size: ${sizeLabel}`,
      `Efficiency: ${efficiencyLabel}`,
      `Brand tier: ${BRAND_TIER_LABELS[brandTier]}`,
      '',
      `Equipment + install: ${usd.format(basePrice)}`,
      ...activeAddOns.map((a) => `${a.label}: ${usd.format(a.price)}`),
    ];
    if (margin !== 0) {
      lines.push(`Adjustment (${margin > 0 ? '+' : ''}${margin}%): ${usd.format(adjustment)}`);
    }
    lines.push('');
    lines.push(
      showRange
        ? `Estimated total: ${usd.format(lowPrice)} – ${usd.format(highPrice)}`
        : `Total: ${usd.format(finalPrice)}`,
    );
    lines.push('');
    lines.push('Estimate only — final quote confirmed after on-site evaluation.');
    return lines.join('\n');
  }, [systemLabel, sizeLabel, efficiencyLabel, brandTier, basePrice, activeAddOns, margin, adjustment, showRange, lowPrice, highPrice, finalPrice]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quoteText);
    } catch {
      // Older mobile browsers / non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = quoteText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSystemType(DEFAULTS.systemType);
    setTonnage(DEFAULTS.tonnage);
    setZones(DEFAULTS.zones);
    setEfficiency(DEFAULTS.efficiency);
    setBrandTier(DEFAULTS.brandTier);
    setSelectedAddOns(new Set());
    setMargin(0);
    setShowRange(false);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-off-white)', minHeight: '100vh' }}>
      <PageSEO
        title="Pricing Calculator (Internal) | Texas AC Plus"
        description="Internal HVAC system pricing calculator."
        path="/pricing"
        noindex
      />
      {/* ── Page header — matches sub-page hero styling ── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '10rem',
          paddingBottom: '2.5rem',
          background: 'linear-gradient(160deg, var(--color-navy) 0%, oklch(18% 0.06 258) 100%)',
        }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-5">
          <span
            className="font-barlow font-bold uppercase inline-flex items-center gap-2 mb-3"
            style={{
              color: 'var(--color-gold)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              backgroundColor: 'rgba(255,255,255,0.06)',
              padding: '0.35rem 1rem',
            }}
          >
            <Calculator className="w-3.5 h-3.5" />
            Internal Tool
          </span>
          <h1
            className="font-black italic uppercase text-white"
            style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 0.95 }}
          >
            System <span style={{ color: 'var(--color-gold)' }}>Pricing</span> Calculator
          </h1>
        </div>
      </section>

      {/* ── Form — extra bottom padding so the sticky price bar never covers content ── */}
      <div className="max-w-2xl mx-auto px-5" style={{ paddingTop: '1.5rem', paddingBottom: '13rem' }}>
        <div className="flex flex-col gap-5">
          {/* System type + size */}
          <div style={cardStyle}>
            <label style={fieldLabelStyle} htmlFor="calc-system">System Type</label>
            <select
              id="calc-system"
              style={selectStyle}
              value={systemType}
              onChange={(e) => setSystemType(e.target.value as SystemTypeId)}
            >
              {SYSTEM_TYPES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>

            <div style={{ marginTop: '1rem' }}>
              <label style={fieldLabelStyle} htmlFor="calc-size">
                {isMiniSplit ? 'Number of Zones' : 'System Size (Tonnage)'}
              </label>
              <select
                id="calc-size"
                style={selectStyle}
                value={size}
                onChange={(e) => (isMiniSplit ? setZones(e.target.value) : setTonnage(e.target.value))}
              >
                {sizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {isMiniSplit ? `${opt} zone${opt === '1' ? '' : 's'}` : `${opt} tons`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Efficiency tier */}
          <div style={cardStyle}>
            <span style={fieldLabelStyle}>Efficiency Tier</span>
            <div className="flex flex-col gap-2">
              {efficiencyTiers.map((tier) => (
                <TapOption
                  key={tier.id}
                  label={tier.label}
                  selected={efficiency === tier.id}
                  onClick={() => setEfficiency(tier.id)}
                />
              ))}
            </div>
          </div>

          {/* Brand tier */}
          <div style={cardStyle}>
            <span style={fieldLabelStyle}>Brand Tier</span>
            <div className="flex flex-col gap-2">
              {(Object.keys(BRAND_TIER_LABELS) as BrandTierId[]).map((id) => (
                <TapOption
                  key={id}
                  label={BRAND_TIER_LABELS[id]}
                  selected={brandTier === id}
                  onClick={() => setBrandTier(id)}
                />
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div style={cardStyle}>
            <span style={fieldLabelStyle}>Install Complexity Add-Ons</span>
            <div className="flex flex-col gap-2">
              {ADD_ONS.map((addOn) => {
                const checked = selectedAddOns.has(addOn.id);
                return (
                  <button
                    key={addOn.id}
                    type="button"
                    onClick={() => toggleAddOn(addOn.id)}
                    aria-pressed={checked}
                    className="text-left"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      minHeight: '56px',
                      padding: '0.7rem 0.9rem',
                      cursor: 'pointer',
                      backgroundColor: checked ? 'oklch(96% 0.02 68)' : 'var(--color-off-white)',
                      border: checked
                        ? '1.5px solid var(--color-gold)'
                        : '1.5px solid oklch(85% 0.02 95)',
                      transition: 'border-color 150ms, background-color 150ms',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: checked ? 'var(--color-gold)' : 'white',
                        border: checked ? 'none' : '1.5px solid oklch(75% 0.02 95)',
                      }}
                    >
                      {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </span>
                    <span style={{ flex: 1 }}>
                      <span
                        className="font-barlow block"
                        style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-navy)', lineHeight: 1.25 }}
                      >
                        {addOn.label}
                      </span>
                      {addOn.note && (
                        <span className="font-barlow block" style={{ fontSize: '0.78rem', color: 'var(--color-steel-light)' }}>
                          {addOn.note}
                        </span>
                      )}
                    </span>
                    <span
                      className="font-barlow"
                      style={{ fontWeight: 700, fontSize: '0.95rem', color: checked ? 'var(--color-red)' : 'var(--color-steel)' }}
                    >
                      +{usd.format(addOn.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Margin slider */}
          <div style={cardStyle}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.25rem' }}>
              <span style={{ ...fieldLabelStyle, marginBottom: 0 }}>Margin / Adjustment</span>
              <span
                className="font-barlow"
                style={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: margin === 0 ? 'var(--color-steel)' : margin > 0 ? 'var(--color-navy)' : 'var(--color-red)',
                }}
              >
                {margin > 0 ? '+' : ''}{margin}%
              </span>
            </div>
            <input
              type="range"
              min={MARGIN_MIN}
              max={MARGIN_MAX}
              step={MARGIN_STEP}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              aria-label="Margin adjustment percent"
              style={{ width: '100%', height: '44px', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
            />
            <div className="flex justify-between font-barlow" style={{ fontSize: '0.75rem', color: 'var(--color-steel-light)' }}>
              <span>{MARGIN_MIN}%</span>
              <span>0%</span>
              <span>+{MARGIN_MAX}%</span>
            </div>
          </div>

          {/* Quote summary */}
          <div style={{ ...cardStyle, borderTop: '3px solid var(--color-gold)' }}>
            <span style={fieldLabelStyle}>Quote Summary</span>
            <div className="font-barlow flex flex-col" style={{ fontSize: '0.95rem', color: 'var(--color-steel)' }}>
              <SummaryRow label={`${systemLabel} — ${sizeLabel}`} value={usd.format(basePrice)} />
              {activeAddOns.map((a) => (
                <SummaryRow key={a.id} label={a.label} value={usd.format(a.price)} />
              ))}
              <SummaryRow label="Subtotal" value={usd.format(subtotal)} strong divider />
              {margin !== 0 && (
                <SummaryRow
                  label={`Adjustment (${margin > 0 ? '+' : ''}${margin}%)`}
                  value={`${adjustment >= 0 ? '+' : '−'}${usd.format(Math.abs(adjustment))}`}
                />
              )}
              <SummaryRow
                label={showRange ? `Estimated range (±${RANGE_PERCENT}%)` : 'Final quote'}
                value={showRange ? `${usd.format(lowPrice)} – ${usd.format(highPrice)}` : usd.format(finalPrice)}
                strong
                divider
                accent
              />
            </div>

            {/* Range toggle */}
            <button
              type="button"
              onClick={() => setShowRange(!showRange)}
              aria-pressed={showRange}
              className="font-barlow"
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 0',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: 'var(--color-navy)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '40px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: showRange ? 'var(--color-gold)' : 'oklch(85% 0.02 95)',
                  position: 'relative',
                  transition: 'background-color 150ms',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '3px',
                    left: showRange ? '19px' : '3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px oklch(0% 0 0 / 0.3)',
                    transition: 'left 150ms',
                  }}
                />
              </span>
              Quote as a low–high range (±{RANGE_PERCENT}%)
            </button>

            {/* Actions */}
            <div className="flex flex-wrap gap-3" style={{ marginTop: '0.75rem' }}>
              <button type="button" onClick={handleCopy} className="btn-primary" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Quote'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="font-barlow font-semibold uppercase"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  letterSpacing: '0.12em',
                  padding: '1rem 1.5rem',
                  border: '1.5px solid oklch(75% 0.02 95)',
                  background: 'transparent',
                  color: 'var(--color-steel)',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <p className="font-barlow text-center mx-auto" style={{ fontSize: '0.78rem', color: 'var(--color-steel-light)' }}>
            {DISCLAIMER}
          </p>
        </div>
      </div>

      {/* ── Sticky price bar — final number always visible ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          backgroundColor: 'var(--color-navy)',
          borderTop: '2px solid var(--color-gold)',
          boxShadow: '0 -6px 24px oklch(0% 0 0 / 0.25)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="max-w-2xl mx-auto px-5 flex items-center justify-between gap-3" style={{ paddingTop: '0.7rem', paddingBottom: '0.7rem' }}>
          <div style={{ minWidth: 0 }}>
            <span
              className="font-barlow font-bold uppercase block"
              style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}
            >
              {showRange ? `Estimated Range (±${RANGE_PERCENT}%)` : 'Final Quote'}
            </span>
            <span
              className="font-barlow font-black block"
              style={{
                color: 'var(--color-gold)',
                fontSize: showRange ? 'clamp(1.15rem, 4.5vw, 1.8rem)' : 'clamp(1.6rem, 6vw, 2.2rem)',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
              }}
            >
              {showRange ? `${usd.format(lowPrice)} – ${usd.format(highPrice)}` : usd.format(finalPrice)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-primary"
            style={{ padding: '0.8rem 1.2rem', flexShrink: 0 }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Big tappable radio-style option row ── */
const TapOption: React.FC<{ label: string; selected: boolean; onClick: () => void }> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className="text-left font-barlow"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      minHeight: '52px',
      padding: '0.7rem 0.9rem',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '0.95rem',
      color: 'var(--color-navy)',
      backgroundColor: selected ? 'oklch(96% 0.02 68)' : 'var(--color-off-white)',
      border: selected ? '1.5px solid var(--color-gold)' : '1.5px solid oklch(85% 0.02 95)',
      transition: 'border-color 150ms, background-color 150ms',
    }}
  >
    <span
      aria-hidden="true"
      style={{
        flexShrink: 0,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: selected ? '6px solid var(--color-gold)' : '1.5px solid oklch(75% 0.02 95)',
        backgroundColor: 'white',
        transition: 'border 150ms',
      }}
    />
    {label}
  </button>
);

/* ── Summary line item ── */
const SummaryRow: React.FC<{ label: string; value: string; strong?: boolean; divider?: boolean; accent?: boolean }> = ({
  label,
  value,
  strong,
  divider,
  accent,
}) => (
  <div
    className="flex items-baseline justify-between gap-4"
    style={{
      padding: '0.45rem 0',
      borderTop: divider ? '1px solid oklch(90% 0.01 95)' : 'none',
      marginTop: divider ? '0.35rem' : 0,
      paddingTop: divider ? '0.8rem' : '0.45rem',
    }}
  >
    <span style={{ fontWeight: strong ? 700 : 400, color: strong ? 'var(--color-navy)' : undefined }}>{label}</span>
    <span
      style={{
        fontWeight: strong ? 800 : 600,
        fontSize: accent ? '1.35rem' : undefined,
        color: accent ? 'var(--color-red)' : strong ? 'var(--color-navy)' : undefined,
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </span>
  </div>
);
