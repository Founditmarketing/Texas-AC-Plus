import React, { useRef, useEffect } from 'react';
import { ArrowLeft, Phone, CheckCircle, ChevronRight, Snowflake, Flame, Wind, Wrench, Zap, Building2, Gauge, Power } from 'lucide-react';
import { useCursorParallax } from '../hooks/useCursorParallax';

interface ServiceConfig {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  heroImage: string;
  accentColor: string;
  bgHint: string;
  intro: string;
  includes: string[];
  why: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

const SERVICE_DATA: Record<string, ServiceConfig> = {
  'ac-install': {
    id: 'ac-install',
    icon: Snowflake,
    title: 'AC Installation & Replacement',
    tagline: 'The right system, installed right, the first time.',
    heroImage: '/images/residential-ac.jpg',
    accentColor: 'oklch(35% 0.18 260)',
    bgHint: 'cool',
    intro: `Texas summers are no joke. When temperatures push past 100°F in the Rio Grande Valley, your air conditioning isn't a luxury — it's a lifeline. Whether you're replacing an aging system, upgrading to a more efficient model, or installing AC in a new construction, Texas AC Plus gets it done right and fast.`,
    includes: [
      'Free in-home load calculation & system sizing',
      'Licensed equipment selection (Carrier, Trane, Lennox, Daikin)',
      'Full removal and disposal of old equipment',
      'Professional ductwork inspection and sealing',
      'Thermostat programming and system commissioning',
      'First-year labor warranty on all installations',
    ],
    why: `We don't oversell. Too many HVAC companies push oversized systems because the margin is higher. We calculate your exact BTU load and recommend the right-sized unit — which means lower energy bills, better dehumidification, and a system that lasts longer.`,
    faqs: [
      { q: 'How long does a typical AC installation take?', a: 'Most residential installations are complete in 4–8 hours. Full commercial replacements may take 1–2 days depending on system complexity.' },
      { q: 'What brands do you install?', a: 'We carry Carrier, Trane, Lennox, Daikin, and Rheem — all backed by manufacturer warranties and our own labor guarantee.' },
      { q: 'Do you offer financing?', a: 'Yes. We work with multiple financing partners to offer 0% and low-interest options for qualifying customers. Ask us during your free estimate.' },
    ],
    related: ['air-quality', 'smart-thermostats', 'repair'],
  },
  'heating': {
    id: 'heating',
    icon: Flame,
    title: 'Heating & Furnace Service',
    tagline: "When Texas gets cold, we've got you covered.",
    heroImage: '/images/hero-hvac-tech.jpg',
    accentColor: 'oklch(42% 0.22 22)',
    bgHint: 'warm',
    intro: `Don't let a rare Texas freeze catch you off guard. Texas AC Plus installs, repairs, and tunes up furnaces, heat pumps, and gas heating systems across the Rio Grande Valley. We know southern Texas doesn't freeze often — but when it does, the demand for heating service spikes overnight. Be ready.`,
    includes: [
      'Furnace safety inspection and carbon monoxide testing',
      'Heat exchanger crack detection',
      'Burner cleaning and ignition system check',
      'Heat pump installation and refrigerant charge verification',
      'Emergency heating service — same day, 24/7',
      'Seasonal tune-up packages available',
    ],
    why: `Gas furnace safety is non-negotiable. A cracked heat exchanger leaks carbon monoxide into your home's air supply — a silent, odorless danger. Every heating service we perform includes a full safety inspection, not just a filter swap.`,
    faqs: [
      { q: 'Do I need a furnace in South Texas?', a: 'Most RGV homes use heat pumps or dual-fuel systems. We recommend heat pump setups that double as efficient cooling systems in summer.' },
      { q: 'How often should I service my heating system?', a: 'Annually, before the winter season — even in south Texas. Dust, pests, and disuse can cause issues with a system that sits idle most of the year.' },
    ],
    related: ['ac-install', 'repair', 'smart-thermostats'],
  },
  'air-quality': {
    id: 'air-quality',
    icon: Wind,
    title: 'Air Quality & Maintenance',
    tagline: 'The air you breathe inside matters.',
    heroImage: '/images/texas-landscape.jpg',
    accentColor: 'oklch(48% 0.15 180)',
    bgHint: 'fresh',
    intro: `Most Texas homes cycle their indoor air with the same ductwork installed decades ago. Dust, mold spores, allergens, and humidity collect in places you can't see — then circulate through your living space. Texas AC Plus offers comprehensive indoor air quality solutions to protect your family's health and extend your HVAC system's lifespan.`,
    includes: [
      'Professional duct cleaning and sanitization',
      'HEPA-grade air filtration installation',
      'UV air purification systems (kills viruses and bacteria)',
      'Whole-home humidifier and dehumidifier installation',
      'Air quality testing and diagnostics',
      'Annual maintenance plan enrollment',
    ],
    why: `The EPA has found that indoor air can be 2–5x more polluted than outdoor air. Texas humidity makes it worse — creating conditions where mold and dust mites thrive. A properly maintained system with quality filtration makes a measurable difference in allergy symptoms and respiratory health.`,
    faqs: [
      { q: 'How often should air ducts be cleaned?', a: 'Every 3–5 years, or sooner if you notice dust buildup, musty smells, or reduced airflow from vents.' },
      { q: 'What is a UV air purifier?', a: 'A UV germicidal lamp installed in your air handler kills mold, bacteria, and viruses before they recirculate through your home. Highly effective in Texas humidity.' },
    ],
    related: ['ac-install', 'air-balancing', 'smart-thermostats'],
  },
  'air-balancing': {
    id: 'air-balancing',
    icon: Gauge,
    title: 'Air Balancing — Residential & Commercial',
    tagline: 'Every room. Every zone. Perfectly balanced.',
    heroImage: '/images/residential-ac.jpg',
    accentColor: 'oklch(42% 0.16 290)',
    bgHint: 'balance',
    intro: `Does one room in your home feel like a freezer while the next is sweltering? Are certain zones in your commercial building always too warm — no matter what you set the thermostat to? The problem usually isn't your equipment — it's airflow. Air balancing is the science of measuring and adjusting the volume of conditioned air delivered to each room and zone so the entire space reaches consistent, comfortable temperatures. Texas AC Plus provides professional air balancing for both residential homes and commercial properties across the Rio Grande Valley.`,
    includes: [
      'Room-by-room airflow measurement with calibrated instruments',
      'Supply and return duct static pressure testing',
      'Damper adjustment and register balancing',
      'Duct modification recommendations when needed',
      'Multi-zone commercial system optimization',
      'Rooftop unit (RTU) airflow verification',
      'TAB (Testing, Adjusting, and Balancing) reports for commercial properties',
      'Post-balance comfort verification walkthrough',
    ],
    why: `Most HVAC companies skip airflow testing entirely — they install or repair equipment and leave. But a perfectly functioning AC unit can still produce hot and cold spots if the ductwork isn't delivering the right volume of air to each space. We use professional-grade anemometers, manometers, and flow hoods to measure actual CFM delivery at every register. For commercial properties, we provide certified TAB reports that meet code compliance and building commissioning requirements.`,
    faqs: [
      { q: 'What is air balancing?', a: 'Air balancing is the process of testing and adjusting your HVAC system\'s airflow so every room or zone receives the correct amount of conditioned air. It eliminates hot spots, cold spots, and uneven temperatures throughout your space.' },
      { q: 'How do I know if I need air balancing?', a: 'Common signs include rooms that are always too hot or cold compared to others, excessive energy bills despite a functioning system, rooms that take much longer to cool or heat, and noisy airflow from certain vents.' },
      { q: 'Is air balancing different for residential vs. commercial?', a: 'The principles are the same, but commercial buildings have more complex multi-zone systems, variable air volume (VAV) boxes, and often require certified TAB reports. Residential balancing typically focuses on damper adjustments, register sizing, and duct modifications.' },
      { q: 'How long does air balancing take?', a: 'A typical residential home takes 2–4 hours. Commercial properties vary based on the number of zones — a small office may take half a day, while a large multi-story building could take several days.' },
    ],
    related: ['air-quality', 'ac-install', 'commercial-hvac'],
  },
  'repair': {
    id: 'repair',
    icon: Wrench,
    title: 'Diagnostics & Repair',
    tagline: 'Fast diagnosis. Same-day fix. No drama.',
    heroImage: '/images/hero-hvac-tech.jpg',
    accentColor: 'oklch(52% 0.14 65)',
    bgHint: 'repair',
    intro: `Your AC went down. In Texas. In July. We know — every hour matters. Texas AC Plus runs a fully stocked service fleet so we can diagnose and fix most HVAC problems in a single visit. Refrigerant leaks, blown capacitors, dirty coils, bad contactors — we see it all, and we come prepared.`,
    includes: [
      'Thorough diagnostic — not guesswork',
      'Refrigerant leak detection and recharge',
      'Capacitor, contactor, and relay replacement',
      'Compressor and fan motor diagnosis',
      'Thermostat and wiring fault repair',
      'Drain line cleaning and condensate pump service',
    ],
    why: `We charge a flat diagnostic fee, not an hourly "we'll see what we find" rate. You'll know the cost before we start any repair. If the repair exceeds what makes sense for your system's age, we'll give you an honest replacement recommendation — not pressure you into buying a new unit unnecessarily.`,
    faqs: [
      { q: 'Do you offer emergency same-day service?', a: 'Yes. We prioritize emergency calls and aim to have a technician on-site within 2 hours for urgent breakdowns during business hours.' },
      { q: 'What if the repair costs more than a new unit would?', a: "We'll tell you straight. If your system is near end-of-life and repair costs exceed 50% of replacement value, we'll give you both options with honest pricing for each." },
    ],
    related: ['ac-install', 'air-quality', 'commercial-hvac'],
  },
  'commercial-hvac': {
    id: 'commercial-hvac',
    icon: Building2,
    title: 'Commercial HVAC',
    tagline: 'Keep your business comfortable and your tenants cool.',
    heroImage: '/images/commercial-hvac.jpg',
    accentColor: 'oklch(30% 0.08 258)',
    bgHint: 'commercial',
    intro: `A failing HVAC system in a commercial building doesn't just affect comfort — it affects your bottom line. Employees leave, customers don't linger, food spoils. Texas AC Plus specializes in commercial HVAC service for restaurants, retail spaces, warehouses, medical offices, and multi-tenant buildings across the Rio Grande Valley.`,
    includes: [
      'Rooftop unit (RTU) installation, repair, and replacement',
      'Multi-zone and VRF system design',
      'Commercial refrigeration integration',
      'Preventive maintenance contracts (monthly/quarterly)',
      'Emergency commercial service, 24/7',
      'Building automation system (BAS) compatibility',
    ],
    why: `Commercial systems are more complex, and downtime is more expensive. We carry commercial parts on our trucks, maintain relationships with all major equipment distributors in the RGV, and offer service contracts that guarantee response times so you're never waiting days for a part.`,
    faqs: [
      { q: 'Do you work with restaurant and food service HVAC?', a: 'Absolutely. We understand the demand profiles and code requirements for commercial kitchen exhaust and makeup air systems.' },
      { q: 'Can you handle multi-building property portfolios?', a: 'Yes. We work with property management companies and offer centralized billing, scheduled maintenance visits, and dedicated service contacts.' },
    ],
    related: ['repair', 'air-balancing', 'smart-thermostats'],
  },
  'smart-thermostats': {
    id: 'smart-thermostats',
    icon: Zap,
    title: 'Smart Thermostats',
    tagline: 'Intelligent climate control that pays for itself.',
    heroImage: '/images/hero-hvac-tech.jpg',
    accentColor: 'oklch(45% 0.18 140)',
    bgHint: 'tech',
    intro: `A smart thermostat isn't just a gadget — it's an investment that typically pays back its cost in energy savings within the first year. Texas AC Plus installs and configures Nest, Ecobee, Honeywell Home, and other leading smart thermostat brands, ensuring they're properly paired with your specific HVAC system for maximum efficiency.`,
    includes: [
      'In-home compatibility assessment',
      'Full installation and wiring (C-wire install if needed)',
      'App setup and remote access configuration',
      'Geofencing and schedule programming',
      'Integration with Alexa, Google Home, Apple HomeKit',
      'Energy usage report walkthrough after 30 days',
    ],
    why: `Off-the-shelf smart thermostat installs go wrong more often than people realize. Compatibility issues with two-stage systems, heat pumps, or older wiring can cause erratic behavior. We assess your system first, ensure proper wiring, and test everything before we leave.`,
    faqs: [
      { q: 'Which smart thermostat brand do you recommend?', a: "It depends on your system and preferences. Ecobee is best for two-stage systems and has a built-in room sensor. Nest is excellent for single-stage homes and has the cleanest UI. We'll help you choose." },
      { q: 'Can a smart thermostat really save me money in Texas?', a: 'Yes. The average household saves 10–15% on cooling costs with a properly programmed smart thermostat. In Texas, where you run AC 9+ months a year, that adds up fast.' },
    ],
    related: ['ac-install', 'air-quality', 'repair'],
  },
  'generators': {
    id: 'generators',
    icon: Power,
    title: 'Generator Sales & Service',
    tagline: 'Reliable power when you need it most.',
    heroImage: '/images/commercial-hvac.jpg',
    accentColor: 'oklch(60% 0.18 45)',
    bgHint: 'tech',
    intro: `When the grid goes down, your business can't afford to stop. Texas AC Plus offers sales and rentals of heavy-duty commercial and industrial generators, ensuring critical facilities like hospitals, data centers, and manufacturing plants stay online. We provide units up to 250kW and beyond, tailored to your specific power requirements.`,
    includes: [
      'Industrial generator sales and installation',
      'Short and long-term generator rentals',
      'Sizing for 250kW and higher capacities',
      'Hospital and critical facility power solutions',
      'Preventive maintenance and load bank testing',
      '24/7 emergency support and fueling services',
    ],
    why: `Power reliability is non-negotiable for commercial and industrial operations. We don't just sell generators; we engineer solutions that seamlessly integrate with your existing electrical infrastructure. Our team handles everything from delivery and installation to ongoing maintenance and emergency refueling.`,
    faqs: [
      { q: 'What size generators do you offer?', a: 'We offer a wide range of sizes, specializing in large commercial and industrial units up to 250kW and beyond.' },
      { q: 'Can you support hospitals and medical facilities?', a: 'Yes. We provide backup power solutions that meet the strict compliance and reliability standards required for healthcare facilities.' },
      { q: 'Do you offer rental units for temporary power?', a: 'Absolutely. We offer flexible rental agreements for construction sites, events, or temporary outages.' }
    ],
    related: ['commercial-hvac', 'repair', 'ac-install'],
  },
};

const RELATED_TITLES: Record<string, string> = {
  'ac-install': 'AC Installation',
  'heating': 'Heating Service',
  'air-quality': 'Air Quality',
  'air-balancing': 'Air Balancing',
  'repair': 'Diagnostics & Repair',
  'commercial-hvac': 'Commercial HVAC',
  'smart-thermostats': 'Smart Thermostats',
  'generators': 'Generators',
};

interface ServicePageProps {
  serviceId: string;
}

export const ServicePage: React.FC<ServicePageProps> = ({ serviceId }) => {
  const service = SERVICE_DATA[serviceId];
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useCursorParallax(sectionRef as React.RefObject<HTMLElement | null>, bgRef as React.RefObject<HTMLElement | null>, 0.018);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2>Service not found.</h2>
        <a href="#services" className="btn-primary mt-6 inline-flex">Back to Services</a>
      </div>
    );
  }

  const Icon = service.icon;
  const isSnow = service.bgHint === 'cool';
  const isHeat = service.bgHint === 'warm' || service.bgHint === 'repair';

  return (
    <div style={{ backgroundColor: 'var(--color-off-white)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ minHeight: 'clamp(380px, 60vh, 560px)', display: 'flex', alignItems: 'flex-end' }}
      >
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${service.heroImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            scale: '1.04',
            transition: 'transform 80ms linear',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(160deg, ${service.accentColor.replace(')', ' / 0.9)')} 0%, oklch(12% 0.04 258 / 0.7) 100%)` }}
        />

        {/* Snowflakes for cool services */}
        {isSnow && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className="snowflake"
                style={{
                  left: `${Math.random() * 100}%`,
                  '--size': `${0.6 + Math.random() * 1}rem`,
                  '--fall-duration': `${4 + Math.random() * 4}s`,
                  '--fall-delay': `${Math.random() * 6}s`,
                  '--drift': `${(Math.random() - 0.5) * 80}px`,
                } as React.CSSProperties}
              >
                ❄
              </div>
            ))}
          </div>
        )}

        {/* Heat shimmer for warm services */}
        {isHeat && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, oklch(68% 0.13 68 / 0.04) 3px, oklch(68% 0.13 68 / 0.04) 4px)',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pb-16 pt-32">
          <a href="#services" className="back-btn mb-6 inline-flex" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </a>
          <div className="flex items-center gap-4 mb-4">
            <div
              style={{
                width: '52px',
                height: '52px',
                backgroundColor: 'rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1
            className="font-black italic uppercase text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 0.92, marginBottom: '1rem' }}
          >
            {service.title}
          </h1>
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-barlow)', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.04em' }}>
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2">
            <p className="font-barlow" style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--color-navy)', marginBottom: '3rem' }}>
              {service.intro}
            </p>

            <h2 className="font-black italic uppercase mb-6" style={{ fontSize: '1.8rem', color: 'var(--color-navy)', letterSpacing: '-0.01em' }}>
              What's <span style={{ color: 'var(--color-red)' }}>Included</span>
            </h2>
            <ul className="space-y-3 mb-12">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 items-start font-barlow" style={{ color: 'var(--color-steel)' }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                  <span style={{ lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                backgroundColor: 'var(--color-navy)',
                padding: '2rem',
                marginBottom: '3rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  backgroundColor: 'var(--color-gold)',
                }}
              />
              <h3 className="font-bold uppercase font-barlow mb-3" style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '0.18em' }}>
                Why Texas AC Plus
              </h3>
              <p className="font-barlow" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', lineHeight: 1.7 }}>
                {service.why}
              </p>
            </div>

            <h2 className="font-black italic uppercase mb-6" style={{ fontSize: '1.8rem', color: 'var(--color-navy)', letterSpacing: '-0.01em' }}>
              Common <span style={{ color: 'var(--color-red)' }}>Questions</span>
            </h2>
            <div className="space-y-6 mb-12">
              {service.faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid oklch(0% 0 0 / 0.08)', paddingBottom: '1.5rem' }}>
                  <h4 className="font-bold font-barlow mb-2" style={{ color: 'var(--color-navy)', fontSize: '1rem' }}>
                    {faq.q}
                  </h4>
                  <p className="font-barlow font-light" style={{ color: 'var(--color-steel)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div style={{ backgroundColor: 'var(--color-red)', padding: '2rem' }}>
              <h3 className="font-black italic uppercase text-white mb-3" style={{ fontSize: '1.5rem', lineHeight: 1.0 }}>
                Ready to Schedule?
              </h3>
              <p className="font-barlow text-white/80 mb-5" style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>
                Same-day service available. Free estimates on all installations.
              </p>
              <a href="tel:9562253834" className="btn-primary w-full justify-center" style={{ backgroundColor: 'white', color: 'var(--color-red)' }}>
                <Phone className="w-4 h-4" />
                (956) 225-3834
              </a>
            </div>

            {/* Related services */}
            <div style={{ backgroundColor: 'white', padding: '1.75rem' }}>
              <h4 className="font-bold uppercase font-barlow mb-4" style={{ color: 'var(--color-navy)', fontSize: '0.72rem', letterSpacing: '0.18em' }}>
                Related Services
              </h4>
              <ul className="space-y-2">
                {service.related.map((id) => (
                  <li key={id}>
                    <a
                      href={`#services/${id}`}
                      className="flex items-center gap-2 font-barlow font-semibold uppercase"
                      style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'var(--color-navy)', transition: 'color 150ms' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-red)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-navy)'; }}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                      {RELATED_TITLES[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* License badge */}
            <div style={{ backgroundColor: 'var(--color-off-white)', padding: '1.5rem', border: '1px solid oklch(0% 0 0 / 0.08)' }}>
              <p className="font-barlow font-bold uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                Licensed & Insured
              </p>
              <p className="font-barlow" style={{ fontSize: '0.85rem', color: 'var(--color-steel)', lineHeight: 1.5 }}>
                TACLA Licensed · Fully Bonded<br />
                Edinburgh, TX · Serving RGV
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ backgroundColor: 'var(--color-navy)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 className="font-black italic uppercase text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
          Questions? We Answer <span style={{ color: 'var(--color-gold)' }}>Fast.</span>
        </h2>
        <p className="font-barlow font-light mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', maxWidth: '36rem' }}>
          Call for a free estimate or to book same-day service. Real humans answer our phones.
        </p>
        <a href="tel:9562253834" className="btn-primary">
          <Phone className="w-4 h-4" />
          Call (956) 225-3834
        </a>
      </div>
    </div>
  );
};
