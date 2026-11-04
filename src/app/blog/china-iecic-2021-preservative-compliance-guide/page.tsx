import type { Metadata } from 'next';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { TLDRBox } from '@/components/blog/blocks/TLDRBox';
import { FAQ } from '@/components/blog/blocks/FAQ';
import { LeadMagnetCTA } from '@/components/blog/blocks/LeadMagnetCTA';
import { JsonLd } from '@/components/JsonLd';
import IECICPreservativeLookup from '@/components/blog/article-15/IECICPreservativeLookup';
import ChinaRegulatoryChecklistBuilder from '@/components/blog/article-15/ChinaRegulatoryChecklistBuilder';
import { getArticle } from '@/lib/blog-registry';

const SLUG = 'china-iecic-2021-preservative-compliance-guide';
const SITE = 'https://onerchemical.com';
const CANONICAL = `${SITE}/blog/${SLUG}`;
const PUBLISHED = '2026-11-04T00:00:00.000Z';
const MODIFIED = '2026-11-04T00:00:00.000Z';

export const metadata: Metadata = {
  title: 'China IECIC 2021 Preservative Compliance Guide (2026): CSAR, STSC, CBE',
  description:
    'A procurement, QC and regulatory playbook for cosmetic preservative compliance in China under CSAR 2021: how IECIC 2021 and the STSC Annex V positive list interact, the 51 permitted preservatives, CBE notification mechanics, special-cosmetic registration, Domestic Responsible Person obligations, and the 3-way EU/US/China compliance delta for multi-market brands.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    url: CANONICAL,
    siteName: 'Onerchemical',
    title: 'China IECIC 2021 Preservative Compliance Guide (2026)',
    description:
      'IECIC 2021 vs STSC Annex V, the 51 permitted preservatives, CBE notification fields, special-cosmetic registration, Domestic Responsible Person, and the 3-way EU/US/China delta.',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: [`${SITE}/yang-ruosong/`],
    images: [
      {
        url: `${SITE}/images/blog/article-15/hero.jpg`,
        width: 1600,
        height: 900,
        alt: 'A compliance manager cross-checking an NMPA CBE notification against an IECIC 2021 page listing for Phenoxyethanol at CAS 122-99-6',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China IECIC 2021 Preservative Compliance (2026)',
    description:
      'IECIC vs STSC Annex V, CBE notification, Domestic Responsible Person, 3-way EU/US/China regulatory delta.',
  },
};

export default function Page() {
  const article = getArticle(SLUG);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'China IECIC 2021 Preservative Compliance: The 2026 Guide to CSAR, STSC Annex V, CBE Notification and Domestic Responsible Person Obligations',
    description:
      'A procurement, QC and regulatory playbook for cosmetic preservative compliance in China covering IECIC 2021 structure, STSC Annex V 51-preservative positive list, CBE notification fields, special-cosmetic registration requirements, Domestic Responsible Person duties, and the 3-way EU/US/China regulatory delta for multi-market brands.',
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
    image: `${SITE}/images/blog/article-15/hero.jpg`,
    about: [
      { '@type': 'Thing', name: 'IECIC 2021 (Inventory of Existing Cosmetic Ingredients in China)' },
      { '@type': 'Thing', name: 'CSAR (Cosmetic Supervision and Administration Regulation)' },
      { '@type': 'Thing', name: 'STSC (Safety and Technical Standards for Cosmetics)' },
      { '@type': 'Thing', name: 'NMPA Cosmetic Notification' },
      { '@type': 'Thing', name: 'Domestic Responsible Person' },
    ],
    keywords:
      'China IECIC 2021 preservative compliance, CSAR 2021 cosmetic preservative, STSC Annex V preservative, NMPA cosmetic notification preservative, CBE preservative filing, Domestic Responsible Person China, special cosmetic registration preservative, China cosmetic preservative regulation',
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
        name: 'China IECIC 2021 Preservative Compliance',
        item: CANONICAL,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Is IECIC 2021 a positive list for cosmetic preservatives like EU Annex V?',
      answer:
        'No. IECIC 2021 (Inventory of Existing Cosmetic Ingredients in China, published by NMPA in 2021) is an inventory of ingredients already in historical cosmetic use in China, listing more than 8,900 ingredients identified by Chinese name, English name, INCI name and CAS number where applicable. Inclusion in IECIC means the ingredient does not require new-ingredient registration before use — it is NOT itself a permission to use the ingredient as a preservative. The preservative positive list sits in a separate document: Annex V of the Safety and Technical Standards for Cosmetics (STSC, 2015 edition, under revision), which lists 51 permitted preservatives with concentration caps and product-type restrictions. A preservative must be on BOTH IECIC 2021 AND STSC Annex V to be used as a primary preservative in a China-marketed cosmetic. A multifunctional ingredient on IECIC but not on STSC Annex V (such as 1,2-Hexanediol, Caprylhydroxamic Acid, Ethylhexylglycerin) may be declared as skin-conditioning or chelating with antimicrobial function justified in the safety assessment, mirroring the EU non-Annex V multifunctional treatment.',
    },
    {
      question: 'What is the difference between CBE notification and special-cosmetic registration?',
      answer:
        'Under CSAR (Cosmetic Supervision and Administration Regulation, effective January 1, 2021), China cosmetic products divide into two categories with distinct regulatory tracks. Ordinary cosmetics (非特殊用途化妆品 / general cosmetics) use notification (备案): domestic-produced ordinary cosmetics notify with the provincial medical products administration where the manufacturer is based; imported ordinary cosmetics notify with NMPA at the national level through the Cosmetic Registration and Notification Information Service Platform. Notification processing time is typically 3-5 business days for a complete dossier. Special cosmetics (特殊化妆品) require registration (注册) with NMPA regardless of origin. CSAR Article 16 defines 5 special cosmetic categories: hair dye, perm, freckle-removing / skin-whitening, sunscreen, and anti-hair-loss. Registration takes 6-12 months and requires a full technical-review dossier including safety assessment, efficacy substantiation, and toxicology. The 2021 CSAR consolidated the pre-2021 nine-category special-cosmetic list down to five; nourishing, skin-care, acne-reduction, infant-care, and repair products are now ordinary cosmetics but may carry "special claims" that trigger additional substantiation requirements.',
    },
    {
      question: 'Does my imported cosmetic brand need a Domestic Responsible Person in China?',
      answer:
        'Yes, mandatory under CSAR Article 7. Any overseas cosmetic manufacturer placing products on the China market must appoint a Chinese-territory legal entity as Domestic Responsible Person (DRP, 境内责任人) to represent the brand to NMPA. The DRP&apos;s legal obligations include: filing the notification or registration on behalf of the overseas manufacturer, maintaining the technical dossier (safety assessment report, formulation details, testing reports), responding to NMPA inquiries within specified timeframes, coordinating adverse-event reporting, managing product recalls if required, and assuming legal liability for compliance violations alongside the overseas manufacturer. The DRP cannot be a shell entity — it must have a physical office in China, a Chinese legal representative, and the technical capacity to defend the product at NMPA inquiry. Common arrangements: brand&apos;s Chinese subsidiary, specialized regulatory consultancy with DRP service license, or the Chinese contract manufacturer where the product is produced for China distribution. DRP service fees typically run RMB 15,000-80,000 per product per year depending on scope and portfolio complexity.',
    },
    {
      question: 'Which preservatives on EU Annex V are NOT on China STSC Annex V?',
      answer:
        'Approximately 8 preservatives on EU Annex V (2026-Q4 consolidated) are absent from China STSC Annex V (2015 edition), either because they have never been approved for China cosmetic use or because China withdrew them from an earlier version. Notable absences: Chlorphenesin (EU Annex V entry 37, approved as cosmetic preservative in EU at 0.3%; China has not approved it under STSC Annex V, though it appears on IECIC 2021 for non-preservative use); Phenylmercuric Salts (EU restricts to eye-area, China prohibits mercury compounds in cosmetics entirely under STSC Annex II); Hexetidine (EU rinse-off only at 0.1%, not on China STSC Annex V). Formaldehyde and formaldehyde-releasers face stricter China treatment than EU — several formaldehyde-releasers permitted at low levels in EU trigger mandatory declaration or prohibition under China STSC. Multi-market brands maintain a per-market preservative matrix with China STSC Annex V as the typically stricter constraint for the subset of 8 molecules; EU Annex V is stricter for others. There is no single global preservation system that automatically clears both.',
    },
    {
      question: 'When does a preservative change in my formulation require CBE notification update?',
      answer:
        'Under the Technical Guidelines for Cosmetic Notification (NMPA 2021), a notification update is required when the following changes to a notified product occur: substitution of a preservative ingredient (any change in CAS or INCI identity), change in preservative concentration that moves outside the originally declared range, change in product type or category classification, change in intended-use claim that triggers special-cosmetic registration reclassification, or change in packaging that affects stability or exposure assumptions. A supplier-side change where the preservative CAS, INCI, concentration range and functional role all stay unchanged does NOT trigger notification update but DOES require internal change-control documentation and typically a re-run of the Challenge Test under the China method (GB/T 38857-2020 or equivalent) to confirm continued efficacy. Processing time for notification update is 3-5 business days through the Cosmetic Registration and Notification Information Service Platform. Failure to update a notification after a material change is a compliance violation and may trigger NMPA inspection of the Domestic Responsible Person&apos;s records.',
    },
    {
      question: 'Does China accept EU CPSR or US safety substantiation data for preservative compliance?',
      answer:
        'Substantially yes for the technical core, with format and language gaps. The Chinese safety assessment report (安全评估报告) required under CSAR Article 24 and the 2021 Technical Guidelines for Cosmetic Safety Assessment accepts scientifically valid data from EU CPSR Part A and Part B, US MoCRA safety substantiation records, and equivalent third-country frameworks. The gap is procedural: the Chinese safety assessment must be signed by a qualified Chinese safety assessor registered with NMPA, formatted per the Chinese template, and submitted in Chinese (with original-language source documents attached as references). ISO 11930 Challenge Test data generated at a foreign laboratory is generally accepted; test methods that follow Chinese national standards (GB/T series) accelerate review. Toxicological data from authoritative sources (SCCS opinions, CIR reviews, OECD-method tests) is accepted. A multi-market brand typically maintains a master safety dossier where the Chinese safety assessment is a derived document pointing to the same underlying evidence base as the EU CPSR and the US safety substantiation record, with local-language formatting and a qualified Chinese safety assessor sign-off.',
    },
    {
      question: 'How do I verify a preservative is actually on IECIC 2021 and the STSC Annex V?',
      answer:
        'Two independent verifications are required because the two lists serve different functions. IECIC 2021 verification: search the official NMPA IECIC database by CAS number and INCI name; the entry returns the Chinese name, English name, CAS, and standard functional category. Match must be on CAS; INCI alone is insufficient because multiple CAS numbers can share an INCI. STSC Annex V verification: search the 2015 edition STSC Annex V by substance name; confirm the maximum concentration cap, product-type restrictions, and any warning-label requirements. A preservative passes China preservation-system compliance when it appears on both lists at the use concentration within the STSC Annex V cap. A substance on IECIC but not on STSC Annex V can be used in the product at the IECIC-permitted function (humectant, skin-conditioning, chelating, etc.) but cannot be labelled or claimed as a preservative. The lookup component in this article\'s decoder section indexes the preservative subset of both databases for quick cross-check.',
    },
    {
      question: 'What happens if my preservative supplier changes production site within China?',
      answer:
        'Under CSAR Article 24 and the 2021 Good Manufacturing Practice guidelines, the Domestic Responsible Person must maintain records of the raw-material production source. A supplier-side change where the same supplier organization shifts production between two of its own facilities (same legal entity, same production license) does not by itself require notification update but does require (a) updated supplier CoA with the new production site address, (b) updated supplier GMP certificate for the new facility, (c) internal change-control documentation in the DRP record, and (d) a typically-recommended Challenge Test re-run to confirm the new facility\'s material maintains preservation efficacy. A change where production shifts to a different supplier organization is a material change and requires both notification update (if the new supplier\'s material differs in CoA profile that affects declared range) and a full supplier qualification cycle. NMPA cosmetic inspections conducted 2024-2026 under the strengthened post-market surveillance program target undocumented supplier changes as one of the top five audit findings for imported-cosmetic Domestic Responsible Persons.',
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
        title="China IECIC 2021 Preservative Compliance: The 2026 Guide for Cosmetic Brands and Contract Manufacturers Exporting to China"
        excerpt="A procurement, QC and regulatory playbook for cosmetic preservative compliance in China under CSAR 2021: how IECIC 2021 and the STSC Annex V positive list interact, the 51 permitted preservatives, CBE notification mechanics, special-cosmetic registration, Domestic Responsible Person obligations, and the 3-way EU/US/China compliance delta for multi-market brands."
        datePublished={PUBLISHED}
        readingMinutes={17}
        toc={article?.toc}
      >
        <TLDRBox>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              IECIC 2021 (Inventory of Existing Cosmetic Ingredients in China, published by NMPA)
              lists ~8,900 ingredients with established China cosmetic use history. STSC Annex V
              (Safety and Technical Standards for Cosmetics, 2015 edition) is the separate
              positive list of 51 permitted preservatives. A preservative must sit on BOTH to be
              used and labelled as a preservative in a China-marketed cosmetic.
            </li>
            <li>
              Under CSAR (effective 2021-01-01), ordinary cosmetics use notification (CBE,
              provincial for domestic / NMPA for imported); 5 special-cosmetic categories
              (hair dye, perm, freckle-removing / whitening, sunscreen, anti-hair-loss) require
              NMPA registration with 6-12 month processing.
            </li>
            <li>
              Every overseas brand placing products in China must appoint a Domestic Responsible
              Person (DRP, 境内责任人) — a Chinese legal entity with a physical office,
              Chinese legal representative, and technical capacity to defend the product at
              NMPA inquiry. DRP service fees typically RMB 15,000-80,000 per product per year.
            </li>
            <li>
              Multifunctional ingredients on IECIC 2021 but NOT on STSC Annex V (1,2-Hexanediol,
              Caprylhydroxamic Acid, Ethylhexylglycerin, Caprylyl Glycol) are legal in China
              cosmetics at their declared non-preservative function; they cannot be labelled or
              claimed as preservatives.
            </li>
            <li>
              Approximately 8 preservatives on EU Annex V are absent from China STSC Annex V
              (Chlorphenesin, Hexetidine, several mercury compounds, select formaldehyde-releasers).
              Multi-market brands maintain a per-market preservative matrix; there is no global
              preservation system that automatically clears EU, US and China.
            </li>
          </ul>
        </TLDRBox>

        <h2 id="shanghai-opener">
          A USD 32,000 Shanghai port CBE rejection, one mismatched IECIC field
        </h2>
        <p>
          In Q2 2026 a European contract manufacturer shipped a 1,500 kg consignment of
          cosmetic-grade preservative raw material to a Chinese brand&apos;s manufacturing partner in
          Jiangsu. The material was Phenoxyethanol, cleanly on both IECIC 2021 (CAS 122-99-6) and
          STSC Annex V (entry at 1.0% maximum). The container reached Shanghai port and was held
          at customs clearance pending verification of the import filing.
        </p>
        <p>
          The hold cause: the Chinese brand&apos;s Domestic Responsible Person had filed the finished
          product&apos;s CBE notification declaring Phenoxyethanol in the formula under its Chinese
          name 苯氧乙醇 at a concentration range of 0.3-0.7%. The actual formula used the
          preservative at 0.85%, within the STSC Annex V cap of 1.0% but outside the declared
          range on the notification. The customs-NMPA cross-check flagged the concentration
          discrepancy against the notification record.
        </p>
        <p>
          The brand&apos;s DRP spent six weeks resolving the issue: updating the CBE notification with
          the corrected concentration range, re-running the China Challenge Test under GB/T
          38857-2020 to confirm continued preservation efficacy at the corrected concentration,
          submitting the updated safety assessment report signed by a Chinese safety assessor,
          and coordinating with customs to release the held container. Direct costs: RMB 185,000
          (USD 26,000) in demurrage and detention, RMB 42,000 in re-testing and DRP fees, USD
          32,000 in delayed retail launch penalties.
        </p>
        <p>
          This article is the China compliance playbook that would have caught the concentration
          mismatch at CBE notification review — covering how IECIC 2021 and STSC Annex V
          interact, the 51 permitted preservatives, CBE notification mechanics, special-cosmetic
          registration triggers, Domestic Responsible Person obligations, and the 3-way EU/US/China
          regulatory delta that multi-market brands must navigate.
        </p>

        <h2 id="iecic-structure">
          IECIC 2021 — structure, scope, and how to read an entry
        </h2>
        <p>
          The Inventory of Existing Cosmetic Ingredients in China (IECIC 2021, 已使用化妆品原料目录)
          was published by NMPA (National Medical Products Administration) on April 30, 2021,
          replacing the 2015 edition. IECIC 2021 lists approximately 8,900 ingredients with a
          documented history of use in cosmetic products marketed in China before the 2021
          revision cutoff.
        </p>
        <p>
          Inclusion in IECIC is an administrative determination that the ingredient does not
          require new-ingredient registration before a brand can use it in a China-marketed
          cosmetic. Inclusion is NOT itself approval for a specific functional use. An ingredient
          on IECIC can be used for any function supported by scientific evidence and by the brand&apos;s
          safety assessment — but function-specific positive lists (preservatives in STSC Annex V,
          UV filters in STSC Annex VI, colorants in STSC Annex VII) layer additional restrictions
          for ingredients used in those functions.
        </p>
        <p>
          Each IECIC entry carries: Chinese name (standard pharmacopeial or industry name), English
          name, INCI name where applicable, CAS number where applicable, and the standard
          functional category assigned by NMPA at listing time. An IECIC entry does NOT carry a
          maximum concentration cap or product-type restriction; those sit in STSC Annex V for
          preservatives, Annex VI for UV filters, and so on.
        </p>
        <p>
          Not-on-IECIC ingredients require new-ingredient notification or registration under CSAR
          Chapter V before first use in a China-marketed cosmetic. The 2021 revision introduced a
          3-year safety monitoring regime for low-risk new ingredients that can be notified
          (备案) rather than fully registered (注册), substantially reducing the time-to-market
          for novel multifunctional ingredients. Preservatives, however, typically cannot use the
          notification path because they are categorized as higher-risk ingredients requiring full
          registration — a significant deterrent to introducing a new preservative to the China
          market.
        </p>

        <h2 id="iecic-lookup">
          Preservative lookup — IECIC 2021 and STSC Annex V cross-check
        </h2>
        <p>
          The lookup below indexes the preservative subset of IECIC 2021 and STSC Annex V for
          quick cross-check during RFQ or formulation design. Search by CAS, INCI, or common
          name; the result shows IECIC inclusion status, STSC Annex V listing and concentration
          cap, and typical use-case notes.
        </p>
        <IECICPreservativeLookup />
        <p>
          The lookup is a working audit aid. Final determination of compliance rests with the
          Domestic Responsible Person&apos;s safety assessment and the latest consolidated NMPA
          publications — STSC is under revision as of 2026-Q4, with several Annex V entries
          under SCCS-adjacent review.
        </p>

        <h2 id="stsc-annex-v">
          STSC Annex V — the 51 permitted preservatives and the acid/salt interconversion rule
        </h2>
        <p>
          The Safety and Technical Standards for Cosmetics (STSC, 化妆品安全技术规范) 2015
          edition is the operational safety and compositional standard for cosmetic products
          marketed in China. STSC consists of multiple annexes; Annex V (附录5) is the
          preservative positive list with 51 entries.
        </p>
        <p>
          Each STSC Annex V entry carries: substance Chinese name, English name, INCI name, CAS
          number, maximum allowed concentration in finished cosmetic (expressed consistently as
          the acid, free base, or specified form), product-type restrictions (leave-on vs
          rinse-off, child-product exclusions, mucous-membrane restrictions), and any mandatory
          warning-label text in Chinese.
        </p>
        <p>
          Five systematic traps catch brands at CBE notification review, mirroring and extending
          the EU Annex V trap set:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Acid/salt interconversion.</strong> Several STSC Annex V entries cap the sum
            of the free acid plus its salts expressed as free acid (Benzoic Acid, Sorbic Acid,
            parabens). A formulator specifying Potassium Sorbate at 1.0% files a non-compliant
            concentration because the acid-equivalent is approximately 0.84%, above the STSC cap
            of 0.6% for Sorbic Acid. The notification rejects.
          </li>
          <li>
            <strong>Rinse-off versus leave-on splits.</strong> Several STSC Annex V entries cap
            leave-on more strictly than rinse-off, mirroring EU. Salicylic Acid, IPBC, and certain
            isothiazolinones carry distinct caps by product category.
          </li>
          <li>
            <strong>Child-product category exclusions.</strong> Products for children under 3 trigger
            additional restrictions beyond the general Annex V caps. The child-product category is
            declared at CBE notification; mis-tagging a child product as a general product is a
            notification violation.
          </li>
          <li>
            <strong>Multi-function role declaration.</strong> An STSC Annex V-listed preservative
            used in the formula at a concentration below its cap and declared for a different
            function (such as using Benzoic Acid for pH adjustment at very low concentration)
            still triggers the Annex V cap for preservation function; the safety assessment must
            explicitly justify the alternative function with analytical and formulation evidence.
          </li>
          <li>
            <strong>Mercury compounds and other prohibited substances.</strong> China STSC Annex II
            prohibits more than 1,300 substances, including several mercury-based preservatives
            that EU Annex V restricts to eye-area use. A product compliant under EU Annex V eye-area
            cap for Phenylmercuric Salts is prohibited in China.
          </li>
        </ul>

        <h2 id="cbe-notification">
          CBE notification — mechanics for ordinary cosmetics (imported and domestic)
        </h2>
        <p>
          Under CSAR Chapter III and the Technical Guidelines for Cosmetic Notification (NMPA
          2021), ordinary cosmetics (非特殊用途化妆品) use a notification (备案) path rather than
          full registration. The notification path differs by product origin.
        </p>
        <h3 id="cbe-domestic">Domestic-produced ordinary cosmetics</h3>
        <p>
          Filed with the provincial medical products administration (省级药品监督管理局) where the
          manufacturer is based, through the provincial-level Cosmetic Registration and
          Notification Information Service Platform. Processing time typically 3-5 business days
          for a complete dossier. The manufacturer files directly as the responsible entity.
        </p>
        <h3 id="cbe-imported">Imported ordinary cosmetics</h3>
        <p>
          Filed with NMPA at the national level through the national Cosmetic Registration and
          Notification Information Service Platform. The Domestic Responsible Person files on
          behalf of the overseas manufacturer. Processing time typically 5-10 business days.
        </p>
        <h3 id="cbe-dossier">CBE notification dossier contents</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Product identity: name in Chinese and the source language, product category per NMPA
            catalog, net content range, pH if applicable, intended use claim statements.
          </li>
          <li>
            Full ingredient list in descending weight order using standard Chinese names and INCI
            names where applicable; concentration ranges disclosed for preservatives and
            substances of concern.
          </li>
          <li>
            Manufacturing information: manufacturer name and address, manufacturing license number,
            GMP compliance evidence (China or international equivalent).
          </li>
          <li>
            Safety assessment report signed by a qualified Chinese safety assessor, including
            toxicological assessment, exposure calculation, and preservation-system efficacy
            evidence (Challenge Test under GB/T 38857-2020 or ISO 11930 with China-acceptable lab
            provenance).
          </li>
          <li>
            Product technical requirements document covering raw-material specifications, finished
            product specifications, stability data, and compatibility with primary packaging.
          </li>
          <li>
            Intended-use claim substantiation for any efficacy claim beyond basic cleansing or
            moisturizing (functional efficacy claims trigger additional testing requirements
            under the 2021 Technical Guidelines for Cosmetic Efficacy Claim Evaluation).
          </li>
          <li>
            Labeling materials: primary label, secondary packaging label, insert if applicable —
            all in Chinese per Chinese labeling regulations.
          </li>
          <li>
            For imported products: the Domestic Responsible Person authorization letter, DRP
            business license, and the overseas manufacturer&apos;s authorization documentation.
          </li>
        </ul>

        <h2 id="compliance-checklist">
          China regulatory checklist — product type and distribution model
        </h2>
        <p>
          The checklist below filters by product category (ordinary vs special), origin (domestic
          vs imported), and additional-claim scope to show the specific action items, documentation
          set, and NMPA timelines for your path to China cosmetic market.
        </p>
        <ChinaRegulatoryChecklistBuilder />

        <h2 id="special-cosmetic">
          Special-cosmetic registration — 5 categories and the 6-12 month timeline
        </h2>
        <p>
          CSAR Article 16 defines 5 special cosmetic categories that require NMPA registration
          rather than notification, regardless of product origin. The 2021 CSAR consolidated the
          pre-2021 nine-category list down to five by moving nourishing, acne-reduction, repair,
          infant-care, and skin-care products to ordinary cosmetics with potential additional
          claim substantiation requirements.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Hair dye (染发剂)</strong> — oxidative and non-oxidative dyes, temporary and
            permanent. Registration dossier includes full toxicological assessment for each dye
            component.
          </li>
          <li>
            <strong>Perm (烫发剂)</strong> — chemical perming and straightening agents.
          </li>
          <li>
            <strong>Freckle-removing and skin-whitening (祛斑美白)</strong> — products claiming
            melanin-targeting or pigment-reduction efficacy. Preservative compatibility with
            whitening active ingredients (Niacinamide, Tranexamic Acid, Arbutin, Kojic Acid) must
            be demonstrated.
          </li>
          <li>
            <strong>Sunscreen (防晒)</strong> — UVA/UVB protective products. UV filter positive
            list (STSC Annex VI) interacts with preservative selection; several multifunctional
            preservation systems become constrained by UV filter chemistry.
          </li>
          <li>
            <strong>Anti-hair-loss (防脱发)</strong> — products claiming hair-loss prevention or
            reduction.
          </li>
        </ul>
        <p>
          Special cosmetic registration processing time is 6-12 months from complete dossier
          submission. Fast-track and priority-review paths exist for specific categories under
          2024-2026 NMPA policy reforms. Registration validity is 5 years, renewable.
        </p>

        <h2 id="domestic-responsible-person">
          Domestic Responsible Person — obligations, selection, and liability
        </h2>
        <p>
          CSAR Article 7 and Articles 36-39 establish the Domestic Responsible Person (境内责任人)
          as the mandatory China-territory representative for any overseas cosmetic manufacturer
          placing products on the China market. The DRP is not a conduit — it carries direct
          legal obligations alongside the overseas manufacturer.
        </p>
        <h3 id="drp-obligations">DRP legal obligations</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            File the notification or registration with NMPA on behalf of the overseas
            manufacturer, maintaining the technical dossier for the full product lifecycle.
          </li>
          <li>
            Respond to NMPA inquiries within specified timeframes (typically 15 working days for
            routine inquiries, 48 hours for safety-related).
          </li>
          <li>
            Coordinate adverse event reporting under the 2022 Measures for Supervision and
            Administration of Cosmetic Adverse Reaction Monitoring.
          </li>
          <li>
            Manage product recalls when required, including market retrieval coordination and
            consumer notification.
          </li>
          <li>
            Maintain the product safety file (产品技术要求) for 10 years after the last batch
            production date, available for NMPA post-market inspection.
          </li>
          <li>
            Assume joint-and-several liability for compliance violations with the overseas
            manufacturer. A DRP that discovers but fails to report a compliance issue faces direct
            administrative penalty.
          </li>
        </ul>
        <h3 id="drp-selection">DRP selection and fee ranges</h3>
        <p>
          The DRP must be a Chinese legal entity with: a physical office in China (not a virtual
          address), a Chinese legal representative, a business license covering cosmetic-related
          scope, and demonstrated technical capacity (typically a regulatory consultancy team
          with cosmetic safety assessors on staff). Three common arrangements fit different brand
          sizes.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Brand&apos;s Chinese subsidiary</strong> — optimal for brands with existing China
            operations. Internal cost allocation; full control. Requires in-house regulatory
            capacity.
          </li>
          <li>
            <strong>Specialized DRP service consultancy</strong> — the common path for
            mid-to-large brands without Chinese subsidiary. Fees typically RMB 25,000-80,000 per
            product per year depending on product complexity and portfolio size. Specialized
            consultancies offer multi-product discounts.
          </li>
          <li>
            <strong>Chinese contract manufacturer as DRP</strong> — convenient for brands using a
            single Chinese CMO. The CMO acts as DRP for products it manufactures. Fees typically
            bundled with manufacturing contract at RMB 15,000-35,000 per product per year. Risk:
            switching CMO means losing DRP continuity and re-filing all notifications.
          </li>
        </ul>

        <h2 id="seven-field-coa">
          Seven CoA fields for China-market preservative supply (differences from EU/US)
        </h2>
        <p>
          The cosmetic-grade preservative CoA for China-market supply differs from EU and US
          CoA audit focus in four distinct fields. The seven-field audit below merges common
          cosmetic-grade requirements with China-specific additions.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>INCI name with Chinese-name cross-reference.</strong> The CoA should carry
            both the INCI name used in international supply and the standard Chinese name used in
            IECIC 2021 and STSC Annex V. Mismatch between INCI and Chinese name is the single most
            common CBE notification rejection cause for imported cosmetic-grade raw material.
          </li>
          <li>
            <strong>CAS number with IECIC 2021 page or entry reference.</strong> A sophisticated
            supplier CoA cites the IECIC 2021 entry for the ingredient; this is the China-specific
            field most Western-supplied CoAs omit and the fastest cosmetic-vs-industrial grade
            discriminator for China-market supply.
          </li>
          <li>
            <strong>Assay with analytical method citation.</strong> HPLC or GC with method
            reference, consistent with STSC Annex V expressed-as specification for the substance.
          </li>
          <li>
            <strong>Heavy metals by ICP-MS.</strong> Lead, arsenic, mercury, cadmium per STSC
            2015 general limits (Pb under 10 ppm, As under 2 ppm, Hg under 1 ppm, Cd under 5 ppm).
            Mercury is particularly scrutinized — China prohibits mercury compounds entirely under
            STSC Annex II.
          </li>
          <li>
            <strong>Residual solvents and process impurities.</strong> GC headspace panel for
            synthesis residues per substance-specific concern.
          </li>
          <li>
            <strong>Microbial panel.</strong> Total aerobic microbial count, total
            yeast-and-mould count, absence of pathogens per Chinese Pharmacopoeia or
            industry-equivalent method.
          </li>
          <li>
            <strong>Batch number + production date + production site + country of origin.</strong>
            {' '}For imported material, country of origin matters for customs HS classification and
            for the CBE notification manufacturing-information section.
          </li>
        </ol>

        <h2 id="three-way-delta">
          Three-way EU vs US vs China regulatory delta — multi-market reality
        </h2>
        <p>
          The three major cosmetic export markets apply fundamentally different regulatory models
          to preservatives. The table below is the delta-aware reference for multi-market brands
          designing a single master dossier.
        </p>
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink-300 bg-neutral-50 text-left">
                <th className="px-3 py-2 font-semibold text-ink-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-ink-900">EU — Regulation 1223/2009</th>
                <th className="px-3 py-2 font-semibold text-ink-900">US — MoCRA (2022)</th>
                <th className="px-3 py-2 font-semibold text-ink-900">China — CSAR (2021)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Preservative legal model</td>
                <td className="px-3 py-2 align-top text-ink-700">Annex V positive list (59 entries)</td>
                <td className="px-3 py-2 align-top text-ink-700">No positive list; adequate substantiation</td>
                <td className="px-3 py-2 align-top text-ink-700">STSC Annex V positive list (51 entries) + IECIC 2021 inventory cross-check</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Max use concentration</td>
                <td className="px-3 py-2 align-top text-ink-700">Set per Annex V entry</td>
                <td className="px-3 py-2 align-top text-ink-700">No federal cap; state overlays apply</td>
                <td className="px-3 py-2 align-top text-ink-700">Set per STSC Annex V entry</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Product notification / registration</td>
                <td className="px-3 py-2 align-top text-ink-700">CPNP, EU-wide single filing</td>
                <td className="px-3 py-2 align-top text-ink-700">CPL via FDA Industry Systems</td>
                <td className="px-3 py-2 align-top text-ink-700">CBE notification (ordinary) or NMPA registration (5 special categories)</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Processing timeline</td>
                <td className="px-3 py-2 align-top text-ink-700">CPNP immediate on filing</td>
                <td className="px-3 py-2 align-top text-ink-700">CPL within 120 days</td>
                <td className="px-3 py-2 align-top text-ink-700">CBE 3-10 business days; special registration 6-12 months</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Local representative</td>
                <td className="px-3 py-2 align-top text-ink-700">Responsible Person (EU-resident)</td>
                <td className="px-3 py-2 align-top text-ink-700">Responsible person (US-resident); US agent for foreign facilities</td>
                <td className="px-3 py-2 align-top text-ink-700">Domestic Responsible Person (Chinese legal entity, mandatory)</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Safety dossier</td>
                <td className="px-3 py-2 align-top text-ink-700">CPSR Part A and Part B, qualified Safety Assessor</td>
                <td className="px-3 py-2 align-top text-ink-700">Safety substantiation records, no specified assessor credential</td>
                <td className="px-3 py-2 align-top text-ink-700">Safety assessment report signed by NMPA-registered Chinese safety assessor</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Challenge Test standard</td>
                <td className="px-3 py-2 align-top text-ink-700">ISO 11930 Criterion A / B</td>
                <td className="px-3 py-2 align-top text-ink-700">ISO 11930 or USP &lt;51&gt; accepted</td>
                <td className="px-3 py-2 align-top text-ink-700">GB/T 38857-2020 (China national standard); ISO 11930 accepted with China-lab provenance</td>
              </tr>
              <tr className="border-b border-ink-100 bg-neutral-50/50">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Record retention</td>
                <td className="px-3 py-2 align-top text-ink-700">PIF for product shelf life + 10 years (varies)</td>
                <td className="px-3 py-2 align-top text-ink-700">SAE records 6 years</td>
                <td className="px-3 py-2 align-top text-ink-700">Product safety file 10 years after last batch</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-3 py-2 align-top font-medium text-ink-900">Enforcement body</td>
                <td className="px-3 py-2 align-top text-ink-700">Member-state competent authorities; Safety Gate</td>
                <td className="px-3 py-2 align-top text-ink-700">FDA Office of Cosmetics and Colors; CBP for imports</td>
                <td className="px-3 py-2 align-top text-ink-700">NMPA; provincial MPAs; General Administration of Customs for imports</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The practical consequence: a master safety dossier designed to satisfy EU CPSR will
          clear roughly 75-85% of China safety assessment requirements with format conversion
          and a qualified Chinese safety assessor sign-off. Approximately 15-25% of the dossier
          requires China-specific additions: Chinese-language labeling, STSC Annex V cross-check,
          GB/T-standard test provenance, and DRP authorization documentation. US MoCRA
          substantiation similarly converts with format work but lacks the EU CPSR&apos;s structural
          template that maps best onto the Chinese safety assessment format.
        </p>
        <p>
          The sister articles to this one — our{' '}
          <a href="/blog/eu-annex-v-preservative-compliance-guide">
            EU Annex V compliance guide
          </a>{' '}
          and{' '}
          <a href="/blog/us-mocra-preservative-compliance-guide">
            US MoCRA compliance guide
          </a>{' '}
          — cover the EU and US sides in equivalent depth. Together the three complete the
          regulatory playbook for brands distributing to the three largest cosmetic export
          markets.
        </p>

        <h2 id="change-management">
          Change-management SOP — the China version of the 60-day supplier notification
        </h2>
        <p>
          Under CSAR Article 24 and the 2021 Good Manufacturing Practice Guidelines, the
          Domestic Responsible Person must maintain current records of raw-material supply and
          report material changes affecting product safety or compliance. The China change-management
          discipline differs from EU and US primarily in the DRP&apos;s role as the sole regulatory
          interface.
        </p>
        <p>
          <strong>Three supplier-side changes that trigger CBE notification update:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Change of preservative ingredient identity — any INCI name change, any CAS number
            change, any substitution.
          </li>
          <li>
            Change in declared concentration range such that the current declared range no longer
            brackets the use level after supplier reformulation.
          </li>
          <li>
            Change in product category or claim that reclassifies the product from ordinary to
            special cosmetic (or vice versa).
          </li>
        </ol>
        <p>
          <strong>Five supplier-side changes that do NOT trigger CBE update but DO require
          internal change-control and typically a Challenge Test re-run under GB/T 38857-2020:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Change of production site within the same supplier organization and same CAS.
          </li>
          <li>
            Change of raw material feedstock that may shift residual-impurity profile.
          </li>
          <li>
            Change of synthesis route or purification method with no ingredient-identity change.
          </li>
          <li>
            Change of CoA analytical method for a key field.
          </li>
          <li>
            Change of purity grade with no ingredient-identity change.
          </li>
        </ol>
        <p>
          The practical SOP: supplier notifies DRP within the contractually-specified window
          (industry standard 60 days to align with EU and US practice), DRP logs in change-control
          register within 10 working days, decides within 20 working days whether CBE notification
          update is required and whether Challenge Test re-run is required, executes within the
          window before the first batch of changed material enters finished-product production
          for China distribution.
        </p>

        <LeadMagnetCTA
          title="China IECIC 2021 preservative cross-reference &amp; CBE notification template pack"
          body="A plain-English China compliance readiness pack covering IECIC 2021 preservative cross-reference (CAS to Chinese name to STSC Annex V entry), CBE notification dossier template for ordinary cosmetics, Domestic Responsible Person authorization letter template, a 51-preservative STSC Annex V quick-reference with maximum concentrations, and a sample GB/T 38857-2020 Challenge Test report format. Sent to your inbox within two business hours."
          cta="Request the China compliance pack"
          topic="china-iecic-compliance-pack"
        />

        <FAQ
          heading="China IECIC 2021 preservative compliance FAQ"
          id="china-iecic-faq"
          items={faqItems}
        />

        <aside className="mt-16 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-base font-semibold mb-2">About the author</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Yang Ruosong</strong> is Onerchemical&apos;s preservation sourcing specialist,
            focused on long-term supply partnerships between EU, US and APAC cosmetic brands and
            verified preservative producers. Based in Wuhan, Yang works directly with Chinese
            Domestic Responsible Persons and provincial medical products administrations on
            IECIC 2021 and STSC Annex V compliance for exported and imported cosmetic raw
            materials. Day-to-day work covers RFQ triage, CoA defensibility audits,
            change-notification SOP review, and the regulatory paperwork pack that keeps
            cosmetic-grade preservative imports moving through China CSAR, US MoCRA, EU 1223/2009,
            Japan quasi-drug and Korea KFDA regimes. Read more at{' '}
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
              — the EU sister regulatory playbook, the first of the three-market trilogy.
            </li>
            <li>
              <a href="/blog/us-mocra-preservative-compliance-guide">
                US MoCRA Preservative Compliance Guide
              </a>{' '}
              — the US sister regulatory playbook, the second of the three-market trilogy.
            </li>
            <li>
              <a href="/blog/preservative-coa-batch-consistency">
                Preservative CoA Batch Consistency
              </a>{' '}
              — the change-notification SOP that catches supplier process changes before they
              surface at CBE notification review.
            </li>
            <li>
              <a href="/blog/iso-11930-challenge-test-protocol">
                ISO 11930 Challenge Test Protocol
              </a>{' '}
              — the preservation efficacy test accepted alongside GB/T 38857-2020 in Chinese
              safety assessments.
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
