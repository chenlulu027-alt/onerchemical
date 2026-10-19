/**
 * Service / supply offerings. Phase 0 placeholders — the real catalog
 * lands with product pages. Keep in sync with /src/app/products/[slug]/page.tsx
 * generateStaticParams.
 */

export interface ProductService {
  slug: string;
  name: string;
  shortDescription: string;
  serviceType: string; // feeds Service JSON-LD
  category: string;
  // No price. No reviews. No ratings. B2B custom supply — Google's
  // structured-data policy forbids fabricating these.
}

export const PRODUCTS: ProductService[] = [
  {
    slug: 'phenoxyethanol-supply',
    name: 'Phenoxyethanol — bulk supply',
    shortDescription:
      'USP/EP-grade phenoxyethanol for cosmetic and personal-care formulations, with COA, MSDS, and residual-solvent profile per batch.',
    serviceType: 'Cosmetic Preservative Supply',
    category: 'Industrial Chemicals',
  },
];

export function getProduct(slug: string): ProductService | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
