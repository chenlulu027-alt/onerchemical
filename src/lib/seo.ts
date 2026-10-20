import type { Metadata } from 'next';
import { makeAlternates } from './i18n';

export const SITE = {
  name: 'Onerchemical',
  tagline: 'The science of cosmetic preservation',
  description:
    'Peer-reviewed guidance on cosmetic preservative selection, challenge testing, and compliance across EU, US, and APAC markets.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://onerchemical.com',
  locale: 'en_US',
  twitter: '',
  ogImageDefault: '/opengraph-image',
} as const;

export const ORG = {
  legalName: 'Wuhan Oner Chemical Co., Ltd.',
  tradingName: 'Onerchemical',
  mainSite: 'https://onerchem.com',
  foundingDate: '2012',
  city: 'Wuhan',
  region: 'Hubei',
  country: 'CN',
} as const;

export const AUTHOR = {
  name: 'Yang Ruosong',
  slug: 'yang-ruosong',
  jobTitle: 'Head of Technical Content',
  // Author profile is canonically hosted on the main site — Phase 0 deliberately
  // points JSON-LD author URL to the main site to consolidate E-E-A-T.
  profileUrl: 'https://onerchemical.com/yang-ruosong/',
} as const;

type BuildMetaInput = {
  title: string;
  description: string;
  path: string; // e.g. "/", "/blog", "/blog/some-slug"
  ogImage?: string; // absolute or relative; defaults to site OG
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Single entry point for every page's `metadata` export. Guarantees
 * canonical URL, hreflang alternates, OG + Twitter, and consistent title suffix.
 */
export function buildMeta(input: BuildMetaInput): Metadata {
  const url = `${SITE.url}${input.path}`;
  const titleFull =
    input.path === '/' ? `${SITE.name} — ${SITE.tagline}` : `${input.title} | ${SITE.name}`;
  const ogImage = input.ogImage
    ? input.ogImage.startsWith('http')
      ? input.ogImage
      : `${SITE.url}${input.ogImage}`
    : `${SITE.url}${SITE.ogImageDefault}`;

  return {
    metadataBase: new URL(SITE.url),
    title: titleFull,
    description: input.description,
    alternates: {
      canonical: url,
      languages: makeAlternates(input.path, SITE.url),
    },
    openGraph: {
      type: input.type ?? 'website',
      url,
      title: titleFull,
      description: input.description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: titleFull,
      description: input.description,
      images: [ogImage],
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}
