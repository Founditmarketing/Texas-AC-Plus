/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { SplitPanels } from './components/SplitPanels';
import { ServiceArea } from './components/ServiceArea';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CTABand, Footer } from './components/CTAAndFooter';
import { ContactSection } from './components/ContactSection';
import { MobileBottomDock } from './components/MobileBottomDock';
import { TermsOfService } from './components/TermsOfService';
import { ServicePage } from './components/ServicePage';
import { LocationsPage } from './components/LocationsPage';
import { LocationPage } from './components/LocationPage';
import { FinancingPage } from './components/FinancingPage';

/** Parse hash routing — handles nested routes like #services/ac-install */
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

function parseHash(hash: string): { page: string; sub: string | null } {
  // Remove leading #
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  const slashIdx = raw.indexOf('/');
  if (slashIdx === -1) return { page: raw, sub: null };
  return { page: raw.slice(0, slashIdx), sub: raw.slice(slashIdx + 1) };
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const hash = useHash();
  const { page, sub } = parseHash(hash);

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  /* ── Sub-page routes ── */
  if (page === 'terms') {
    return <TermsOfService />;
  }

  if (page === 'financing') {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '8px' }}>
          <FinancingPage />
        </div>
        <Footer />
        <MobileBottomDock />
        <div className="md:hidden" style={{ height: '58px' }} />
      </>
    );
  }

  if (page === 'services' && sub) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '8px' }}>
          <ServicePage serviceId={sub} />
        </div>
        <Footer />
        <MobileBottomDock />
        <div className="md:hidden" style={{ height: '58px' }} />
      </>
    );
  }

  if (page === 'locations' && !sub) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '8px' }}>
          <LocationsPage />
        </div>
        <Footer />
        <MobileBottomDock />
        <div className="md:hidden" style={{ height: '58px' }} />
      </>
    );
  }

  if (page === 'locations' && sub) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '8px' }}>
          <LocationPage locationId={sub} />
        </div>
        <Footer />
        <MobileBottomDock />
        <div className="md:hidden" style={{ height: '58px' }} />
      </>
    );
  }

  /* ── Main homepage ── */
  return (
    <div className="min-h-screen" id="main-container">
      <Navbar />

      <main>
        <Hero />
        <TrustBar />
        <Services />
        <SplitPanels />
        <WhyChooseUs />
        <ServiceArea />
        <ContactSection />
        <CTABand />
      </main>

      <Footer />

      {/* Mobile sticky CTA — always accessible */}
      <MobileBottomDock />

      {/* Mobile spacing buffer so content isn't hidden behind bottom dock */}
      <div className="md:hidden" style={{ height: '58px' }} />
    </div>
  );
}
