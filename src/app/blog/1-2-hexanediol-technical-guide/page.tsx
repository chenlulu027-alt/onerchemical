import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import CompatibilityMatrix from '@/components/blog/article-03/CompatibilityMatrix';
import ChallengeTestMatrix from '@/components/blog/article-03/ChallengeTestMatrix';
const SLUG = '1-2-hexanediol-technical-guide';
const SITE = 'https://onerchemical.com';
const PUB_DATE = '2026-10-21';
const MOD_DATE = '2026-10-21';

export const metadata: Metadata = {
  title: '1,2-Hexanediol in Cosmetics: Booster or Standalone? | Onerchemical',
  description:
    'As of 2026-10, 1,2-Hexanediol sits in CosIng but outside EU Annex V. Pairing matrix, Challenge Test rates, COA red flags, 5-market rules for indie formulators.',
  alternates: { canonical: `${SITE}/blog/${SLUG}` },
  openGraph: {
    title: '1,2-Hexanediol in Cosmetics — Booster or Standalone?',
    description:
      'Pairing matrix, Challenge Test usage rates, COA red flags, and 5-market regulatory status for independent cosmetic brands.',
    url: `${SITE}/blog/${SLUG}`,
    type: 'article',
    publishedTime: PUB_DATE,
    modifiedTime: MOD_DATE,
    authors: ['Yang Ruosong'],
    images: [{ url: `${SITE}/images/hero-1-2-hexanediol.webp`, width: 1600, height: 900 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1,2-Hexanediol in Cosmetics — Booster or Standalone?',
    description:
      'Pairing matrix, Challenge Test usage rates, COA red flags, 5-market regulatory status.',
    images: [`${SITE}/images/hero-1-2-hexanediol.webp`],
  },
};

const FAQS = [
  {
    q: 'Can 1,2-Hexanediol replace phenoxyethanol one-to-one in a lotion formula?',
    a: 'No. Phenoxyethanol is an EU Annex V-listed preservative with broad bacterial, yeast, and mold coverage. 1,2-Hexanediol sits outside Annex V and offers weaker standalone yeast/mold activity. A direct swap at the same percentage frequently fails ISO 11930 Challenge Test in O/W emulsions above water activity 0.9. Pair 1,2-Hexanediol with Caprylyl Glycol or Caprylhydroxamic Acid, or reduce phenoxyethanol rather than remove it.',
  },
  {
    q: 'What is the correct INCI function for 1,2-Hexanediol on an EU label?',
    a: 'As of 2026-10, EU CosIng assigns humectant, skin conditioning agent, and solvent. Do not declare the molecule as "preservative" on EU-market INCI panels, because the molecule does not appear in Regulation 1223/2009 Annex V. The Annex V-listed co-preservative in the formula is the labeled preservative.',
  },
  {
    q: 'What usage rate of 1,2-Hexanediol is typical as a preservative booster?',
    a: '0.3–1.0% when paired with phenoxyethanol, Caprylyl Glycol, Ethylhexylglycerin, or Caprylhydroxamic Acid. Supplier recommendations of 1.0–3.0% refer to standalone use, which carries higher Challenge Test risk in high-water-activity systems.',
  },
  {
    q: 'Is 1,2-Hexanediol approved for use in China cosmetics?',
    a: 'Yes. 1,2-Hexanediol is listed in the Inventory of Existing Cosmetic Ingredients in China (IECIC 2021). No maximum use level is set; the ingredient is governed by the brand’s safety assessment report submitted during NMPA notification or registration.',
  },
  {
    q: 'Why does my 1,2-Hexanediol sample have a grassy or fatty odor?',
    a: 'Low-purity material (typically 97–98% GC-area) contains residual 1-hexanol and shorter-chain diol isomers that produce a grassy or fatty off-note. Request a 1-hexanol specification of ≤500 ppm and target ≥99.5% purity for anhydrous or lightly-fragranced finished products. Onerchemical’s QC rejects incoming lots exceeding 500 ppm 1-hexanol.',
  },
  {
    q: 'Can 1,2-Hexanediol be used in natural or ECOCERT-style formulations?',
    a: '1,2-Hexanediol as commercially supplied is synthetic. ECOCERT COSMOS and NATRUE do not list the molecule on their permitted preservative annexes. For natural-claim formulations, pair Caprylhydroxamic Acid with a chelator (Phytate or GLDA) and a natural humectant instead; 1,2-Hexanediol fits "clean beauty" retailer standards (Credo, Ulta Conscious Beauty) but not strict certified-natural annexes.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline:
    "1,2-Hexanediol in Cosmetics — When It Actually Works as a Preservative, and When It Doesn't",
  description:
    'As of 2026-10, 1,2-Hexanediol sits in EU CosIng but outside Annex V. Pairing matrix, Challenge Test usage rates, COA red flags, and 5-market regulatory status for independent cosmetic brands.',
  datePublished: PUB_DATE,
  dateModified: MOD_DATE,
  image: `${SITE}/images/hero-1-2-hexanediol.webp`,
  author: {
    '@type': 'Person',
    name: 'Yang Ruosong',
    url: `${SITE}/yang-ruosong/`,
    jobTitle: 'Preservation Sourcing Specialist',
    knowsAbout: [
      'Cosmetic preservation',
      '1,2-Hexanediol sourcing',
      'ISO 11930 Challenge Test',
      'EU cosmetic regulation Annex V',
      'Independent cosmetic brand formulation',
    ],
  },
  publisher: {
    '@type': 'Organization',
    name: 'Onerchemical',
    url: `${SITE}/`,
  },
  mainEntityOfPage: `${SITE}/blog/${SLUG}`,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Preservative Chemistry',
      item: `${SITE}/blog?cluster=preservative-chemistry`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '1,2-Hexanediol Technical Guide',
      item: `${SITE}/blog/${SLUG}`,
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <BlogArticleLayout
        cluster="preservative-chemistry"
        title="1,2-Hexanediol in Cosmetics \u2014 When It Actually Works as a Preservative, and When It Doesn't"
        excerpt="As of 2026-10, 1,2-Hexanediol sits in EU CosIng but outside Annex V. Pairing matrix, Challenge Test usage rates, COA red flags, and 5-market regulatory status for independent cosmetic brands."
        datePublished={PUB_DATE}
        readingMinutes={12}
        toc={[
          { id: 'why-indie-reaches', text: 'Why indie formulators reach for 1,2-HD', level: 2 },
          { id: 'actually-preservative', text: 'Is it actually a preservative?', level: 2 },
          { id: 'pairing-matrix', text: 'Compatibility matrix', level: 2 },
          { id: 'challenge-test-rates', text: 'Usage rates that pass Challenge Test', level: 2 },
          { id: 'coa-red-flags', text: 'COA red flags', level: 2 },
          { id: 'regulations', text: '5-market regulations', level: 2 },
          { id: 'sourcing', text: 'Sample vs 100 kg order', level: 2 },
          { id: 'faq', text: 'FAQ', level: 2 },
        ]}
      >
        {/* HERO */}
        <figure className="my-6">
          <Image
            src="/images/hero-1-2-hexanediol.webp"
            alt="Clear 1,2-Hexanediol liquid pipetted into amber beaker on white lab bench — Onerchemical formulation guide — 1,2-hexanediol cosmetic preservative"
            width={1600}
            height={900}
            priority
            className="rounded-xl w-full h-auto"
          />
        </figure>

        <TLDRBox>
          <ul className="list-disc pl-5 space-y-1">
            <li>1,2-Hexanediol (INCI: 1,2-Hexanediol; CAS 6920-22-5) is a humectant with mild antimicrobial action — <strong>NOT an EU Annex V preservative</strong>.</li>
            <li>Best used as a <strong>booster at 0.3–1.0%</strong> paired with phenoxyethanol, Caprylyl Glycol, EHG, or CHA.</li>
            <li>Standalone use at 2–3% often fails ISO 11930 Criterion A in high-water-activity emulsions.</li>
            <li>Demand COA with 1-hexanol ≤500 ppm and purity ≥99.5% for premium finished products.</li>
          </ul>
        </TLDRBox>

        {/* LEAD */}
        <p>
          In August 2026, an independent moisturizer brand reached out to Onerchemical after a third consecutive Challenge Test failure. The formulator had replaced phenoxyethanol with 2% 1,2-Hexanediol (INCI: 1,2-Hexanediol; CAS 6920-22-5) based on a &ldquo;clean-beauty swap chart&rdquo; from social media. The lotion looked clean. The microbiology lab did not agree.
        </p>
        <p>
          That swap error is the single most common mistake Onerchemical sees from indie brands moving away from traditional preservative-chemistry. 1,2-Hexanediol is not a 1:1 phenoxyethanol substitute. The real question is how to use the molecule correctly — and whether EU CosIng, SCCS, and USP 51 agree with how the label describes it.
        </p>

        {/* H2-1 */}
        <h2 id="why-indie-reaches">Why do indie formulators keep reaching for 1,2-Hexanediol?</h2>
        <p>
          <strong>Because one molecule covers three formulation jobs</strong> — humectant, mild antimicrobial action, and sensory-light skin conditioning — and the molecule slips cleanly past most &ldquo;clean-beauty&rdquo; retailer white lists.
        </p>
        <p>Four pull factors drive the adoption curve Onerchemical sees:</p>
        <ul>
          <li><strong>Multifunctional economics.</strong> One ingredient does the work of two or three, narrowing the stability-testing matrix for small formulation teams.</li>
          <li><strong>Clean-beauty label friendliness.</strong> 1,2-Hexanediol is Credo Clean Standard eligible, Ulta Conscious Beauty compatible, and absent from EU&rsquo;s regulated fragrance-allergen list.</li>
          <li><strong>Published safety record.</strong> The Levy &amp; Dulichan 2008 study in the <em>Journal of the American Academy of Dermatology</em> (RIPT, 227 subjects, 1,2-Hexanediol + Caprylyl Glycol system) reported no delayed type IV hypersensitivity or irritation.</li>
          <li><strong>Supplier marketing momentum.</strong> INOLEX (Lexgard&reg; H), SOHO ANECO, Novaphene (Novaguard HG), Ishant Polychem (IPGuard HDO), and Connect Chemicals (Elixi-CARE HD) all position the molecule in the &ldquo;modern preservative alternative&rdquo; quadrant.</li>
        </ul>
        <p>The pull is real. Misreading the pull is where formulators lose money.</p>

        {/* H2-2 */}
        <h2 id="actually-preservative">Is 1,2-Hexanediol actually a preservative?</h2>
        <p>
          <strong>Technically, no.</strong> As of 2026-10, 1,2-Hexanediol is NOT listed in EU Regulation 1223/2009 Annex V — the EU&rsquo;s definitive preservative list — and the EU CosIng database assigns the functions humectant, skin conditioning, and solvent, not preservative.
        </p>
        <p>
          The regulatory file governs the label. A product sold into the EU that lists 1,2-Hexanediol as &ldquo;preservative&rdquo; on an INCI declaration risks Annex V misalignment during border inspection. The correct listing names the molecule only, with no function qualifier attached.
        </p>
        <p>
          The antimicrobial mechanism is real but limited. 1,2-Hexanediol is a medium-chain terminal diol that disrupts microbial membrane lipid bilayers, giving measurable Gram-positive and Gram-negative inhibition. Yeast and mold coverage from the molecule alone is markedly weaker, which is why single-molecule use in high-water-activity O/W emulsions rarely clears USP 51 or ISO 11930 Criterion A.
        </p>
        <p>
          Supplier framing diverges and causes most of the formulator confusion. INOLEX markets Lexgard&reg; H as a &ldquo;bacteriostatic booster&rdquo; and a &ldquo;building block for a Hurdle Technology system.&rdquo; SOHO ANECO describes the molecule as able to &ldquo;protect formulations in the absence of conventional preservative-chemistry.&rdquo; Both supplier claims can be true in narrow contexts. Neither claim is a general-case guarantee that 1,2-Hexanediol alone will pass a challenge in a specific formula.
        </p>
        <p>
          Onerchemical&rsquo;s working position: treat 1,2-Hexanediol as a hurdle-system component — a booster that upgrades a partner preservative, or a limited standalone option in low-water-activity anhydrous and balm systems where water availability already constrains microbial growth.
        </p>

        {/* H2-3 */}
        <h2 id="pairing-matrix">How do you pair 1,2-Hexanediol correctly? (Compatibility matrix)</h2>
        <p>
          <strong>Four pairings carry twenty-plus years of industry use</strong>, each closing a different microbial gap. Picking the right partner matters more than nudging the 1,2-Hexanediol dose.
        </p>

        <CompatibilityMatrix />

        <p>
          Chelator addition shifts the equation. Adding 0.1–0.2% EDTA, Phytate, or GLDA to any of the four pairings lowers the effective preservative load by sequestering divalent cations that microbes depend on for membrane transport. Onerchemical&rsquo;s bench panel sees roughly 20–30% Challenge Test performance improvement from chelator inclusion in low-pH systems.
        </p>
        <p>
          One compatibility caveat: public data on 1,2-Hexanediol combined with high-dose cationic surfactants (above 2% CTAC-type) is limited, and the Onerchemical bench panel has observed occasional cloudiness at room temperature. Anionic surfactant systems (SLES, SCI) show no compatibility issues at normal use levels.
        </p>

        {/* H2-4 */}
        <h2 id="challenge-test-rates">What usage rate actually passes Challenge Test?</h2>
        <p>
          The honest answer: <strong>public data on 1,2-Hexanediol standalone efficacy at specific use rates is limited</strong>, and most supplier datasheets quote &ldquo;1.0–3.0% recommended&rdquo; without naming the test method, Criterion, or formula matrix those numbers survived.
        </p>
        <p>
          Onerchemical&rsquo;s working reference matrix, assembled from supplier-provided Challenge Test summaries and the Onerchemical bench panel&rsquo;s own observations across indie-brand formulations:
        </p>

        <ChallengeTestMatrix />

        <p>Three caveats attach to this matrix:</p>
        <ul>
          <li>Challenge Test outcomes vary with inoculum strain, container closure, and extract contamination. One formula is one data point, not a population.</li>
          <li>USP 51 Criterion A (pharmaceutical standard) is stricter than ISO 11930 Criterion A (cosmetic standard). The matrix above reflects ISO 11930 pass thresholds.</li>
          <li>Water activity (Aw) matters more than pH for microbial pressure. An Aw 0.95+ system without a strong hurdle will fail regardless of preservative chemistry.</li>
        </ul>
        <p>
          Onerchemical recommends every indie brand run its own ISO 11930 Challenge Test on the final production batch, not on a bench prototype. The 7–10 day lead time Onerchemical offers on 100 kg orders is sized to allow one test cycle before scale-up.
        </p>

        {/* H2-5 */}
        <h2 id="coa-red-flags">What red flags on a 1,2-Hexanediol COA do most buyers miss?</h2>
        <p>
          <strong>Five COA fields separate production-grade material from cosmetic-grade material.</strong> Four of them do not appear on supplier marketing pages.
        </p>
        <ul>
          <li><strong>Purity (GC-area %).</strong> Cosmetic grade specifies ≥99.0%; premium deodorized grade (Novaguard HG-style) specifies ≥99.5%. Industrial grades at 97–98% carry residual isomers and oligomers that drive the fatty off-odor described below.</li>
          <li><strong>Residual odor / 1-hexanol content.</strong> The single most common formulation complaint. Low-purity 1,2-Hexanediol carries 1-hexanol residues (grassy / fatty note) that survive into finished anhydrous formulations where natural fragrance is the brand hook. Request a 1-hexanol spec of ≤500 ppm.</li>
          <li><strong>Heavy metals.</strong> Pb, As, Cd, Hg total ≤10 ppm for EU and China IECIC-aligned cosmetic use. Reject COAs without numeric values.</li>
          <li><strong>Microbial baseline.</strong> Total aerobic count ≤100 CFU/g, yeast/mold ≤10 CFU/g, pathogen (<em>E. coli</em>, <em>S. aureus</em>, <em>P. aeruginosa</em>) absent. A preservative raw material carrying its own microbial load defeats the purpose.</li>
          <li><strong>Water content (Karl Fischer).</strong> ≤0.5%. High water content signals storage degradation and inconsistent dosing.</li>
        </ul>
        <p>
          Onerchemical&rsquo;s QC gate reports have twice this year rejected incoming lots on 1-hexanol content (one at 820 ppm, one at 1,100 ppm) despite both lots meeting the headline ≥99% purity spec. The purity number alone is insufficient.
        </p>

        {/* H2-6 */}
        <h2 id="regulations">How does 1,2-Hexanediol stand under EU, China, US, Japan, Korea rules?</h2>
        <p>As of 2026-10, the five-market regulatory position:</p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left px-3 py-2 border-b border-slate-200">Market</th>
                <th className="text-left px-3 py-2 border-b border-slate-200">Status</th>
                <th className="text-left px-3 py-2 border-b border-slate-200">Label guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-slate-100 font-medium">EU (Reg. 1223/2009)</td>
                <td className="px-3 py-2 border-b border-slate-100">CosIng listed as humectant / skin conditioning / solvent &middot; <strong>NOT in Annex V</strong></td>
                <td className="px-3 py-2 border-b border-slate-100">Declare as &ldquo;1,2-Hexanediol&rdquo; without function qualifier. Do not claim &ldquo;preservative&rdquo; on EU-market INCI panel.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-slate-100 font-medium">China (IECIC 2021)</td>
                <td className="px-3 py-2 border-b border-slate-100">Listed in &lt;Inventory of Existing Cosmetic Ingredients&gt;; no max use level set</td>
                <td className="px-3 py-2 border-b border-slate-100">Permitted in general cosmetics; register per NMPA notification requirements.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-slate-100 font-medium">US (FDA / MoCRA)</td>
                <td className="px-3 py-2 border-b border-slate-100">Not on any restricted list; general cosmetic ingredient status</td>
                <td className="px-3 py-2 border-b border-slate-100">No pre-market approval; brand retains safety substantiation under MoCRA 2022.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-slate-100 font-medium">Japan (MHLW)</td>
                <td className="px-3 py-2 border-b border-slate-100">Not listed as 医薬部外品 (quasi-drug) active; general cosmetic use OK</td>
                <td className="px-3 py-2 border-b border-slate-100">Cannot support quasi-drug efficacy claims.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Korea (KFDA / MFDS)</td>
                <td className="px-3 py-2">Listed in KCID; not on preservative restriction annex</td>
                <td className="px-3 py-2">Permitted in general cosmetics; functional cosmetic claims need separate review.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The EU position is the one most independent brands misread. 1,2-Hexanediol can be used in an EU-sold cosmetic as a formulation aid; the molecule cannot be labeled as the preservative that protects the formula. The Annex V-compliant preservative in the formula (phenoxyethanol, benzyl alcohol, sorbic acid, benzoic acid, or similar) is what the regulatory file names as the protective system.
        </p>

        {/* H2-7 */}
        <h2 id="sourcing">When should you order 100 kg versus a 1 kg sample?</h2>
        <p>The decision rule Onerchemical uses with indie-brand buyers:</p>
        <ul>
          <li><strong>Order a 1 kg sample when</strong> the formulator is in the stability-trial phase, three or more preservative-pairing variants remain under evaluation, or the brand has not yet selected its base phenoxyethanol / Caprylyl Glycol / CHA partner.</li>
          <li><strong>Order a 100 kg lot when</strong> the Challenge Test on the final formula has passed ISO 11930 Criterion A on one Onerchemical-supplied sample lot, the preservative pairing is locked, and production launch is scheduled within 90 days.</li>
        </ul>
        <p>
          Onerchemical&rsquo;s 100 kg MOQ is the industry minimum for a dedicated QC batch with lot-specific COA, SDS, allergen declaration, animal-testing statement, and country-of-origin certificate. Below 100 kg, the material ships from aggregated inventory with the lot&rsquo;s prior COA attached — adequate for bench work, insufficient for a brand&rsquo;s regulatory file.
        </p>
        <p>
          Lead time: 7–10 business days from PO to Shanghai FOB. Payment terms: 30% T/T deposit, 70% against B/L copy. Third-party testing (SGS, Intertek, Eurofins) available at buyer&rsquo;s cost; Onerchemical covers test coordination.
        </p>

        <LeadMagnetCTA
          title="Request a 1 kg Sample"
          body="Free COA, SDS, and allergen declaration included. 7–10 day lead time from Shanghai FOB."
          cta="Request Sample"
          topic="1,2-hexanediol"
        />

        {/* FAQ */}
        <h2 id="faq">Frequently asked questions</h2>
        <FAQ items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />

        {/* Related */}
        <h2>Related reading</h2>
        <ul>
          <li><Link href="/blog/phenoxyethanol-technical-guide">Phenoxyethanol Technical Guide</Link></li>
          <li><Link href="/blog/phenoxyethanol-ethylhexylglycerin-combination">Phenoxyethanol + Ethylhexylglycerin Combination</Link></li>
        </ul>

        {/* Author block */}
        <aside className="mt-10 p-6 rounded-xl border border-slate-200 bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-900">
                <Link href="/yang-ruosong/" className="hover:underline">Yang Ruosong</Link>
              </p>
              <p className="text-sm text-slate-600 mb-2">Preservation Sourcing Specialist, Onerchemical</p>
              <p className="text-sm text-slate-700">
                Yang Ruosong leads preservation ingredient sourcing at Onerchemical, working with independent cosmetic brands on small-batch supply of phenoxyethanol, 1,2-Hexanediol, Caprylhydroxamic Acid, and natural preservative blends. Her focus is matching formulators to COA-verified lots that pass ISO 11930 and USP 51 Challenge Tests on first run.
              </p>
            </div>
          </div>
        </aside>
      </BlogArticleLayout>
    </>
  );
}
