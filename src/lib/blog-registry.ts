/**
 * Central registry for every blog article. Build fails if cluster or
 * searchKeywords are missing — enforced by required fields on BlogArticle.
 *
 * Adding a new article:
 *   1. Create src/app/blog/<slug>/page.tsx with inline toc + anchor ids
 *   2. Add an entry here with the same slug
 *   3. Run `npm run typecheck` — missing fields error at compile time
 */

import type { TOCEntry } from './toc';

export const CLUSTERS = {
  'preservative-chemistry': {
    label: 'Preservative Chemistry',
    description:
      'The molecules, mechanisms, and interactions behind cosmetic preservation.',
  },
  'challenge-testing': {
    label: 'Challenge Testing',
    description:
      'ISO 11930, USP 51, and PET methodology for formulators and QC teams.',
  },
  regulatory: {
    label: 'Regulatory',
    description:
      'Preservative compliance across EU 1223/2009, US FDA, China NMPA, and ASEAN.',
  },
  'formulation-guides': {
    label: 'Formulation Guides',
    description:
      'Choosing preservative systems by product form, pH, and distribution channel.',
  },
} as const;

export type ClusterKey = keyof typeof CLUSTERS;

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  cluster: ClusterKey;
  searchKeywords: string[]; // feeds internal search + cannibalization audit
  datePublished: string;
  dateModified?: string;
  author: string;
  readingMinutes: number;
  heroImage?: string;
  draft?: boolean;
  /**
   * Optional. If set, renders a right-side TOC (desktop) + collapsible
   * block (mobile). Each entry's id must match an h2/h3 id in the article body.
   */
  toc?: TOCEntry[];
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: 'phenoxyethanol-ethylhexylglycerin-combination',
    title: 'Phenoxyethanol vs. ethylhexylglycerin: when to combine them',
    excerpt:
      'A mechanistic review of the two most common broad-spectrum partners in modern leave-on cosmetics, with a decision tree for when the combination is justified over phenoxyethanol alone.',
    cluster: 'preservative-chemistry',
    searchKeywords: [
      'phenoxyethanol ethylhexylglycerin',
      'phenoxyethanol vs ethylhexylglycerin',
      'ethylhexylglycerin booster',
      'phenoxyethanol combination preservative',
    ],
    datePublished: '2026-10-19',
    author: 'Yang Ruosong',
    readingMinutes: 12,
    toc: [
      { id: 'why-two-together', text: 'Why the two show up together', level: 2 },
      { id: 'when-necessary', text: 'When the combination is necessary', level: 2 },
      { id: 'decision-tree', text: 'Pick your system', level: 3 },
      { id: 'regulatory-layer', text: 'The regulatory layer', level: 2 },
      { id: 'formulation-details', text: 'Formulation details', level: 2 },
      { id: 'wrong-answer', text: 'When it is the wrong answer', level: 2 },
      { id: 'faq', text: 'Frequently asked questions', level: 2 },
    ],
  },
  {
    slug: 'phenoxyethanol-technical-guide',
    title: 'Why your phenoxyethanol system fails: a 7-layer breakdown from a preservation specialist',
    excerpt:
      'Mechanism blind spots, COA red flags, pairing matrix by formula type, 5-market regulations, and a real 100kg sourcing path for independent cosmetic brands.',
    cluster: 'preservative-chemistry',
    searchKeywords: [
      'phenoxyethanol',
      'phenoxyethanol preservative',
      'phenoxyethanol concentration',
      'phenoxyethanol COA',
      'phenoxyethanol EU Annex V',
      'phenoxyethanol pairing',
      'phenoxyethanol MOQ',
      'phenoxyethanol supplier',
      'preservative for indie beauty',
      'small batch phenoxyethanol',
    ],
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    author: 'Yang Ruosong',
    readingMinutes: 14,
    heroImage: '/images/blog/phenoxyethanol-tg/hero.jpg',
    toc: [
      { id: 'three-failures', text: 'Three real failure scenarios', level: 2 },
      { id: 'mechanism-gaps', text: 'Mechanism blind spots', level: 2 },
      { id: 'coa-red-flags', text: 'COA red flags', level: 2 },
      { id: 'pairing-matrix', text: 'Pairing matrix by formula type', level: 2 },
      { id: 'regulations', text: 'Global regulation matrix', level: 2 },
      { id: 'sourcing-100kg', text: '100kg sourcing path', level: 2 },
      { id: 'faq', text: 'FAQ', level: 2 },
    ],
  },
];
export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug && !a.draft);
}

export function articlesByCluster(cluster: ClusterKey): BlogArticle[] {
  return ARTICLES.filter((a) => a.cluster === cluster && !a.draft);
}

export function publishedArticles(): BlogArticle[] {
  return ARTICLES.filter((a) => !a.draft).sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
}
