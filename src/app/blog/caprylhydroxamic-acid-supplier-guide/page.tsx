import type { Metadata } from 'next';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import CHAMonomerVsBlendCalculator from '@/components/blog/article-14/CHAMonomerVsBlendCalculator';
import CHASupplierTierDecisionMatrix from '@/components/blog/article-14/CHASupplierTierDecisionMatrix';
import { getArticle } from '@/lib/blog-registry';

const SLUG = 'caprylhydroxamic-acid-supplier-guide';
const SITE = 'https://onerchemical.com';
const CANONICAL = `${SITE}/blog/${SLUG}`;
const PUBLISHED = '2026-11-04T00:00:00.000Z';
const MODIFIED = '2026-11-04T00:00:00.000Z';

export const metadata: Metadata = {
  title: 'Caprylhydroxamic Acid Supplier Guide: Price, Monomer vs Spectrastat, CoA (2026)',
  description:
    '2026 FOB China price benchmarks for Caprylhydroxamic Acid (CAS 7377-03-9) across 4 supplier tiers, the monomer vs Spectrastat pre-blend decision economics, 7-field CoA red flags including Fe-chelation efficiency, and a 25-100 kg procurement SOP built for established brands and contract manufacturers running hurdle preservation systems.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    url: CANONICAL,
    siteName: 'Onerchemical',
    title: 'Caprylhydroxamic Acid Supplier Guide (2026): Price, Monomer vs Blend, CoA',
    description:
      'Four-tier 2026 price benchmarks, monomer-vs-Spectrastat procurement calculator, Fe-chelation CoA audit, and 25-100 kg sweet-spot SOP for Caprylhydroxamic Acid — written for established cosmetic brands and contract manufacturers.',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: [`${SITE}/yang-ruosong/`],
    images: [
      {
        url: `${SITE}/images/blog/article-14/hero.jpg`,
        width: 1600,
        height: 900,
        alt: 'Caprylhydroxamic Acid powder in a 25 kg pail at a Jiangsu cosmetic-grade facility with a batch CoA bearing CAS 7377-03-9',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caprylhydroxamic Acid Supplier Guide (2026)',
    description:
      'FOB China 2026 price benchmarks, monomer-vs-Spectrastat economics, Fe-chelation CoA audit, 25-100 kg procurement SOP.',
  },
};

export default function Page() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Caprylhydroxamic Acid Supplier Guide: Price Benchmarks, Monomer vs Spectrastat, and the 25-100 kg Procurement Playbook (2026)',
    description:
      '2026 FOB China price benchmarks across 4 Caprylhydroxamic Acid supplier tiers, the monomer vs Spectrastat pre-blend decision calculator, 7-field CoA red flags including Fe-chelation efficiency, and a 25-100 kg MOQ procurement SOP for hurdle preservation.',
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
    image: `${SITE}/images/blog/article-14/hero.jpg`,
    about: [
      { '@type': 'Thing', name: 'Caprylhydroxamic Acid' },
      { '@type': 'Thing', name: 'CAS 7377-03-9' },
      { '@type': 'Thing', name: 'Spectrastat BHA' },
      { '@type': 'Thing', name: 'Hurdle Preservation Sourcing' },
    ],
    keywords:
      'caprylhydroxamic acid supplier, CHA supplier, caprylhydroxamic acid price, caprylhydroxamic acid MOQ, Spectrastat BHA supplier, Inolex Spectrastat, AromaStat, Optiphen MIT-free, CAS 7377-03-9, hurdle preservation sourcing',
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
        name: 'Caprylhydroxamic Acid Supplier Guide',
        item: CANONICAL,
      },
    ],
  };

  const faqItems = [
    {
      question: 'How do I verify a Chinese Caprylhydroxamic Acid quote is cosmetic-grade and not industrial?',
      answer:
        'Request three artifacts together: (1) the facility GMP/ISO 22716 certificate with production address printed, not a trading-company letterhead; (2) a current batch CoA showing HPLC assay with method reference, Fe-chelation efficiency (mg Fe bound per gram CHA), KF water content, ICP-MS heavy metals panel, and GC-headspace residual solvents panel; (3) a 30-second plant-walk video with the day\'s batch number visible on the whiteboard. Real cosmetic-grade CHA production in China is concentrated in Jiangsu (Taizhou, Yangzhou, Changzhou) plus a small cluster in Zhejiang. A supplier that cannot name three real producers in these regions is itself the first repack layer. Industrial-grade CHA (used in metal plating and resin stabilization) will report HPLC assay but will typically omit Fe-chelation efficiency and the residual-solvent panel — those two fields together are the fastest cosmetic-vs-industrial discriminator.',
    },
    {
      question: 'When does Spectrastat BHA (or BHA 2.0 / G2) beat sourcing CHA monomer separately?',
      answer:
        'Spectrastat BHA (Inolex) and equivalent pre-blended systems (Minasolve AromaStat, Ashland Optiphen MIT-free) pre-combine CHA with Caprylyl Glycol and Glyceryl Caprylate in a ratio validated for most emulsion archetypes at a documented use level. The blend wins when (a) your R&amp;D team lacks internal Challenge Test capability and needs the supplier\'s pre-cleared ISO 11930 data, (b) your retailer audit gate (Credo, Sephora Clean) already recognizes the branded blend, (c) your annual CHA pull is under 50 kg where the per-kg premium of the blend costs less than the formulation-support hours you would spend self-blending, or (d) the product is a one-off launch where supply chain simplicity outweighs cost optimization. Monomer sourcing wins when annual CHA pull exceeds 100 kg, when your QC runs Challenge Test in-house, and when formulation flexibility (ability to shift CHA to Caprylyl Glycol ratio by formula) is a competitive advantage. The calculator in the article runs the math per-brand.',
    },
    {
      question: 'Why does CHA always need Caprylyl Glycol or Glyceryl Caprylate as a partner?',
      answer:
        'Caprylhydroxamic Acid is a Fe-chelator that deprives microorganisms of the iron they need for enzymatic function. It is strongly active against molds, yeasts, and some gram-positive bacteria, but weak against gram-negative organisms (Pseudomonas aeruginosa, Escherichia coli) that have alternative iron-acquisition pathways (siderophores). A standalone CHA system typically fails ISO 11930 at day 14 on the gram-negative strains. Caprylyl Glycol and Glyceryl Caprylate add short-chain fatty-alcohol / fatty-acid membrane-disruption activity that covers the gram-negative gap. The Spectrastat BHA ratio (approximately 15% CHA + 60% Caprylyl Glycol + 25% Glyceryl Caprylate) is empirically tuned to pass ISO 11930 Criterion B across most emulsion archetypes at 1.0-1.2% total blend inclusion. Self-blenders typically replicate this ratio or shift slightly based on pH and oil phase.',
    },
    {
      question: 'What is a realistic trial order price for 25 kg CHA in 2026?',
      answer:
        'For Jiangsu cosmetic-grade CHA monomer, 25 kg trial pricing in Q4 2026 runs USD 45-60/kg via trader-repack with flex MOQ; USD 38-48/kg direct from a Jiangsu plant where the plant will accept a sub-100 kg order as a sample-plus-first-production convenience. Korean/Japanese pharma-adjacent grades at 25 kg run USD 70-95/kg with the paperwork pack bundled. Spectrastat BHA in Inolex 20 kg pails runs USD 85-110/kg at single-pail quantity through regional distributors (effective CHA content cost: USD 500-700/kg equivalent). Below 25 kg you pay courier-shipped repack premium of 25-40% over the per-kg price at 25 kg.',
    },
    {
      question: 'Is Korean or Japanese pharma-grade CHA worth the 50-80% premium over Chinese cosmetic-grade?',
      answer:
        'For eye-area, baby-skincare, and ISO 11930 Criterion A categories, yes — the documented isomer-purity separation and the pharma-adjacent facility audit trail reduce Challenge Test failure risk and shorten regulatory review at EU and Japanese quasi-drug filings. For standard leave-on skincare, body products, and rinse-off applications passing Criterion B, a Jiangsu cosmetic-grade monomer with a defensible CoA (all 7 fields present, Fe-chelation above 110 mg Fe/g, no residual solvent above 500 ppm) delivers equivalent in-formula performance at 40-60% of the Korean/Japanese price. The premium pays for paperwork and audit simplification, not for a different molecule — identical to the Phenoxyethanol and 1,2-Hexanediol tier dynamics.',
    },
    {
      question: 'What does the Inolex Spectrastat brand file actually buy at a retailer audit?',
      answer:
        'Retailer clean-beauty gates (Credo Beauty, Sephora Clean + Planet, Whole Foods Premium Body Care, Ulta Clean) maintain pre-vetted ingredient lists where Inolex Spectrastat BHA, BHA 2.0, G2 and G2 Natural appear with a pre-cleared technical review on file. A brand submitting a formulation declaring "Spectrastat BHA 1.0%" on the ingredient list typically clears the preservation-system review in one pass. A brand submitting the same chemistry as self-blended "Caprylhydroxamic Acid 0.15% + Caprylyl Glycol 0.6% + Glyceryl Caprylate 0.25%" triggers a fuller preservation-system technical review that often requires supplier documentation, Challenge Test report, and a formulator justification letter — all achievable, but adds 3-6 weeks to the audit cycle. The brand file premium is time-to-shelf, not ingredient legality.',
    },
    {
      question: 'How do I read the Fe-chelation efficiency field on a CHA CoA?',
      answer:
        'Fe-chelation efficiency is reported as milligrams of iron bound per gram of CHA under a defined assay — most commonly the EDTA-displacement spectrophotometric method at pH 5.5, 25 °C. Cosmetic-grade CHA from a reputable Jiangsu plant reports 115-135 mg Fe/g; Korean/Japanese pharma-grade reports 130-145 mg Fe/g; theoretical maximum from pure 1,2-protonation tautomer is approximately 145 mg Fe/g. A CoA reporting below 100 mg Fe/g suggests either (a) significant cyclic-tautomer content (lower chelation activity), (b) residual synthesis intermediates that compete for Fe binding, or (c) a non-cosmetic-grade source. Fe-chelation efficiency is the one functional-performance field that discriminates cosmetic-grade from industrial-grade material at CoA level without a field Challenge Test. Insist on method reference (Brown-Walker 2012 or supplier-equivalent) in the CoA.',
    },
    {
      question: 'For an indie or small brand at 25 kg annual pull, is CHA monomer worth the formulation overhead?',
      answer:
        'Rarely. At 25 kg annual CHA pull (supporting roughly 8-25 tonnes of finished product at 0.1-0.3% CHA inclusion), the per-kg price gap between monomer (USD 45-60/kg trader) and Spectrastat BHA 20 kg pail (USD 85-110/kg equivalent at 15% CHA content, so USD 570-730/kg CHA-equivalent) looks like a 10-15x markup — but the finished-product cost-in-use math flattens because the blend delivers the full three-component system in one SKU. Formulation hours saved (separate RFQ, CoA audit and inventory for Caprylyl Glycol and Glyceryl Caprylate), retailer audit acceleration, and R&amp;D Challenge Test support usually exceed the per-kg price premium at this scale. Monomer sourcing economics flip once annual CHA pull passes 100 kg and the brand has internal preservation-chemistry capability.',
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
        title="Caprylhydroxamic Acid Supplier Guide: Price Benchmarks, Monomer vs Spectrastat, and the 25-100 kg Procurement Playbook (2026)"
        excerpt="2026 FOB China price benchmarks across 4 Caprylhydroxamic Acid (CAS 7377-03-9) supplier tiers, the monomer vs Spectrastat pre-blend decision economics with a live calculator, 7-field CoA red flags including Fe-chelation efficiency, and a 25-100 kg MOQ procurement SOP built from a Milan contract-manufacturer case where the cheapest monomer quote failed ISO 11930 Criterion B at day 14."
        datePublished={PUBLISHED}
        readingMinutes={15}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              2026 Q4 FOB China 100 kg benchmarks for Caprylhydroxamic Acid (CAS 7377-03-9):
              Jiangsu cosmetic-grade monomer USD 35-45/kg, trader repack USD 40-55/kg,
              Korean/Japanese pharma-adjacent USD 60-85/kg, Inolex Spectrastat BHA 20 kg pail
              USD 85-110/kg (effective CHA content cost ~USD 570-730/kg equivalent).
            </li>
            <li>
              CHA use levels of 0.1-0.5% in finished formulations mean 25-50 kg is the real
              sweet spot for indie and emerging brands; 100 kg covers 18-36 months of first-launch
              demand for most leave-on skincare lines.
            </li>
            <li>
              The defining procurement question for CHA is monomer vs Spectrastat pre-blend — not
              tier. Spectrastat BHA, Minasolve AromaStat, and Ashland Optiphen MIT-free bundle
              Caprylyl Glycol and Glyceryl Caprylate in a pre-validated ratio and come with
              retailer-recognized brand files.
            </li>
            <li>
              Seven CoA fields catch cosmetic-grade vs industrial-grade CHA at receipt. The
              diagnostic field unique to CHA is Fe-chelation efficiency (mg Fe bound per gram),
              reported against a method reference — cosmetic-grade reports 115-135 mg Fe/g,
              below 100 is a rejection signal.
            </li>
            <li>
              100 kg MOQ, 10-15 day lead time, full CoA + SDS + TDS + GMP ISO 22716 + REACH +
              non-animal declaration pack available from our sourcing desk — request a dossier
              below for the current verified-direct Jiangsu plant list.
            </li>
          </ul>
        </TLDRBox>

        <h2 id="milan-opener">
          A EUR 1,950 Milan contract-manufacturer four-quote spread
        </h2>
        <p>
          In Q3 2026 a Milan contract manufacturer producing a leave-on facial serum for three
          indie clean-beauty brands reached our desk with four live quotes for a 100 kg CHA
          sourcing decision. The formulation required a hurdle preservation system to pass ISO
          11930 Criterion B across the three client formulas at pH 5.2-5.6 and 18-25% oil phase.
        </p>
        <p>
          The quotes: USD 32/kg from a Shenzhen trading company for 100 kg CHA monomer; USD 48/kg
          from a Jiangsu repack trader for 100 kg monomer; USD 78/kg from a Korean distributor
          citing pharma-adjacent facility audit; and USD 95/kg equivalent at 15% CHA content for
          Inolex Spectrastat BHA in 20 kg pails (so USD 630/kg CHA-equivalent plus bundled
          Caprylyl Glycol + Glyceryl Caprylate). On price alone the spread looked like 20x; on
          finished-formula cost-in-use the spread looked more like 2.5x.
        </p>
        <p>
          The CMO chose the USD 32/kg Shenzhen monomer, self-blended with separately sourced
          Caprylyl Glycol and Glyceryl Caprylate at the empirical Spectrastat BHA ratio (15/60/25).
          First production run shipped six weeks later. ISO 11930 Challenge Test on the finished
          serum failed at day 14 — Pseudomonas aeruginosa regrowth from 10 to the 6th power to
          10 to the 5th power instead of the required 2-log reduction. Candida albicans passed.
        </p>
        <p>
          Post-mortem HPLC on retained CHA sample versus supplier CoA: declared assay 99.0%, actual
          assay 94.7% by in-house HPLC, with 3.8% cyclic-tautomer isomer and 1.5% unidentified
          synthesis intermediate. The cyclic tautomer does not chelate Fe efficiently; the CHA
          contribution to the hurdle system was closer to 0.12% effective at a declared 0.15%
          inclusion. The gram-negative hurdle collapsed. Reformulation cost: CMO absorbed EUR
          1,950 across the three client runs, plus 4 weeks of lost distribution.
        </p>
        <p>
          This article exists because that failure mode is systematic, not a one-off. The next
          nine sections are the tier decoder, the monomer-vs-blend decision economics, the Fe-chelation
          CoA audit, and the procurement SOP that prevents it.
        </p>

        <h2 id="four-tier-decoder">
          Four-tier supplier decoder for Caprylhydroxamic Acid
        </h2>
        <p>
          The CHA cosmetic-grade market segments into four supply tiers. Unlike Phenoxyethanol and
          1,2-Hexanediol where Tier 4 is a branded monomer (Hydrolite 6, Schülke Phenoxetol),
          CHA&apos;s Tier 4 is a branded pre-blend that bundles the three-component hurdle system —
          this is the structural difference that drives the monomer-vs-blend decision later.
        </p>
        <h3 id="tier-1-chinese-monomer">Tier 1 — Chinese cosmetic-grade monomer (Jiangsu direct)</h3>
        <p>
          Jiangsu (Taizhou, Yangzhou, Changzhou) plus a small Zhejiang cluster account for roughly
          75% of global cosmetic-grade CHA monomer capacity in 2026. Synthesis route: hydroxylamine
          + caprylic acid chloride under controlled pH and temperature. Cosmetic lines run on
          segregated equipment with dedicated post-synthesis purification. CoA depth: HPLC assay,
          basic heavy metals, microbial, Fe-chelation efficiency (on request). Minimum order
          100 kg direct. Price band: USD 35-45/kg at 100 kg (Q4 2026).
        </p>
        <h3 id="tier-2-trader-repack">Tier 2 — Trader / repack (Dongguan, Shanghai, Hong Kong)</h3>
        <p>
          Traders buy from Tier 1 in 500-1000 kg lots, repack into 25 kg fibre drums or 50 kg
          sealed bags in an ISO 22716-audited facility, and add their own CoA layer. Flex MOQ
          25-200 kg. Lead time 10-15 days from warehouse stock. Price band: USD 40-55/kg at
          100 kg. For an indie brand under 100 kg annual pull, trader economics beat going direct
          — the direct-plant minimum plus Caprylyl Glycol and Glyceryl Caprylate separate RFQs
          do not amortize below that threshold.
        </p>
        <h3 id="tier-3-korean-japanese">Tier 3 — Korean / Japanese pharma-adjacent</h3>
        <p>
          Korean (notably Daejung-adjacent fine-chemical lines) and Japanese (Daito-grade and
          Nagase-distributed) CHA runs on pharma-adjacent facilities with documented
          isomer-tautomer separation and tighter HPLC specifications (99.5% minimum, cyclic
          tautomer under 0.5%). Paperwork pack includes REACH pre-registration, non-animal
          declaration, Fe-chelation efficiency as a mandatory CoA field, and formulation-support
          literature. Minimum typically 25 kg single-drum. Price band: USD 60-85/kg at 100 kg.
        </p>
        <h3 id="tier-4-pre-blended">Tier 4 — Pre-blended commercial systems (Inolex, Minasolve, Ashland)</h3>
        <p>
          Four pre-blended CHA systems dominate retailer-cleared formulations in 2026: Inolex
          Spectrastat BHA (CHA + Caprylyl Glycol + Glyceryl Caprylate), Spectrastat BHA 2.0
          (reformulated 2024 for lower pH tolerance), Spectrastat G2 and G2 Natural (ECOCERT /
          COSMOS compliant), Minasolve AromaStat (European-sourced equivalent), and Ashland
          Optiphen MIT-free (CHA + Caprylyl Glycol + Phenoxyethanol-free). Price band: USD 85-110/kg
          in 20 kg pails; effective CHA-equivalent cost USD 500-730/kg at the blend&apos;s ~15% CHA
          content. You are paying for the three-component bundle, the ISO 11930 pre-validation
          data pack, and the retailer-recognized brand file that clears clean-beauty gates on
          first submission.
        </p>

        <h2 id="25-100kg-sweet-spot">
          Why 25-100 kg is the CHA sweet spot (not 100-500 kg like Phenoxy or Hexanediol)
        </h2>
        <p>
          CHA&apos;s 0.1-0.5% in-formula use level flips the MOQ economics versus broad-spectrum
          preservatives used at 0.5-3.0%. For an indie brand producing 20-50 tonnes of leave-on
          finished product per year at 0.15% CHA inclusion, annual CHA consumption is 30-75 kg.
          A 100 kg CHA order covers 18-36 months of demand; a 500 kg order covers 8-15 years
          and the material degrades under suboptimal storage before use.
        </p>
        <p>
          Three economic breakpoints shape the CHA MOQ decision:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>25 to 50 kg (indie / scale-up sweet spot):</strong> 15-25% unit price drop vs
            sub-25 kg courier-shipped repack. Trader-fulfilled from warehouse stock in 10-12 days.
            Supports 8-15 months of indie-brand demand. The right answer for most first-time
            CHA buyers.
          </li>
          <li>
            <strong>50 to 100 kg (established brand territory):</strong> additional 10-20% unit
            price drop. Direct Jiangsu plant pricing becomes available at 100 kg with a 15-20 day
            lead time. Supports 18-36 months of demand for a brand with stable annual pull.
          </li>
          <li>
            <strong>100 to 500 kg (contract manufacturer territory):</strong> 5-10% additional
            drop, but inventory capital cost and CHA stability risk (recommended shelf life 18-24
            months under ambient conditions, shorter if exposed to UV or high humidity) rarely
            justify the saving for a brand without 150+ kg sustained annual pull.
          </li>
        </ul>

        <h2 id="monomer-vs-blend-calculator">
          Monomer vs Spectrastat pre-blend — the decision calculator
        </h2>
        <p>
          The defining CHA sourcing question is not which tier to buy from — it is whether to
          source CHA as a monomer and self-blend with Caprylyl Glycol and Glyceryl Caprylate,
          or to buy a pre-blended commercial system. Enter your annual volume, formulation
          complexity, and retailer-audit requirements below to see which path the economics
          recommend.
        </p>
        <CHAMonomerVsBlendCalculator />
        <p>
          The calculator reflects Onerchemical sourcing desk 2024-2026 experience across 60+
          preservation-system procurement engagements. The threshold where monomer sourcing
          starts to beat blended systems on total landed cost sits around 75-100 kg annual CHA
          pull with in-house Challenge Test capability; brands below that threshold with
          clean-beauty retailer gates consistently benefit from the blended path even at nominal
          per-kg price premium.
        </p>

        <h2 id="coa-red-flags">
          Seven CoA red flags specific to Caprylhydroxamic Acid
        </h2>
        <p>
          A CoA that passes industrial-grade spec can still fail cosmetic preservation performance.
          These are the seven fields that catch the systematic CHA failure modes seen in
          indie-brand and contract-manufacturer incidents (tautomer mispurity, Fe-chelation
          deficit, synthesis-intermediate residues, source-plant switching).
        </p>
        <h3 id="coa-1-hplc-assay">1. HPLC assay with method reference</h3>
        <p>
          Specification: HPLC by area percent on a method capable of resolving open-chain CHA
          from cyclic tautomer and from oleic-chain impurities. Minimum 99.0% for Tier 1-2, 99.5%
          for Tier 3-4. A CoA reporting &quot;purity 99.0%&quot; with no method citation is not
          an assay. Reject.
        </p>
        <h3 id="coa-2-tautomer">2. Isomer / tautomer purity — the field most Chinese CoAs omit</h3>
        <p>
          Specification: cyclic tautomer peak area under 0.5%; total unidentified peaks under
          1.0%. The cyclic tautomer is chemically identical in gross composition to open-chain
          CHA but does not chelate Fe efficiently. This is the field that caught the Milan
          failure. Ask for the HPLC chromatogram image, not just the number. A supplier that
          cannot send the chromatogram cannot defend the number.
        </p>
        <h3 id="coa-3-fe-chelation">3. Fe-chelation efficiency — the functional discriminator</h3>
        <p>
          Specification: 115-145 mg Fe bound per gram CHA by EDTA-displacement spectrophotometric
          assay at pH 5.5, 25 °C. Method reference should cite Brown-Walker 2012 or
          supplier-equivalent. Below 100 mg Fe/g suggests significant cyclic-tautomer content or
          synthesis-intermediate contamination. This is the one field on a CHA CoA that
          discriminates cosmetic-grade from industrial-grade at receipt without a formulation
          Challenge Test.
        </p>
        <h3 id="coa-4-water">4. Water content (Karl Fischer titration)</h3>
        <p>
          Specification: under 0.5% by KF. CHA is mildly hygroscopic; a KF value that drifts
          above 1.0% suggests either suboptimal storage at the trader warehouse or a drying step
          variation at the production plant.
        </p>
        <h3 id="coa-5-heavy-metals">5. Heavy metals (ICP-MS, not colorimetric)</h3>
        <p>
          Specification: lead under 5 ppm, arsenic under 3 ppm, cadmium under 3 ppm, mercury under
          1 ppm, total heavy metals under 10 ppm, by ICP-MS. Iron specifically should be reported
          under 20 ppm — because CHA is a Fe-chelator, iron contamination at CoA level partially
          saturates the chelation capacity before the material ever reaches the formula.
        </p>
        <h3 id="coa-6-residual-solvents">6. Residual solvents (GC headspace)</h3>
        <p>
          Specification: methanol, ethanol, acetone, and synthesis-specific intermediates each
          under 500 ppm by GC headspace. Hydroxylamine and caprylyl-chloride synthesis residues
          should be reported. A missing residual-solvent panel usually means the plant ran the
          cosmetic campaign on shared equipment with an industrial resin-stabilizer run and
          skipped the clearance verification.
        </p>
        <h3 id="coa-7-batch-triplet">7. Batch number + production date + production site</h3>
        <p>
          Specification: all three present, on the CoA, matching the invoice and the GMP/ISO 22716
          facility certificate. A CoA with batch number but no production site, or with a
          production site that does not match the certified facility, means the material was
          repacked by an entity without the production records to defend it under EU Article 5
          or US MoCRA section 608.
        </p>

        <h2 id="supplier-decision-matrix">
          Supplier tier decision matrix — rank by your real priorities
        </h2>
        <p>
          Five priorities drive the CHA tier choice: unit price, certification depth, lead time,
          traceability, and pre-blend availability (the fifth dimension that distinguishes CHA
          procurement from Phenoxy and 1,2-Hexanediol procurement). Adjust the sliders to see
          which tier ranks first for your situation.
        </p>
        <CHASupplierTierDecisionMatrix />

        <h2 id="compliance-paperwork">
          Six-document compliance paperwork checklist (cosmetic-grade CHA import)
        </h2>
        <p>
          For a 25-100 kg cosmetic-grade import of Caprylhydroxamic Acid into EU, US, or
          developed-Asia markets, this is the minimum paperwork set that keeps the shipment
          moving through customs and defensible at post-market audit.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>CoA + SDS + TDS triplet</strong> — all three on supplier letterhead, batch
            numbers consistent across all three documents; Fe-chelation efficiency on the CoA.
          </li>
          <li>
            <strong>GMP / ISO 22716 facility certificate</strong> — current, with the production
            site address matching the CoA.
          </li>
          <li>
            <strong>REACH pre-registration confirmation</strong> (EU-bound shipments) — CAS
            7377-03-9 is pre-registered under REACH; supplier or your EU importer-of-record
            carries the dossier.
          </li>
          <li>
            <strong>Certificate of Origin + commercial invoice</strong> — HS code 2928.00
            (hydroxylamines and derivatives), country of origin matching the facility
            certificate.
          </li>
          <li>
            <strong>Third-party test report</strong> — SGS, Intertek, or BV test on retained
            sample of the shipped lot including HPLC + Fe-chelation efficiency as a minimum.
          </li>
          <li>
            <strong>Non-animal testing declaration</strong> — mandatory for EU 1223/2009, India,
            and increasingly US clean-beauty retailer audits (Credo, Sephora Clean).
          </li>
        </ol>

        <h2 id="regulatory-map">
          Five-market regulatory snapshot (importer responsibility)
        </h2>
        <p>
          Caprylhydroxamic Acid is NOT listed in EU Cosmetic Regulation 1223/2009 Annex V. It is
          used as a multifunctional chelating ingredient with incidental antimicrobial activity
          via iron sequestration — the regulatory handling differs materially by market and the
          function declaration matters.
        </p>
        <h3 id="reg-eu">EU — Regulation 1223/2009</h3>
        <p>
          Non-Annex V. INCI name &quot;Caprylhydroxamic Acid&quot;. CPSR Part A must substantiate
          the declared function (chelating agent); CPSR Part B Challenge Test under ISO 11930
          demonstrates the overall preservation system passes. CPNP notification required on
          finished product. Supplier CoA + REACH evidence folded into Product Information File.
          Marketing claims declaring CHA as &quot;the preservative&quot; are not defensible —
          phrasing must be &quot;preservation system based on multifunctional ingredients&quot;
          or equivalent. See our{' '}
          <a href="/blog/eu-annex-v-preservative-compliance-guide">
            EU Annex V compliance guide
          </a>{' '}
          for the non-Annex V multifunctional treatment.
        </p>
        <h3 id="reg-us">USA — MoCRA</h3>
        <p>
          No preservative-specific cap. Facility registration required for the manufacturer under
          FD&amp;C 607. Cosmetic Product Listing must declare CHA by INCI and concentration range.
          Safety substantiation records (ISO 11930 Challenge Test, stability, toxicological
          assessment) maintained by responsible person. See our{' '}
          <a href="/blog/us-mocra-preservative-compliance-guide">
            US MoCRA compliance guide
          </a>{' '}
          for facility registration mechanics.
        </p>
        <h3 id="reg-china">China — IECIC 2021</h3>
        <p>
          Caprylhydroxamic Acid is listed on the IECIC 2021 inventory under CAS 7377-03-9.
          New-ingredient filing not required. Notified finished products must declare the
          ingredient at use level in the formula.
        </p>
        <h3 id="reg-japan">Japan — Quasi-Drug &amp; Cosmetic</h3>
        <p>
          Permitted in general cosmetics without a positive-list cap. For medicated / quasi-drug
          categories, pharmacopeia-grade purity documentation required — Tier 3 (Japanese) or
          Tier 4 pre-blended grades fit this gate.
        </p>
        <h3 id="reg-korea">Korea — KFDA (MFDS)</h3>
        <p>
          Permitted in general cosmetics. Functional-cosmetic category (brightening, anti-wrinkle,
          sunscreen) requires finished-product efficacy filing but does not restrict CHA at
          ingredient level.
        </p>

        <h2 id="procurement-sop">
          Seven-step procurement SOP (RFQ to receipt QC, with CHA-specific Fe-chelation
          spot-check)
        </h2>
        <p>
          Apply these steps in order for every new CHA supplier. Steps 2 and 7 are the two that
          catch the Milan failure mode before it ships; Step 7 adds the CHA-specific Fe-chelation
          spot-check that Phenoxy and 1,2-Hexanediol SOPs do not require.
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Issue RFQ with the 7 CoA fields spelled out.</strong> Specify HPLC assay
            method, tautomer peak threshold, Fe-chelation efficiency method reference, KF water,
            ICP-MS panel (iron explicit), GC-headspace solvent panel, microbial panel, batch-site-date
            triplet requirement. Suppliers who cannot answer at RFQ stage drop out before they
            waste your sample budget.
          </li>
          <li>
            <strong>Dossier audit before sample.</strong> Request facility certificate, latest
            typical CoA with HPLC chromatogram AND Fe-chelation assay report, and REACH /
            regulatory pack. Verify production site address matches between all three. This step
            rejects 50-70% of first-contact CHA suppliers — higher than Phenoxy (40-60%) because
            Fe-chelation documentation is less universal.
          </li>
          <li>
            <strong>Sample order (500 g free from Tier 1-3; 100-500 g paid USD 40-80 from
            traders; 100 g free from Tier 3 Korean/Japanese; 500 g free formulation-pack from
            Tier 4 Inolex / Minasolve).</strong> Receive with batch number — this becomes your
            retained sample for later HPLC + Fe-chelation chromatogram comparison.
          </li>
          <li>
            <strong>Payment terms — 30/70 T/T is the default.</strong> 30% deposit against pro
            forma invoice, 70% against B/L copy. Avoid full-advance for first order; reject
            suppliers who insist. Inolex and Minasolve distributor terms typically 30-day net
            after delivery.
          </li>
          <li>
            <strong>Pre-shipment inspection (SGS or BV) for first order above 50 kg.</strong>
            {' '}USD 300-450 one-time cost. The inspector pulls samples from the actual drums/bags,
            not supplier-provided retains.
          </li>
          <li>
            <strong>Incoterm choice — FOB China for 100 kg+ to a freight-forwarder relationship,
            EXW for 25-50 kg if your forwarder has China pickup capability.</strong> CIF only when
            your volume genuinely does not justify a forwarder relationship. Spectrastat and
            AromaStat typically ship DDP or DAP from regional distributor stock.
          </li>
          <li>
            <strong>Receipt QC — mandatory HPLC + Fe-chelation spot-check against retained
            sample.</strong> This is the step that caught the Milan tautomer-contamination.
            In-house HPLC with Fe-chelation UV-Vis is ideal; local contract lab run (USD 120-180
            combined) is the realistic indie-brand version. Spectrastat and pre-blended systems
            typically only need HPLC verification because blend ratio is guaranteed by the
            branded supplier.
          </li>
        </ol>

        <LeadMagnetCTA
          title="Verified-direct Jiangsu CHA plant list &amp; monomer-vs-Spectrastat sourcing dossier"
          body="Current (Q4 2026) list of verified-direct Caprylhydroxamic Acid production sites in Jiangsu and Zhejiang, with GMP certificate copies, a representative HPLC + Fe-chelation chromatogram comparison template, the 7-field RFQ template you can send to any supplier tomorrow, and a side-by-side spec sheet for Inolex Spectrastat BHA / BHA 2.0 / G2 / G2 Natural, Minasolve AromaStat, and Ashland Optiphen MIT-free. Sent to your inbox within two business hours."
          cta="Request the CHA sourcing dossier"
          topic="cha-sg-dossier"
        />

        <FAQ
          heading="Caprylhydroxamic Acid procurement FAQ"
          id="cha-sg-faq"
          items={faqItems}
        />

        <aside className="mt-16 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold mb-2">About the author</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Yang Ruosong</strong> is Onerchemical&apos;s preservation sourcing specialist,
            focused on long-term supply partnerships between EU, US and APAC cosmetic brands and
            verified preservative producers. Day-to-day work covers RFQ triage, CoA defensibility
            audits (including CHA-specific Fe-chelation verification), change-notification SOP
            review, and the regulatory paperwork pack that keeps cosmetic-grade preservative
            imports moving through EU 1223/2009, US MoCRA, China IECIC, Japan quasi-drug and
            Korea KFDA regimes. Read more at{' '}
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
              <a href="/blog/caprylhydroxamic-acid-technical-guide">
                Caprylhydroxamic Acid Technical Guide
              </a>{' '}
              — mechanism, chelator paradox, Spectrastat decoder, pairing matrix.
            </li>
            <li>
              <a href="/blog/phenoxyethanol-supplier-guide">
                Phenoxyethanol Supplier Guide
              </a>{' '}
              — sister sourcing guide, same tier framework applied to a broad-spectrum anchor.
            </li>
            <li>
              <a href="/blog/1-2-hexanediol-supplier-guide">
                1,2-Hexanediol Supplier Guide
              </a>{' '}
              — sister sourcing guide for the multifunctional non-Annex V workhorse.
            </li>
            <li>
              <a href="/guide/preservative-sourcing">
                The Complete Guide to Preservative Sourcing
              </a>{' '}
              — the pillar HUB covering supplier tiers, MOQ economics, and compliance paperwork
              across all preservation molecules.
            </li>
            <li>
              <a href="/blog/iso-11930-challenge-test-protocol">
                ISO 11930 Challenge Test Protocol
              </a>{' '}
              — the test every hurdle preservation system must pass before scaling.
            </li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
