/**
 * _save_frame.cjs — 跑 N 帧后把 ppu.buffer 保存为 BMP (确认画面内容)
 * 用法: node debug/_save_frame.cjs <frames>
 */
const path = require('path');
const fs = require('fs');
const frames = parseInt(process.argv[2] || '60', 10);
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));
const game = new ts.default(nes);
game.boot();
for (let i = 0; i < frames; i++) game.frame(nes);

const ppu = nes.ppu;
const W = 256, H = 240;
// BMP: 54B 头 + BGR 每像素 (行补 0 到 4 字节对齐)
const rowSize = ((W * 3 + 3) >> 2) << 2;
const dataSize = rowSize * H;
const bmp = Buffer.alloc(54 + dataSize);
bmp.write('BM', 0);
bmp.writeUInt32LE(54 + dataSize, 2);
bmp.writeUInt32LE(54, 10);
bmp.writeUInt32LE(40, 14);
bmp.writeInt32LE(W, 18);
bmp.writeInt32LE(H, 22);
bmp.writeUInt16LE(1, 26);
bmp.writeUInt16LE(24, 28);
bmp.writeUInt32LE(0, 30);
bmp.writeUInt32LE(dataSize, 34);
for (let y = 0; y < H; y++) {
  const dstY = H - 1 - y;
  for (let x = 0; x < W; x++) {
    const c = ppu.buffer[y * 256 + x];
    const off = 54 + dstY * rowSize + x * 3;
    bmp[off] = c & 0xff;        // B
    bmp[off + 1] = (c >> 8) & 0xff;   // G
    bmp[off + 2] = (c >> 16) & 0xff;  // R
  }
}
const out = path.resolve(__dirname, `_frame${frames}.bmp`);
fs.writeFileSync(out, bmp);
// 统计
let nz = 0;
for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) nz++;
console.log(`frame=${frames} buffer nonZero=${nz} saved=${out}`);
