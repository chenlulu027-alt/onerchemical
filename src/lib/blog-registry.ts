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
    slug: 'how-to-preserve-cosmetic-emulsion',
    title: 'How to Preserve a Cosmetic Emulsion: The Indie Formulator’s 2026 Playbook',
    excerpt:
      'Why oil-in-water emulsions fail ISO 11930 more than any other product type, which 7 preservative systems actually pass at 100 kg scale, and how emulsifier chemistry quietly kills your preservative — field playbook from Onerchemical’s preservation sourcing desk.',
    cluster: 'formulation-guides',
    searchKeywords: [
      'how to preserve a cosmetic emulsion',
      'cosmetic lotion preservative system',
      'preserving oil-in-water emulsion',
      'emulsion preservation challenge test',
      'o/w emulsion preservative',
      'emulsifier preservative compatibility',
      'phenoxyethanol lotion dose',
      'preservative-free emulsion claim',
      'ISO 11930 emulsion',
      'chelator emulsion preservation',
    ],
    datePublished: '2026-10-26',
    dateModified: '2026-10-26',
    author: 'Yang Ruosong',
    readingMinutes: 14,
    heroImage: '/images/blog/how-to-preserve-cosmetic-emulsion/hero.jpg',
    toc: [
      { id: 'barcelona-recall', text: 'The Barcelona lab recall that defined this playbook', level: 2 },
      { id: 'why-emulsions-fail', text: 'Why do emulsions fail ISO 11930 more than any other product type?', level: 2 },
      { id: 'three-philosophies', text: 'What are the three preservation philosophies for 2026 emulsions?', level: 2 },
      { id: 'selector', text: 'Which preservative system fits your emulsion?', level: 2 },
      { id: 'pairing-matrix', text: 'Pairing matrix: 7 verified emulsion-grade combinations', level: 2 },
      { id: 'coa-red-flags', text: 'What CoA red flags do emulsion-grade preservatives hide?', level: 2 },
      { id: 'chelator-synergy', text: 'How does chelator synergy change your preservation math?', level: 2 },
      { id: 'emulsifier-interaction', text: 'Preservative–emulsifier interaction map', level: 2 },
      { id: 'regulatory', text: 'What can indie brands claim? 5-market regulatory snapshot', level: 2 },
      { id: 'emulsion-faq', text: 'Emulsion preservation FAQ', level: 2 },
    ],
  },
      {
  slug: 'iso-11930-challenge-test-protocol',
  title: 'Why Your First Challenge Test Failed (And How to Pass ISO 11930 on the Second Try)',
  excerpt:
    'A procurement-view walkthrough of the ISO 11930 challenge test — what it actually measures, which criterion your product needs, how to read the five-strain panel, and the pre-submission checklist that keeps indie brands from paying for a second lab run.',
  cluster: 'challenge-testing',
  searchKeywords: [
    'ISO 11930 challenge test',
    'preservative efficacy test',
    'challenge test protocol',
    'ISO 11930 criteria A B',
    'cosmetic preservative efficacy testing',
    'USP 51 vs ISO 11930',
    '5-strain inoculum challenge test',
    'challenge test interpretation',
  ],
  datePublished: '2026-10-23',
  dateModified: '2026-10-23',
  author: 'Yang Ruosong',
  readingMinutes: 14,
  toc: [
    { id: 'first-test-failed', text: 'The USD 450 Lab Report That Said "Fail": What Actually Went Wrong', level: 2 },
    { id: 'what-iso-11930-measures', text: 'What Does ISO 11930 Actually Measure?', level: 2 },
    { id: 'criterion-a-vs-b', text: 'Criterion A vs Criterion B: Which One Does Your Product Need?', level: 2 },
    { id: '28-day-timeline', text: 'What Happens Across the 28-Day Timeline?', level: 2 },
    { id: 'd7-signal', text: 'What a Day 7 bacterial fail usually means', level: 3 },
    { id: 'd28-regrowth', text: 'What a Day 28 regrowth signal usually means', level: 3 },
    { id: 'pre-submission-checklist', text: 'Before You Ship Samples: What Is on the Pre-Submission Checklist?', level: 2 },
    { id: 'reading-the-report', text: 'How Do You Read a Challenge Test Report Beyond Pass/Fail?', level: 2 },
    { id: 'iso-vs-usp-vs-ep', text: 'ISO 11930 vs USP <51> vs EP 5.1.3 vs CTFA M-3: When Is Each One Required?', level: 2 },
    { id: 'market-requirements', text: 'Which Markets Legally Require a Challenge Test — and Which Only Expect One?', level: 2 },
    { id: 'eu-requirements', text: 'EU and UK', level: 3 },
    { id: 'us-requirements', text: 'United States', level: 3 },
    { id: 'china-requirements', text: 'China', level: 3 },
    { id: 'japan-korea-requirements', text: 'Japan and Korea', level: 3 },
    { id: 'where-to-test', text: 'Where Should You Run the Test — Independent Lab, In-House, or Contract Manufacturer?', level: 2 },
    { id: 'challenge-test-faq', text: 'Challenge test FAQ', level: 2 },
  ],
},
      {
    slug: 'ethylhexylglycerin-technical-guide',
    title: 'Ethylhexylglycerin (EHG): When It Actually Preserves — And When It Doesn\u2019t',
    excerpt:
      'A sourcing specialist\u2019s guide to EHG (CAS 70445-33-9) for independent cosmetic brands — deodorant vs cosmetic use-cases, Sensiva SC50 pricing shadow, verified pairings, SCCS 2020 dose data, CoA red flags, and 25\u2013200kg procurement.',
    cluster: 'preservative-chemistry',
    searchKeywords: [
      'ethylhexylglycerin',
      'EHG',
      'ethylhexylglycerin preservative',
      'Sensiva SC50',
      'EHG booster',
      'ethylhexylglycerin max use rate',
      'EHG not annex V',
      'ethylhexylglycerin supplier',
      'EHG small MOQ',
      'ethylhexylglycerin SCCS',
    ],
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Yang Ruosong',
    readingMinutes: 14,
    heroImage: '/images/blog/article-05-ehg-hero.jpg',
    toc: [
      { id: 'when-ehg-preserves', text: 'When EHG actually preserves — and when it is just skin feel', level: 2 },
      { id: 'why-ehg-boosts', text: 'Why EHG boosts preservation without an Annex V claim', level: 2 },
      { id: 'sensiva-sc50-pricing-shadow', text: 'The Schülke Sensiva SC50 pricing shadow', level: 2 },
      { id: 'ehg-pairing-map', text: 'EHG pairing map: four verified boosts and the two we refuse', level: 2 },
      { id: 'ehg-dose-reality', text: 'How formulators set the EHG dose — and why most cap below the ceiling', level: 2 },
      { id: 'ehg-coa-red-flags', text: 'Legitimate EHG CoA — the 7 fields we reject on sight', level: 2 },
      { id: 'ehg-regulatory-5-market', text: 'EHG in global regulations: a preservative that officially isn\u2019t one', level: 2 },
      { id: 'onerchemical-ehg-sourcing', text: '25kg–200kg EHG — the supply gap large distributors don\u2019t fill', level: 2 },
      { id: 'ehg-faq', text: 'Ethylhexylglycerin FAQ', level: 2 },
    ],
  },
    {
    slug: 'caprylhydroxamic-acid-technical-guide',
    title: 'Caprylhydroxamic Acid in Cosmetic Preservation: Decoding the Chelator That Clean Beauty Keeps Buying',
    excerpt:
      'As of 2026-10, caprylhydroxamic acid (CAS 7377-03-9) anchors most phenoxyethanol-free preservation systems on the market — yet most indie brands buy it inside a Spectrastat blend without decoding the hurdle logic. Procurement playbook, pairing matrix, and 5-market regulatory map.',
    cluster: 'preservative-chemistry',
    searchKeywords: [
      'caprylhydroxamic acid',
      'caprylhydroxamic acid preservative',
      'CHA preservative',
      'spectrastat',
      'aromastat',
      'hurdle technology preservative',
      'natural preservative CHA',
      'caprylhydroxamic acid formulation',
      'caprylhydroxamic acid use level',
      'caprylhydroxamic acid supplier',
      'caprylhydroxamic acid MOQ',
      'chelator preservative indie beauty',
    ],
    datePublished: '2026-10-22',
    dateModified: '2026-10-22',
    author: 'Yang Ruosong',
    readingMinutes: 14,
    heroImage: '/images/hero-caprylhydroxamic-acid.webp',
    toc: [
      { id: 'why-indie-brands', text: 'Why "phenoxyethanol-free" indie brands reach for CHA', level: 2 },
      { id: 'chelator-paradox', text: 'The chelator paradox: how CHA preserves', level: 2 },
      { id: 'what-cha-cant-do', text: 'What CHA cannot do alone — hurdle mandate', level: 2 },
      { id: 'spectrastat-family', text: 'Decoding the Spectrastat family (8 blends)', level: 2 },
      { id: 'monomer-vs-blend', text: 'Monomer vs pre-blended: procurement economics', level: 2 },
      { id: 'build-your-hurdle', text: 'Build your own CHA hurdle: 4 verified pairings', level: 2 },
      { id: 'use-level-tree', text: 'CHA use-level decision tree', level: 2 },
      { id: 'regulatory-map', text: 'The CHA regulatory map (5 markets)', level: 2 },
      { id: 'sourcing-100kg', text: 'Sourcing 100 kg monomer CHA', level: 2 },
      { id: 'faq', text: 'FAQ', level: 2 },
    ],
  },
  {
    slug: '1-2-hexanediol-technical-guide',
    title:
      "1,2-Hexanediol in Cosmetics — When It Actually Works as a Preservative, and When It Doesn't",
    excerpt:
      'As of 2026-10, 1,2-Hexanediol sits in EU CosIng but outside Annex V. Pairing matrix, Challenge Test usage rates, COA red flags, and 5-market regulatory status for independent cosmetic brands.',
    cluster: 'preservative-chemistry',
    searchKeywords: [
      '1,2-hexanediol',
      '1,2-hexanediol cosmetic',
      '1,2-hexanediol preservative',
      '1,2-hexanediol vs phenoxyethanol',
      'hexanediol usage rate',
      '1,2-hexanediol INCI',
      '1,2-hexanediol EU Annex V',
      '1,2-hexanediol challenge test',
      '1,2-hexanediol COA',
      'cas 6920-22-5',
    ],
    datePublished: '2026-10-21',
    dateModified: '2026-10-21',
    author: 'Yang Ruosong',
    readingMinutes: 12,
    heroImage: '/images/hero-1-2-hexanediol.webp',
    toc: [
      { id: 'why-indie-reaches', text: 'Why indie formulators reach for 1,2-HD', level: 2 },
      { id: 'actually-preservative', text: 'Is it actually a preservative?', level: 2 },
      { id: 'pairing-matrix', text: 'Compatibility matrix', level: 2 },
      { id: 'challenge-test-rates', text: 'Usage rates that pass Challenge Test', level: 2 },
      { id: 'coa-red-flags', text: 'COA red flags', level: 2 },
      { id: 'regulations', text: '5-market regulations', level: 2 },
      { id: 'sourcing', text: 'Sample vs 100 kg order', level: 2 },
      { id: 'faq', text: 'FAQ', level: 2 },
    ],
  },
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