/**
 * 修正版:正确识别 0x33FC,搜索 0xFFFFAA2C 写入,解析脚本
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }
function sx16(v) { return v > 0x7FFF ? v - 0x10000 : v; }

// 1. 搜索 MOVE.B #imm, (0xFFFFAA2C).L (0x33FC)
console.log('=== MOVE.B #imm, (0xFFFFAA2C).L ===');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x33FC && rl(i + 4) === 0xFFFFAA2C) {
    console.log(`  0x${i.toString(16)}: MOVE.B #${rw(i + 2) & 0xFF}, (0xFFFFAA2C).L`);
  }
}

// 2. 搜索 CLR.W (0xFFFFAA2C).L
console.log('\n=== CLR.W (0xFFFFAA2C).L ===');
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x4279 && rl(i + 2) === 0xFFFFAA2C) {
    console.log(`  0x${i.toString(16)}: CLR.W (0xFFFFAA2C).L`);
  }
}

// 3. 确认 ADDA.W vs ADDA.L
console.log('\n=== 0x15932 指令确认 ===');
const w = rw(0x15932);
console.log(`0x15932: 0x${w.toString(16)} = ${w.toString(2).padStart(16, '0')}`);
console.log(`bit 8 = ${(w >> 8) & 1} → ${(w >> 8) & 1 === 0 ? 'ADDA.W' : 'ADDA.L'}`);

// 4. 命令偏移量表
console.log('\n=== 命令偏移量 ===');
const cmdOffsets = {
  0: 4, 1: 2, 2: 8, 3: 2,
  4: 'CLR+LEA1', 5: 'CLR+LEA5',
  6: 'CLR(0)', 7: 'CLR(0)', 8: 4,
  9: 'CLR(0)', 10: 'CLR(0)',
  11: 4, 12: 4, 13: 4, 14: 2,
  15: 'unchanged'
};
for (let i = 0; i < 16; i++) {
  console.log(`  cmd ${i}: offset=${cmdOffsets[i]}`);
}

// 5. 解析脚本 (假设初始 offset=1)
console.log('\n=== 脚本解析 (初始 offset=1) ===');
let pos = 0x18D60A;
let lastOffset = 1; // 假设初始值
for (let i = 0; i < 40; i++) {
  const cmd = rb(pos);
  if (cmd === 0xFF) {
    console.log(`  [${i}] 0x${pos.toString(16)}: END`);
    break;
  }
  if (cmd > 15) {
    console.log(`  [${i}] 0x${pos.toString(16)}: INVALID cmd=${cmd}`);
    break;
  }
  const off = cmdOffsets[cmd];
  let advance = 0;
  if (typeof off === 'number') {
    advance = off;
    lastOffset = off;
  } else if (off === 'CLR+LEA1') {
    advance = 2; lastOffset = 2;
  } else if (off === 'CLR+LEA5') {
    advance = 6; lastOffset = 6;
  } else if (off === 'CLR(0)') {
    advance = 0; lastOffset = 0;
  } else if (off === 'unchanged') {
    advance = lastOffset;
  }
  
  // 读取参数
  let params = '';
  if (advance > 1) {
    const pa = [];
    for (let p = 1; p < advance; p++) pa.push(rb(pos + p));
    params = ` params=[${pa.map(p => '0x' + p.toString(16).padStart(2, '0')).join(',')}]`;
  }
  
  console.log(`  [${i}] 0x${pos.toString(16)}: cmd=${cmd}${params} → +${advance}`);
  pos += advance;
}
