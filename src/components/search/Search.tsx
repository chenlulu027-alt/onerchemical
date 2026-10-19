'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import { LocalizedLink } from '@/components/LocalizedLink';

/* -------------------------------------------------------------------------- */
/* Types shared with /public/search-index.json                                 */
/* -------------------------------------------------------------------------- */

export type SearchDoc = {
  slug: string;
  title: string;
  excerpt: string;
  cluster: string;        // human label, not key
  searchKeywords: string[];
  type: 'article' | 'page';
  url: string;            // canonical path, e.g. "/blog/<slug>"
};

/* -------------------------------------------------------------------------- */
/* OS-aware keybinding display                                                 */
/* -------------------------------------------------------------------------- */

function isMac(): boolean {
  if (typeof navigator === 'undefined') return false;
  // userAgentData is the modern API; fallback to platform for Firefox / older Safari.
  const uaData = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData;
  const platform = uaData?.platform ?? navigator.platform ?? '';
  return /mac/i.test(platform);
}

function KbdHint() {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(isMac()), []);
  return (
    <kbd className="pointer-events-none inline-flex items-center gap-1 rounded border border-ink-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-ink-500">
      {mac ? <>⌘ K</> : <>Ctrl K</>}
    </kbd>
  );
}

/* -------------------------------------------------------------------------- */
/* Context + global shortcut                                                   */
/* -------------------------------------------------------------------------- */

type SearchContextValue = {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};
const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(() => ({ open, openSearch, closeSearch }), [open, openSearch, closeSearch]);
  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchModal />
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>');
  return ctx;
}

/* -------------------------------------------------------------------------- */
/* Header trigger button                                                       */
/* -------------------------------------------------------------------------- */

export function SearchButton() {
  const { openSearch } = useSearch();
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search"
      className="group hidden items-center gap-2 rounded-md border border-ink-100 bg-paper/60 px-2.5 py-1.5 text-xs text-ink-500 hover:border-ink-300 hover:text-ink-900 md:flex"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
      <span>Search</span>
      <KbdHint />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Modal — lazy-fetches /search-index.json once per session                    */
/* -------------------------------------------------------------------------- */

function useSearchIndex(enabled: boolean): { docs: SearchDoc[]; loading: boolean; error: string | null } {
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!enabled || fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    fetch('/search-index.json', { cache: 'force-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`index: ${r.status}`);
        return r.json();
      })
      .then((j: SearchDoc[]) => setDocs(j))
      .catch((e) => setError(e instanceof Error ? e.message : 'load failed'))
      .finally(() => setLoading(false));
  }, [enabled]);

  return { docs, loading, error };
}

function useFuse(docs: SearchDoc[]) {
  return useMemo(
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
      }),
    [docs],
  );
}

function SearchModal() {
  const { open, closeSearch } = useSearch();
  const { docs, loading } = useSearchIndex(open);
  const fuse = useFuse(docs);
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!q.trim()) return docs.slice(0, 8).map((d) => ({ item: d, refIndex: 0 }));
    return fuse.search(q).slice(0, 8);
  }, [q, docs, fuse]);

  useEffect(() => setCursor(0), [q, open]);
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
    else setQ('');
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    else if (e.key === 'Enter') {
      const hit = results[cursor];
      if (hit) { closeSearch(); router.push(hit.item.url); }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={closeSearch}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-500">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles, topics, keywords…"
                className="flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-300"
              />
              <KbdHint />
            </div>

            <div className="max-h-[min(60vh,480px)] overflow-y-auto p-2">
              {loading && <p className="px-3 py-6 text-sm text-ink-500">Loading index…</p>}
              {!loading && results.length === 0 && (
                <p className="px-3 py-6 text-sm text-ink-500">
                  No results for &ldquo;{q}&rdquo;. Try a broader term.
                </p>
              )}
              <ul>
                {results.map((r, i) => (
                  <li key={r.item.slug + i}>
                    <LocalizedLink
                      href={r.item.url}
                      onClick={closeSearch}
                      className={
                        'block rounded-md px-3 py-2.5 ' +
                        (i === cursor ? 'bg-brand-50' : 'hover:bg-paper')
                      }
                    >
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[1.5px] text-brand-800">
                          {r.item.cluster}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-ink-900">{r.item.title}</div>
                      <div className="mt-0.5 line-clamp-1 text-xs text-ink-500">{r.item.excerpt}</div>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-ink-100 bg-paper px-4 py-2 text-[11px] text-ink-500">
              <span>↑↓ navigate · ↵ open · esc close</span>
              <LocalizedLink href="/search" onClick={closeSearch} className="hover:text-brand-800">
                Advanced search →
              </LocalizedLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
