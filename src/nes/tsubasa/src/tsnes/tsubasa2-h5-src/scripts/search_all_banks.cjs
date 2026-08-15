/**
 * 在所有 32 个 PRG Bank 中搜索已知文本的字节序列
 * 用于确定 "KICK OFF" 等文本的存储位置和字符编码
 */
'use strict';

const fs = require('fs');
const path = require('path');

// 加载所有 32 个 ROM bank
const BANKS = [];
for (let i = 0; i < 32; i++) {
  const id = i.toString().padStart(2, '0');
  const p = path.resolve(__dirname, `../../rom-data/prg-bank-${id}.ts`);
  const src = fs.readFileSync(p, 'utf-8');
  const m = src.match(/const PRG_BANK_\d+[\s\S]*?=\s*\[([\s\S]*?)\]/);
  if (!m) throw new Error(`无法解析 bank ${id}`);
  BANKS[i] = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
}

// 已知文本的字节序列
const KNOWN_TEXTS = [
  { name: 'KICK (ASCII)', bytes: [0x4B, 0x49, 0x43, 0x4B] },
  { name: 'OFF (ASCII)', bytes: [0x4F, 0x46, 0x46] },
  { name: 'CONT (ASCII)', bytes: [0x43, 0x4F, 0x4E, 0x54] },
  { name: 'CAPT (ASCII)', bytes: [0x43, 0x41, 0x50, 0x54] },
  { name: 'TSUBA (ASCII)', bytes: [0x54, 0x53, 0x55, 0x42, 0x41] },
];

function searchInBank(bankNum, pattern) {
  const data = BANKS[bankNum];
  const results = [];
  for (let i = 0; i <= data.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (data[i + j] !== pattern[j]) { match = false; break; }
    }
    if (match) {
      const start = Math.max(0, i - 4);
      const end = Math.min(data.length, i + pattern.length + 16);
      const context = data.slice(start, end);
      results.push({
        offset: i,
        addr: '$' + (0xA000 + i).toString(16).padStart(4, '0').toUpperCase(),
        context: context.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '),
      });
    }
  }
  return results;
}

for (const text of KNOWN_TEXTS) {
  console.log(`\n=== 搜索 "${text.name}" [${text.bytes.map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ')}] ===`);
  let totalFound = 0;
  for (let bankNum = 0; bankNum < 32; bankNum++) {
    const results = searchInBank(bankNum, text.bytes);
    if (results.length > 0) {
      totalFound += results.length;
      for (const r of results.slice(0, 3)) { // 每个bank最多显示3个结果
        console.log(`  Bank ${bankNum} @ ${r.addr}: ${r.context}`);
      }
      if (results.length > 3) console.log(`  ... (${results.length} 个结果)`);
    }
  }
  if (totalFound === 0) console.log('  未找到');
}
