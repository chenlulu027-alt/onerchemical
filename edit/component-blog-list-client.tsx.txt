'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LocalizedLink } from '@/components/LocalizedLink';
import { CLUSTERS, type BlogArticle, type ClusterKey } from '@/lib/blog-registry';

type Filter = 'all' | ClusterKey;

export function BlogListClient({ articles }: { articles: BlogArticle[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = useMemo(
    () => (filter === 'all' ? articles : articles.filter((a) => a.cluster === filter)),
    [filter, articles],
  );
  const clusterKeys = Object.keys(CLUSTERS) as ClusterKey[];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10 border-b border-ink-100 pb-10">
        <h1 className="mb-3 font-serif text-5xl font-normal text-ink-900">Research</h1>
        <p className="max-w-2xl text-lg text-ink-500">
          Technical articles on cosmetic preservation chemistry, challenge testing, regulation, and
          formulation strategy.
        </p>
      </header>

      <nav aria-label="Cluster filter" className="relative mb-10 flex flex-wrap gap-1.5">
        <Tab active={filter === 'all'} id="all" onClick={() => setFilter('all')}>All</Tab>
        {clusterKeys.map((k) => (
          <Tab key={k} active={filter === k} id={k} onClick={() => setFilter(k)}>
            {CLUSTERS[k].label}
          </Tab>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-ink-500">No articles in this cluster yet.</p>
      ) : (
        <ul className="divide-y divide-ink-100 border-t border-ink-100">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((a, i) => (
              <motion.li
                key={a.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.2) }}
              >
                <LocalizedLink
                  href={`/blog/${a.slug}`}
                  className="group block py-6 transition hover:bg-paper/60"
                >
                  <div className="mb-2 text-[10px] uppercase tracking-[1.5px] text-brand-800">
                    {CLUSTERS[a.cluster].label}
                  </div>
                  <h2 className="mb-2 font-serif text-2xl font-normal text-ink-900 group-hover:text-brand-900">
                    {a.title}
                  </h2>
                  <p className="mb-3 text-base leading-relaxed text-ink-500">{a.excerpt}</p>
                  <div className="text-xs text-ink-500">
                    {a.author} ·{' '}
                    {new Date(a.datePublished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    · {a.readingMinutes} min read
                  </div>
                </LocalizedLink>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}

function Tab({
  active,
  id,
  onClick,
  children,
}: {
  active: boolean;
  id: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-full px-4 py-1.5 text-xs text-ink-700 transition hover:text-ink-900"
    >
      {active && (
        <motion.span
          layoutId="active-tab-pill"
          className="absolute inset-0 rounded-full bg-brand-800"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}
      <span className={'relative z-10 ' + (active ? 'font-medium text-white' : '')}>{children}</span>
    </button>
  );
}
