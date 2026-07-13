/**
 * RAM dump 校准脚本
 * Genesis WRAM 64KB: 0xFF0000 - 0xFFFFFF
 * RAM dump 偏移 = 实际 RAM 地址 - 0xFF0000
 */
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

function readU8(addr) {
  const low24 = addr & 0xFFFFFF;
  const off = low24 - 0xFF0000;
  return off >= 0 && off < ram.length ? ram[off] : 0;
}
function readU16(addr) {
  const low24 = addr & 0xFFFFFF;
  const off = low24 - 0xFF0000;
  if (off < 0 || off + 1 >= ram.length) return 0;
  return (ram[off] << 8) | ram[off + 1];
}
function readU32(addr) {
  const low24 = addr & 0xFFFFFF;
  const off = low24 - 0xFF0000;
  if (off < 0 || off + 3 >= ram.length) return 0;
  return (ram[off] << 24) | (ram[off + 1] << 16) | (ram[off + 2] << 8) | ram[off + 3];
}
function readS8(addr) { const v = readU8(addr); return v >= 0x128 ? v - 256 : v; }

function hex(b) { return '0x' + b.toString(16).padStart(2, '0').toUpperCase(); }
function hexW(w) { return '0x' + w.toString(16).padStart(4, '0').toUpperCase(); }
function hexL(l) { return '0x' + (l>>>0).toString(16).padStart(8, '0').toUpperCase(); }

// ============================================================
// 1. 角色槽区域 0xFF603C - 0xFF603C + 20*0x60
// ============================================================
console.log('=== 角色槽区域 0xFF603C (20槽, 每槽0x60=96字节) ===');
const SLOT_BASE = 0xFF603C;
const SLOT_SIZE = 0x60;
const MAX_SLOTS = 20;

let activeSlots = 0;
for (let i = 0; i < MAX_SLOTS; i++) {
  const base = SLOT_BASE + i * SLOT_SIZE;
  const b0 = readU8(base + 0x00); // 存在标志/职业类型
  if (b0 === 0xFF) continue; // 空槽

  activeSlots++;
  const classId = readU8(base + 0x0B);
  const x = readU8(base + 0x06);
  const y = readU8(base + 0x07);
  const at = readU8(base + 0x38);
  const at2 = readU8(base + 0x39);
  const df = readU8(base + 0x3A);
  const df2 = readU8(base + 0x3B);
  const mv = readU8(base + 0x44);
  const range = readU8(base + 0x45);
  const cmdAt = readU8(base + 0x46);
  const cmdDf = readU8(base + 0x47);
  const mp = readU8(base + 0x50);
  const level = readU8(base + 0x14);
  const exp = readU8(base + 0x5E);
  const unitType = readU8(base + 0x20);
  const moveType = readU8(base + 0x21);

  // 8个佣兵子槽 (各12B)
  const mercs = [];
  for (let m = 0; m < 8; m++) {
    const mBase = base + 0x0C + m * 0x0C;
    const mB0 = readU8(mBase);
    if (mB0 !== 0xFF) {
      mercs.push({ slot: m, b0: mB0, x: readU8(mBase+6), y: readU8(mBase+7) });
    }
  }

  console.log(`\n槽${i} @ ${hexL(base)}: 单位类型=${hex(b0)} CLASS=${hex(classId)} 阵营=${hex(unitType)}`);
  console.log(`  坐标=(${x},${y}) 等级=${level} 经验=${exp} 移动类型=${hex(moveType)}`);
  console.log(`  AT(0x38/0x39)=${at}/${at2}  DF(0x3A/0x3B)=${df}/${df2}`);
  console.log(`  MV(0x44)=${mv}  RANGE(0x45)=${range}  指挥AT(0x46)=${cmdAt}  指挥DF(0x47)=${cmdDf}`);
  console.log(`  MP(0x50)=${mp}`);
  console.log(`  佣兵: ${mercs.map(m=>`#${m.slot}(b0=${hex(m.b0)})`).join(' ')}`);

  // 完整转储
  const dump = [];
  for (let o = 0; o < SLOT_SIZE; o++) {
    dump.push(hex(readU8(base + o)).slice(2));
  }
  console.log(`  完整: ${dump.join(' ')}`);
}
console.log(`\n活动槽数: ${activeSlots}/${MAX_SLOTS}`);

// ============================================================
// 2. 角色能力表 0xFFFFA4CC (10角色, 0x18B/角色)
// ============================================================
console.log('\n\n=== 角色能力表 0xFFFFA4CC (10角色, 0x18B/角色) ===');
const CHAR_TABLE = 0xFFFFA4CC;
for (let i = 0; i < 10; i++) {
  const base = CHAR_TABLE + i * 0x18;
  const vals = [];
  for (let o = 0; o < 0x18; o++) {
    vals.push(hex(readU8(base + o)).slice(2));
  }
  console.log(`\n角色${i+1} @ ${hexL(base)}: ${vals.join(' ')}`);
  console.log(`  [0x00]baseClass=${hex(readU8(base+0x00))}  [0x01]baseMP=${readU8(base+0x01)}`);
  console.log(`  [0x02-03]ATmod=${hexW(readU16(base+0x02))}  [0x04-05]DFmod=${hexW(readU16(base+0x04))}`);
  console.log(`  [0x06-09]skillBits=${hexL(readU32(base+0x06))}`);
  console.log(`  [0x0C]moveRange=${readU8(base+0x0C)}  [0x0D]portrait=${hex(readU8(base+0x0D))}`);
  console.log(`  [0x0E]subClass=${hex(readU8(base+0x0E))}  [0x0F]flags=${hex(readU8(base+0x0F))}`);
  console.log(`  [0x10]classId=${hex(readU8(base+0x10))}  [0x11]cmdRange=${readU8(base+0x11)}`);
}

// ============================================================
// 3. 场景配置 0xFFFF9F62 (128B)
// ============================================================
console.log('\n\n=== 场景配置 0xFFFF9F62 (128B = 32 dword) ===');
const SCEN_CFG = 0xFFFF9F62;
for (let d = 0; d < 32; d++) {
  const v = readU32(SCEN_CFG + d * 4);
  console.log(`  [${String(d).padStart(2,' ')}] ${hexL(v)}`);
}

// ============================================================
// 4. 0xFF4000 和 0xFF5000 区域 (可能是地形高度/单位覆盖图)
// ============================================================
console.log('\n\n=== 0xFF4000 区域 (可能是地图显示缓存) ===');
// 只打印前 64 字节
const line = [];
for (let i = 0; i < 32; i++) {
  line.push(hex(readU8(0xFF4000 + i)).slice(2));
}
console.log(line.join(' '));

console.log('\n=== 0xFF5000 区域 (可能是单位位置映射) ===');
const line2 = [];
for (let i = 0; i < 32; i++) {
  line2.push(hex(readU8(0xFF5000 + i)).slice(2));
}
console.log(line2.join(' '));

// ============================================================
// 5. 一些关键全局变量
// ============================================================
console.log('\n\n=== 关键全局变量 ===');
const vars = [
  ['DAT_ffffa49c (场景索引)', 0xFFFFA49C, 1],
  ['DAT_ffffa000 (场景脚本标志)', 0xFFFFA000, 1],
  ['DAT_ffff9f2c (地图宽?)', 0xFFFF9F2C, 1],
  ['DAT_ffff9f2e (地图高?)', 0xFFFF9F2E, 1],
  ['DAT_ffff9fe4 (角色索引?)', 0xFFFF9FE4, 1],
  ['DAT_ffffa610 (场景头字节0)', 0xFFFFA610, 1],
  ['DAT_ffffa611 (场景头字节1)', 0xFFFFA611, 1],
  ['DAT_ffff9f36 (flag?)', 0xFFFF9F36, 1],
  ['DAT_ffff9f37 (flag?)', 0xFFFF9F37, 1],
  ['DAT_ffffa626 (阵营mask?)', 0xFFFFA626, 1],
  ['DAT_ffffa6e6 (cursorX?)', 0xFFFFA6E6, 1],
  ['DAT_ffffa6e8 (cursorY?)', 0xFFFFA6E8, 1],
];
for (const [name, addr, size] of vars) {
  if (size === 1) {
    console.log(`  ${name.padEnd(30)} @ ${hexL(addr)} = ${hex(readU8(addr))}`);
  } else if (size === 2) {
    console.log(`  ${name.padEnd(30)} @ ${hexL(addr)} = ${hexW(readU16(addr))}`);
  }
}

// ============================================================
// 6. 0xFFFFA4E2 区域
// ============================================================
console.log('\n\n=== 0xFFFFA4E2 区域 (角色表扩展?) ===');
// DAT_ffffa4e2 在 FUN_00010bbe 中被用到:
// in_A1[0x46] = (&DAT_ffffa4e2)[sVar2] + (&DAT_0005edeb)[sVar1];
// 即角色表偏移 0x16 的位置 (A4CC+0x16=A4E2)
// 但我们之前定义的是 0x00-0x17 的范围，0x16 对应什么？
// 实际上 0x16 = 22, 在 0x18(24) 范围内
// 所以 DAT_ffffa4e2 = DAT_ffffa4cc + 0x16 = 角色条目的 +0x16 字节
for (let i = 0; i < 10; i++) {
  const base = CHAR_TABLE + i * 0x18;
  console.log(`  角色${i+1} +0x16 = ${hex(readU8(base+0x16))}  +0x17 = ${hex(readU8(base+0x17))}`);
}
