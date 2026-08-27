// 临时诊断3：对比 H5 CHR_BANKS[15] 与 emu pt.json 的 tile 40-63
const { CHR_BANKS } = require('./dist-cjs/game/chr/index');
const fs = require('fs');

const emuPt = JSON.parse(fs.readFileSync('output/emu-full/frame-0010/pt.json', 'utf8'));
const emuMap = {};
for (const e of emuPt) emuMap[e.idx] = e;

const bank15 = CHR_BANKS[15];
console.log('CHR_BANKS[15] length =', bank15.length);

// bank1k 124 = bank15 offset 4096-5120; tile 40-63 在 offset 4736-5120
for (let t = 40; t <= 63; t++) {
  const off = 4096 + t * 16;
  const p0 = bank15.slice(off, off + 8);
  const p1 = bank15.slice(off + 8, off + 16);
  const emu = emuMap[t];
  const e0 = emu ? emu.plane0 : null;
  const e1 = emu ? emu.plane1 : null;
  const p0s = Array.from(p0).join(',');
  const p1s = Array.from(p1).join(',');
  const match = e0 && e1 && p0s === e0.join(',') && p1s === e1.join(',');
  console.log(`tile ${t}: h5p0=[${p0s}] h5p1=[${p1s}] emuMatch=${match}`);
}
