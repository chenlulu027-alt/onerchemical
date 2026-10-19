# edit/

Workspace for all patch scripts and `.tsx.txt` templates delivered after Phase 0.

## Conventions

- Every delivery is runnable from project root: `node edit/deploy-xxx.mjs`
- Templates are `.tsx.txt` (NOT `.tsx`) so TypeScript / ESLint / Next build never pick them up
- Template filenames MUST be unique across the project — never bare `page.tsx.txt`. Use `page-article-NN-<slug>.tsx.txt`, `component-<name>.tsx.txt`, etc.
- `deploy-*.mjs` uses `readFileSync` to read templates and `writeFileSync` to place them. Never inline TSX as a template string inside `.mjs` — nested backticks are a parse trap.

## Script skeleton

```js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const files = [
  { from: 'page-article-02-<slug>.tsx.txt', to: 'src/app/blog/<slug>/page.tsx' },
  { from: 'component-article-02-chart.tsx.txt', to: 'src/components/blog/article-02/Chart.tsx' },
];

for (const { from, to } of files) {
  const src = readFileSync(resolve(__dirname, from), 'utf8');
  const dest = resolve(ROOT, to);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, src);
  console.log(`✓ ${to}`);
}
```

Then update `src/lib/blog-registry.ts` separately with the new ARTICLES entry.
