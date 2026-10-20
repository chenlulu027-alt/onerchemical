// edit/patch-phase1-isolation-v5.mjs
// Phase 1 隔离补丁 v5 — 删除 schema.ts 中变量引用形式的 sameAs 字段
// (sameAs: [ORG.mainSite] — v1 的 A1 只匹配字面字符串，错过了变量形式)

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
    console.error('✖ 请先 git add -A && git commit -m "post-v4 snapshot" 或加 --force');
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
    id: 'E1  删除 sameAs: [ORG.mainSite] 整行（含尾逗号）',
    patterns: [
      /^\s*sameAs\s*:\s*\[\s*ORG\.mainSite\s*\]\s*,?\s*$\n/gm,
    ],
    replace: '',
  },
  {
    id: 'E2  删除 "sameAs": [ORG.mainSite] 整行（双引号 key）',
    patterns: [
      /^\s*["']sameAs["']\s*:\s*\[\s*ORG\.mainSite\s*\]\s*,?\s*$\n/gm,
    ],
    replace: '',
  },
  {
    id: 'E3  兜底：任何 sameAs 字段数组内含 mainSite 变量 → 删整行',
    patterns: [
      /^\s*["']?sameAs["']?\s*:\s*\[[^\]]*mainSite[^\]]*\]\s*,?\s*$\n/gm,
    ],
    replace: '',
  },
  {
    id: 'E4  清理可能残留的孤立 ORG.mainSite 引用（替换为空字符串避免编译错，后续人工审阅）',
    patterns: [/ORG\.mainSite/g],
    replace: '""',
  },
  {
    id: 'E5  合并连续空行',
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
console.log(`v5 自动修复：${autoChanges} 处${DRY ? '  [dry-run — 未写入]' : '  [已写入磁盘]'}`);
console.log('='.repeat(64));

console.log('\n【终极扫描 v3】');
let residual = 0;
const scanRules = [
  { name: 'onerchem.com 残留', regex: /onerchem\.com/i },
  { name: 'Main site 字样残留', regex: /Main site/i },
  { name: 'ORG.mainSite 引用残留', regex: /ORG\.mainSite/ },
  { name: 'sameAs 字段残留（任何形式）', regex: /sameAs/ },
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
else console.log(`  共 ${residual} 处（sameAs 残留若在正当上下文如 Person.sameAs 可留；onerchem.com 必须零）。`);

console.log('\n下一步：');
console.log('  1. git diff');
console.log('  2. npm run build');
console.log('  3. 贴 build 结果');
