/**
 * Table-of-contents helpers. The author declares the TOC inline in
 * each article's page.tsx (not auto-generated from DOM) so SSR can
 * render anchor hrefs correctly and ⌘F / direct-link / sharable
 * anchors all work on first paint.
 *
 * Each article's h2 / h3 in the body MUST carry a matching id.
 */

export type TOCEntry = {
  id: string;        // the h2/h3 id in the article body, no leading #
  text: string;      // display label
  level: 2 | 3;      // visual indent only
};

/** Convert a heading string to a URL-safe slug. Pure, deterministic. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
