#!/usr/bin/env node
/**
 * deploy-pillar-03.mjs
 * Deploys Pillar #3 (preservation-regulations) to onerchemical.com
 * Run from project root: D:\桌面\onerchemical\
 *
 *   node edit/deploy-pillar-03.mjs
 *
 * This script:
 *   1. Creates target directories (idempotent)
 *   2. Writes page.tsx (pillar page) to src/app/guide/preservation-regulations/page.tsx
 *   3. Writes 2 interactive components to src/components/blog/pillar-03/
 *   4. Replaces src/app/api/lead-magnet/route.ts  (topic routing added — backward compatible)
 *   5. Replaces src/components/blog/blocks/LeadMagnetCTA.tsx  (sends topic in POST body)
 *   6. Copies regulatory checklist PDF to public/downloads/
 *   7. Patches src/lib/blog-registry.ts via registry-patch.mjs v2
 *   8. Prints reciprocal internal-link backfill checklist (9 manual edits)
 *
 * Before running:
 *   - Backups of lead-magnet/route.ts and LeadMagnetCTA.tsx are made to .bak alongside originals
 *   - Diff them against your current version — if your current LeadMagnetCTA already sends `topic`
 *     in the POST body, skip step 5 (just restore .bak)
 *   - Run `node edit/registry-patch.mjs edit/registry-entry-pillar-03.ts.txt --dry` first to sanity-check
 *   - Then: npm run build (verify) → git add -A → git commit → git push
 */

import { mkdirSync, copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const EDIT = resolve(ROOT, 'edit');

function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

function writeFromTemplate(templatePath, destPath, label) {
  const src = resolve(EDIT, templatePath);
  if (!existsSync(src)) {
    console.error(`FAIL  template missing: ${src}`);
    process.exit(2);
  }
  ensureDir(destPath);
  const content = readFileSync(src, 'utf8');
  writeFileSync(destPath, content, 'utf8');
  console.log(`OK    ${label.padEnd(48)}  ${destPath}`);
}

function backupThenReplace(templatePath, destPath, label) {
  if (existsSync(destPath)) {
    const bak = `${destPath}.bak`;
    copyFileSync(destPath, bak);
    console.log(`BAK   ${label.padEnd(48)}  ${bak}`);
  }
  writeFromTemplate(templatePath, destPath, label);
}

function copyBinary(srcRel, destRel, label) {
  const src = resolve(ROOT, srcRel);
  const dest = resolve(ROOT, destRel);
  if (!existsSync(src)) {
    console.error(`FAIL  binary missing: ${src}`);
    process.exit(2);
  }
  ensureDir(dest);
  copyFileSync(src, dest);
  console.log(`OK    ${label.padEnd(48)}  ${dest}`);
}

console.log('--- deploy-pillar-03.mjs ---');
console.log(`cwd: ${ROOT}`);
console.log('');

// 1. Pillar page
writeFromTemplate(
  'page-pillar-03-preservation-regulations.tsx.txt',
  resolve(ROOT, 'src/app/guide/preservation-regulations/page.tsx'),
  'Pillar #3 page.tsx',
);

// 2. Interactive components
writeFromTemplate(
  'InteractiveMarketComparator.tsx.txt',
  resolve(ROOT, 'src/components/blog/pillar-03/InteractiveMarketComparator.tsx'),
  'InteractiveMarketComparator.tsx',
);
writeFromTemplate(
  'PreservativeMarketLegalityMatrix.tsx.txt',
  resolve(ROOT, 'src/components/blog/pillar-03/PreservativeMarketLegalityMatrix.tsx'),
  'PreservativeMarketLegalityMatrix.tsx',
);

// 3. API route update (backward compatible — topic routing)
backupThenReplace(
  'lead-magnet-route-updated.ts.txt',
  resolve(ROOT, 'src/app/api/lead-magnet/route.ts'),
  'API route (topic routing)',
);

// 4. LeadMagnetCTA component update (sends topic in POST)
backupThenReplace(
  'LeadMagnetCTA-updated.tsx.txt',
  resolve(ROOT, 'src/components/blog/blocks/LeadMagnetCTA.tsx'),
  'LeadMagnetCTA.tsx (sends topic)',
);

// 5. Lead magnet PDF (copy from edit sibling dir into public/downloads)
copyBinary(
  'public/downloads/onerchemical-5-market-preservative-compliance-checklist.pdf',
  'public/downloads/onerchemical-5-market-preservative-compliance-checklist.pdf',
  '5-Market Compliance Checklist PDF',
);
// (The PDF is already in public/downloads from the ZIP extraction; this step is a no-op integrity check.)

// 6. Registry patch
console.log('');
console.log('--- registry patch ---');
const patchResult = spawnSync(
  'node',
  [resolve(EDIT, 'registry-patch.mjs'), resolve(EDIT, 'registry-entry-pillar-03.ts.txt')],
  { stdio: 'inherit' },
);
if (patchResult.status !== 0) {
  console.error('FAIL  registry-patch.mjs exited non-zero. Pillar #3 registry entry NOT inserted.');
  console.error('      Fix the patch, or paste the entry manually at ARTICLES[0] in src/lib/blog-registry.ts.');
  process.exit(patchResult.status ?? 3);
}

// 7. Reciprocal internal-link backfill checklist
console.log('');
console.log('--- reciprocal internal-link backfill (9 manual edits) ---');
console.log('');
console.log('  Pillar #3 outbound links are already in page.tsx. The following files need an');
console.log('  INBOUND link to Pillar #3 added (upstream reference OR cross-link in Related Reading).');
console.log('');
console.log('  Edit each file in src/app/blog/<slug>/page.tsx:');
console.log('');
console.log('  1. eu-annex-v-preservative-compliance-guide/page.tsx');
console.log('     → At top of body, add an "upstream" callout linking to /guide/preservation-regulations');
console.log('     → Reason: Pillar #3 Section 2 + Related Reading already link to this; reciprocate.');
console.log('');
console.log('  2. preservative-coa-batch-consistency/page.tsx');
console.log('     → Related Reading: add Pillar #3 link');
console.log('');
console.log('  3. iso-11930-challenge-test-protocol/page.tsx');
console.log('     → Related Reading: add Pillar #3 link');
console.log('');
console.log('  4. phenoxyethanol-technical-guide/page.tsx');
console.log('     → 5-market section bottom: add "cross-market view" link to Pillar #3');
console.log('');
console.log('  5. ethylhexylglycerin-technical-guide/page.tsx');
console.log('     → 5-market section bottom: add Pillar #3 link');
console.log('');
console.log('  6. caprylhydroxamic-acid-technical-guide/page.tsx');
console.log('     → 5-market section bottom: add Pillar #3 link');
console.log('');
console.log('  7. 1-2-hexanediol-technical-guide/page.tsx');
console.log('     → 5-market section bottom: add Pillar #3 link');
console.log('');
console.log('  8. ../guide/cosmetic-preservatives/page.tsx  (Pillar #1)');
console.log('     → "Grade matters" section: add 1-line down-link to /guide/preservation-regulations');
console.log('');
console.log('  9. ../guide/preservative-sourcing/page.tsx  (Pillar #2)');
console.log('     → 6-doc compliance section: add 1-line link to Pillar #3 for cross-market regulatory depth');
console.log('');
console.log('--- deploy-pillar-03.mjs complete ---');
console.log('');
console.log('Next steps (manual):');
console.log('  1. Diff lead-magnet/route.ts.bak vs new — ensure your current RESEND_API_KEY env is unchanged');
console.log('  2. Diff LeadMagnetCTA.tsx.bak vs new — if your current already sends `topic`, revert from .bak');
console.log('  3. npm run build  (local verify)');
console.log('  4. Verify: curl http://localhost:3000/guide/preservation-regulations returns 200');
console.log('  5. Verify: test /api/lead-magnet with { email, topic: "regulatory" } serves the right PDF');
console.log('  6. git add -A && git commit -m "feat(pillar-03): preservation regulations 5-market compliance pillar"');
console.log('  7. git push');
console.log('  8. Manual reciprocal backfill (list above) — bundle with next deploy or standalone commit');
