// 探查 bank06/bank07 字节结构（从 asm .s 提取）
const fs = require('fs');
const path = require('path');

function loadBank(bankNo) {
  const dir = path.join(__dirname, '..', 'src', 'asm', `bank${String(bankNo).padStart(2, '0')}`);
  const parts = ['data_tables.s', 'data_maps.s', 'data_tail.s'];
  const bytes = [];
  for (const p of parts) {
    const c = fs.readFileSync(path.join(dir, p), 'utf8');
    const hex = c.match(/\$([0-9A-Fa-f]{2})/g) || [];
    for (const h of hex) bytes.push(parseInt(h.slice(1), 16));
  }
  return bytes;
}

const b6 = loadBank(6);
const b7 = loadBank(7);
console.log('bank06 len =', b6.length, '(0x' + b6.length.toString(16) + ')');
console.log('bank07 len =', b7.length, '(0x' + b7.length.toString(16) + ')');

function u16(arr, off) { return arr[off] | (arr[off + 1] << 8); }

// ---- bank06 头部指针表 ----
console.log('\n=== bank06 头部 16-bit 指针（前 40 个）===');
let ptrEnd = -1;
for (let i = 0; i < 40; i++) {
  const p = u16(b6, i * 2);
  console.log(`  [${i}] $${p.toString(16)}  @offset 0x${(i * 2).toString(16)}`);
  if (p >= 0x8000 && p < 0xC000) ptrEnd = i;
}

// 找 bank06 中所有 $8000-$BFFF 区间的 16 位指针（用于定位指针表范围）
console.log('\n=== bank06 指针表范围探测 ===');
let ptrCount = 0;
for (let i = 0; i + 1 < b6.length; i += 2) {
  const p = u16(b6, i);
  if (p >= 0x8000 && p <= 0xBFFF) {
    ptrCount++;
    if (ptrCount <= 6) console.log(`  offset 0x${i.toString(16)}: $${p.toString(16)}`);
  } else {
    if (ptrCount > 0 && ptrCount < 200) {
      // 检查是否连续指针段结束
    }
  }
}
console.log('  bank06 内 $8000-$BFFF 指针总数(每2字节)=', ptrCount);

// ---- bank07 头部指针表 ----
console.log('\n=== bank07 头部 16-bit 指针（前 70 个）===');
let b7ptrEnd = 0;
for (let i = 0; i < 70; i++) {
  const p = u16(b7, i * 2);
  console.log(`  [${i}] $${p.toString(16)}`);
  if (p < 0xA000 || p >= 0xC000) { b7ptrEnd = i; break; }
}

// ---- bank06 palette 探测：16字节一组，首字节 0x0F 或值<0x40 ----
console.log('\n=== bank06 调色板候选（每16字节组，首字节==0x0F）===');
let palCount = 0;
for (let off = 0; off + 16 <= b6.length; off += 16) {
  if (b6[off] === 0x0F) {
    const group = b6.slice(off, off + 16);
    const allOk = group.every(v => v <= 0x3F);
    if (allOk) {
      console.log(`  offset 0x${off.toString(16)} (CPU $${(0xA000 + off).toString(16)}): ${group.map(v => v.toString(16)).join(',')}`);
      palCount++;
      if (palCount >= 40) break;
    }
  }
}
console.log('  palette 候选数量(前40) =', palCount);

// ---- bank06 场景表探测（$BF00 区域 = offset 0x1F00）----
console.log('\n=== bank06 offset 0x1F00 附近（场景表区域）===');
for (let off = 0x1EE0; off < b6.length && off < 0x1F80; off += 19) {
  console.log(`  offset 0x${off.toString(16)}: ${b6.slice(off, off + 19).map(v => v.toString(16)).join(',')}`);
}

// ---- bank06 非 $FF 内容分布 ----
console.log('\n=== bank06 内容非0xFF分布 ===');
let start = -1;
for (let i = 0; i < b6.length; i++) {
  if (b6[i] !== 0xFF) { if (start < 0) start = i; }
  else {
    if (start >= 0 && i - start >= 4) {
      console.log(`  0x${start.toString(16)}-0x${(i - 1).toString(16)} (${i - start} 字节)`);
      start = -1;
    }
    if (start >= 0 && i - start < 4) start = i;
  }
}
if (start >= 0 && b6.length - start >= 4) console.log(`  0x${start.toString(16)}-0x${(b6.length - 1).toString(16)} (${b6.length - start} 字节)`);

console.log('\n=== bank07 内容非0xFF分布 ===');
start = -1;
for (let i = 0; i < b7.length; i++) {
  if (b7[i] !== 0xFF) { if (start < 0) start = i; }
  else {
    if (start >= 0 && i - start >= 4) {
      console.log(`  0x${start.toString(16)}-0x${(i - 1).toString(16)} (${i - start} 字节)`);
      start = -1;
    }
    if (start >= 0 && i - start < 4) start = i;
  }
}
if (start >= 0 && b7.length - start >= 4) console.log(`  0x${start.toString(16)}-0x${(b7.length - 1).toString(16)} (${b7.length - start} 字节)`);
