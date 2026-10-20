import { SITE, ORG, AUTHOR } from './seo';

/**
 * JSON-LD builders. Return plain objects — stringify at render time
 * via <JsonLd /> component. Keep schemas valid against schema.org and
 * aligned with Google's structured data guidelines (never fabricate
 * reviews, ratings, or offers for B2B services).
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}#organization`,
    name: ORG.tradingName,
    legalName: ORG.legalName,
    url: SITE.url,
    foundingDate: ORG.foundingDate,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG.city,
      addressRegion: ORG.region,
      addressCountry: ORG.country,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE.url}#organization` },
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${AUTHOR.profileUrl}#person`,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: AUTHOR.profileUrl,
    worksFor: { '@id': `${SITE.url}#organization` },
  };
}

type ArticleSchemaInput = {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
};

export function articleSchema(a: ArticleSchemaInput) {
  const url = `${SITE.url}/blog/${a.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: a.headline,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { '@id': `${AUTHOR.profileUrl}#person` },
    publisher: { '@id': `${SITE.url}#organization` },
    ...(a.image ? { image: a.image.startsWith('http') ? a.image : `${SITE.url}${a.image}` } : {}),
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

type ServiceSchemaInput = {
  name: string;
  slug: string;
  description: string;
  serviceType: string; // e.g. "Cosmetic Preservative Supply"
  category?: string; // e.g. "Industrial Chemicals"
};

/**
 * Service @type for B2B custom supply — explicitly NOT Product.
 * Avoids fabricating offers / review / aggregateRating which Google
 * forbids and which don't apply to custom B2B supply.
 */
export function serviceSchema(s: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/products/${s.slug}#service`,
    name: s.name,
    description: s.description,
    serviceType: s.serviceType,
    ...(s.category ? { category: s.category } : {}),
    provider: { '@id': `${SITE.url}#organization` },
    areaServed: 'Worldwide',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Cosmetic Formulators and Contract Manufacturers',
    },
    url: `${SITE.url}/products/${s.slug}`,
  };
}

type Faq = { question: string; answer: string };

export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
