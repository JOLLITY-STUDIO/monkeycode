// 解析 lap 文件: 26字节头 + W*H 每格1字节
const fs = require('fs');
const f = process.argv[2] || 'roms/extracted/lap_d/1_dat/2000203_Coffee maker.lap';
const b = fs.readFileSync(f);
const w = b[0], h = b[1];
const head = 26;
console.log(`=== ${f.split('/').pop()} len=${b.length} WxH=${w}x${h} head=${head} data=${b.length - head} ===`);
for (let y = 0; y < h; y++) {
  let line = '';
  for (let x = 0; x < w; x++) {
    const v = b[head + y * w + x];
    line += v === 0 ? '  ' : v.toString(16).padStart(2, '0') + ' ';
  }
  console.log(line);
}
// 值统计
const cnt = {};
for (let i = head; i < b.length; i++) {
  const v = b[i];
  cnt[v] = (cnt[v] || 0) + 1;
}
console.log('\nvalue counts:', Object.entries(cnt).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + 'x' + v).join(' '));
