'use client';

import { motion } from 'motion/react';
import { LocalizedLink } from '@/components/LocalizedLink';
import { MotionReveal } from '@/components/ui/animations';

/* -------------------------------------------------------------------------- */
/* Hero — entrance stagger (eyebrow → H1 lines → copy → CTAs)                  */
/* -------------------------------------------------------------------------- */

export function HomeHero({ orgLegal }: { orgLegal: string }) {
  return (
    <section className="border-b border-ink-100">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.div
          className="mb-4 text-[11px] uppercase tracking-[1.5px] text-ink-500"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          A technical resource from {orgLegal}
        </motion.div>

        <h1 className="mb-6 max-w-3xl font-serif text-5xl font-normal leading-[1.1] tracking-tight text-ink-900 md:text-6xl">
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            The science of
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            cosmetic preservation.
          </motion.span>
        </h1>

        <motion.p
          className="mb-8 max-w-xl text-lg leading-relaxed text-ink-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          Peer-reviewed guidance on preservative selection, challenge testing, and compliance across
          EU, US, and APAC markets — written for formulators, by chemists.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.44 }}
        >
          <LocalizedLink
            href="/blog"
            className="rounded-md bg-brand-800 px-5 py-2.5 text-sm text-white transition hover:bg-brand-900"
          >
            Browse the knowledge base
          </LocalizedLink>
          <LocalizedLink
            href="/products/phenoxyethanol-supply"
            className="rounded-md border border-ink-300 bg-white px-5 py-2.5 text-sm text-ink-900 transition hover:border-ink-500"
          >
            Request a custom quote
          </LocalizedLink>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                 */
/* -------------------------------------------------------------------------- */

export function TrustStrip() {
  const stats = [
    { value: '14+', label: 'Years in cosmetic ingredients' },
    { value: 'ISO 9001', label: 'Certified manufacturing' },
    { value: '40+', label: 'Countries served' },
  ];
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3">
        {stats.map((s, i) => (
          <MotionReveal key={s.label} delay={i * 0.08}>
            <div className="font-serif text-2xl font-medium text-ink-900">{s.value}</div>
            <div className="mt-0.5 text-sm text-ink-500">{s.label}</div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Latest research grid                                                        */
/* -------------------------------------------------------------------------- */

type Card = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  readingMinutes: number;
  clusterLabel: string;
};

export function LatestResearchGrid({ cards }: { cards: Card[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <MotionReveal>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-normal text-ink-900">Latest from the knowledge base</h2>
          <LocalizedLink href="/blog" className="text-sm text-brand-800 hover:text-brand-900">
            View all →
          </LocalizedLink>
        </div>
      </MotionReveal>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <MotionReveal key={c.slug} delay={i * 0.07}>
            <LocalizedLink
              href={`/blog/${c.slug}`}
              className="group block h-full rounded-lg border border-ink-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-sm"
            >
              <div className="mb-2 text-[10px] uppercase tracking-[1.5px] text-brand-800">
                {c.clusterLabel}
              </div>
              <h3 className="mb-3 font-serif text-xl font-normal leading-snug text-ink-900 group-hover:text-brand-900">
                {c.title}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-500">{c.excerpt}</p>
              <div className="text-xs text-ink-500">
                {c.author} · {c.readingMinutes} min read
              </div>
            </LocalizedLink>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
