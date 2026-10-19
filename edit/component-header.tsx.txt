'use client';

import { LocalizedLink } from '@/components/LocalizedLink';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useQuote } from '@/context/QuoteContext';
import { SearchButton } from '@/components/search/Search';

export function Header() {
  const { openQuote } = useQuote();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <LocalizedLink href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-800 font-serif text-sm text-white">
            O
          </span>
          <span className="text-[15px] font-medium tracking-tight text-ink-900">Onerchemical</span>
          <span className="ml-1 hidden rounded-full bg-ink-100 px-2 py-0.5 text-[11px] text-ink-500 md:inline">
            Preservation Science
          </span>
        </LocalizedLink>

        <nav className="hidden items-center gap-5 text-sm text-ink-700 md:flex">
          <LocalizedLink href="/products/phenoxyethanol-supply" className="hover:text-brand-800">
            Preservatives
          </LocalizedLink>
          <LocalizedLink href="/blog" className="hover:text-brand-800">
            Research
          </LocalizedLink>
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
