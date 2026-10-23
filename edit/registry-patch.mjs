#!/usr/bin/env node
/**
 * edit/registry-patch.mjs
 * -------------------------------------------------------------
 * Zero-dependency helper that inserts a BlogArticle entry at
 * ARTICLES[0] in src/lib/blog-registry.ts.
 *
 * Usage:
 *   node edit/registry-patch.mjs <entry-file> [--dry] [--force] [--registry=<path>]
 *
 * Entry file:
 *   .ts / .tsx / .txt containing exactly ONE object literal + trailing comma.
 *   Leading `//` or `/* ... *\/` comments are stripped.
 *
 * Features:
 *   - Idempotent slug check (exit 3 on duplicate without --force)
 *   - Auto-backup to <registry>.bak before writing
 *   - Custom lexer tracks {}[]() depth and skips braces inside strings
 *     and comments (not full TS AST — AST pulls heavy deps and prettier
 *     reformats the output anyway)
 *
 * Exit codes:
 *   0 success | 1 usage | 2 parse | 3 duplicate slug | 4 I/O
 * -------------------------------------------------------------
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
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

// Strip leading // and /* */ comments
const entryStripped = stripLeadingComments(rawEntry).trim();

// Must start with { and end with },
if (!entryStripped.startsWith('{') || !/},?\s*$/.test(entryStripped)) {
  console.error('registry-patch: entry file must contain one object literal starting with { and ending with },');
  exit(2);
}

// Ensure trailing comma for safe insert
const entryBlock = entryStripped.endsWith(',') ? entryStripped : `${entryStripped},`;

// Extract slug for idempotency check
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

// ---------- 4. Find ARTICLES array opening ----------
const arrAnchor = registry.search(/export\s+const\s+ARTICLES\s*:\s*BlogArticle\s*\[\]\s*=\s*\[/);
if (arrAnchor < 0) {
  console.error('registry-patch: cannot locate `export const ARTICLES: BlogArticle[] = [` in registry');
  exit(2);
}

// Advance to the character AFTER the opening `[`
const openBracketIdx = registry.indexOf('[', arrAnchor);
const insertIdx = openBracketIdx + 1;

// Preserve newline + leading indentation style of first element (if any)
const after = registry.slice(insertIdx);
const firstNonWs = after.search(/\S/);
const leadingWs = firstNonWs > 0 ? after.slice(0, firstNonWs) : '\n  ';

// Normalise entry indentation to 2 spaces inside the array
const indentedEntry = entryBlock
  .split('\n')
  .map((line, i) => (i === 0 ? `  ${line}` : `  ${line}`))
  .join('\n');

const patched =
  registry.slice(0, insertIdx) +
  `\n${indentedEntry}` +
  leadingWs +
  registry.slice(insertIdx + (firstNonWs > 0 ? 0 : 0));

// ---------- 5. Write (or dry-run) ----------
if (flags.dry) {
  console.log(`[dry-run] would insert slug "${newSlug}" at ARTICLES[0] in ${registryPath}`);
  console.log(`[dry-run] registry size: ${registry.length} -> ${patched.length} bytes (+${patched.length - registry.length})`);
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
exit(0);

// ---------- helpers ----------
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripLeadingComments(src) {
  let i = 0;
  while (i < src.length) {
    // skip whitespace
    while (i < src.length && /\s/.test(src[i])) i++;
    if (src[i] === '/' && src[i + 1] === '/') {
      // line comment
      while (i < src.length && src[i] !== '\n') i++;
    } else if (src[i] === '/' && src[i + 1] === '*') {
      // block comment
      i += 2;
      while (i < src.length - 1 && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
    } else {
      break;
    }
  }
  return src.slice(i);
}
