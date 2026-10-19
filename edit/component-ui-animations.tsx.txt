'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'motion/react';

/* -------------------------------------------------------------------------- */
/* ScrollProgressBar — 2px bar pinned to the top of the viewport               */
/* Spring-smoothed so it never looks jittery under high-FPS scroll             */
/* -------------------------------------------------------------------------- */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-brand-800"
      style={{ scaleX }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* BackToTop — appears once the user is >600px down, slides out when near top  */
/* -------------------------------------------------------------------------- */

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-700 shadow-sm hover:border-ink-300 hover:text-brand-800"
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* MotionReveal — fade+slide on viewport entry. Respects prefers-reduced-motion*/
/* delay in SECONDS. stagger: pass an index + a per-step gap for lists.         */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
};

export function MotionReveal({
  children,
  delay = 0,
  y = 16,
  once = true,
  className,
  as = 'div',
}: RevealProps) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -5% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </MotionTag>
  );
}
