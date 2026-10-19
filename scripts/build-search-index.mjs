#!/usr/bin/env node
/**
 * Build /public/search-index.json from src/lib/blog-registry.ts.
 * Runs as a `prebuild` hook — zero runtime cost, pure static JSON.
 *
 * We don't import blog-registry at build time (it's TS). We parse it
 * as plain text with a loose regex — the registry file is single-purpose
 * and the shape is stable. If the shape changes, update this script.
 *
 * Design choice: no AST parser dependency. The parse is lenient — a
 * missing field throws, and the build fails fast with a clear message.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REGISTRY = resolve(ROOT, 'src/lib/blog-registry.ts');
const OUT = resolve(ROOT, 'public/search-index.json');

const src = readFileSync(REGISTRY, 'utf8');

/* --------- extract CLUSTERS { key: { label, description } } -------------- */
const clustersMatch = src.match(/export const CLUSTERS\s*=\s*({[\s\S]*?})\s*as\s+const;/);
if (!clustersMatch) throw new Error('build-search-index: CLUSTERS block not found');
const clustersRaw = clustersMatch[1];
const clusterLabels = {};
for (const m of clustersRaw.matchAll(/['"]([a-z0-9-]+)['"]\s*:\s*{[^}]*?label\s*:\s*['"]([^'"]+)['"]/g)) {
  clusterLabels[m[1]] = m[2];
}

/* --------- extract ARTICLES array -------------------------------------- */
const articlesMatch = src.match(/export const ARTICLES\s*:\s*BlogArticle\[\]\s*=\s*(\[[\s\S]*?\]);/);
if (!articlesMatch) throw new Error('build-search-index: ARTICLES array not found');

// Simple field extractor: find each {...} object in the array
const objRE = /{[^{}]*(?:{[^{}]*}[^{}]*)*}/g;
const objects = articlesMatch[1].match(objRE) ?? [];

function pick(obj, key) {
  const m = obj.match(new RegExp('\\b' + key + '\\s*:\\s*([\'"])((?:[^\\\\]|\\\\.)*?)\\1'));
  return m ? m[2].replace(/\\(['"\\])/g, '$1') : undefined;
}
function pickBool(obj, key) {
  const m = obj.match(new RegExp('\\b' + key + '\\s*:\\s*(true|false)'));
  return m ? m[1] === 'true' : false;
}
function pickArr(obj, key) {
  const m = obj.match(new RegExp('\\b' + key + '\\s*:\\s*(\\[[^\\]]*\\])'));
  if (!m) return [];
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}

const docs = [];
for (const o of objects) {
  if (pickBool(o, 'draft')) continue;
  const slug = pick(o, 'slug');
  const title = pick(o, 'title');
  const excerpt = pick(o, 'excerpt');
  const cluster = pick(o, 'cluster');
  const searchKeywords = pickArr(o, 'searchKeywords');
  if (!slug || !title || !excerpt || !cluster) {
    throw new Error('build-search-index: missing required field in ' + JSON.stringify(o).slice(0, 120));
  }
  docs.push({
    slug,
    title,
    excerpt,
    cluster: clusterLabels[cluster] ?? cluster,
    searchKeywords,
    type: 'article',
    url: `/blog/${slug}`,
  });
}

/* --------- add static pages worth searching ---------------------------- */
docs.push(
  { slug: 'about', title: 'About Onerchemical', excerpt: 'The publication, who writes, what we don\u2019t do.', cluster: 'About', searchKeywords: ['about', 'company', 'publisher'], type: 'page', url: '/about' },
  { slug: 'yang-ruosong', title: 'Yang Ruosong', excerpt: 'Head of Technical Content — cosmetic preservation articles.', cluster: 'Author', searchKeywords: ['yang ruosong', 'author', 'bio'], type: 'page', url: '/yang-ruosong' },
);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(docs));
console.log(`[search-index] wrote ${docs.length} docs → public/search-index.json`);
