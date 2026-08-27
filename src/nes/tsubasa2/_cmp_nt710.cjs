// f710: emu NT0 vs H5 NT0 逐 tile 比对
const fs = require('fs');
const nt = JSON.parse(fs.readFileSync('output/emu-full/frame-0710/nt.json', 'utf8'));
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let h5 = 0; h5 <= 700; h5++) game.frame(runtime);

const out = [];
const emuT = nt[0].tile, emuA = nt[0].attrib;
const h5nt = runtime.ppu.nameTable[0];
const h5T = h5nt.tile, h5A = h5nt.attrib;

let diffRows = 0;
for (let r = 0; r < 30; r++) {
  const diff = [];
  for (let c = 0; c < 32; c++) {
    const i = r * 32 + c;
    if (emuT[i] !== h5T[i]) diff.push(`${c}:${emuT[i].toString(16)}v${h5T[i].toString(16)}`);
    if (emuA && h5A && emuA[i] !== h5A[i]) diff.push(`a${c}:${emuA[i].toString(16)}v${h5A[i].toString(16)}`);
  }
  if (diff.length) {
    diffRows++;
    out.push(`row${r} [${diff.join(' ')}]`);
  }
}
out.unshift(`emu tile 非0: ${emuT.filter(x => x !== 0).length} | H5 tile 非0: ${h5T.filter(x => x !== 0).length}`);
out.unshift(`差异行数: ${diffRows}/30`);
fs.writeFileSync('_cmp_nt710_out.txt', out.join('\n'), 'utf8');
console.log(out.join('\n'));
console.log('done');
