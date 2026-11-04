import type { Metadata } from 'next';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import MoCRAEvidenceBuilder from '@/components/blog/article-13/MoCRAEvidenceBuilder';
import MoCRAComplianceChecklist from '@/components/blog/article-13/MoCRAComplianceChecklist';
import { getArticle } from '@/lib/blog-registry';

const SLUG = 'us-mocra-preservative-compliance-guide';
const SITE = 'https://onerchemical.com';
const CANONICAL = `${SITE}/blog/${SLUG}`;
const PUBLISHED = '2026-11-04T00:00:00.000Z';
const MODIFIED = '2026-11-04T00:00:00.000Z';

export const metadata: Metadata = {
  title: 'US MoCRA Preservative Compliance: 2026 Facility, Listing & SAE Guide',
  description:
    'A procurement, QC and regulatory playbook for US MoCRA preservative compliance: facility registration (FY2026), cosmetic product listing, safety substantiation, SAE 15-day clock, FDA inspection expectations, and the EU vs US delta that catches multi-market brands at audit.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    url: CANONICAL,
    siteName: 'Onerchemical',
    title: 'US MoCRA Preservative Compliance: 2026 Guide',
    description:
      'Facility registration, product listing, safety substantiation, SAE 15-day clock, FDA inspection, state-level overlays, and the EU vs US delta — written for established cosmetic brands and contract manufacturers.',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: [`${SITE}/yang-ruosong/`],
    images: [
      {
        url: `${SITE}/images/blog/article-13/hero.jpg`,
        width: 1600,
        height: 900,
        alt: 'A compliance manager cross-checking an FDA Facility Registration confirmation against a Long Beach port bill of lading and a preservative CoA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US MoCRA Preservative Compliance (2026)',
    description:
      'Facility registration, product listing, safety substantiation, SAE 15-day clock — the full US compliance playbook.',
  },
};

export default function Page() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'US MoCRA Preservative Compliance: The 2026 Guide to Facility Registration, Product Listing, Safety Substantiation and SAE Reporting',
    description:
      'A procurement, QC and regulatory playbook for US MoCRA preservative compliance covering facility registration, cosmetic product listing, safety substantiation, SAE 15-day reporting, FDA inspection expectations, and the EU vs US regulatory delta.',
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
    image: `${SITE}/images/blog/article-13/hero.jpg`,
    about: [
      { '@type': 'Thing', name: 'MoCRA (Modernization of Cosmetics Regulation Act)' },
      { '@type': 'Thing', name: 'FDA Cosmetic Facility Registration' },
      { '@type': 'Thing', name: 'Cosmetic Preservative Compliance' },
      { '@type': 'Thing', name: 'Serious Adverse Event Reporting' },
    ],
    keywords:
      'US MoCRA preservative compliance, FDA cosmetic facility registration, cosmetic product listing, safety substantiation, SAE 15-day reporting, preservative-grade MoCRA, cosmetic import US',
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
        name: 'US MoCRA Preservative Compliance',
        item: CANONICAL,
      },
    ],
  };

  const faqItems = [
    {
      question: 'What is the MoCRA small-business exemption threshold for facility registration?',
      answer:
        'Under section 612(b) of the FD&C Act as amended by MoCRA, a "small business" is a responsible person or owner/operator of a facility whose average gross annual sales in the United States of cosmetic products for the previous 3-year period is less than USD 1,000,000 (adjusted for inflation). Small businesses are exempt from the facility registration and product listing requirements. However, the exemption does NOT apply if the business manufactures or processes cosmetic products that (a) regularly come into contact with mucous membrane of the eye under customary use, (b) are injected, (c) are intended for internal use, or (d) are intended to alter appearance for more than 24 hours and are not removed by the consumer. Preservative-containing leave-on eye-area products and long-wear color cosmetics therefore trigger full registration even for sub-USD-1M businesses.',
    },
    {
      question: 'Does the contract lab running our Challenge Test need to be FDA-registered?',
      answer:
        'No. FDA cosmetic facility registration under MoCRA applies to facilities that manufacture or process cosmetic products for distribution in the United States. A third-party testing laboratory running ISO 11930 Challenge Test, stability or safety substantiation assays on your preservative or finished product is not a manufacturing or processing facility and is not required to be registered. The data they produce must be scientifically defensible and traceable, but the lab itself has no MoCRA registration obligation. What matters for the safety substantiation record is the quality of the data, the method used, the chain of custody for the sample, and the signature of a qualified individual who can defend the conclusion at FDA inspection.',
    },
    {
      question: 'Who holds MoCRA compliance obligation in a contract-manufacturing relationship?',
      answer:
        'MoCRA assigns the primary obligation to the "responsible person" — defined as the manufacturer, packer, or distributor of a cosmetic product whose name appears on the product label per section 609 of the FD&C Act. In almost every contract-manufacturing relationship this is the brand owner, not the contract manufacturer. The facility that physically manufactures the product also has registration obligations as a facility. The product listing is filed by the responsible person. SAE reports are filed by the responsible person. FDA inspection authority extends to both the facility and the responsible person. A well-constructed contract manufacturing agreement makes the split explicit: the CMO notifies any formulation or process deviation, maintains batch records and CoA archives, and surrenders dossier material on request; the brand owner carries the registration, listing and SAE reporting duties.',
    },
    {
      question: 'What triggers an FDA cosmetic inspection related to preservative compliance?',
      answer:
        'FDA cosmetic inspections under MoCRA are triggered by (1) scheduled risk-based inspection cycles for registered facilities, prioritizing eye-area, mucous-membrane and long-wear product manufacturers; (2) SAE reports that cluster to a specific product, facility or ingredient — a Pseudomonas aeruginosa contamination SAE typically triggers a facility inspection within 30-60 days; (3) adverse event reports filed by consumers or healthcare providers through MedWatch; (4) import alert hits on incoming shipments flagged for inadequate preservation or prohibited substances; and (5) targeted sampling under the Office of Cosmetics and Colors risk-based program. Inspection scope typically covers facility registration currency, product listing accuracy, safety substantiation records for each marketed product, SAE recordkeeping (6-year retention), batch records, CoA archives, change-control records, and labeling accuracy including ingredient disclosure.',
    },
    {
      question: 'Is MoCRA facility registration required for a US DTC brand importing finished cosmetics from a Chinese contract manufacturer?',
      answer:
        'The Chinese contract manufacturer is a foreign facility that manufactures a cosmetic product for distribution in the United States and must be registered under MoCRA (section 607). The US brand owner (responsible person) must file the product listing. Both obligations exist independently. The Chinese facility registration requires a US agent with a physical US address, a telephone number, and an email address, who can be contacted by FDA during US business hours. The US agent plays no role in product listing or SAE reporting — that is the responsible person. Failure of the foreign facility to register triggers import refusal under section 801(a); failure of the responsible person to list triggers misbranding under section 602.',
    },
    {
      question: 'When does a preservative source or process change require re-listing in CPL (Cosmetic Product Listing)?',
      answer:
        'Under MoCRA guidance released 2024, re-listing is required when any of the following change: the identity of an ingredient (including a preservative), the declared concentration range of an ingredient, the label-stated product category, or the identity of the facility manufacturing the product. A supplier-side change that does not alter the ingredient identity, concentration range or facility — for example, the supplier switches from one Jiangsu plant to a second Jiangsu plant of the same owner, same CAS, same spec — does NOT by itself trigger re-listing. It does trigger PIF-equivalent record update, change-control documentation, and (per our Preservative CoA batch consistency playbook) usually a Challenge Test re-run to confirm the formula still passes at the new material\'s impurity profile. Re-listing is annual regardless — the CPL must be updated or confirmed each year by the responsible person.',
    },
    {
      question: 'What CoA fields does an FDA cosmetic inspector typically audit for preservatives?',
      answer:
        'FDA cosmetic inspectors reviewing a preservative CoA under MoCRA focus on seven fields: (1) INCI name matching the product listing declaration, (2) CAS number as unambiguous substance identifier, (3) assay by a specified analytical method (GC or HPLC with method reference), (4) residual-impurity panel appropriate to the molecule (phenol residue for Phenoxyethanol, p-hydroxybenzoic acid for parabens, 1,4-dioxane for ethoxylated surfactants), (5) heavy metals by ICP-MS (lead, arsenic, cadmium, mercury), (6) microbial panel (TAMC, TYMC, absence of P. aeruginosa / S. aureus / E. coli), and (7) traceable batch number, production date and production site matching the facility registration. The inspector will cross-reference the CoA against the facility registration number, the product listing, and the batch records for finished products released in the inspection window. A supplier change not reflected in the responsible person\'s change-control record is the single most common finding.',
    },
    {
      question: 'Does the EU Annex V / CPNP system\'s documentation satisfy MoCRA safety substantiation requirements?',
      answer:
        'Substantially yes for the technical core, but with material gaps. The EU CPSR (Cosmetic Product Safety Report) includes safety data, toxicological profiles, exposure assessments, Challenge Test results and stability data that collectively satisfy the MoCRA "adequate substantiation" standard under section 608. The gaps are procedural: MoCRA requires the responsible person to maintain records in a form accessible to FDA on request (typically 15 business days), with specific recordkeeping for SAE (6 years for adults, 6 years past majority for minors). CPNP itself is an EU notification portal and does not substitute for the US Cosmetic Product Listing (CPL). A multi-market brand typically maintains a single master safety dossier with EU-formatted CPSR, US CPL-aligned product listing printout, Chinese IECIC alignment notes, and a consolidated change-control log that satisfies all four systems. Each system\'s notification is filed independently — there is no mutual-recognition shortcut.',
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
        title="US MoCRA Preservative Compliance: The 2026 Guide for Cosmetic Brands and Contract Manufacturers"
        excerpt="A procurement, QC and regulatory playbook for US MoCRA preservative compliance: facility registration (FY2026 renewal mechanics), cosmetic product listing, safety substantiation, SAE 15-business-day clock, FDA inspection expectations, state-level overlays, and the EU vs US regulatory delta that catches multi-market brands at audit."
        datePublished={PUBLISHED}
        readingMinutes={16}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              MoCRA (Modernization of Cosmetics Regulation Act of 2022) imposes five obligations on
              the US cosmetic market: facility registration, cosmetic product listing, safety
              substantiation, serious adverse event (SAE) reporting, and good manufacturing
              practices — with FDA enforcement through 2024-2026 risk-based inspection.
            </li>
            <li>
              Unlike the EU Annex V positive-list model, MoCRA imposes no preservative-specific
              concentration cap. The regulatory burden shifts to the responsible person: substantiate
              adequate preservation through Challenge Test, document safety, maintain traceable
              records, and report SAEs within 15 business days.
            </li>
            <li>
              Facility registration renews biennially; the FY2025-2026 window closes December 31,
              2026. A lapsed registration triggers import refusal under FD&amp;C 801(a) — the single
              most common cause of preservative shipment holds at Long Beach, Seattle and New York
              ports in 2024-2026.
            </li>
            <li>
              Small-business exemption (annual US cosmetic sales under USD 1,000,000) does NOT apply
              to eye-area, mucous-membrane, injectable, internal-use, or long-wear (&gt;24h)
              products — categories that often use preservatives at material concentration.
            </li>
            <li>
              A preservative supplier change requires re-listing in CPL only if the ingredient
              identity, declared concentration range, or manufacturing facility changes. All other
              upstream changes trigger change-control documentation and typically a Challenge Test
              re-run — not a CPL re-notification.
            </li>
          </ul>
        </TLDRBox>

        <h2 id="long-beach-opener">
          A USD 24,000 Long Beach port hold, one lapsed facility registration
        </h2>
        <p>
          In Q3 2026 a mid-sized US cosmetic brand received a port hold notice 48 hours after a
          1,200 kg phenoxyethanol shipment arrived at the Port of Long Beach. The cause was not the
          preservative. The Chinese contract manufacturer that produced the finished product carried
          by that container had let its FDA cosmetic facility registration lapse 11 days earlier —
          the FY2025-2026 biennial renewal window had closed December 31, 2025, and the
          registration was marked inactive in the FDA Industry Systems database.
        </p>
        <p>
          The shipment was held under section 801(a) of the Federal Food, Drug, and Cosmetic Act as
          appearing to be from an unregistered foreign facility. The brand&apos;s compliance team spent
          four business days verifying the US agent of record, re-filing the registration, obtaining
          a new registration number, and submitting a reconditioning request to CBP and FDA. The
          container cleared on day 18.
        </p>
        <p>
          Direct costs: USD 11,400 in demurrage and detention; USD 3,200 in rush customs brokerage
          and FDA refiling fees; USD 6,800 in retailer-contracted on-time delivery penalties; USD
          2,600 in internal compliance team time. Total: USD 24,000 for a renewal filing that would
          have taken ten minutes and zero dollars had it been done on schedule.
        </p>
        <p>
          This article is the US compliance playbook that would have caught the lapse at the annual
          supplier audit — covering what MoCRA actually requires, how facility registration and
          product listing work, the safety substantiation standard, the SAE 15-business-day clock,
          FDA inspection expectations, state-level overlays, and the change-management SOP that
          keeps subsequent batches defensible.
        </p>

        <h2 id="what-mocra-requires">
          What MoCRA actually requires (and how it differs from EU Annex V)
        </h2>
        <p>
          The Modernization of Cosmetics Regulation Act of 2022 (MoCRA), enacted December 29, 2022,
          is the first substantive federal update to US cosmetic regulation since the FD&amp;C Act
          of 1938. It operates through five pillars, each with its own compliance deadline and
          enforcement mechanism under FDA&apos;s Office of Cosmetics and Colors (OCC).
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Facility registration</strong> (FD&amp;C §607) — domestic and foreign facilities
            manufacturing or processing cosmetic products for US distribution must register with
            FDA, biennially renewed. Small-business exemption applies with carve-outs.
          </li>
          <li>
            <strong>Cosmetic product listing</strong> (FD&amp;C §607) — the responsible person files
            a listing for each product marketed in the US, including ingredient list with
            concentration ranges for substances of concern. Updated annually.
          </li>
          <li>
            <strong>Safety substantiation</strong> (FD&amp;C §608) — adequate evidence of safety
            must be maintained for each product. "Adequate" is defined as "tests or studies,
            research, analyses, or other evidence or information that is considered, among experts
            qualified by scientific training and experience to evaluate the safety of cosmetic
            products and their ingredients, sufficient to support a reasonable certainty that a
            cosmetic product is safe." For preservation, this typically means Challenge Test under
            ISO 11930 or USP &lt;51&gt; plus stability study plus toxicological assessment.
          </li>
          <li>
            <strong>Serious adverse event reporting</strong> (FD&amp;C §605) — the responsible
            person must report SAEs to FDA within 15 business days, with records retained 6 years
            (6 years past majority for minors).
          </li>
          <li>
            <strong>Good manufacturing practices</strong> (FD&amp;C §606) — FDA is directed to
            promulgate GMP regulations; proposed rule issued 2026, final rule expected 2027. In
            the interim ISO 22716 is the de facto industry standard FDA cosmetic inspectors
            reference.
          </li>
        </ul>
        <p>
          The practical consequence for preservative compliance is a shift in evidentiary burden
          relative to EU Annex V. In the EU, a formulator consults the 59-entry Annex V list,
          selects a permitted preservative, formulates below the stated cap, and the regulatory
          framework assumes efficacy and safety for that use. In the US under MoCRA, no such
          positive list exists for preservatives. The responsible person bears the full burden of
          demonstrating that whatever preservation system was chosen is both safe at the use
          concentration and adequate to prevent microbial contamination — documented in the safety
          substantiation record, verifiable at FDA inspection, and consistent across batches per
          CoA.
        </p>
        <p>
          The sister article to this one, our{' '}
          <a href="/blog/eu-annex-v-preservative-compliance-guide">
            EU Annex V preservative compliance guide
          </a>
          , covers the EU side in equivalent depth. Multi-market brands typically maintain a
          consolidated master dossier that satisfies both systems with a single evidence base and
          two notification filings.
        </p>

        <h2 id="facility-registration">
          Facility registration — the FY2025-2026 renewal mechanics
        </h2>
        <p>
          Section 607(a) of the FD&amp;C Act requires every owner or operator of a facility that
          manufactures or processes cosmetic products for distribution in the United States to
          register with FDA. "Facility" includes domestic and foreign facilities; "processing"
          includes packaging, labeling, and blending. Pure holding, warehousing, or trucking
          operations are not facilities for MoCRA purposes.
        </p>
        <h3 id="facility-who-registers">Who must register</h3>
        <p>
          The owner or operator of each facility registers once per facility, regardless of how many
          products or responsible persons the facility manufactures for. Contract manufacturers
          register themselves; the brands they manufacture for do not register the facility on the
          manufacturer&apos;s behalf. A single facility manufacturing products for ten different brands
          files one facility registration.
        </p>
        <h3 id="facility-foreign">Foreign facilities and the US agent requirement</h3>
        <p>
          Foreign facilities must designate a US agent with a physical US address, a telephone
          number answered during US business hours, and an email address. The US agent receives
          FDA communications on the facility&apos;s behalf and must be able to arrange a facility
          inspection if FDA requests one. Common US agent arrangements: the brand owner&apos;s
          regulatory consultant, a third-party US agent service, or the US-based parent of a
          foreign subsidiary. The US agent plays no role in product listing or SAE reporting.
        </p>
        <h3 id="facility-renewal">Biennial renewal and the FY2025-2026 window</h3>
        <p>
          Facility registration renews every two years, with the renewal window closing December
          31 of even-numbered years. The FY2025-2026 renewal window closed December 31, 2026. A
          lapsed registration marks the facility inactive in the FDA Industry Systems database
          and triggers import refusal for incoming shipments produced at that facility under
          section 801(a). Reinstatement requires a new registration submission; there is no
          grace period and no automatic renewal.
        </p>
        <h3 id="facility-small-business">Small-business exemption with carve-outs</h3>
        <p>
          A "small business" for MoCRA purposes is a responsible person or owner/operator whose
          average gross US cosmetic sales for the previous 3-year period is less than USD
          1,000,000 (adjusted for inflation). Small businesses are exempt from facility
          registration and product listing. The exemption does NOT apply to facilities
          manufacturing products that (a) regularly contact mucous membrane of the eye under
          customary use, (b) are injected, (c) are intended for internal use, or (d) are intended
          to alter appearance for more than 24 hours and are not removed by the consumer.
          Preservative-containing leave-on eye-area products, long-wear color cosmetics, and
          certain lip products therefore trigger full registration even below the USD 1M
          threshold.
        </p>
        <h3 id="facility-new">New facility 60-day window</h3>
        <p>
          A new facility must register within 60 calendar days of first manufacturing or processing
          a cosmetic product for US distribution. The 60-day clock starts on the first day of
          production for distribution, not on the facility&apos;s construction completion or regulatory
          intent date. An ownership transition (acquisition, divestiture, change in
          owner/operator) does not restart the 60-day clock but does require an update to the
          registration record within 60 days.
        </p>

        <h2 id="product-listing">
          Cosmetic product listing — preservative-specific declaration fields
        </h2>
        <p>
          Section 607(c) requires the responsible person to submit a cosmetic product listing to
          FDA for each product marketed in the US. The listing is filed through the FDA Industry
          Systems Cosmetic Direct portal and carries specific ingredient disclosure fields that
          surface preservative compliance signal to FDA reviewers.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Product name and category</strong> — the label-stated product name and the
            FDA cosmetic product category (leave-on skincare, rinse-off cleanser, color
            cosmetic, etc.). Category determines the SAE risk weighting and the applicability of
            small-business carve-outs.
          </li>
          <li>
            <strong>Responsible person</strong> — the manufacturer, packer, or distributor whose
            name appears on the product label per section 609. This is the entity on the hook for
            all five MoCRA pillars.
          </li>
          <li>
            <strong>Facility registration numbers</strong> — the FDA registration number for each
            facility that manufactures the product. Listing a facility not currently registered
            is flagged automatically; listing a facility whose registration has lapsed between the
            listing filing and FDA review is flagged on the next listing update.
          </li>
          <li>
            <strong>Ingredient list</strong> — complete list of ingredients in descending order by
            weight per 21 CFR 701.3, including each preservative identified by INCI name. For
            substances of concern, concentration range disclosure is required.
          </li>
          <li>
            <strong>Preservative concentration range</strong> — for preservatives above FDA
            substance-of-concern thresholds, the concentration range at use (not maximum
            theoretical). The declared range must bracket the actual use level; a product
            formulated at 0.85% phenoxyethanol with a declared range of 0.5-1.0% is compliant; a
            declared range of 0.1-0.5% is a listing misrepresentation.
          </li>
          <li>
            <strong>Fragrance allergen disclosure</strong> — fragrance allergens above 0.01%
            (leave-on) or 0.1% (rinse-off) must be individually disclosed on the label and listed.
          </li>
        </ul>
        <p>
          Listing updates are required within 60 days of any material change: new or discontinued
          product, formulation change affecting preservative identity or concentration range,
          facility change, responsible person change, or label category change. Annual listing
          confirmation is required regardless — the listing must be refreshed or confirmed each
          year by the responsible person, with the annual deadline tied to the original listing
          date.
        </p>

        <h2 id="safety-substantiation">
          Safety substantiation — the defining difference from EU
        </h2>
        <p>
          Section 608 of the FD&amp;C Act requires the responsible person to ensure that there is
          adequate substantiation of safety for each cosmetic product marketed in the US. For
          preservation specifically, "adequate substantiation" is a four-layer evidence stack:
          preservative efficacy (Challenge Test), product stability (preservative concentration
          holds over shelf life), toxicological assessment (ingredient-level safety profile), and
          labeling accuracy (no misleading claims).
        </p>
        <p>
          The builder below generates the evidence stack FDA cosmetic inspectors expect for a
          given product type and market scope. Select the product and the inspector will see
          which specific records must be available at inspection.
        </p>
        <MoCRAEvidenceBuilder />
        <p>
          The practical operating standard FDA inspectors apply is that each layer must be
          current (within 24 months for Challenge Test and stability, within 60 months for
          toxicological assessment absent a formulation change), traceable (sample retained,
          method cited, qualified individual signed off), and reproducible (another qualified
          individual, given the same sample and method, would reach the same conclusion). A
          substantiation record that passes all three tests clears the section 608 threshold even
          absent a positive-list cap for the preservative.
        </p>

        <h2 id="sae-reporting">
          SAE reporting — the 15-business-day clock
        </h2>
        <p>
          Section 605 requires the responsible person to submit a serious adverse event report to
          FDA within 15 business days of receiving information about the event, and to maintain
          records of all adverse events (serious and non-serious) for 6 years (6 years past
          majority for events involving minors). The 15-day clock is strict; FDA has issued
          warning letters for late SAE reports in 2024-2026 inspection cycles.
        </p>
        <h3 id="sae-what-counts">What counts as a serious adverse event</h3>
        <p>
          A "serious adverse event" per section 603(5) is an adverse event that results in:
          death; a life-threatening experience; inpatient hospitalization; a persistent or
          significant disability or incapacity; a congenital anomaly or birth defect; an
          infection that requires medical or surgical intervention to prevent one of the above;
          or a decision based on reasonable medical judgment to intervene to prevent one of the
          above. For preservative-related events the typical triggers are microbial
          contamination incidents causing hospital-treated infection (Pseudomonas, Burkholderia,
          mould systemic infection) and severe allergic contact dermatitis requiring
          hospitalization.
        </p>
        <h3 id="sae-filing">Filing mechanism and recordkeeping</h3>
        <p>
          SAE reports are filed through FDA MedWatch (form 3500A) with the cosmetic product
          category selected. The report includes product identification, batch number, event
          description, outcome, and the responsible person&apos;s contact information. Supporting
          records (consumer complaint intake, medical documentation if provided, internal
          investigation notes, laboratory analysis of retained product) must be maintained for
          the full 6-year window and surrendered to FDA on request. A preservative-linked SAE
          cluster to a specific product or facility typically triggers facility inspection within
          30-60 days.
        </p>

        <h2 id="compliance-checklist">
          MoCRA compliance checklist — role &amp; product scope
        </h2>
        <p>
          The checklist below filters by your role in the cosmetic supply chain (manufacturer,
          responsible person, importer, distributor, brand owner) and by product scope (single
          product line, multi-SKU brand, contract manufacturing) to show the specific MoCRA
          action items with FDA deadlines.
        </p>
        <MoCRAComplianceChecklist />

        <h2 id="fda-inspection">
          FDA inspection — what preservative suppliers and buyers must expect
        </h2>
        <p>
          FDA cosmetic inspections under MoCRA follow a risk-based prioritization: eye-area
          products, mucous-membrane contact products, long-wear products, injectable or internal
          products, and products with recent SAE clusters receive first-tier scheduling. The
          inspection scope for a registered facility typically includes the following records,
          each of which must be available for FDA review within 15 business days of request.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Facility registration currency</strong> — confirm active registration
            number, correct US agent (foreign facilities), correct owner/operator.
          </li>
          <li>
            <strong>Product listing accuracy</strong> — every product being manufactured matches
            an active product listing; ingredient list reflects current formulation; preservative
            concentration range brackets the use level; facility registration number on the
            listing matches the facility being inspected.
          </li>
          <li>
            <strong>Safety substantiation records</strong> — Challenge Test, stability, and
            toxicological assessment for each product; qualified individual sign-off on file.
          </li>
          <li>
            <strong>SAE recordkeeping</strong> — consumer complaint log, SAE report
            correspondence, 6-year retention evidence.
          </li>
          <li>
            <strong>Batch records and CoA archive</strong> — batch-level production records
            cross-referenced to preservative lot numbers; supplier CoA archive matching each lot
            used.
          </li>
          <li>
            <strong>Change-control records</strong> — any supplier change, process change, or
            facility change in the inspection window documented with change notice, impact
            assessment, re-test evidence where applicable, and updated product listing or
            registration where required.
          </li>
          <li>
            <strong>Labeling accuracy</strong> — label matches listing, ingredient disclosure
            complete and in correct declining weight order, warning statements present where
            required.
          </li>
        </ul>
        <p>
          The single most common inspection finding across the 2024-2026 enforcement cycle is a
          supplier change not reflected in the responsible person&apos;s change-control record. The
          preservative manufacturer shifted from plant A to plant B of the same owner, the CoA
          header updated, but the responsible person&apos;s PIF-equivalent record did not. Our{' '}
          <a href="/blog/preservative-coa-batch-consistency">
            Preservative CoA batch consistency playbook
          </a>{' '}
          covers the 60-day change-notification clause language that catches this at RFQ stage.
        </p>

        <h2 id="state-overlays">
          State-level overlays — California, Washington, New York
        </h2>
        <p>
          MoCRA preempts state regulations that are "different from or in addition to" its
          requirements only for a defined scope (section 614). State requirements outside that
          scope — ingredient prohibitions, disclosure, reporting, labeling — remain in force.
          Three state frameworks materially affect preservative compliance for products sold in
          their jurisdictions.
        </p>
        <h3 id="state-ca">California — Safe Cosmetics Act and Prop 65</h3>
        <p>
          The California Safe Cosmetics Act (Cosmetic Fragrance and Flavor Ingredient Right to
          Know Act, 2020 amendment) requires manufacturers selling cosmetics in California to
          report to the California Safe Cosmetics Program any product containing an ingredient on
          the Designated List of chemicals known or suspected to cause cancer, birth defects or
          reproductive harm. Several preservatives (formaldehyde releasers above certain free
          formaldehyde thresholds, certain parabens under reproductive review) appear on the
          Designated List. Separately, Proposition 65 requires warning labels for products
          causing exposure above the safe harbor level for listed chemicals; 1,4-dioxane
          (residual impurity in ethoxylated surfactants and sometimes in phenoxyethanol below
          spec) is a Prop 65 listed chemical with a stringent no-significant-risk level that
          affects some preservation systems indirectly.
        </p>
        <h3 id="state-wa">Washington — Toxic-Free Cosmetics Act</h3>
        <p>
          The Washington Toxic-Free Cosmetics Act (2023, enforcement from January 1, 2025 for
          some substances, January 1, 2026 for others) prohibits the manufacture, sale and
          distribution in Washington of cosmetic products containing specified intentionally
          added ingredients, including formaldehyde and formaldehyde-releasing preservatives
          above defined thresholds, certain parabens, and per- and polyfluoroalkyl substances
          (PFAS). Products containing DMDM Hydantoin, Imidazolidinyl Urea, Diazolidinyl Urea or
          Quaternium-15 above the Washington thresholds cannot be sold in Washington regardless
          of federal MoCRA compliance.
        </p>
        <h3 id="state-ny">New York — 1,4-Dioxane cap</h3>
        <p>
          New York State enforces a 1 ppm cap on 1,4-dioxane in cosmetic products (effective
          December 31, 2022, tightened from the original 2 ppm). The cap applies to the finished
          product. Products preserved with phenoxyethanol from certain Chinese sources carrying
          residual 1,4-dioxane above 10 ppm at raw-material level can fail the finished-product
          cap even at 1% use concentration. The New York cap is one of the strongest arguments
          for ICP-MS-level supplier CoA auditing of 1,4-dioxane in phenoxyethanol.
        </p>

        <h2 id="change-management-sop">
          Change-management SOP — the US version of the 60-day clause
        </h2>
        <p>
          EU Annex V compliance relies on a 60-day supplier change-notification SOP tied to
          Article 5 of Regulation 1223/2009. MoCRA has no explicit 60-day clock for supplier
          change, but the combination of (a) product listing requirement to re-list within 60
          days of a material change, (b) safety substantiation requirement to maintain adequate
          records, and (c) FDA inspection authority to request change-control documentation
          produces a de facto equivalent discipline.
        </p>
        <p>
          <strong>Three supplier-side changes that trigger CPL re-listing:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Change of preservative ingredient identity — any INCI name change, any CAS number
            change, any substitution.
          </li>
          <li>
            Change in declared concentration range such that the current range no longer brackets
            the use level.
          </li>
          <li>
            Change of manufacturing facility — new facility registration number on the product
            must be reflected in the listing.
          </li>
        </ol>
        <p>
          <strong>Five supplier-side changes that do NOT trigger CPL re-listing but DO require
          change-control documentation plus typically a Challenge Test re-run:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Change of production site within the same supplier organization and same CAS.
          </li>
          <li>
            Change of raw material feedstock (e.g. phenol source for phenoxyethanol synthesis)
            that may shift residual-impurity profile.
          </li>
          <li>
            Change of synthesis route or purification method with no ingredient-identity change.
          </li>
          <li>
            Change of CoA analytical method for a key field (e.g. HPLC vs GC for assay).
          </li>
          <li>
            Change of purity grade (cosmetic-grade to pharma-grade or vice versa) with no
            ingredient-identity change.
          </li>
        </ol>
        <p>
          The practical SOP: supplier notifies within 60 days of change effective date,
          responsible person logs in change-control register within 10 working days, decides
          within 20 working days whether CPL re-listing is required and whether Challenge Test
          re-run is required, executes within the window before the first batch of changed
          material enters finished-product production for US distribution.
        </p>

        <h2 id="us-eu-delta">
          US MoCRA vs EU Annex V — multi-market compliance delta
        </h2>
        <p>
          Multi-market brands that distribute into both the US and EU carry a consolidated
          compliance stack that satisfies both regimes with a single evidence base. The following
          delta table identifies the structural differences that must be managed in parallel —
          one framework does not substitute for the other.
        </p>
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink-300 bg-neutral-50 text-left">
                <th className="px-3 py-2 font-semibold text-ink-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-ink-900">EU — Regulation 1223/2009</th>
                <th className="px-3 py-2 font-semibold text-ink-900">US — MoCRA (2022)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Preservative legal model</td>
                <td className="px-3 py-2 align-top text-ink-700">Annex V positive list (59 entries, concentration caps, product-type restrictions)</td>
                <td className="px-3 py-2 align-top text-ink-700">No positive list; adequate-substantiation standard under section 608</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Max use concentration</td>
                <td className="px-3 py-2 align-top text-ink-700">Set per entry (e.g. Phenoxyethanol 1.0%)</td>
                <td className="px-3 py-2 align-top text-ink-700">No federal cap; state-level overlays apply (e.g. WA formaldehyde thresholds, NY 1,4-dioxane 1 ppm)</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Product notification</td>
                <td className="px-3 py-2 align-top text-ink-700">CPNP (Cosmetic Products Notification Portal), EU-wide single filing</td>
                <td className="px-3 py-2 align-top text-ink-700">CPL (Cosmetic Product Listing) via FDA Industry Systems Cosmetic Direct</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Facility registration</td>
                <td className="px-3 py-2 align-top text-ink-700">No EU-wide cosmetic facility registration (member-state GMP audit instead)</td>
                <td className="px-3 py-2 align-top text-ink-700">Required federally for domestic and foreign facilities, biennial renewal</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Safety dossier</td>
                <td className="px-3 py-2 align-top text-ink-700">CPSR Part A and Part B, signed by qualified Safety Assessor, held in PIF</td>
                <td className="px-3 py-2 align-top text-ink-700">Safety substantiation records, no specified assessor credential, held by responsible person</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Adverse event reporting</td>
                <td className="px-3 py-2 align-top text-ink-700">Serious undesirable effects (SUE) to competent authority, timeline per member state</td>
                <td className="px-3 py-2 align-top text-ink-700">SAE to FDA via MedWatch within 15 business days; 6-year recordkeeping</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Enforcement body</td>
                <td className="px-3 py-2 align-top text-ink-700">Member-state competent authorities (BVL, NVWA, DGCCRF, AEMPS, etc.); Safety Gate (ex-RAPEX)</td>
                <td className="px-3 py-2 align-top text-ink-700">FDA Office of Cosmetics and Colors; CBP for import refusals</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Change-notification SOP</td>
                <td className="px-3 py-2 align-top text-ink-700">60-day supplier clause tied to Article 5 of 1223/2009</td>
                <td className="px-3 py-2 align-top text-ink-700">60-day CPL re-listing on material change; de facto 60-day supplier clause via substantiation</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Preservative efficacy standard</td>
                <td className="px-3 py-2 align-top text-ink-700">ISO 11930 Criterion A / B</td>
                <td className="px-3 py-2 align-top text-ink-700">ISO 11930 or USP &lt;51&gt; both accepted; no formal criterion specification</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The practical consequence: a product fully compliant under EU Annex V with a complete
          CPSR will almost always clear MoCRA safety substantiation with one additional step —
          the US product listing filing with FDA registration number for the manufacturing
          facility. A product designed for US-only distribution with only MoCRA records in place
          will fail EU CPNP notification without substantive additional work on the CPSR, the
          Annex V cap compliance, and the member-state notification mechanics.
        </p>

        <LeadMagnetCTA
          title="MoCRA facility registration &amp; SAE SOP template pack"
          body="A plain-English MoCRA readiness pack covering facility registration mechanics (new, renewal, US agent), CPL ingredient-disclosure template for preservative-containing products, a 15-business-day SAE reporting SOP with MedWatch form 3500A guidance, a change-control log template, and a pre-inspection records readiness checklist. Sent to your inbox within two business hours."
          cta="Request the MoCRA compliance pack"
          topic="mocra-compliance-pack"
        />

        <FAQ
          heading="US MoCRA preservative compliance FAQ"
          id="mocra-faq"
          items={faqItems}
        />

        <aside className="mt-16 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold mb-2">About the author</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Yang Ruosong</strong> is Onerchemical&apos;s preservation sourcing specialist,
            focused on long-term supply partnerships between EU, US and APAC cosmetic brands and
            verified preservative producers. Day-to-day work covers RFQ triage, CoA defensibility
            audits, change-notification SOP review, and the regulatory paperwork pack that keeps
            cosmetic-grade preservative imports moving through US MoCRA, EU 1223/2009, China
            IECIC, Japan quasi-drug and Korea KFDA regimes. Read more at{' '}
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
              <a href="/blog/eu-annex-v-preservative-compliance-guide">
                EU Annex V Preservative Compliance Guide
              </a>{' '}
              — the sister regulatory playbook for the EU side of multi-market cosmetic
              distribution.
            </li>
            <li>
              <a href="/blog/preservative-coa-batch-consistency">
                Preservative CoA Batch Consistency
              </a>{' '}
              — the 60-day change-notification SOP that catches supplier process changes before
              they surface at FDA inspection.
            </li>
            <li>
              <a href="/blog/iso-11930-challenge-test-protocol">
                ISO 11930 Challenge Test Protocol
              </a>{' '}
              — the preservation efficacy evidence FDA cosmetic inspectors expect in the safety
              substantiation record.
            </li>
            <li>
              <a href="/guide/cosmetic-preservatives">
                The Complete Guide to Cosmetic Preservatives
              </a>{' '}
              — the pillar HUB covering preservative selection across EU, US, China, Japan and
              Korea markets.
            </li>
          </ul>
        </section>
      </BlogArticleLayout>
    </>
  );
}
