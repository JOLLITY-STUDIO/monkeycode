// 渲染 fap 为 15x15 nibble（头6字节，低nibble先），并对比 map 的 v<8
const fs = require('fs');

// --- fap: rooster ---
const b = fs.readFileSync('roms/extracted/fap_d/3300401_rooster.fap');
console.log('=== rooster.fap 15x15 (head6 + nibble lo-first) ===');
for (let y = 0; y < 15; y++) {
  let l = '';
  for (let x = 0; x < 15; x++) {
    const i = y * 15 + x;
    const byte = b[6 + (i >> 1)];
    const v = (i & 1) ? (byte >> 4) : (byte & 0x0F);
    l += v === 0xF ? '  ' : (v === 0 ? '00' : v.toString(16).repeat(2));
  }
  console.log(l);
}
// 值统计
const cnt = {};
for (let i = 0; i < 15 * 15; i++) {
  const byte = b[6 + (i >> 1)];
  const v = (i & 1) ? (byte >> 4) : (byte & 0x0F);
  cnt[v] = (cnt[v] || 0) + 1;
}
console.log('nibble counts:', JSON.stringify(cnt));
console.log('tail bytes:', Array.from(b.slice(6 + 113)).map(x => x.toString(16)).join(' '));
