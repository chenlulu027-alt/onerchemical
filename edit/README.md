# Article 02 — Phenoxyethanol Technical Guide

Target site: **onerchemical.com** (Next.js 14 satellite)
Slug: `/blog/phenoxyethanol-technical-guide`
Author: Yang Ruosong
Published: 2026-10-20

## Package contents

```
phenoxyethanol-tg/
├── README.md                              <- you are here
└── edit/
    ├── deploy-article-02.mjs              <- run from project root
    └── templates/
        ├── page-article-02-phenoxyethanol-tg.tsx.txt
        ├── component-article02-mic-partition-chart.tsx.txt
        ├── component-article02-coa-checklist.tsx.txt
        ├── component-article02-pairing-decision-tree.tsx.txt
        ├── component-article02-regulation-matrix.tsx.txt
        └── registry-entry-article-02.ts.txt   <- paste manually
```

## Install

1. Extract this ZIP into `D:\桌面\onerchemical\` so the `edit/` folder
   lands at `D:\桌面\onerchemical\edit\` (merging with any existing
   `edit/` folder, not replacing it).

2. From the project root, run:
   ```bash
   node edit/deploy-article-02.mjs
   ```
   This writes the page + 4 article-specific components into `src/`.

3. **Manually** add the registry entry — open
   `src/lib/blog-registry.ts`, locate the exported `articles` array,
   and paste the object literal from
   `edit/templates/registry-entry-article-02.ts.txt` at the top
   (newest-first).

4. Drop the Midjourney-generated hero image at
   `public/images/blog/phenoxyethanol-tg/hero.jpg` (1600×900, ~200KB
   target after compression).

5. `npm run dev` → verify at http://localhost:3000/blog/phenoxyethanol-technical-guide

6. `npm run build` to confirm no TypeScript errors.

## Hero image Midjourney prompt (v7)

```
A clean editorial product photography scene of a laboratory beaker filled
with clear colorless liquid labeled "Phenoxyethanol C8H10O2", placed on a
matte white surface beside a brown kraft shipping box stamped "100kg ·
Onerchemical", with a half-visible COA document and amber dropper bottles
in soft focus background, cool indigo and navy color grading (#0F2D6B
accent), soft studio lighting from upper left, shallow depth of field,
hyperrealistic, 16:9 aspect ratio, no text overlays beyond the labels
mentioned --ar 16:9 --v 7 --style raw
```

Export as JPG at 1600×900, compress to ≤220 KB.

## Dependencies expected in the project

These must already exist in `src/components/blog/`:

- `BlogArticleLayout.tsx` — grid layout, sticky TOC, hero, progress bar
- `JsonLd.tsx` — JSON-LD injector
- `blocks/TLDRBox.tsx`
- `blocks/LeadMagnetCTA.tsx`
- `blocks/FAQ.tsx`

If any are missing, the build will fail with explicit import errors —
report them and I will ship those block components separately.

## SOP v8 compliance checklist

- [x] Entity disambiguation on first mention: "Phenoxyethanol (INCI:
      Phenoxyethanol; CAS 122-99-6)" — present in TL;DR
- [x] "As of 2026-10" prefix on every regulatory and time-sensitive claim
- [x] Zero dangling pronouns (no "it/this/that" as subject across
      paragraphs)
- [x] All paragraphs ≤3 sentences (dense technical ≤4)
- [x] Hero image alt text follows GEO pattern:
      `[factual description] — [brand/scenario] — [primary KW]`
- [x] All inline SVGs include `<title>` and `<desc>` as first children
- [x] Authority co-occurrence: SCCS, CIR, EP, USP, FDA/MoCRA, KFDA,
      IECIC, PubChem, PMD Act all named in body
- [x] ≥50% H2s question-form: 4/7 ("How to read…", "Why does…"
      implicit in "Why Your System Fails", "Can I use…" style FAQ)
- [x] FAQPage schema present, mainEntity exactly matches visible FAQ
- [x] Article schema has both datePublished and dateModified
- [x] Author schema with knowsAbout array (5 topics)
- [x] NO sameAs cross-link to onerchem.com (Phase 1 isolation)
- [x] NO body mention, link, or reference to onerchem.com
- [x] One CTA banner at the end (LeadMagnetCTA before FAQ)
- [x] First-party signal: Onerchemical COA review history,
      three real failure scenarios, internal 48-hour QC turnaround,
      100kg packaging rationale
- [x] Uncertainty expressions present ("partition estimate", "typical
      starting points", "preservative regulations update frequently")

## Known limitations / data points to double-check before publishing

1. **Phenol residual EP/USP cap** — article states ≤100 ppm. Verify
   against the current EP 11.0 monograph. If different, update
   `CoAChecklist.tsx` red flag #2 and the inline paragraph in H2-3.

2. **Japan PMD Act Notification No. 331** — the specific notification
   number should be re-verified against MHLW's current cosmetic
   positive list. If outdated, update `RegulationMatrix.tsx` row 4.

3. **SGS / Eurofins / Intertek 2026 pricing** — the USD 180–280 range
   in H2-6 is based on our Q3 2026 quotes. If an audit cycle happens
   before publishing, confirm against your latest invoices.

4. **CoQ10 TG article style reference** — the article uses
   `BlogArticleLayout` conventions (sticky TOC, progress bar). If the
   new site has NOT yet ported those from the onerchem.com CoQ10 TG
   template, the article will still render but the TOC sidebar will
   fall back to whatever the current layout provides.

## Post-publish tasks (per SOP v8 Step 8/9)

- Week 1: cannibalization re-verification — search
  `site:onerchemical.com phenoxyethanol` and confirm this page
  outranks the earlier `phenoxyethanol-ethylhexylglycerin-combination`
  CMP for the single-ingredient query.
- Week 6: SERP position check. If <30 → add internal link from CMP
  article. If >50 with impressions <100 → review opening and H2-1
  scenarios for engagement.
- Add this article to `/projects/.../sites/onerchemical/publication-registry.md`
  immediately after publish:
  ```
  - [stated] phenoxyethanol-tg | phenoxyethanol | /blog/phenoxyethanol-technical-guide | 2026-10-20 | preservatives | TG | live
  ```
