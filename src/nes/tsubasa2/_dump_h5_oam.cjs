const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let h5 = 0; h5 <= 3721; h5++) game.frame(runtime);
const shadow = game.store.oam.shadowOam;
const out = ['=== H5 f3731 OAM ==='];
for (let i = 0; i < 64; i++) {
  const y = shadow[i * 4 + 0];
  const t = shadow[i * 4 + 1];
  const a = shadow[i * 4 + 2];
  const x = shadow[i * 4 + 3];
  if (y < 240) out.push('slot' + i + ' y=' + y + ' tile=' + t + ' attr=' + a + ' x=' + x);
}
fs.writeFileSync('_dump_h5_oam_out.txt', out.join('\n'), 'utf8');
console.log('done');
