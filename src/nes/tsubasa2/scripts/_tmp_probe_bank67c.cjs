// 探查 bank06 脚本区后续 & bank07 tile 流结构
const fs = require('fs');
const path = require('path');
function loadBank(bankNo) {
  const dir = path.join(__dirname, '..', 'src', 'asm', `bank${String(bankNo).padStart(2, '0')}`);
  const bytes = [];
  for (const p of ['data_tables.s', 'data_maps.s', 'data_tail.s']) {
    const c = fs.readFileSync(path.join(dir, p), 'utf8');
    const hex = c.match(/\$([0-9A-Fa-f]{2})/g) || [];
    for (const h of hex) bytes.push(parseInt(h.slice(1), 16));
  }
  return bytes;
}
const b6 = loadBank(6);
const b7 = loadBank(7);
const u16 = (a, o) => a[o] | (a[o + 1] << 8);

console.log('=== bank06 0x2E0-0x320（seg[5] 前后）===');
for (let o = 0x2E0; o < 0x320; o += 16) {
  console.log('  ' + b6.slice(o, o + 16).map(v => v.toString(16).padStart(2, '0')).join(' '));
}

console.log('\n=== bank06 0x300-0x600 指针扫描（$A000-BFFF 连续）===');
let i = 0x300;
const p2 = [];
while (i + 1 < 0x600) {
  const p = u16(b6, i);
  if (p >= 0xA000 && p <= 0xBFFF) { p2.push({ o: i, p }); i += 2; }
  else break;
}
console.log('连续指针:', p2.length);
p2.forEach((x, idx) => {
  const next = idx + 1 < p2.length ? p2[idx + 1].p : 0;
  console.log(`  off 0x${x.o.toString(16)}: $${x.p.toString(16)} len=${next ? next - x.p : '?'}`);
});

console.log('\n=== bank06 0x600-0x1000 是否全 FF ===');
let allFF = true;
for (let o = 0x600; o < 0x1000; o++) if (b6[o] !== 0xFF) { allFF = false; console.log('  non-FF at', o.toString(16), b6[o].toString(16)); break; }
console.log('  0x600-0x1000 allFF:', allFF);

// bank06 0x1800 区域结构：指针表 + 数据
console.log('\n=== bank06 0x1800 起指针表 ===');
let j = 0x1800;
const p3 = [];
while (j + 1 < 0x1b40) {
  const p = u16(b6, j);
  if (p >= 0xB800 && p <= 0xBFFF) { p3.push({ o: j, p }); j += 2; }
  else break;
}
console.log('指针数:', p3.length);
p3.slice(0, 40).forEach((x, idx) => {
  const next = idx + 1 < p3.length ? p3[idx + 1].p : 0x2000;
  console.log(`  off 0x${x.o.toString(16)}: $${x.p.toString(16)} len=${next - x.p}`);
});

// 看 0x1800 第一个指针指向的数据格式
console.log('\n=== bank06 @$B82A 指向的数据 ===');
const p0 = u16(b6, 0x1800);
console.log('  p0 =', p0.toString(16), 'off =', (p0 - 0xB800 + 0x1800).toString(16));
const off = p0 - 0xA000;
console.log('  data:', b6.slice(off, off + 48).map(v => v.toString(16).padStart(2, '0')).join(' '));

// bank06 0x1B40 区域
console.log('\n=== bank06 0x1B40 起指针表 ===');
j = 0x1B40;
const p4 = [];
while (j + 1 < 0x1d00) {
  const p = u16(b6, j);
  if (p >= 0xBB00 && p <= 0xBFFF) { p4.push({ o: j, p }); j += 2; }
  else break;
}
console.log('指针数:', p4.length);
p4.slice(0, 30).forEach((x, idx) => {
  const next = idx + 1 < p4.length ? p4[idx + 1].p : 0x2000;
  console.log(`  off 0x${x.o.toString(16)}: $${x.p.toString(16)} len=${next - x.p}`);
});

// bank07 tile 流：看 chr[0x17] 完整数据（前 6 字节是配置头）
console.log('\n=== bank07 chr[0x17] @ off 0x373 完整（len 56）===');
console.log('  ' + b7.slice(0x373, 0x373 + 56).map(v => v.toString(16).padStart(2, '0')).join(' '));

// 看 tile 流第一个字节意义：对比 chr[0] 和 chr[0x17]
console.log('\n=== bank07 chr[0] off 0xD4（len 11）===');
console.log('  ' + b7.slice(0xD4, 0xD4 + 11).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('=== bank07 chr[1] off 0xDF（len 72）===');
console.log('  ' + b7.slice(0xDF, 0xDF + 72).map(v => v.toString(16).padStart(2, '0')).join(' '));

// bank07 tile 流解析：假设 [0]=count?, 后续 [addrLo, addrHi, ...data]
console.log('\n=== bank07 chr[0x17] tile 流解析 ===');
let k = 0x373 + 6; // 跳过 6 字节配置头
const data = b7;
while (k < 0x373 + 56) {
  const cnt = data[k];
  if (cnt === 0xFF) break;
  const lo = data[k + 1], hi = data[k + 2];
  const n = cnt & 0x3f;
  console.log(`  @${k.toString(16)}: cnt=$${cnt.toString(16)} addr=$${hi.toString(16)}${lo.toString(16)} data=[${data.slice(k + 3, k + 3 + n).map(v => v.toString(16)).join(',')}]`);
  k += 3 + n;
}

// 检查 bank07 chr[0] 是否 tile 流：$A0D4 6字节头后
console.log('\n=== bank07 chr[0] tile 流解析 ===');
k = 0xD4 + 6;
while (k < 0xD4 + 11) {
  const cnt = data[k];
  const lo = data[k + 1], hi = data[k + 2];
  const n = cnt & 0x3f;
  console.log(`  @${k.toString(16)}: cnt=$${cnt.toString(16)} addr=$${hi.toString(16)}${lo.toString(16)} data=[${data.slice(k + 3, k + 3 + n).map(v => v.toString(16)).join(',')}]`);
  k += 3 + n;
}
