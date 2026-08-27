// 检查 H5 f700 的 shadowOam 与 emu f709/f710/f711 spriteMem 的匹配度
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i < 700; i++) game.frame(runtime);
const h5 = game.store.oam.shadowOam;

function compare(file) {
  const emu = JSON.parse(fs.readFileSync(file, 'utf8'));
  let same = 0, total = 0;
  for (let i = 0; i < 64; i++) {
    total += 4;
    if (h5[i * 4 + 0] === emu[i].y) same++;
    if (h5[i * 4 + 1] === emu[i].tile) same++;
    if (h5[i * 4 + 2] === emu[i].attr) same++;
    if (h5[i * 4 + 3] === emu[i].x) same++;
  }
  return `${same}/${total} = ${(same / total * 100).toFixed(2)}%`;
}

console.log('H5 f700 vs emu f709:', compare('_emu_oam_f709.json'));
console.log('H5 f700 vs emu f710:', compare('output/emu-full/frame-0710/oam.json'));
console.log('H5 f700 vs emu f711:', compare('_emu_oam_f711.json'));
