import { notFound } from 'next/navigation';

/**
 * Catch-all placeholder for /blog/<slug>. Every real article lives at
 * src/app/blog/<slug>/page.tsx (an explicit folder route), which Next.js
 * routes before this dynamic segment. If a request reaches this file,
 * the slug has no concrete page — 404.
 *
 * Do NOT register articles here; they are discovered by filesystem routing.
 */
export default function BlogSlugPlaceholder() {
  notFound();
}
