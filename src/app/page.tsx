import type { Metadata } from 'next';
import { buildMeta, ORG } from '@/lib/seo';
import { publishedArticles, CLUSTERS } from '@/lib/blog-registry';
import { HomeHero, LatestResearchGrid, TrustStrip } from './HomeClient';

export const metadata: Metadata = buildMeta({
  title: 'Home',
  description:
    'Peer-reviewed guidance on cosmetic preservative selection, challenge testing, and compliance across EU, US, and APAC markets — written for formulators, by chemists.',
  path: '/',
});

export default function HomePage() {
  const latest = publishedArticles().slice(0, 4);
  // Pre-resolve cluster labels on the server so client component stays data-only
  const cards = latest.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    author: a.author,
    readingMinutes: a.readingMinutes,
    clusterLabel: CLUSTERS[a.cluster].label,
  }));

  return (
    <>
      <HomeHero orgLegal={ORG.legalName} />
      <TrustStrip />
      <LatestResearchGrid cards={cards} />
    </>
  );
}
