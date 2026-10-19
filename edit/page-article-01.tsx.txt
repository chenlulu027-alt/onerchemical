import type { Metadata } from 'next';
import { buildMeta, SITE } from '@/lib/seo';
import { getArticle } from '@/lib/blog-registry';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { ComparisonTable } from '@/components/blog/blocks/ComparisonTable';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { PhenoxyDecisionTree } from '@/components/blog/article-01/PhenoxyDecisionTree';
import { CLUSTERS } from '@/lib/blog-registry';

const SLUG = 'phenoxyethanol-ethylhexylglycerin-combination';
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
    question: 'Is ethylhexylglycerin itself a preservative?',
    answer:
      'No — it does not pass preservative-efficacy testing on its own at use concentrations. It is a multifunctional ingredient that boosts other preservatives (notably phenoxyethanol, benzyl alcohol, and some organic acids) by disrupting microbial cell-wall surface tension.',
  },
  {
    question: 'What is a typical use ratio?',
    answer:
      'A common starting point in leave-on emulsions is 0.7% phenoxyethanol plus 0.3% ethylhexylglycerin (total ~1.0%). Validate with ISO 11930 or USP 51 challenge testing on the final matrix — the ratio can be tuned down once pass criteria are met.',
  },
  {
    question: 'Does the combination work at acidic pH?',
    answer:
      'Phenoxyethanol remains stable and active from pH 3 to 10, so acidic systems (e.g. a pH 3.5 vitamin-C serum) are well within range. Ethylhexylglycerin is also pH-stable in this range. The combination performs well in acidic leave-on systems where single-system phenoxyethanol can struggle against pseudomonads.',
  },
  {
    question: 'Is the combination regulated under EU 1223/2009?',
    answer:
      'Phenoxyethanol is listed in Annex V at a maximum concentration of 1.0% (updated by Regulation (EU) 2024/996 for leave-on products on children). Ethylhexylglycerin is not listed in Annex V and has no maximum use level, but is typically used at 0.3–0.5%. Always consult the current Annex V revision.',
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
        <TLDRBox>
          <p>
            Phenoxyethanol alone (0.5–1.0%) is sufficient for rinse-off products and most pH 4–7
            aqueous formulations. The combination with ethylhexylglycerin (0.3%) is justified in
            leave-on emulsions and anywhere gram-negative coverage needs reinforcement — but it is
            not a universal upgrade. Challenge testing, not reputation, decides.
          </p>
        </TLDRBox>

        <h2 id="why-two-together">Why the two show up together on so many INCI lists</h2>
        <p>
          Scan the ingredient list on almost any mainstream Western face cream from the last decade
          and you will find them in sequence: <em>phenoxyethanol, ethylhexylglycerin</em>.
          The pairing is so dominant that it is often treated as a single ingredient — a kind of
          default &quot;modern paraben replacement&quot; that formulators drop in without
          revisiting the decision. That default has merit, but the mechanism is worth understanding
          before you adopt it blindly.
        </p>
        <p>
          Phenoxyethanol is a glycol ether that acts on microbial cell membranes, with reliable
          activity against gram-positive bacteria, yeasts, and moulds — but relatively weaker
          activity against gram-negative bacteria, particularly <em>Pseudomonas aeruginosa</em>.
          Ethylhexylglycerin, a short-chain alkanediol, is itself a weak preservative; its main
          effect is to lower the surface tension of microbial cell walls, allowing other
          preservatives to penetrate more effectively. Combined, the two shift the broad-spectrum
          profile from &quot;good against most, weak against pseudomonads&quot; to
          &quot;reliable across the full ISO 11930 panel.&quot;
        </p>

        <h2 id="when-necessary">Where the combination is actually necessary</h2>
        <p>
          Our rule of thumb — refined over several hundred customer formulations — is that the
          combination earns its place in three contexts, and is overkill elsewhere:
        </p>

        <ComparisonTable
          columns={['Product context', 'Phenoxy alone', 'Phenoxy + EHG']}
          rows={[
            { label: 'Rinse-off cleansers, shampoos', values: ['Sufficient', 'Overkill'] },
            { label: 'Leave-on O/W emulsions (cream, lotion)', values: ['Marginal', 'Recommended'], emphasize: true },
            { label: 'Anhydrous (oil, balm, powder)', values: ['Unnecessary', 'Unnecessary'] },
            { label: 'Aqueous serums, pH 4–6', values: ['Case-by-case', 'Recommended'], emphasize: true },
            { label: 'Alkaline (soap, pH > 8)', values: ['Fails', 'Marginal'] },
            { label: 'Children leave-on (EU, 2024+)', values: ['Prohibited', 'Depends on concentration'] },
          ]}
          caption="Guidance for Western-market leave-on and rinse-off cosmetics. Always validate with challenge testing on the final matrix."
        />

        <h3 id="decision-tree">Pick your system</h3>
        <PhenoxyDecisionTree />

        <h2 id="regulatory-layer">The regulatory layer that trips people up</h2>
        <p>
          Phenoxyethanol has been in EU Annex V (list of permitted preservatives) at a maximum
          concentration of 1.0% for years. In 2024, Regulation (EU) 2024/996 added a restriction:
          phenoxyethanol is now capped at a lower concentration in leave-on products intended for
          children under 3 (excluding products for the diaper area, where it remains banned
          outright). Formulators building a brand for infants or toddlers must verify the current
          cap and consider whether the combination is still viable at the lower phenoxyethanol
          level, or whether an entirely different system is more appropriate.
        </p>
        <p>
          Ethylhexylglycerin is <strong>not</strong> an Annex V preservative — it is treated as a
          cosmetic ingredient with no specific use-level restriction. This is both an advantage
          (regulatory simplicity) and a limitation (you cannot claim it alone as the preservation
          system — the Annex V entry on your Cosmetic Product Safety Report must still be
          phenoxyethanol or whatever the primary preservative is).
        </p>

        <h2 id="formulation-details">Formulation details that affect the outcome</h2>
        <p>
          A few technical details separate a textbook pass from a repeated challenge-test failure:
        </p>
        <ul>
          <li>
            <strong>Order of addition:</strong> add both ingredients in the cool-down phase, below
            40°C. Phenoxyethanol can volatilise above 50°C with prolonged heat.
          </li>
          <li>
            <strong>Chelator presence:</strong> adding 0.1% EDTA or a chelator like phytic acid
            substantially boosts the system against gram-negatives, often letting you reduce
            total preservative load.
          </li>
          <li>
            <strong>pH drift:</strong> some botanical extracts and acids drift the pH over a 12-month
            shelf life. If your target is pH 5.5, build in enough buffer that the end-of-life pH
            doesn&apos;t creep above 6.5 — above which gram-negative risk rises.
          </li>
          <li>
            <strong>Packaging:</strong> jar packaging introduces repeated finger contamination;
            dispensing packaging (tube, pump, airless) halves the practical preservative demand.
          </li>
        </ul>

        <LeadMagnetCTA
          title="Need bulk-grade phenoxyethanol or EHG?"
          body="We supply USP/EP-grade phenoxyethanol and cosmetic-grade ethylhexylglycerin with batch COA, MSDS, and residual-solvent profile. Request a sample and a technical dossier covering challenge-test data in common matrices."
          topic="phenoxyethanol-ehg-sample"
          cta="Request sample + technical dossier"
        />

        <h2 id="wrong-answer">When the combination is the wrong answer</h2>
        <p>
          The combination is not a silver bullet. Three situations where we steer formulators
          elsewhere:
        </p>
        <ul>
          <li>
            <strong>Alkaline systems (pH &gt; 7.5):</strong> phenoxyethanol loses activity against
            gram-negatives; even with ethylhexylglycerin, performance is marginal. Consider benzyl
            alcohol + dehydroacetic acid, or a chelator-driven system.
          </li>
          <li>
            <strong>&quot;Clean beauty&quot; brand positioning:</strong> while both ingredients are
            dermatologically well-tolerated, some retailer policies (Credo, Whole Foods, Sephora
            Clean) exclude phenoxyethanol. Alternatives: dehydroacetic acid + benzyl alcohol,
            or Leucidal (Lactobacillus ferment).
          </li>
          <li>
            <strong>Fragrance-sensitive or odour-critical products:</strong> ethylhexylglycerin has
            a faint but perceptible odour in some batches. For perfumed concentrates where odour
            cleanliness matters, single-system phenoxyethanol is safer.
          </li>
        </ul>

        <FAQ items={FAQ_ITEMS} id="faq" />
      </BlogArticleLayout>
    </>
  );
}
