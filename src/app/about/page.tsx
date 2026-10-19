import type { Metadata } from 'next';
import { buildMeta, ORG, SITE } from '@/lib/seo';
import { LocalizedLink } from '@/components/LocalizedLink';

export const metadata: Metadata = buildMeta({
  title: 'About',
  description: `${SITE.name} is a technical publication by ${ORG.legalName}, focused on cosmetic preservation science.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 font-serif text-4xl font-normal text-ink-900">About Onerchemical</h1>

      <div className="prose-blog">
        <p>
          <strong>Onerchemical</strong> is a technical publication operated by{' '}
          <strong>{ORG.legalName}</strong>, a cosmetic-ingredient supplier based in {ORG.city},{' '}
          {ORG.region}. Our main supply operation is at{' '}
          <a href={ORG.mainSite} target="_blank" rel="noopener">
            onerchem.com
          </a>
          ; this site is a dedicated resource on cosmetic preservation science.
        </p>

        <h2>Why a separate site</h2>
        <p>
          Preservation sits at the intersection of microbiology, physical chemistry, and regulation
          — a field that deserves depth beyond what a supplier catalogue can offer. We publish here
          because the problems we hear from formulators (preservative-booster trade-offs, pH drift
          in challenge testing, cross-market labelling) call for essay-length answers, not product
          pages.
        </p>

        <h2>Who writes</h2>
        <p>
          All technical content is authored by{' '}
          <LocalizedLink href="/yang-ruosong">Yang Ruosong</LocalizedLink>, head of technical
          content at {ORG.tradingName}, with internal review by the manufacturing and QC teams
          before publication.
        </p>

        <h2>What we don&apos;t do</h2>
        <p>
          We publish no sponsored content, no vendor comparisons that aren&apos;t grounded in
          published data, and no fabricated reviews. We don&apos;t rank preservatives by anything
          other than what the chemistry and the regulation support.
        </p>
      </div>
    </article>
  );
}
