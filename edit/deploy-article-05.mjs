// deploy-article-05.mjs
// Onerchemical Article 05 — Ethylhexylglycerin Technical Guide
// Writes:
//   src/app/blog/ethylhexylglycerin-technical-guide/page.tsx
//   src/components/blog/article-05/EHGUseCaseSplitter.tsx
//   src/components/blog/article-05/EHGPairingMatrix.tsx
// Does NOT patch src/lib/blog-registry.ts automatically — see registry-entry.txt
// (registry paste remains manual per article-03/04 lesson learned until a registry-patch
// helper is written).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..'); // run from edit/ or from project root — adjust as needed
const scriptDir = __dirname;

// If running from project root (D:\桌面\onerchemical\), templates are in ./edit/
const templateDir = existsSync(join(scriptDir, 'page-article-05-ethylhexylglycerin-technical-guide.tsx.txt'))
  ? scriptDir
  : join(projectRoot, 'edit');

const outputs = [
  {
    template: 'page-article-05-ethylhexylglycerin-technical-guide.tsx.txt',
    dest: 'src/app/blog/ethylhexylglycerin-technical-guide/page.tsx',
  },
  {
    template: 'component-ehg-usecase-splitter.tsx.txt',
    dest: 'src/components/blog/article-05/EHGUseCaseSplitter.tsx',
  },
  {
    template: 'component-ehg-pairing-matrix.tsx.txt',
    dest: 'src/components/blog/article-05/EHGPairingMatrix.tsx',
  },
];

const root = existsSync(join(scriptDir, 'src')) ? scriptDir : projectRoot;

function ensureDir(filePath) {
  const d = dirname(filePath);
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

let writeCount = 0;
for (const o of outputs) {
  const src = join(templateDir, o.template);
  const dst = join(root, o.dest);
  const content = readFileSync(src, 'utf8');
  ensureDir(dst);
  writeFileSync(dst, content, 'utf8');
  console.log('[write]', o.dest);
  writeCount++;
}

console.log('\n[done] Wrote ' + writeCount + ' files.');
console.log('\n[next] MANUAL STEP — paste the registry entry from edit/registry-entry.txt');
console.log('        into the ARTICLES array in src/lib/blog-registry.ts (newest-first).');
console.log('[next] npm run build  (verify no type errors)');
console.log('[next] git add . && git commit -m "feat: add EHG technical guide (article 05)"');
