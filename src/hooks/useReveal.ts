import { useEffect, RefObject } from 'react';

/**
 * useReveal — fires IntersectionObserver on a section ref,
 * staggering each `.reveal` child into view.
 *
 * @param ref       - React ref to the container element
 * @param stagger   - ms delay between each child (default 80ms)
 * @param threshold - IO threshold to trigger (default 0.1)
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  stagger = 80,
  threshold = 0.1,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            setTimeout(() => node.classList.add('is-visible'), i * stagger);
          });
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}
