import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import { getArticle } from '@/lib/blog-registry';
import InteractiveMarketComparator from '@/components/blog/pillar-03/InteractiveMarketComparator';
import PreservativeMarketLegalityMatrix from '@/components/blog/pillar-03/PreservativeMarketLegalityMatrix';

const SLUG = 'preservation-regulations-pillar';
const CANONICAL = 'https://onerchemical.com/guide/preservation-regulations';
const PUBLISHED = '2026-11-03';
const MODIFIED = '2026-11-03';

export const metadata: Metadata = {
  title: 'Cosmetic Preservative Regulations: 5-Market Compliance Guide for Export (2026)',
  description:
    'EU Annex V, US MoCRA, China IECIC, Japan Cosmetics Standard, Korea MFDS — how preservative legality, limits, and documentation differ across the 5 export markets. For compliance managers and regulatory affairs leads.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Cosmetic Preservative Regulations: A 5-Market Compliance Framework',
    description:
      'Side-by-side regulatory comparison across EU, US, China, Japan, Korea for cosmetic preservatives. 15 preservatives × 5 markets legality matrix, 6-document compliance stack, change-management SOP.',
    url: CANONICAL,
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ['https://onerchemical.com/yang-ruosong'],
  },
};

const faqItems = [
  {
    question: 'Can one preservative dossier be used for all five markets?',
    answer:
      'No. The EU Annex V, China STSC Table 4, Japan Cosmetics Standard positive list, and Korea MFDS preservative annex each require country-specific CAS verification, concentration-limit mapping, and compliance declarations. The US MoCRA framework has no federal positive list, but requires its own safety substantiation record. A single CoA + SDS covers raw material identity; the regulatory wrapper must be rebuilt per market.',
  },
  {
    question: 'Which market has the strictest preservative controls as of November 2026?',
    answer:
      'By rule structure, EU is strictest: Annex V is a closed positive list (59 entries) and any preservative function outside it is non-compliant. By claim-specific restriction, China is strictest for formaldehyde-releasing systems (STSC prohibits formaldehyde outright). By documentation burden per batch, Korea MFDS Notice 2026-19 requires the most granular product-category restrictions. By enforcement variability, US MoCRA plus California Prop 65 overlay creates state-level risk even with federal compliance.',
  },
  {
    question: 'What changed in EU preservative rules in 2026?',
    answer:
      'Three Omnibus Acts updated Annex V in 2026. Regulation (EU) 2026/78 (Omnibus VIII, effective 2026-05-01) tightened o-Phenylphenol restrictions. Regulation (EU) 2026/909 (Omnibus 2, in force 2026-05-18) updated multiple annexes including preservatives. Omnibus Act IX (WTO-notified 2026-07-08, compliance from 2027-02-01) will move Butylparaben to a new entry 12b with child-product restrictions and delete entries 16/17 to complete the mercury-based preservative phase-out. Formaldehyde-releaser labeling threshold dropped from 0.05% to 0.001% effective 2026-07-31.',
  },
  {
    question: 'Does China STSC Table 4 differ from EU Annex V in structure?',
    answer:
      'Structure is similar — both are closed positive lists where any preservative function outside the list is prohibited. Content differs. China STSC Table 4 currently lists 49 permitted preservatives versus EU Annex V 59. NMPA Announcement No. 6 of 2026 removed Zinc Pyrithione from Table 4 (prohibition effective 2028-01-01); NMPA Announcement No. 48 of 2026 regulates Biphenyl-2-ol at max 0.2%. The IECIC adopted dual-list structure (List I and List II) since 2025-06, with five dynamic adjustments completed by August 2026 — NMPA no longer issues each update as a separate announcement, raising procurement-side vigilance requirements.',
  },
  {
    question: 'How does Japan handle preservatives not on its positive list?',
    answer:
      'Japan applies "entrepreneurial responsibility" to cosmetics (not quasi-drugs). A preservative not on the Cosmetics Standard positive list (72 entries as of October 2025) may be used at the company&apos;s discretion if the company can substantiate safety. This is a structural difference from EU and China&apos;s closed systems. For quasi-drugs (medicated cosmetics), the separate JSQI 2021 standards apply — amendments from 2025-03-21 became mandatory 2026-10-01 after the transition period ended.',
  },
  {
    question: 'Why is Korea&apos;s preservative list so much longer (153 entries)?',
    answer:
      'Korea MFDS lists more preservatives on its positive list, but typically with narrower concentration caps or product-category restrictions than EU equivalents. A larger positive list is not a more permissive regime — it is a more granular one. The canonical Korean source (화장품 안전기준 등에 관한 규정, MFDS Notice 2026-19 effective 2026-03-18) governs; English translations are partial and non-canonical for critical compliance decisions.',
  },
];

export default function PreservationRegulationsPillar() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cosmetic Preservative Regulations: 5-Market Compliance Guide for Export (2026)',
    description:
      'EU Annex V, US MoCRA, China IECIC, Japan Cosmetics Standard, Korea MFDS — how preservative legality, limits, and documentation differ across the 5 export markets.',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    author: {
      '@type': 'Person',
      name: 'Yang Ruosong',
      url: 'https://onerchemical.com/yang-ruosong',
      jobTitle: 'Preservation Regulatory Specialist',
      knowsAbout: [
        'EU Cosmetics Regulation 1223/2009',
        'US MoCRA compliance',
        'China IECIC and STSC',
        'Japan Cosmetics Standard',
        'Korea MFDS cosmetic safety',
        'Cosmetic preservative regulatory affairs',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Onerchemical',
      url: 'https://onerchemical.com',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://onerchemical.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://onerchemical.com/guide' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Preservation Regulations',
        item: CANONICAL,
      },
    ],
  };

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
        cluster="regulatory"
        title="Cosmetic Preservative Regulations: A 5-Market Compliance Framework"
        excerpt="EU Annex V, US MoCRA, China IECIC, Japan Cosmetics Standard, Korea MFDS — how preservative legality, limits, and documentation differ across the five main export markets."
        datePublished={PUBLISHED}
        readingMinutes={14}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The five main export markets use four structurally different preservative frameworks: EU and China run <strong>closed positive lists</strong> (Annex V, 59 entries; STSC Table 4, 49 entries); Japan runs a <strong>positive list plus entrepreneurial-responsibility</strong> fallback (72 entries); Korea runs a <strong>hybrid negative plus positive</strong> system (153 preservatives on the positive list); the US has <strong>no federal positive list</strong> and relies on safety substantiation under MoCRA.
            </li>
            <li>
              One CoA plus SDS covers raw material identity. The regulatory wrapper &mdash; Annex V entry number, STSC Table 4 serial, Japan positive-list entry, Korea positive-list entry, US safety substantiation record &mdash; must be rebuilt per market.
            </li>
            <li>
              2026 brought three EU Omnibus Acts (VIII, Omnibus 2, draft Act IX), a NMPA Zinc Pyrithione prohibition landing 2028-01-01, Japan JSQI 2021 transition ending 2026-10-01, and Korea MFDS Notice 2026-19 effective 2026-03-18. Dossiers compiled before 2026-11 require re-validation.
            </li>
          </ul>
        </TLDRBox>

        <aside className="my-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-slate-800">
          <p className="mb-2 font-semibold">About this guide</p>
          <p>
            Written for compliance managers, regulatory affairs leads, and QC teams at established cosmetic brands and contract manufacturers running recurring preservative purchases across multiple markets. The 5-market comparison matrix (Section 6) and the Compliance Dossier Checklist (Section 9) are the operational artefacts; the rest frames how to read them. Not for formulators choosing which preservative to use &mdash; for selection logic see the <Link href="/guide/cosmetic-preservatives" className="text-indigo-700 underline">Cosmetic Preservatives Pillar</Link>.
          </p>
        </aside>

        <h2 id="rotterdam-opener">Why a single-market dossier fails cross-border audits</h2>
        <p>
          In August 2026, a mid-sized Korean indie brand shipped the same emulsion to three markets. The Rotterdam customs lab flagged the preservative declaration (Phenoxyethanol 0.8%, EHG 0.3%, Caprylyl Glycol 0.4%) because the dossier listed EHG and Caprylyl Glycol in the preservative-system section &mdash; neither appears on EU Annex V, and declaring them as preservatives made the product non-compliant even though their actual function is multifunctional. The Los Angeles port cleared the same shipment the same week with the same dossier. Shenzhen customs held the shipment pending IECIC verification of a secondary surfactant that was fine in all three markets &mdash; the hold was documentation structure, not substance.
        </p>
        <p>
          Three ports, same product, three outcomes. The dossier was not wrong in any absolute sense &mdash; it was correct for one market and misaligned with the structure of the other two. This is the operational cost of treating preservative compliance as a single-market exercise.
        </p>

        <h2 id="framework-overview">How the five markets regulate preservatives (framework overview)</h2>
        <p>
          The five markets use four structurally different regulatory models. Understanding the model &mdash; before the entry limits &mdash; is what prevents the Rotterdam-type mismatch above.
        </p>
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-2 text-left">Market</th>
                <th className="border border-slate-300 p-2 text-left">Regulator</th>
                <th className="border border-slate-300 p-2 text-left">Model</th>
                <th className="border border-slate-300 p-2 text-left">Preservative count</th>
                <th className="border border-slate-300 p-2 text-left">Canonical reference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2"><strong>EU</strong></td>
                <td className="border border-slate-300 p-2">European Commission + SCCS</td>
                <td className="border border-slate-300 p-2">Closed positive list</td>
                <td className="border border-slate-300 p-2">59 (Annex V)</td>
                <td className="border border-slate-300 p-2">Regulation (EC) 1223/2009 Annex V (consolidated to Omnibus VIII, 2026-05)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2"><strong>US</strong></td>
                <td className="border border-slate-300 p-2">FDA (MoCRA) + state AGs (Prop 65, etc.)</td>
                <td className="border border-slate-300 p-2">No positive list; safety substantiation</td>
                <td className="border border-slate-300 p-2">N/A (CIR advisory only)</td>
                <td className="border border-slate-300 p-2">MoCRA 2022 + 21 USC 364c; facility renewal biennial from 2026-Q1</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2"><strong>China</strong></td>
                <td className="border border-slate-300 p-2">NMPA</td>
                <td className="border border-slate-300 p-2">Closed positive list (STSC) + ingredient inventory (IECIC)</td>
                <td className="border border-slate-300 p-2">49 (STSC 2015 Table 4)</td>
                <td className="border border-slate-300 p-2">STSC 2015 Table 4; IECIC List I + II (dynamic adjustments ongoing)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2"><strong>Japan</strong></td>
                <td className="border border-slate-300 p-2">MHLW + PMDA</td>
                <td className="border border-slate-300 p-2">Positive list + entrepreneurial-responsibility fallback (cosmetics); separate JSQI for quasi-drugs</td>
                <td className="border border-slate-300 p-2">72 (Cosmetics Standard, 2025-10)</td>
                <td className="border border-slate-300 p-2">Cosmetics Standard (化粧品基準); JSQI 2021 mandatory from 2026-10-01</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2"><strong>Korea</strong></td>
                <td className="border border-slate-300 p-2">MFDS (formerly KFDA, renamed 2013)</td>
                <td className="border border-slate-300 p-2">Hybrid negative + positive</td>
                <td className="border border-slate-300 p-2">153 (preservative positive list)</td>
                <td className="border border-slate-300 p-2">화장품 안전기준 등에 관한 규정; MFDS Notice 2026-19, effective 2026-03-18</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs italic text-slate-600">
          Sources: EU — Regulation (EC) 1223/2009 as amended by Regulations (EU) 2026/78 and 2026/909. US — FDA MoCRA Overview (fda.gov). China — NMPA STSC 2015 Table 4; IECIC. Japan — Global CosIng Japan Preservatives List (last update 2025-10-20). Korea — 화장품 안전기준 등에 관한 규정, MFDS Notice 2026-19. All sources accessed 2026-11-03.
        </p>

        <aside className="my-8 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">Related detail</p>
          <p className="text-sm text-slate-700">
            For the EU Annex V entry-by-entry breakdown, enforcement patterns (Safety Gate 2024-2026), and CPSR documentation specifics, see the <Link href="/blog/eu-annex-v-preservative-compliance-guide" className="text-indigo-700 underline">EU Annex V Compliance Guide</Link>. This Pillar frames the cross-market picture; that article does the EU depth.
          </p>
        </aside>

        <h2 id="market-comparator">Interactive: Preservative × market quick-check</h2>
        <p>
          Pick a preservative and a target market to see legality status, concentration limit, product-category restrictions, and the specific regulatory reference. The output is intended for a first-pass check; the final dossier submission must verify against the canonical reference text.
        </p>
        <InteractiveMarketComparator />

        <h2 id="positive-vs-negative">Positive list vs negative list: why one formula does not fit all</h2>
        <p>
          A closed positive list (EU Annex V, China STSC Table 4) permits only what is listed. A negative list (part of US and Korea structures) permits anything not explicitly prohibited. These are not two ways of saying the same thing &mdash; they produce opposite defaults for an unlisted substance.
        </p>
        <p>
          Methylisothiazolinone (MIT) illustrates the gap. The EU restricts MIT to rinse-off products at 0.0015% (Annex V entry 57); the US has no federal preservative-specific MIT limit; China restricts MIT to rinse-off at 0.0015% (STSC Table 4 serial 51); Japan&apos;s Cosmetics Standard limits MIT in leave-on to 0.01%; Korea permits MIT in rinse-off at 0.0015%. A leave-on serum containing 0.005% MIT is legal in Japan, non-compliant in EU and China, and sits in a US gray zone subject to CIR findings and state-level claims.
        </p>
        <p>
          Phenoxyethanol runs the opposite risk. All five markets permit it up to 1.0%, but with different documentation structures. In the EU, it is Annex V entry 29. In China, STSC Table 4 serial 55. In Japan, it is a positive-list preservative with the max 1.0% figure identical. In Korea, it is on the preservative positive list with 1.0%. In the US, Phenoxyethanol has no federal preservative-specific limit but is subject to California Prop 65 proposition status monitoring for 1,4-dioxane trace contamination introduced during synthesis. A single preservative with five different regulatory wrappers.
        </p>

        <h2 id="six-doc-stack">The six-document compliance stack (what every market demands)</h2>
        <p>
          Every one of the five markets requires six documents at the raw-material level. The structure is universal; the field-level content and the local reference numbers change per market. If one document is missing or formatted for the wrong market, the dossier fails inspection even if the product is substantively compliant.
        </p>
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-2 text-left">#</th>
                <th className="border border-slate-300 p-2 text-left">Document</th>
                <th className="border border-slate-300 p-2 text-left">What it proves</th>
                <th className="border border-slate-300 p-2 text-left">Market-specific field</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2">1</td>
                <td className="border border-slate-300 p-2">CoA (Certificate of Analysis)</td>
                <td className="border border-slate-300 p-2">Batch meets spec; identity + purity</td>
                <td className="border border-slate-300 p-2">EU: Annex V entry number cited; CN: STSC serial; US: ingredient as marketed; JP: positive-list entry; KR: 안전기준 entry</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2">2</td>
                <td className="border border-slate-300 p-2">SDS (Safety Data Sheet)</td>
                <td className="border border-slate-300 p-2">Handling, exposure, hazard classification</td>
                <td className="border border-slate-300 p-2">EU: CLP (Regulation 1272/2008); US: OSHA HazCom 2012; CN: GB/T 16483; JP: JIS Z 7253; KR: K-OSHA</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2">3</td>
                <td className="border border-slate-300 p-2">Challenge Test report (ISO 11930 / USP &lt;51&gt; / EP 5.1.3)</td>
                <td className="border border-slate-300 p-2">Preservation system efficacy proof</td>
                <td className="border border-slate-300 p-2">EU/KR/CN: ISO 11930 Criterion A/B; US: USP &lt;51&gt;; JP: Pharmacopoeia method 4.06</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2">4</td>
                <td className="border border-slate-300 p-2">Allergen / sensitiser declaration</td>
                <td className="border border-slate-300 p-2">Known contact-sensitising residues disclosed</td>
                <td className="border border-slate-300 p-2">EU: 81 fragrance allergens (full labeling 2026-07-31); US: no equivalent; CN: 24 listed; JP: n/a cosmetics; KR: 25-allergen rule</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2">5</td>
                <td className="border border-slate-300 p-2">INCI composition + concentration breakdown</td>
                <td className="border border-slate-300 p-2">Full formula transparency to regulator</td>
                <td className="border border-slate-300 p-2">EU: CPNP frame formulation + preservative %; US: product listing (Cosmetics Direct); CN: NMPA filing; JP: notification; KR: 보고서</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2">6</td>
                <td className="border border-slate-300 p-2">Change-notification SOP + batch retention plan</td>
                <td className="border border-slate-300 p-2">Supplier change management discipline</td>
                <td className="border border-slate-300 p-2">EU: PIF update; US: MoCRA facility record; CN: IECIC + 备案 variation; JP: minor change notice; KR: 변경보고</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Document (3) — the Challenge Test report — is the single artefact most often missing when a procurement team runs ad hoc preservative sourcing. For the test-protocol differences, see the <Link href="/blog/iso-11930-challenge-test-protocol" className="text-indigo-700 underline">ISO 11930 Challenge Test Protocol</Link>. For CoA batch consistency monitoring (document 1), see the <Link href="/blog/preservative-coa-batch-consistency" className="text-indigo-700 underline">Preservative CoA Batch Consistency Guide</Link>.
        </p>

        <h2 id="legality-matrix">Interactive: 15 preservatives × 5 markets legality matrix</h2>
        <p>
          The matrix below covers the 15 preservatives Onerchemical ships most frequently. Use the filters to narrow by product-category or claim constraint (natural claim, child-product, rinse-off). Each cell links to the canonical reference text or regulator notice.
        </p>
        <PreservativeMarketLegalityMatrix />
        <p className="text-xs italic text-slate-600 mt-4">
          As of 2026-11. Each cell cites the regulator notice version in use at date of publication. Verify against the regulator&apos;s live reference before any submission &mdash; Korean, Japanese, and Chinese regulators update inline on their official sites without separate announcements (NMPA since 2025).
        </p>

        <h2 id="three-pitfalls">Three common cross-border compliance pitfalls</h2>
        <p>
          Pitfall #1 — Submitting a single CoA to multiple markets. The CoA proves batch identity; it does not prove regulatory wrapper. Submit the same CoA to EU + US + China + Japan + Korea and the first market to flag it defines the compliance ceiling for the rest. Build a per-market CoA cover sheet that cites the local reference.
        </p>
        <p>
          Pitfall #2 — "Preservative-free" claim cross-market mismatch. EU has no formal definition in Regulation 1223/2009; the claim is allowable only if the product contains zero Annex V substances serving a preservative function. US has no restriction. China requires substantiation if the claim appears on the label. Japan and Korea permit the claim if the substituting ingredients are not technically functioning as preservatives (and both markets scrutinise multifunctional ingredients used at preservative-level concentrations). A product labelled "preservative-free" in the US and compliant for the US market can be reformulated to be non-compliant in the EU without a single ingredient changing.
        </p>
        <p>
          Pitfall #3 — Change-notification lag asymmetry. Supplier changes an upstream feedstock. EU PIF update: 60 days typical lead time. US MoCRA facility record: next biennial renewal. China 备案 variation: 30-60 days depending on filing type. Japan minor change notice: before next submission. Korea 변경보고: within 15 days for substantive changes. A single supplier change triggers five separate notification clocks. See the <Link href="/blog/preservative-coa-batch-consistency" className="text-indigo-700 underline">CoA batch consistency article</Link> for the operational workflow around this.
        </p>

        <h2 id="change-mgmt-sop">Regulatory change-management SOP (annual cadence)</h2>
        <p>
          A compliance team running recurring preservative purchases across the five markets needs a four-step annual rhythm. Steps 1 and 2 are horizon-scanning; steps 3 and 4 are dossier-maintenance.
        </p>
        <div className="my-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-1 text-sm font-semibold text-indigo-700">Step 1 — Monthly horizon scan</p>
            <p className="text-sm">EU: CeWay monthly roundup, EUR-Lex search for new 1223/2009 amendments. US: FDA Cosmetics News. China: NMPA official site + ChemLinked monthly recap. Japan: MHLW notifications. Korea: MFDS Notice pages. Log each hit against affected product lines.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-1 text-sm font-semibold text-indigo-700">Step 2 — Quarterly supplier dossier review</p>
            <p className="text-sm">Pull latest CoA + SDS from each supplier. Check for any upstream change, raw-material substitution, or impurity-profile shift. Flag any supplier that cannot produce an audit trail for the quarter.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-1 text-sm font-semibold text-indigo-700">Step 3 — Re-notification trigger evaluation</p>
            <p className="text-sm">If an ingredient has moved category (Zinc Pyrithione CN prohibition from 2028-01), concentration limit (EU Butylparaben child restriction from 2027-02), or claim status, trigger re-notification pipeline for each affected market. Three EU Omnibus Acts in 2026 means EU re-notification cadence is now at least annual.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-1 text-sm font-semibold text-indigo-700">Step 4 — Challenge Test re-validation</p>
            <p className="text-sm">Any formula change, supplier change, or packaging change triggers Challenge Test re-run per ISO 11930 / USP &lt;51&gt;. Scheduled annually as insurance against drift. Budget per SKU per year: USD 450-900 depending on test standard and lab.</p>
          </div>
        </div>

        <h2 id="uk-brexit">UK post-Brexit divergence (reference)</h2>
        <p>
          The UK Cosmetics Regulation (SI 2013/1478 as amended) parallels EU 1223/2009 but drifts incrementally. The 2026 UK amendments added 16 CMR substances to Annex II effective 2026-08-15. The UK SCCS equivalent (OPSS scientific advisory) does not always align with EU SCCS opinions; preservative restrictions can diverge within a 12-month window. Treat UK as a sixth market for dossier purposes, not as a copy of EU.
        </p>

        <h2 id="lead-magnet">Download: 5-Market Preservative Compliance Checklist</h2>
        <p>
          The checklist below consolidates the six-document stack (Section 5), the three pitfalls (Section 7), and the annual change-management SOP (Section 8) into an 18-item working document. Enter an email to receive the PDF.
        </p>
        <LeadMagnetCTA
          title="5-Market Preservative Compliance Checklist"
          body="18 items across submission docs, preservative-specific regulatory flags, and change-management SOP. Covers EU, US, China, Japan, Korea. For compliance managers and regulatory affairs leads running recurring preservative purchases."
          cta="Download the compliance checklist"
          topic="regulatory"
        />

        <h2 id="faq">Frequently asked questions</h2>
        <FAQ heading="Regulatory FAQ" id="regulatory-faq" items={faqItems} />

        <aside className="my-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">About the author</p>
          <p className="mb-2 text-base font-semibold text-slate-900">Yang Ruosong</p>
          <p className="text-sm text-slate-700">
            Preservation regulatory specialist at Onerchemical. Fifteen years in cross-border cosmetic raw-material compliance, with focus on EU Annex V, China STSC/IECIC, and the US MoCRA transition. Writes the Onerchemical preservation guides for compliance and procurement teams at established cosmetic brands and contract manufacturers.{' '}
            <Link href="/yang-ruosong" className="text-indigo-700 underline">
              Author page →
            </Link>
          </p>
        </aside>

        <aside className="my-10 rounded-xl border border-slate-200 bg-white p-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">Related reading</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog/eu-annex-v-preservative-compliance-guide" className="text-indigo-700 underline">
                EU Annex V Compliance Guide
              </Link>{' '}
              — single-market depth on EU preservative rules; CPSR + CPNP + Safety Gate enforcement.
            </li>
            <li>
              <Link href="/blog/preservative-coa-batch-consistency" className="text-indigo-700 underline">
                Preservative CoA Batch Consistency Guide
              </Link>{' '}
              — the batch-level monitoring that feeds the 6-doc stack above.
            </li>
            <li>
              <Link href="/blog/iso-11930-challenge-test-protocol" className="text-indigo-700 underline">
                ISO 11930 Challenge Test Protocol
              </Link>{' '}
              — the test standard underpinning Document 3.
            </li>
            <li>
              <Link href="/guide/cosmetic-preservatives" className="text-indigo-700 underline">
                Cosmetic Preservatives Pillar
              </Link>{' '}
              — formulator-facing selection framework for choosing a preservative.
            </li>
            <li>
              <Link href="/guide/preservative-sourcing" className="text-indigo-700 underline">
                Preservative Sourcing Pillar
              </Link>{' '}
              — procurement-side playbook: supplier tiers, MOQ economics, 7-step sourcing SOP.
            </li>
          </ul>
        </aside>
      </BlogArticleLayout>
    </>
  );
}
