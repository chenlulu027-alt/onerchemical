#!/usr/bin/env node
// deploy-pillar-02.mjs — Onerchemical Pillar #2 (Sourcing)
// Run from project root: node edit/deploy-pillar-02.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const SLUG = 'cosmetic-preservative-supplier-sourcing';
const EDIT = join(ROOT, 'edit');

function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}
function cp(src, dst) {
  ensureDir(dst);
  const content = readFileSync(join(EDIT, src), 'utf8');
  writeFileSync(dst, content);
  console.log(`  wrote ${dst} (${content.length} bytes)`);
}

console.log('[pillar-02] Deploying Pillar #2 — Preservative Sourcing');

// 1. Page
cp(
  'page-pillar-02-preservative-sourcing.tsx.txt',
  join(ROOT, 'src/app/guide/preservative-sourcing/page.tsx'),
);

// 2. Interactive components
cp(
  'SupplierTypeDecoder.tsx.txt',
  join(ROOT, 'src/components/blog/pillar-02/SupplierTypeDecoder.tsx'),
);
cp(
  'SourcingDecisionWizard.tsx.txt',
  join(ROOT, 'src/components/blog/pillar-02/SourcingDecisionWizard.tsx'),
);

// 3. Registry entry (via registry-patch.mjs v2)
console.log('[pillar-02] Patching src/lib/blog-registry.ts via registry-patch.mjs');
const patch = spawnSync(
  'node',
  [join(EDIT, 'registry-patch.mjs'), join(EDIT, 'registry-entry-pillar-02.ts.txt')],
  { stdio: 'inherit' },
);
if (patch.status !== 0) {
  console.error(`[pillar-02] registry-patch exited ${patch.status}`);
  process.exit(patch.status || 1);
}

// 4. Reciprocal backfill reminders
console.log('\n[pillar-02] RECIPROCAL BACKFILL — add Pillar #2 link to Related Reading in:');
const backfillTargets = [
  'src/app/blog/phenoxyethanol-supplier-guide/page.tsx',
  'src/app/blog/1-2-hexanediol-supplier-guide/page.tsx',
  'src/app/blog/preservative-coa-batch-consistency/page.tsx',
  'src/app/blog/eu-annex-v-preservative-compliance-guide/page.tsx',
  'src/app/blog/iso-11930-challenge-test-protocol/page.tsx',
];
backfillTargets.forEach((p, i) => {
  const exists = existsSync(join(ROOT, p));
  console.log(`  ${i + 1}. ${p} ${exists ? '[exists]' : '[not found — skip]'}`);
});
console.log(
  '\n  Anchor: "Cosmetic Preservative Supplier Sourcing — The 2026 Procurement Playbook"\n  Href:   /guide/preservative-sourcing/',
);

// 5. Pillar #1 cross-link
console.log('\n[pillar-02] PILLAR #1 CROSS-LINK — add Pillar #2 link under /guide/cosmetic-preservatives/ grade-matters section');
console.log('  file: src/app/guide/cosmetic-preservatives/page.tsx');

console.log('\n[pillar-02] Next steps:');
console.log('  1) npm run build  (verify no type/JSX errors)');
console.log('  2) git add -A && git commit -m "feat(pillar-02): preservative sourcing playbook"');
console.log('  3) git push');
console.log('  4) Manual backfill per list above (5 live + 1 Pillar #1 = 6 files)');
console.log('\n[pillar-02] Done.');
