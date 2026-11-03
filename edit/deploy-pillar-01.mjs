#!/usr/bin/env node
/**
 * Deploy script for Pillar #1 — Cosmetic Preservatives Guide
 *
 * Writes:
 *   - src/app/guide/cosmetic-preservatives/page.tsx
 *   - src/components/blog/pillar-01/PreservativeIdentityRouter.tsx
 *   - src/components/blog/pillar-01/PreservativeSelectionMatrix.tsx
 *   - src/components/blog/pillar-01/PreservativeChecklistLeadMagnet.tsx
 *   - src/app/api/lead-magnet/route.ts
 *   - public/downloads/onerchemical-preservative-procurement-checklist.pdf
 *
 * Also patches:
 *   - src/lib/blog-registry.ts   (via edit/registry-patch.mjs v2)
 *
 * Prints reciprocal internal-link backfill instructions at the end.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const EDIT_DIR = path.dirname(__filename);
const ROOT = path.resolve(EDIT_DIR, '..');

const log = (m) => console.log(`[deploy-pillar-01] ${m}`);

function copy(srcName, destRel) {
  const src = path.join(EDIT_DIR, srcName);
  const dest = path.join(ROOT, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const content = fs.readFileSync(src);
  fs.writeFileSync(dest, content);
  log(`wrote ${destRel}`);
}

copy(
  'page-pillar-01-cosmetic-preservatives.tsx.txt',
  'src/app/guide/cosmetic-preservatives/page.tsx',
);
copy(
  'PreservativeIdentityRouter.tsx.txt',
  'src/components/blog/pillar-01/PreservativeIdentityRouter.tsx',
);
copy(
  'PreservativeSelectionMatrix.tsx.txt',
  'src/components/blog/pillar-01/PreservativeSelectionMatrix.tsx',
);
copy(
  'PreservativeChecklistLeadMagnet.tsx.txt',
  'src/components/blog/pillar-01/PreservativeChecklistLeadMagnet.tsx',
);
copy('api-lead-magnet-route.ts.txt', 'src/app/api/lead-magnet/route.ts');

// Copy PDF — it ships alongside the edit folder in the ZIP
const pdfSrc = path.join(
  ROOT,
  'public',
  'downloads',
  'onerchemical-preservative-procurement-checklist.pdf',
);
const pdfDest = path.join(
  ROOT,
  'public',
  'downloads',
  'onerchemical-preservative-procurement-checklist.pdf',
);
if (fs.existsSync(pdfSrc)) {
  // same path — already in place after ZIP extraction, no-op
  log('PDF already at public/downloads/');
} else {
  log('WARN: PDF not found at public/downloads/ — re-extract the ZIP');
}

// Registry patch via helper (expects edit/registry-patch.mjs v2 in repo)
const registryHelper = path.join(ROOT, 'edit', 'registry-patch.mjs');
const entryFile = path.join(EDIT_DIR, 'registry-entry-13.ts.txt');
if (fs.existsSync(registryHelper)) {
  log('running registry-patch.mjs --dry');
  execSync(`node "${registryHelper}" "${entryFile}" --dry`, { stdio: 'inherit' });
  log('running registry-patch.mjs (live)');
  execSync(`node "${registryHelper}" "${entryFile}"`, { stdio: 'inherit' });
} else {
  log(
    'WARN: edit/registry-patch.mjs not found — paste registry-entry-13.ts.txt into src/lib/blog-registry.ts ARTICLES[0] manually',
  );
}

log('— done —');
log('');
log('NEXT STEPS:');
log('1. Verify Resend env vars in Vercel: RESEND_API_KEY, LEAD_NOTIFY_TO (optional)');
log('2. Add env for build: npm run build (local check)');
log('3. git add . && git commit -m "feat(pillar-01): cosmetic preservatives guide + lead magnet"');
log('4. git push');
log('');
log('RECIPROCAL BACKFILL — add outbound link to /guide/cosmetic-preservatives in these 7 files Related Reading section:');
log('  - src/app/blog/phenoxyethanol-technical-guide/page.tsx');
log('  - src/app/blog/1-2-hexanediol-technical-guide/page.tsx');
log('  - src/app/blog/caprylhydroxamic-acid-technical-guide/page.tsx');
log('  - src/app/blog/ethylhexylglycerin-technical-guide/page.tsx');
log('  - src/app/blog/phenoxyethanol-ethylhexylglycerin-combination/page.tsx');
log('  - src/app/blog/iso-11930-challenge-test-protocol/page.tsx');
log('  - src/app/blog/how-to-preserve-cosmetic-emulsion/page.tsx');
log('  - src/app/blog/preservative-coa-batch-consistency/page.tsx');
log('  - src/app/blog/eu-annex-v-preservative-compliance-guide/page.tsx');
log('  - src/app/blog/phenoxyethanol-vs-1-2-hexanediol/page.tsx');
log('  - src/app/blog/phenoxyethanol-supplier-guide/page.tsx');
log('  - src/app/blog/1-2-hexanediol-supplier-guide/page.tsx');
log('  Anchor text suggestion: "complete cosmetic preservatives selection guide"');
log('');
log('HERO IMAGE: upload Midjourney output to public/images/blog/pillar-01-cosmetic-preservatives-hero.jpg');
log('   (see DELIVERY-pillar-01.md for the prompt)');
