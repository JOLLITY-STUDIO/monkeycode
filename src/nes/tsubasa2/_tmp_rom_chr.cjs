// 临时：从 ROM 直接读 CHR bank 15，对比 H5 chr-bank-15.ts
const fs = require('fs');
const romPath = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const buf = fs.readFileSync(romPath);
console.log('ROM size =', buf.length);
const prgCount = buf[4];
const chrCount = buf[5];
console.log('prgCount=', prgCount, 'chrCount=', chrCount, 'mapper=', (buf[6] >> 4) | (buf[7] & 0xf0));
const chrStart = 16 + prgCount * 16384;
console.log('chrStart =', chrStart);
if (chrCount < 16) { console.log('WARN chrCount<16, bank15 越界'); }
// bank 15 的 8KB
const off = chrStart + 15 * 8192;
const b15 = buf.slice(off, off + 8192);
console.log('bank15[4096..4103] =', Array.from(b15.slice(4096, 4104)));
console.log('bank15[4736..4743] (tile40 p0) =', Array.from(b15.slice(4736, 4744)));
console.log('bank15[4744..4751] (tile40 p1) =', Array.from(b15.slice(4744, 4752)));
// tile 40-63 完整对比 emu
for (let t = 40; t <= 63; t++) {
  const o = 4096 + t * 16;
  const p0 = Array.from(b15.slice(o, o + 8));
  const p1 = Array.from(b15.slice(o + 8, o + 16));
  console.log('ROM tile', t, 'p0=' + JSON.stringify(p0), 'p1=' + JSON.stringify(p1));
}
// H5 chr-bank-15.ts 中相同区间
const src = fs.readFileSync('src/game/chr/chr-bank-15.ts', 'utf8');
console.log('--- chr-bank-15.ts head ---');
console.log(src.slice(0, 600));
