// 对比 H5 nes=800 (h5=790) 与 emu frame-0800 的 NT0 对话框区域（r18-r30）
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const TARGET = 800; // NES 帧
const END = TARGET - 10; // h5 = nes - 10
for (let h5 = 0; h5 <= END; h5++) {
  game.frame(runtime);
}

const ppu = runtime.ppu;
const out = [];
out.push('=== H5 nes ' + TARGET + ' (h5 ' + END + ') NT0 r18-r30 ===');
for (let r = 18; r <= 30; r++) {
  const base = r * 32;
  const tiles = Array.from(ppu.nameTable[0].tile.slice(base, base + 32));
  const hex = tiles.map((x) => x.toString(16).padStart(2, '0')).join(' ');
  out.push(r + ': ' + hex);
}
out.push('--- H5 NT1/2/3 r18-r30 tile count ---');
for (let nt = 1; nt <= 3; nt++) {
  let nz = 0;
  for (let r = 18; r <= 30; r++) {
    const base = r * 32;
    const tiles = Array.from(ppu.nameTable[nt].tile.slice(base, base + 32));
    for (const t of tiles) if (t !== 0) nz++;
  }
  out.push('NT' + nt + ' nonzero r18-30: ' + nz);
}

// emu 对比
out.push('');
out.push('=== emu frame-0800 NT0 r18-r30 (reference) ===');
const emu = JSON.parse(fs.readFileSync('output/emu-full/frame-0800/nt.json', 'utf8'));
for (const nt of emu) {
  if (nt.idx !== 0) continue;
  for (let r = 18; r <= 30; r++) {
    const base = r * 32;
    const tiles = Array.from(nt.tile.slice(base, base + 32));
    const hex = tiles.map((x) => x.toString(16).padStart(2, '0')).join(' ');
    out.push(r + ': ' + hex);
  }
  break;
}

// 关键：H5 的 0x94/0x95 位置
out.push('');
out.push('=== H5 0x94/0x95 tile count in NT0 ===');
{
  let c94 = 0, c95 = 0;
  for (let i = 0; i < ppu.nameTable[0].tile.length; i++) {
    const t = ppu.nameTable[0].tile[i];
    if (t === 0x94) c94++;
    if (t === 0x95) c95++;
  }
  out.push('0x94: ' + c94 + '  0x95: ' + c95);
}
fs.writeFileSync('_diag_dakuten_out.txt', out.join('\n'), 'utf8');
console.log('done');
