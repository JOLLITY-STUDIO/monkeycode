// 检查 f860 NT1 tile 分布和屏幕上的非黑像素位置
const fs = require('fs');
const nt = JSON.parse(fs.readFileSync('output/emu-full/frame-0860/nt.json', 'utf8'));

console.log('=== emu f860 NT1 非零 tile ===');
for (let r = 0; r < 30; r++) {
  let row = '';
  for (let c = 0; c < 32; c++) {
    const v = nt[1].tile[r * 32 + c];
    if (v !== 0) row += `(${c},${r},0x${v.toString(16).padStart(2,'0')}) `;
  }
  if (row) console.log(row.trim());
}

// 用 png 解析库检查屏幕橙色区域
const zlib = require('zlib');
const buf = fs.readFileSync('output/emu-full/frame-0860/screen.png');
const idx = buf.indexOf('IDAT');
if (idx >= 0) {
  const len = buf.readUInt32BE(idx - 4);
  const data = buf.slice(idx + 4, idx + 4 + len);
  const raw = zlib.inflateSync(data);
  // 256x240 RGB, filter bytes
  const px = [];
  for (let y = 0; y < 240; y++) {
    const row = [];
    const p = y * (1 + 256 * 3);
    const filter = raw[p];
    for (let x = 0; x < 256; x++) {
      const r = raw[p + 1 + x * 3];
      const g = raw[p + 2 + x * 3];
      const b = raw[p + 3 + x * 3];
      row.push((r << 16) | (g << 8) | b);
    }
    px.push(row);
  }
  console.log('\n=== emu f860 非黑像素位置 ===');
  for (let y = 0; y < 240; y++) {
    for (let x = 0; x < 256; x++) {
      if (px[y][x] !== 0) {
        if (x % 8 === 0 && y % 8 === 0) {
          console.log(`px(${x},${y})=${px[y][x].toString(16).padStart(6,'0')}`);
        }
      }
    }
  }
  // 统计橙色 (#ff9900 附近)
  let orange = 0;
  for (let y = 0; y < 240; y++) for (let x = 0; x < 256; x++) {
    const c = px[y][x];
    const r = (c >> 16) & 0xff, g = (c >> 8) & 0xff, b = c & 0xff;
    if (r > 200 && g > 100 && g < 180 && b < 50) orange++;
  }
  console.log('\n橙色像素数:', orange);
}
