import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { makeAlternates } from '@/lib/i18n';
import { publishedArticles } from '@/lib/blog-registry';
import { PRODUCTS } from '@/lib/products';

type Entry = MetadataRoute.Sitemap[number];

/**
 * makeEntry wraps a canonical path + optional lastModified into a sitemap
 * entry with hreflang alternates baked in. Phase 0: EN only, but the
 * alternates field already carries x-default so Google can start reading it.
 */
function makeEntry(
  path: string,
  opts: {
    lastModified?: string | Date;
    changeFrequency?: Entry['changeFrequency'];
    priority?: number;
  } = {},
): Entry {
  return {
    url: `${SITE.url}${path}`,
    lastModified: opts.lastModified ? new Date(opts.lastModified) : new Date(),
    changeFrequency: opts.changeFrequency ?? 'monthly',
    priority: opts.priority ?? 0.5,
    alternates: {
      languages: makeAlternates(path, SITE.url),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: Entry[] = [
    makeEntry('/', { changeFrequency: 'weekly', priority: 1.0 }),
    makeEntry('/blog', { changeFrequency: 'weekly', priority: 0.8 }),
    makeEntry('/about', { changeFrequency: 'yearly', priority: 0.4 }),
    makeEntry('/yang-ruosong', { changeFrequency: 'monthly', priority: 0.5 }),
  ];

  const articleEntries: Entry[] = publishedArticles().map((a) =>
    makeEntry(`/blog/${a.slug}`, {
      lastModified: a.dateModified ?? a.datePublished,
      changeFrequency: 'yearly',
      priority: 0.7,
    }),
  );

  const productEntries: Entry[] = PRODUCTS.map((p) =>
    makeEntry(`/products/${p.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...articleEntries, ...productEntries];
}
