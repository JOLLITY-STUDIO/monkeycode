/**
 * 同步完整音频数据到 tsubasa2-h5-src/src/data/audio
 *  - bgm/*  ← mini-audio/bgm-data/bgm-sid (BGM_0x*.ts) + 生成 Index.ts
 *  - se/*   ← mini-audio/se-data (SE*.ts) + 生成 index.ts
 * 同时输出 h5-src 中所有对 data/audio 的引用。
 */
const fs = require('fs');
const path = require('path');

const root = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes';
const srcSid = path.join(root, 'mini-audio/bgm-data/bgm-sid');
const srcSe = path.join(root, 'mini-audio/se-data');
const dstBgm = path.join(root, 'tsubasa2-h5-src/src/data/audio/bgm');
const dstSe = path.join(root, 'tsubasa2-h5-src/src/data/audio/se');
const h5src = path.join(root, 'tsubasa2-h5-src');

// ── 1. 搜索 h5-src 中对 data/audio / bgmData / sfxData / BGM_SID / SE_CHANNELS 的引用 ──
console.log('═══ 1. h5-src 中 data/audio 相关引用 ═══');
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules' || f === '.git' || f === '.codebuddy') continue;
      walk(p, out);
    } else if (/\.(ts|tsx|js|json)$/.test(f)) {
      out.push(p);
    }
  }
  return out;
}
const PAT = /data\/audio|bgmData|sfxData|BGM_SID|SE_CHANNELS|BGM_LIST|SE_LIST/;
let refCount = 0;
for (const p of walk(h5src, [])) {
  const c = fs.readFileSync(p, 'utf8');
  if (!PAT.test(c)) continue;
  refCount++;
  console.log('REF:', path.relative(root, p));
  c.split('\n').forEach((l, i) => {
    if (PAT.test(l)) console.log(`   ${i + 1}: ${l.trim()}`);
  });
}
console.log(`(共 ${refCount} 个文件引用)`);

// ── 2. 复制 BGM_0x*.ts → bgm/ ──
console.log('\n═══ 2. 复制 BGM SID 数据 ═══');
let n = 0;
for (const f of fs.readdirSync(srcSid)) {
  if (/^BGM_0x[\dA-Fa-f]+\.ts$/.test(f)) {
    fs.copyFileSync(path.join(srcSid, f), path.join(dstBgm, f));
    n++;
  }
}
console.log(`copied ${n} BGM files → ${dstBgm}`);

// ── 3. 复制 SE*.ts → se/ ──
console.log('\n═══ 3. 复制 SE 数据 ═══');
n = 0;
for (const f of fs.readdirSync(srcSe)) {
  if (/^SE\d+\.ts$/.test(f)) {
    fs.copyFileSync(path.join(srcSe, f), path.join(dstSe, f));
    n++;
  }
}
console.log(`copied ${n} SE files → ${dstSe}`);

// ── 4. 生成 bgm/Index.ts（复制 bgm-sid/index.ts） ──
console.log('\n═══ 4. 生成 bgm/Index.ts ═══');
let idx = fs.readFileSync(path.join(srcSid, 'index.ts'), 'utf8');
// 修正头注释
idx = idx.replace('Bank 12/13/14/15 所有音频轨道', 'Bank 12/13/14/15 所有音频轨道（同步自 mini-audio/bgm-data/bgm-sid）');
fs.writeFileSync(path.join(dstBgm, 'Index.ts'), idx);
console.log('written →', path.join(dstBgm, 'Index.ts'));

// ── 5. 生成 se/index.ts（复制 se-data/index.ts） ──
console.log('\n═══ 5. 生成 se/index.ts ═══');
let seIdx = fs.readFileSync(path.join(srcSe, 'index.ts'), 'utf8');
seIdx = seIdx.replace('自动生成于 Bank 12 SE 指针表', '同步自 mini-audio/se-data，自动生成于 Bank 12 SE 指针表');
fs.writeFileSync(path.join(dstSe, 'index.ts'), seIdx);
console.log('written →', path.join(dstSe, 'index.ts'));

// ── 6. 检查 h5-src bgm 目录文件清单 ──
console.log('\n═══ 6. h5-src bgm 目录文件 ═══');
for (const f of fs.readdirSync(dstBgm).sort()) {
  if (/\.ts$/.test(f)) console.log('  ' + f);
}
