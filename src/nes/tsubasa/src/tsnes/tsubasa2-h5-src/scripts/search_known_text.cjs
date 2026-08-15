/**
 * 在 PRG Bank 3-6 中搜索已知文本的字节序列, 用于反推字符映射表
 *
 * 已知文本 (来自游戏手册/截图):
 *   - "KICK OFF"    (标题画面菜单)
 *   - "CONTINUE"    (标题画面菜单)
 *   - "キックオフ"   (片假名: キ=0x12, ッ=0x1D, ク=0x13, オ=0x10, フ=?)
 *   - "キャプテン"   (片假名: キ=0x12, ャ=?, プ=?, テ=0x1E, ン=?)
 */
'use strict';

const fs = require('fs');
const path = require('path');

// 加载 bank 3-6
const BANKS = {};
for (const i of [3, 4, 5, 6]) {
  const id = i.toString().padStart(2, '0');
  const p = path.resolve(__dirname, `../../rom-data/prg-bank-${id}.ts`);
  const src = fs.readFileSync(p, 'utf-8');
  const m = src.match(/const PRG_BANK_\d+[\s\S]*?=\s*\[([\s\S]*?)\]/);
  if (!m) throw new Error(`无法解析 bank ${id}`);
  BANKS[i] = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
}

// 已知文本的字节序列 (基于当前字符映射表推测)
const KNOWN_TEXTS = [
  { name: 'KICK OFF (ASCII)', bytes: [0x4B, 0x49, 0x43, 0x4B, 0x20, 0x4F, 0x46, 0x46] },
  { name: 'KICK (ASCII)', bytes: [0x4B, 0x49, 0x43, 0x4B] },
  { name: 'CONTINUE (ASCII)', bytes: [0x43, 0x4F, 0x4E, 0x54, 0x49, 0x4E, 0x55, 0x45] },
  { name: 'CONT (ASCII)', bytes: [0x43, 0x4F, 0x4E, 0x54] },
  { name: 'CAPTAIN (ASCII)', bytes: [0x43, 0x41, 0x50, 0x54, 0x41, 0x49, 0x4E] },
  { name: 'TSUBASA (ASCII)', bytes: [0x54, 0x53, 0x55, 0x42, 0x41, 0x53, 0x41] },
  // 片假名 キック (KICK 的日文)
  { name: 'キック (片假名)', bytes: [0x12, 0x1D, 0x13] },
  // 片假名 オフ (OFF)
  { name: 'オフ (片假名)', bytes: [0x10] },
];

// 在 bank 中搜索字节序列
function searchInBank(bankNum, pattern) {
  const data = BANKS[bankNum];
  const results = [];
  for (let i = 0; i <= data.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (data[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      // 提取周围上下文 (前 4 字节, 后 16 字节)
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

// 搜索所有已知文本
for (const text of KNOWN_TEXTS) {
  console.log(`\n=== 搜索 "${text.name}" [${text.bytes.map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ')}] ===`);
  let found = false;
  for (const bankNum of [3, 4, 5, 6]) {
    const results = searchInBank(bankNum, text.bytes);
    if (results.length > 0) {
      found = true;
      for (const r of results) {
        console.log(`  Bank ${bankNum} @ ${r.addr} (offset ${r.offset}): ${r.context}`);
      }
    }
  }
  if (!found) {
    console.log('  未找到');
  }
}
