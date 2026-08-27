const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const fs = require('fs');
const r = new HeadlessRuntime();
const g = new Tsubasa2();
const ol = console.log;
console.log = () => {};
g.boot(r);
console.log = ol;
for (let i = 0; i <= 3722 - 10; i++) g.frame(r);
const nt = r.ppu.nameTable[0];
const out = [];
for (const row of [16, 18, 20, 21, 23, 25]) {
  const base = row * 32;
  out.push('r' + row + ': ' + Array.from(nt.tile.slice(base, base + 32)).map(x => x.toString(16).padStart(2, '0')).join(' '));
}
fs.writeFileSync('_h5_nt3722.txt', out.join('\n'), 'utf8');
console.log('done');
