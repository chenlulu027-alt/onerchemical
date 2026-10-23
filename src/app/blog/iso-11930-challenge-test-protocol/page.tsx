import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import { getArticle } from '@/lib/blog-registry';
import ChallengeTestDecisionWizard from '@/components/blog/article-06/ChallengeTestDecisionWizard';
import StrainFailureMatrix from '@/components/blog/article-06/StrainFailureMatrix';

const SLUG = 'iso-11930-challenge-test-protocol';
const URL = `https://onerchemical.com/blog/${SLUG}`;
const PUBLISHED = '2026-10-23';
const MODIFIED = '2026-10-23';
const TITLE = 'Why Your First Challenge Test Failed (And How to Pass ISO 11930 on the Second Try)';
const EXCERPT =
  'A procurement-view walkthrough of the ISO 11930 challenge test — what it actually measures, which criterion your product needs, how to read the five-strain panel, and the pre-submission checklist that keeps indie brands from paying for a second lab run.';

export const metadata: Metadata = {
  title: `${TITLE} | Onerchemical`,
  description: EXCERPT,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: EXCERPT,
    url: URL,
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ['Yang Ruosong'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: EXCERPT,
  },
};

const FAQ_ITEMS = [
  {
    question: 'How much does an ISO 11930 challenge test cost for an indie brand?',
    answer:
      'As of 2026-10, independent microbiology labs serving indie brands quote roughly USD 350-600 per SKU for a single ISO 11930 run with the standard 5-strain panel; USP <51> added in parallel usually adds USD 150-250. Chinese contract labs can run 20-40% cheaper, but turnaround and documentation quality vary. Expect 5-6 weeks from sample arrival to signed report.',
  },
  {
    question: 'Is ISO 11930 or USP <51> required by law in the EU and the US?',
    answer:
      'Neither EU Regulation 1223/2009 nor the US MoCRA names a specific challenge test method. EU 1223/2009 requires the Cosmetic Product Safety Report (CPSR) to demonstrate microbiological stability over shelf life, and ISO 11930 is the most widely accepted method among CPSR assessors. In the US, big-box retailers (Target, Ulta, Sephora) typically request USP <51> on specification sheets even though no federal law mandates it.',
  },
  {
    question: 'Can my formula pass Criterion B instead of Criterion A? When is that acceptable?',
    answer:
      'ISO 11930 Criterion B exists for products where usage patterns limit microbial exposure risk — short contact time, dilution during use, or rinsing. A Criterion B pass is defensible for most adult rinse-off formulas when paired with additional supporting evidence like production-batch bioburden controls. For leave-on products, baby care, eye-area products, or sensitive-skin claims, your CPSR assessor will almost always require Criterion A.',
  },
  {
    question: 'My bacteria passed at Day 7 but Pseudomonas regrew at Day 28 — what does that mean?',
    answer:
      'Regrowth after an initial kill is the classic signature of a biofilm-forming contamination path rather than a weak primary preservative. Pseudomonas aeruginosa (ATCC 9027) regrowth usually points to water system or packaging issues — recycled DI water, biofilm in storage tanks, or airless-pump tubing. Add a chelator (EDTA, GLDA, or Phytate 0.1-0.3%) and audit incoming water bioburden before paying for a reformulation.',
  },
  {
    question: 'Do anhydrous products (balms, oils, sticks) need a challenge test?',
    answer:
      'ISO 11930 Annex A allows a Microbial Risk Assessment (MRA) to substitute for the full challenge test when water activity (Aw) is below 0.75. Measure Aw first; if your anhydrous formula clears the threshold, a documented MRA and justification in the CPSR is usually accepted. The CPSR assessor retains case-by-case discretion, and emulsions above Aw 0.75 need the full protocol regardless of water content.',
  },
  {
    question: 'What is the difference between ISO 11930, USP <51>, EP 5.1.3, and CTFA M-3?',
    answer:
      'All four use the same 5-strain panel (E. coli, S. aureus, P. aeruginosa, C. albicans, A. brasiliensis) but set different log-reduction thresholds and timelines. ISO 11930 is the global cosmetic default (28-day Criterion A or B). USP <51> is the US pharmacopoeial method, now routinely requested by US retail. European Pharmacopoeia (EP) 5.1.3 is stricter than ISO 11930 and typically reserved for pharmaceutical-adjacent products. CTFA M-3 (Cosmetic, Toiletry and Fragrance Association) is a legacy US industry protocol still accepted by some assessors.',
  },
  {
    question: 'My preservative is listed on EU Annex V but my formula still failed Criterion A. Why?',
    answer:
      'Annex V listing confirms a preservative is permitted for cosmetic use at a specified maximum concentration; it does not guarantee the preservative will clear a challenge test in your specific formula. The failure usually traces to one of: wrong preservative for the formula pH (organic acids above pH 5.5), insufficient dose, antagonistic surfactant or chelator ratio, or raw-material bioburden overwhelming the preservation system. Audit the formula pH, preservative concentration, and incoming raw-material COAs before increasing the preservative dose.',
  },
  {
    question: 'Can I run an in-house challenge test instead of using a contract lab?',
    answer:
      'Technically yes, but very few indie brands have the microbiology infrastructure — biosafety cabinet, calibrated incubators, reference strain cultures with documented passage history, and a trained microbiologist signing off results. CPSR assessors and retailers almost always require an independent, ISO 17025-accredited laboratory report. In-house screening is useful for formula development iteration, but the compliance-grade report comes from a third-party lab.',
  },
];

const JSON_LD = {
  article: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: TITLE,
    description: EXCERPT,
    url: URL,
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: 'Yang Ruosong',
      url: 'https://onerchemical.com/yang-ruosong/',
      jobTitle: 'Preservation Sourcing Lead, Onerchemical',
      knowsAbout: [
        'Cosmetic preservation',
        'ISO 11930 challenge test',
        'Preservative efficacy testing',
        'Indie beauty sourcing',
        'EU Annex V compliance',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Onerchemical',
      url: 'https://onerchemical.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': URL,
    },
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://onerchemical.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://onerchemical.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Challenge Testing', item: 'https://onerchemical.com/blog?cluster=challenge-testing' },
      { '@type': 'ListItem', position: 4, name: TITLE, item: URL },
    ],
  },
};

export default function Page() {
  const article = getArticle(SLUG);

  return (
    <>
      <JsonLd data={JSON_LD.article} />
      <JsonLd data={JSON_LD.faq} />
      <JsonLd data={JSON_LD.breadcrumb} />

      <BlogArticleLayout
        cluster="challenge-testing"
        title={TITLE}
        excerpt={EXCERPT}
        datePublished={PUBLISHED}
        readingMinutes={14}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              ISO 11930:2019 is the global reference method for cosmetic preservative efficacy — a 28-day panel against 5 specific strains with two pass criteria (A: strict; B: relaxed, for lower-risk products).
            </li>
            <li>
              An ISO 11930 failure almost never means "add more preservative" — it usually points at pH mismatch, chelator absence, water-system contamination, or raw-material bioburden.
            </li>
            <li>
              Criterion B is defensible for most adult rinse-off formulas; Criterion A is non-negotiable for baby, eye-area, mucous-contact, and sensitive-skin products.
            </li>
            <li>
              US-bound products should run ISO 11930 and USP &lt;51&gt; in parallel — retailers still ask for USP paperwork even though US law mandates neither.
            </li>
            <li>
              Pre-submission checklist (pH, Aw, batch size, container material, preservative COA bundle) cuts repeat-test risk and shortens turnaround by 1-2 weeks.
            </li>
          </ul>
        </TLDRBox>

        {/* ========== H2 1: Opening scenario ========== */}
        <h2 id="first-test-failed">The USD 450 Lab Report That Said "Fail": What Actually Went Wrong</h2>
        <p>
          A Spanish indie skincare brand on our 100-kg Phenoxyethanol account shipped three 50 ml samples of a new vitamin C serum to a Barcelona microbiology lab in September 2026. Six weeks and EUR 420 later, the ISO 11930 report came back with a Criterion A fail — Pseudomonas aeruginosa (ATCC 9027) regrew to 4 × 10³ CFU/g by Day 28 after a clean Day 7 kill.
        </p>
        <p>
          The brand's first instinct was to raise the preservative dose from 0.8% Phenoxyethanol + 0.2% Ethylhexylglycerin to 1.0% + 0.3%. That instinct would have failed the second run too. The real culprit was the brand's co-manufacturer re-using purified water from an unlined polyethylene storage tank; Pseudomonas biofilm in the tank seeded the formula faster than the preservative system could neutralise fresh colony-forming units.
        </p>
        <p>
          The fix was a 0.15% Tetrasodium Glutamate Diacetate (GLDA) chelator addition plus a water-system audit at the co-man. The second ISO 11930 run passed Criterion A at Day 28 with a 4.1-log reduction. Total cost of the misdiagnosis: one wasted lab run, a six-week launch delay, and roughly EUR 2,000 in reformulation plus retesting fees.
        </p>
        <p>
          This article walks through the ISO 11930 protocol the way an indie brand owner needs to understand it — not as a microbiology textbook, but as a procurement document that tells you which questions to ask before you ship samples to a lab.
        </p>

        {/* ========== H2 2: What does it measure? ========== */}
        <h2 id="what-iso-11930-measures">What Does ISO 11930 Actually Measure?</h2>
        <p>
          ISO 11930:2019 (full title: <em>Cosmetics — Microbiology — Evaluation of the antimicrobial protection of a cosmetic product</em>) measures how much your preservation system can reduce a deliberately-added microbial inoculum over 28 days, strain by strain. The test does not measure in-use contamination resistance, nor does it predict shelf-life stability under thermal stress. It measures one thing: log reduction of a known challenge over time.
        </p>
        <p>
          A technician inoculates each 20 g aliquot of your product with approximately 10⁵-10⁶ CFU/g of one of five reference strains, then counts surviving colonies at Day 2 (optional), Day 7, Day 14, and Day 28. The log reduction at each timepoint is compared against the pass threshold for the chosen criterion. The published standard is maintained by ISO Technical Committee 217 (Cosmetics) and is referenced directly in European Commission SCCS Notes of Guidance SCCS/1647/22 for preservative evaluation.
        </p>
        <p>
          The 28-day window is a compromise between regulatory practicality and real shelf-life prediction. Products that pass ISO 11930 at Day 28 may still contaminate after 12 months of in-use handling in a jar; the test is a necessary floor, not a complete safety guarantee. Supplementary in-use testing is recommended for jar-packaged leave-on products, but is not part of ISO 11930 itself.
        </p>

        {/* 5-strain mechanism panel (interactive) */}
        <StrainFailureMatrix />

        {/* ========== H2 3: Criterion A vs B ========== */}
        <h2 id="criterion-a-vs-b">Criterion A vs Criterion B: Which One Does Your Product Need?</h2>
        <p>
          ISO 11930 offers two pass criteria. Criterion A is the strict path — the preservation system must stand alone against microbial challenge. Criterion B is relaxed by roughly 1 log at each timepoint, but requires additional supporting evidence (lower-risk packaging, usage pattern, or production controls) documented in the Cosmetic Product Safety Report.
        </p>
        <p>
          Choosing the wrong criterion is a common and expensive mistake. Submitting a sensitive-skin facial serum under Criterion B saves nothing if the CPSR assessor rejects the data and demands a Criterion A re-run. Equally, forcing a Criterion A pass on a shower gel costs preservative headroom you could have spent on milder surfactants or lower-concentration preservation.
        </p>
        <p>
          The decision wizard below encodes the practical rules Onerchemical sees contract labs apply in 2026-10 — product type, market, and audience combined to generate the test protocol and the add-ons your assessor will ask for.
        </p>

        {/* Decision Wizard (interactive) */}
        <ChallengeTestDecisionWizard />

        {/* Criterion thresholds SVG table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="mb-3 text-left text-xs italic text-slate-500">
              ISO 11930:2019 log-reduction thresholds — Criterion A and B. R = log reduction from initial inoculum. NI = no increase from preceding timepoint. Source: ISO 11930:2019 Clauses 6 and 7.
            </caption>
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="border border-slate-300 px-3 py-2">Strain group</th>
                <th className="border border-slate-300 px-3 py-2">Day 7</th>
                <th className="border border-slate-300 px-3 py-2">Day 14</th>
                <th className="border border-slate-300 px-3 py-2">Day 28</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">
                  Bacteria (Criterion A)
                </td>
                <td className="border border-slate-300 px-3 py-2">R ≥ 3</td>
                <td className="border border-slate-300 px-3 py-2">R ≥ 3</td>
                <td className="border border-slate-300 px-3 py-2">NI</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">
                  Bacteria (Criterion B)
                </td>
                <td className="border border-slate-300 px-3 py-2">—</td>
                <td className="border border-slate-300 px-3 py-2">R ≥ 3</td>
                <td className="border border-slate-300 px-3 py-2">NI</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">
                  Yeast / mould (Criterion A)
                </td>
                <td className="border border-slate-300 px-3 py-2">—</td>
                <td className="border border-slate-300 px-3 py-2">R ≥ 1</td>
                <td className="border border-slate-300 px-3 py-2">NI</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">
                  Yeast / mould (Criterion B)
                </td>
                <td className="border border-slate-300 px-3 py-2">—</td>
                <td className="border border-slate-300 px-3 py-2">—</td>
                <td className="border border-slate-300 px-3 py-2">R ≥ 1, NI</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========== H2 4: 28-day timeline SVG ========== */}
        <h2 id="28-day-timeline">What Happens Across the 28-Day Timeline?</h2>
        <p>
          The 28-day timeline is not a continuous experiment — labs typically count colonies at four discrete timepoints. Understanding what each timepoint tests helps you interpret a borderline report without over-reading noise.
        </p>

        <figure className="my-8">
          <svg
            viewBox="0 0 700 320"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full"
            role="img"
            aria-labelledby="timeline-title timeline-desc"
          >
            <title id="timeline-title">
              ISO 11930 28-day log reduction timeline — bacteria vs yeast/mould pass thresholds
            </title>
            <desc id="timeline-desc">
              Line chart showing bacterial strains must achieve 3-log reduction by Day 7 and maintain through Day 28 under Criterion A, while yeast and mould must achieve 1-log reduction by Day 14 with no increase at Day 28. Two colored lines plot the Criterion A pass thresholds across Day 2, Day 7, Day 14, and Day 28 timepoints on a horizontal x-axis against log reduction on a vertical y-axis.
            </desc>

            {/* Axes */}
            <line x1="60" y1="40" x2="60" y2="260" stroke="#334155" strokeWidth="1.5" />
            <line x1="60" y1="260" x2="660" y2="260" stroke="#334155" strokeWidth="1.5" />

            {/* Y labels */}
            <text x="30" y="265" fontSize="11" fill="#475569" textAnchor="middle">0</text>
            <text x="30" y="210" fontSize="11" fill="#475569" textAnchor="middle">1</text>
            <text x="30" y="155" fontSize="11" fill="#475569" textAnchor="middle">2</text>
            <text x="30" y="100" fontSize="11" fill="#475569" textAnchor="middle">3</text>
            <text x="30" y="45" fontSize="11" fill="#475569" textAnchor="middle">4</text>
            <text
              x="12"
              y="150"
              fontSize="11"
              fill="#334155"
              textAnchor="middle"
              transform="rotate(-90 12 150)"
            >
              Log reduction (R)
            </text>

            {/* X labels */}
            <text x="150" y="280" fontSize="11" fill="#475569" textAnchor="middle">Day 2</text>
            <text x="285" y="280" fontSize="11" fill="#475569" textAnchor="middle">Day 7</text>
            <text x="440" y="280" fontSize="11" fill="#475569" textAnchor="middle">Day 14</text>
            <text x="610" y="280" fontSize="11" fill="#475569" textAnchor="middle">Day 28</text>
            <text x="360" y="305" fontSize="11" fill="#334155" textAnchor="middle">Timepoint</text>

            {/* Gridlines */}
            <line x1="60" y1="100" x2="660" y2="100" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="60" y1="210" x2="660" y2="210" stroke="#e2e8f0" strokeDasharray="3 3" />

            {/* Bacteria line (crimson) — 1.5 at D2, 3 at D7, 3 at D14, 3 at D28 */}
            <polyline
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              points="150,177 285,100 440,100 610,100"
            />
            <circle cx="150" cy="177" r="4" fill="#dc2626" />
            <circle cx="285" cy="100" r="4" fill="#dc2626" />
            <circle cx="440" cy="100" r="4" fill="#dc2626" />
            <circle cx="610" cy="100" r="4" fill="#dc2626" />

            {/* Yeast/mold line (indigo) — 0.5 at D2, 0.8 at D7, 1 at D14, 1 at D28 */}
            <polyline
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              points="150,232 285,216 440,210 610,210"
            />
            <circle cx="150" cy="232" r="4" fill="#4f46e5" />
            <circle cx="285" cy="216" r="4" fill="#4f46e5" />
            <circle cx="440" cy="210" r="4" fill="#4f46e5" />
            <circle cx="610" cy="210" r="4" fill="#4f46e5" />

            {/* Legend */}
            <rect x="400" y="30" width="14" height="3" fill="#dc2626" />
            <text x="420" y="35" fontSize="11" fill="#334155">
              Bacteria — Criterion A threshold
            </text>
            <rect x="400" y="48" width="14" height="3" fill="#4f46e5" />
            <text x="420" y="52" fontSize="11" fill="#334155">
              Yeast / mould — Criterion A threshold
            </text>
          </svg>
          <figcaption className="mt-2 text-xs italic text-slate-500">
            ISO 11930:2019 Criterion A pass thresholds across timepoints. Bacteria must hit 3-log reduction by Day 7 and hold through Day 28; yeast and mould have 14 days to reach 1-log reduction. Day 2 is optional and used for diagnostic signal, not for the pass/fail decision.
          </figcaption>
        </figure>

        <h3 id="d7-signal">What a Day 7 bacterial fail usually means</h3>
        <p>
          A Day 7 bacterial fail (R &lt; 3 for E. coli, S. aureus, or P. aeruginosa) typically means the primary preservative concentration is insufficient for the formula pH, or the preservation system is incompatible with another formula component. Common patterns include organic acid preservatives (benzoic, sorbic) losing dissociation above pH 5.5, or non-ionic preservatives being sequestered by high-HLB surfactants.
        </p>

        <h3 id="d28-regrowth">What a Day 28 regrowth signal usually means</h3>
        <p>
          Regrowth after a clean Day 7 or Day 14 kill — the pattern that cost our Barcelona brand EUR 2,000 — points to one of three root causes: biofilm-forming contamination (Pseudomonas), insufficient chelator for iron-dependent organisms, or preservative depletion by raw-material bioburden. The remediation is almost never "more primary preservative"; it is usually a chelator pair or an upstream material audit.
        </p>

        {/* ========== H2 5: Pre-submission checklist ========== */}
        <h2 id="pre-submission-checklist">Before You Ship Samples: What Is on the Pre-Submission Checklist?</h2>
        <p>
          Half of first-run failures Onerchemical sees in indie brand reports are preventable with a 20-minute pre-submission audit. Labs will test what you send; they will not catch upstream mistakes.
        </p>

        <ol className="my-6 space-y-4 border-l-2 border-indigo-200 pl-5">
          <li>
            <strong className="text-slate-900">Formula pH measured and recorded.</strong>{' '}
            Measure at 23 ± 2°C with a calibrated electrode, not pH strips. Record on the sample submission form; many preservation failures correlate with a 0.3-0.5 unit pH drift during stability.
          </li>
          <li>
            <strong className="text-slate-900">Water activity (Aw) for anhydrous or low-water formulas.</strong>{' '}
            If Aw &lt; 0.75, flag the Microbial Risk Assessment option (ISO 11930 Annex A). Aw &lt; 0.6 typically justifies a full MRA substitute for the challenge test.
          </li>
          <li>
            <strong className="text-slate-900">Batch size documented.</strong>{' '}
            Pilot batches below 500 g often concentrate preservative loss into air-exposed surfaces; the challenge test should use batches representative of production scale.
          </li>
          <li>
            <strong className="text-slate-900">Container material matches production.</strong>{' '}
            PET bottle versus PP airless pump versus glass jar will produce different challenge test results for the same formula. Ship samples in the production packaging, not generic lab vials.
          </li>
          <li>
            <strong className="text-slate-900">Preservative COA bundle attached.</strong>{' '}
            Lot numbers, assay values, and heavy-metal / solvent residue results for every preservative in the formula. Labs will not test the preservatives, but assessors will cross-reference your CPSR against them.
          </li>
          <li>
            <strong className="text-slate-900">Raw-material bioburden (TAMC / TYMC) within spec.</strong>{' '}
            Total Aerobic Microbial Count &lt; 10³ CFU/g, Total Yeasts and Moulds &lt; 10² CFU/g per ISO 17516. Botanical extracts routinely fail this and need audit before formulation.
          </li>
          <li>
            <strong className="text-slate-900">Protocol choice declared.</strong>{' '}
            ISO 11930 Criterion A or B, with or without USP &lt;51&gt; parallel, re-inoculation protocol if applicable, wipe protocol for wet wipes. Changing protocol mid-test triggers a full re-run.
          </li>
        </ol>

        {/* ========== H2 6: Reading the report ========== */}
        <h2 id="reading-the-report">How Do You Read a Challenge Test Report Beyond Pass/Fail?</h2>
        <p>
          A "Pass" verdict is not always a comfortable pass. Five red flags routinely appear on reports that technically clear the threshold but should prompt a formulation review before scaling to production.
        </p>

        <ul className="my-6 space-y-3">
          <li className="rounded-lg border-l-4 border-rose-400 bg-rose-50 px-4 py-3">
            <strong className="text-rose-900">Red flag 1 — Borderline log reduction at any timepoint.</strong>{' '}
            A 3.1-log bacterial reduction at Day 7 is a pass; a 3.1-log reduction with the Day 28 count 10% higher than Day 14 is a system under strain. Scale production variation will cross the pass/fail line.
          </li>
          <li className="rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
            <strong className="text-amber-900">Red flag 2 — Single strain outlier.</strong>{' '}
            If four strains clear by 4 logs and one strain barely passes at 3 logs, the formula has a known weakness. Investigate the chemistry of the outlier strain versus the preservation system.
          </li>
          <li className="rounded-lg border-l-4 border-indigo-400 bg-indigo-50 px-4 py-3">
            <strong className="text-indigo-900">Red flag 3 — Day 28 regrowth within pass range.</strong>{' '}
            Any upward CFU count between Day 14 and Day 28 is the "no increase" criterion being borderline-met. Investigate biofilm risk and chelator adequacy before shipping to production.
          </li>
          <li className="rounded-lg border-l-4 border-orange-400 bg-orange-50 px-4 py-3">
            <strong className="text-orange-900">Red flag 4 — Aspergillus brasiliensis near detection limit at Day 28.</strong>{' '}
            Mould counts within an order of magnitude of the detection limit indicate the preservation system is working but has limited headroom; raw-material lot variation may trip future batches.
          </li>
          <li className="rounded-lg border-l-4 border-slate-400 bg-slate-50 px-4 py-3">
            <strong className="text-slate-800">Red flag 5 — Lab did not test Day 2 or did not report initial inoculum recovery.</strong>{' '}
            Cheaper labs skip Day 2 and do not confirm initial inoculum recovery; both are optional under ISO 11930 but their absence makes the report difficult to interpret or defend to a CPSR assessor.
          </li>
        </ul>

        <LeadMagnetCTA
          title="Need a preservative COA bundle for your next challenge test submission?"
          body="Our 100-kg MOQ preservative accounts (Phenoxyethanol, EHG, Caprylhydroxamic Acid, 1,2-Hexanediol, Dehydroacetic Acid) ship with full COA, SDS, Annex V compliance letter, and heavy-metal residue results — the exact documentation CPSR assessors cross-reference against your lab report. 7-10 day lead time ex Wuhan."
          cta="Request a preservative sample kit"
          topic="challenge-test-coa-bundle"
        />

        {/* ========== H2 7: ISO vs USP vs EP vs CTFA ========== */}
        <h2 id="iso-vs-usp-vs-ep">ISO 11930 vs USP &lt;51&gt; vs EP 5.1.3 vs CTFA M-3: When Is Each One Required?</h2>
        <p>
          The four major challenge test protocols share the same 5-strain panel but diverge on log-reduction thresholds, timepoints, and the regulatory contexts that accept them. Choosing the wrong one — or defaulting to just ISO 11930 for a US retail launch — creates compliance friction that costs weeks of back-and-forth.
        </p>

        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="mb-3 text-left text-xs italic text-slate-500">
              Comparison of the four principal cosmetic preservative efficacy test methods. "Accepted by" reflects the Onerchemical observation of CPSR assessors and retailer specification requirements as of 2026-10; retailer onboarding checklists change without notice.
            </caption>
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="border border-slate-300 px-3 py-2">Method</th>
                <th className="border border-slate-300 px-3 py-2">Scope</th>
                <th className="border border-slate-300 px-3 py-2">Timepoints</th>
                <th className="border border-slate-300 px-3 py-2">Accepted by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">ISO 11930:2019</td>
                <td className="border border-slate-300 px-3 py-2">Global cosmetic default</td>
                <td className="border border-slate-300 px-3 py-2">D7, D14, D28</td>
                <td className="border border-slate-300 px-3 py-2">EU CPSR assessors, NMPA (China), global contract manufacturers</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">USP &lt;51&gt;</td>
                <td className="border border-slate-300 px-3 py-2">US Pharmacopeia method</td>
                <td className="border border-slate-300 px-3 py-2">D7, D14, D28 (Cat 1-3 category differences)</td>
                <td className="border border-slate-300 px-3 py-2">US retailers (Target, Ulta, Sephora), MoCRA-adjacent OTC products</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">EP 5.1.3</td>
                <td className="border border-slate-300 px-3 py-2">European Pharmacopoeia, pharmaceutical-leaning</td>
                <td className="border border-slate-300 px-3 py-2">D2, D7, D14, D28 (stricter log targets)</td>
                <td className="border border-slate-300 px-3 py-2">Pharma-adjacent cosmetics, dermatological products, EMA-touching submissions</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold">CTFA M-3</td>
                <td className="border border-slate-300 px-3 py-2">US industry legacy (now PCPC)</td>
                <td className="border border-slate-300 px-3 py-2">D7, D14, D21, D28 (re-inoculation at D14 optional)</td>
                <td className="border border-slate-300 px-3 py-2">Some US contract manufacturers; declining usage, mostly superseded by USP &lt;51&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          For most indie brands shipping EU + US + ROW, the practical recommendation is ISO 11930 Criterion A plus USP &lt;51&gt; in parallel. The incremental lab cost is roughly USD 150-250 and the US retailer onboarding paperwork is already in your hand. Save EP 5.1.3 for pharma-adjacent products and skip CTFA M-3 unless a specific retailer still asks for it on the specification sheet.
        </p>

        {/* ========== H2 8: Regulatory map by market ========== */}
        <h2 id="market-requirements">Which Markets Legally Require a Challenge Test — and Which Only Expect One?</h2>
        <p>
          No major market mandates a specific challenge test method by name in primary legislation. Every major market expects demonstrable preservation efficacy as part of the safety dossier. The gap between "mandated" and "expected" is where indie brands get surprised.
        </p>

        <h3 id="eu-requirements">EU and UK</h3>
        <p>
          As of 2026-10, EU Regulation 1223/2009 Article 10 and Annex I Part B require the Cosmetic Product Safety Report (CPSR) to include microbiological specifications and preservation efficacy data. ISO 11930 is the most-accepted method among qualified CPSR assessors; alternative methods must be scientifically justified in writing. UK Cosmetic Regulation inherits the EU framework post-Brexit with the same expectations and the same ISO 11930 default.
        </p>

        <h3 id="us-requirements">United States</h3>
        <p>
          As of 2026-10, the Modernization of Cosmetics Regulation Act (MoCRA) 2022 does not mandate a specific challenge test method, but requires facility registration, product listing, and good manufacturing practice compliance. US retailers (Target, Ulta, Sephora, Amazon's premium beauty programs) include USP &lt;51&gt; on their specification checklists for shelf approval. FDA does not test cosmetic preservation routinely, but will cite a brand under adverse event reporting if microbial contamination causes consumer injury.
        </p>

        <h3 id="china-requirements">China</h3>
        <p>
          As of 2026-10, China 《化妆品安全技术规范》(2015 edition) does not reference ISO 11930 directly but requires microbiological testing per Chinese Pharmacopoeia Appendix methods. NMPA-filed products supplied with an ISO 11930 report plus an IECIC-compliant preservative selection usually clear the Technical Dossier Review. Challenge test data from accredited Chinese labs (CMA / CNAS marked) carries equivalent weight to international reports for NMPA filings.
        </p>

        <h3 id="japan-korea-requirements">Japan and Korea</h3>
        <p>
          As of 2026-10, Japan Pharmaceutical Affairs Law treats general cosmetics (化粧品) under industry self-regulation; the Japan Cosmetic Industry Association guidance accepts ISO 11930. Quasi-drug (医薬部外品) products carry a higher evidence burden with a 3-week extended protocol per the Pharmaceutical Society of Japan guideline. Korea KFDA follows a similar general-cosmetic / functional-cosmetic split, with ISO 11930 the accepted baseline.
        </p>

        {/* ========== H2 9: Where to test ========== */}
        <h2 id="where-to-test">Where Should You Run the Test — Independent Lab, In-House, or Contract Manufacturer?</h2>
        <p>
          Three paths are available to an indie brand, with different cost, credibility, and turnaround trade-offs. The decision usually comes down to whether the report needs to defend a CPSR assessment or just screen formula iterations during development.
        </p>

        <h3 id="path-independent-lab">Independent ISO 17025 lab</h3>
        <p>
          Independent, ISO 17025-accredited microbiology labs produce the gold-standard report CPSR assessors and retailers accept. Cost ranges from USD 350-600 per SKU for a single ISO 11930 run in 2026-10 at EU and US indie-friendly labs. Turnaround from sample arrival to signed report is typically 5-6 weeks. Report defensibility is highest, and the lab assumes liability for test validity.
        </p>

        <h3 id="path-contract-manufacturer">Contract manufacturer in-house lab</h3>
        <p>
          Many Chinese and European contract manufacturers run challenge tests in-house as part of their formulation development service. Cost is often bundled into the formulation fee or priced at USD 150-300 per SKU. Report defensibility varies; assessors may require independent re-testing if the CMO is also the formula owner. Useful for formulation iteration, less useful for compliance.
        </p>

        <h3 id="path-in-house-brand">Brand in-house screening</h3>
        <p>
          Technically possible, practically rare. Running ISO 11930 in-house requires a biosafety cabinet, calibrated incubators at 22.5 ± 2.5°C and 32.5 ± 2.5°C, documented reference strains with controlled passage history, and a trained microbiologist. Capital outlay runs USD 25,000-60,000 before the first test. For almost all indie brands, the economics favor contract testing.
        </p>

        {/* ========== H2 10: FAQ ========== */}
        <FAQ heading="Challenge test FAQ" id="challenge-test-faq" items={FAQ_ITEMS} />

        {/* ========== Author block (manual aside, no sameAs — Phase 1 isolation) ========== */}
        <aside className="my-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 id="about-the-author" className="mb-3 text-base font-semibold text-slate-900">
            About the author
          </h2>
          <p className="mb-3 text-sm text-slate-700">
            <strong>Yang Ruosong</strong> leads preservation sourcing at Onerchemical, working with indie beauty brands on 100-kg MOQ preservative supply and challenge test documentation support. The procurement observations in this article draw from preservative COA bundles shipped to EU, US, and China contract labs over 2024-2026.
          </p>
          <p className="text-sm">
            <Link href="/yang-ruosong/" className="font-medium text-indigo-600 hover:text-indigo-800">
              Read more from Yang Ruosong →
            </Link>
          </p>
        </aside>

        {/* ========== Related reading ========== */}
        <section className="my-10 border-t border-slate-200 pt-8">
          <h2 id="related-reading" className="mb-4 text-base font-semibold text-slate-900">
            Related reading
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog/phenoxyethanol-technical-guide" className="text-indigo-600 hover:text-indigo-800">
                Phenoxyethanol technical guide
              </Link>
              <span className="text-slate-500"> — the primary preservative most ISO 11930 submissions rely on, Annex V limits and pairing matrix.</span>
            </li>
            <li>
              <Link href="/blog/ethylhexylglycerin-technical-guide" className="text-indigo-600 hover:text-indigo-800">
                Ethylhexylglycerin technical guide
              </Link>
              <span className="text-slate-500"> — the co-preservative that lifts Gram-positive activity when paired with Phenoxyethanol.</span>
            </li>
            <li>
              <Link href="/blog/caprylhydroxamic-acid-technical-guide" className="text-indigo-600 hover:text-indigo-800">
                Caprylhydroxamic Acid technical guide
              </Link>
              <span className="text-slate-500"> — the yeast/mould-selective chelator that often fixes Candida albicans failures.</span>
            </li>
            <li>
              <Link href="/blog/1-2-hexanediol-technical-guide" className="text-indigo-600 hover:text-indigo-800">
                1,2-Hexanediol technical guide
              </Link>
              <span className="text-slate-500"> — the humectant-adjacent non-Annex-V booster used in "preservative-free" positioning.</span>
            </li>
            <li>
              <Link href="/blog/phenoxyethanol-ethylhexylglycerin-combination" className="text-indigo-600 hover:text-indigo-800">
                Phenoxyethanol + Ethylhexylglycerin combination guide
              </Link>
              <span className="text-slate-500"> — why this pairing is the ISO 11930 baseline Onerchemical ships most frequently.</span>
            </li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
