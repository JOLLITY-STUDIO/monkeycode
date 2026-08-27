// 轻量重跑 emu 4332 帧：捕获每帧 per-scanline 横向滚动切换点 (regH/regHT/regFH)
// 输出 output/emu-full/scroll-scan.json
// 用途: _gen_opening_frame_table.cjs 生成 sc 字段（H5 无 CPU，需在对应 buffer row 注入滚动切换）
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
const ppu = nes.ppu;

const TOTAL = Number(process.env.GT_FRAMES) || 4332;
const out = [];

const origRender = ppu.renderBgScanline.bind(ppu);
// 每帧缓存 [scan] -> {h, ht, fh}（buffer row 0..239）
let curScans = null;
ppu.renderBgScanline = function (bgbuffer, scan) {
  if (scan >= 0 && scan <= 239 && curScans) {
    curScans[scan] = { h: ppu.regH ?? 0, ht: ppu.regHT ?? 0, fh: ppu.regFH ?? 0 };
  }
  return origRender(bgbuffer, scan);
};

const t0 = Date.now();
for (let f = 1; f <= TOTAL; f++) {
  curScans = new Array(240).fill(null);
  nes.frame();
  // 压缩: 从 scan 1 起（scan 0 = 帧起始，已由 s 字段覆盖），
  // 找出与前一扫描线不同的点
  const sc = [];
  let prev = curScans[0];
  for (let s = 1; s < 240; s++) {
    const cur = curScans[s];
    if (!cur) continue;
    if (!prev) { prev = cur; continue; }
    if (cur.h !== prev.h || cur.ht !== prev.ht || cur.fh !== prev.fh) {
      sc.push({ s, h: cur.h, ht: cur.ht, fh: cur.fh });
      prev = cur;
    }
  }
  out.push({ f, sc });
  if (f % 500 === 0) {
    console.log(`f${f}/${TOTAL} fps=${(f / ((Date.now() - t0) / 1000)).toFixed(1)}`);
  }
}

const OUT = path.join(__dirname, 'output', 'emu-full', 'scroll-scan.json');
fs.writeFileSync(OUT, JSON.stringify(out));
const withChanges = out.filter(e => e.sc.length > 0).length;
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${OUT}`);
console.log(`frames with mid-frame scroll changes: ${withChanges}/${out.length}`);
