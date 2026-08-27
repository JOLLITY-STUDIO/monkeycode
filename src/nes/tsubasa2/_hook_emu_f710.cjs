// 跑 emu 到 f710，hook renderBgScanline 抓每行渲染时的 reg*/cnt* 真值
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
const ppu = nes.ppu;

const rows = [];
const origRender = ppu.renderBgScanline.bind(ppu);
ppu.renderBgScanline = function (bgbuffer, scan) {
  if (scan >= 0) {
    rows.push({
      scan,
      regVT: ppu.regVT, regHT: ppu.regHT, regFV: ppu.regFV, regFH: ppu.regFH,
      regV: ppu.regV, regH: ppu.regH,
      cntVT: ppu.cntVT, cntHT: ppu.cntHT, cntFV: ppu.cntFV, cntV: ppu.cntV, cntH: ppu.cntH,
    });
  }
  return origRender(bgbuffer, scan);
};

const t0 = Date.now();
for (let f = 1; f <= 710; f++) {
  nes.frame();
  if (f === 710) {
    // 只保留最后一帧(710)的行记录
    const seen = new Set();
    const dedup = rows.filter(r => { if (seen.has(r.scan)) return false; seen.add(r.scan); return true; });
    fs.writeFileSync('_emu_f710_rows.json', JSON.stringify(dedup));
    console.log('f710 rows captured:', dedup.length);
  } else {
    rows.length = 0;
  }
  if (f % 200 === 0) console.log('f' + f, ((Date.now() - t0) / 1000).toFixed(1) + 's');
}
console.log('done');
