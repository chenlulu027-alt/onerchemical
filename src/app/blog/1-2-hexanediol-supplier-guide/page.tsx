import type { Metadata } from 'next';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import HexanediolPriceBenchmarkTable from '@/components/blog/article-10/HexanediolPriceBenchmarkTable';
import HexanediolSupplierTierDecisionMatrix from '@/components/blog/article-10/HexanediolSupplierTierDecisionMatrix';
import { getArticle } from '@/lib/blog-registry';

const SLUG = '1-2-hexanediol-supplier-guide';
const SITE = 'https://onerchemical.com';
const CANONICAL = `${SITE}/blog/${SLUG}`;
const PUBLISHED = '2026-10-30T00:00:00.000Z';
const MODIFIED = '2026-10-30T00:00:00.000Z';

export const metadata: Metadata = {
  title: '1,2-Hexanediol Supplier Guide: Price, CoA Red Flags, 100kg MOQ (2026)',
  description:
    '2026 FOB China price benchmarks across 4 supplier tiers (USD 12-70/kg), 7-field CoA red flags specific to 1,2-hexanediol, and a 100kg MOQ procurement SOP built from a Berlin indie-brand case where cheapest was not cheapest.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    url: CANONICAL,
    siteName: 'Onerchemical',
    title: '1,2-Hexanediol Supplier Guide (2026): Price, CoA, 100kg MOQ',
    description:
      'Four-tier 2026 price benchmarks, isomer-purity CoA red flags, and a 100kg-sweet-spot procurement SOP for 1,2-hexanediol — written for indie beauty formulators sourcing direct.',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: [`${SITE}/yang-ruosong/`],
    images: [
      {
        url: `${SITE}/images/blog/article-10/hero.jpg`,
        width: 1600,
        height: 900,
        alt: '1,2-Hexanediol being measured into a 100kg stainless drum at a Jiangsu cosmetic-grade filling line',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1,2-Hexanediol Supplier Guide (2026)',
    description:
      'FOB China 2026 price benchmarks, isomer-purity CoA red flags, 100kg MOQ procurement SOP.',
  },
};

export default function Page() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      '1,2-Hexanediol Supplier Guide: Price Benchmarks, CoA Red Flags &amp; 100kg MOQ Playbook (2026)',
    description:
      '2026 FOB China price benchmarks across 4 supplier tiers (USD 12-70/kg), 7-field CoA red flags, and a 100kg MOQ procurement SOP for 1,2-hexanediol in cosmetic preservation.',
    mainEntityOfPage: CANONICAL,
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    author: {
      '@type': 'Person',
      name: 'Yang Ruosong',
      url: `${SITE}/yang-ruosong/`,
      jobTitle: 'Preservation Sourcing Specialist',
      worksFor: { '@type': 'Organization', name: 'Onerchemical' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Onerchemical',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
    },
    image: `${SITE}/images/blog/article-10/hero.jpg`,
    about: [
      { '@type': 'Thing', name: '1,2-Hexanediol' },
      { '@type': 'Thing', name: 'Cosmetic Preservative Sourcing' },
      { '@type': 'Thing', name: 'CAS 6920-22-5' },
    ],
    keywords:
      '1,2-hexanediol supplier, hexanediol price, hexanediol MOQ, hexanediol CoA, Hydrolite 6, cosmetic preservative sourcing',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sourcing',
        item: `${SITE}/blog?cluster=sourcing`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: '1,2-Hexanediol Supplier Guide',
        item: CANONICAL,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Can I trust the USD 10/kg 1,2-hexanediol listings on Alibaba?',
      answer:
        'Below USD 11/kg at 100kg is below current Jiangsu/Shandong direct-plant cost in Q4 2026. Three failure modes are typical: (1) sample bait-and-switch — first batch GC-pure, follow-ups blended with 1,6-hexanediol or industrial-grade; (2) non-cosmetic hazmat residue (residual catalyst, aldehydes) that fails a serious challenge test; (3) the listing is a reseller sitting on 25kg of unknown origin stock. If budget is genuinely tight, choose a trader at USD 14-16/kg with a verified repack site rather than a USD 9 listing from a trading company with no CoA history.',
    },
    {
      question: 'What does USD 15 vs USD 25 actually buy me at 100kg?',
      answer:
        'At USD 15/kg you are usually buying Jiangsu cosmetic-grade monomer repacked by a trader with ISO 22716 facility audit, a 95-98% GC CoA, and 10-15 day lead time from a Dongguan warehouse. At USD 25/kg you are buying either Korean BESTCARE500-type generic (99.5% GC, documented isomer separation, pharma-adjacent facility) or a trader-held Hydrolite 6 analog with full REACH + non-animal declaration pack. The USD 10 gap buys documentation defensibility — not more active ingredient per gram.',
    },
    {
      question: 'Is Symrise Hydrolite 6 the only credible branded choice for EU indie brands?',
      answer:
        'For "clean beauty retailer" paperwork gates (Credo, Sephora Clean, Whole Foods Premium Body Care), branded Hydrolite 6 still clears audits fastest because the brand file is already on reviewer desks. Minasolve offers a comparable European-manufactured option. Korean BESTCARE500-grade and Japanese Nagase SR grades pass most retailer gates when paired with your own third-party test report. The USD 45-70/kg Hydrolite 6 price buys brand-recognition shortcut; it does not buy a different molecule.',
    },
    {
      question: 'How do I verify the real manufacturer behind a Chinese 1,2-hexanediol quote?',
      answer:
        'Request three artifacts together: (1) a facility GMP/ISO 22716 certificate with the production address printed, not a scanned trading-company letterhead; (2) the latest batch CoA where the production site field matches the certificate address; (3) a 30-second plant-walk video with the day\'s batch number on the whiteboard. Cross-check the address against Jiangsu/Shandong provincial industrial park registries. 80%+ of real 1,2-hexanediol cosmetic-grade capacity in China is concentrated in a short list of plants — a trader cannot name three real producers in the region, that trader is itself the first repack layer.',
    },
    {
      question: 'What is a realistic trial order for 1,2-hexanediol in 2026?',
      answer:
        'Direct plants: 100kg minimum, 500g free sample standard. Traders: 25kg flex-MOQ common, 250-500g sample often charged at USD 50-80 refunded against first order. Korean/Japanese grades: 25kg single-drum minimum through local distributor, 100g sample free. Branded Hydrolite 6: 20kg pail minimum through Symrise distributor, formulation sample pack free on application. Below 25kg you are paying courier-shipped repack premium (USD 35-50/kg effective).',
    },
    {
      question: 'How do I detect a source-plant switch between batches?',
      answer:
        'Lock in three fingerprint fields on your incoming QC: (1) GC assay — a 0.5% drift between batches from the same supposed plant is normal, more than 1.5% signals a different synthesis route; (2) water content by Karl Fischer — the baseline moisture signature of a plant\'s drying step is stable; (3) trace isomer peak pattern on the GC trace itself (ask for the chromatogram, not just the assay number). A supplier that cannot or will not send the raw chromatogram is a supplier that cannot defend plant-of-origin consistency.',
    },
    {
      question: 'Which Jiangsu plants are actually direct producers vs trader repackers?',
      answer:
        'Public naming of plants here is intentionally avoided — the plant roster shifts quarterly as capacity consolidates. A direct dossier request to our sourcing desk returns the current verified-direct list with GMP cert copies. The decision rule to apply yourself: a direct plant will have a cosmetic raw material registration number tied to the physical production address, will accept a plant visit with 2 weeks notice, and will not resist invoicing from the same legal entity that signs the CoA.',
    },
    {
      question: 'What are the real price-break tiers for 1,2-hexanediol?',
      answer:
        'Current 2026 Q4 FOB China for Jiangsu cosmetic-grade monomer: 25kg USD 16-19, 100kg USD 12-14, 500kg USD 10-12, 1000kg+ USD 9-11. Trader repack adds USD 2-4/kg at every tier. Korean/Japanese grades scale less — 25kg USD 24-28, 100kg USD 18-22, 500kg USD 16-19. Branded Hydrolite 6 holds price with volume (USD 55-70/kg sustained to 500kg). The sharpest break for an indie brand is 25kg to 100kg (30-40% unit drop); the next break at 500kg is only 10-15% and usually not worth the inventory cost.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
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
        cluster="sourcing"
        title="1,2-Hexanediol Supplier Guide: Price Benchmarks, CoA Red Flags &amp; 100kg MOQ Playbook (2026)"
        excerpt="2026 FOB China price benchmarks across 4 supplier tiers (USD 12-70/kg), 7-field CoA red flags specific to 1,2-hexanediol, and a 100kg MOQ procurement SOP built from a Berlin indie-brand case where the cheapest quote was not cheapest in use."
        datePublished={PUBLISHED}
        readingMinutes={14}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              2026 Q4 FOB China 100kg benchmarks: Chinese commodity USD 12-14/kg, trader repack
              USD 14-18/kg, Korean/Japanese pharma-adjacent USD 18-26/kg, branded EU (Hydrolite 6)
              USD 45-70/kg.
            </li>
            <li>
              100kg is the real sweet spot for indie brands: the 25→100kg price break is 30-40%,
              the 100→500kg break is only 10-15% and usually not worth the inventory cost.
            </li>
            <li>
              Seven CoA fields matter for 1,2-hexanediol specifically — GC assay, isomer purity
              (1,2- vs 1,6- vs mixed), KF water content, ICP-MS heavy metals, GC-headspace residual
              solvents, microbial load, and verifiable batch-plant-date triplet.
            </li>
            <li>
              USD 10 under genuine Jiangsu direct-plant cost is a quality flag, not a bargain —
              the three failure modes are isomer blending, residual-catalyst hazmat, and
              bait-and-switch between sample and bulk.
            </li>
            <li>
              100kg MOQ, 7-10 day lead time, full COA + SDS + REACH + non-animal declaration pack
              available from our sourcing desk — request a dossier below for the current
              verified-direct plant list.
            </li>
          </ul>
        </TLDRBox>

        <h2 id="berlin-opener">
          The USD 2,400 Berlin indie-brand four-quote spread
        </h2>
        <p>
          In Q2 2026 a Berlin indie serum brand reached our desk with four live quotes for 100kg of
          1,2-hexanediol: USD 9.80/kg from a Shenzhen trading company, USD 14.50/kg from a Jiangsu
          repack trader, USD 22/kg from a Korean distributor citing BESTCARE500-equivalent spec,
          and USD 58/kg from a Symrise Hydrolite 6 reseller. On price alone the spread is 5.9×. The
          brand had already paid for a 500g sample from the USD 9.80 quote and the formulator liked
          the smell and viscosity.
        </p>
        <p>
          The brand chose the USD 9.80/kg quote and placed a 100kg order. Six weeks later an ISO
          11930 Challenge Test on the production emulsion failed at day 14 — <em>P. aeruginosa</em>{' '}
          regrowth from 10<sup>6</sup> to 10<sup>5</sup> instead of the required 2-log reduction.
          Reformulation, re-testing and a 100kg write-off landed at EUR 2,400 against the EUR 100
          they thought they had saved against the USD 14.50 trader.
        </p>
        <p>
          Post-mortem GC on retained sample versus the originally-sent 500g: the sample was 99.1%
          1,2-hexanediol; the bulk shipment was 94.2% 1,2-hexanediol with 3.8% 1,6-hexanediol and
          2.0% unidentified diol residues. The bulk was within commodity industrial-grade spec and
          failed cosmetic antimicrobial performance precisely because the 1,6-isomer does not share
          1,2-hexanediol&apos;s membrane-disruption activity.
        </p>
        <p>
          This article exists because that failure mode is systematic, not a one-off. The next nine
          sections are the decoder, the pricing floor, the CoA fields that catch it, and the
          procurement SOP that prevents it.
        </p>

        <h2 id="three-tier-decoder">
          Three-tier supplier decoder for 1,2-hexanediol
        </h2>
        <p>
          The global 1,2-hexanediol cosmetic market segments cleanly into four supply tiers. The
          molecule is identical in a correctly-run plant at any tier; what differs is documentation
          density, batch-to-batch isomer-purity consistency, and the paperwork that clean-beauty
          retailers accept at audit.
        </p>
        <h3 id="tier-1-chinese-commodity">Tier 1 — Chinese commodity (Jiangsu / Shandong direct plant)</h3>
        <p>
          80%+ of global cosmetic-grade 1,2-hexanediol capacity sits in a short list of Jiangsu and
          Shandong plants that also run industrial-grade output for coatings and resin. Cosmetic
          lines run as segregated campaigns with dedicated distillation. CoA depth: GC assay +
          basic heavy metals + microbial. Minimum: 100kg. Price band: USD 12-14/kg at 100kg
          (Q4 2026).
        </p>
        <h3 id="tier-2-trader-repack">Tier 2 — Trader / repack (Dongguan, Shanghai, Hong Kong)</h3>
        <p>
          Traders buy from Tier 1 in 1000kg lots, repack into 25kg pails or 200kg drums in an
          ISO 22716-audited facility, and add their own CoA layer. Flex MOQ 25-200kg. Lead time
          10-15 days from warehouse stock. Price band: USD 14-18/kg at 100kg. For an indie brand
          below 400kg annual pull, trader economics beat going direct — the direct-plant minimum
          and dossier-management overhead do not amortize.
        </p>
        <h3 id="tier-3-korean-japanese">Tier 3 — Korean / Japanese pharma-adjacent</h3>
        <p>
          Korean grades (BESTCARE500 and equivalents) and Japanese grades (Nagase and Daito-grade
          lines) run on pharma-adjacent plants with documented isomer-separation steps and tighter
          GC specifications (99.5% minimum). The paperwork pack includes REACH pre-registration,
          non-animal declaration, and formulation-support literature. Minimum typically 25kg
          single-drum. Price band: USD 18-26/kg at 100kg.
        </p>
        <h3 id="tier-4-branded-eu">Tier 4 — Branded EU (Symrise Hydrolite 6, Minasolve)</h3>
        <p>
          Hydrolite 6 is Symrise&apos;s branded 1,2-hexanediol with European manufacturing, full
          Ecocert &amp; COSMOS certification options, and a brand file already on major
          clean-beauty retailer desks. Minasolve offers a comparable European-sourced alternative.
          Price band: USD 45-70/kg at 100kg, held even at 500kg. You are paying for brand
          recognition that shortcuts retailer gatekeeper audits — not for a different molecule.
        </p>

        <h2 id="100kg-sweet-spot">
          Why 100kg MOQ is the sweet spot for indie formulators
        </h2>
        <p>
          Three economic breakpoints shape the 1,2-hexanediol MOQ decision for an indie brand
          pulling under 1000kg/year:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>25 to 100kg:</strong> 30-40% unit price drop. The repack premium evaporates
            because 100kg fits a standard HDPE pail. Freight per kg roughly halves.
          </li>
          <li>
            <strong>100 to 500kg:</strong> 10-15% unit price drop. Capital tied up in inventory
            grows 5× for a 10-15% saving — this breakpoint only makes sense when a brand has 12+
            months of validated annual pull data.
          </li>
          <li>
            <strong>500kg to 1000kg (direct-plant threshold):</strong> an additional 10-12% drop,
            but adds dossier-maintenance overhead (CoA archive, batch traceability, direct audit
            scheduling) that is only worth paying for above ~800kg/year sustained demand.
          </li>
        </ul>
        <p>
          For a brand launching with 3-6 SKU preserved by a dual phenoxy + hexanediol system at
          1.5% hexanediol inclusion, 100kg of 1,2-hexanediol supports roughly 6,600kg of finished
          emulsion — typically 12-18 months of first-launch demand. Buying 100kg from a verified
          trader at USD 14-18/kg is the arithmetically correct answer for Year 1.
        </p>

        <h2 id="price-benchmark-table">
          2026 price benchmark table — tier &times; quantity
        </h2>
        <p>
          Prices below are FOB China (Tier 1 &amp; 2) or ex-works origin (Tier 3 &amp; 4),
          cosmetic-grade only, excluding freight and import duties, verified against four
          supplier-side quotes we gathered in October 2026. Use the filter to see how tier choice
          and order quantity move the per-kg cost.
        </p>
        <HexanediolPriceBenchmarkTable />

        <h2 id="coa-red-flags">
          Seven CoA red flags specific to 1,2-hexanediol
        </h2>
        <p>
          A CoA that passes commodity-industrial spec can still fail cosmetic preservation. These
          are the seven fields that catch the three failure modes seen in real indie-brand
          incidents (isomer blending, residual catalyst, bait-and-switch).
        </p>
        <h3 id="coa-1-assay">1. GC assay (not just &quot;purity&quot;)</h3>
        <p>
          Specification: GC assay by area% on a method capable of resolving C6-diol isomers. Minimum
          99.0% for Tier 1-2, 99.5% for Tier 3-4. A CoA that reports &quot;purity: 99.0%&quot; with
          no method citation is not an assay. Reject.
        </p>
        <h3 id="coa-2-isomer">2. Isomer purity — the field most CoAs omit</h3>
        <p>
          Specification: individual peaks for 1,6-hexanediol, 2,5-hexanediol, and mixed diol
          residues each &lt;0.3%, total non-1,2-isomers &lt;0.5%. This is the field that the Berlin
          case bulk shipment failed. Ask for the GC chromatogram image, not just the number. A
          supplier that will not send the chromatogram cannot defend the number.
        </p>
        <h3 id="coa-3-water">3. Water content (Karl Fischer titration)</h3>
        <p>
          Specification: &le;0.3% by KF. The baseline moisture signature of a given plant&apos;s
          drying step is stable batch-to-batch; a KF value that drifts more than 0.1% across three
          consecutive batches from the same supposed plant is a plant-switch flag.
        </p>
        <h3 id="coa-4-heavy-metals">4. Heavy metals (ICP-MS, not colorimetric)</h3>
        <p>
          Specification: Pb &le;5 ppm, As &le;3 ppm, Cd &le;3 ppm, Hg &le;1 ppm, total heavy metals
          &le;10 ppm, by ICP-MS. Colorimetric &quot;passes USP &lt;231&gt;&quot; is 1990s
          methodology and insufficient for 2026 EU 1223/2009 importer defence.
        </p>
        <h3 id="coa-5-residual-solvents">5. Residual solvents (GC headspace)</h3>
        <p>
          Specification: methanol, ethanol, acetone, and process-specific solvents each &le;500 ppm
          by GC headspace. A missing residual-solvent panel usually means the plant ran the
          cosmetic campaign on shared equipment with an industrial run and skipped the clearance
          verification.
        </p>
        <h3 id="coa-6-microbial">6. Microbial load</h3>
        <p>
          Specification: TAMC &le;100 CFU/g, TYMC &le;10 CFU/g, absence of <em>P. aeruginosa</em>,{' '}
          <em>S. aureus</em>, <em>E. coli</em> per gram. 1,2-hexanediol is self-preserving at
          supplied neat concentration, but incoming CoAs should still carry the panel — its absence
          suggests the plant does not run cosmetic-grade microbial release testing.
        </p>
        <h3 id="coa-7-batch-triplet">7. Batch number + production date + production site</h3>
        <p>
          Specification: all three present, on the CoA, matching the invoice and the GMP/ISO 22716
          facility certificate. A CoA with batch number but no production site, or with a
          production site that does not match the certified facility, means the material was
          repacked by an entity that does not have the production records to defend it.
        </p>

        <h2 id="supplier-decision-matrix">
          Supplier tier decision matrix — rank by your real priorities
        </h2>
        <p>
          Four priorities drive the tier choice: unit price, certification depth, lead time, and
          traceability. Different indie brands weight them differently depending on retailer gates,
          cash runway, and formulation stage. Adjust the sliders to see which tier ranks first for
          your situation.
        </p>
        <HexanediolSupplierTierDecisionMatrix />

        <h2 id="compliance-paperwork">
          Six-document compliance paperwork checklist (cosmetic-grade import)
        </h2>
        <p>
          For a 100kg cosmetic-grade import of 1,2-hexanediol into EU, US, or developed-Asia
          markets, this is the minimum paperwork set that keeps the shipment moving through customs
          and defensible at post-market audit.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>CoA + SDS + TDS triplet</strong> — all three on supplier letterhead, batch
            numbers consistent across all three documents.
          </li>
          <li>
            <strong>GMP / ISO 22716 facility certificate</strong> — current, with the production
            site address matching the CoA.
          </li>
          <li>
            <strong>REACH pre-registration confirmation</strong> (EU-bound shipments) — supplier
            or your EU importer-of-record carries the registration.
          </li>
          <li>
            <strong>Certificate of Origin + commercial invoice</strong> — HS code 2905.39, country
            of origin matching the facility certificate.
          </li>
          <li>
            <strong>Third-party test report</strong> — SGS, Intertek, or BV test on retained
            sample of the shipped lot (not the historical typical).
          </li>
          <li>
            <strong>Non-animal testing declaration</strong> — mandatory for EU 1223/2009, India,
            and increasingly US retailer audit (Credo, Sephora Clean).
          </li>
        </ol>

        <h2 id="regulatory-map">
          Five-market regulatory snapshot (importer responsibility)
        </h2>
        <p>
          1,2-hexanediol is not listed in EU Cosmetic Regulation 1223/2009 Annex V. It is used as a
          multifunctional skin-conditioning / humectant ingredient with incidental antimicrobial
          activity — the regulatory handling differs materially by market.
        </p>
        <h3 id="reg-eu">EU — Regulation 1223/2009</h3>
        <p>
          Non-Annex V. INCI name &quot;Hexylene Glycol&quot; is a distinct substance (do not
          substitute). CPNP notification required on finished product; supplier CoA + REACH
          evidence folded into Product Information File. Importer-of-record responsibility sits
          with the EU-based entity.
        </p>
        <h3 id="reg-us">USA — MoCRA</h3>
        <p>
          Facility registration required (effective 2024 enforcement). No preservative-specific
          cap. Safety substantiation records must support use level; typical 0.5-3% as
          multifunctional booster.
        </p>
        <h3 id="reg-china">China — IECIC 2021</h3>
        <p>
          1,2-hexanediol is on the IECIC inventory under its CAS 6920-22-5. New-ingredient filing
          not required. Notified finished products must declare the ingredient at the use level in
          the formula.
        </p>
        <h3 id="reg-japan">Japan — Quasi-Drug &amp; Cosmetic</h3>
        <p>
          Permitted in general cosmetics without a positive-list cap. For medicated / quasi-drug
          categories, pharmacopeia-grade purity documentation required — Tier 3 (Japanese) or Tier
          4 grades fit this gate.
        </p>
        <h3 id="reg-korea">Korea — KFDA (MFDS)</h3>
        <p>
          Permitted in general cosmetics. Functional-cosmetic category (brightening, anti-wrinkle,
          sunscreen) requires finished-product efficacy filing but does not restrict 1,2-hexanediol
          at ingredient level.
        </p>

        <h2 id="procurement-sop">
          Seven-step procurement SOP (RFQ to receipt QC)
        </h2>
        <p>
          Apply these steps in order for every new supplier. Steps 2 and 7 are the two that catch
          the Berlin failure mode before it ships.
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Issue RFQ with the 7 CoA fields spelled out.</strong> Specify assay method,
            isomer purity threshold, KF water, ICP-MS panel, GC-headspace solvent panel, microbial
            panel, batch-site-date triplet requirement. Suppliers who cannot answer at RFQ stage
            drop out before they waste your sample budget.
          </li>
          <li>
            <strong>Dossier audit before sample.</strong> Request facility certificate, latest
            typical CoA with GC chromatogram, and REACH / regulatory pack. Verify production site
            address matches between all three. This step rejects 40-60% of first-contact
            suppliers.
          </li>
          <li>
            <strong>Sample order (500g free from Tier 1-2; 250-500g paid USD 50-80 from traders;
            100g free from Tier 3-4).</strong> Receive with batch number — this becomes your
            retained sample for later chromatogram comparison.
          </li>
          <li>
            <strong>Payment terms — 30/70 T/T is the default.</strong> 30% deposit against pro
            forma invoice, 70% against B/L copy. Avoid full-advance for first order; reject
            suppliers who insist.
          </li>
          <li>
            <strong>Pre-shipment inspection (SGS or BV) for first order above 100kg.</strong> USD
            300-450 one-time cost. The inspector pulls samples from the actual drums, not
            supplier-provided retains.
          </li>
          <li>
            <strong>Incoterm choice — FOB China for 100kg+ to a freight-forwarder relationship,
            EXW only if your forwarder has China pickup capability.</strong> CIF only when your
            volume genuinely does not justify a forwarder relationship.
          </li>
          <li>
            <strong>Receipt QC — mandatory GC spot-check against retained sample chromatogram.</strong>{' '}
            This is the step that caught the Berlin isomer blend. In-house GC is ideal; local
            contract lab GC run (USD 80-150) is the realistic indie-brand version.
          </li>
        </ol>

        <LeadMagnetCTA
          title="Verified-direct Jiangsu plant list &amp; CoA template pack"
          body="Current (Q4 2026) list of verified-direct 1,2-hexanediol production sites in Jiangsu/Shandong, with GMP certificate copies, a GC chromatogram comparison template, and the 7-field RFQ template you can send to any supplier tomorrow. Sent to your inbox within 2 business hours."
          cta="Request the sourcing dossier"
          topic="hexanediol-sg-dossier"
        />

        <FAQ
          heading="1,2-Hexanediol procurement FAQ"
          id="hexanediol-faq"
          items={faqItems}
        />

        <aside className="mt-16 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold mb-2">About the author</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Yang Ruosong</strong> is Onerchemical&apos;s preservation sourcing specialist,
            focused on direct-plant and verified-trader supply of preservation raw materials for
            indie beauty brands and small-to-mid formulators. Day-to-day work covers RFQ triage,
            CoA defensibility audits, 100kg MOQ coordination, and the paperwork pack that keeps
            cosmetic-grade imports moving through EU, US and APAC customs. Read more at{' '}
            <a href="/yang-ruosong/" className="underline">
              /yang-ruosong/
            </a>
            .
          </p>
        </aside>

        <section className="mt-12">
          <h2 id="related-reading">Related reading</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="/blog/1-2-hexanediol-technical-guide">
                1,2-Hexanediol Technical Guide
              </a>{' '}
              — mechanism, usage rate matrix, pairing compatibility.
            </li>
            <li>
              <a href="/blog/phenoxyethanol-vs-1-2-hexanediol">
                Phenoxyethanol vs 1,2-Hexanediol
              </a>{' '}
              — the broad-spectrum matchup and cost-in-use math.
            </li>
            <li>
              <a href="/blog/phenoxyethanol-supplier-guide">
                Phenoxyethanol Supplier Guide
              </a>{' '}
              — sister sourcing guide, same tier framework.
            </li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
