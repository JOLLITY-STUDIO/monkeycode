// 尝试解析 fap 为多种网格布局
const fs = require('fs');
const f = process.argv[2] || 'roms/extracted/fap_d/3300401_rooster.fap';
const b = fs.readFileSync(f);
console.log(`=== ${f.split('/').pop()} len=${b.length} ===`);

// 尝试1: 12x12 每格1字节
function render(w, h, getV) {
  console.log(`\n--- ${w}x${h} ---`);
  for (let y = 0; y < h; y++) {
    let l = '';
    for (let x = 0; x < w; x++) {
      const v = getV(x, y);
      l += v === 0 ? '..' : (v >= 16 ? '##' : v.toString(16) + v.toString(16));
    }
    console.log(l);
  }
}

// 尝试A: 12x12 每格1字节, 0xFF=空格
render(12, 12, (x, y) => b[y * 12 + x] === 0xFF ? 0 : b[y * 12 + x]);

// 尝试B: 半字节 16x18 (高nibble优先)
render(16, 18, (x, y) => {
  const i = y * 16 + x;
  const byte = b[i >> 1];
  const v = (i & 1) ? (byte & 0x0F) : (byte >> 4);
  return v === 0xF ? 0 : v;
});

// 尝试C: 半字节 24x12
render(24, 12, (x, y) => {
  const i = y * 24 + x;
  const byte = b[i >> 1];
  const v = (i & 1) ? (byte & 0x0F) : (byte >> 4);
  return v === 0xF ? 0 : v;
});
