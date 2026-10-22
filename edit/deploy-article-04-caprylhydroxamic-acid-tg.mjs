#!/usr/bin/env node
/**
 * deploy-article-04-caprylhydroxamic-acid-tg.mjs
 *
 * Deploys the Caprylhydroxamic Acid Technical Guide (Article 04) into
 * the onerchemical.com Next.js project.
 *
 * Run from project root (D:\桌面\onerchemical\):
 *   node edit/deploy-article-04-caprylhydroxamic-acid-tg.mjs
 *
 * Writes:
 *   src/app/blog/caprylhydroxamic-acid-technical-guide/page.tsx
 *   src/components/blog/article-04/SpectrastatComparator.tsx
 *   src/components/blog/article-04/HurdlePairingMatrix.tsx
 *
 * Does NOT touch:
 *   src/lib/blog-registry.ts  — manually paste the entry from
 *   edit/templates/registry-entry-article-04.ts.txt into the ARTICLES
 *   array (newest-first).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const TEMPLATES = resolve(__dirname, 'templates');

const files = [
  {
    src: 'page-article-04-caprylhydroxamic-acid-tg.tsx.txt',
    dest: 'src/app/blog/caprylhydroxamic-acid-technical-guide/page.tsx',
  },
  {
    src: 'component-article-04-spectrastat-comparator.tsx.txt',
    dest: 'src/components/blog/article-04/SpectrastatComparator.tsx',
  },
  {
    src: 'component-article-04-hurdle-pairing-matrix.tsx.txt',
    dest: 'src/components/blog/article-04/HurdlePairingMatrix.tsx',
  },
];

let okCount = 0;
let skipCount = 0;

console.log(`[article-04] deploying from: ${TEMPLATES}`);
console.log(`[article-04] project root:   ${ROOT}`);
console.log('');

for (const f of files) {
  const srcPath = join(TEMPLATES, f.src);
  const destPath = join(ROOT, f.dest);

  if (!existsSync(srcPath)) {
    console.error(`  SKIP (missing template): ${f.src}`);
    skipCount++;
    continue;
  }

  const content = readFileSync(srcPath, 'utf8');
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, content, 'utf8');
  console.log(`  WROTE: ${f.dest}  (${content.length} bytes)`);
  okCount++;
}

console.log('');
console.log(`[article-04] done — ${okCount} written, ${skipCount} skipped`);
console.log('');
console.log('NEXT STEPS (manual):');
console.log('  1. Paste the registry entry from:');
console.log('     edit/templates/registry-entry-article-04.ts.txt');
console.log('     at the TOP of the ARTICLES array in src/lib/blog-registry.ts');
console.log('  2. Midjourney Hero → public/images/hero-caprylhydroxamic-acid.webp (1600×900, <180 KB)');
console.log('  3. npm run build && npm run dev');
console.log('     → http://localhost:3000/blog/caprylhydroxamic-acid-technical-guide');
console.log('  4. git add . && git commit -m "feat(blog): add caprylhydroxamic acid TG (article-04)" && git push');
