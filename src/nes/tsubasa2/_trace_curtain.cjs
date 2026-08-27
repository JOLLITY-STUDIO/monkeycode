// 追踪 title curtain 期间的 per-scanline scroll 与 $2006 写入
const path = require('path');
const fs = require('fs');
const { NES } = require('./dist-cjs/core');

const ROM_PATH = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({ emulateSound: false });
nes.loadROM(romBytes);
const ppu = nes.ppu;

const START = 3720;
const END = 3790;

const origWriteVRAMAddress = ppu.writeVRAMAddress.bind(ppu);
ppu.writeVRAMAddress = function(address) {
  const before = { cntVT: this.cntVT, cntV: this.cntV, cntFV: this.cntFV, regVT: this.regVT };
  origWriteVRAMAddress(address);
  const after = { cntVT: this.cntVT, cntV: this.cntV, cntFV: this.cntFV, regVT: this.regVT };
  if (nes.fpsFrameCount >= START && nes.fpsFrameCount <= END) {
    // 只记录导致 cntVT 变化的第二次写
    if (before.cntVT !== after.cntVT || before.cntV !== after.cntV || before.cntFV !== after.cntFV) {
      console.log(`f${nes.fpsFrameCount} scan${String(this.scanline).padStart(3,' ')} dot${String(this.curX).padStart(3,' ')} $2006=$${address.toString(16).padStart(4,'0')} cnt ${before.cntV}/${before.cntVT}/${before.cntFV} -> ${after.cntV}/${after.cntVT}/${after.cntFV} regVT=${after.regVT}`);
    }
  }
};

const origRenderBgScanline = ppu.renderBgScanline.bind(ppu);
ppu.renderBgScanline = function(bgbuffer, scan) {
  if (nes.fpsFrameCount >= START && nes.fpsFrameCount <= END && scan >= 0 && scan < 240) {
    if (scan % 8 === 0) {
      console.log(`f${nes.fpsFrameCount} render scan${String(scan).padStart(3,' ')} cntV=${this.cntV} cntVT=${this.cntVT} cntFV=${this.cntFV} regVT=${this.regVT} curNt=${this.curNt}`);
    }
  }
  return origRenderBgScanline(bgbuffer, scan);
};

for (let f = 1; f <= END; f++) {
  const frameBefore = nes.fpsFrameCount;
  nes.frame();
  if (f >= START && f <= END) {
    console.log(`--- end f${f} scroll=${ppu.cntV}/${ppu.cntVT}/${ppu.cntFV} reg=${ppu.regV}/${ppu.regVT}/${ppu.regFV}`);
  }
}
