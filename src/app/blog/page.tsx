import type { Metadata } from 'next';
import { buildMeta } from '@/lib/seo';
import { publishedArticles } from '@/lib/blog-registry';
import { BlogListClient } from './BlogListClient';

export const metadata: Metadata = buildMeta({
  title: 'Research',
  description:
    'Technical articles on cosmetic preservation chemistry, challenge testing, regulation, and formulation strategy — written for formulators, by chemists.',
  path: '/blog',
});

export default function BlogListPage() {
  const articles = publishedArticles();
  return <BlogListClient articles={articles} />;
}
