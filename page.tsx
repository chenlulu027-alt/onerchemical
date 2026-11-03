/**
 * Place at: src/app/blog/cluster/[key]/page.tsx
 *
 * Day 1 of P0-1 Pillar/Hub plan.
 *
 * Generates 5 SSR cluster index pages at build time:
 *   /blog/cluster/preservative-chemistry
 *   /blog/cluster/challenge-testing
 *   /blog/cluster/regulatory
 *   /blog/cluster/formulation-guides
 *   /blog/cluster/sourcing
 *
 * Replaces the client-side filter on /blog with real, canonical, indexable
 * SEO pages — each with CollectionPage + BreadcrumbList JSON-LD.
 *
 * The /blog page itself is untouched (keeps client filter for UX).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedLink } from '@/components/LocalizedLink';
import { JsonLd } from '@/components/JsonLd';
import { buildMeta, SITE } from '@/lib/seo';
import {
  CLUSTERS,
  type ClusterKey,
  articlesByCluster,
} from '@/lib/blog-registry';

type Params = { key: string };

// Pre-render all cluster pages at build time (static generation)
export function generateStaticParams(): Params[] {
  return (Object.keys(CLUSTERS) as ClusterKey[]).map((key) => ({ key }));
}

function isClusterKey(k: string): k is ClusterKey {
  return k in CLUSTERS;
}

// Richer per-cluster intros (SEO body copy — SSR crawlable, not in CLUSTERS object
// to keep the registry file lean and avoid bloating the search-index build).
const CLUSTER_INTRO: Record<ClusterKey, string> = {
  'preservative-chemistry':
    'Molecule-by-molecule breakdowns of the preservatives used in modern cosmetic formulation — mechanism of action, pairing synergy, use-level windows, CoA red flags, and sourcing realities for independent brands and contract manufacturers.',
  'challenge-testing':
    'ISO 11930, USP <51>, EP 5.1.3, and CTFA M-3 methodology as it actually plays out in third-party labs — what each criterion measures, how to read the five-strain panel, and the pre-submission checklist that keeps formulators from paying for a second lab run.',
  regulatory:
    'Preservative compliance across EU 1223/2009, US MoCRA, China NMPA, Japan, and Korea — Annex V entry decoders, CPSR evidence requirements, CPNP notification fields, Safety Gate enforcement patterns, and the paperwork gates that catch imports at customs.',
  'formulation-guides':
    'Preservation system selection by product form, pH, packaging, and distribution channel — emulsion playbooks, surfactant interaction maps, chelator synergy math, and the formulation decisions that make or break your challenge test.',
  sourcing:
    'Supplier guides built from live FOB China benchmarks, verified-plant lists, and 100kg MOQ economics — tier-by-tier pricing matrices, CoA red flags that catch isomer blending and bait-and-switch, and procurement SOPs for recurring-volume buyers.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { key } = await params;
  if (!isClusterKey(key)) {
    return buildMeta({
      title: 'Cluster not found',
      description: 'The requested research cluster does not exist.',
      path: `/blog/cluster/${key}`,
      noindex: true,
    });
  }
  const cluster = CLUSTERS[key];
  const count = articlesByCluster(key).length;
  return buildMeta({
    title: `${cluster.label} — ${count} technical article${count === 1 ? '' : 's'}`,
    description: `${cluster.description} ${count} peer-reviewed article${
      count === 1 ? '' : 's'
    } for cosmetic formulators and procurement teams.`,
    path: `/blog/cluster/${key}`,
  });
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { key } = await params;
  if (!isClusterKey(key)) notFound();

  const cluster = CLUSTERS[key];
  const articles = articlesByCluster(key).sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
  const otherClusters = (Object.keys(CLUSTERS) as ClusterKey[]).filter(
    (k) => k !== key,
  );
  const canonical = `${SITE.url}/blog/cluster/${key}`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonical,
    url: canonical,
    name: `${cluster.label} — Onerchemical Research`,
    description: cluster.description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Onerchemical',
      url: SITE.url,
    },
    hasPart: articles.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      url: `${SITE.url}/blog/${a.slug}`,
      datePublished: a.datePublished,
      author: { '@type': 'Person', name: a.author },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Research',
        item: `${SITE.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cluster.label,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-500">
          <LocalizedLink href="/" className="hover:text-brand-800">
            Home
          </LocalizedLink>
          <span className="mx-2">/</span>
          <LocalizedLink href="/blog" className="hover:text-brand-800">
            Research
          </LocalizedLink>
          <span className="mx-2">/</span>
          <span className="text-ink-700">{cluster.label}</span>
        </nav>

        <header className="mb-10 border-b border-ink-100 pb-10">
          <div className="mb-3 text-[11px] uppercase tracking-[1.5px] text-brand-800">
            Research Cluster
          </div>
          <h1 className="mb-4 font-serif text-5xl font-normal text-ink-900">
            {cluster.label}
          </h1>
          <p className="mb-4 max-w-3xl text-lg leading-relaxed text-ink-700">
            {CLUSTER_INTRO[key]}
          </p>
          <p className="text-sm text-ink-500">
            {articles.length} published article
            {articles.length === 1 ? '' : 's'} in this cluster.
          </p>
        </header>

        {articles.length === 0 ? (
          <p className="text-ink-500">No articles in this cluster yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100 border-t border-ink-100">
            {articles.map((a) => (
              <li key={a.slug}>
                <LocalizedLink
                  href={`/blog/${a.slug}`}
                  className="group block py-6 transition hover:bg-paper/60"
                >
                  <h2 className="mb-2 font-serif text-2xl font-normal text-ink-900 group-hover:text-brand-900">
                    {a.title}
                  </h2>
                  <p className="mb-3 text-base leading-relaxed text-ink-500">
                    {a.excerpt}
                  </p>
                  <div className="text-xs text-ink-500">
                    {a.author} ·{' '}
                    {new Date(a.datePublished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    · {a.readingMinutes} min read
                  </div>
                </LocalizedLink>
              </li>
            ))}
          </ul>
        )}

        <aside className="mt-16 border-t border-ink-100 pt-10">
          <h2 className="mb-5 font-serif text-xl text-ink-900">
            Other research clusters
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {otherClusters.map((k) => {
              const n = articlesByCluster(k).length;
              return (
                <li key={k}>
                  <LocalizedLink
                    href={`/blog/cluster/${k}`}
                    className="group block rounded-lg border border-ink-100 bg-white p-5 transition hover:border-ink-300 hover:shadow-sm"
                  >
                    <div className="mb-1 text-[10px] uppercase tracking-[1.5px] text-brand-800">
                      {n} article{n === 1 ? '' : 's'}
                    </div>
                    <h3 className="mb-1 font-serif text-lg font-normal text-ink-900 group-hover:text-brand-900">
                      {CLUSTERS[k].label}
                    </h3>
                    <p className="text-sm text-ink-500 line-clamp-2">
                      {CLUSTERS[k].description}
                    </p>
                  </LocalizedLink>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>
    </>
  );
}
