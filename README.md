# onerchemical.com

Satellite site — **Cosmetic Preservation Science**
Operated by Wuhan Oule Chemical (main site: onerchem.com)

## Stack

- Next.js 14.2.35 (App Router, pinned)
- TypeScript (strict)
- Tailwind CSS 3.4
- Resend (transactional email)
- Microsoft Clarity (analytics)
- Vercel (deploy)

## Setup

```bash
cp .env.local.example .env.local
# fill in values
npm install
npm run dev
```

## Project structure

```
src/
├─ app/           Next.js App Router pages + API routes
├─ components/    UI components (LocalizedLink, JsonLd, blog/*)
├─ context/       React context (QuoteContext)
├─ lib/           Pure logic (seo, schema, i18n, blog-registry, products)
└─ styles/        Non-tailwind CSS (blog-prose.css)
edit/             Patch scripts + .tsx.txt templates (NOT shipped)
public/           Static assets
```

## Content model

- **Blog articles are standalone TSX pages** at `src/app/blog/<slug>/page.tsx`
- Article-specific interactive components live in `src/components/blog/article-NN/`
- Reusable blocks (TLDRBox, FAQ, ComparisonTable…) in `src/components/blog/blocks/`
- Registry at `src/lib/blog-registry.ts` — build fails if `cluster` or `searchKeywords` are missing

## SEO infrastructure

- `/sitemap.xml`, `/robots.txt` dynamic
- `/opengraph-image` default OG card
- JSON-LD: Organization, WebSite (site-wide), Article + BreadcrumbList (blog), Service + FAQPage (products)
- Hreflang scaffold via `src/lib/i18n.ts` + `<Hreflang />` + `<LocalizedLink />` (EN only in Phase 0)
- Author EEAT page: `/yang-ruosong`

## Deploy

Vercel → import the GitHub repo. If this is a subdirectory of a larger repo, set **Root Directory** accordingly.

Required env vars in Vercel:
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `LEAD_NOTIFY_TO`
- `NEXT_PUBLIC_CLARITY_ID`

## Workflow conventions

All subsequent code changes delivered as `edit/deploy-*.mjs` patch scripts + `edit/*.tsx.txt` templates.
Run from project root: `node edit/deploy-xxx.mjs`.
