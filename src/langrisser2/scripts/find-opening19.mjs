/**
 * 修正版:解决 rl() 符号问题和运算符优先级
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return (((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff)) >>> 0; }

const AA2C = 0xFFFFAA2C >>> 0;

// 1. 搜索 MOVE.B #imm, (0xFFFFAA2C).L (0x33FC)
console.log('=== MOVE.B #imm, (0xFFFFAA2C).L ===');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x33FC && rl(i + 4) === AA2C) {
    console.log(`  0x${i.toString(16)}: MOVE.B #${rw(i + 2) & 0xFF}, (0xFFFFAA2C).L`);
  }
}

// 2. 搜索 CLR.W (0xFFFFAA2C).L
console.log('\n=== CLR.W (0xFFFFAA2C).L ===');
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x4279 && rl(i + 2) === AA2C) {
    console.log(`  0x${i.toString(16)}: CLR.W (0xFFFFAA2C).L`);
  }
}

// 3. 确认 ADDA.W vs ADDA.L (修正运算符优先级)
console.log('\n=== 0x15932 ADDA 确认 ===');
const w = rw(0x15932);
const bit8 = (w >> 8) & 1;
console.log(`0x15932: 0x${w.toString(16)} = ${w.toString(2).padStart(16, '0')}`);
console.log(`bit 8 = ${bit8} → ${bit8 === 0 ? 'ADDA.W (word)' : 'ADDA.L (long)'}`);

// 4. 验证 0x15952 处确实有 MOVE.B #4, (0xFFFFAA2C).L
console.log('\n=== 验证 0x15952 ===');
console.log(`rw(0x15952) = 0x${rw(0x15952).toString(16)} (期望 0x33fc)`);
console.log(`rw(0x15954) = 0x${rw(0x15954).toString(16)} (imm)`);
console.log(`rl(0x15956) = 0x${rl(0x15956).toString(16)} (期望 0xffffaa2c)`);
console.log(`AA2C = 0x${AA2C.toString(16)}`);
console.log(`匹配: ${rl(0x15956) === AA2C}`);

// 5. 解析脚本
console.log('\n=== 脚本解析 ===');
const cmdOffsets = {0:4, 1:2, 2:8, 3:2, 4:2, 5:6, 6:0, 7:0, 8:4, 9:0, 10:0, 11:4, 12:4, 13:4, 14:2, 15:-1};
let pos = 0x18D60A;
let lastOffset = 1;
for (let i = 0; i < 60; i++) {
  const cmd = rb(pos);
  if (cmd === 0xFF) { console.log(`  [${i}] 0x${pos.toString(16)}: END`); break; }
  if (cmd > 15) { console.log(`  [${i}] 0x${pos.toString(16)}: INVALID cmd=${cmd} (0x${cmd.toString(16)})`); break; }
  let advance = cmdOffsets[cmd];
  if (cmd === 15) advance = lastOffset;
  if (advance === 0) { console.log(`  [${i}] 0x${pos.toString(16)}: cmd=${cmd} (wait, +0)`); break; }
  
  let params = '';
  if (advance > 1) {
    const pa = [];
    for (let p = 1; p < advance; p++) pa.push(rb(pos + p));
    params = ` [${pa.map(p => '0x' + p.toString(16).padStart(2, '0')).join(',')}]`;
  }
  console.log(`  [${i}] 0x${pos.toString(16)}: cmd=${cmd}${params} → +${advance}`);
  lastOffset = advance;
  pos += advance;
}
