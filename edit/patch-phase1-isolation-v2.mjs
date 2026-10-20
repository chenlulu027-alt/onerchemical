// edit/patch-phase1-isolation-v2.mjs
// Phase 1 隔离规则补丁 v2 — 清理 v1 残留
// - seo.ts 的 ORG.mainSite 常量
// - about/page.tsx 中 "Our main supply operation is at …" 的 <p> 整段（含 JSX 表达式）
// - 顺手修复 about 页的编码乱码 "鈥?" / "鈥"
//
// 使用：
//   git add -A && git commit -m "post-v1 snapshot"
//   node edit/patch-phase1-isolation-v2.mjs --dry-run
//   node edit/patch-phase1-isolation-v2.mjs
//   git diff && pnpm build

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const SRC = path.join(ROOT, 'src');

if (!fs.existsSync(SRC)) {
  console.error(`✖ 未找到 src/ 目录（当前 cwd: ${ROOT}）。`);
  process.exit(1);
}

try {
  const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: ROOT });
  if (status.trim() && !DRY && !FORCE) {
    console.error('✖ Git 工作区有未提交改动。请先：');
    console.error('    git add -A && git commit -m "post-v1 snapshot"');
    console.error('  或加 --force 强制继续');
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
    id: 'B1  删除 seo.ts 中的 mainSite 常量行',
    patterns: [
      // 带尾逗号的行
      /^\s*mainSite\s*:\s*['"]https:\/\/onerchem\.com\/?['"]\s*,?\s*$\n/gm,
    ],
    replace: '',
  },
  {
    id: 'B2  清理所有 {ORG.mainSite} / ORG.mainSite 引用（替换为空字符串字面量，避免编译错）',
    patterns: [/\{ORG\.mainSite\}/g],
    replace: '"#"',
  },
  {
    id: 'B3  删除 "Our main supply operation is at" 开头的 <p> 整段（即使含 JSX 表达式）',
    patterns: [
      /<p[^>]*>\s*[\s\S]*?Our main supply operation is at[\s\S]*?<\/p>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'B4  兜底：删除含 "main supply operation" 的 <p> 整段（防 B3 未中）',
    patterns: [
      /<p[^>]*>[\s\S]*?main supply operation[\s\S]*?<\/p>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'B5  修复 about 页编码乱码 "鈥?" / "鈥" → em-dash "—"',
    patterns: [/鈥\??/g],
    replace: '—',
  },
  {
    id: 'B6  清理 ORG.mainSite 相关的无用 import 如果出现孤立引用（保守：仅合并连续空行）',
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
console.log(`v2 自动修复：${autoChanges} 处${DRY ? '  [dry-run — 未写入]' : '  [已写入磁盘]'}`);
console.log('='.repeat(64));

// 最终扫描：是否还有任何 onerchem.com 残留
console.log('\n【最终残留扫描】');
let residual = 0;
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    if (/onerchem\.com/i.test(line)) {
      console.log(`  ? ${rel(file)}:${i + 1}  ${line.trim().slice(0, 140)}`);
      residual++;
    }
  });
}
if (residual === 0) {
  console.log('  ✓ 零残留，Phase 1 隔离代码层已干净。');
} else {
  console.log(`  共 ${residual} 处残留，请贴出来，我出 v3。`);
}

console.log('\n下一步：');
console.log('  1. git diff');
console.log('  2. pnpm build');
console.log('  3. 贴 build 结果给我，无误再 vercel --prod，我线上实检');
