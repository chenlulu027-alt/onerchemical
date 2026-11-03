/**
 * Place at: src/app/sitemap.ts  (REPLACES existing file)
 *
 * Day 1 of P0-1: adds the 5 cluster index pages to the sitemap.
 *
 * Changes vs previous sitemap:
 *   - Added `clusterEntries` block (5 entries, priority 0.75, weekly)
 *   - Everything else unchanged (static, articles, products — same order)
 *
 * After deploy, resubmit sitemap in Google Search Console to accelerate
 * cluster-page discovery.
 */
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { makeAlternates } from '@/lib/i18n';
import {
  publishedArticles,
  CLUSTERS,
  type ClusterKey,
} from '@/lib/blog-registry';
import { PRODUCTS } from '@/lib/products';

type Entry = MetadataRoute.Sitemap[number];

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

  // NEW (Day 1): cluster index pages — SSR, canonical, indexable
  const clusterEntries: Entry[] = (Object.keys(CLUSTERS) as ClusterKey[]).map(
    (k) =>
      makeEntry(`/blog/cluster/${k}`, {
        changeFrequency: 'weekly',
        priority: 0.75,
      }),
  );

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

  return [
    ...staticEntries,
    ...clusterEntries,
    ...articleEntries,
    ...productEntries,
  ];
}
