'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { LocalizedLink } from '@/components/LocalizedLink';
import type { SearchDoc } from '@/components/search/Search';

type Props = { initialQuery: string };

export function SearchPageClient({ initialQuery }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/search-index.json', { cache: 'force-cache' })
      .then((r) => r.json())
      .then((j: SearchDoc[]) => setDocs(j))
      .finally(() => setLoading(false));
  }, []);

  // keep URL in sync (?q=…) without full navigations
  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    router.replace(url.pathname + url.search, { scroll: false });
  }, [q, router]);

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'searchKeywords', weight: 2 },
          { name: 'excerpt', weight: 1 },
          { name: 'cluster', weight: 0.5 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeMatches: true,
      }),
    [docs],
  );

  const results = useMemo(() => {
    if (!q.trim()) return docs.map((d) => ({ item: d, refIndex: 0 }));
    return fuse.search(q);
  }, [q, docs, fuse]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 font-serif text-4xl font-normal text-ink-900">Search</h1>

      <div className="mb-8 flex items-center gap-3 rounded-lg border border-ink-300 bg-white px-4 py-3 focus-within:border-brand-600">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-500">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles, topics, keywords…"
          autoFocus
          className="flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-300"
        />
        <span className="text-xs text-ink-500">{results.length} result{results.length === 1 ? '' : 's'}</span>
      </div>

      {loading ? (
        <p className="text-sm text-ink-500">Loading index…</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-ink-500">
          No results for &ldquo;{q}&rdquo;. Try a broader term, or browse{' '}
          <LocalizedLink href="/blog" className="text-brand-800 hover:underline">
            all articles
          </LocalizedLink>
          .
        </p>
      ) : (
        <ul className="divide-y divide-ink-100 border-t border-ink-100">
          {results.map((r) => (
            <li key={r.item.slug}>
              <LocalizedLink
                href={r.item.url}
                className="group block py-5 transition hover:bg-paper/60"
              >
                <div className="mb-1 text-[10px] uppercase tracking-[1.5px] text-brand-800">
                  {r.item.cluster}
                </div>
                <h2 className="mb-1.5 font-serif text-xl font-normal text-ink-900 group-hover:text-brand-900">
                  {r.item.title}
                </h2>
                <p className="text-sm text-ink-500">{r.item.excerpt}</p>
              </LocalizedLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
