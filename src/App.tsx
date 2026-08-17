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
import { PricingCalculatorPage } from './components/PricingCalculatorPage';
import { PageSEO } from './components/PageSEO';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from './seo-config';

/** Real page routes that used to live under a #hash before the path-routing migration. */
const LEGACY_HASH_PAGE_PREFIXES = new Set(['services', 'locations', 'financing', 'terms']);

/**
 * Old bookmarks/links pointed at e.g. /#services/ac-install. Since fragments never
 * reach the server, this can only be fixed client-side: rewrite the URL to the real
 * path (/services/ac-install) via replaceState before the first render.
 */
function resolveInitialPath(): string {
  const { pathname, hash } = window.location;
  if (pathname === '/' && hash) {
    const raw = hash.startsWith('#') ? hash.slice(1) : hash;
    const [first] = raw.split('/');
    if (raw && LEGACY_HASH_PAGE_PREFIXES.has(first)) {
      const newPath = '/' + raw;
      window.history.replaceState({}, '', newPath);
      return newPath;
    }
  }
  return pathname;
}

function parsePath(pathname: string): { page: string; sub: string | null } {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return { page: '', sub: null };
  return { page: parts[0], sub: parts[1] ?? null };
}

/** Client-side router: pathname-based navigation via the History API. */
function usePathRouter() {
  const [path, setPath] = useState(() => resolveInitialPath());

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      // Only intercept our own root-relative links (/, /services/x, /#contact, ...) —
      // tel:, mailto:, external URLs, and protocol-relative //links pass through untouched.
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (anchor.target && anchor.target !== '_self') return;

      const url = new URL(href, window.location.origin);
      const samePath = url.pathname === window.location.pathname;
      // Pure in-page anchor on the current page — let the browser's native scroll happen.
      if (samePath && url.hash) return;

      e.preventDefault();
      window.history.pushState({}, '', url.pathname + url.hash);
      setPath(url.pathname);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (url.hash) {
          document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return path;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const path = usePathRouter();
  const { page, sub } = parsePath(path);
  const showPricingTool = page === 'pricing';

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  // Skip the splash for the internal calculator — it's a field tool that
  // needs to open instantly.
  if (showSplash && !showPricingTool) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  /* ── Sub-page routes ── */
  if (page === 'terms') {
    return <TermsOfService />;
  }

  /* Internal pricing tool — intentionally NOT linked from nav, footer, or
     sitemap; the page sets a noindex robots meta while mounted. */
  if (showPricingTool) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '8px' }}>
          <PricingCalculatorPage />
        </div>
        <Footer />
        {/* No MobileBottomDock here — the calculator has its own sticky price bar */}
      </>
    );
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
      <PageSEO title={DEFAULT_TITLE} description={DEFAULT_DESCRIPTION} path="/" />
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
