const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');
const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);
for (let f = 0; f < 11; f++) r.frame(g);
const nt = r.ppu.nameTable[0];
console.log('H5 NT0 tiles rows 12-15 cols 12-23:');
for (let y = 12; y <= 15; y++) {
  let s = '';
  for (let x = 12; x <= 23; x++) s += nt.tile[y * 32 + x].toString(16).padStart(2, '0') + ' ';
  console.log('y' + y + ': ' + s);
}
console.log('H5 NT0 attrib rows 12-15 cols 12-23:');
for (let y = 12; y <= 15; y++) {
  let s = '';
  for (let x = 12; x <= 23; x++) s += nt.attrib[y * 32 + x].toString(16).padStart(2, '0') + ' ';
  console.log('y' + y + ': ' + s);
}
