#!/usr/bin/env node
/**
 * Deploy Article 03 — 1,2-Hexanediol Technical Guide
 * Run from project root: node edit/deploy-article-03-1-2-hexanediol-tg.mjs
 *
 * Writes:
 *   src/app/blog/1-2-hexanediol-technical-guide/page.tsx
 *   src/components/blog/article-03/CompatibilityMatrix.tsx
 *   src/components/blog/article-03/ChallengeTestMatrix.tsx
 *
 * Patches:
 *   src/lib/blog-registry.ts  (inserts a BLOG_POSTS entry, idempotent)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const EDIT = __dirname;

// ---------- helpers ----------
const log = (msg) => console.log(`\x1b[36m[article-03]\x1b[0m ${msg}`);
const ok = (msg) => console.log(`\x1b[32m[article-03 OK]\x1b[0m ${msg}`);
const warn = (msg) => console.warn(`\x1b[33m[article-03 WARN]\x1b[0m ${msg}`);

function ensureDir(p) {
  const d = dirname(p);
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

function writeFromTemplate(templateName, destRel) {
  const src = join(EDIT, templateName);
  const dest = join(ROOT, destRel);
  ensureDir(dest);
  const content = readFileSync(src, 'utf8');
  writeFileSync(dest, content, 'utf8');
  ok(`wrote ${destRel}`);
}

// ---------- 1. page.tsx + 2 components ----------
writeFromTemplate(
  'page-article-03-1-2-hexanediol-tg.tsx.txt',
  'src/app/blog/1-2-hexanediol-technical-guide/page.tsx',
);
writeFromTemplate(
  'component-article-03-compat-matrix.tsx.txt',
  'src/components/blog/article-03/CompatibilityMatrix.tsx',
);
writeFromTemplate(
  'component-article-03-challenge-matrix.tsx.txt',
  'src/components/blog/article-03/ChallengeTestMatrix.tsx',
);

// ---------- 2. blog-registry.ts patch (idempotent) ----------
const REGISTRY_PATH = join(ROOT, 'src/lib/blog-registry.ts');
if (!existsSync(REGISTRY_PATH)) {
  warn(`${REGISTRY_PATH} not found — skip registry patch. Add the entry from blog-registry-article-03-patch.txt manually.`);
} else {
  const current = readFileSync(REGISTRY_PATH, 'utf8');
  const SLUG = '1-2-hexanediol-technical-guide';

  if (current.includes(SLUG)) {
    ok(`registry already contains ${SLUG} — skipping insert.`);
  } else {
    const entrySrc = readFileSync(join(EDIT, 'blog-registry-article-03-patch.txt'), 'utf8');
    // Strip the leading comment lines (anything before the first `{`)
    const firstBrace = entrySrc.indexOf('{');
    const entry = entrySrc.slice(firstBrace).trim().replace(/,\s*$/, '');

    // Insert as the FIRST element of BLOG_POSTS array (newest first).
    const marker = /export\s+const\s+BLOG_POSTS\s*(?::\s*[\w<>\[\]\s,]+)?\s*=\s*\[/;
    const m = current.match(marker);
    if (!m) {
      warn('Could not locate `export const BLOG_POSTS = [` in blog-registry.ts. Manual insert required.');
    } else {
      const insertAt = m.index + m[0].length;
      const patched =
        current.slice(0, insertAt) +
        `\n  ${entry},\n` +
        current.slice(insertAt);
      writeFileSync(REGISTRY_PATH, patched, 'utf8');
      ok(`inserted ${SLUG} into BLOG_POSTS`);
    }
  }
}

// ---------- 3. hero image reminder ----------
const HERO_PATH = join(ROOT, 'public/images/hero-1-2-hexanediol.webp');
if (!existsSync(HERO_PATH)) {
  warn(`Hero image not found: public/images/hero-1-2-hexanediol.webp`);
  warn(`Generate via Midjourney with the prompt from the article brief, then save to that path.`);
} else {
  ok('hero image present');
}

log('Done. Next: npm run build && git commit && vercel deploy.');
