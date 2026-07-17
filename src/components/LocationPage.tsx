import React, { useRef, useEffect } from 'react';
import { MapPin, Phone, CheckCircle, ArrowLeft, Star } from 'lucide-react';
import { useCursorParallax } from '../hooks/useCursorParallax';
import { LOCATIONS, type LocationData } from './LocationsPage';

/* Detailed content per city */
const LOCATION_CONTENT: Record<string, {
  headline: string;
  intro: string;
  services: string[];
  trust: string;
  nearby: string[];
  reviewName: string;
  reviewText: string;
}> = {
  mcallen: {
    headline: "McAllen's Trusted HVAC Team",
    intro: `McAllen is the commercial and cultural hub of the Rio Grande Valley — and one of the fastest-growing cities in Texas. With dense residential neighborhoods, booming retail corridors, and a medical district that demands reliable climate control 365 days a year, Texas AC Plus has been a trusted HVAC partner throughout the city since 2009.`,
    services: [
      'Emergency AC repair — same-day service in McAllen',
      'New system installation for McAllen homes and condos',
      'Commercial HVAC for McAllen retail and medical offices',
      'Duct cleaning and air quality testing',
      'Smart thermostat installation and setup',
    ],
    trust: 'Trusted by 400+ McAllen families and businesses',
    nearby: ['Edinburg', 'Pharr', 'Mission', 'San Juan'],
    reviewName: 'Maria R. — McAllen',
    reviewText: 'AC went out on a Saturday afternoon in July. Texas AC Plus was at our house within two hours. Fixed in one visit. That kind of service is rare.',
  },
  edinburg: {
    headline: 'Edinburgh: Where We Call Home',
    intro: `Edinburgh is more than our base of operations — it's our community. Texas AC Plus was founded here in 2009, and we've built our reputation on the same streets our technicians live on. When you call us in Edinburgh, you're not calling a franchise dispatch center. You're calling your neighbor.`,
    services: [
      'Same-day AC service throughout Edinburgh',
      'Residential system replacements and upgrades',
      'University-area apartment HVAC maintenance',
      'Seasonal tune-up plans',
      'Free in-home estimates for all new system installs',
    ],
    trust: 'Edinburgh is home — we treat it that way',
    nearby: ['McAllen', 'Pharr', 'Mission', 'Weslaco'],
    reviewName: 'Carlos M. — Edinburg',
    reviewText: "They replaced our entire AC system in one day. Price was fair, work was clean, and they cleaned up after themselves. Couldn't ask for more.",
  },
  harlingen: {
    headline: 'Full Coverage Across Cameron County',
    intro: `Harlingen and Cameron County sit at the southern tip of Texas, where the heat is relentless and the humidity can make even a brief AC outage miserable. Texas AC Plus extends its full service coverage across Harlingen, San Benito, and the surrounding Cameron County communities, offering the same fast response and quality work that's made us the RGV's go-to HVAC team.`,
    services: [
      'Emergency HVAC repair throughout Harlingen',
      'New AC and heat pump installation',
      'Commercial building HVAC service',
      'Air quality assessments and duct work',
      'Preventive maintenance agreements',
    ],
    trust: 'Cameron County coverage — same fast response',
    nearby: ['San Benito', 'Weslaco', 'Mercedes', 'Brownsville'],
    reviewName: 'James T. — Harlingen',
    reviewText: 'I was worried about getting service all the way out here. They were professional, on time, and fixed the problem right the first time. Highly recommend.',
  },
  mission: {
    headline: 'Mission: The Heart of the Citrus Belt',
    intro: `Mission is proud of its roots — the citrus groves, the border culture, and the tight-knit neighborhoods that make it one of the most welcoming cities in the Valley. Texas AC Plus serves Mission homes and businesses with the same respect for community that the city embodies. From historic downtown to the newer subdivisions along Mile 2, we've got you covered.`,
    services: [
      'Residential AC repair and replacement in Mission',
      'Mini-split installation for room additions',
      'Commercial HVAC for Mission businesses',
      '24/7 emergency heating and cooling service',
      'Smart thermostat upgrades',
    ],
    trust: '24/7 emergency availability in Mission',
    nearby: ['McAllen', 'Palmview', 'Penitas', 'Sullivan City'],
    reviewName: 'Linda G. — Mission',
    reviewText: "We called at 9pm on a weeknight — they picked up and had someone here by 10:30. Fixed the problem and even checked the rest of our system. Incredible service.",
  },
  weslaco: {
    headline: "Weslaco's Highest-Rated HVAC Service",
    intro: `Weslaco is where the birding is world-class and the community spirit runs deep. It's also one of the hottest spots in the Rio Grande Valley during peak summer months. Texas AC Plus maintains a 4.9-star average across all platforms in Weslaco — driven by fast response, honest pricing, and technicians who explain exactly what they're doing before they do it.`,
    services: [
      'AC tune-ups and seasonal maintenance',
      'Full system replacement with free estimates',
      'Indoor air quality and duct cleaning',
      'Smart thermostat installation',
      'Same-day emergency repair service',
    ],
    trust: '4.9-star rated in Weslaco',
    nearby: ['Mercedes', 'Donna', 'Harlingen', 'Edinburg'],
    reviewName: 'Robert K. — Weslaco',
    reviewText: 'They did an honest assessment and told me my old unit could be repaired rather than replaced. Saved me $3,000. That kind of integrity is everything.',
  },
  pharr: {
    headline: "Serving Pharr's Growing Community",
    intro: `Pharr has grown rapidly over the last decade, with new residential developments, an expanding commercial corridor, and a community that expects the same quality services as anywhere else in the Valley. Texas AC Plus has been meeting that demand since day one — with fully stocked service trucks, certified technicians, and the fastest response times in the area.`,
    services: [
      'New construction HVAC installation',
      'Emergency AC repair throughout Pharr',
      'Commercial HVAC for retail and restaurants',
      'Mini-split and ductless system installation',
      'Preventive maintenance packages',
    ],
    trust: '200+ Pharr jobs completed',
    nearby: ['Edinburg', 'McAllen', 'San Juan', 'Alamo'],
    reviewName: 'Ana V. — Pharr',
    reviewText: "Got three quotes. Texas AC Plus wasn't the cheapest, but they explained everything and had the best warranty. One year later — zero issues. Money well spent.",
  },
};

interface LocationPageProps {
  locationId: string;
}

export const LocationPage: React.FC<LocationPageProps> = ({ locationId }) => {
  const loc = LOCATIONS.find((l) => l.id === locationId);
  const content = LOCATION_CONTENT[locationId];
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useCursorParallax(sectionRef as React.RefObject<HTMLElement | null>, bgRef as React.RefObject<HTMLElement | null>, 0.018);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [locationId]);

  if (!loc || !content) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 className="font-black italic uppercase" style={{ color: 'var(--color-navy)' }}>Location not found.</h2>
        <a href="#locations" className="btn-primary mt-6 inline-flex">Back to Locations</a>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-off-white)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ minHeight: 'clamp(380px, 58vh, 540px)', display: 'flex', alignItems: 'flex-end' }}
      >
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${loc.heroImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            scale: '1.04',
            transition: 'transform 80ms linear',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${loc.accentColor.replace(')', ' / 0.88)')} 0%, oklch(14% 0.05 258 / 0.8) 100%)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pb-14 pt-40">
          <a href="#locations" className="back-btn mb-5 inline-flex" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ArrowLeft className="w-4 h-4" />
            All Locations
          </a>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4" style={{ color: 'var(--color-gold)' }} />
            <span className="font-barlow font-semibold uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--color-gold)' }}>
              {loc.county}
            </span>
          </div>
          <h1
            className="font-black italic uppercase text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.025em', lineHeight: 0.9, marginBottom: '1rem' }}
          >
            {loc.city}
          </h1>
          <p className="font-barlow font-semibold" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem' }}>
            {loc.tagline}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main */}
          <div className="md:col-span-2">
            <h2 className="font-black italic uppercase mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--color-navy)', letterSpacing: '-0.02em' }}>
              {content.headline}
            </h2>
            <p className="font-barlow" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-steel)', marginBottom: '2.5rem' }}>
              {content.intro}
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-navy)',
                padding: '2rem',
                marginBottom: '2.5rem',
              }}
            >
              <h3 className="font-bold uppercase font-barlow mb-4" style={{ color: 'var(--color-gold)', fontSize: '0.72rem', letterSpacing: '0.18em' }}>
                Services Available in {loc.city}
              </h3>
              <ul className="space-y-3">
                {content.services.map((s) => (
                  <li key={s} className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                    <span className="font-barlow" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem', lineHeight: 1.5 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Review */}
            <div
              style={{
                backgroundColor: 'white',
                padding: '1.75rem',
                borderTop: '3px solid var(--color-gold)',
                marginBottom: '2.5rem',
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ color: 'var(--color-gold)', fill: 'var(--color-gold)' }} />
                ))}
              </div>
              <p className="font-barlow italic" style={{ color: 'var(--color-steel)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>
                "{content.reviewText}"
              </p>
              <span className="font-barlow font-bold uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--color-navy)' }}>
                — {content.reviewName}
              </span>
            </div>

            {/* Nearby cities */}
            <div>
              <h4 className="font-bold uppercase font-barlow mb-3" style={{ color: 'var(--color-steel)', fontSize: '0.68rem', letterSpacing: '0.18em' }}>
                Also Serving Nearby
              </h4>
              <div className="flex flex-wrap gap-2">
                {content.nearby.map((city) => (
                  <span
                    key={city}
                    className="font-barlow font-semibold uppercase"
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      backgroundColor: 'white',
                      color: 'var(--color-navy)',
                      padding: '0.35rem 0.8rem',
                      border: '1px solid oklch(0% 0 0 / 0.1)',
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Trust badge */}
            <div
              style={{
                backgroundColor: loc.accentColor.replace(')', ' / 0.08)').replace('oklch', 'oklch'),
                border: `1px solid ${loc.accentColor.replace(')', ' / 0.2)')}`,
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div className="text-3xl font-black font-barlow mb-1" style={{ color: loc.accentColor, letterSpacing: '-0.02em' }}>
                {loc.stat}
              </div>
              <div className="font-barlow uppercase font-semibold" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--color-steel)' }}>
                {loc.statLabel}
              </div>
            </div>

            {/* Call CTA */}
            <div style={{ backgroundColor: 'var(--color-red)', padding: '2rem' }}>
              <h3 className="font-black italic uppercase text-white mb-3" style={{ fontSize: '1.35rem', lineHeight: 1.0 }}>
                Service {loc.city}?
              </h3>
              <p className="font-barlow text-white/80 mb-5" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
                Same-day service. Free estimates. Real humans answer.
              </p>
              <a href="tel:9562253834" className="btn-primary w-full justify-center" style={{ backgroundColor: 'white', color: 'var(--color-red)' }}>
                <Phone className="w-4 h-4" />
                (956) 225-3834
              </a>
            </div>

            {/* Other locations */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem' }}>
              <h4 className="font-bold uppercase font-barlow mb-3" style={{ color: 'var(--color-navy)', fontSize: '0.68rem', letterSpacing: '0.18em' }}>
                Other Locations
              </h4>
              <ul className="space-y-2">
                {LOCATIONS.filter((l) => l.id !== locationId).map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#locations/${l.id}`}
                      className="font-barlow font-semibold uppercase flex items-center gap-2"
                      style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'var(--color-steel)', transition: 'color 150ms' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-red)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-steel)'; }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {l.city}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ backgroundColor: 'var(--color-navy)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 className="font-black italic uppercase text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
          Serving <span style={{ color: 'var(--color-gold)' }}>{loc.city}</span> Daily.
        </h2>
        <p className="font-barlow font-light mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '34rem' }}>
          {loc.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:9562253834" className="btn-primary">
            <Phone className="w-4 h-4" />
            Call (956) 225-3834
          </a>
          <a href="#locations" className="btn-outline">
            View All Locations
          </a>
        </div>
      </div>
    </div>
  );
};
