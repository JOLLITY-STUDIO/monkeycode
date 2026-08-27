// 追踪 f760 帧内 $2005/$2006 滚动写入序列 + pre-render 时刻 reg/cnt
const fs = require('fs');
const path = require('path');
const { NES } = require('./dist-cjs2/core');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES();
nes.loadROM(fs.readFileSync(ROM_PATH));
const ppu = nes.ppu;

// hook $2005
const origScroll = ppu.scrollWrite.bind(ppu);
let frame = 0;
let writes = [];
let curPre = null;
ppu.scrollWrite = function (value) {
  const w = this.firstWrite ? 'X' : 'Y';
  const wasVT = this.regVT;
  const wasHT = this.regHT;
  const wasFH = this.regFH;
  const wasFV = this.regFV;
  origScroll(value);
  writes.push(`  $2005 ${w} v=${value} -> regHT=${this.regHT} regFH=${this.regFH} regVT=${this.regVT} regFV=${this.regFV} (was VT=${wasVT} HT=${wasHT})`);
};
// hook $2006
const origVram = ppu.writeVRAMAddress.bind(ppu);
ppu.writeVRAMAddress = function (address) {
  const wasVT = this.regVT;
  const wasHT = this.regHT;
  const first = this.firstWrite;
  origVram(address);
  writes.push(`  $2006 ${first ? 'hi' : 'lo'} addr=${address.toString(16).padStart(2, '0')} -> regV=${this.regV} regH=${this.regH} regVT=${this.regVT} regHT=${this.regHT} regFV=${this.regFV} (was VT=${wasVT} HT=${wasHT})`);
};
// hook pre-render
const origRender = ppu.renderBgScanline.bind(ppu);
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

const WATCH = [755, 756, 757, 758, 759, 760, 761, 762];
for (let f = 1; f <= 780; f++) {
  writes = [];
  nes.frame();
  if (WATCH.includes(f)) {
    console.log(`=== f${f} pre-render: regV=${curPre.regV} regH=${curPre.regH} regVT=${curPre.regVT} regHT=${curPre.regHT} regFV=${curPre.regFV} regFH=${curPre.regFH} | cntV=${curPre.cntV} cntH=${curPre.cntH} cntVT=${curPre.cntVT} cntHT=${curPre.cntHT} cntFV=${curPre.cntFV}`);
    const w2005 = writes.filter(w => w.includes('$2005'));
    const w2006 = writes.filter(w => w.includes('$2006'));
    console.log(`  writes: $2005 x${w2005.length} $2006 x${w2006.length}`);
    // 只显示最后一次 $2005 序列和所有 $2006
    console.log('  last $2005:', w2005.slice(-4).join('\n  '));
    console.log('  $2006 (last 8):', w2006.slice(-8).join('\n  '));
  }
}
