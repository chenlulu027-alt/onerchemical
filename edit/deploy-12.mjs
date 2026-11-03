#!/usr/bin/env node
/**
 * deploy-12.mjs — Article 12: EU Annex V Preservative Compliance Guide
 *
 * Run from onerchemical project root:
 *   node edit/deploy-12.mjs
 *
 * What it does (idempotent):
 *   1. Reads 3 .tsx.txt templates in edit/ and writes:
 *      - src/app/blog/eu-annex-v-preservative-compliance-guide/page.tsx
 *      - src/components/blog/article-12/AnnexVEntryDecoder.tsx
 *      - src/components/blog/article-12/CPSRDocumentationChecklist.tsx
 *   2. Shells out to edit/registry-patch.mjs v2 to insert registry-entry-12.ts.txt
 *      at ARTICLES[0] in src/lib/blog-registry.ts.
 *   3. Prints reciprocal internal-link backfill instructions for live pages.
 *
 * Prerequisites in repo (already present as of article-11):
 *   - edit/registry-patch.mjs (v2) is executable from Node 18+
 *   - src/lib/blog-registry.ts contains the ARTICLES: BlogArticle[] = [ ... ] array
 *   - ClusterKey already includes 'regulatory' (added for article-11)
 *   - CLUSTERS object already has a 'regulatory' entry (added for article-11)
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

const SLUG = 'eu-annex-v-preservative-compliance-guide';
const ARTICLE_DIR_NAME = 'article-12';

const TEMPLATES = [
  {
    src: 'edit/page-article-12-eu-annex-v-preservative-compliance.tsx.txt',
    dest: `src/app/blog/${SLUG}/page.tsx`,
  },
  {
    src: 'edit/AnnexVEntryDecoder.tsx.txt',
    dest: `src/components/blog/${ARTICLE_DIR_NAME}/AnnexVEntryDecoder.tsx`,
  },
  {
    src: 'edit/CPSRDocumentationChecklist.tsx.txt',
    dest: `src/components/blog/${ARTICLE_DIR_NAME}/CPSRDocumentationChecklist.tsx`,
  },
];

const REGISTRY_ENTRY = 'edit/registry-entry-12.ts.txt';
const REGISTRY_PATCH = 'edit/registry-patch.mjs';

function log(msg) {
  process.stdout.write(`[deploy-12] ${msg}\n`);
}
function warn(msg) {
  process.stderr.write(`[deploy-12] WARN: ${msg}\n`);
}
function die(code, msg) {
  process.stderr.write(`[deploy-12] FATAL: ${msg}\n`);
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
    file: 'src/app/blog/preservative-coa-batch-consistency/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — the 59-entry decoder, five limit-reading traps, CPSR evidence requirements.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/phenoxyethanol-technical-guide/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — Annex V entry 29 context and CPNP compliance walkthrough.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/1-2-hexanediol-technical-guide/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — where non-Annex V multifunctionals sit in the compliance chain.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/caprylhydroxamic-acid-technical-guide/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — chelator/non-Annex V legal status in CPSR Part A.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/ethylhexylglycerin-technical-guide/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — EHG as non-Annex V multifunctional, declaration rules.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/iso-11930-challenge-test-protocol/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — regulatory context for ISO 11930 evidence in CPSR Part B.</li>`,
    anchor: 'Related reading section (<h2 id="related-reading">)',
  },
  {
    file: 'src/app/blog/phenoxyethanol-ethylhexylglycerin-combination/page.tsx',
    insert: `<li><a href="/blog/${SLUG}">EU Annex V Preservative Compliance Guide</a> — the Annex V primary + non-Annex V booster pattern under 1223/2009.</li>`,
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
log('✓ deploy-12 complete.');
log('Next: npm run build (locally), then git add src/ && git commit && git push.');
log('If the build fails on ARTICLES-array regex, restore src/lib/blog-registry.ts.bak and investigate.');
