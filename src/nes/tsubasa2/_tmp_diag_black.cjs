// _tmp_diag_black.cjs — 完整帧驱动诊断: boot → N 帧 → 检查 PPU 实际渲染输出
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const ROOT = __dirname;
const OUT = path.join(ROOT, '_test_out');
process.chdir(ROOT);

const TSC = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
if (process.env.FORCE_COMPILE) {
  console.log('[tsc] compile (force) ...');
  try {
    const out = execFileSync(process.execPath, ['--max-old-space-size=4096', TSC, '-p', 'tsconfig.play.json'], { stdio: ['ignore', 'pipe', 'pipe'] });
    process.stdout.write(out);
    console.log('[tsc] OK\n');
  } catch (e) {
    const err = (e.stdout || '') + (e.stderr || '');
    const m = err.match(/error TS\d+/g);
    console.log('[tsc] FAIL errors=' + (m ? m.length : '?'));
    const byFile = new Map();
    for (const line of err.split(/\r?\n/)) {
      const mm = line.match(/^([^(]+)\((\d+),(\d+)\): error TS(\d+): (.*)$/);
      if (mm) byFile.set(mm[1], (byFile.get(mm[1]) || 0) + 1);
    }
    for (const [f, n] of [...byFile.entries()].sort((a, b) => b[1] - a[1])) console.log(`${n}\t${f}`);
    process.exit(2);
  }
} else {
  console.log('[tsc] SKIP (use existing _test_out)');
}
console.log('[tsc] done\n');

const { Tsubasa2 } = require(path.join(OUT, 'game/index.js'));
const { default: NES } = require(path.join(OUT, 'core/nes.js'));

function hex(c) { return (c >>> 0).toString(16).padStart(8, '0'); }
function hex2(c) { return (c & 0xff).toString(16).padStart(2, '0'); }

function analyze(label, ts, nes, frame) {
  console.log(`\n========== ${label} (frame ${frame}) ==========`);
  const s = ts.store;
  const ppu = nes.ppu;

  // 1. DataStore NT0
  let nt0 = 0;
  const sample = [];
  for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) {
    const t = s.nt0[y][x].tile;
    if (t) { nt0++; if (sample.length < 8) sample.push(`(${x},${y})=${hex2(t)}`); }
  }
  console.log(`  DataStore NT0 非零: ${nt0}/960  ${sample.join(' ')}`);

  // 2. PPU VRAM NT ($2000-$23BF)
  let vramNT = 0;
  for (let i = 0x2000; i < 0x23c0; i++) if (ppu.vramMem[i]) vramNT++;
  console.log(`  PPU vramMem $2000-$23BF 非零: ${vramNT}`);

  // 3. PPU imgPalette / sprPalette
  console.log(`  PPU imgPalette: ${Array.from(ppu.imgPalette.slice(0, 16)).map(hex).join(' ')}`);
  console.log(`  PPU sprPalette: ${Array.from(ppu.sprPalette.slice(0, 16)).map(hex).join(' ')}`);

  // 4. CHR pattern 是否有内容 (背景 ptTile 0x00-0xFF 每个 tile 非零像素数)
  let bgPtNonEmpty = 0;
  const emptyTiles = [];
  for (let t = 0; t < 256; t++) {
    const pt = ppu.ptTile[t];
    let nz = 0;
    if (pt && pt.pix) for (let i = 0; i < 64; i++) if (pt.pix[i] !== 0) { nz++; break; }
    if (nz > 0) bgPtNonEmpty++;
  }
  console.log(`  ptTile[0..255] 非空 tile: ${bgPtNonEmpty}/256`);
  // 检查常用 BOOT tile
  const checkTiles = [0x82, 0x83, 0x86, 0x87, 0x92, 0x93, 0x98, 0x99, 0x3c, 0x3d, 0x01, 0x42, 0x00];
  checkTiles.forEach(t => {
    const pt = ppu.ptTile[t];
    let nz = 0;
    if (pt && pt.pix) for (let i = 0; i < 64; i++) if (pt.pix[i]) nz++;
    console.log(`    ptTile[${hex2(t)}] 非零像素: ${nz}`);
  });

  // 5. 渲染可见性
  console.log(`  CTRL1=${hex2(ppu.f_2000_2001.ctrl1 ?? 0)} CTRL2=${hex2(ppu.f_2000_2001.ctrl2 ?? 0)}`);
  console.log(`  bgVis=${ppu.f_bgVisibility} spVis=${ppu.f_spVisibility} bgPattern=${ppu.f_bgPatternTable} spPattern=${ppu.f_spPatternTable}`);
  console.log(`  ram_0020=${hex2(s.read('ram_0020'))} ram_0021=${hex2(s.read('ram_0021'))} ram_00ED=${s.read('ram_00ED')}`);

  // 6. 帧缓冲中部颜色 (真正渲染输出)
  if (ppu.buffer) {
    const buf = ppu.buffer;
    const colors = new Set();
    for (let y = 100; y < 140; y++) for (let x = 80; x < 176; x++) colors.add(buf[y * 256 + x]);
    const arr = [...colors];
    console.log(`  FrameBuf 中部唯一色: ${arr.slice(0, 12).map(hex).join(' ')} (共${arr.length})`);
    // 统计整帧非黑像素
    let nonBlack = 0;
    for (let y = 0; y < 240; y += 2) for (let x = 0; x < 256; x += 2) if (buf[y * 256 + x] !== 0xff000000) nonBlack++;
    console.log(`  FrameBuf 非黑采样: ${nonBlack}`);
  } else {
    console.log('  ppu.buffer 不存在!');
  }

  // 7. store palette
  const pal = s.paletteTable;
  console.log(`  DataStore bg[0]: ${pal.bgPalettes[0].colors.map(c => '#' + [c.r, c.g, c.b].map(v => v.toString(16).padStart(2, '0')).join('')).join(' ')}`);
}

const ts = new Tsubasa2();
const nes = new NES({ emulateSound: false });
ts.boot();

// 跑 1, 5, 30, 100 帧
const frames = [1, 5, 30, 100];
for (let f = 0; f <= 100; f++) {
  ts.frame(nes);
  if (frames.includes(f)) analyze(`FRAME`, ts, nes, f);
}
console.log('\nDONE');
