import React, { useEffect, useRef, useState } from 'react';

/**
 * useCountUp — RAF-driven animated counter with expo-out easing.
 * Starts when the element enters the viewport (via IntersectionObserver).
 *
 * @param target     Final numeric value to count to
 * @param duration   Animation duration in ms (default 1800)
 * @param threshold  IO visibility threshold (default 0.2)
 */
export function useCountUp(
  target: number,
  duration = 1800,
  threshold = 0.2,
): [number, React.RefObject<HTMLElement | null>] {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.unobserve(el);

          let startTime: number | null = null;
          const startValue = 0;

          function easeOutExpo(t: number): number {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          }

          function tick(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = Math.round(startValue + (target - startValue) * easedProgress);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(target);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return [count, ref];
}
