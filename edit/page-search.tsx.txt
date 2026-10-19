import type { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { SearchPageClient } from './SearchPageClient';

export const metadata: Metadata = buildMeta({
  title: 'Search',
  description: 'Search the Onerchemical knowledge base — preservation chemistry, challenge testing, regulation.',
  path: '/search',
  // noindex: /search is a utility surface, not canonical content
  noindex: true,
});

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return <SearchPageClient initialQuery={searchParams.q ?? ''} />;
}
