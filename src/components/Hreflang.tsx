import { LOCALES, DEFAULT_LOCALE, localizedPath, type Locale } from '@/lib/i18n';
import { SITE } from '@/lib/seo';

type Props = {
  path: string; // canonical, non-prefixed path, e.g. "/blog/some-slug"
};

/**
 * Emits <link rel="alternate" hreflang="..."> + x-default for the given path.
 *
 * Next.js Metadata API already does this via alternates.languages,
 * but we also render as JSX for routes that bypass metadata (e.g. ISR
 * fragments, embedded exports). Idempotent — including both is harmless.
 */
export function Hreflang({ path }: Props) {
  return (
    <>
      {LOCALES.map((loc: Locale) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={`${SITE.url}${localizedPath(path, loc)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE.url}${localizedPath(path, DEFAULT_LOCALE)}`}
      />
    </>
  );
}
