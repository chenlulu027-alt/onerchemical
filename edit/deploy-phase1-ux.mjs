#!/usr/bin/env node
/**
 * Phase 1 UX deploy — animations, blog TOC, global search.
 *
 * Run from project root:
 *   node edit/deploy-phase1-ux.mjs
 *   npm install        # motion + fuse.js
 *   npm run dev
 *
 * Idempotent: re-running overwrites targets with the current template content.
 * It does NOT delete files it did not place.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/* --------------------------------------------------------------------- */
/* 1. File placements: template → target                                 */
/* --------------------------------------------------------------------- */

const FILES = [
  // new modules
  { from: 'lib-toc.ts.txt',                        to: 'src/lib/toc.ts' },
  { from: 'component-ui-animations.tsx.txt',       to: 'src/components/ui/animations.tsx' },
  { from: 'component-blog-toc.tsx.txt',            to: 'src/components/blog/TOC.tsx' },
  { from: 'component-search.tsx.txt',              to: 'src/components/search/Search.tsx' },
  { from: 'scripts-build-search-index.mjs.txt',    to: 'scripts/build-search-index.mjs' },
  { from: 'page-search.tsx.txt',                   to: 'src/app/search/page.tsx' },
  { from: 'component-search-page-client.tsx.txt',  to: 'src/app/search/SearchPageClient.tsx' },
  { from: 'page-home-client.tsx.txt',              to: 'src/app/HomeClient.tsx' },

  // overwrites
  { from: 'lib-blog-registry.ts.txt',              to: 'src/lib/blog-registry.ts' },
  { from: 'component-blog-article-layout.tsx.txt', to: 'src/components/blog/BlogArticleLayout.tsx' },
  { from: 'component-blog-blocks-faq.tsx.txt',     to: 'src/components/blog/blocks/FAQ.tsx' },
  { from: 'component-header.tsx.txt',              to: 'src/components/layout/Header.tsx' },
  { from: 'component-quote-modal.tsx.txt',         to: 'src/components/QuoteModal.tsx' },
  { from: 'app-layout.tsx.txt',                    to: 'src/app/layout.tsx' },
  { from: 'page-home.tsx.txt',                     to: 'src/app/page.tsx' },
  { from: 'component-blog-list-client.tsx.txt',    to: 'src/app/blog/BlogListClient.tsx' },
  { from: 'page-article-01.tsx.txt',               to: 'src/app/blog/phenoxyethanol-ethylhexylglycerin-combination/page.tsx' },
];

let placed = 0;
for (const { from, to } of FILES) {
  const srcPath = resolve(__dirname, from);
  if (!existsSync(srcPath)) {
    console.error(`✗ missing template: ${from}`);
    process.exit(1);
  }
  const content = readFileSync(srcPath, 'utf8');
  const dest = resolve(ROOT, to);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
  console.log(`✓ ${to}`);
  placed++;
}

/* --------------------------------------------------------------------- */
/* 2. package.json patch — add deps + prebuild hook                      */
/* --------------------------------------------------------------------- */

const pkgPath = resolve(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const ADD_DEPS = {
  'motion': '11.11.17',
  'fuse.js': '7.0.0',
};
pkg.dependencies = { ...pkg.dependencies, ...ADD_DEPS };

pkg.scripts = {
  ...pkg.scripts,
  prebuild: 'node scripts/build-search-index.mjs',
  'build:index': 'node scripts/build-search-index.mjs',
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ package.json (deps + prebuild script)');

/* --------------------------------------------------------------------- */
/* 3. Build the search index now (so dev also sees it)                   */
/* --------------------------------------------------------------------- */

try {
  const { execSync } = await import('node:child_process');
  execSync('node scripts/build-search-index.mjs', { cwd: ROOT, stdio: 'inherit' });
} catch (e) {
  console.warn('⚠ Could not run build-search-index.mjs now:', e.message);
  console.warn('  Run it manually: node scripts/build-search-index.mjs');
}

/* --------------------------------------------------------------------- */

console.log(`\nDone — ${placed} files placed.`);
console.log('\nNext steps:');
console.log('  1. npm install          # pulls motion + fuse.js');
console.log('  2. npm run dev          # http://localhost:3000');
console.log('  3. Try ⌘K / Ctrl K to open search; scroll the article for TOC + progress bar.');
