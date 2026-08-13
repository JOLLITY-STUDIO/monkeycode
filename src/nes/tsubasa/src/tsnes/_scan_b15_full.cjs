// 分析 Bank 15 完整结构：找所有 BGM header 表（04/05/06/07 + ptrs + FF）和 SE 数据
const fs = require('fs');
const path = require('path');

function extractArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const hexPattern = /0x([0-9A-Fa-f]{2})/g;
  const vals = [];
  let m;
  while ((m = hexPattern.exec(match[1])) !== null) vals.push(parseInt(m[1], 16));
  return vals;
}

const b15 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-15.ts'));
console.log(`Bank15 total bytes: ${b15.length}`);

// 1. 找 BGM header: 04 lo hi 05 lo hi 06 lo hi 07 lo hi [FF]
console.log('\n=== BGM 4轨 header (04/05/06/07) ===');
for (let i = 0; i < b15.length - 14; i++) {
  if (b15[i] === 0x04 && b15[i + 3] === 0x05 && b15[i + 7] === 0x06 && b15[i + 11] === 0x07) {
    const p1 = (b15[i + 2] << 8) | b15[i + 1];
    const p2 = (b15[i + 5] << 8) | b15[i + 4];
    const p3 = (b15[i + 8] << 8) | b15[i + 7];
    const p4 = (b15[i + 11] << 8) | b15[i + 10];
    const term = b15[i + 12];
    console.log(`@0x${i.toString(16)}: SQ1=$${p1.toString(16)} SQ2=$${p2.toString(16)} TRI=$${p3.toString(16)} NOI=$${p4.toString(16)} term=0x${term.toString(16)}`);
  }
}

// 2. 找 3轨 header: 05/06/07
console.log('\n=== BGM 3轨 header (05/06/07) ===');
for (let i = 0; i < b15.length - 11; i++) {
  if (b15[i] === 0x05 && b15[i + 4] === 0x06 && b15[i + 8] === 0x07) {
    const p1 = (b15[i + 2] << 8) | b15[i + 1];
    const p2 = (b15[i + 5] << 8) | b15[i + 4];
    const p3 = (b15[i + 8] << 8) | b15[i + 7];
    const term = b15[i + 9];
    console.log(`@0x${i.toString(16)}: SQ1=$${p1.toString(16)} SQ2=$${p2.toString(16)} NOI=$${p3.toString(16)} term=0x${term.toString(16)}`);
  }
}

// 3. 找 2轨 header: 04/05 或 06/07 或 05/07 等
console.log('\n=== 2轨 header 候选 ===');
for (let i = 0; i < b15.length - 8; i++) {
  if (b15[i] < 0x08 && b15[i + 3] < 0x08 && b15[i + 6] === 0xFF) {
    const p1 = (b15[i + 2] << 8) | b15[i + 1];
    const p2 = (b15[i + 5] << 8) | b15[i + 4];
    console.log(`@0x${i.toString(16)}: ch${b15[i]}=$${p1.toString(16)} ch${b15[i + 3]}=$${p2.toString(16)}`);
  }
}

// 4. 单轨 header: 07 + ptr + FF
console.log('\n=== NOISE-only header (07+ptr+FF) ===');
for (let i = 0; i < b15.length - 4; i++) {
  if (b15[i] === 0x07 && b15[i + 3] === 0xFF) {
    const ns = (b15[i + 2] << 8) | b15[i + 1];
    console.log(`@0x${i.toString(16)}: NOI=$${ns.toString(16)}`);
  }
}

// 5. 0xFF 分隔的段分布
console.log('\n=== 0xFF 分布（每 0x100 段内数量）===');
let seg = [];
for (let i = 0; i < b15.length; i++) {
  if (b15[i] === 0xFF) seg.push(i);
}
console.log('0xFF count:', seg.length);
console.log('first 40:', seg.slice(0, 40).map(x => '0x' + x.toString(16)).join(' '));
console.log('last 20:', seg.slice(-20).map(x => '0x' + x.toString(16)).join(' '));

// 6. 大段数据分布（非0xFF非0x00数据密度）
console.log('\n=== 数据密度（每0x100块非零字节数）===');
for (let i = 0; i < b15.length; i += 0x100) {
  let nz = 0;
  for (let j = i; j < Math.min(i + 0x100, b15.length); j++) if (b15[j] !== 0) nz++;
  const bar = '#'.repeat(Math.round(nz / 2));
  console.log(`0x${i.toString(16).padStart(4, '0')}: ${String(nz).padStart(3)} ${bar}`);
}
