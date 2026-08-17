import { useEffect, type FC } from 'react';
import { SITE_URL } from '../seo-config';

interface PageSEOProps {
  title: string;
  description: string;
  /** Path this page actually serves at, e.g. '/services/ac-install' or '/'. */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  /** One or more schema.org JSON-LD objects to inject for this page only. */
  jsonLd?: object | object[];
  noindex?: boolean;
}

function setAttr(selector: string, attr: string, value: string): string | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return prev;
}

/**
 * Sets per-page title/description/canonical/OG tags and injects page-specific
 * JSON-LD, restoring the previous (index.html default) values on unmount.
 * Render once per page component — mount order matters, so keep it near the top.
 */
export const PageSEO: FC<PageSEOProps> = ({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  jsonLd,
  noindex = false,
}) => {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    const prevTitle = document.title;
    document.title = title;

    const prevDescription = setAttr('meta[name="description"]', 'content', description);
    const prevCanonical = setAttr('link[rel="canonical"]', 'href', canonicalUrl);
    const prevOgUrl = setAttr('meta[property="og:url"]', 'content', canonicalUrl);
    const prevOgTitle = setAttr('meta[property="og:title"]', 'content', ogTitle ?? title);
    const prevOgDescription = setAttr('meta[property="og:description"]', 'content', ogDescription ?? description);
    const prevRobots = noindex ? setAttr('meta[name="robots"]', 'content', 'noindex, nofollow') : null;

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      for (const item of Array.isArray(jsonLd) ? jsonLd : [jsonLd]) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(item);
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      document.title = prevTitle;
      if (prevDescription !== null) setAttr('meta[name="description"]', 'content', prevDescription);
      if (prevCanonical !== null) setAttr('link[rel="canonical"]', 'href', prevCanonical);
      if (prevOgUrl !== null) setAttr('meta[property="og:url"]', 'content', prevOgUrl);
      if (prevOgTitle !== null) setAttr('meta[property="og:title"]', 'content', prevOgTitle);
      if (prevOgDescription !== null) setAttr('meta[property="og:description"]', 'content', prevOgDescription);
      if (noindex && prevRobots !== null) setAttr('meta[name="robots"]', 'content', prevRobots);
      scripts.forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, ogTitle, ogDescription, noindex, jsonLdKey]);

  return null;
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
