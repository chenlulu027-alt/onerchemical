#!/usr/bin/env node
/**
 * deploy-article-02.mjs
 *
 * Deploys the Phenoxyethanol Technical Guide article into the
 * onerchemical.com Next.js project.
 *
 * Run from project root (D:\桌面\onerchemical\):
 *   node edit/deploy-article-02.mjs
 *
 * Writes:
 *   src/app/blog/phenoxyethanol-technical-guide/page.tsx
 *   src/components/blog/article-02/MicPartitionChart.tsx
 *   src/components/blog/article-02/CoAChecklist.tsx
 *   src/components/blog/article-02/PairingDecisionTree.tsx
 *   src/components/blog/article-02/RegulationMatrix.tsx
 *
 * Does NOT touch:
 *   src/lib/blog-registry.ts  — manually paste the entry from
 *   edit/templates/registry-entry-article-02.ts.txt into the `articles`
 *   array so you can control sort order.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const TEMPLATES = resolve(__dirname, "templates");

const files = [
  {
    src: "page-article-02-phenoxyethanol-tg.tsx.txt",
    dest: "src/app/blog/phenoxyethanol-technical-guide/page.tsx",
  },
  {
    src: "component-article02-mic-partition-chart.tsx.txt",
    dest: "src/components/blog/article-02/MicPartitionChart.tsx",
  },
  {
    src: "component-article02-coa-checklist.tsx.txt",
    dest: "src/components/blog/article-02/CoAChecklist.tsx",
  },
  {
    src: "component-article02-pairing-decision-tree.tsx.txt",
    dest: "src/components/blog/article-02/PairingDecisionTree.tsx",
  },
  {
    src: "component-article02-regulation-matrix.tsx.txt",
    dest: "src/components/blog/article-02/RegulationMatrix.tsx",
  },
];

let okCount = 0;
let skipCount = 0;

console.log(`[article-02] deploying from: ${TEMPLATES}`);
console.log(`[article-02] project root:   ${ROOT}`);

for (const f of files) {
  const srcPath = join(TEMPLATES, f.src);
  const destPath = join(ROOT, f.dest);

  if (!existsSync(srcPath)) {
    console.error(`  SKIP (missing template): ${f.src}`);
    skipCount++;
    continue;
  }

  const content = readFileSync(srcPath, "utf8");
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, content, "utf8");
  console.log(`  WROTE: ${f.dest}  (${content.length} bytes)`);
  okCount++;
}

console.log("");
console.log(`[article-02] done — ${okCount} written, ${skipCount} skipped`);
console.log("");
console.log("NEXT STEPS (manual):");
console.log("  1. Add the registry entry — see edit/templates/registry-entry-article-02.ts.txt");
console.log("  2. Place hero image at: public/images/blog/phenoxyethanol-tg/hero.jpg");
console.log("     (Midjourney prompt in README.md)");
console.log("  3. npm run dev — verify at /blog/phenoxyethanol-technical-guide");
console.log("  4. npm run build — confirm no TS errors");
console.log("  5. Commit + push to deploy via Vercel");
