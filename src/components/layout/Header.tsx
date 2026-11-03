/**
 * Place at: src/components/layout/Header.tsx  (REPLACES existing file)
 *
 * Day 1 of P0-1: adds a Research dropdown exposing the 5 cluster index pages
 * created in src/app/blog/cluster/[key]/page.tsx.
 *
 * Changes vs previous Header:
 *   - "Research" is now a dropdown button (hover + click)
 *   - Dropdown lists "All articles" + 5 cluster entries
 *   - Everything else (Preservatives, About, SearchButton, Request sample, LanguageSwitcher)
 *     is unchanged
 *   - Mobile behaviour unchanged (nav is hidden md:flex as before — mobile menu
 *     is a separate concern, not shipped in Day 1)
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { LocalizedLink } from '@/components/LocalizedLink';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useQuote } from '@/context/QuoteContext';
import { SearchButton } from '@/components/search/Search';
import { CLUSTERS, type ClusterKey } from '@/lib/blog-registry';

export function Header() {
  const { openQuote } = useQuote();
  const [researchOpen, setResearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setResearchOpen(false);
      }
    };
    if (researchOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [researchOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setResearchOpen(false);
    };
    if (researchOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [researchOpen]);

  const clusterKeys = Object.keys(CLUSTERS) as ClusterKey[];

  const openNow = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setResearchOpen(true);
  };
  const closeSoon = () => {
    closeTimeoutRef.current = setTimeout(() => setResearchOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <LocalizedLink href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-800 font-serif text-sm text-white">
            O
          </span>
          <span className="text-[15px] font-medium tracking-tight text-ink-900">
            Onerchemical
          </span>
          <span className="ml-1 hidden rounded-full bg-ink-100 px-2 py-0.5 text-[11px] text-ink-500 md:inline">
            Preservation Science
          </span>
        </LocalizedLink>

        <nav className="hidden items-center gap-5 text-sm text-ink-700 md:flex">
          <LocalizedLink
            href="/products/phenoxyethanol-supply"
            className="hover:text-brand-800"
          >
            Preservatives
          </LocalizedLink>

          {/* Research dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
          >
            <button
              type="button"
              onClick={() => setResearchOpen((v) => !v)}
              className="inline-flex items-center gap-1 hover:text-brand-800"
              aria-expanded={researchOpen}
              aria-haspopup="true"
            >
              Research
              <svg
                className={`h-3 w-3 transition-transform ${
                  researchOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {researchOpen && (
              <div
                className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-lg border border-ink-100 bg-white shadow-lg"
                role="menu"
              >
                <LocalizedLink
                  href="/blog"
                  className="block border-b border-ink-100 px-4 py-3 text-sm font-medium text-ink-900 hover:bg-paper"
                  role="menuitem"
                  onClick={() => setResearchOpen(false)}
                >
                  All articles →
                </LocalizedLink>
                <ul className="py-1">
                  {clusterKeys.map((k) => (
                    <li key={k}>
                      <LocalizedLink
                        href={`/blog/cluster/${k}`}
                        className="block px-4 py-2 text-sm text-ink-700 hover:bg-paper hover:text-brand-800"
                        role="menuitem"
                        onClick={() => setResearchOpen(false)}
                      >
                        {CLUSTERS[k].label}
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <LocalizedLink href="/about" className="hover:text-brand-800">
            About
          </LocalizedLink>
          <SearchButton />
          <button
            type="button"
            onClick={() => openQuote()}
            className="font-medium text-brand-800 hover:text-brand-900"
          >
            Request sample
          </button>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
