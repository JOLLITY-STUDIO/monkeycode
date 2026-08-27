// 追踪 curtain 期间 $2005/$2006 与 pre-render 初始化
const path = require('path');
const fs = require('fs');
const { NES } = require('./dist-cjs/core');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({ emulateSound: false });
nes.loadROM(romBytes);
const ppu = nes.ppu;

const START = 3725;
const END = 3785;
const OUT = '_trace_curtain3.log';
const lines = [];

function fmtScan(s) { return String(s).padStart(3, '0'); }
function fmtDot(s) { return String(s).padStart(3, '0'); }

const origWriteVRAMAddress = ppu.writeVRAMAddress.bind(ppu);
ppu.writeVRAMAddress = function(address) {
  const before = { v: this.cntV, vt: this.cntVT, fv: this.cntFV, rv: this.regV, rvt: this.regVT };
  origWriteVRAMAddress(address);
  const after = { v: this.cntV, vt: this.cntVT, fv: this.cntFV, rv: this.regV, rvt: this.regVT };
  const f = nes.fpsFrameCount;
  if (f >= START && f <= END) {
    lines.push(`W2006 f=${f} scan=${fmtScan(this.scanline)} dot=${fmtDot(this.curX)} addr=$${address.toString(16).padStart(4,'0')} cnt=${before.v}/${before.vt}/${before.fv} rv=${before.rv}/${before.rvt} -> cnt=${after.v}/${after.vt}/${after.fv} rv=${after.rv}/${after.rvt}`);
  }
};

const origScrollWrite = ppu.scrollWrite.bind(ppu);
ppu.scrollWrite = function(value) {
  const before = { fv: this.regFV, fh: this.regFH, vt: this.regVT, ht: this.regHT };
  origScrollWrite(value);
  const after = { fv: this.regFV, fh: this.regFH, vt: this.regVT, ht: this.regHT };
  const f = nes.fpsFrameCount;
  if (f >= START && f <= END) {
    lines.push(`W2005 f=${f} scan=${fmtScan(this.scanline)} dot=${fmtDot(this.curX)} val=$${value.toString(16).padStart(2,'0')} ${before.fh}/${before.ht}/${before.fv}/${before.vt} -> ${after.fh}/${after.ht}/${after.fv}/${after.vt} first=${this.firstWrite ? 1 : 0}`);
  }
};

const origEndScanline = ppu.endScanline.bind(ppu);
ppu.endScanline = function() {
  const f = nes.fpsFrameCount;
  if (f >= START && f <= END && this.scanline === 20) {
    lines.push(`PRE f=${f} BEFORE pre-render init rv=${this.regV}/${this.regVT}/${this.regFV} cnt=${this.cntV}/${this.cntVT}/${this.cntFV}`);
  }
  origEndScanline();
  if (f >= START && f <= END && this.scanline === 20) {
    lines.push(`PRE f=${f} AFTER  pre-render init rv=${this.regV}/${this.regVT}/${this.regFV} cnt=${this.cntV}/${this.cntVT}/${this.cntFV} override=${this.renderStartOverride ? 'yes' : 'no'}`);
  }
};

const origRenderBgScanline = ppu.renderBgScanline.bind(ppu);
ppu.renderBgScanline = function(bgbuffer, scan) {
  const f = nes.fpsFrameCount;
  if (f >= START && f <= END && scan >= 0 && scan < 240) {
    if (scan % 40 === 0) {
      lines.push(`R f=${f} scan=${fmtScan(scan)} cnt=${this.cntV}/${this.cntVT}/${this.cntFV} rv=${this.regV}/${this.regVT} curNt=${this.curNt}`);
    }
  }
  return origRenderBgScanline(bgbuffer, scan);
};

for (let f = 1; f <= END; f++) {
  nes.frame();
  if (f >= START && f <= END) {
    lines.push(`E f=${f} endcnt=${ppu.cntV}/${ppu.cntVT}/${ppu.cntFV} regrv=${ppu.regV}/${ppu.regVT}/${ppu.regFV}`);
  }
}

fs.writeFileSync(OUT, lines.join('\n'), 'utf8');
console.log('wrote', OUT, 'lines=', lines.length);
