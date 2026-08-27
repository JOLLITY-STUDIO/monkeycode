// read real ROM header + check mirroring setup in core
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
if (!fs.existsSync(romPath)) {
  console.log('ROM not found at', romPath);
  // search
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.nes$/i.test(e.name)) console.log('found:', p);
    }
  };
  walk(path.join(__dirname, 'docs'));
  walk(path.join(__dirname, 'rom-data'));
} else {
  const buf = fs.readFileSync(romPath);
  const prg = buf[4], chr = buf[5], flags6 = buf[6], flags7 = buf[7];
  const mapper = (flags7 & 0xf0) | (flags6 >> 4);
  const mirror = flags6 & 1;
  const fourscreen = flags6 & 8;
  console.log(`PRG=${prg}KB CHR=${chr}KB mapper=${mapper} mirroring_bit0=${mirror} fourscreen=${fourscreen ? 'Y' : 'N'}`);
  console.log(`mirroring = ${fourscreen ? 'FOURSCREEN' : (mirror ? 'VERTICAL' : 'HORIZONTAL')} (nesdev bit0=1 vertical, bit0=0 horizontal)`);
}
// check core nes/ppu mirroring setup
const ppuIdx = path.join(__dirname, 'src', 'core', 'ppu', 'index.ts');
const ppuSrc = fs.readFileSync(ppuIdx, 'utf8');
const m = ppuSrc.match(/HORIZONTAL_MIRRORING\s*[:=][^\n]*/g);
console.log('\ncore ppu mirroring consts:');
for (const x of (m || []).slice(0, 8)) console.log(' ', x.trim());
// check how NES sets mirroring on loadROM
const nesIdx = path.join(__dirname, 'src', 'core', 'nes.ts');
const nesSrc = fs.readFileSync(nesIdx, 'utf8');
const lines = nesSrc.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/setMirroring|mirroring/i.test(lines[i])) console.log(`nes.ts:${i + 1}: ${lines[i].trim().slice(0, 120)}`);
}
