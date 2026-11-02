#!/usr/bin/env node
/**
 * deploy-09.mjs — Phenoxyethanol Supplier Guide (article-09, first SG, first sourcing cluster article)
 *
 * Usage: node edit/deploy-09.mjs
 *
 * Prereqs (MANDATORY, DO THESE FIRST):
 *   1. Add 'sourcing' to ClusterKey enum in src/lib/blog-registry.ts
 *   2. Add 'sourcing' entry to CLUSTERS record in src/lib/blog-registry.ts
 *   3. If /blog page tabs are hard-coded, add 'sourcing' there
 *   4. If JsonLd/breadcrumb has hard-coded cluster switch, add 'sourcing' case
 *   5. npm run build locally to confirm enum change compiles before running this script
 *
 * This script:
 *   - Copies page.tsx to src/app/blog/phenoxyethanol-supplier-guide/page.tsx
 *   - Copies the 2 interactive components to src/components/blog/article-09/
 *   - Prints registry-patch command and reciprocal internal-link backfill TODO
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

const SLUG = 'phenoxyethanol-supplier-guide';
const ARTICLE_NUM = '09';

const COPIES = [
  {
    from: 'edit/page-article-09-phenoxyethanol-supplier-guide.tsx.txt',
    to: `src/app/blog/${SLUG}/page.tsx`,
    label: 'page.tsx',
  },
  {
    from: 'edit/component-article-09-PhenoxyPriceBenchmarkTable.tsx.txt',
    to: `src/components/blog/article-${ARTICLE_NUM}/PhenoxyPriceBenchmarkTable.tsx`,
    label: 'PhenoxyPriceBenchmarkTable.tsx',
  },
  {
    from: 'edit/component-article-09-SupplierTierDecisionMatrix.tsx.txt',
    to: `src/components/blog/article-${ARTICLE_NUM}/SupplierTierDecisionMatrix.tsx`,
    label: 'SupplierTierDecisionMatrix.tsx',
  },
];

console.log('='.repeat(70));
console.log(`deploy-${ARTICLE_NUM}.mjs — ${SLUG}`);
console.log('='.repeat(70));

let errors = 0;
for (const { from, to, label } of COPIES) {
  const srcPath = join(PROJECT_ROOT, from);
  const dstPath = join(PROJECT_ROOT, to);

  if (!existsSync(srcPath)) {
    console.error(`  [ERR] source missing: ${from}`);
    errors += 1;
    continue;
  }

  mkdirSync(dirname(dstPath), { recursive: true });
  const content = readFileSync(srcPath, 'utf8');
  writeFileSync(dstPath, content, 'utf8');
  console.log(`  [OK]  ${label.padEnd(40)} → ${to}`);
}

if (errors > 0) {
  console.error(`\n${errors} source file(s) missing. Abort.`);
  process.exit(2);
}

console.log('\n' + '─'.repeat(70));
console.log('NEXT STEPS');
console.log('─'.repeat(70));

console.log(`
1. CLUSTER ENUM CHECK (must have been done BEFORE running this script):
   - src/lib/blog-registry.ts ClusterKey includes 'sourcing'
   - CLUSTERS object has sourcing entry
   - If build fails on cluster="sourcing" type error, you forgot this step

2. Register the article in blog-registry.ts:
   node edit/registry-patch.mjs edit/registry-entry-09.ts.txt --dry
   # inspect insertIdx + context, then:
   node edit/registry-patch.mjs edit/registry-entry-09.ts.txt

3. Build locally:
   npm run build
   # confirms: cluster enum change OK, article registered, page compiles

4. RECIPROCAL INTERNAL-LINK BACKFILL — add link to this SG from these articles:
   src/app/blog/phenoxyethanol-technical-guide/page.tsx
     → in the sourcing / supplier / 100kg procurement section, add:
       <Link href="/blog/phenoxyethanol-supplier-guide">
         phenoxyethanol supplier guide — 100kg procurement playbook
       </Link>

   src/app/blog/phenoxyethanol-vs-1-2-hexanediol/page.tsx
     → in the sourcing / procurement economics section, add:
       <Link href="/blog/phenoxyethanol-supplier-guide">
         100kg phenoxyethanol procurement playbook
       </Link>

   src/app/blog/phenoxyethanol-ethylhexylglycerin-combination/page.tsx
     → in the sourcing / supplier section (if any), add link to SG

5. Commit + push:
   git add -A
   git commit -m "feat(article-09): phenoxyethanol supplier guide, first sourcing-cluster SG"
   git push

6. Vercel preview check:
   - /blog list page: cluster filter now shows 'Sourcing' option, article appears
   - /blog/phenoxyethanol-supplier-guide renders without hydration errors
   - PhenoxyPriceBenchmarkTable: tier filter + quantity dropdown works, prices update
   - SupplierTierDecisionMatrix: all 4 sliders drive the live re-ranking
   - FAQ accordion opens / closes
   - BreadcrumbList schema: Home > Blog > Sourcing > Phenoxyethanol Supplier Guide

7. Update memory registry:
   Add to /projects/.../sites/onerchemical/publication-registry.md:
   - [stated] phenoxyethanol-sg | phenoxyethanol supplier | /blog/phenoxyethanol-supplier-guide | 2026-10-28 | sourcing | SG | live
`);

console.log('─'.repeat(70));
console.log('Done.');
