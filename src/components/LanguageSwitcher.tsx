'use client';

import { LOCALES, type Locale } from '@/lib/i18n';
import { LocalizedLink } from './LocalizedLink';
import { usePathname } from 'next/navigation';

const LABEL: Record<Locale, string> = {
  en: 'EN',
};

/**
 * Phase 0: single-locale site, renders nothing. The component exists so
 * header/footer code can already import and use it; once a second locale
 * is added it starts rendering a switcher without touching layout code.
 */
export function LanguageSwitcher() {
  const pathname = usePathname();
  if (LOCALES.length < 2) return null;

  // Strip any existing locale prefix to find the "bare" path
  const parts = pathname?.split('/') ?? [''];
  const bare = parts[1] && (LOCALES as readonly string[]).includes(parts[1])
    ? '/' + parts.slice(2).join('/')
    : pathname ?? '/';

  return (
    <nav aria-label="Language" className="flex gap-2 text-sm">
      {LOCALES.map((l) => (
        <LocalizedLink key={l} href={bare} locale={l} className="text-ink-700 hover:text-brand-800">
          {LABEL[l]}
        </LocalizedLink>
      ))}
    </nav>
  );
}
