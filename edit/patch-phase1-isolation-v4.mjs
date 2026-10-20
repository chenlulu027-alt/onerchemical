// edit/patch-phase1-isolation-v4.mjs
// Phase 1 隔离补丁 v4 — 清除 seo.ts 中过时的 Phase 0 注释
// (这些注释不是功能代码，但描述的策略与 Phase 1 相反，留着会误导未来迭代)

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const SRC = path.join(ROOT, 'src');

try {
  const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: ROOT });
  if (status.trim() && !DRY && !FORCE) {
    console.error('✖ 请先 git add -A && git commit -m "post-v3 snapshot" 或加 --force');
    process.exit(1);
  }
} catch { console.warn('⚠ 未检测到 git 仓库。'); }

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.next' || name === '.git') continue;
      walk(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(name)) out.push(full);
  }
  return out;
}

const files = walk(SRC);
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

let autoChanges = 0;

const autoRules = [
  {
    id: 'D1  删除 "Author profile is canonically hosted on the main site" 注释行',
    patterns: [
      /^\s*\/\/\s*Author profile is canonically hosted on the main site.*$\n/gm,
    ],
    replace: '',
  },
  {
    id: 'D2  删除 "points JSON-LD author URL to the main site" 注释行',
    patterns: [
      /^\s*\/\/\s*points JSON-LD author URL to the main site.*$\n/gm,
    ],
    replace: '',
  },
  {
    id: 'D3  兜底：删除任何提到 "main site" 的 // 单行注释',
    patterns: [
      /^\s*\/\/.*\bmain site\b.*$\n/gim,
    ],
    replace: '',
  },
  {
    id: 'D4  删除可能残留的 /* ... main site ... */ 块注释',
    patterns: [
      /\/\*[\s\S]*?\bmain site\b[\s\S]*?\*\/\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'D5  合并连续空行',
    patterns: [/\n{3,}/g],
    replace: '\n\n',
  },
];

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const before = src;
  for (const rule of autoRules) {
    for (const pat of rule.patterns) {
      const hits = src.match(pat);
      if (hits) {
        src = src.replace(pat, rule.replace);
        console.log(`  ✓ ${rel(file)}  ${rule.id}  (${hits.length})`);
        autoChanges += hits.length;
      }
    }
  }
  if (src !== before && !DRY) fs.writeFileSync(file, src, 'utf8');
}

console.log('\n' + '='.repeat(64));
console.log(`v4 自动修复：${autoChanges} 处${DRY ? '  [dry-run — 未写入]' : '  [已写入磁盘]'}`);
console.log('='.repeat(64));

console.log('\n【终极扫描 v2】');
let residual = 0;
const scanRules = [
  { name: 'onerchem.com 残留', regex: /onerchem\.com/i },
  { name: 'Main site 字样残留', regex: /Main site/i },
  { name: '编码乱码 鈥', regex: /鈥/ },
];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    for (const sr of scanRules) {
      if (sr.regex.test(line)) {
        console.log(`  ? ${rel(file)}:${i + 1}  [${sr.name}]  ${line.trim().slice(0, 120)}`);
        residual++;
      }
    }
  });
}
if (residual === 0) console.log('  ✓ 零残留。Phase 1 隔离代码层完全干净。');
else console.log(`  共 ${residual} 处。`);

console.log('\n下一步：');
console.log('  1. git diff');
console.log('  2. npm run build   # 本机无 pnpm，用 npm');
console.log('  3. 贴 build 结果');
