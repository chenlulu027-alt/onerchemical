// edit/patch-phase1-isolation.mjs
// Phase 1 隔离规则补丁 — onerchemical.com
// 全自动修复，无需手工。放置于 D:\桌面\onerchemical\edit\ 下。
//
// 使用流程（零手工）：
//   cd D:\桌面\onerchemical
//   git add -A && git commit -m "pre-isolation-patch snapshot"
//   node edit/patch-phase1-isolation.mjs --dry-run   # 预览
//   node edit/patch-phase1-isolation.mjs             # 实际写入
//   git diff                                          # 复核
//   pnpm build && vercel --prod                       # 满意则部署
//   git restore .                                     # 不满意则一键回退

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const SRC = path.join(ROOT, 'src');

if (!fs.existsSync(SRC)) {
  console.error(`✖ 未找到 src/ 目录（当前 cwd: ${ROOT}）。请在项目根执行。`);
  process.exit(1);
}

// Pre-flight：确保 git 工作区干净，便于一键回退
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: ROOT });
  if (status.trim() && !DRY && !FORCE) {
    console.error('✖ Git 工作区有未提交改动。请先：');
    console.error('    git add -A && git commit -m "pre-isolation-patch snapshot"');
    console.error('  这样跑完脚本后不满意可以：git restore .');
    console.error('  如仍要继续，请加 --force');
    process.exit(1);
  }
} catch {
  console.warn('⚠ 未检测到 git 仓库，无法做安全回退。继续风险自负。');
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
const manual = [];

// —— 自动修复规则（全部走正则，零手工） ——
const autoRules = [
  {
    id: 'A1  删除 Organization JSON-LD 的 sameAs:["https://onerchem.com"]',
    patterns: [
      // JSON 字符串形式（双引号 key）
      /,\s*"sameAs"\s*:\s*\[\s*"https:\/\/onerchem\.com\/?"\s*\]/g,
      /"sameAs"\s*:\s*\[\s*"https:\/\/onerchem\.com\/?"\s*\]\s*,/g,
      // JS 对象字面量形式
      /,\s*sameAs\s*:\s*\[\s*["']https:\/\/onerchem\.com\/?["']\s*\]/g,
      /sameAs\s*:\s*\[\s*["']https:\/\/onerchem\.com\/?["']\s*\]\s*,/g,
    ],
    replace: '',
  },
  {
    id: 'A2  https://onerchem.com/yang-ruosong/ → https://onerchemical.com/yang-ruosong/',
    patterns: [/https:\/\/onerchem\.com\/yang-ruosong\//g],
    replace: 'https://onerchemical.com/yang-ruosong/',
  },
  {
    id: 'A3  删除 Footer 中 <li> 包裹的 onerchem.com 链接整项',
    patterns: [
      /<li[^>]*>\s*<a[^>]*href=["']https:\/\/onerchem\.com\/?["'][\s\S]*?<\/a>\s*<\/li>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'A4  兜底：删除所有直指 onerchem.com 的 <a>…</a> 整块',
    patterns: [
      /<a[^>]*href=["']https:\/\/onerchem\.com\/?["'][\s\S]*?<\/a>/gi,
    ],
    replace: '',
  },
  {
    id: 'A5  删除 About 页提及旧站的 <p> 整段',
    patterns: [
      /<p[^>]*>[\s\S]*?main supply operation is at onerchem\.com[\s\S]*?<\/p>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'A6  删除 /yang-ruosong/ 页 "the main site" <p> 整段',
    patterns: [
      /<p[^>]*>[\s\S]*?the main site[\s\S]*?onerchem\.com\/yang-ruosong[\s\S]*?<\/p>\s*/gi,
    ],
    replace: '',
  },
  {
    id: 'A7  legalName "Wuhan Oule Chemical" → "Wuhan Oner Chemical"',
    patterns: [/Wuhan Oule Chemical Co\.?,?\s*Ltd\.?/gi],
    replace: 'Wuhan Oner Chemical Co., Ltd.',
  },
  {
    id: 'A8  清理删除后残留的连续空行（3+ 空行 → 1 空行）',
    patterns: [/\n{3,}/g],
    replace: '\n\n',
  },
];

// —— 低优先级扫描：报告所有残留 onerchem.com（供 git diff 后人眼复核） ——
const manualPatterns = [
  { id: 'M5  残留 onerchem.com（请 git diff 后复核是否需进一步清理）', regex: /onerchem\.com/i, lowPriority: true },
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

  // 基于已自动修复后的内容做手工项扫描（避免重复报告自动项）
  const lines = src.split('\n');
  for (const rule of manualPatterns) {
    lines.forEach((line, i) => {
      if (rule.regex.test(line)) {
        manual.push({
          file: rel(file), line: i + 1, id: rule.id,
          text: line.trim().slice(0, 140), low: !!rule.lowPriority,
        });
      }
    });
  }
}

console.log('\n' + '='.repeat(64));
console.log(`自动修复：${autoChanges} 处${DRY ? '  [dry-run — 未写入]' : '  [已写入磁盘]'}`);
console.log('='.repeat(64));

const low = manual.filter(x => x.low);

if (low.length) {
  console.log('\n【残留 onerchem.com（去重后按行列出，git diff 后复核）】');
  const seen = new Set();
  for (const l of low) {
    const key = l.file + ':' + l.line;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ? ${l.file}:${l.line}  ${l.text}`);
  }
} else {
  console.log('\n✓ 未检出任何 onerchem.com 残留。');
}

console.log('\n下一步：');
console.log('  1. git diff          # 复核改动');
console.log('  2. pnpm build        # 构建通过则 TSX 结构无破坏');
console.log('  3. vercel --prod     # 部署');
console.log('  4. 回报结果，我线上实检确认全绿');
console.log('  不满意 → git restore .  # 一键全回退');
