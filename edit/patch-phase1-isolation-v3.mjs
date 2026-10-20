// edit/patch-phase1-isolation-v3.mjs
// Phase 1 隔离规则补丁 v3 — 清理 v2 后残留的 Footer 死链 "Main site ↗"
//
// 使用：
//   git add -A && git commit -m "post-v2 snapshot"
//   node edit/patch-phase1-isolation-v3.mjs --dry-run
//   node edit/patch-phase1-isolation-v3.mjs
//   git diff && pnpm build

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const SRC = path.join(ROOT, 'src');

if (!fs.existsSync(SRC)) {
  console.error(`✖ 未找到 src/ 目录。`);
  process.exit(1);
}

try {
  const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: ROOT });
  if (status.trim() && !DRY && !FORCE) {
    console.error('✖ Git 工作区有未提交改动。请先：');
    console.error('    git add -A && git commit -m "post-v2 snapshot"');
    console.error('  或加 --force');
    process.exit(1);
  }
} catch {
  console.warn('⚠ 未检测到 git 仓库。');
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.next' || name === '.git') continue;
      walk(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(SRC);
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

let autoChanges = 0;

const autoRules = [
  {
    id: 'C1  删除 Footer 中 "Main site ↗" 的 <li> 整项（任何 href 值）',
    patterns: [
      // 匹配整个 <li>...<a ...>Main site ↗</a>...</li>
      /<li[^>]*>\s*<a[^>]*>[\s\S]*?Main site[\s\S]*?<\/a>\s*<\/li>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'C2  兜底：删除含 "Main site ↗" 的 <a>…</a>（防 C1 未中，可能留空 <li> 壳）',
    patterns: [
      /<a[^>]*>\s*Main site[^<]*<\/a>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'C3  清理 Footer 中可能遗留的空 <li></li> 壳',
    patterns: [
      /<li[^>]*>\s*<\/li>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'C4  合并连续空行',
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
console.log(`v3 自动修复：${autoChanges} 处${DRY ? '  [dry-run — 未写入]' : '  [已写入磁盘]'}`);
console.log('='.repeat(64));

// 终极扫描：onerchem.com + Main site + 编码乱码
console.log('\n【终极扫描】');
let residual = 0;
const scanRules = [
  { name: 'onerchem.com 残留', regex: /onerchem\.com/i },
  { name: 'Main site ↗ 残留', regex: /Main site/i },
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
if (residual === 0) {
  console.log('  ✓ 零残留。Phase 1 隔离代码层完全干净。');
} else {
  console.log(`  共 ${residual} 处，贴输出我出 v4。`);
}

console.log('\n下一步：');
console.log('  1. git diff');
console.log('  2. pnpm build');
console.log('  3. 贴结果 → 我线上实检');
