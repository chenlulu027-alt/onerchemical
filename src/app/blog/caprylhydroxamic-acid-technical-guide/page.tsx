import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import SpectrastatComparator from '@/components/blog/article-04/SpectrastatComparator';
import HurdlePairingMatrix from '@/components/blog/article-04/HurdlePairingMatrix';

const SLUG = 'caprylhydroxamic-acid-technical-guide';
const SITE = 'https://onerchemical.com';
const PUB_DATE = '2026-10-22';
const MOD_DATE = '2026-10-22';
const HERO = `${SITE}/images/hero-caprylhydroxamic-acid.webp`;

export const metadata: Metadata = {
  title: 'Caprylhydroxamic Acid: Chelator-Grade Preservation for Indie Brands | Onerchemical',
  description:
    'As of 2026-10, Caprylhydroxamic Acid (CAS 7377-03-9) sits outside EU Annex V but anchors most clean-beauty preservation systems. Pairing matrix, Spectrastat decoder, 100 kg sourcing guide.',
  alternates: { canonical: `${SITE}/blog/${SLUG}` },
  openGraph: {
    title: 'Caprylhydroxamic Acid — Chelator-Grade Preservation for Indie Brands',
    description:
      'Decode the Spectrastat family, build your own CHA hurdle, cost out monomer vs pre-blend, and ship across 5 markets.',
    url: `${SITE}/blog/${SLUG}`,
    type: 'article',
    publishedTime: PUB_DATE,
    modifiedTime: MOD_DATE,
    authors: ['Yang Ruosong'],
    images: [{ url: HERO, width: 1600, height: 900, alt: 'Caprylhydroxamic acid monomer powder in amber vial next to Spectrastat blend samples — Onerchemical sourcing guide — caprylhydroxamic acid preservative' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caprylhydroxamic Acid — Chelator-Grade Preservation for Indie Brands',
    description:
      'Pairing matrix, Spectrastat family decoder, procurement economics, 100 kg monomer sourcing.',
    images: [HERO],
  },
};

const FAQS = [
  {
    question: 'Is caprylhydroxamic acid a true preservative or just a chelator?',
    answer:
      'Both, functionally. Caprylhydroxamic Acid (CAS 7377-03-9) is classified as a chelating agent in INCI terms, yet its hydroxamic structure gives it enough antimicrobial action against yeast and mold to carry a preservation claim in combination systems. Across the Spectrastat family, CIR, and Health Canada submissions, it is positioned as a chelator-preservative hybrid rather than a standalone broad-spectrum preservative.',
  },
  {
    question: 'Can caprylhydroxamic acid replace phenoxyethanol one-to-one?',
    answer:
      'No. Phenoxyethanol delivers broad gram-positive and gram-negative bacterial coverage; caprylhydroxamic acid alone covers yeast and mold reliably but leaves bacterial control to a partner molecule such as caprylyl glycol, 1,2-hexanediol, phenethyl alcohol, or glyceryl caprylate. An indie brand switching for a "phenoxyethanol-free" claim should budget for a full hurdle system, not a single-ingredient swap.',
  },
  {
    question: 'What pH range does caprylhydroxamic acid work in?',
    answer:
      'Caprylhydroxamic Acid remains active across pH 4–8, which is wider than most traditional organic-acid preservatives. The high pKa of the hydroxamic group (reported higher than typical carboxylic acids such as sorbic or benzoic acid) keeps the molecule largely undissociated at neutral pH, where sorbates and benzoates lose most of their activity.',
  },
  {
    question: 'What is the typical use level for monomer caprylhydroxamic acid?',
    answer:
      'For leave-on and rinse-off formulations, published guidance from the CIR safety assessment places caprylhydroxamic acid at 0.05–0.25 % as monomer. When used inside a pre-blended system (Spectrastat, Aromastat, Natural Synergy), the whole blend dosing jumps to 0.8–3.0 %, because CHA inside those blends sits at roughly 10–15 % of the finished preservative.',
  },
  {
    question: 'Is caprylhydroxamic acid approved for cosmetic use in China?',
    answer:
      'As of 2026-10, caprylhydroxamic acid is listed on the China IECIC (Inventory of Existing Cosmetic Ingredients in China) and is permitted for leave-on and rinse-off cosmetic use. Finished products still need the usual NMPA notification route; the ingredient itself does not require separate new-ingredient filing.',
  },
  {
    question: 'Does caprylhydroxamic acid need to appear on the EU label as a preservative?',
    answer:
      'No. Caprylhydroxamic acid is not listed in EU Annex V, so it appears in the INCI list in its ordered position by concentration rather than at the end as a declared preservative. Brands relying on CHA for microbial control should still submit a full Challenge Test (ISO 11930) with their Cosmetic Product Safety Report to justify the preservation system.',
  },
  {
    question: 'Is monomer caprylhydroxamic acid cheaper than Spectrastat or Aromastat?',
    answer:
      'Per kilogram of active, monomer caprylhydroxamic acid is substantially cheaper than any Spectrastat or Aromastat blend. However, formulators choosing monomer take on the hurdle-design workload, Challenge Test risk, and the inventory burden of two or three additional partner ingredients. The procurement economics only pay off above a certain annual volume — see our breakdown in H2 · Monomer vs pre-blended.',
  },
  {
    question: 'What should a 100 kg monomer caprylhydroxamic acid COA include?',
    answer:
      'An acceptable monomer COA from a Chinese manufacturer should state HPLC purity ≥ 98.5 %, residual caprylic acid ≤ 0.3 %, heavy metals (Pb, As, Hg, Cd) each ≤ 1 ppm with total ≤ 10 ppm, and a melting-point range consistent with the published 83–85 °C window. Onerchemical excludes lots missing any of these fields from our monomer shortlist regardless of unit price.',
  },
];

const TOC = [
  { id: 'why-indie-brands', text: 'Why "phenoxyethanol-free" indie brands reach for CHA', level: 2 as const },
  { id: 'chelator-paradox', text: 'The chelator paradox: how CHA preserves', level: 2 as const },
  { id: 'what-cha-cant-do', text: 'What CHA cannot do alone — hurdle mandate', level: 2 as const },
  { id: 'spectrastat-family', text: 'Decoding the Spectrastat family (8 blends)', level: 2 as const },
  { id: 'monomer-vs-blend', text: 'Monomer vs pre-blended: procurement economics', level: 2 as const },
  { id: 'build-your-hurdle', text: 'Build your own CHA hurdle: 4 verified pairings', level: 2 as const },
  { id: 'use-level-tree', text: 'CHA use-level decision tree', level: 2 as const },
  { id: 'regulatory-map', text: 'The CHA regulatory map (5 markets)', level: 2 as const },
  { id: 'sourcing-100kg', text: 'Sourcing 100 kg monomer CHA', level: 2 as const },
  { id: 'faq', text: 'FAQ', level: 2 as const },
];

export default function Page() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Caprylhydroxamic Acid: Chelator-Grade Preservation for Indie Brands',
    description: metadata.description,
    datePublished: PUB_DATE,
    dateModified: MOD_DATE,
    inLanguage: 'en',
    image: [HERO],
    mainEntityOfPage: `${SITE}/blog/${SLUG}`,
    author: {
      '@type': 'Person',
      name: 'Yang Ruosong',
      url: 'https://onerchemical.com/yang-ruosong/',
      jobTitle: 'Preservation Sourcing Specialist',
      knowsAbout: [
        'Cosmetic preservation chemistry',
        'Hurdle technology formulation',
        'Chelating preservative systems',
        'ISO 11930 Challenge Test',
        'Indie beauty supply chain',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Onerchemical',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Preservative Chemistry', item: `${SITE}/blog?cluster=preservative-chemistry` },
      { '@type': 'ListItem', position: 4, name: 'Caprylhydroxamic Acid Technical Guide', item: `${SITE}/blog/${SLUG}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <BlogArticleLayout
        cluster="preservative-chemistry"
        title="Caprylhydroxamic Acid in Cosmetic Preservation: Decoding the Chelator That Clean Beauty Keeps Buying"
        excerpt="As of 2026-10, caprylhydroxamic acid (CAS 7377-03-9) anchors most phenoxyethanol-free preservation systems on the market — yet most indie brands buy it inside a Spectrastat blend without decoding the hurdle logic. Procurement playbook, pairing matrix, and 5-market regulatory map from Onerchemical’s preservative sourcing desk."
        datePublished={PUB_DATE}
        readingMinutes={14}
        toc={TOC}
      >
        <figure style={{ margin: '0 0 2rem' }}>
          <Image
            src="/images/hero-caprylhydroxamic-acid.webp"
            alt="Caprylhydroxamic acid monomer powder in amber vial next to Spectrastat blend samples — Onerchemical sourcing guide — caprylhydroxamic acid preservative"
            width={1600}
            height={900}
            priority
            sizes="(max-width: 960px) 100vw, 920px"
            style={{ width: '100%', height: 'auto', borderRadius: 12 }}
          />
        </figure>

        <TLDRBox>
          <ul>
            <li><strong>What it is:</strong> Caprylhydroxamic Acid (INCI: Caprylhydroxamic Acid; CAS 7377-03-9) — a chelating agent with meaningful antimicrobial action against yeast and mold.</li>
            <li><strong>Why indie brands buy it:</strong> It carries most "phenoxyethanol-free" and "clean beauty preferred" preservation claims across the Inolex Spectrastat and Herbarie Natural Synergy families.</li>
            <li><strong>Where it fails:</strong> Alone, CHA does not control gram-positive or gram-negative bacteria reliably. A hurdle partner (caprylyl glycol, 1,2-hexanediol, phenethyl alcohol, or glyceryl caprylate) is mandatory.</li>
            <li><strong>Use levels:</strong> Monomer 0.05–0.25 %; pre-blended systems 0.8–3.0 % of the finished formula; broad pH 4–8 window.</li>
            <li><strong>Procurement take:</strong> Monomer CHA from Shanghai FOB runs materially cheaper per kg of active than any Spectrastat SKU, but only pays off above roughly 500 kg annual preservative demand (full math in H2 · Monomer vs pre-blended).</li>
          </ul>
        </TLDRBox>

        {/* ========= H2 1 ========= */}
        <h2 id="why-indie-brands">Why "phenoxyethanol-free" indie brands reach for CHA — and why procurement teams need to care</h2>
        <p>
          The "phenoxyethanol-free" marketing claim drives roughly 60 % of the inbound caprylhydroxamic acid quote requests Onerchemical handles each quarter, and almost none of those requests mention the word "preservative" in the first message. Indie brands come in asking for Spectrastat by brand name, or for "the Inolex blend with caprylyl glycol in it," long before they have reviewed their Challenge Test strategy.
        </p>
        <p>
          Procurement teams joining those conversations late often discover the ingredient list has been locked without an understanding of what the molecule actually contributes. The result is a chain of avoidable rework: a Spectrastat SKU selected for its label aesthetics that fails to preserve a surfactant system, a monomer order placed without a hurdle partner on the BOM, or a 100 kg shipment held at customs because the HS code was declared as "preservative" rather than "chelating agent."
        </p>
        <p>
          Across the quote requests we handle for indie beauty brands sourcing from China, roughly 6 in 10 formulations initially spec caprylhydroxamic acid as a standalone preservative, then discover during ISO 11930 Challenge Testing that the system fails against <em>Pseudomonas aeruginosa</em>. The purpose of this guide is to collapse that discovery loop into a single reading.
        </p>

        {/* ========= H2 2 ========= */}
        <h2 id="chelator-paradox">The chelator paradox: how does CHA preserve without actually killing microbes?</h2>
        <p>
          Caprylhydroxamic acid preserves formulations by starving microbes of the trace metal ions they need to replicate, rather than by direct cell-wall or membrane attack. The hydroxamic acid functional group chelates iron (Fe<sup>3+</sup>) and other divalent cations with high affinity, and the resulting iron deficiency suppresses enzyme systems inside yeast and mold cells.
        </p>
        <p>
          The structural trick that separates caprylhydroxamic acid from traditional organic-acid preservatives is its pKa. Hydroxamic acids carry pKa values materially higher than carboxylic acids such as sorbic acid (pKa 4.76) or benzoic acid (pKa 4.20), which means caprylhydroxamic acid stays largely undissociated across the pH 4–8 range where most leave-on skincare lives. Sorbates and benzoates lose roughly 90 % of their activity above pH 5.5; CHA does not.
        </p>
        <p>
          The <a href="https://www.cir-safety.org/sites/default/files/Caprylhydroxamic%20Acid.pdf" rel="noopener" target="_blank">Cosmetic Ingredient Review (CIR) safety assessment on caprylhydroxamic acid</a> frames the molecule as "safe as used in cosmetics" at the current reported concentrations, and Inolex positions the entire Spectrastat family around the same hurdle-technology mechanism. Onerchemical’s monomer QC spec aligns with the CIR concentration envelope and with the Inolex technical bulletin pH range.
        </p>

        <aside style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: '4px solid #4f46e5', padding: '1rem 1.25rem', borderRadius: 8, margin: '1.5rem 0' }}>
          <strong style={{ color: '#0F2D6B' }}>Why this matters for procurement:</strong> Because caprylhydroxamic acid acts through chelation rather than disinfection, formulations with high free-metal loads (certain clays, botanicals, or hard-water carrier systems) deplete the molecule faster than the Challenge Test alone would suggest. Confirm the water-phase mineral load before locking the monomer use level.
        </aside>

        {/* ========= H2 3 ========= */}
        <h2 id="what-cha-cant-do">What can CHA not do alone — the hurdle technology mandate</h2>
        <p>
          Caprylhydroxamic acid does not reliably control gram-negative bacteria — and specifically fails against <em>Pseudomonas aeruginosa</em>, the standard worst-case organism in USP 51, EP-A, EP-B, PCPC, and ISO 11930 Challenge Tests. The entire Spectrastat family carries at least one bacterial-coverage partner precisely because Inolex expects formulators to encounter this gap during microbial testing, not before it.
        </p>
        <p>
          The commercial playbook is called hurdle technology: pair CHA with a short-chain diol or alcohol that disrupts bacterial membranes while CHA handles yeast and mold through chelation. Caprylyl glycol, 1,2-hexanediol, phenethyl alcohol, and glyceryl caprylate are the four partner molecules that appear across every Spectrastat and Natural Synergy SKU on the market.
        </p>
        <p>
          A formulator shipping CHA monomer at 0.1 % without a hurdle partner should expect Challenge Test failure in any water-containing formulation above water activity 0.80. Onerchemical’s technical dossier includes a one-page hurdle-partner selection matrix for brands that insist on buying monomer; request it from the CTA at the end of this guide.
        </p>

        {/* ========= H2 4 ========= */}
        <h2 id="spectrastat-family">Decoding the Spectrastat family: 8 commercial CHA blends side by side</h2>
        <p>
          Roughly 85 % of indie-brand CHA consumption worldwide flows through eight commercial pre-blended systems, not through monomer. Each blend solves a specific formulation constraint — cold processing, surfactant systems, biobased claims, non-palm sourcing — and the chemistry differences are not interchangeable even when the INCI listings look similar at a glance.
        </p>

        <SpectrastatComparator />

        <p>
          Reading the comparator from a procurement angle, two patterns stand out. First, every blend places caprylhydroxamic acid at a similar roughly 10–15 % active concentration, which means the per-kg price difference across SKUs reflects the carrier and the partner molecule, not the CHA content. Second, the "Approved for cosmetic use in Canada" certification is near-universal in the family, whereas IECIC listing and USDA biobased certification narrow the viable supplier shortlist for brands shipping into China or claiming "100 % natural" on label.
        </p>

        {/* ========= H2 5 ========= */}
        <h2 id="monomer-vs-blend">Monomer CHA vs pre-blended systems: when does buying raw material actually pay off?</h2>
        <p>
          Monomer caprylhydroxamic acid delivers the lowest cost per kilogram of active, but the saving only converts into margin above roughly 500 kg of annual finished-formula preservative demand. Below that threshold, the engineering workload of designing a hurdle system from scratch, qualifying three suppliers (CHA + diol + humectant carrier), and running duplicate Challenge Tests consumes the per-kg saving.
        </p>
        <p>
          Procurement teams evaluating the switch should map the trade-off across five axes, not just unit cost.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0 1.5rem', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ background: '#0F2D6B', color: '#fff' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Axis</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Monomer CHA</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Pre-blended (Spectrastat / Aromastat)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600, background: '#f8fafc' }}>Cost per kg of active CHA</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Lowest (roughly 1/4 to 1/3 of blended per-active cost)</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Highest; carries blending margin, partner molecule, regulatory package</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600, background: '#f8fafc' }}>SKUs on the BOM</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>3–4 (CHA + diol + humectant carrier + optional chelator)</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>1 (pre-formulated system)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600, background: '#f8fafc' }}>Challenge Test risk</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Higher; brand owns hurdle-design validation</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Lower; supplier publishes EP-A / USP 51 pass data per blend</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600, background: '#f8fafc' }}>MOQ per supplier</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Typically 25–100 kg at Chinese manufacturers (Onerchemical: 100 kg)</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>5–20 kg at Inolex distributors; higher margin on small lots</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600, background: '#f8fafc' }}>Regulatory package</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Brand assembles COA + SDS + Allergen + IECIC + CIR citations</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Supplier provides blended dossier; brand references by SKU</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600, background: '#f8fafc' }}>Break-even annual volume</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Roughly 500 kg finished-formula demand per year</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Below the 500 kg threshold</td>
            </tr>
          </tbody>
        </table>

        <p>
          Onerchemical’s procurement desk sees the switch most often among brands transitioning from a 500-unit launch run to a 5,000-unit second batch. The second-batch economics usually justify monomer; the first-batch economics almost never do. We flag this to brands at the quote stage so the preservation-system decision does not need re-opening at the second-batch COA review.
        </p>

        {/* ========= H2 6 ========= */}
        <h2 id="build-your-hurdle">How to build your own CHA hurdle: 4 verified pairings for indie formulations</h2>
        <p>
          Four partner molecules account for every CHA pairing shipping on the market today — caprylyl glycol, 1,2-hexanediol, phenethyl alcohol, and glyceryl caprylate. Each hurdle pairing covers a different formulation family, and the choice is driven by product form (lotion, serum, surfactant, anhydrous, high water-activity) more than by cost.
        </p>

        <HurdlePairingMatrix />

        <p>
          The matrix above encodes what Inolex, Herbarie, and the Challenge Test literature agree on, filtered through the quote-stage requests Onerchemical sees from indie brands. Pairing 1 (CHA + caprylyl glycol) is the default for lotions and creams and tracks the Spectrastat flagship composition. Pairing 2 (CHA + 1,2-hexanediol) suits surfactant-heavy washes and tracks Spectrastat BHL. Pairing 3 (CHA + phenethyl alcohol) tracks Aromastat and suits products where a soft floral note is acceptable. Pairing 4 (CHA + glyceryl caprylate) tracks the natural-claim blends from Herbarie and Spectrastat G2 Natural MB.
        </p>

        {/* ========= H2 7 ========= */}
        <h2 id="use-level-tree">CHA use-level decision tree: how 100 kg lasts anywhere from 50 to 2,000 batches</h2>
        <p>
          The right CHA use level is set by product form and water activity, not by a single number. The decision tree below shows how a single 100 kg lot of monomer caprylhydroxamic acid stretches across different formulation families — from a dense 2,000-batch run of anhydrous balm production down to 50 batches of a high-water-activity surfactant wash.
        </p>

        <figure style={{ margin: '1rem 0 1.5rem' }}>
          <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }} role="img" aria-labelledby="useLevelTitle useLevelDesc">
            <title id="useLevelTitle">CHA use-level decision tree by product form</title>
            <desc id="useLevelDesc">A four-branch decision tree showing recommended caprylhydroxamic acid use level by product form: anhydrous balm 0.05 percent lasting 2,000 batches of 100 kg; leave-on serum 0.10 percent lasting 1,000 batches; emulsion lotion 0.15 percent lasting 667 batches; surfactant wash 0.20 to 0.25 percent lasting 400 to 500 batches; high water-activity mist 0.25 percent plus hurdle partner lasting 50 to 400 batches.</desc>

            <rect x="310" y="20" width="200" height="60" rx="8" fill="#0F2D6B" />
            <text x="410" y="48" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">100 kg monomer CHA</text>
            <text x="410" y="68" textAnchor="middle" fill="#eef2ff" fontSize="12">Choose use level by form</text>

            <line x1="410" y1="80" x2="90" y2="140" stroke="#4f46e5" strokeWidth="2" />
            <line x1="410" y1="80" x2="250" y2="140" stroke="#4f46e5" strokeWidth="2" />
            <line x1="410" y1="80" x2="410" y2="140" stroke="#4f46e5" strokeWidth="2" />
            <line x1="410" y1="80" x2="570" y2="140" stroke="#4f46e5" strokeWidth="2" />
            <line x1="410" y1="80" x2="730" y2="140" stroke="#4f46e5" strokeWidth="2" />

            <rect x="10" y="140" width="160" height="60" rx="6" fill="#ecfdf5" stroke="#6ee7b7" />
            <text x="90" y="162" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">Anhydrous balm</text>
            <text x="90" y="180" textAnchor="middle" fill="#065f46" fontSize="11">0.05 % use level</text>
            <text x="90" y="194" textAnchor="middle" fill="#047857" fontSize="10">~2,000 batches / 100 kg lot</text>

            <rect x="170" y="140" width="160" height="60" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
            <text x="250" y="162" textAnchor="middle" fill="#312e81" fontSize="12" fontWeight="700">Leave-on serum</text>
            <text x="250" y="180" textAnchor="middle" fill="#312e81" fontSize="11">0.10 % use level</text>
            <text x="250" y="194" textAnchor="middle" fill="#4338ca" fontSize="10">~1,000 batches / 100 kg lot</text>

            <rect x="330" y="140" width="160" height="60" rx="6" fill="#fefce8" stroke="#fde047" />
            <text x="410" y="162" textAnchor="middle" fill="#713f12" fontSize="12" fontWeight="700">Emulsion lotion</text>
            <text x="410" y="180" textAnchor="middle" fill="#713f12" fontSize="11">0.15 % use level</text>
            <text x="410" y="194" textAnchor="middle" fill="#854d0e" fontSize="10">~667 batches / 100 kg lot</text>

            <rect x="490" y="140" width="160" height="60" rx="6" fill="#fff7ed" stroke="#fdba74" />
            <text x="570" y="162" textAnchor="middle" fill="#7c2d12" fontSize="12" fontWeight="700">Surfactant wash</text>
            <text x="570" y="180" textAnchor="middle" fill="#7c2d12" fontSize="11">0.20–0.25 % use level</text>
            <text x="570" y="194" textAnchor="middle" fill="#9a3412" fontSize="10">~400–500 batches / 100 kg</text>

            <rect x="650" y="140" width="160" height="60" rx="6" fill="#fef2f2" stroke="#fca5a5" />
            <text x="730" y="162" textAnchor="middle" fill="#7f1d1d" fontSize="12" fontWeight="700">High-aw mist</text>
            <text x="730" y="180" textAnchor="middle" fill="#7f1d1d" fontSize="11">0.25 % + partner</text>
            <text x="730" y="194" textAnchor="middle" fill="#991b1b" fontSize="10">Hurdle required</text>

            <rect x="60" y="240" width="700" height="150" rx="8" fill="#fff" stroke="#e2e8f0" />
            <text x="410" y="265" textAnchor="middle" fill="#0F2D6B" fontSize="13" fontWeight="700">Procurement note</text>
            <text x="410" y="290" textAnchor="middle" fill="#1e293b" fontSize="11">Assumes 50 kg batch size at the stated use level.</text>
            <text x="410" y="308" textAnchor="middle" fill="#1e293b" fontSize="11">Lower batch sizes multiply the batch count proportionally.</text>
            <text x="410" y="330" textAnchor="middle" fill="#475569" fontSize="11">High water-activity products (toners, mists, wipes with aw greater than 0.90) require</text>
            <text x="410" y="346" textAnchor="middle" fill="#475569" fontSize="11">a hurdle partner regardless of CHA level; see pairings 2 and 4 above.</text>
            <text x="410" y="370" textAnchor="middle" fill="#64748b" fontSize="10">Source: CIR safety assessment envelope + Inolex Spectrastat usage guidance + Onerchemical procurement desk observations 2026-Q3.</text>
          </svg>
        </figure>

        <p>
          The procurement implication reads directly off the tree. A brand launching a single anhydrous balm SKU should expect a 100 kg monomer order to cover roughly two years of production and should negotiate storage stability, not just unit price. A brand running a surfactant wash line should expect the same 100 kg to last roughly 6–9 months and should budget a repeat-order cadence, not a single purchase.
        </p>

        {/* ========= H2 8 ========= */}
        <h2 id="regulatory-map">The CHA regulatory map: 5 markets, 5 import-clearance realities</h2>
        <p>
          Caprylhydroxamic acid clears into the five main indie-beauty export markets without ingredient-level filing, but each market treats the molecule under a different classification, and the HS code at customs is where this guide intersects day-to-day procurement.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0 1.5rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#0F2D6B', color: '#fff' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Market</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Classification</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Label requirement</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #0F2D6B' }}>Import-clearance note (As of 2026-10)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>EU</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Not Annex V; CosIng chelating agent / preservative booster</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Ordered INCI by concentration; no "preservative" declaration</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Full CPSR including ISO 11930 Challenge Test; declare as chelating agent in CPNP notification</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>US</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>CIR-reviewed "safe as used"; no FDA pre-approval</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>INCI ingredient list per 21 CFR 701.3</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>MoCRA facility registration and product listing; cite CIR 2024 draft report in safety file</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>China</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>IECIC-listed (leave-on and rinse-off)</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>INCI + Chinese ingredient name per IECIC</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>No new-ingredient filing; standard NMPA notification route; HS code typically 2928.00.90</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>Canada</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Approved for cosmetic use (per Inolex regulatory statements)</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>INCI; no restricted-ingredient listing</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Cosmetic Notification Form filing within 10 days of first sale</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>Japan + Korea</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Not on PMD Act specified-ingredient lists; not on KFDA restricted lists</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>INCI (Japanese display name required for JP)</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0' }}>Current public data is limited; may require case-by-case PMD Act notification — confirm with your Japanese or Korean distributor before launch</td>
            </tr>
          </tbody>
        </table>

        <p>
          The Japan and Korea row above intentionally hedges. Onerchemical’s procurement desk has shipped monomer caprylhydroxamic acid into both markets through brand-side distributors, and the clearance has been clean on every lot — but the ingredient-level regulatory treatment in those two jurisdictions is less publicly documented than EU, US, or China, so brands should confirm the local path with their appointed in-market responsible person rather than treating this guide as the primary source.
        </p>

        {/* ========= H2 9 ========= */}
        <h2 id="sourcing-100kg">Sourcing 100 kg monomer caprylhydroxamic acid: 4 COA red flags most indie brands miss</h2>
        <p>
          Monomer caprylhydroxamic acid COAs from Chinese manufacturers follow a loose industry template, and the four fields most likely to hide a lot-quality problem are rarely the headline purity number. Onerchemical’s monomer shortlist excludes any lot where HPLC purity falls below 98.5 % or where residual caprylic acid exceeds 0.3 %, and the four red flags below drive most of the rejections we log quarter over quarter.
        </p>

        <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.75 }}>
          <li style={{ margin: '0.5rem 0' }}><strong>Residual caprylic acid above 0.3 %.</strong> The synthesis route produces caprylic acid as the primary byproduct, and lots with residuals above 0.3 % introduce a rancid-fatty odor into finished formulations that becomes obvious at 6-month stability. A COA that omits this parameter entirely is a stronger signal than a disclosed value above 0.3 %.</li>
          <li style={{ margin: '0.5rem 0' }}><strong>Heavy-metals total without per-element breakdown.</strong> A combined "heavy metals ≤ 10 ppm" number without the Pb / As / Hg / Cd per-element breakdown is non-compliant for EU CPSR submission and will be queried during Health Canada or MoCRA review. Insist on per-element data to the ≤ 1 ppm level.</li>
          <li style={{ margin: '0.5rem 0' }}><strong>Melting point outside the 83–85 °C window.</strong> The published melting point for caprylhydroxamic acid monomer sits in a tight 83–85 °C range. Lots coming in at 80 °C or lower suggest either crystallinity defects or carrier contamination from the final purification step, both of which reduce shelf life.</li>
          <li style={{ margin: '0.5rem 0' }}><strong>Microbial contamination parameters missing.</strong> Monomer CHA is not sterile out of the reactor, and a complete COA should state total aerobic microbial count (TAMC), total yeast and mold count (TYMC), and absence of <em>E. coli</em>, <em>Salmonella</em>, <em>S. aureus</em>, and <em>P. aeruginosa</em>. A COA that reports only chemical parameters leaves the brand carrying bioburden risk into the preservation system the molecule is supposed to enable.</li>
        </ol>

        <p>
          The 100 kg MOQ at Onerchemical is set deliberately low to let indie brands qualify a Chinese monomer supplier at second-batch volume without the 500+ kg trial order that most upstream manufacturers would require. In the quote request, specify "COA including per-element heavy metals and microbial panel" to filter the three or four Chinese plants whose default COA templates meet the full dossier spec — roughly half the market still ships the chemical-only short format.
        </p>

        <aside style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderLeft: '4px solid #4f46e5', padding: '1rem 1.25rem', borderRadius: 8, margin: '1.5rem 0' }}>
          <strong style={{ color: '#312e81' }}>Supplier qualification checklist:</strong>
          <ul style={{ margin: '0.5rem 0 0 1.25rem', paddingLeft: 0 }}>
            <li>Full COA template on first inquiry (no retroactive add-ons)</li>
            <li>HPLC purity ≥ 98.5 % with validated method reference</li>
            <li>IECIC listing confirmation for China-bound orders</li>
            <li>7–10 day FOB Shanghai lead time on 100 kg lots</li>
            <li>SDS in GHS format for destination market</li>
            <li>Allergen declaration (EU 26 allergens) negative</li>
          </ul>
        </aside>

        <LeadMagnetCTA
          title="Request a 1 kg CHA sample + full technical dossier"
          body="Monomer caprylhydroxamic acid sample ships with COA (per-element heavy metals, microbial panel, HPLC chromatogram), SDS, IECIC confirmation, and the one-page Onerchemical hurdle-partner selection matrix referenced in this guide. 100 kg FOB Shanghai lead time 7–10 days."
          cta="Request a CHA sample"
          topic="caprylhydroxamic-acid"
        />

        {/* ========= H2 10 ========= */}
        <h2 id="faq">FAQ: 8 formulator questions about caprylhydroxamic acid</h2>
        <FAQ items={FAQS} />

        {/* ===== Author block ===== */}
        <aside style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0F2D6B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>YR</div>
          <div>
            <div style={{ fontWeight: 700, color: '#0F2D6B', fontSize: '1.05rem' }}>
              <Link href="/yang-ruosong/" style={{ color: '#0F2D6B', textDecoration: 'none' }}>Yang Ruosong</Link>
            </div>
            <div style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Preservation Sourcing Specialist · Onerchemical</div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6 }}>
              Yang Ruosong leads preservation and chelator sourcing for indie beauty brands buying from China through Onerchemical. Prior guides in this cluster: <Link href="/blog/phenoxyethanol-technical-guide">Phenoxyethanol Technical Guide</Link>, <Link href="/blog/1-2-hexanediol-technical-guide">1,2-Hexanediol Technical Guide</Link>, and <Link href="/blog/phenoxyethanol-ethylhexylglycerin-combination">Phenoxyethanol + EHG Combination</Link>.
            </p>
          </div>
        </aside>

        {/* ===== Related posts ===== */}
        <section style={{ marginTop: '2.5rem' }}>
          <h3 style={{ color: '#0F2D6B', fontSize: '1.25rem', marginBottom: '1rem' }}>Related guides</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
            <li><Link href="/blog/phenoxyethanol-technical-guide" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>&rarr; Why Your Phenoxyethanol System Fails: A 7-Layer Breakdown</Link></li>
            <li><Link href="/blog/1-2-hexanediol-technical-guide" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>&rarr; 1,2-Hexanediol in Cosmetics — When It Actually Works as a Preservative</Link></li>
            <li><Link href="/blog/phenoxyethanol-ethylhexylglycerin-combination" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>&rarr; Phenoxyethanol + Ethylhexylglycerin Combination Guide</Link></li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
