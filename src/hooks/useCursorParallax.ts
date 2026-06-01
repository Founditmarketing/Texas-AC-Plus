import { useEffect, RefObject } from 'react';

/**
 * useCursorParallax — shifts a target element's background-position
 * based on cursor position relative to the container center.
 *
 * @param containerRef  Ref to the container element (used for bounds)
 * @param targetRef     Ref to the element whose background-position shifts
 * @param intensity     How far background moves per cursor unit (default 0.02)
 */
export function useCursorParallax(
  containerRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  intensity = 0.02,
) {
  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    let rafId: number;

    function onMouseMove(e: MouseEvent) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * intensity;
        const dy = (e.clientY - cy) * intensity;
        target!.style.transform = `translate(${-dx}px, ${-dy}px) scale(1.06)`;
      });
    }

    function onMouseLeave() {
      cancelAnimationFrame(rafId);
      target!.style.transform = 'translate(0,0) scale(1.04)';
    }

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [intensity]);
}
