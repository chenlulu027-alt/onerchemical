'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALES, isLocale, localizedPath, type Locale } from '@/lib/i18n';

type Props = Omit<LinkProps, 'href' | 'locale'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string; // raw path like "/blog" — DO NOT include a locale prefix
    locale?: Locale; // explicit override; defaults to current detected locale
    children?: ReactNode;
  };

/**
 * Drop-in replacement for next/link that is locale-aware.
 *
 * In Phase 0 (EN only), this is effectively a pass-through, but once
 * additional locales are added, every <LocalizedLink href="/blog" />
 * in the codebase begins emitting the correct /<locale>/blog href
 * without any further find-and-replace.
 *
 * Always pass canonical, non-prefixed paths as href.
 */
function detectCurrentLocale(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const seg = pathname.split('/')[1];
  return seg && isLocale(seg) ? seg : DEFAULT_LOCALE;
}

export const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(function LocalizedLink(
  { href, locale, ...rest },
  ref,
) {
  const pathname = usePathname();
  const target = locale ?? detectCurrentLocale(pathname);
  const finalHref = /^(https?:)?\/\//.test(href) || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')
    ? href
    : localizedPath(href, target);
  return <Link ref={ref} href={finalHref} {...rest} />;
});

// Silence TS when consumers do `locale="en"` even if LOCALES currently has one entry
export const _LOCALES_FOR_LINK = LOCALES;
