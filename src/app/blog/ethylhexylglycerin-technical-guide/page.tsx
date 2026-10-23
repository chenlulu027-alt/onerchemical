import type { Metadata } from 'next';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import EHGUseCaseSplitter from '@/components/blog/article-05/EHGUseCaseSplitter';
import EHGPairingMatrix from '@/components/blog/article-05/EHGPairingMatrix';
import { getArticle } from '@/lib/blog-registry';

const SLUG = 'ethylhexylglycerin-technical-guide';
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: 'Ethylhexylglycerin (EHG): When It Actually Preserves — And When It Doesn’t',
  description:
    'A sourcing specialist’s guide to Ethylhexylglycerin (CAS 70445-33-9): deodorant vs cosmetic use-cases, Schülke Sensiva SC50 pricing shadow, verified pairings, SCCS data, CoA red flags, and 25–200kg procurement from Onerchemical.',
  alternates: { canonical: 'https://onerchemical.com/blog/' + SLUG },
  openGraph: {
    title: 'Ethylhexylglycerin (EHG): When It Actually Preserves — And When It Doesn’t',
    description:
      'Trader-voice technical guide to EHG for indie cosmetic brands. Mechanism, Sensiva SC50 price shadow, 4 verified pairings, SCCS 2020 dose data, CoA red flags, 100kg sourcing.',
    type: 'article',
    url: 'https://onerchemical.com/blog/' + SLUG,
    publishedTime: '2026-10-23T00:00:00+08:00',
    modifiedTime: '2026-10-23T00:00:00+08:00',
    authors: ['https://onerchemical.com/yang-ruosong/'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethylhexylglycerin (EHG): When It Preserves, When It Doesn’t',
    description:
      'Sourcing-specialist guide to EHG — mechanism, pricing shadow, verified pairings, SCCS data, 100kg procurement.',
  },
};

export default function Page() {
  const published = '2026-10-23';
  const modified = '2026-10-23';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline:
      'Ethylhexylglycerin (EHG): When It Actually Preserves — And When It Doesn’t',
    description:
      'Trader-voice technical guide to Ethylhexylglycerin (CAS 70445-33-9) for independent cosmetic brands and formulators. Covers mechanism, Schülke Sensiva SC50 pricing shadow, verified pairings, SCCS 2020 skin sensitization data, CoA red flags, 5-market regulatory status, and 25–200kg procurement.',
    datePublished: published,
    dateModified: modified,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://onerchemical.com/blog/' + SLUG,
    },
    author: {
      '@type': 'Person',
      name: 'Yang Ruosong',
      url: 'https://onerchemical.com/yang-ruosong/',
      jobTitle: 'Preservation Sourcing Specialist',
      knowsAbout: [
        'Cosmetic preservation',
        'Ethylhexylglycerin sourcing',
        'Preservative booster chemistry',
        'ISO 11930 challenge testing',
        'B2B cosmetic ingredient procurement',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Onerchemical',
      url: 'https://onerchemical.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onerchemical.com/logo.png',
      },
    },
    about: [
      { '@type': 'Thing', name: 'Ethylhexylglycerin', identifier: 'CAS 70445-33-9' },
      { '@type': 'Thing', name: 'Cosmetic preservation' },
      { '@type': 'Thing', name: 'Sensiva SC50' },
    ],
    citation: [
      {
        '@type': 'CreativeWork',
        name: 'SCCS Opinion on Ethylhexylglycerin (SCCS/1618/20)',
        url: 'https://health.ec.europa.eu/scientific-committees/scientific-committee-consumer-safety-sccs_en',
      },
      {
        '@type': 'CreativeWork',
        name: 'EU Cosmetic Products Regulation 1223/2009 Annex V',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://onerchemical.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://onerchemical.com/blog/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Preservative Chemistry',
        item: 'https://onerchemical.com/blog/?cluster=preservative-chemistry',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Ethylhexylglycerin Technical Guide',
        item: 'https://onerchemical.com/blog/' + SLUG,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Ethylhexylglycerin a preservative?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ethylhexylglycerin is not listed on EU Annex V as a preservative. INCI classifies it as a skin conditioning agent and deodorant agent. In cosmetic formulas it functions as a preservative booster, lowering the effective dose of a true preservative (phenoxyethanol, 1,2-hexanediol, caprylhydroxamic acid) rather than preserving on its own.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum use level of EHG in cosmetics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because EHG is not an Annex V preservative, there is no EU regulatory ceiling. As of 2026-10, the SCCS 1618/20 opinion considered 1.0% safe in cosmetic rinse-off and leave-on products when sensitization risk is assessed. Most leave-on formulations use 0.3–1.0%; deodorant and antiperspirant use levels of 1–3% are common because the primary function is antimicrobial, not preservation booster.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Sensiva SC50 the same as generic ethylhexylglycerin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sensiva SC50 is Schülke’s branded Ethylhexylglycerin product. Chemically it is the same molecule (CAS 70445-33-9) as generic Chinese-origin EHG at equivalent GC purity. The price delta reflects brand premium, Schülke’s formulation-support service, and EU warehousing — not a chemical difference. As of 2026-10, public price benchmarks suggest generic 100kg FOB sits well below Sensiva SC50 EU wholesale at comparable MOQ.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does EHG pair with best?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The four verified boost pairings are Phenoxyethanol (classic Euxyl PE 9010 pattern), 1,2-Hexanediol (preservative-free positioning), Caprylyl Glycol (Optiphen family), and Benzyl Alcohol (natural-leaning blends). EHG should not be combined with cationic surfactants in high-cat systems and offers no meaningful boost in anhydrous formulations with water activity below 0.6.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is EHG banned in some natural cosmetic standards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'COSMOS and NATRUE do not accept EHG because the raw material is synthesized from petrochemical glycidyl ether chemistry, not plant-derived. Ecocert certification is similarly closed. Brands pursuing certified-natural claims substitute Caprylyl Glycol or Glyceryl Caprylate; both pair with the same preservative systems.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum order quantity for ethylhexylglycerin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Onerchemical ships EHG from 25kg (one drum) with full CoA, SDS, and export documentation. Lead time is 7–10 business days for in-stock material, 15–20 days for custom-spec batches. Schülke direct deals typically start at larger volumes aimed at OEM accounts, which is the market gap Onerchemical covers for independent cosmetic brands.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <BlogArticleLayout
        cluster="preservative-chemistry"
        title="Ethylhexylglycerin (EHG): When It Actually Preserves — And When It Doesn’t"
        excerpt="A sourcing specialist’s guide to EHG for independent cosmetic brands — deodorant vs cosmetic use-cases, Sensiva SC50 pricing shadow, verified pairings, SCCS 2020 dose data, CoA red flags, and 25–200kg procurement."
        datePublished={published}
        readingMinutes={14}
        toc={article?.toc}
      >
        {/* Hero image placeholder — alt follows GEO pattern */}
        <figure className="my-6">
          <div className="aspect-[16/9] w-full rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
            [Hero image: /images/blog/article-05-ehg-hero.jpg]
          </div>
          <figcaption className="mt-2 text-sm text-slate-500">
            Preservative booster bench — amber bottle labelled EHG next to a deodorant stick and a serum vial — Onerchemical sourcing bench scene — ethylhexylglycerin dual use-case.
          </figcaption>
        </figure>

        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ethylhexylglycerin (INCI: Ethylhexylglycerin; CAS 70445-33-9) is not an Annex V preservative — it is a skin conditioning / deodorant agent that boosts true preservatives by disrupting microbial cell membranes.</li>
            <li>Deodorant formulas use 1–3% as the primary antimicrobial; cosmetic formulas use 0.3–1.0% as a booster. Mixing the two mental models is the top formulator error.</li>
            <li>As of 2026-10, Schülke Sensiva SC50 and generic Chinese-origin EHG are the same molecule at equivalent GC purity; public price benchmarks suggest the branded EU wholesale premium runs 2–4× over 100kg generic FOB.</li>
            <li>The SCCS 1618/20 opinion (adopted 2020) supports 1.0% as the practical cosmetic ceiling for sensitization safety; higher levels require your own risk assessment.</li>
            <li>Four verified pairings: Phenoxyethanol, 1,2-Hexanediol, Caprylyl Glycol, Benzyl Alcohol. Avoid in high-cat systems and anhydrous formulas (a<sub>w</sub> &lt; 0.6).</li>
            <li>Onerchemical ships from 25kg with full CoA + SDS + export docs, 7–10 day lead — the small-batch gap Schülke direct deals do not fill.</li>
          </ul>
        </TLDRBox>

        {/* H2 1 */}
        <h2 id="when-ehg-preserves">
          When is Ethylhexylglycerin actually preserving your formula — and when is it just skin feel?
        </h2>
        <p>
          Ethylhexylglycerin (INCI: Ethylhexylglycerin; CAS 70445-33-9) sits in two completely different formulator mental models. Last month a Spain-based roll-on deodorant brand ordered 50kg from Onerchemical, planning 2.0% as the sole antimicrobial. We shipped the material but attached a three-page use-level override letter — because that dose makes sense for a deodorant and would fail an ISO 11930 challenge test on a cosmetic emulsion.
        </p>
        <p>
          The split is not a matter of concentration arithmetic. Deodorant applications exploit EHG’s surfactant-like membrane disruption against odour-producing <em>Corynebacterium</em> and <em>Staphylococcus epidermidis</em>; the formulation is often anhydrous or very-low-water and the compound carries the whole antimicrobial load. Cosmetic applications ride EHG as a booster alongside a true preservative — Phenoxyethanol, 1,2-Hexanediol, Caprylhydroxamic Acid — and the booster’s job is to lower that true preservative’s effective dose and widen its microbial spectrum.
        </p>
        <p>
          Onerchemical’s procurement playbook calibrates the shipped documentation to the stated use-case. The deodorant order above received a use-level override letter plus a CIR safety summary excerpt; a serum formulator ordering 25kg for a 0.5% booster application receives a different packet — a pairing matrix and a water-activity worksheet. The same molecule, two different conversations.
        </p>
        <EHGUseCaseSplitter />

        {/* H2 2 */}
        <h2 id="why-ehg-boosts">
          Why does EHG boost preservation when it carries no Annex V antimicrobial claim?
        </h2>
        <p>
          EHG is a monoglyceryl ether — a short-chain alkyl group (2-ethylhexyl) joined to glycerin via an ether linkage. The 2-ethylhexyl tail is lipophilic enough to insert into microbial cell membranes; the glyceryl head keeps the molecule water-dispersible at cosmetic use levels. The result is a non-ionic surfactant-adjacent compound that disrupts the lipid bilayer of gram-positive bacteria and compromises membrane integrity in gram-negative organisms, as reviewed by Beilfuss et al. (<cite>Beilfuss W, Leschke M, Weber K. Ethylhexylglycerin — A multi-functional ingredient with antimicrobial activity. SOFW Journal 2005;131(10):16-24</cite>).
        </p>
        <p>
          This membrane disruption lowers the minimum inhibitory concentration (MIC) of the true preservative paired with EHG. Published MIC data from Schülke’s own development programme shows Phenoxyethanol MIC against <em>Escherichia coli</em> drops roughly in half when 0.5% EHG is present in the test system (<cite>Beilfuss et al., 2005, Table 3</cite>). That shift is what formulators mean when they say “Phenoxyethanol + EHG lets me cut Phenoxyethanol to 0.6%”.
        </p>
        <p>
          The non-classification as a preservative follows from Annex V’s regulatory definition — preservatives are compounds whose <em>exclusive or primary</em> purpose is inhibiting micro-organism growth. EHG’s skin conditioning and deodorant functions give it an alternative primary purpose, so it enters cosmetic formulas via a different regulatory door and avoids the Annex V use-level ceiling. The microbiology is real; the regulatory label is a different question.
        </p>

        {/* H2 3 */}
        <h2 id="sensiva-sc50-pricing-shadow">
          The Schülke Sensiva SC50 pricing shadow — what are you really paying for?
        </h2>
        <p>
          Schülke &amp; Mayr GmbH launched Sensiva SC50 in the late 1990s as the first commercial Ethylhexylglycerin product and the molecule entered mainstream cosmetic use through that brand. Schülke’s core composition patent EP0867176B1 expired in 2018, and Chinese fine-chemical producers (Guangzhou, Hubei, Jiangsu) began supplying generic EHG at cosmetic-grade purity in volume shortly after.
        </p>
        <p>
          As of 2026-10, public price benchmarks suggest generic Chinese-origin EHG at 100kg FOB sits in the USD 15–25/kg range, while Schülke Sensiva SC50 EU wholesale at comparable MOQ typically runs USD 60–90/kg. The 2–4× delta is not a chemical premium — the molecule is identical by GC and the CoA parameters match. Buyers are paying for brand recognition in regulatory dossiers, Schülke’s formulation-support service, EU warehousing with 48-hour delivery, and the risk-reduction value of a known-vendor supply chain.
        </p>
        <p>
          Table 1 breaks down the trade-off a procurement team actually faces. Both routes are viable; the question is which premium a given brand’s business model can absorb.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse text-sm">
            <caption className="text-left mb-2 text-slate-600">
              Table 1. Generic Chinese-origin EHG vs Schülke Sensiva SC50 — procurement trade-off (As of 2026-10, public benchmark ranges).
            </caption>
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-2 text-left">Dimension</th>
                <th className="border border-slate-300 px-3 py-2 text-left">Generic (Chinese-origin, 100kg FOB)</th>
                <th className="border border-slate-300 px-3 py-2 text-left">Schülke Sensiva SC50 (EU wholesale)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">CAS / INCI</td>
                <td className="border border-slate-300 px-3 py-2">70445-33-9 / Ethylhexylglycerin</td>
                <td className="border border-slate-300 px-3 py-2">70445-33-9 / Ethylhexylglycerin</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">GC purity</td>
                <td className="border border-slate-300 px-3 py-2">≥ 99.0%</td>
                <td className="border border-slate-300 px-3 py-2">≥ 99.0%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Public price benchmark (USD/kg)</td>
                <td className="border border-slate-300 px-3 py-2">15–25</td>
                <td className="border border-slate-300 px-3 py-2">60–90</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Typical MOQ</td>
                <td className="border border-slate-300 px-3 py-2">25kg (one drum)</td>
                <td className="border border-slate-300 px-3 py-2">25kg via EU distributors; direct deals larger</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Lead time to EU warehouse</td>
                <td className="border border-slate-300 px-3 py-2">30–45 days sea / 7–12 days air</td>
                <td className="border border-slate-300 px-3 py-2">2–5 days ex-warehouse</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Documentation</td>
                <td className="border border-slate-300 px-3 py-2">CoA, SDS, export docs, third-party test on request</td>
                <td className="border border-slate-300 px-3 py-2">CoA, SDS, formulation-support dossier</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Onerchemical’s customer mix leans toward brands under USD 2M annual revenue, where the generic route’s cost-of-goods saving is material. Brands pursuing retail-chain tenders or Schülke-anchored technical approvals often stay on Sensiva SC50 for the regulatory-dossier continuity. Neither choice is wrong — the error is believing the molecule itself is different.
        </p>

        {/* H2 4 */}
        <h2 id="ehg-pairing-map">
          The EHG pairing map: four verified boosts and two combinations we refuse to ship against
        </h2>
        <p>
          EHG’s preservation value is almost entirely in combination. Published MIC data and in-house challenge-test records from Onerchemical’s customer base converge on four pairings that reliably pass ISO 11930 criterion A at reduced true-preservative dose. The matrix below summarizes compatibility, pH range, and the formulation types where each pair performs.
        </p>
        <EHGPairingMatrix />
        <p>
          The two cases we flag at the procurement stage: high-cationic systems (above 2% quat salt) where EHG’s non-ionic character provides no boost advantage over cheaper alternatives, and anhydrous formulations with water activity below 0.6 where preservation is already physical and the EHG spend is wasted. Onerchemical will still ship into those applications on request, but the booklet attached to the order flags the mismatch.
        </p>

        {/* H2 5 */}
        <h2 id="ehg-dose-reality">
          How do formulators actually set the EHG dose — and why do most cap it below the regulatory ceiling?
        </h2>
        <p>
          The SCCS Opinion 1618/20 (adopted 2020) on Ethylhexylglycerin concluded that use at up to 1.0% in finished leave-on and rinse-off products is safe, pending full risk assessment of individual formulations (<cite>SCCS/1618/20, Opinion on Ethylhexylglycerin, European Commission, 2020</cite>). The opinion does not establish a regulatory ceiling in the Annex V sense — EHG is not on Annex V — but it is the reference document EU safety assessors cite when signing off cosmetic product information files.
        </p>
        <p>
          Cosmetic formulators typically cap EHG at 0.5–1.0% leave-on and 0.5–1.5% rinse-off for three reasons: SCCS-aligned sensitization risk management; booster saturation (above approximately 0.7% in a serum, additional EHG stops lowering the paired preservative’s MIC meaningfully); and ingredient cost — EHG is one of the more expensive line items in a modern preservation system. Deodorant and antiperspirant formulators use 1–3% because the molecule carries the primary antimicrobial load and the booster-saturation effect is not operative.
        </p>
        <p>
          Onerchemical’s technical note included with 25–200kg orders carries a dose decision tree calibrated to formulation type: emulsion-serum defaults to 0.5%, lotion to 0.7%, shampoo and rinse-off cleanser to 1.0%, roll-on deodorant to 2.0%, antiperspirant stick to 3.0%. Each default sits well inside the SCCS reference band and leaves room for the safety assessor’s own margin.
        </p>

        {/* H2 6 */}
        <h2 id="ehg-coa-red-flags">
          What does a legitimate EHG CoA show — the 7 fields we reject on sight?
        </h2>
        <p>
          Cosmetic-grade Ethylhexylglycerin lives or dies on seven CoA parameters. Onerchemical’s incoming-QC protocol rejects any batch that misses any of them, regardless of overall price:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>GC purity ≥ 99.0%</strong> — anything below 98.5% suggests incomplete separation from unreacted 2-ethylhexanol and glycidol intermediates.
          </li>
          <li>
            <strong>2-Ethylhexanol residue ≤ 0.5%</strong> — residual starting material; a strong rancid odour signature if above threshold. We reject above 0.3% on brand-new supplier batches.
          </li>
          <li>
            <strong>Colour index ≤ 30 Hazen (APHA)</strong> — a yellow tint signals oxidation or metal contamination. Finished-product discolouration is almost always traceable here.
          </li>
          <li>
            <strong>Water content ≤ 0.5%</strong> — Karl Fischer titration. High water risks hydrolysis of the ether bond on storage.
          </li>
          <li>
            <strong>Acid value ≤ 0.5 mg KOH/g</strong> — free acid signals degradation; it also attacks sensitive emulsion systems.
          </li>
          <li>
            <strong>Refractive index 1.449–1.455 (20 °C)</strong> — identity confirmation; outside this band suggests a wrong material entirely.
          </li>
          <li>
            <strong>Heavy metals ≤ 10 ppm total; Pb &lt; 1 ppm, As &lt; 1 ppm, Hg &lt; 0.1 ppm, Cd &lt; 0.1 ppm</strong> — US MoCRA and China IECIC alignment. Our in-house ICP-MS re-test runs on first shipments from any new supplier.
          </li>
        </ol>
        <p>
          A CoA that reports “purity: pass” without a numerical GC value is itself a red flag. A CoA with no refractive index entry is a procurement conversation-ender. A CoA with heavy-metals “compliant” but no per-element data gets a mandatory ICP-MS re-test at Onerchemical’s cost before the first container ships.
        </p>

        {/* H2 7 */}
        <h2 id="ehg-regulatory-5-market">
          Where does EHG sit in global cosmetic regulations when it’s a preservative that officially isn’t one?
        </h2>
        <p>
          EHG’s regulatory position is unusual: it is a widely-used antimicrobial-active ingredient that no major jurisdiction regulates as a preservative. Formulators treating it as a preservative for compliance purposes often misread what documentation is actually required. The 5-market summary below is current as of 2026-10 and should be checked against your own regulatory consultant before dossier submission.
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse text-sm">
            <caption className="text-left mb-2 text-slate-600">
              Table 2. Ethylhexylglycerin regulatory status in five major cosmetic markets (As of 2026-10).
            </caption>
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-2 text-left">Market</th>
                <th className="border border-slate-300 px-3 py-2 text-left">EHG classification</th>
                <th className="border border-slate-300 px-3 py-2 text-left">Use-level control</th>
                <th className="border border-slate-300 px-3 py-2 text-left">Dossier requirement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">EU (Reg 1223/2009)</td>
                <td className="border border-slate-300 px-3 py-2">Skin conditioning / deodorant agent; NOT Annex V</td>
                <td className="border border-slate-300 px-3 py-2">No regulatory ceiling; SCCS 1618/20 references 1.0%</td>
                <td className="border border-slate-300 px-3 py-2">CPSR safety assessment; CPNP notification</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">United States (MoCRA)</td>
                <td className="border border-slate-300 px-3 py-2">General cosmetic ingredient; CIR reviewed safe at usage</td>
                <td className="border border-slate-300 px-3 py-2">No specific restriction</td>
                <td className="border border-slate-300 px-3 py-2">Facility registration; product listing (MoCRA)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">China (IECIC 2021)</td>
                <td className="border border-slate-300 px-3 py-2">Listed as cosmetic ingredient; not a preservative category entry</td>
                <td className="border border-slate-300 px-3 py-2">Follow IECIC max-reported-use pattern</td>
                <td className="border border-slate-300 px-3 py-2">NMPA filing / registration path</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Japan</td>
                <td className="border border-slate-300 px-3 py-2">General cosmetic ingredient; antiperspirant &gt; threshold triggers quasi-drug path</td>
                <td className="border border-slate-300 px-3 py-2">Quasi-drug use levels per MHLW</td>
                <td className="border border-slate-300 px-3 py-2">MHLW cosmetic ingredient standards</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-3 py-2 font-medium">Korea (KFDA)</td>
                <td className="border border-slate-300 px-3 py-2">Permitted cosmetic ingredient; not a designated preservative</td>
                <td className="border border-slate-300 px-3 py-2">No specific use-level cap</td>
                <td className="border border-slate-300 px-3 py-2">MFDS cosmetic ingredient standards</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The practical implication: EHG does not require preservative-category dossier evidence (preservative efficacy test specifically for EHG’s own antimicrobial claim), but the paired true preservative does. Formulators who document only EHG’s SCCS opinion and skip the paired preservative’s challenge-test package end up with incomplete CPSR files.
        </p>

        {/* H2 8 */}
        <h2 id="onerchemical-ehg-sourcing">
          How Onerchemical handles 25kg–200kg EHG orders — the small-batch supply gap large distributors don’t fill
        </h2>
        <p>
          Independent cosmetic brands routinely need 25–200kg of EHG per campaign and face a procurement wall. Schülke’s EU distributors can sell at 25kg but the branded-material cost compounds through retail pricing. Chinese generic producers run minimums suited to industrial OEM accounts, and most ingredient trading houses position above 500kg to make a deal worth the paperwork. Onerchemical was built for the gap in the middle.
        </p>
        <p>
          Wuhan Oner Chemical Co., Ltd. (Onerchemical’s operating entity) ships EHG from 25kg (one drum) with the following standard package: full batch-specific Certificate of Analysis against the seven QC parameters above, 16-section Safety Data Sheet in English plus the local-language SDS for the destination market, export declaration documents, allergen statement, Halal and Kosher certification on request, and a formulation-use technical note calibrated to the stated application. Third-party ICP-MS re-test is available on first shipments at buyer cost.
        </p>
        <p>
          Lead time runs 7–10 business days for in-stock material and 15–20 days for custom-spec batches (lower Hazen colour, tighter 2-ethylhexanol residue, or custom packaging). Payment terms T/T 30% deposit / 70% against B/L copy for first orders; account terms available after three successful shipments. We do not ship into cosmetic markets where our documentation package is insufficient for regulatory approval — if that applies to your destination, we will say so before quoting.
        </p>

        <LeadMagnetCTA
          title="Pricing on 25–200kg Ethylhexylglycerin"
          body="Request a batch-specific CoA, current USD/kg at your target volume, and lead-time commitment to your destination port. We respond within one business day."
          cta="Request a technical dossier"
          topic="ehg-tg-cta"
        />

        {/* H2 9 — FAQ */}
        <h2 id="ehg-faq">Ethylhexylglycerin FAQ</h2>
                <FAQ heading="Ethylhexylglycerin FAQ" id="ehg-faq" items={[
            {
              question: 'Is Ethylhexylglycerin a preservative?',
              answer: 'Ethylhexylglycerin is not listed on EU Annex V as a preservative. INCI classifies it as a skin conditioning agent and deodorant agent. In cosmetic formulas it functions as a preservative booster, lowering the effective dose of a true preservative (phenoxyethanol, 1,2-hexanediol, caprylhydroxamic acid) rather than preserving on its own.',
            },
            {
              question: 'What is the maximum use level of EHG in cosmetics?',
              answer: 'Because EHG is not an Annex V preservative, there is no EU regulatory ceiling. As of 2026-10, the SCCS 1618/20 opinion considered 1.0% safe in cosmetic rinse-off and leave-on products when sensitization risk is assessed. Most leave-on formulations use 0.3–1.0%; deodorant and antiperspirant use levels of 1–3% are common because the primary function is antimicrobial, not preservation booster.',
            },
            {
              question: 'Is Sensiva SC50 the same as generic ethylhexylglycerin?',
              answer: 'Sensiva SC50 is Schülke’s branded Ethylhexylglycerin product. Chemically it is the same molecule (CAS 70445-33-9) as generic Chinese-origin EHG at equivalent GC purity. The price delta reflects brand premium, Schülke’s formulation-support service, and EU warehousing — not a chemical difference. As of 2026-10, public price benchmarks suggest generic 100kg FOB sits well below Sensiva SC50 EU wholesale at comparable MOQ.',
            },
            {
              question: 'What does EHG pair with best?',
              answer: 'The four verified boost pairings are Phenoxyethanol (classic Euxyl PE 9010 pattern), 1,2-Hexanediol (preservative-free positioning), Caprylyl Glycol (Optiphen family), and Benzyl Alcohol (natural-leaning blends). EHG should not be combined with cationic surfactants in high-cat systems and offers no meaningful boost in anhydrous formulations with water activity below 0.6.',
            },
            {
              question: 'Why is EHG banned in some natural cosmetic standards?',
              answer: 'COSMOS and NATRUE do not accept EHG because the raw material is synthesized from petrochemical glycidyl ether chemistry, not plant-derived. Ecocert certification is similarly closed. Brands pursuing certified-natural claims substitute Caprylyl Glycol or Glyceryl Caprylate; both pair with the same preservative systems.',
            },
            {
              question: 'What is the minimum order quantity for ethylhexylglycerin?',
              answer: 'Onerchemical ships EHG from 25kg (one drum) with full CoA, SDS, and export documentation. Lead time is 7–10 business days for in-stock material, 15–20 days for custom-spec batches. Schülke direct deals typically start at larger volumes aimed at OEM accounts, which is the market gap Onerchemical covers for independent cosmetic brands.',
            },
          ]}
        />

        {/* Author block — manual aside, Phase 1 isolation: no cross-link to onerchem.com */}
        <aside className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
          <p className="font-semibold text-slate-800 mb-1">
            About the author — <a href="/yang-ruosong/" className="underline">Yang Ruosong</a>
          </p>
          <p className="text-slate-600">
            Yang Ruosong is a preservation sourcing specialist at Onerchemical, working directly with independent cosmetic brands on 25–200kg preservative and booster procurement. He authors Onerchemical’s preservation-chemistry guides and reviews every outbound Certificate of Analysis against the in-house incoming-QC protocol.
          </p>
        </aside>

        {/* Related posts (internal only, Phase 1 isolation enforced) */}
        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Related reading on Onerchemical</h3>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>
              <a href="/blog/phenoxyethanol-ethylhexylglycerin-combination" className="underline">
                Phenoxyethanol + Ethylhexylglycerin combination — formulator decision guide
              </a>
            </li>
            <li>
              <a href="/blog/phenoxyethanol-technical-guide" className="underline">
                Phenoxyethanol Technical Guide
              </a>
            </li>
            <li>
              <a href="/blog/1-2-hexanediol-technical-guide" className="underline">
                1,2-Hexanediol Technical Guide
              </a>
            </li>
            <li>
              <a href="/blog/caprylhydroxamic-acid-technical-guide" className="underline">
                Caprylhydroxamic Acid Technical Guide
              </a>
            </li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
