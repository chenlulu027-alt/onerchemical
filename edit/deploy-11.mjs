#!/usr/bin/env node
// deploy-11.mjs — Article 11: Preservative CoA Batch Consistency
// Run from project root:  node edit/deploy-11.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';

const SLUG = 'preservative-coa-batch-consistency';
const ART_DIR = 'article-11';
const ROOT = process.cwd();

const copy = (fromRel, toRel) => {
  const from = join(ROOT, fromRel);
  const to = join(ROOT, toRel);
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, readFileSync(from, 'utf8'));
  console.log(`  ✓ ${toRel}`);
};

console.log(`\n[deploy-11] Deploying article-11 (${SLUG})\n`);

// 1. page.tsx
copy(
  `edit/page-article-11-${SLUG}.tsx.txt`,
  `src/app/blog/${SLUG}/page.tsx`
);

// 2. interactive components
copy(
  `edit/BatchDriftTracker.tsx.txt`,
  `src/components/blog/${ART_DIR}/BatchDriftTracker.tsx`
);
copy(
  `edit/SupplierAuditScorecard.tsx.txt`,
  `src/components/blog/${ART_DIR}/SupplierAuditScorecard.tsx`
);

// 3. registry entry via v2 helper
console.log(`\n[deploy-11] Patching blog-registry.ts via registry-patch.mjs v2\n`);
try {
  execSync(`node edit/registry-patch.mjs edit/registry-entry-11.ts.txt --dry`, { stdio: 'inherit' });
  execSync(`node edit/registry-patch.mjs edit/registry-entry-11.ts.txt`, { stdio: 'inherit' });
} catch (e) {
  console.error(`\n[deploy-11] Registry patch failed. Restore from src/lib/blog-registry.ts.bak if needed.`);
  process.exit(1);
}

// 4. reciprocal internal-link reminder
console.log(`
[deploy-11] DONE. Manual follow-ups:

  1. Add Hero image at: public/images/blog/article-11/hero.jpg
     Midjourney prompt: see DELIVERY-11.md

  2. Reciprocal internal-link backfill (add link to this article's
     Related Reading section on these 4 pages):
       - src/app/blog/phenoxyethanol-supplier-guide/page.tsx
       - src/app/blog/1-2-hexanediol-supplier-guide/page.tsx
       - src/app/blog/iso-11930-challenge-test-protocol/page.tsx
       - src/app/blog/phenoxyethanol-vs-1-2-hexanediol/page.tsx
     Anchor: "Preservative CoA Batch Consistency"
     Href:   /blog/${SLUG}

  3. npm run build          (verify locally before push)
  4. git add . && git commit -m "feat(blog): add article-11 preservative-coa-batch-consistency"
  5. git push               (Vercel auto-deploys)

  6. Post-publish:
     - Submit URL to Google Search Console
     - Add internal link from /yang-ruosong/ 'recent articles' section
     - 1-week cannibalization re-check vs onerchem.com /knowledge/sourcing/how-to-read-cosmetic-ingredient-coa/
`);
