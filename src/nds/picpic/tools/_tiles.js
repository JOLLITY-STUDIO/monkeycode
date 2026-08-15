const fs = require('fs');
const b = fs.readFileSync('roms/extracted/map/map_wakuf.NCGR');
console.log('len', b.length);
// 尝试不同起始偏移, 每 tile 32 字节 (8x8 4bpp)
for (const off of [0x10, 0x14, 0x1C, 0x20]) {
  const n = Math.floor((b.length - off) / 32);
  console.log('off=0x' + off.toString(16), 'tiles=', n);
}
// 渲染前 40 个 tile (off=0x14)
const off = 0x14;
const pal = [0, 255, 128, 200];
console.log('\noff=0x' + off.toString(16) + ' tiles:');
const nt = Math.min(40, Math.floor((b.length - off) / 32));
for (let t = 0; t < nt; t++) {
  const base = off + t * 32;
  console.log('--- tile', t);
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x += 2) {
      const v = b[base + y * 4 + x / 2];
      const c1 = v & 0x0F, c2 = (v >> 4) & 0x0F;
      row += (c1 ? c1.toString(16) : '.') + (c2 ? c2.toString(16) : '.');
    }
    console.log(row);
  }
}
