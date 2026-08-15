// 临时脚本: 查看 bank25 精灵指针表 $B3CF/$B3BD 与真实精灵数据块内容
const fs = require('fs');
const path = require('path');

function loadBank(file) {
  const src = fs.readFileSync(path.join(__dirname, 'rom-data', file), 'utf8');
  const m = src.match(/=\s*(\[[\s\S]*\]);\s*export default/s);
  return m[1].split(',').map((s) => parseInt(s.trim().replace(/0x/i, ''), 16));
}
const b25 = loadBank('prg-bank-25.ts');
const b24 = loadBank('prg-bank-24.ts');

const B25_BASE = 0xa000;
const B24_BASE = 0x8000;
function b25b(cpu) { return b25[cpu - B25_BASE]; }
function b25u16(cpu) { return b25b(cpu) | (b25b(cpu + 1) << 8); }
function b24b(cpu) { return b24[cpu - B24_BASE]; }

console.log('=== $B3BD 精灵位段表 (16B) ===');
for (let i = 0; i < 16; i++) console.log(`  [${i}] = 0x${b25b(0xb3bd + i).toString(16)}`);

console.log('\n=== $B3CF 精灵数据指针表 (前 8 项) ===');
for (let a = 0; a < 8; a++) {
  const p = b25u16(0xb3cf + a * 2);
  console.log(`  A=${a} → ${p.toString(16)}`);
  // 数据块: [0]=tileLo [1]=tileHi [2]=attr [3]=? [5]=counter边界 [6]=长度 [7]=边界2 [8]=entry数量
  const db = p;
  const hdr = [];
  for (let k = 0; k < 9; k++) hdr.push(b25b(db + k));
  console.log(`    头部9B: ${hdr.map((x) => x.toString(16)).join(' ')}`);
  // 流入口从 db+9 开始, 每项 4B: [0]=offset [1]=ptrLo [2]=ptrHi [3]=?
  const n = hdr[8] || 0;
  const entries = [];
  for (let k = 0; k < n; k++) {
    const e = db + 9 + k * 4;
    entries.push([b25b(e), b25b(e + 1), b25b(e + 2), b25b(e + 3)]);
  }
  console.log(`    流入口 (${n} 项): ${JSON.stringify(entries)}`);
  // 显示每个入口指向的流数据 (前 48B)
  for (const en of entries) {
    const sptr = (en[2] | (en[3] << 8)) & 0xffff;
    const bytes = [];
    for (let k = 0; k < 48; k++) {
      const v = sptr >= 0xa000 ? b25b(sptr + k) : b24b(sptr + k);
      bytes.push(v === undefined ? 0 : v);
    }
    console.log(`    入口[sel=${en[0]} cur=${en[1]}] 流 @${sptr.toString(16)}: ${bytes.map((x) => x.toString(16).padStart(2, '0')).join(' ')}`);
  }
}
