import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import { getArticle } from '@/lib/blog-registry';
import SupplierTypeDecoder from '@/components/blog/pillar-02/SupplierTypeDecoder';
import SourcingDecisionWizard from '@/components/blog/pillar-02/SourcingDecisionWizard';

const SLUG = 'cosmetic-preservative-supplier-sourcing';
const URL_PATH = '/guide/preservative-sourcing';
const CANONICAL = `https://onerchemical.com${URL_PATH}`;
const PUBLISHED = '2026-11-03';
const MODIFIED = '2026-11-03';
const AUTHOR_NAME = 'Yang Ruosong';
const AUTHOR_URL = 'https://onerchemical.com/yang-ruosong/';

export const metadata: Metadata = {
  title: 'Cosmetic Preservative Supplier Sourcing: The 2026 Procurement Playbook | Onerchemical',
  description:
    'Procurement-first playbook for sourcing cosmetic preservatives from China. Three-tier supplier decoder, 100 kg to container MOQ economics, the 6-document compliance stack, and a decision wizard for RFQ and audit.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Cosmetic Preservative Supplier Sourcing: The 2026 Procurement Playbook',
    description:
      'Three-tier supplier decoder, MOQ economics 100 kg → container, 6-document compliance stack, and the audit SOP every procurement manager needs before the second order.',
    type: 'article',
    url: CANONICAL,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: [AUTHOR_URL],
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: 'How do I verify a Chinese supplier is the real manufacturer and not a trader with better English?',
    answer:
      'Three checks before PO: (1) ask for the GMP ISO 22716 certificate and confirm the production-line address matches the invoice address exactly; (2) request a video walkthrough of the reactor hall or filling line with the current date board visible; (3) have an SGS or BV PSI (USD 300-450) attend the first bulk production run. A supplier that resists any one of these three is a trader. A supplier that accepts all three may still be a trader with a well-rehearsed story — the three-batch sample program is the final filter.',
  },
  {
    question: 'What annual volume justifies dual-sourcing a preservative?',
    answer:
      'Dual-source once a single preservative represents more than 15 percent of annual preservation spend OR annual pull exceeds 2 T on that molecule — whichever threshold hits first. Below those thresholds the audit and qualification cost of a second supplier typically exceeds the continuity benefit. Above them, the second source is cheaper than one unplanned stock-out. Always qualify the backup on a parallel three-batch program, not reactively during a crisis.',
  },
  {
    question: 'When should I switch from a Tier 2 trader to a Tier 1 direct manufacturer?',
    answer:
      'Switch once your annual pull on one molecule crosses roughly 500 kg sustained, the trader quote stops dropping meaningfully with each volume step, and your QC team can read a plant audit confidently. Switching earlier usually fails on documentation gaps (Tier 1 commodity CoAs often omit fields the trader was filling in). Switching later leaves 15 to 25 percent margin on the table at the 1 to 5 T band.',
  },
  {
    question: 'How often should CoA fields be re-validated against bulk?',
    answer:
      'Every incoming bulk shipment, every batch, on the three highest-risk fields for that molecule (for example assay, isomer purity, and residual solvents on 1,2-hexanediol). Full seven-field re-test with a third-party lab (USD 80-150) once per quarter or every tenth batch, whichever is sooner. Any field variance that exceeds the moving-average tolerance window triggers a non-conformance report and a change-notification request to the supplier.',
  },
  {
    question: 'Is Korean or Japanese pharma-grade worth the premium for cosmetics?',
    answer:
      'For products shipping into Japan or Korea, often yes — the home-market dossier credibility shortens customs and regulatory review. For products shipping only to EU or US, usually no — a well-audited Chinese Tier 1 at 40 to 60 percent of the price delivers equivalent Challenge Test performance and audit outcomes when the three-batch program and audit SOP are run properly. The premium buys consistency and documentation polish, not Challenge Test performance.',
  },
  {
    question: 'What change-notification clause language should the supply contract include?',
    answer:
      'Minimum three triggers with a 60-day advance notice obligation: (1) raw-material source plant change, (2) production process or equipment change that could alter impurity profile, (3) any change to published CoA field list or test method. Add a clause requiring 1 kg retention samples per batch held for 24 months, released to the buyer on request within 10 business days. Any trigger that is activated without notice voids current PO terms and allows return at supplier cost.',
  },
];

export default function Page() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cosmetic Preservative Supplier Sourcing: The 2026 Procurement Playbook',
    description:
      'Procurement-first guide to sourcing cosmetic preservatives from China — three-tier supplier decoder, MOQ economics, 6-document compliance stack, and audit SOP.',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      jobTitle: 'Preservation Supply Partner & Procurement Specialist',
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://onerchemical.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://onerchemical.com/guide/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Preservative Supplier Sourcing',
        item: CANONICAL,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <BlogArticleLayout
        cluster="sourcing"
        title="Cosmetic Preservative Supplier Sourcing: The 2026 Procurement Playbook"
        excerpt="Procurement-first playbook for sourcing cosmetic preservatives from China. Three-tier supplier decoder, 100 kg to container MOQ economics, the 6-document compliance stack, and a decision wizard for RFQ and audit."
        datePublished={PUBLISHED}
        readingMinutes={14}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>Most preservative sourcing fails on the second order, not the first — batch drift, documentation gap, and lead-time collapse are the three failure modes to budget mitigation for.</li>
            <li>Four supplier tiers (Chinese commodity, Dongguan trader, Korean/Japanese pharma, branded EU) each own a different volume band and risk profile — treating them as substitutes is the most common procurement error.</li>
            <li>100 kg is the trader sweet-spot, not the manufacturer sweet-spot — the real price break lives between 500 kg and 5 T, where tier choice flips.</li>
            <li>The six-document compliance stack (CoA + SDS + TDS + GMP ISO 22716 + REACH + COO + non-animal declaration) ships per order, not per supplier — missing one field means re-RFQ, not negotiate.</li>
            <li>The three-batch sample program, not the salesperson, is the final filter on every new supplier relationship.</li>
          </ul>
        </TLDRBox>

        <h2 id="why-second-order-fails">Why most preservative sourcing fails on the second order</h2>
        <p>
          In October 2026 a Rotterdam formulator placed a second 500 kg Phenoxyethanol order with the same supplier
          that had passed her three-batch qualification four months earlier. The CoA that arrived with the drum showed
          every field inside spec, matching the retained sample report line for line. Challenge Test on the finished
          emulsion failed at day 14 with Pseudomonas aeruginosa regrowth to 10<sup>4</sup> CFU/g. Root cause: the supplier
          had quietly switched from a Jiangsu reactor to a Shandong contract manufacturer three weeks earlier. The
          residual impurity profile shifted inside the CoA tolerance window — but the Challenge Test does not read CoAs.
        </p>
        <p>
          This is the pattern every established brand hits sooner or later. The failure is almost never on the first
          order; it is on the second, the fifth, or the first order after a Chinese holiday window. There are three
          failure modes that account for roughly 90 percent of these events, and each needs a different mitigation
          embedded in the procurement SOP.
        </p>

        <h3 id="three-failure-modes">The three failure modes</h3>
        <ul>
          <li>
            <strong>Batch drift</strong> — CoA fields stay inside spec but shift across the tolerance window from one
            batch to the next, until the finished-product preservation efficacy collapses. Mitigated by moving-average
            variance monitoring across the last 6-10 CoAs, not pass-fail checking on the current one.
          </li>
          <li>
            <strong>Documentation gap</strong> — The CoA, SDS, or REACH letter is missing on a specific batch, or the
            field that matters for your regulatory submission (Annex V entry number, isomer purity, residual 1,4-dioxane
            method) was never on the template. Mitigated by locking the field list contractually before the first PO.
          </li>
          <li>
            <strong>Lead-time collapse</strong> — Promised 4-week lead stretches to 10 weeks around CNY, Golden Week, or
            an unplanned reactor maintenance window. Mitigated by dual-sourcing above the 15 percent concentration-of-spend
            threshold, not by chasing single-source price improvements.
          </li>
        </ul>

        <h2 id="china-landscape">The China preservative supply landscape</h2>
        <p>
          Roughly 80 percent of global cosmetic preservative capacity in the common molecules (Phenoxyethanol,
          1,2-Hexanediol, Ethylhexylglycerin) ships from a corridor spanning Jiangsu, Zhejiang, and Shandong. The next
          15 percent flows from Korean and Japanese pharma-adjacent plants (Nagase, BESTCARE500 and similar). The
          remaining 5 percent is European branded (Symrise Hydrolite, Schülke Phenoxetol, Clariant Nipaguard, Minasolve).
          Understanding this geography is the baseline for reading any quotation.
        </p>

        <h3 id="jiangsu-zhejiang-shandong">Jiangsu / Zhejiang / Shandong — the 80% share truth</h3>
        <p>
          Jiangsu dominates Phenoxyethanol and most phenol-derivative chemistry; Zhejiang leads on 1,2-Hexanediol and
          short-chain diols; Shandong carries the salt and acid-based preservatives (benzoate, sorbate, dehydroacetic
          acid). This matters because a quote claiming to be &quot;Jiangsu-made Hexanediol direct&quot; is almost always
          either repack or a hybrid blend — Jiangsu is not where the Hexanediol capacity sits.
        </p>

        <h3 id="branded-fit">Where branded EU / Korean-Japanese plants fit</h3>
        <p>
          Branded European and Korean-Japanese plants exist to serve finished-product brands that need the dossier
          credibility on-pack or in regulatory submissions, not because their Challenge Test performance is categorically
          superior. For a mid-market indie brand reformulating under budget pressure, this premium often cannot be
          recovered through finished-product pricing. For an established brand selling into pharmacy or dermatologist
          channels, the premium pays for itself in the first regulatory audit.
        </p>

        <h3 id="made-in-china">Why &quot;Made in China&quot; ≠ one supplier tier</h3>
        <p>
          A procurement team that treats all Chinese preservative supply as one tier will consistently overpay the
          trader, underqualify the manufacturer, and miss the real cost gap. The three-tier distinction below is the
          minimum resolution needed to read a Chinese preservative quotation accurately.
        </p>

        <h2 id="tier-decoder">Three-tier supplier decoder</h2>
        <p>
          A supplier identifies as one of four tiers whether or not the quotation says so. Reading the tier correctly
          is the single highest-leverage input in preservative sourcing — more than price, more than lead time, more
          than the number of certificates attached.
        </p>

        <h3 id="tier-1-commodity">Tier 1 — Chinese commodity direct</h3>
        <p>
          Real plants in Jiangsu, Zhejiang, or Shandong selling their own production. Price floor, best for container-load
          recurring pulls, strongest batch-site traceability when the plant is genuine. Weakness: CoA field list may be
          thin on items the EU dossier requires, and MOQ typically starts at 500 kg to 1 T. For a procurement team with
          a working audit program this is the right primary source above 500 kg sustained annual pull.
          See the <Link href="/blog/phenoxyethanol-supplier-guide">Phenoxyethanol three-tier price benchmark</Link>{' '}
          for the exact Q4 2026 commodity price band on one molecule.
        </p>

        <h3 id="tier-2-trader">Tier 2 — Dongguan/HK trader repack</h3>
        <p>
          Trading houses in Guangdong (often Dongguan) and Hong Kong consolidating multiple molecules into mixed
          containers for indie and scale-up buyers. Real value: 100 kg MOQ, English-language response speed, mixed-SKU
          consolidation. Real risk: the source plant can change between batches without notification. For a buyer under
          500 kg sustained annual pull this tier is often the only economic option. See{' '}
          <Link href="/blog/1-2-hexanediol-supplier-guide">
            how trader isomer-blend substitution causes Challenge Test failure
          </Link>{' '}
          for the specific documented failure pattern on 1,2-Hexanediol.
        </p>

        <h3 id="tier-3-pharma">Tier 3 — Korean-Japanese pharma-adjacent</h3>
        <p>
          Nagase, BESTCARE500, and similar pharma-adjacent suppliers. 40 to 80 percent premium over Chinese commodity;
          CoA field variance typically under 2 percent batch-to-batch; dossier formatting translates well to EU and
          MoCRA audits. Lead time runs 6-10 weeks and MOQ sits at 200-500 kg. Best fit for brands shipping to Japan or
          Korea, or for brands where regulatory dossier polish is business-critical.
        </p>

        <h3 id="tier-4-branded">Tier 4 — Branded EU</h3>
        <p>
          Symrise, Schülke, Clariant, Minasolve. 3-6x commodity pricing. Dossier is audit-bulletproof in every major
          market. Reformulation support, stability data libraries, pre-registered INCI. Economic only above roughly
          USD 50/kg finished-product cost, or in SKUs where the brand name on the Safety Data Package has defensive value.
        </p>

        <h3 id="detect-mislabel">How to detect tier mislabeling in a quotation</h3>
        <p>
          Three signals that a &quot;Tier 1 direct manufacturer&quot; is actually a Tier 2 trader: (1) the quoted MOQ is
          under 500 kg with no price step at 500 kg; (2) the English-language response time is under 24 hours including
          weekends; (3) the invoice-issuing company name is in a different province from the claimed plant location.
          Any two of three is enough to re-RFQ with the trader-tier assumption and a correspondingly adjusted price
          benchmark.
        </p>

        <SupplierTypeDecoder />

        <h2 id="moq-economics">MOQ economics: 100 kg → 500 kg → 5 T → container-load</h2>
        <p>
          MOQ is the most misread variable in preservative procurement. The intuition &quot;bigger is always cheaper&quot;
          holds within a tier, but tier flips at specific volume thresholds and resets the price curve. Mapping these
          thresholds correctly for your annual pull is where 15 to 25 percent of procurement margin typically lives.
        </p>

        <h3 id="100kg-sweet-spot">Why 100 kg is the trader sweet-spot, not the manufacturer sweet-spot</h3>
        <p>
          Tier 1 commodity manufacturers rarely sell meaningful quantities under 500 kg — their minimum reactor charge
          and documentation overhead make 100 kg orders unprofitable, so the quote (when offered) often carries a
          500 kg price floor dressed as a courtesy. Tier 2 traders, who are already carrying mixed inventory, hit their
          best unit economics in the 50-200 kg band. For a Year-1 indie buying 100 kg of Phenoxyethanol at 1.0 percent
          inclusion, 100 kg is roughly 10 metric tons of finished product — about 18 months of early-stage supply.
          Buying this quantity direct from a Tier 1 is typically more expensive than buying through a reputable Tier 2
          trader.
        </p>

        <h3 id="price-break-reality">Price-break reality table (not promise table)</h3>
        <p>
          Published or quoted price breaks are negotiating anchors, not commitments. The real break reflects the
          supplier's production economics, not their RFP template. Verify by requesting formal quotes at three
          adjacent volume bands (100 kg / 500 kg / 1 T) from the same supplier in the same week — the delta between
          those three quotes maps the real curve.
        </p>

        <h3 id="dual-sourcing-threshold">When to split across two suppliers</h3>
        <p>
          Dual-sourcing starts earning its qualification cost at roughly 15 percent concentration of annual preservation
          spend on one molecule, or 2 T sustained annual pull — whichever hits first. Below these thresholds the audit
          and documentation overhead of a second qualified source usually exceeds the continuity benefit. Above them,
          the backup is cheaper than one unplanned Challenge Test failure during a reformulation window. The qualification
          must run in parallel on a three-batch program — never qualify the backup reactively.
        </p>

        <h2 id="compliance-stack">The 6-document compliance stack</h2>
        <p>
          Six documents ship with every bulk order (not every supplier relationship, every order). The whole set is
          either present on the quoted PO or the quote is incomplete. Missing one is a re-RFQ event, not a negotiation
          event — a supplier that cannot ship the full stack has either not qualified the lot for export or does not
          control the field.
        </p>

        <h3 id="coa-sds-tds">CoA / SDS / TDS triplet</h3>
        <p>
          CoA with batch-site-date triplet and the seven procurement-critical fields (assay, impurity profile, heavy
          metals by ICP-MS, residual solvents by GC-headspace, microbial panel, batch size, production date). SDS in
          the destination-market format (GHS for most jurisdictions). TDS with handling, storage, shelf life, and
          packaging specifications.
        </p>

        <h3 id="gmp-reach-coo">GMP ISO 22716 + REACH + COO + non-animal declaration</h3>
        <p>
          GMP ISO 22716 certificate from an accredited certifier with the production-line address matching the invoice
          address. REACH pre-registration letter or Only Representative confirmation for EU shipments. Certificate of
          Origin with correct HS code (2905.39 for 1,2-Hexanediol, for example). Non-animal-testing declaration naming
          the molecule and the finished-product supply chain.
        </p>

        <h3 id="link-batch-consistency">Linking to batch consistency monitoring</h3>
        <p>
          CoA field completeness is the entry criterion; CoA field consistency across batches is the operating criterion.
          See <Link href="/blog/preservative-coa-batch-consistency">
            how to monitor CoA drift batch-to-batch with moving-average tolerance windows
          </Link>{' '}
          for the full monitoring SOP and the supplier audit scorecard that feeds the annual re-qualification review.
        </p>

        <h3 id="link-annex-v">Linking to EU Annex V dossier requirements</h3>
        <p>
          For EU-destined shipments the CoA stack must support the CPSR dossier that the Responsible Person files.
          See <Link href="/blog/eu-annex-v-preservative-compliance-guide">
            EU Annex V dossier obligations for importers
          </Link>{' '}
          for the exact field list that CPSR Part A and Part B each require, and the CPNP notification cadence that
          downstream brands expect their raw-material supplier to support.
        </p>

        <SourcingDecisionWizard />

        <h2 id="supplier-audit">Supplier audit: on-site vs remote vs third-party</h2>
        <p>
          Three audit modalities, each with a specific cost-value profile and a specific place in the procurement SOP.
          Running the wrong modality is a common early-stage error — on-site audit before a supplier is shortlisted
          is wasted; remote audit at container-load volume is thin cover.
        </p>

        <h3 id="when-psi">When PSI (SGS/BV) is worth USD 300-450</h3>
        <p>
          Third-party pre-shipment inspection by SGS, Bureau Veritas, or Intertek pays for itself the first time it
          catches an isomer-blend substitution or an impurity-profile shift. Run it on every first bulk shipment from a
          new supplier, on every bulk shipment above USD 20,000 regardless of supplier tenure, and on every bulk
          shipment following a change-notification event. The USD 300-450 cost is roughly 0.5 to 2 percent of the typical
          bulk-shipment value in the 500 kg to 2 T band.
        </p>

        <h3 id="remote-audit">Remote audit SOP (what video walkthrough cannot replace)</h3>
        <p>
          Remote audit via video walkthrough is appropriate for the shortlist stage and for annual re-qualification
          between on-site visits. It cannot replace the physical reactor-hall inspection on initial qualification, and
          it cannot assess warehouse hygiene or raw-material inbound QC meaningfully. A video walkthrough with the
          current date board visible, a plant exterior shot that reads street-view-cross-referenceable, and the production
          supervisor on camera is the minimum useful configuration.
        </p>

        <h3 id="audit-cadence">Annual re-audit cadence by tier</h3>
        <p>
          Tier 1 commodity: annual on-site or third-party, quarterly remote. Tier 2 trader: semi-annual remote with
          annual third-party PSI on the largest shipment. Tier 3 pharma: annual remote plus every-second-year on-site.
          Tier 4 branded: annual document audit sufficient under normal operation; on-site only on change-of-brand-owner
          or regulatory event.
        </p>

        <h2 id="procurement-pitfalls">The 7 procurement pitfalls (field-collected 2024-2026)</h2>
        <p>
          Seven failure patterns that recur across procurement teams in the preservative category. Each is specific
          enough that recognizing it in the quotation phase prevents the downstream event.
        </p>
        <ul>
          <li>
            <strong>Sample-vs-bulk CoA mismatch</strong> — the 500 g sample ships with a lab-prepared CoA that does not
            reflect bulk-production variance. Mitigate by requiring the sample CoA to come from the specific production
            lot and insisting on bulk CoA from the identical lot number.
          </li>
          <li>
            <strong>&quot;Factory price&quot; that is actually trader repack</strong> — covered under tier mislabeling.
            Mitigate with the three detection signals above.
          </li>
          <li>
            <strong>Payment terms as risk signal</strong> — a supplier demanding 100 percent advance on first order is
            either a trader without working capital or a plant with cash-flow pressure. 30 percent deposit / 70 percent
            against B/L copy is the baseline; anything stricter needs explanation.
          </li>
          <li>
            <strong>Change-notification clause absence</strong> — if the contract has no clause, the supplier owes you
            no notice when the source plant or process changes. Insist on 60-day advance notice for the three triggers
            named in the FAQ below.
          </li>
          <li>
            <strong>Private-label chain-of-custody opacity</strong> — a private-label manufacturer may re-source from
            a different upstream than the one audited at onboarding, usually without disclosure. Mitigate by requiring
            quarterly disclosure of the upstream raw-material supplier for the lot and treating any un-notified change
            as a change-notification clause breach.
          </li>
          <li>
            <strong>Lead-time collapse in Q4</strong> — Chinese New Year typically falls January-February and triggers
            a 3-6 week production and shipment freeze. Mitigate by placing the Q1 order no later than mid-November and
            carrying 60 days of safety stock on primary molecules through the window.
          </li>
          <li>
            <strong>Hidden sub-contracting</strong> — a supplier accepts the PO but sub-contracts production to a third
            plant that was never audited. Mitigate by naming the production plant in the contract and requiring
            production records (batch log, QC record) to reference that specific plant.
          </li>
        </ul>

        <h2 id="lead-magnet">Get the Preservative Procurement Readiness Checklist</h2>
        <p>
          Fourteen procurement-ready checks across RFQ, sample program, bulk acceptance, audit, and contract — the
          same checklist used by the Onerchemical procurement desk when onboarding a new preservative supplier
          relationship. Delivered as a PDF to your inbox; no sales call attached.
        </p>
        <LeadMagnetCTA
          title="Preservative Procurement Readiness Checklist"
          body="14 field-tested checks across RFQ, three-batch program, bulk acceptance, audit, and contract. PDF delivered to your inbox."
          cta="Email me the checklist"
          topic="procurement-readiness-checklist"
        />
        <p className="mt-6">
          If you have a specific preservative RFQ in flight and want a procurement-side review before you issue it,{' '}
          <Link href="/contact/" className="font-semibold underline">
            send the brief to our procurement desk
          </Link>{' '}
          — response within one business day with the tier shortlist and red-flag read on the vendor set you are
          evaluating.
        </p>

        <FAQ heading="Procurement FAQ" id="procurement-faq" items={FAQ_ITEMS} />

        <aside className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-base font-semibold text-slate-900">About the author</h3>
          <p className="mt-2 text-sm text-slate-700">
            <strong>Yang Ruosong</strong> leads preservation supply partnerships at Onerchemical — long-term sourcing,
            batch-consistency monitoring, and compliance dossier operations for established cosmetic brands and contract
            manufacturers with recurring high-volume preservative demand. Procurement playbooks are written from the
            desk that runs them, not from a formulation lab.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            <Link href="/yang-ruosong/" className="font-semibold underline">
              Author profile →
            </Link>
          </p>
        </aside>

        <aside className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">Related reading in the sourcing cluster</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              <Link href="/blog/phenoxyethanol-supplier-guide">
                Phenoxyethanol Supplier Guide — three-tier price benchmark + procurement SOP
              </Link>
            </li>
            <li>
              <Link href="/blog/1-2-hexanediol-supplier-guide">
                1,2-Hexanediol Supplier Guide — isomer-purity audit + Korean-pharma vs Chinese-commodity economics
              </Link>
            </li>
            <li>
              <Link href="/blog/preservative-coa-batch-consistency">
                Preservative CoA Batch Consistency — moving-average drift tracker + annual supplier audit scorecard
              </Link>
            </li>
            <li>
              <Link href="/blog/eu-annex-v-preservative-compliance-guide">
                EU Annex V Preservative Compliance — dossier obligations for importers
              </Link>
            </li>
            <li>
              <Link href="/blog/iso-11930-challenge-test-protocol">
                ISO 11930 Challenge Test Protocol — the ultimate supplier verification
              </Link>
            </li>
            <li>
              <Link href="/guide/cosmetic-preservatives">
                The Complete Guide to Cosmetic Preservatives (Pillar #1 — selection framework)
              </Link>
            </li>
          </ul>
        </aside>
      </BlogArticleLayout>
    </>
  );
}
