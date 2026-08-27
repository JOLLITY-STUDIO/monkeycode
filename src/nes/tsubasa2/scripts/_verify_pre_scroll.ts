/**
 * _verify_pre_scroll.ts — 用 src/core 重跑片头, 在 pre-render scanline (renderBgScanline scan===0)
 * 采集 reg/cnt 真值, 验证 f343-f824 段渲染实际用的垂直滚动 (vt=31 vs vt=0)。
 */
import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
const ppu: any = (nes as any).ppu;

const origRender = ppu.renderBgScanline.bind(ppu);
let curPre: any = null;
ppu.renderBgScanline = function (bgbuffer: any, scan: number) {
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
console.log('[start]');
try {
  for (let f = 1; f <= 780; f++) {
    nes.frame();
    if (f === 343 || (f >= 690 && f <= 780)) {
      const e: any = { f, ...curPre };
      console.log(
        `f${e.f}: regV=${e.regV} regH=${e.regH} regVT=${e.regVT} regHT=${e.regHT} regFV=${e.regFV} regFH=${e.regFH} | ` +
        `cntV=${e.cntV} cntH=${e.cntH} cntVT=${e.cntVT} cntHT=${e.cntHT} cntFV=${e.cntFV}`
      );
    }
    if (f % 100 === 0) console.log('[p] f=' + f);
  }
} catch (err) {
  console.log('[ERR]', err);
}
console.log('done in', ((Date.now() - t0) / 1000).toFixed(1) + 's');
