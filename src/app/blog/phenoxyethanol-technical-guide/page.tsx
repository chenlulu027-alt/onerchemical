import type { Metadata } from 'next';
import Image from 'next/image';
import { buildMeta, SITE } from '@/lib/seo';
import { getArticle, CLUSTERS } from '@/lib/blog-registry';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { MicPartitionChart } from '@/components/blog/article-02/MicPartitionChart';
import { CoAChecklist } from '@/components/blog/article-02/CoAChecklist';
import { PairingDecisionTree } from '@/components/blog/article-02/PairingDecisionTree';
import { RegulationMatrix } from '@/components/blog/article-02/RegulationMatrix';

const SLUG = 'phenoxyethanol-technical-guide';
const article = getArticle(SLUG)!;

export const metadata: Metadata = buildMeta({
  title: article.title,
  description: article.excerpt,
  path: `/blog/${SLUG}`,
  type: 'article',
  publishedTime: article.datePublished,
  modifiedTime: article.dateModified,
});

const FAQ_ITEMS = [
  {
    question: 'Is phenoxyethanol safer than parabens?',
    answer:
      'As of 2026-10, the SCCS opinion SCCS/1575/16 reaffirms phenoxyethanol as safe at the 1.0% cap, with a narrow restriction on the diaper area for children under three (EU Regulation 2024/996). Methyl- and ethyl-parabens remain approved too. Both are safe at approved levels — the real question is which fits your pH, surfactant system, and target market claims.',
  },
  {
    question: 'Why does my 1% phenoxyethanol system still fail USP 51?',
    answer:
      'In pure water, phenoxyethanol MIC against gram-negative bacteria is around 0.25–0.5%. In a finished emulsion, 20–40% of the dosed phenoxyethanol can partition into the oil phase and micelle interior (Log P 1.16, PubChem CID 31236). Without a mold-active co-preservative, Aspergillus niger fails first. We see this exact pattern in Challenge Test reports almost weekly.',
  },
  {
    question: 'Will phenoxyethanol irritate skin in a leave-on serum?',
    answer:
      'Below 1.0%, documented irritation in healthy adult skin is low. Reported sensitization concentrates in compromised-barrier or periocular use. For sensitive-skin positioning, cap total phenoxyethanol at 0.6–0.8% and compensate with a caprylyl glycol + ethylhexylglycerin pairing.',
  },
  {
    question: 'Can phenoxyethanol be used as the only preservative?',
    answer:
      'Technically possible for a low-water, low-pH, high-alcohol product. For any emulsion, serum, or surfactant system, no — the mold gap alone will fail Challenge Test. Onerchemical requires every client proposing single-preservative phenoxyethanol to run a 28-day USP 51 before scaling.',
  },
  {
    question: 'Can natural / ECOCERT brands use phenoxyethanol?',
    answer:
      'No. COSMOS, NATRUE, and ECOCERT standards exclude it as of their current reference versions. The practical replacement path is a benzyl alcohol + dehydroacetic acid blend, or a sorbic acid + glyceryl caprylate pairing. Onerchemical ships both as part of the 100kg preservation kit.',
  },
  {
    question: 'Is 100kg phenoxyethanol different in quality from a full ton?',
    answer:
      'No — same lot, same manufacturer MOA. The difference is paperwork: a 100kg order carries a Certificate of Analysis traceable to the manufacturer batch, a Safety Data Sheet in the destination-market language, and an optional third-party GC retest from SGS or Eurofins. Onerchemical does not re-pack from unmarked drums.',
  },
  {
    question: 'What is the shelf life of phenoxyethanol?',
    answer:
      'Sealed drum: 24 months from manufacture, stored below 30°C out of direct light. Once opened, 6 months is the practical ceiling before water pickup and trace oxidation push phenol residuals upward. Onerchemical ships 100kg orders in two 50kg HDPE drums so a formulator does not have to open 200kg at once.',
  },
];

export default function Article() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: article.title,
            description: article.excerpt,
            slug: SLUG,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
          }),
          breadcrumbSchema([
            { name: 'Home', url: `${SITE.url}/` },
            { name: 'Research', url: `${SITE.url}/blog` },
            { name: CLUSTERS[article.cluster].label, url: `${SITE.url}/blog` },
            { name: article.title, url: `${SITE.url}/blog/${SLUG}` },
          ]),
          faqSchema(FAQ_ITEMS),
        ]}
      />

      <BlogArticleLayout
        cluster={article.cluster}
        title={article.title}
        excerpt={article.excerpt}
        datePublished={article.datePublished}
        readingMinutes={article.readingMinutes}
        toc={article.toc}
      >
        <figure className="my-6">
          <Image
            src="/images/blog/phenoxyethanol-tg/hero.jpg"
            alt="Phenoxyethanol 100kg procurement scene with COA document — Onerchemical preservation sourcing — phenoxyethanol technical guide"
            width={1600}
            height={900}
            priority
            className="w-full h-auto rounded-xl"
          />
        </figure>

        <TLDRBox>
          <ul>
            <li><strong>Phenoxyethanol</strong> (INCI: Phenoxyethanol; CAS 122-99-6) is the default broad-spectrum preservative for independent cosmetic brands — but not a single-ingredient solution.</li>
            <li>In a finished emulsion, 20–40% of the dosed phenoxyethanol partitions into the oil phase. Label dose and functional dose differ.</li>
            <li>Against mold (<em>Aspergillus niger</em>, <em>Penicillium</em>), phenoxyethanol alone is weak. Pair with EHG, caprylyl glycol, or dehydroacetic acid by formula type.</li>
            <li>As of 2026-10, EU Regulation 2024/996 keeps the 1.0% cap and adds a diaper-area restriction for children under 3. China, Japan, Korea all cap at 1.0%; US / MoCRA has no numeric cap but CIR recommends ≤1%.</li>
            <li>Onerchemical ships <strong>100kg orders with full COA + MOA + SDS + optional third-party GC retest</strong>, 7–10 day lead time — built for brands that cannot absorb a 1-ton minimum.</li>
          </ul>
        </TLDRBox>

        <h2 id="three-failures">Three real failure scenarios we see every quarter</h2>
        <p>
          Phenoxyethanol fails more often from <strong>system design</strong> than from raw-material quality. Before pulling the mechanism apart, three recurring patterns define what our clients bring to us when a batch does not pass Challenge Test or a bulk order arrives looking wrong.
        </p>

        <h3>Scenario A — pH 6.5 hyaluronic acid serum, week-8 mold failure</h3>
        <p>
          A European indie brand dosed 1.0% phenoxyethanol in a water-based HA serum at pH 6.5. The 28-day USP 51 passed bacteria but failed <em>Aspergillus niger</em> at week 8. Root cause: at pH 6.5, phenoxyethanol has no sorbic or benzoic acid synergy, and its stand-alone MIC against <em>A. niger</em> exceeds 1.0% in a nutrient-rich matrix. The fix was adding 0.3% ethylhexylglycerin (EHG) to boost membrane permeation — not raising the phenoxyethanol dose.
        </p>

        <h3>Scenario B — cationic conditioner, emulsion breaking at 1% phenoxyethanol</h3>
        <p>
          A hair-conditioner formula using behentrimonium chloride broke on cooling after preservative addition. Phenoxyethanol itself is compatible with cationic actives, but this client had been dosing it through a nonionic co-solvent that destabilized the cationic–lipid network at 70°C. The sourcing lesson: specify delivery format on the purchase order. Straight-liquid phenoxyethanol goes into the oil phase during main emulsification, not post-cool.
        </p>

        <h3>Scenario C — ECOCERT applicant blocked by phenoxyethanol</h3>
        <p>
          A natural-positioning brand had phenoxyethanol in six SKUs and discovered mid-certification that COSMOS and ECOCERT exclude it. The practical replacement path for most emulsions was benzyl alcohol + dehydroacetic acid (Geogard 221) at 0.6–1.0%, with a water-activity check on anhydrous balms to confirm preservation could drop entirely.
        </p>

        <h2 id="mechanism-gaps">The mechanism blind spots public literature does not spell out</h2>
        <p>
          The SDS and most ingredient supplier pages describe phenoxyethanol as a broad-spectrum glycol ether, effective at 0.5–1.0%, Log P ≈ 1.16. Each statement is accurate in isolation and misleading when a formulator uses them to design a system.
        </p>

        <h3>Blind spot 1 — Published MIC comes from pure water</h3>
        <p>
          Minimum Inhibitory Concentration data in the preservation literature (Hall 2007; Lundov 2011) is generated against standard microbial suspensions in water or thin broth. In a finished product, three factors raise the functional MIC: nutrient load from humectants and botanicals, protective biofilms on emulsion droplets, and partition losses described below. A rule of thumb from our Challenge Test history: multiply published MIC by 1.5–2x for a real emulsion.
        </p>

        <h3>Blind spot 2 — Log P 1.16 still removes active phenoxyethanol from the water phase</h3>
        <p>
          Phenoxyethanol's octanol/water partition coefficient of 1.16 (PubChem CID 31236) looks small compared to true lipophiles. In an O/W emulsion with 15–25% oil phase, that is still enough for 20–40% of the dosed phenoxyethanol to sit inside oil droplets and surfactant micelles, where it cannot attack microbes in the aqueous phase. Label 1.0%, functional aqueous concentration 0.6–0.8%.
        </p>

        <MicPartitionChart />

        <h3>Blind spot 3 — Against mold, phenoxyethanol alone is a weak choice</h3>
        <p>
          Published MIC values against <em>Aspergillus niger</em> range from 1.0% to above 2.0% depending on test matrix. That exceeds the regulatory cap. In practice, Onerchemical does not accept a formula brief proposing phenoxyethanol as the sole antifungal for an aqueous or semi-aqueous system. The default pairing is 0.3–0.5% dehydroacetic acid or 0.3% EHG — chosen by product type, not by habit.
        </p>

        <h2 id="coa-red-flags">How to read a Phenoxyethanol COA: seven procurement red flags</h2>
        <p>
          Onerchemical reviews Certificates of Analysis from more than a dozen manufacturers each year. The seven items below are the ones that most consistently separate a usable lot from one we reject or send for third-party retest.
        </p>

        <CoAChecklist />

        <p>
          None of these items individually disqualifies a supplier. A COA missing <em>three or more</em>, in our experience, correlates with downstream Challenge Test issues or regulatory documentation gaps at customs. Onerchemical treats it as a hard gate before a 100kg order ships.
        </p>

        <h2 id="pairing-matrix">Phenoxyethanol pairing matrix: pick the co-preservative by formula type</h2>
        <p>
          No universal "best pairing" exists. The right co-preservative depends on pH, oil-phase load, surfactant chemistry, and the regulatory destination. The decision tree reflects pairings Onerchemical actually ships with 100kg phenoxyethanol orders.
        </p>

        <PairingDecisionTree />

        <h3>Water-dominant serums and toners → EHG or caprylyl glycol</h3>
        <p>
          Ethylhexylglycerin at 0.3–0.5% boosts phenoxyethanol's membrane permeation and extends spectrum to <em>Pseudomonas</em>. Caprylyl glycol at 0.3–0.5% adds a mild humectant benefit on top of its antimicrobial action.
        </p>

        <h3>Surfactant-based cleansers and shampoos → benzoic acid + sorbic acid (low pH)</h3>
        <p>
          Below pH 5.5, benzoic and sorbic acids are highly active against yeast and mold and are compatible with anionic surfactant systems. Phenoxyethanol handles the gram-negative gap. Target system: 0.6% phenoxyethanol + 0.3% benzoic acid + 0.2% sorbic acid.
        </p>

        <h3>High-oil-phase creams → chlorphenesin or dehydroacetic acid</h3>
        <p>
          With 25%+ oil phase, mold risk dominates. Chlorphenesin at 0.3% or dehydroacetic acid at 0.3% both close the <em>Aspergillus</em> gap. Chlorphenesin requires regulatory check for the Japanese market (positive list allows it; limit 0.3%).
        </p>

        <h3>Low-pH actives (AHA/BHA, Vitamin C) → benzoic acid or sodium benzoate</h3>
        <p>
          At pH 3.5–4.0, sodium benzoate converts to its active benzoic acid form. Phenoxyethanol remains needed for the aqueous bacterial load but drops to 0.5%. Watch for sensitization when total benzoate exceeds 0.5%.
        </p>

        <h3>When phenoxyethanol is not allowed — ECOCERT / COSMOS replacement path</h3>
        <p>
          Benzyl alcohol + dehydroacetic acid blends (Geogard 221 and equivalents) replace phenoxyethanol in natural-certified formulas. The functional cap is slightly lower (pH ≤ 6.0 for best efficacy), and total use is 0.6–1.0%. Onerchemical stocks the component raw materials, not the branded premix — giving the formulator freedom to tune ratios per product.
        </p>

        <h2 id="regulations">Phenoxyethanol regulations across EU, China, US (MoCRA), Japan, and Korea</h2>
        <p>
          Preservative regulation moves faster than the formulation press catches up. The matrix below reflects the state of each market as of 2026-10. Every statement includes the primary citation.
        </p>

        <RegulationMatrix />

        <p>
          The single operational note that catches most clients off-guard: the EU 2024/996 amendment specifically restricts phenoxyethanol in leave-on products intended for the <strong>diaper area of children under three years</strong>. It does not forbid phenoxyethanol in children's products broadly. For a general baby lotion with no diaper-area indication, the 1.0% cap applies normally.
        </p>

        <h2 id="sourcing-100kg">100kg sourcing: an actually-executable supply path for independent brands</h2>
        <p>
          The structural problem for indie brands is not that phenoxyethanol is expensive — it is that most Chinese manufacturers run a 1-ton minimum, and most domestic traders sell in unmarked repack drums. Onerchemical built the 100kg package to sit between those two options.
        </p>

        <h3>Why 1-ton MOQ does not fit an indie product launch</h3>
        <p>
          A 1,000kg phenoxyethanol order at 1.0% dose formulates roughly 100,000kg of finished product. An indie brand running three SKUs at 50g each would sell two million units before using one metric ton. Leftover inventory ties up cash, occupies warehouse space, and risks drum oxidation past the 24-month sealed shelf life.
        </p>

        <h3>What the Onerchemical 100kg package includes</h3>
        <ul>
          <li><strong>Manufacturer Certificate of Analysis</strong> (MOA) tied to the production batch — not a trader-generated COA.</li>
          <li><strong>Safety Data Sheet</strong> in the destination-market language (EN / FR / DE / ES / JA / KO available).</li>
          <li><strong>Certificate of Origin</strong> and HS code documentation for customs clearance.</li>
          <li>Optional <strong>third-party GC retest</strong> from SGS, Intertek, or Eurofins — turnaround 5–7 business days, cost USD 180–280 depending on parameter set.</li>
          <li>Packaging: two 50kg HDPE drums (not one 100kg drum) — so a formulator opens one at a time and preserves shelf life on the second.</li>
        </ul>

        <h3>LTL vs FCL vs air: cost comparison for 100kg at destination</h3>
        <p>
          For a 100kg phenoxyethanol order from Shanghai to Rotterdam, ocean LCL runs USD 180–260 all-in, 32–38 days door-to-door. Air freight runs USD 480–620, 7–10 days. Express courier (DHL / FedEx) runs USD 850–1,100, 4–6 days. Most indie clients default to LCL on a first order and switch to air for repeat orders once inventory velocity is predictable.
        </p>

        <h3>Three-stage QC flow before a 100kg order ships</h3>
        <p>
          Onerchemical runs appearance + odor check on drum arrival, GC-FID purity verification against the manufacturer MOA, and a microbial count on the preservative itself. Only after all three pass is the order released to logistics. Average internal QC turnaround is 48 hours.
        </p>

        <LeadMagnetCTA
          title="Get the 100kg Phenoxyethanol specification sheet"
          body="Full COA parameter list, MOA sample, third-party GC retest template, and lead-time matrix — the exact documentation shipped with every Onerchemical 100kg order."
          topic="phenoxyethanol-tg-spec-sheet"
          cta="Request the spec sheet"
        />

        <FAQ items={FAQ_ITEMS} id="faq" />
      </BlogArticleLayout>
    </>
  );
}