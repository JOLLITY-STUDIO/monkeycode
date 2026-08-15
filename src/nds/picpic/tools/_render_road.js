// 渲染 map_d: 只显示路格(v<8) 为线, 其余为空格
const fs = require('fs');
const f = process.argv[2] || 'roms/extracted/map_d/4000101_Cat & mouse.map';
const b = fs.readFileSync(f);
const h = b[0], w = b[1];
const body = b.slice(6);
const road = v => v < 8;
console.log(`=== ${f.split('/').pop()} ${w}x${h} 路格视图(v<8) ===`);
for (let y = 0; y < h; y++) {
  let l = '';
  for (let x = 0; x < w; x++) {
    const i = y * w + x;
    const n = (i & 1) ? (body[i >> 1] >> 4) : (body[i >> 1] & 0x0F);
    l += road(n) ? (n === 0 ? '.' : n.toString(16)) : ' ';
  }
  console.log(l);
}
