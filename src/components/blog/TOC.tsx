'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { TOCEntry } from '@/lib/toc';

type Props = { entries: TOCEntry[] };

/* -------------------------------------------------------------------------- */
/* Shared scroll-spy hook — observes the article's actual DOM headings and     */
/* reports the id of the one closest to the top of the viewport.               */
/* -------------------------------------------------------------------------- */

function useActiveHeading(entries: TOCEntry[]): string | null {
  const [active, setActive] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    if (entries.length === 0) return;
    const ids = entries.map((e) => e.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);
    if (nodes.length === 0) return;

    const visible = new Map<string, number>(); // id → intersectionRatio
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) visible.set(r.target.id, r.intersectionRatio);
          else visible.delete(r.target.id);
        }
        if (visible.size === 0) return;
        // Pick the first id in document order that is currently visible
        for (const id of ids) {
          if (visible.has(id)) {
            setActive(id);
            return;
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [entries]);

  return active;
}

/* -------------------------------------------------------------------------- */
/* Desktop TOC — right-side rail, sticky, shown ≥ lg (1024px).                 */
/* -------------------------------------------------------------------------- */

export function TOCDesktop({ entries }: Props) {
  const active = useActiveHeading(entries);
  if (entries.length === 0) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="sticky top-24 hidden h-[calc(100vh-6rem)] overflow-y-auto lg:block"
    >
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[1.5px] text-ink-500">
        In this article
      </div>
      <ul className="space-y-1.5 border-l border-ink-100">
        {entries.map((e) => {
          const isActive = active === e.id;
          return (
            <li key={e.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-active-indicator"
                  className="absolute -left-px top-0 h-full w-[2px] bg-brand-800"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <a
                href={`#${e.id}`}
                className={
                  'block py-1 pl-4 text-[13px] leading-snug transition-colors ' +
                  (e.level === 3 ? 'pl-7 ' : '') +
                  (isActive ? 'text-brand-900 font-medium' : 'text-ink-500 hover:text-ink-900')
                }
              >
                {e.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile TOC — collapsible block above article body, shown < lg.              */
/* -------------------------------------------------------------------------- */

export function TOCMobile({ entries }: Props) {
  const [open, setOpen] = useState(false);
  const active = useActiveHeading(entries);
  const ref = useRef<HTMLDetailsElement>(null);

  // auto-close after a jump
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (ev: Event) => {
      const t = ev.target as HTMLElement;
      if (t.tagName === 'A') setOpen(false);
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, []);

  if (entries.length === 0) return null;

  return (
    <details
      ref={ref}
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className="mb-8 rounded-lg border border-ink-100 bg-paper px-4 py-3 lg:hidden"
    >
      <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-ink-900 marker:hidden">
        <span>In this article</span>
        <span className={'text-ink-500 transition ' + (open ? 'rotate-180' : '')}>▾</span>
      </summary>
      <ul className="mt-3 space-y-1 border-t border-ink-100 pt-3">
        {entries.map((e) => {
          const isActive = active === e.id;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className={
                  'block py-1 text-[13px] ' +
                  (e.level === 3 ? 'pl-4 ' : '') +
                  (isActive ? 'text-brand-800 font-medium' : 'text-ink-700')
                }
              >
                {e.text}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
