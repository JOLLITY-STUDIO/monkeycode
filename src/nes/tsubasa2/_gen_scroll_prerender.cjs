// 轻量重跑 emu 4332 帧：捕获每帧 pre-render 时刻的 reg/cnt（渲染真正使用的 scroll）
// 输出 output/emu-full/scroll-prerender.json（供 _gen_opening_frame_table.cjs 使用）
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
let curPre = null;
ppu.renderBgScanline = function (bgbuffer, scan) {
  if (scan === 0) {
    curPre = {
      regV: ppu.regV, regH: ppu.regH, regVT: ppu.regVT, regHT: ppu.regHT,
      regFV: ppu.regFV, regFH: ppu.regFH,
      cntV: ppu.cntV, cntH: ppu.cntH, cntVT: ppu.cntVT, cntHT: ppu.cntHT, cntFV: ppu.cntFV,
    };
  }
  return origRender(bgbuffer, scan);
};

const t0 = Date.now();
for (let f = 1; f <= TOTAL; f++) {
  nes.frame();
  out.push({ f, ...curPre });
  if (f % 500 === 0) {
    console.log(`f${f}/${TOTAL} fps=${(f / ((Date.now() - t0) / 1000)).toFixed(1)}`);
  }
}

const OUT = path.join(__dirname, 'output', 'emu-full', 'scroll-prerender.json');
fs.writeFileSync(OUT, JSON.stringify(out));
console.log('done in', ((Date.now() - t0) / 1000).toFixed(1) + 's', '->', OUT);
