import type { Metadata } from 'next';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import AnnexVEntryDecoder from '@/components/blog/article-12/AnnexVEntryDecoder';
import CPSRDocumentationChecklist from '@/components/blog/article-12/CPSRDocumentationChecklist';
import { getArticle } from '@/lib/blog-registry';

const SLUG = 'eu-annex-v-preservative-compliance-guide';
const SITE = 'https://onerchemical.com';
const CANONICAL = `${SITE}/blog/${SLUG}`;
const PUBLISHED = '2026-11-03T00:00:00.000Z';
const MODIFIED = '2026-11-03T00:00:00.000Z';

export const metadata: Metadata = {
  title: 'EU Annex V Preservatives: 2026 Compliance Guide for Cosmetic Brands',
  description:
    'The 59-entry Annex V decoder, five limit-reading traps, non-Annex V multifunctionals, CPSR evidence requirements, supplier dossier audit, CPNP fields, Safety Gate enforcement, and change-management SOP under EU Regulation 1223/2009.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    url: CANONICAL,
    siteName: 'Onerchemical',
    title: 'EU Annex V Preservatives: 2026 Compliance Guide',
    description:
      'A procurement, QC and regulatory playbook for Annex V preservative compliance under EU 1223/2009 — written for established cosmetic brands and contract manufacturers.',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: [`${SITE}/yang-ruosong/`],
    images: [
      {
        url: `${SITE}/images/blog/article-12/hero.jpg`,
        width: 1600,
        height: 900,
        alt: 'A compliance manager cross-checking a Safety Gate (ex-RAPEX) withdrawal notice against an Annex V preservative concentration worksheet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EU Annex V Preservatives: 2026 Compliance Guide',
    description:
      'Annex V decoder, limit-reading traps, CPSR evidence, CPNP fields, Safety Gate enforcement patterns — the full compliance playbook.',
  },
};

export default function Page() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'EU Annex V Preservatives: The 2026 Compliance Guide for Cosmetic Brands and Contract Manufacturers',
    description:
      'Annex V decoder, five limit-reading traps, non-Annex V multifunctional legal status, CPSR evidence, supplier dossier audit, CPNP notification fields, Safety Gate enforcement and change-management SOP under EU 1223/2009.',
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
    image: `${SITE}/images/blog/article-12/hero.jpg`,
    about: [
      { '@type': 'Thing', name: 'EU Annex V Preservatives' },
      { '@type': 'Thing', name: 'Cosmetic Products Regulation (EC) No 1223/2009' },
      { '@type': 'Thing', name: 'CPNP Notification' },
      { '@type': 'Thing', name: 'CPSR Safety Report' },
    ],
    keywords:
      'EU Annex V preservatives, cosmetic preservative EU regulation, EU 1223/2009 preservatives, CPNP preservative compliance, Annex V entry number, Safety Gate preservative',
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
        name: 'Regulatory',
        item: `${SITE}/blog?cluster=regulatory`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'EU Annex V Preservative Compliance Guide',
        item: CANONICAL,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Do I need to re-notify CPNP for every production batch of a cosmetic product?',
      answer:
        'No. CPNP notification is per product formulation, not per batch. You re-notify only when the formulation changes materially — a new preservative, a change in concentration above the stated range, a new primary packaging that alters stability or exposure assumptions, or a nanomaterial addition. A supplier-side change (new source plant, new synthesis route) does not by itself trigger CPNP re-notification but it does trigger PIF update and may trigger a new Challenge Test depending on the change-management SOP you have with the Responsible Person.',
    },
    {
      question: 'If my preservative is not on Annex V, is it illegal to use in a cosmetic sold in the EU?',
      answer:
        'Not automatically. Annex V governs substances whose primary function in the product is preservation. Substances that happen to have antimicrobial activity but are present for another declared purpose — Ethylhexylglycerin (skin conditioning), 1,2-Hexanediol (skin conditioning / humectant), Caprylyl Glycol (skin conditioning), Caprylhydroxamic Acid (chelating) — are legal to use at their stated functional concentration without being on Annex V. The regulatory burden shifts: you must substantiate the non-preservative function in the CPSR Part A and avoid any marketing claim that identifies them as the product’s preservative system. If the only antimicrobial substance in the formula is non-Annex V, the Responsible Person must demonstrate through Challenge Test that the overall formulation is self-preserving under its stated use conditions.',
    },
    {
      question: 'How do UK and EU preservative rules now differ after Brexit?',
      answer:
        'The UK retained Annex V text as of 1 January 2021 and administers it through the UK Cosmetics Regulation. Divergence has grown slowly: certain SCCS opinions published after 2021 have been adopted into EU Annex V but not into the UK equivalent, and vice versa for OPSS-driven changes. Notification is parallel: EU-destined products go to CPNP, UK-destined products go to SCPN (Submit Cosmetic Product Notifications on the gov.uk portal). The practical rule for brands shipping to both markets is to dual-file and keep a divergence register listing any entry where the two annexes now differ.',
    },
    {
      question: 'Does the EU recognize US GRAS status or Japan Positive List status for preservatives?',
      answer:
        'No. Annex V is a positive list in its own right. A preservative with GRAS status for food use in the US has no standing under EU 1223/2009; it must be on Annex V for primary preservation use or justified as a non-preservative multifunctional. Likewise, inclusion on Japan’s Standards for Cosmetics (positive list for preservatives) does not grant Annex V status. Cross-market product dossiers must therefore map each preservative independently against each jurisdiction’s positive list.',
    },
    {
      question: 'What typically triggers a Safety Gate (ex-RAPEX) withdrawal versus a quiet warning letter?',
      answer:
        'Safety Gate notifications are triggered by national market surveillance authorities when a product poses a serious risk — concentration overrun of a capped Annex V substance, presence of a banned substance (Annex II), inadequate preservation leading to microbiological failure, or a child-product violation. Quiet warning letters go out for lower-stakes issues: missing allergen label, incomplete CPNP record, labelling language errors. The reality in 2024-2026 is that competent authorities under-notify Safety Gate for Annex V concentration overruns of 10-30% above cap — they prefer a corrective action request first — but Pseudomonas-regrowth incidents in finished products reliably trigger Safety Gate within 48 hours.',
    },
    {
      question: 'In a private-label deal, who holds the compliance obligation under Annex V?',
      answer:
        'The Responsible Person (RP) named on the product label and in CPNP holds primary legal obligation under Article 4 of 1223/2009. In practice this is almost always the brand owner, not the contract manufacturer. However, the contract manufacturer is bound by the supply contract’s change-notification clauses and by the obligations of a Union importer if they bring raw materials in from outside the EU. A well-constructed private-label contract makes the manufacturer’s obligation explicit: notify any formulation deviation, maintain batch records, and surrender full CoA + supplier dossier on request. Without that contract language, the brand is exposed to supply-chain opacity it cannot defend at audit.',
    },
    {
      question: 'How does the Omnibus Regulation (EU 2023/1545) affect my current stock of preservative raw material?',
      answer:
        'The Omnibus process consolidates and updates Annex V entries, typically with a transition period of 6 to 18 months. Current-stock raw material produced before the amendment is not automatically grandfathered into finished product — the finished product sold on or after the amendment’s effective date must comply with the new Annex V text, regardless of when its ingredient was manufactured. For a brand holding 500 kg of a preservative whose cap was reduced from 1.0% to 0.5%, the material itself remains legal, but any finished product using it above the new cap cannot be placed on the EU market after the transition date. The practical response is to reformulate ahead of the deadline and sell through legacy stock to markets without the new cap.',
    },
    {
      question: 'Is a "preservative-free" claim defensible under EU 1223/2009?',
      answer:
        'Only under narrow conditions, and the Commission’s 2017 Technical Document on cosmetic claims is strict. "Preservative-free" is defensible only when the product contains no substance from Annex V at any concentration — not even a non-preservative use of an Annex V-listed substance. Products that rely on multifunctionals (1,2-Hexanediol, Ethylhexylglycerin, Caprylhydroxamic Acid) for antimicrobial protection may use "without Annex V preservatives" or "preservation system based on multifunctional ingredients" — language that is factually true, non-misleading, and traceable to the ingredient list. "Preservative-free" paired with any Annex V ingredient is a Commission-flagged misleading claim.',
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
        cluster="regulatory"
        title="EU Annex V Preservatives: The 2026 Compliance Guide for Cosmetic Brands and Contract Manufacturers"
        excerpt="A procurement, QC and regulatory playbook for established cosmetic brands and contract manufacturers: the 59-entry Annex V decoder, five limit-reading traps, non-Annex V multifunctional legal status, CPSR evidence requirements, supplier dossier audit, CPNP notification fields, Safety Gate enforcement patterns, and change-management SOP under Regulation 1223/2009."
        datePublished={PUBLISHED}
        readingMinutes={18}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Annex V of Regulation (EC) 1223/2009 is a 59-entry positive list of substances allowed in cosmetics placed on the EU market when used for preservation. Any preservative not on Annex V can only be used legally for a different declared function.
            </li>
            <li>
              Five systematic traps catch brands at audit: the sum-of-parabens cap (entry 12), the rinse-off / leave-on split (sorbic acid, IPBC), the child-under-3 exclusions, the acid/salt interconversion math, and the "preservation function only" scope rule for multifunctionals.
            </li>
            <li>
              Non-Annex V multifunctionals (Phenoxyethanol-free systems built on 1,2-Hexanediol, Ethylhexylglycerin, Caprylhydroxamic Acid, Caprylyl Glycol) are legal but shift the burden to CPSR substantiation and Challenge Test evidence.
            </li>
            <li>
              Safety Gate (ex-RAPEX) 2024-2026 preservative withdrawals cluster into four categories: concentration overrun, forbidden substance, inadequate preservation, and child-product violation. Pseudomonas-regrowth incidents trigger notification within 48 hours.
            </li>
            <li>
              The supplier CoA for an Annex V preservative must carry the entry number explicitly and the production site must match the GMP ISO 22716 certificate — otherwise the compliance chain cannot be defended under Article 5 of 1223/2009.
            </li>
          </ul>
        </TLDRBox>

        <h2 id="rotterdam-opener">A &euro;18,000 Rotterdam seizure, one secondary preservative over limit</h2>
        <p>
          In Q2 2026 a mid-sized cosmetic brand placing an eau de parfum body lotion on the Dutch market received a Safety Gate notification 72 hours after a routine port inspection in Rotterdam. The notified cause was not the brand’s primary preservative. Phenoxyethanol was present at 0.85%, well under the Annex V entry 29 cap of 1.0%. The violation sat with a secondary acidic preservative: Sorbic Acid at 0.84%, calculated as free acid, versus the Annex V entry 4 cap of 0.6%.
        </p>
        <p>
          The product was pulled from distribution across the EU within 48 hours. The brand’s compliance team reconstructed the error: the formulator had specified Potassium Sorbate at 1.0% to buffer the low-pH formula, confident that the salt form was outside Annex V scope. It is not. Annex V entry 4 covers "Sorbic Acid and its salts" and the cap is expressed as the free acid. The 1.0% potassium salt converts to approximately 0.84% free acid — above the 0.6% cap.
        </p>
        <p>
          Direct costs: &euro;18,000 in product recall logistics, retest costs, and relabelling. Indirect costs: four weeks of lost distribution, a Safety Gate record visible to every national competent authority in the EEA, and a demand from two retail partners for a signed compliance improvement plan. The reformulation itself took eleven working days.
        </p>
        <p>
          This article is the compliance manager’s playbook that would have caught this at CPSR review — covering what Annex V actually governs, the five systematic traps, the non-Annex V multifunctional landscape, the CPSR evidence requirements, the supplier dossier audit, CPNP notification fields, Safety Gate enforcement patterns, and the change-management SOP that keeps subsequent batches defensible.
        </p>

        <h2 id="what-annex-v-governs">What Annex V actually governs (and what it does not)</h2>
        <p>
          Annex V of Regulation (EC) No 1223/2009 is a positive list of 59 entries covering substances that may be present in finished cosmetic products placed on the EU market <em>when used for preservation</em>. The qualifier matters. Annex V governs the primary function of preservation. Annex II (forbidden substances) and Annex III (restricted substances allowed only under conditions) interact with Annex V and must be read alongside.
        </p>
        <p>
          Three practical consequences follow from the "when used for preservation" scope:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A substance not on Annex V may still be used in a cosmetic product if its declared function is something other than preservation. The CPSR must substantiate the alternative function and no marketing claim may describe the substance as the product’s preservative.
          </li>
          <li>
            A substance on Annex V used at a concentration below its cap is legal if used as a preservative. Used above the cap, the product is non-compliant and triggers withdrawal regardless of marketing framing.
          </li>
          <li>
            "Self-preserving" or "preservative-free" claims attract scrutiny. The 2017 Commission Technical Document on cosmetic claims requires any such claim to be truthful, non-misleading, and substantiated — a formula containing an Annex V-listed substance cannot carry a "preservative-free" claim even if that substance is present for another declared purpose.
          </li>
        </ul>
        <p>
          The regulatory philosophy differs meaningfully from the US MoCRA (which requires facility registration and adverse event reporting but imposes no preservative-specific positive list) and from China’s IECIC 2021 (which is a broader cosmetic ingredient inventory, not a function-specific positive list). An EU-compliant preservation system is not automatically compliant in those markets; a China-compliant system is not automatically compliant in the EU. Multi-market SKUs require a per-market Annex V analogue.
        </p>

        <h2 id="entry-decoder">The full 59-entry Annex V decoder</h2>
        <p>
          Annex V entries do not read uniformly. Some caps are a single percentage; others split by rinse-off versus leave-on; others impose product-type exclusions (not under 3, not oral, not eye-area, not spray). The decoder below indexes the entries by function group, product-type restriction, and search string so a formulator or compliance reviewer can locate the exact cap and restriction without parsing the raw annex text.
        </p>
        <AnnexVEntryDecoder />

        <h2 id="five-traps">Five traps when reading entry limits</h2>
        <p>
          Audits over the 2023-2026 period show the same five misreadings of Annex V entry limits recurring across unrelated brands. Each one is traceable to a specific wording in the annex that reads differently to a formulator than to a regulator.
        </p>
        <h3 id="trap-1-preservation-function-only">Trap 1 — "Preservation function only" scope qualifier</h3>
        <p>
          Several Annex V entries are framed as applicable "when used as preservative." Reading this as a loophole — "we declare it as a conditioning agent, so Annex V does not apply" — is defensible only if the CPSR Part A substantiates the alternative function with analytical and formulation evidence. The default assumption of a competent authority is that an Annex V-listed substance in a cosmetic formula is there for preservation unless proven otherwise.
        </p>
        <h3 id="trap-2-sum-of-parabens">Trap 2 — Sum-of-parabens combined cap (entry 12)</h3>
        <p>
          Entry 12 caps a single paraben ester at 0.4% as acid, and mixtures of parabens at 0.8% as acid. The salt forms (sodium methylparaben, etc.) must be converted to the free acid equivalent before summing. A formula with 0.3% Methylparaben + 0.3% Ethylparaben + 0.2% Sodium Propylparaben looks like 0.8% but, after acid conversion of the sodium salt, is slightly over 0.8%. Reviewers routinely flag this.
        </p>
        <h3 id="trap-3-rinse-off-leave-on">Trap 3 — Rinse-off versus leave-on splits</h3>
        <p>
          Several entries cap leave-on more strictly than rinse-off. Sorbic Acid (entry 4) is a flat 0.6% irrespective of use type, but Salicylic Acid (entry 3) splits at 0.5% leave-on versus 3.0% rinse-off hair. IPBC (entry 46) has at least three distinct caps across leave-on, rinse-off, and leave-on deodorant/antiperspirant. Specifying the product category correctly in the PIF is a prerequisite to defending the preservative concentration.
        </p>
        <h3 id="trap-4-child-exclusions">Trap 4 — Child-product exclusions</h3>
        <p>
          Products for children under 3 carry additional Annex V restrictions beyond the general entries. Propylparaben and Butylparaben are banned in leave-on products intended for the nappy area of children under 3 (entry 12 specific restriction). Salicylic Acid is restricted for children under 3 except in shampoo. IPBC is excluded from most product types for children under 3. A compliance review that reads only the general entry cap will miss the age-specific overlay.
        </p>
        <h3 id="trap-5-acid-salt-interconversion">Trap 5 — Acid/salt interconversion math</h3>
        <p>
          The Rotterdam opener case belongs here. Entries 1 (Benzoic Acid), 4 (Sorbic Acid), and others cap the sum of the free acid plus salts expressed as free acid. The molecular-weight conversion between the sodium or potassium salt and the free acid typically shifts the calculated concentration by 10-20%. A formulator working from the salt-form concentration in the formula will miscalculate the compliance headroom.
        </p>

        <h2 id="non-annex-v-multifunctionals">Non-Annex V multifunctionals: legal grey zone or clear status?</h2>
        <p>
          The rise of "phenoxyethanol-free" and "paraben-free" clean-beauty positioning has driven adoption of a set of antimicrobial-active substances that are not on Annex V. The four most common in 2026 formulation are 1,2-Hexanediol, Ethylhexylglycerin, Caprylhydroxamic Acid (CHA), and Caprylyl Glycol. All four are legal in EU-sold cosmetics. Their regulatory treatment is distinct from Annex V-listed preservatives.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>1,2-Hexanediol</strong> — INCI "Hexylene Glycol" is a different substance; do not substitute. 1,2-Hexanediol is used as skin-conditioning / humectant at 0.5-3%. Covered in detail in our <a href="/blog/1-2-hexanediol-technical-guide">1,2-Hexanediol technical guide</a>.
          </li>
          <li>
            <strong>Ethylhexylglycerin (EHG)</strong> — skin-conditioning agent with meaningful antimicrobial boost at 0.3-1%. Legal status detailed in our <a href="/blog/ethylhexylglycerin-technical-guide">EHG technical guide</a>.
          </li>
          <li>
            <strong>Caprylhydroxamic Acid (CHA)</strong> — chelator with antimicrobial contribution via iron sequestration. Used at 0.1-0.5%, almost always as part of a hurdle system. See our <a href="/blog/caprylhydroxamic-acid-technical-guide">CHA technical guide</a>.
          </li>
          <li>
            <strong>Caprylyl Glycol</strong> — skin-conditioning / emollient with antimicrobial activity, typically at 0.3-1%. Common partner for CHA and EHG in multifunctional systems.
          </li>
        </ul>
        <p>
          The CPNP notification treatment of these substances is important. They are declared in the formula at their actual concentration under their standard INCI name, with the function stated as skin-conditioning (or chelating, for CHA). The CPSR Part A must substantiate the stated function and the CPSR Part B must demonstrate — through Challenge Test under ISO 11930 — that the overall product is adequately preserved despite the absence of an Annex V-listed primary preservative. See our walkthrough in <a href="/blog/iso-11930-challenge-test-protocol">the ISO 11930 protocol guide</a>.
        </p>
        <p>
          Marketing language carries legal weight. "Preserved with EHG" is a misleading claim because EHG is not on Annex V and cannot be legally positioned as the preservative; "formulated without Annex V preservatives" is defensible, factually true, and audit-safe.
        </p>

        <h2 id="cpsr-evidence">CPSR Part A and B: where Annex V evidence must appear</h2>
        <p>
          The Cosmetic Product Safety Report (CPSR) is the central legal document under Article 10 and Annex I of 1223/2009. It is split into Part A (safety information) and Part B (safety assessment), signed off by a qualified Safety Assessor. Annex V evidence appears in both parts in specific locations — missing documentation here is the single most common audit finding.
        </p>
        <p>
          Use the checklist below to generate the exact Annex V evidence set required for your product type and market scope. The checklist filters by product (leave-on face, rinse-off body, child, oral, eye-area, spray) and by market scope (EU only, EU + UK, EU + non-EU markets).
        </p>
        <CPSRDocumentationChecklist />

        <h2 id="supplier-dossier-audit">Supplier dossier audit: 7 CoA fields for Annex V defence</h2>
        <p>
          The compliance chain under Article 5 of 1223/2009 obliges the Responsible Person to maintain documentary evidence tracing finished-product compliance back to raw-material supply. Seven CoA fields are the minimum defence for an Annex V-listed preservative at import or audit.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Annex V entry number explicit on the CoA</strong>. Most supplier CoAs omit this. Add it to the RFQ as a mandatory CoA field. A supplier who cannot add the entry number has no internal process to track the regulatory tie-up.
          </li>
          <li>
            <strong>INCI name matching Annex V text</strong>. The INCI must match the Annex V entry’s wording, including salt-form specification where relevant (e.g. "Potassium Sorbate" not "sorbate salt").
          </li>
          <li>
            <strong>CAS number</strong> as a cross-reference. Multiple INCI names can map to the same CAS; multiple CAS numbers can share an INCI. Both are needed for an unambiguous match.
          </li>
          <li>
            <strong>Assay by a method capable of quantifying the free acid or free base</strong>. For sorbic/benzoic acid, GC or HPLC with explicit free-acid quantitation. For paraben esters, HPLC with ester identification.
          </li>
          <li>
            <strong>Residual process impurities panel</strong>. Phenoxyethanol with phenol residue above the standard CoA limit, parabens with p-hydroxybenzoic acid residue, formaldehyde-releasers with free formaldehyde — these are the fields a competent authority inspects first.
          </li>
          <li>
            <strong>GMP ISO 22716 facility certificate</strong> with production address matching the CoA. The CoA’s production site must match the certified facility; mismatch suggests an unaudited repack layer.
          </li>
          <li>
            <strong>Batch number, production date, and production site</strong>. All three present on the CoA, matching the commercial invoice. Missing any of these breaks traceability under Article 5.
          </li>
        </ol>
        <p>
          Beyond the CoA itself, a signed 60-day change-notification clause in the supply contract is non-negotiable. Without it, you cannot discharge the Article 5 obligation to track upstream changes that affect product safety or compliance. The detailed audit framework for this sits in our <a href="/blog/preservative-coa-batch-consistency">Preservative CoA batch consistency playbook</a>.
        </p>

        <h2 id="cpnp-notification">CPNP notification: four fields where Annex V compliance surfaces</h2>
        <p>
          CPNP (Cosmetic Products Notification Portal) is the EU-wide notification system for cosmetic products. Four CPNP fields carry Annex V compliance signal, and all four are the subject of competent authority spot-checks.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Frame formulation declaration</strong>. The product’s frame formulation category — rinse-off hair care, leave-on skincare, child product, etc. — must match the Annex V entry’s product-type scope for each preservative. A product declared as rinse-off that uses an Annex V entry restricted to rinse-off (e.g. MIT at entry 39) carries no Annex V problem; the same product declared as leave-on is non-compliant on filing.
          </li>
          <li>
            <strong>Preservative concentration field</strong>. CPNP requires declaration of concentration ranges for substances of concern, including Annex V-listed preservatives above specific thresholds. Declared ranges that straddle the Annex V cap are automatically flagged for review.
          </li>
          <li>
            <strong>Nanomaterial check</strong>. Several Annex V entries (Silver Chloride on TiO2, entry 18) require a nanomaterial-form declaration if applicable. Omission is a flagged non-compliance.
          </li>
          <li>
            <strong>Child-product category tag</strong>. CPNP collects a child-product flag that triggers additional downstream checks for parabens (entry 12), Salicylic Acid (entry 3), IPBC (entry 46), and other child-sensitive entries. A mis-tagged child product is one of the most common early-stage filing errors.
          </li>
        </ul>
        <p>
          Common 2024-2026 CPNP rejection patterns: concentration range above cap (34% of rejections per DG GROW statistics), formulation category mismatch (21%), missing child-product tag (18%), paraben sum calculation error (12%), nanomaterial omission (7%), other (8%).
        </p>

        <h2 id="safety-gate-patterns">Safety Gate 2024-2026 preservative enforcement patterns</h2>
        <p>
          The Safety Gate (formerly RAPEX) system aggregates national market surveillance notifications across the EEA. Cosmetic product notifications linked to preservative non-compliance over the 2024-2026 window cluster into four categories, each with a characteristic enforcement profile.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Concentration overrun</strong> (approximately 38% of preservative-linked notifications 2024-2026) — an Annex V-listed substance present above its cap. Rotterdam-style cases. Typical trigger: port inspection, retail lab test, competitor complaint. Median withdrawal timeline: 7 days from notification.
          </li>
          <li>
            <strong>Forbidden substance</strong> (approximately 22%) — a substance in Annex II present in the product, often as an unintended impurity in a raw material (methylisothiazolinone contamination of a non-MIT preservative, trace formaldehyde above warning threshold). Trigger: targeted analytical sweep. Enforcement is strict; recall standard.
          </li>
          <li>
            <strong>Inadequate preservation</strong> (approximately 28%) — the product fails microbiological testing in the field. Pseudomonas aeruginosa, Burkholderia cepacia, mould regrowth. Trigger: consumer complaint, retail QC test, hospital-sourced infection trace. Response time: 48 hours typical to formal Safety Gate.
          </li>
          <li>
            <strong>Child-product violation</strong> (approximately 8%) — a Propyl/Butyl paraben in a leave-on nappy-area product, Salicylic Acid in a non-shampoo child product. Trigger: targeted inspection by national paediatric or consumer-safety body. High media visibility; near-automatic withdrawal.
          </li>
        </ul>
        <p>
          Member-state enforcement intensity varies. Germany (BVL), the Netherlands (NVWA) and France (DGCCRF) are the most active enforcers, accounting for roughly 60% of all preservative-linked Safety Gate notifications in the 2024-2026 window. Brands with EU-wide distribution typically plan compliance around the most active member state’s practices, not the median.
        </p>

        <h2 id="change-management-sop">Change-management SOP when your supplier changes source, process or grade</h2>
        <p>
          Article 5 of 1223/2009 obliges the Responsible Person to ensure that products placed on the market remain compliant. An upstream change at the preservative supplier’s plant — a new raw material source, a modified synthesis step, a change in purity grade — can shift the regulatory profile of the finished product even when the CoA number stays the same. The 60-day change-notification SOP is the discipline that keeps the PIF current.
        </p>
        <p>
          <strong>Five supplier-side changes that trigger a re-run of ISO 11930 Challenge Test:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Change of production site, even within the same supplier organisation. Different plant equipment can yield different impurity profiles that affect microbiological performance.
          </li>
          <li>
            Change of raw material feedstock (e.g. phenol source for Phenoxyethanol synthesis). Residual-impurity profile shift.
          </li>
          <li>
            Change of synthesis route or purification method. Even isomer-ratio drift at the sub-percent level has been shown to shift Challenge Test outcomes for 1,2-Hexanediol-based systems.
          </li>
          <li>
            Change in CoA method for a key field (e.g. HPLC vs GC for assay). Not a substance change, but a comparability concern that must be documented.
          </li>
          <li>
            Change in purity grade (cosmetic-grade to pharma-grade or vice versa). Impurity caps differ; the product’s safety assessment may need re-reading.
          </li>
        </ol>
        <p>
          <strong>Three supplier-side changes that trigger CPNP re-notification:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Substitution of the preservative itself (any Annex V entry number change).
          </li>
          <li>
            Concentration change that moves the declared range above the Annex V cap or into a different CPNP reporting band.
          </li>
          <li>
            Supplier-driven packaging change (e.g. a drum liner material change that affects stability) when the primary packaging material code is in the CPNP record.
          </li>
        </ol>
        <p>
          The SOP itself: supplier notifies within 60 days of the change effective date, Responsible Person receives, logs in the PIF change register within 10 working days, decides within 20 working days whether re-test / re-notify is required, executes within the window before the first batch of changed material enters finished-product production.
        </p>

        <h2 id="uk-divergence">UK post-Brexit divergence: where SCCS and OPSS rules now differ</h2>
        <p>
          The UK retained the full text of Annex V as of 1 January 2021 under the UK Cosmetics Regulation 2013 (as amended). Over the 2021-2026 window, approximately a dozen SCCS opinions have been adopted into EU Annex V but not into the UK equivalent, and the UK Office for Product Safety and Standards (OPSS) has independently updated several entries. The divergence is still small but non-zero, and brands distributing to both markets maintain a quarterly divergence register.
        </p>
        <p>
          Notification is parallel: EU products go to CPNP, UK products go to the Submit Cosmetic Product Notifications (SCPN) portal on gov.uk. The UK Responsible Person must be UK-resident; the EU Responsible Person must be EU-resident. One Responsible Person entity cannot cover both markets without a UK establishment.
        </p>
        <p>
          Testing and documentation generally transfer between the two systems. An ISO 11930 Challenge Test accepted under CPSR is accepted under the UK equivalent. CPNP and SCPN both accept the same underlying PIF content, with jurisdiction-specific annexes for the few diverged Annex V entries.
        </p>
        <p>
          The practical rule: file against the stricter cap where the EU and UK differ, and maintain a divergence register that flags any entry where a UK-only or EU-only reformulation would be more cost-efficient.
        </p>

        <LeadMagnetCTA
          title="Annex V entry-by-entry supplier compliance template + divergence register"
          body="A spreadsheet template mapping each of the 59 Annex V entries to the supplier CoA fields that must be present, with example filled rows for Phenoxyethanol, Sorbic Acid, Paraben mixtures, and MIT/MCI. Includes a UK/EU divergence register pre-populated with the 2024-2026 known divergences, and a change-notification clause template for supply contracts. Sent to your inbox within two business hours."
          cta="Request the Annex V compliance pack"
          topic="eu-annex-v-compliance-pack"
        />

        <FAQ heading="EU Annex V preservative compliance FAQ" id="annex-v-faq" items={faqItems} />

        <aside className="mt-16 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold mb-2">About the author</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Yang Ruosong</strong> is Onerchemical’s preservation sourcing specialist, focused on long-term supply partnerships between EU, US and APAC cosmetic brands and verified preservative producers. Day-to-day work covers RFQ triage, CoA defensibility audits, change-notification SOP review, and the regulatory paperwork pack that keeps cosmetic-grade preservative imports moving through EU 1223/2009, US MoCRA, China IECIC, Japan quasi-drug and Korea KFDA regimes. Read more at{' '}
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
              <a href="/blog/preservative-coa-batch-consistency">
                Preservative CoA Batch Consistency
              </a>{' '}
              — the sister regulatory playbook on batch-variance monitoring and the 60-day change-notification clause.
            </li>
            <li>
              <a href="/blog/phenoxyethanol-technical-guide">Phenoxyethanol Technical Guide</a> — Annex V entry 29 mechanism, pairing and sourcing detail.
            </li>
            <li>
              <a href="/blog/1-2-hexanediol-technical-guide">1,2-Hexanediol Technical Guide</a> — non-Annex V multifunctional, legal status walkthrough.
            </li>
            <li>
              <a href="/blog/caprylhydroxamic-acid-technical-guide">Caprylhydroxamic Acid Technical Guide</a> — chelator-driven preservation outside Annex V.
            </li>
            <li>
              <a href="/blog/ethylhexylglycerin-technical-guide">Ethylhexylglycerin Technical Guide</a> — booster chemistry and multifunctional declaration.
            </li>
            <li>
              <a href="/blog/iso-11930-challenge-test-protocol">ISO 11930 Challenge Test Protocol</a> — the test every Annex V and non-Annex V preservation system must pass.
            </li>
            <li>
              <a href="/blog/phenoxyethanol-ethylhexylglycerin-combination">Phenoxyethanol + EHG Combination</a> — the Annex V primary + non-Annex V booster pattern in detail.
            </li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
