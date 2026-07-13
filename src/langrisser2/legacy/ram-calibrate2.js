import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ramPath = path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files',
  '17e953fa-Langrisser II (Japan)_68K-1.ram');
const romPath = path.join(__dirname, 'monkeycode-tmp-files', '.monkeycode-tmp-files',
  '1927e379-Langrisser II (Japan)-1.md');

const ram = fs.readFileSync(ramPath);
const rom = fs.readFileSync(romPath);

console.log(`RAM size: ${ram.length} bytes (${ram.length/1024}KB)`);
console.log(`ROM size: ${rom.length} bytes (${rom.length/1024}KB)`);
console.log('');

function rU8(addr) {
  const low24 = addr & 0xFFFFFF;
  const off = low24 - 0xFF0000;
  return off >= 0 && off < ram.length ? ram[off] : 0;
}
function rU16(addr) {
  const low24 = addr & 0xFFFFFF;
  const off = low24 - 0xFF0000;
  if (off < 0 || off + 1 >= ram.length) return 0;
  return (ram[off] << 8) | ram[off + 1];
}
function rU32(addr) {
  const low24 = addr & 0xFFFFFF;
  const off = low24 - 0xFF0000;
  if (off < 0 || off + 3 >= ram.length) return 0;
  return (ram[off] << 24) | (ram[off + 1] << 16) | (ram[off + 2] << 8) | ram[off + 3];
}
function romU8(a) { return rom[a]; }
function romU16(a) { return (rom[a] << 8) | rom[a+1]; }
function romU32(a) { return (rom[a] << 24) | (rom[a+1] << 16) | (rom[a+2] << 8) | rom[a+3]; }

function h(b) { return '0x' + b.toString(16).padStart(2, '0').toUpperCase(); }
function hw(w) { return '0x' + w.toString(16).padStart(4, '0').toUpperCase(); }
function hl(l) { return '0x' + (l>>>0).toString(16).padStart(8, '0').toUpperCase(); }

// ============================================================
// 1. 从 ROM 0x05E5D8 读取角色RAM槽位指针表
// ============================================================
console.log('=== ROM 0x05E5D8 角色RAM槽位指针表 (16条目) ===');
for (let i = 0; i < 16; i++) {
  const ptr = romU32(0x05E5D8 + i * 4);
  // 低24位是实际RAM地址
  const ramAddr = ptr & 0xFFFFFF;
  const fromBase = ramAddr - 0xFF603C;
  console.log(`  [${String(i).padStart(2,' ')}] ROM ptr=${hl(ptr)} → RAM ${hl(ramAddr)}  距0xFF603C偏移=${fromBase >= 0 ? ('+'+fromBase) : fromBase}`);
}

// ============================================================
// 2. 从 ROM 0x05E64A 读取角色能力初始表 (对比 RAM 中的值)
// ============================================================
console.log('\n=== ROM 0x05E64A 角色能力初始表 (10角色 × 0x18B) ===');
for (let i = 0; i < 10; i++) {
  const base = 0x05E64A + i * 0x18;
  const vals = [];
  for (let o = 0; o < 0x18; o++) vals.push(h(romU8(base + o)).slice(2));
  console.log(`\n角色${i+1} ROM @ ${hl(base)}: ${vals.join(' ')}`);
  console.log(`  [0x00]=${h(romU8(base+0x00))} [0x01]=${h(romU8(base+0x01))} [0x02-03]=${hw(romU16(base+0x02))} [0x04-05]=${hw(romU16(base+0x04))}`);
  console.log(`  [0x06-09]=${hl(romU32(base+0x06))}`);
  console.log(`  [0x0C]=${h(romU8(base+0x0C))} [0x0D]=${h(romU8(base+0x0D))} [0x0E]=${h(romU8(base+0x0E))} [0x0F]=${h(romU8(base+0x0F))}`);
  console.log(`  [0x10]=${h(romU8(base+0x10))} [0x11]=${h(romU8(base+0x11))} [0x12-13]=${hw(romU16(base+0x12))} [0x14-17]=${hl(romU32(base+0x14))}`);
}

// ============================================================
// 3. 角色槽 0xFF603C 详细结构分析
// ============================================================
console.log('\n\n=== 角色槽详细结构分析 (槽0: 玩家单位) ===');
const base0 = 0xFF603C;
const bytes = [];
for (let i = 0; i < 0x60; i++) {
  bytes.push(rU8(base0 + i));
}

// 按可能的字段分组分析
console.log('前20字节:');
for (let i = 0; i < 20; i++) {
  console.log(`  [0x${i.toString(16).padStart(2,'0')}] = ${h(bytes[i])}  = ${bytes[i]}`);
}

console.log('\n0x20-0x5F字节:');
for (let i = 0x20; i < 0x60; i++) {
  console.log(`  [0x${i.toString(16).padStart(2,'0')}] = ${h(bytes[i])}  = ${bytes[i]}`);
}

// ============================================================
// 4. 对比槽0和槽2的关键偏移 (找CLASS_ID等)
// ============================================================
console.log('\n\n=== 槽0 vs 槽2 对比 (找CLASS_ID位置) ===');
const base2 = 0xFF60FC;
const keyOffsets = [0x00, 0x01, 0x02, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x20, 0x21, 0x50, 0x5E, 0x5F];
console.log('偏移 | 槽0 | 槽2 | 说明');
console.log('-----|-----|-----|------');
for (const off of keyOffsets) {
  const v0 = rU8(base0 + off);
  const v2 = rU8(base2 + off);
  console.log(` 0x${off.toString(16).padStart(2,'0')}  | ${h(v0).padEnd(3)} | ${h(v2).padEnd(3)} | `);
}

// ============================================================
// 5. 0xFF6000 - 0xFF603B 区域 (槽之前的内容)
// ============================================================
console.log('\n\n=== 0xFF6000 - 0xFF603B (角色槽前区域) ===');
const pre = [];
for (let i = 0; i < 0x3C; i++) {
  pre.push(h(rU8(0xFF6000 + i)).slice(2));
}
// 每16字节一行
for (let row = 0; row < 4; row++) {
  const start = row * 16;
  console.log(`  ${hw(0x6000 + start)}: ${pre.slice(start, start+16).join(' ')}`);
}

// ============================================================
// 6. 场景配置 0xFFFF9F62
// ============================================================
console.log('\n\n=== 场景配置 0xFFFF9F62 (128B = 32 dword) ===');
for (let d = 0; d < 32; d++) {
  const v = rU32(0xFFFF9F62 + d * 4);
  const bs = [];
  for (let b = 0; b < 4; b++) bs.push(h(rU8(0xFFFF9F62 + d*4 + b)).slice(2));
  console.log(`  [${String(d).padStart(2,' ')}] ${hl(v)}  bytes: ${bs.join(' ')}`);
}

// ============================================================
// 7. 0x082A59 角色AT/DF修正表 (ROM)
// ============================================================
console.log('\n\n=== ROM 0x082A59 角色AT/DF修正表 (6B×10角色) ===');
for (let i = 0; i < 10; i++) {
  const base = 0x082A59 + i * 6;
  const v = [];
  for (let o = 0; o < 6; o++) v.push(h(romU8(base + o)).slice(2));
  console.log(`  角色${i+1}: ${v.join(' ')}  AT+${romU8(base+0)} DF+${romU8(base+1)} MV+${romU8(base+2)}`);
}

// ============================================================
// 8. 0x05EDDC 职业数据表 (ROM) - 对比角色的CLASS
// ============================================================
console.log('\n\n=== ROM 0x05EDDC 职业数据抽样 (前20职业) ===');
for (let i = 0; i < 20; i++) {
  const base = 0x05EDDC + i * 0x1C;
  const v = [];
  for (let o = 0; o < 0x1C; o++) v.push(h(romU8(base + o)).slice(2));
  console.log(`\n职业${i} (0x${i.toString(16).padStart(2,'0')}): ${v.join(' ')}`);
  console.log(`  dataOff=${hw(romU16(base+0))} field02=${hw(romU16(base+2))} terrOff=${hw(romU16(base+4))}`);
  console.log(`  moveType=${h(romU8(base+6))} flag08=${h(romU8(base+8))}`);
  console.log(`  MV=${romU8(base+0x0D)} Range=${romU8(base+0x0E)} AT=${romU8(base+0x0F)} DF=${romU8(base+0x10)} MP=${romU8(base+0x13)}`);
}

// ============================================================
// 9. 验证 FUN_00010bbe 的 AT/DF 计算
// 用角色1的数据:
//   CLASS_ID = ROM 0x05E64A[0x10]
//   基础AT = ROM 0x05EDDC[CLASS_ID*0x1C + 0x0F]
//   基础DF = ROM 0x05EDDC[CLASS_ID*0x1C + 0x10]
//   AT修正 = ROM 0x05E64A[0x02-03]
//   DF修正 = ROM 0x05E64A[0x04-05]
//   角色修正AT = ROM 0x082A59[i*6 + 0]
//   角色修正DF = ROM 0x082A59[i*6 + 1]
//   最终 = 基础 + 修正？
// ============================================================
console.log('\n\n=== 验证角色1的 AT/DF 计算 ===');
const charIdx = 0; // 角色1 (0索引)
const charBase = 0x05E64A + charIdx * 0x18;
const classId = romU8(charBase + 0x10);
console.log(`角色1 CLASS_ID (ROM[0x10]) = ${h(classId)}`);
const classBase = 0x05EDDC + classId * 0x1C;
console.log(`职业${h(classId)} 基础AT=${romU8(classBase+0x0F)} 基础DF=${romU8(classBase+0x10)}`);
console.log(`角色表 AT修正word=${hw(romU16(charBase+0x02))} (lo=${romU8(charBase+0x02)} hi=${romU8(charBase+0x03)})`);
console.log(`角色表 DF修正word=${hw(romU16(charBase+0x04))} (lo=${romU8(charBase+0x04)} hi=${romU8(charBase+0x05)})`);
const modBase = 0x082A59 + charIdx * 6;
console.log(`角色修正表 AT+${romU8(modBase+0)} DF+${romU8(modBase+1)} MV+${romU8(modBase+2)}`);

// 看看 RAM 中角色1槽的 AT/DF 在哪个位置
console.log('\n角色0槽所有非零字节:');
for (let i = 0; i < 0x60; i++) {
  const v = rU8(0xFF603C + i);
  if (v !== 0) {
    console.log(`  [0x${i.toString(16).padStart(2,'0')}] = ${h(v)} (${v})`);
  }
}

// ============================================================
// 10. 0xFFFFA4CC 角色表 vs ROM 0x05E64A 对比
// ============================================================
console.log('\n\n=== 角色能力表 ROM vs RAM 对比 (10角色) ===');
for (let i = 0; i < 10; i++) {
  const romBase = 0x05E64A + i * 0x18;
  const ramBase = 0xFFFFA4CC + i * 0x18;
  let diffCount = 0;
  const diffs = [];
  for (let o = 0; o < 0x18; o++) {
    const rv = romU8(romBase + o);
    const mv = rU8(ramBase + o);
    if (rv !== mv) {
      diffCount++;
      diffs.push(`[0x${o.toString(16).padStart(2,'0')}] ROM=${h(rv)} RAM=${h(mv)}`);
    }
  }
  console.log(`\n角色${i+1}: ${diffCount} 处不同`);
  if (diffCount > 0) {
    for (const d of diffs) console.log(`  ${d}`);
  }
}
