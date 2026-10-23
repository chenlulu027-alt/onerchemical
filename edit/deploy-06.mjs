#!/usr/bin/env node
/**
 * edit/deploy-06.mjs
 * -------------------------------------------------------------
 * Writes article-06 (ISO 11930 Challenge Test Protocol) files
 * into the Next.js source tree, then triggers the registry patch.
 *
 * Run from project root:
 *   node edit/deploy-06.mjs
 *
 * Steps:
 *   1. Create src/components/blog/article-06/ (if missing)
 *   2. Write ChallengeTestDecisionWizard.tsx + StrainFailureMatrix.tsx
 *   3. Create src/app/blog/iso-11930-challenge-test-protocol/
 *   4. Write page.tsx
 *   5. Patch src/lib/blog-registry.ts via registry-patch.mjs
 *
 * Also triggers reciprocal internal-link backfill reminder printed
 * at the end — manual edit on the 4 prior article pages.
 * -------------------------------------------------------------
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SLUG = 'iso-11930-challenge-test-protocol';
const PROJECT_ROOT = resolve(__dirname, '..');

const FILES = [
  {
    source: 'ChallengeTestDecisionWizard.tsx.txt',
    target: `src/components/blog/article-06/ChallengeTestDecisionWizard.tsx`,
  },
  {
    source: 'StrainFailureMatrix.tsx.txt',
    target: `src/components/blog/article-06/StrainFailureMatrix.tsx`,
  },
  {
    source: `page-article-06-${SLUG}.tsx.txt`,
    target: `src/app/blog/${SLUG}/page.tsx`,
  },
];

function writeFile(sourcePath, targetPath) {
  const src = resolve(__dirname, sourcePath);
  const dst = resolve(PROJECT_ROOT, targetPath);
  mkdirSync(dirname(dst), { recursive: true });
  const content = readFileSync(src, 'utf8');
  writeFileSync(dst, content, 'utf8');
  console.log(`  wrote ${targetPath} (${content.length} bytes)`);
}

console.log('deploy-06: writing article-06 files...');
for (const { source, target } of FILES) {
  writeFile(source, target);
}

console.log('\ndeploy-06: patching blog-registry.ts...');
const patchResult = spawnSync(
  'node',
  [
    resolve(__dirname, 'registry-patch.mjs'),
    resolve(__dirname, 'registry-entry-06.ts'),
    `--registry=${resolve(PROJECT_ROOT, 'src/lib/blog-registry.ts')}`,
  ],
  { stdio: 'inherit' }
);

if (patchResult.status !== 0) {
  console.error('\ndeploy-06: registry patch FAILED — fix the error above and re-run.');
  console.error('deploy-06: article files are already written; registry is the only remaining step.');
  process.exit(patchResult.status ?? 4);
}

console.log('\n==============================================================');
console.log('deploy-06: article-06 deployment complete.');
console.log('==============================================================');
console.log('');
console.log('NEXT STEPS (manual):');
console.log('');
console.log('  1. Run `npm run dev` and open http://localhost:3000/blog/' + SLUG);
console.log('     Verify both interactive components render + TOC links scroll.');
console.log('');
console.log('  2. Run `npm run build` to confirm no TS errors.');
console.log('');
console.log('  3. Reciprocal internal-link backfill — add a link to this new');
console.log('     article in the Related Reading section of each of these');
console.log('     4 prior articles:');
console.log('');
console.log('       src/app/blog/phenoxyethanol-technical-guide/page.tsx');
console.log('       src/app/blog/ethylhexylglycerin-technical-guide/page.tsx');
console.log('       src/app/blog/caprylhydroxamic-acid-technical-guide/page.tsx');
console.log('       src/app/blog/1-2-hexanediol-technical-guide/page.tsx');
console.log('');
console.log('     Suggested link text:');
console.log('       <Link href="/blog/' + SLUG + '">');
console.log('         ISO 11930 challenge test protocol');
console.log('       </Link>');
console.log('       — when and how to run a preservative efficacy test for');
console.log('       the pairing you ship.');
console.log('');
console.log('  4. git add + commit + push for Vercel auto-deploy.');
console.log('');
