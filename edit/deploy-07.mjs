#!/usr/bin/env node
/**
 * deploy-07.mjs — Onerchemical article-07 deploy script
 *
 * Deploys:
 *   - edit/page-article-07-emulsion-preservation.tsx.txt
 *       -> src/app/blog/how-to-preserve-cosmetic-emulsion/page.tsx
 *   - edit/EmulsionPreservationSelector.tsx (if present in edit/) OR already in src/components/blog/article-07/
 *   - edit/EmulsifierCompatibilityGrid.tsx (same)
 *
 * Then prints the two commands the operator must run next:
 *   1) node edit/registry-patch.mjs edit/registry-entry-07.ts.txt --dry
 *   2) node edit/registry-patch.mjs edit/registry-entry-07.ts.txt
 *
 * Finally prints the reciprocal internal-link backfill list.
 *
 * Usage: node edit/deploy-07.mjs
 * Run from project root (D:\桌面\onerchemical\).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const ROOT = process.cwd();
const SLUG = 'how-to-preserve-cosmetic-emulsion';

const PAGE_SRC = resolve(ROOT, 'edit/page-article-07-emulsion-preservation.tsx.txt');
const PAGE_DST = resolve(ROOT, `src/app/blog/${SLUG}/page.tsx`);

const COMP_DIR_DST = resolve(ROOT, 'src/components/blog/article-07');

const COMPONENT_FILES = [
  'EmulsionPreservationSelector.tsx',
  'EmulsifierCompatibilityGrid.tsx',
];

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function writePage() {
  if (!existsSync(PAGE_SRC)) {
    console.error(`✗ Missing template: ${PAGE_SRC}`);
    process.exit(2);
  }
  ensureDir(dirname(PAGE_DST));
  const content = readFileSync(PAGE_SRC, 'utf8');
  writeFileSync(PAGE_DST, content, 'utf8');
  console.log(`✓ Wrote page: ${PAGE_DST} (${content.length} bytes)`);
}

function writeComponents() {
  ensureDir(COMP_DIR_DST);
  for (const name of COMPONENT_FILES) {
    const dst = join(COMP_DIR_DST, name);
    // Priority 1: already in src/components/blog/article-07/ (nothing to do)
    if (existsSync(dst)) {
      console.log(`✓ Component already present: ${dst}`);
      continue;
    }
    // Priority 2: look in edit/
    const srcInEdit = resolve(ROOT, 'edit', name);
    if (existsSync(srcInEdit)) {
      copyFileSync(srcInEdit, dst);
      console.log(`✓ Copied component: ${srcInEdit} -> ${dst}`);
      continue;
    }
    console.error(`✗ Missing component: ${name} (looked in ${dst} and ${srcInEdit})`);
    process.exit(2);
  }
}

function printNextSteps() {
  console.log('');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('NEXT STEPS — run from project root:');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('');
  console.log('  1) Dry-run the registry patch (sanity check insertIdx):');
  console.log('     node edit/registry-patch.mjs edit/registry-entry-07.ts.txt --dry');
  console.log('');
  console.log('  2) Apply the registry patch:');
  console.log('     node edit/registry-patch.mjs edit/registry-entry-07.ts.txt');
  console.log('');
  console.log('  3) Local build to catch the build-search-index.mjs ARTICLES regex:');
  console.log('     npm run build');
  console.log('');
  console.log('  4) Commit + push to deploy via Vercel.');
  console.log('');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('RECIPROCAL INTERNAL-LINK BACKFILL — add in the next deploy:');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('');
  console.log('  Each of the following existing article page.tsx files should get');
  console.log('  a link to /blog/how-to-preserve-cosmetic-emulsion in its');
  console.log('  "Related Reading" section (or equivalent in-body paragraph).');
  console.log('  This formulation guide is the natural hub for all 5 preservative TGs:');
  console.log('');
  console.log('   • src/app/blog/phenoxyethanol-technical-guide/page.tsx');
  console.log('   • src/app/blog/1-2-hexanediol-technical-guide/page.tsx');
  console.log('   • src/app/blog/caprylhydroxamic-acid-technical-guide/page.tsx');
  console.log('   • src/app/blog/ethylhexylglycerin-technical-guide/page.tsx');
  console.log('   • src/app/blog/phenoxyethanol-ethylhexylglycerin-combination/page.tsx');
  console.log('   • src/app/blog/iso-11930-challenge-test-protocol/page.tsx');
  console.log('');
  console.log('  Anchor text suggestions (vary — avoid identical anchors):');
  console.log('   - "a verified pairing for cosmetic emulsions"');
  console.log('   - "pick the right emulsion preservation system"');
  console.log('   - "how this pairing holds up in an oil-in-water base"');
  console.log('   - "when to use this preservative in a lotion"');
  console.log('');
}

function main() {
  console.log('── Onerchemical article-07 deploy ──');
  writePage();
  writeComponents();
  printNextSteps();
  console.log('✓ Done. (Registry patch NOT applied — run step 1/2 above manually.)');
}

main();
