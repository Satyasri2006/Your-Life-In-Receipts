import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale';
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const baseClass = variant === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${revealed ? 'revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
