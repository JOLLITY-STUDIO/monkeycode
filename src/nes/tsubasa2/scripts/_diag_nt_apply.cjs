const { HeadlessRuntime } = require('../dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../dist-cjs/game/index');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);
const ppu = rt.ppu;
const nt0id1 = ppu.nameTable[0];
console.log('before frame nt0 tile[384+13]=', nt0id1.tile[384 + 13]);
const before = new Uint8Array(nt0id1.tile);

// 跑第 0 帧（H5 f0 = NES f10）
rt.frame(g);
const nt0id2 = ppu.nameTable[0];
console.log('same object?', nt0id1 === nt0id2, 'same tile array?', nt0id1.tile === nt0id2.tile);
const changed = [];
for (let i = 0; i < 960; i++) {
  if (before[i] !== nt0id2.tile[i]) changed.push({ i, before: before[i], after: nt0id2.tile[i] });
}
console.log('changed tiles count=', changed.length);
changed.slice(0, 40).forEach(x => console.log(x));

console.log('ntable1=', JSON.stringify(ppu.ntable1));
console.log('nameTable len=', ppu.nameTable.length);
for (let i = 0; i < ppu.nameTable.length; i++) {
  const nt = ppu.nameTable[i];
  console.log('nt' + i, typeof nt, 'tile', nt && nt.tile && nt.tile.length, 'attrib', nt && nt.attrib && nt.attrib.length);
}

for (let i = 0; i < 4; i++) {
  const nt = ppu.nameTable[i];
  let c = 0;
  if (nt && nt.tile) for (let j = 0; j < 960; j++) if (nt.tile[j]) c++;
  console.log('nt' + i + ' nonzero tiles=', c);
}
console.log('nt0.tile[397..405]=', Array.from(ppu.nameTable[0].tile.slice(397, 406)).join(','));

console.log('reg V/H/VT/HT/FV/FH=', ppu.regV, ppu.regH, ppu.regVT, ppu.regHT, ppu.regFV, ppu.regFH);
console.log('cnt V/H/VT/HT/FV=', ppu.cntV, ppu.cntH, ppu.cntVT, ppu.cntHT, ppu.cntFV);

// 显示 nt0 中非零 tile 的行列
const nt0 = ppu.nameTable[0];
if (nt0 && nt0.tile) {
  for (let r = 0; r < 30; r++) {
    const nz = [];
    for (let c = 0; c < 32; c++) {
      const v = nt0.tile[r * 32 + c];
      if (v) nz.push(c + ':' + v);
    }
    if (nz.length) console.log('nt0 r' + r + ' ' + nz.join(' '));
  }
}
