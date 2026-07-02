import React, { useRef, useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type Status = 'idle' | 'sending' | 'success' | 'error';

const SERVICES = [
  'AC Installation / Replacement',
  'AC Repair',
  'Heating Repair',
  'Commercial HVAC',
  'Indoor Air Quality',
  'Smart Thermostat',
  'Preventive Maintenance',
  'Emergency Service',
  'Generator Sales & Service',
  'Other',
];

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, 60, 0.05);

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const d = new FormData(form);
    const e: Record<string, string> = {};
    if (!String(d.get('name')).trim()) e.name = 'Name is required.';
    const phone = String(d.get('phone')).trim();
    const email = String(d.get('email')).trim();
    if (!phone && !email) {
      e.phone = 'Please provide a phone or email.';
      e.email = 'Please provide a phone or email.';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email.';
    if (!String(d.get('message')).trim()) e.message = 'Please describe what you need.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      const d = new FormData(form);
      const res = await fetch('https://www.founditos.com/api/contact-form/1461c039-ea22-4599-8a76-262c364c7daa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.get('name') as string,
          email: d.get('email') as string,
          phone: d.get('phone') as string,
          message: `Service: ${d.get('service') || 'General'}\n\n${d.get('message') || ''}`,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-navy)', paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Gold diagonal lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            -45deg, transparent, transparent 60px,
            oklch(68% 0.13 68 / 0.025) 60px,
            oklch(68% 0.13 68 / 0.025) 61px
          )`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="reveal mb-14">
          <span className="section-label" style={{ color: 'var(--color-gold)' }}>
            Get In Touch
          </span>
          <h2
            className="font-black uppercase text-white"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
            }}
          >
            Request a Free Estimate
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20 reveal">

          {/* ── Left: contact info ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                color: 'oklch(72% 0.01 250)',
                fontSize: '1.05rem',
                lineHeight: 1.65,
              }}
            >
              Call us directly for emergencies or fill out the form and we'll
              reach back within the hour during business hours.
            </p>

            {/* Info items */}
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                label: 'Call Us',
                value: '(956) 225-3834',
                href: 'tel:9562253834',
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: 'Email',
                value: 'arnold@texasacplus.com',
                href: 'mailto:arnold@texasacplus.com',
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: 'Based In',
                value: 'Edinburgh, TX 78539\nHidalgo County · 60-Mile Radius',
                href: null,
              },
              {
                icon: <Clock className="w-5 h-5" />,
                label: 'Hours',
                value: 'Mon–Fri 7am–7pm · Sat 8am–4pm\n24/7 Emergency Response',
                href: null,
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div
                  style={{
                    flexShrink: 0,
                    marginTop: '0.15rem',
                    color: 'var(--color-gold)',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'oklch(48% 0.01 250)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'white',
                        whiteSpace: 'pre-line',
                        transition: 'color 150ms',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontSize: '0.95rem',
                        color: 'oklch(72% 0.01 250)',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.55,
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.25rem',
                  padding: '3.5rem 2rem',
                  background: 'oklch(18% 0.06 260)',
                  border: '1px solid oklch(68% 0.13 68 / 0.25)',
                  textAlign: 'center',
                  minHeight: '380px',
                }}
              >
                <CheckCircle style={{ width: '3rem', height: '3rem', color: 'var(--color-gold)' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    color: 'white',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Message Received
                </h3>
                <p style={{ fontFamily: 'var(--font-barlow)', color: 'oklch(65% 0.01 250)', fontSize: '0.95rem', maxWidth: '28rem' }}>
                  We'll be in touch shortly. For immediate help call{' '}
                  <a href="tel:9562253834" style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
                    (956) 225-3834
                  </a>.
                </p>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                style={{
                  background: 'oklch(18% 0.06 260)',
                  border: '1px solid oklch(100% 0 0 / 0.07)',
                  padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >

                {/* Row 1: Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="name" label="Full Name *" type="text" name="name" placeholder="John Smith" error={errors.name} />
                  <Field id="phone" label="Phone" type="tel" name="phone" placeholder="(956) 000-0000" error={errors.phone} />
                </div>

                {/* Row 2: Email + Service */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="email" label="Email" type="email" name="email" placeholder="you@example.com" error={errors.email} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label htmlFor="service" style={labelStyle}>Service Needed</label>
                    <select id="service" name="service" style={inputStyle}>
                      <option value="">— Select one —</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="message" style={labelStyle}>Describe Your Issue *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us what's happening with your system, how long the issue has been occurring, and anything else helpful..."
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '120px',
                      borderColor: errors.message ? 'oklch(52% 0.2 22)' : undefined,
                    }}
                  />
                  {errors.message && <FieldError msg={errors.message} />}
                </div>

                {/* Hidden spam trap */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} />

                {/* Error banner */}
                {status === 'error' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.75rem 1rem',
                      background: 'oklch(25% 0.12 22 / 0.3)',
                      border: '1px solid oklch(42% 0.2 22 / 0.5)',
                      color: 'oklch(78% 0.1 22)',
                      fontFamily: 'var(--font-barlow)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please call us directly at (956) 225-3834.
                  </div>
                )}

                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{
                    justifyContent: 'center',
                    opacity: status === 'sending' ? 0.7 : 1,
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                    marginTop: '0.25rem',
                  }}
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                <p
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: '0.7rem',
                    color: 'oklch(44% 0.01 250)',
                    textAlign: 'center',
                    letterSpacing: '0.04em',
                  }}
                >
                  We respond within 1 hour during business hours. For emergencies call directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Shared styles ── */
const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-barlow)',
  fontWeight: 700,
  fontSize: '0.65rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'oklch(58% 0.01 250)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'oklch(14% 0.05 260)',
  border: '1px solid oklch(100% 0 0 / 0.1)',
  color: 'white',
  fontFamily: 'var(--font-barlow)',
  fontSize: '0.9rem',
  padding: '0.7rem 0.9rem',
  outline: 'none',
  transition: 'border-color 150ms',
  appearance: 'none',
};

/* ── Sub-components ── */
function Field({
  id, label, type, name, placeholder, error,
}: {
  id: string; label: string; type: string; name: string; placeholder: string; error?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: error ? 'oklch(52% 0.2 22)' : undefined,
        }}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(68% 0.13 68 / 0.6)'; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = error ? 'oklch(52% 0.2 22)' : 'oklch(100% 0 0 / 0.1)'; }}
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.72rem', color: 'oklch(62% 0.18 22)' }}>
      {msg}
    </span>
  );
}
