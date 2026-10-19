/**
 * i18n scaffold. Phase 0: EN only. All helpers return EN-only output,
 * but the shape of the data is ready for future locales.
 *
 * When adding a locale:
 *   1. Add the code to LOCALES
 *   2. Update DEFAULT_LOCALE if needed
 *   3. localizedPath / makeAlternates will start emitting it automatically
 */

export const LOCALES = ['en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

/**
 * Produce a path for a given locale. Default locale returns path as-is
 * (no /en prefix); non-default locales get /<locale> prefix.
 */
export function localizedPath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean}`;
}

/**
 * Produce the `alternates.languages` map for Next.js Metadata.
 * Phase 0: emits only { 'en': url, 'x-default': url } — a single-locale
 * site still benefits from an explicit x-default signal to Google.
 */
export function makeAlternates(path: string, siteUrl: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of LOCALES) {
    out[locale] = `${siteUrl}${localizedPath(path, locale)}`;
  }
  out['x-default'] = `${siteUrl}${localizedPath(path, DEFAULT_LOCALE)}`;
  return out;
}
