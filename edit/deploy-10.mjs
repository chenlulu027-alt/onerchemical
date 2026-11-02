#!/usr/bin/env node
/**
 * deploy-10.mjs — Article 10: 1,2-Hexanediol Supplier Guide
 *
 * Run from onerchemical project root:
 *   node edit/deploy-10.mjs
 *
 * What it does (idempotent):
 *   1. Reads 3 .tsx.txt templates in edit/ and writes:
 *      - src/app/blog/1-2-hexanediol-supplier-guide/page.tsx
 *      - src/components/blog/article-10/HexanediolPriceBenchmarkTable.tsx
 *      - src/components/blog/article-10/HexanediolSupplierTierDecisionMatrix.tsx
 *   2. Shells out to edit/registry-patch.mjs v2 to insert registry-entry-10.ts.txt
 *      at ARTICLES[0] in src/lib/blog-registry.ts.
 *   3. Prints reciprocal internal-link backfill instructions for 3 live pages.
 *
 * Prerequisites in repo (already present as of article-09):
 *   - edit/registry-patch.mjs (v2) is executable from Node 18+
 *   - src/lib/blog-registry.ts contains the ARTICLES: BlogArticle[] = [ ... ] array
 *   - ClusterKey already includes 'sourcing' (added for article-09)
 *
 * Exit codes:
 *   0 success / 1 missing template / 2 I/O error / 3 registry-patch failed
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SLUG = '1-2-hexanediol-supplier-guide';
const ARTICLE_DIR_NAME = 'article-10';

const TEMPLATES = [
  {
    src: 'edit/page-article-10-hexanediol-sg.tsx.txt',
    dest: `src/app/blog/${SLUG}/page.tsx`,
  },
  {
    src: 'edit/HexanediolPriceBenchmarkTable.tsx.txt',
    dest: `src/components/blog/${ARTICLE_DIR_NAME}/HexanediolPriceBenchmarkTable.tsx`,
  },
  {
    src: 'edit/HexanediolSupplierTierDecisionMatrix.tsx.txt',
    dest: `src/components/blog/${ARTICLE_DIR_NAME}/HexanediolSupplierTierDecisionMatrix.tsx`,
  },
];

const REGISTRY_ENTRY = 'edit/registry-entry-10.ts.txt';
const REGISTRY_PATCH = 'edit/registry-patch.mjs';

function log(msg) {
  process.stdout.write(`[deploy-10] ${msg}\n`);
}
function warn(msg) {
  process.stderr.write(`[deploy-10] WARN: ${msg}\n`);
}
function die(code, msg) {
  process.stderr.write(`[deploy-10] FATAL: ${msg}\n`);
  process.exit(code);
}

// --- Step 1: write page.tsx + 2 TSX components -----------------------------
log('Step 1/3 — writing templates to src/');
for (const { src, dest } of TEMPLATES) {
  const srcPath = join(ROOT, src);
  const destPath = join(ROOT, dest);
  if (!existsSync(srcPath)) die(1, `template not found: ${src}`);
  try {
    const content = readFileSync(srcPath, 'utf8');
    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, content, 'utf8');
    log(`  wrote ${dest} (${content.length} bytes)`);
  } catch (e) {
    die(2, `failed to write ${dest}: ${e.message}`);
  }
}

// --- Step 2: insert registry entry via registry-patch.mjs v2 ---------------
log('Step 2/3 — inserting registry entry via registry-patch.mjs');
const registryEntryPath = join(ROOT, REGISTRY_ENTRY);
const registryPatchPath = join(ROOT, REGISTRY_PATCH);
if (!existsSync(registryEntryPath)) die(1, `registry entry not found: ${REGISTRY_ENTRY}`);
if (!existsSync(registryPatchPath)) die(1, `registry-patch helper not found: ${REGISTRY_PATCH}`);

try {
  // Dry-run first for sanity
  log('  dry-run first…');
  execFileSync('node', [registryPatchPath, registryEntryPath, '--dry'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  // Real insert
  log('  real insert…');
  execFileSync('node', [registryPatchPath, registryEntryPath], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  log('  registry patched (backup at src/lib/blog-registry.ts.bak)');
} catch (e) {
  const code = e.status ?? 3;
  if (code === 3) {
    warn('registry-patch exited 3 (duplicate slug) — assuming already inserted, continuing');
  } else {
    die(3, `registry-patch failed with code ${code}: ${e.message}`);
  }
}

// --- Step 3: reciprocal internal-link backfill instructions ---------------
log('Step 3/3 — reciprocal internal-link backfill (MANUAL step for Albar)');
const BACKFILLS = [
  {
    file: 'src/app/blog/1-2-hexanediol-technical-guide/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">1,2-Hexanediol Supplier Guide</a> — 2026 price benchmarks, CoA red flags, 100kg MOQ playbook.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/phenoxyethanol-vs-1-2-hexanediol/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">1,2-Hexanediol Supplier Guide</a> — once you have decided on hexanediol, this is the sourcing playbook.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/phenoxyethanol-supplier-guide/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">1,2-Hexanediol Supplier Guide</a> — sister sourcing guide, same tier framework applied to hexanediol.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
];

process.stdout.write('\n');
log('==== RECIPROCAL BACKFILL (edit by hand after npm run build passes) ====\n');
for (const b of BACKFILLS) {
  process.stdout.write(`\n  FILE:   ${b.file}\n`);
  process.stdout.write(`  WHERE:  ${b.anchor}\n`);
  process.stdout.write(`  INSERT: ${b.insert}\n`);
}
process.stdout.write('\n');
log('========================================================================');

process.stdout.write('\n');
log('✅ deploy-10 complete.');
log('Next: npm run build (locally), then git add src/ && git commit && git push.');
log('If the build fails on ARTICLES-array regex, restore src/lib/blog-registry.ts.bak and investigate.');
