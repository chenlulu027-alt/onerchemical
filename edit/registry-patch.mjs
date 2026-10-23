#!/usr/bin/env node
/**
 * edit/registry-patch.mjs — v2 (2026-10-23 fix)
 * -------------------------------------------------------------
 * v1 BUG: used registry.search(regex) + registry.indexOf('[', arrAnchor),
 *         which hit the `[` inside `BlogArticle[]` type annotation instead
 *         of the array opening `[`. Fix: use regex.exec() + m.index + m[0].length
 *         so insertIdx lands exactly ONE char after the array opening `[`.
 *
 * Zero-dependency helper that inserts a BlogArticle entry at
 * ARTICLES[0] in src/lib/blog-registry.ts.
 *
 * Usage:
 *   node edit/registry-patch.mjs <entry-file> [--dry] [--force] [--registry=<path>]
 *
 * Exit codes:
 *   0 success | 1 usage | 2 parse | 3 duplicate slug | 4 I/O
 * -------------------------------------------------------------
 */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { argv, exit } from 'node:process';

const args = argv.slice(2);
const flags = { dry: false, force: false };
let entryPath = '';
let registryPath = 'src/lib/blog-registry.ts';

for (const a of args) {
  if (a === '--dry') flags.dry = true;
  else if (a === '--force') flags.force = true;
  else if (a.startsWith('--registry=')) registryPath = a.slice('--registry='.length);
  else if (!entryPath) entryPath = a;
  else { usage(`unexpected argument: ${a}`); exit(1); }
}

if (!entryPath) { usage('missing entry file'); exit(1); }

function usage(reason = '') {
  if (reason) console.error(`registry-patch: ${reason}`);
  console.error('Usage: node edit/registry-patch.mjs <entry-file> [--dry] [--force] [--registry=<path>]');
}

// ---------- 1. Read entry ----------
let rawEntry;
try {
  rawEntry = readFileSync(resolve(entryPath), 'utf8');
} catch (e) {
  console.error(`registry-patch: cannot read entry file: ${e.message}`);
  exit(4);
}

const entryStripped = stripLeadingComments(rawEntry).trim();

if (!entryStripped.startsWith('{') || !/},?\s*$/.test(entryStripped)) {
  console.error('registry-patch: entry file must contain one object literal starting with { and ending with },');
  exit(2);
}

const entryBlock = entryStripped.endsWith(',') ? entryStripped : `${entryStripped},`;

const slugMatch = entryBlock.match(/slug\s*:\s*['"]([^'"]+)['"]/);
if (!slugMatch) {
  console.error('registry-patch: cannot find slug field in entry');
  exit(2);
}
const newSlug = slugMatch[1];

// ---------- 2. Read registry ----------
let registry;
try {
  registry = readFileSync(resolve(registryPath), 'utf8');
} catch (e) {
  console.error(`registry-patch: cannot read registry: ${e.message}`);
  exit(4);
}

// ---------- 3. Idempotency check ----------
const dupPattern = new RegExp(`slug\\s*:\\s*['"]${escapeRegex(newSlug)}['"]`);
if (dupPattern.test(registry) && !flags.force) {
  console.error(`registry-patch: slug "${newSlug}" already present in registry (use --force to re-insert)`);
  exit(3);
}

// ---------- 4. Locate ARTICLES array opening bracket (v2 fix) ----------
// Match the FULL declaration up to AND INCLUDING the array `[`, then
// insertIdx = m.index + m[0].length. This guarantees we land after the
// array `[`, never inside `BlogArticle[]`. Also tolerates missing type
// annotation (`export const ARTICLES = [`).
const declRe = /export\s+const\s+ARTICLES(?:\s*:\s*BlogArticle\s*\[\s*\])?\s*=\s*\[/;
const m = declRe.exec(registry);
if (!m) {
  console.error('registry-patch: cannot locate `export const ARTICLES ... = [` in registry');
  exit(2);
}
const insertIdx = m.index + m[0].length;

// ---------- 5. Compose inserted block (v2 — clean, no double whitespace) ----------
// Indent each entry line by 2 spaces (array-interior indent)
const indentedEntry = entryBlock
  .split('\n')
  .map((line) => `  ${line}`)
  .join('\n');

// Insert: `\n<indented-entry>\n` right after the opening `[`.
// Whatever came after the `[` originally (newline + first element, or just `]`)
// is preserved untouched via registry.slice(insertIdx).
const patched =
  registry.slice(0, insertIdx) +
  `\n${indentedEntry}` +
  registry.slice(insertIdx);

// ---------- 6. Write (or dry-run) ----------
if (flags.dry) {
  console.log(`[dry-run] would insert slug "${newSlug}" at ARTICLES[0] in ${registryPath}`);
  console.log(`[dry-run] insertIdx=${insertIdx}, matched: ${JSON.stringify(m[0])}`);
  console.log(`[dry-run] registry size: ${registry.length} -> ${patched.length} bytes (+${patched.length - registry.length})`);
  console.log('[dry-run] 20 chars around insertion:');
  console.log(`[dry-run]   before: ${JSON.stringify(registry.slice(Math.max(0, insertIdx - 20), insertIdx))}`);
  console.log(`[dry-run]   after:  ${JSON.stringify(registry.slice(insertIdx, insertIdx + 20))}`);
  exit(0);
}

try {
  copyFileSync(resolve(registryPath), resolve(`${registryPath}.bak`));
} catch (e) {
  console.error(`registry-patch: cannot write backup: ${e.message}`);
  exit(4);
}

try {
  writeFileSync(resolve(registryPath), patched, 'utf8');
} catch (e) {
  console.error(`registry-patch: cannot write registry: ${e.message}`);
  exit(4);
}

console.log(`registry-patch: inserted slug "${newSlug}" at ARTICLES[0] in ${registryPath}`);
console.log(`registry-patch: backup saved as ${registryPath}.bak`);
console.log(`registry-patch: TIP — run \`npm run build\` locally before pushing; the regex-based build-search-index.mjs is strict about the ARTICLES declaration format.`);
exit(0);

// ---------- helpers ----------
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripLeadingComments(src) {
  let i = 0;
  while (i < src.length) {
    while (i < src.length && /\s/.test(src[i])) i++;
    if (src[i] === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
    } else if (src[i] === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length - 1 && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
    } else {
      break;
    }
  }
  return src.slice(i);
}
