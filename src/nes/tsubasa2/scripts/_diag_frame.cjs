// 诊断 H5 单帧 PPU 状态：palette / NT tile / NT attr / CHR plan
const fs = require('fs');
require('ts-node/register');
const { HeadlessRuntime } = require('../src/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../src/game/index');

const H5_FRAME = parseInt(process.argv[2] || '1950', 10);
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

for (let f = 0; f <= H5_FRAME; f++) {
  runtime.frame(game);
}

const ppu = runtime.ppu;
const store = game.store;

console.log('=== H5 frame', H5_FRAME, '(NES frame', H5_FRAME + 10, ') ===');
console.log('store.palette.bg', Array.from(store.palette.bg));
console.log('store.fade.bg', store.fade.bg, 'fade.spr', store.fade.spr);

// 打印 NT0 第 0-23 行 tile 和 attr
const nt0 = ppu.nameTable[0];
console.log('\n--- NT0 rows 0-23 ---');
for (let r = 0; r < 24; r++) {
  const tiles = [];
  const attrs = [];
  for (let c = 0; c < 32; c++) {
    tiles.push(nt0.tile[r * 32 + c].toString(16).padStart(2, '0'));
    attrs.push(nt0.attrib[r * 32 + c].toString(16));
  }
  console.log('r' + String(r).padStart(2, '0') + ' tiles:' + tiles.join(' '));
  console.log('r' + String(r).padStart(2, '0') + ' attrs:' + attrs.join(' '));
}

// 当前 CHR slot
console.log('\n--- CHR slots (ppu.ptTile active bank1k) ---');
console.log('chrSlots', runtime['chrSlots']);

// 当前 per-scanline plan
const opening = game.router.getController(100);
console.log('\n--- CHR plan ---');
console.log(opening ? opening.getChrPlan() : 'no opening controller');

// 输出 PPU buffer 为 PNG 用于目视确认
const zlib = require('zlib');
function crc32(d) {
  const T = [];
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); T[n] = c >>> 0; }
  let c = 0xFFFFFFFF; for (let i = 0; i < d.length; i++) c = T[(c ^ d[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(t, d) { const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0); const tb = Buffer.from(t, 'ascii'); const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0); return Buffer.concat([lb, tb, d, cb]); }
function encodePng(w, h, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4; const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (row + 1)] = 0; rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row); }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 1 })), chunk('IEND', Buffer.alloc(0))]);
}
const buf = ppu.buffer;
const rgba = Buffer.alloc(256 * 240 * 4);
for (let i = 0; i < 256 * 240; i++) { const v = buf[i]; rgba[i * 4] = (v >>> 16) & 0xff; rgba[i * 4 + 1] = (v >>> 8) & 0xff; rgba[i * 4 + 2] = v & 0xff; rgba[i * 4 + 3] = 0xff; }
const png = encodePng(256, 240, rgba);
fs.writeFileSync(`output/diag-h5-frame-${H5_FRAME}.png`, png);
console.log('\nsaved output/diag-h5-frame-' + H5_FRAME + '.png');
