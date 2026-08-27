const fs = require('fs');
function fmtRow(arr, r) {
  const base = r * 32;
  const tiles = arr.slice(base, base + 32);
  return `${r}: ` + Array.from(tiles).map((x) => x.toString(16).padStart(2, '0')).join(' ');
}
const out = [];
for (const f of [3731, 3742, 3780]) {
  const p = `output/emu-full/frame-${String(f).padStart(4, '0')}/nt.json`;
  const nt = JSON.parse(fs.readFileSync(p, 'utf8'));
  out.push(`\n=== emu f${f} NT0 ===`);
  for (const r of [26, 27, 28, 29, 30, 31]) out.push(fmtRow(nt[0].tile, r));
}
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (const target of [3731, 3742, 3780]) {
  const h5 = target - 10;
  while (game['_frame'] <= h5) game.frame(runtime);
  out.push(`\n=== H5 f${target} (h5=${h5}) NT0 ===`);
  const nt = runtime.ppu.nameTable[0];
  for (const r of [26, 27, 28, 29, 30, 31]) out.push(fmtRow(nt.tile, r));
}
fs.writeFileSync('_compare_nt2_out.txt', out.join('\n'), 'utf8');
console.log('done');
