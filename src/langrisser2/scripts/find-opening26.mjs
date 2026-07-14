/**
 * 深入解析开场动画脚本:
 * 1. 读取字节码跳转表 0x15838 (检查条目数)
 * 2. 修正 0x14DA6 的反汇编 (读取实际字节)
 * 3. 解析脚本 0x19f1a4 的格式
 * 4. 提取所有嵌入的 ROM 地址
 * 5. 检查资源数据
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
function sx16(v) { return v > 0x7FFF ? v - 0x10000 : v; }

// 1. 读取字节码跳转表
console.log('=== 1. 字节码跳转表 0x15838 ===\n');
// 检查前 64 个条目 (256 字节)
for (let i = 0; i < 64; i++) {
  const addr = 0x15838 + i * 4;
  if (addr >= rom.length - 4) break;
  const w = rw(addr);
  if (w === 0x6000) {
    // BRA.W
    const offset = sx16(rw(addr + 2));
    const target = (addr + 2 + offset) >>> 0;
    console.log(`  [cmd ${i}] 0x${addr.toString(16)}: BRA.W 0x${target.toString(16)}`);
  } else if (w === 0x60 && (w & 0xFF)) {
    // BRA.S
    const offset = (w & 0xFF) > 127 ? (w & 0xFF) - 256 : (w & 0xFF);
    const target = (addr + 2 + offset) >>> 0;
    console.log(`  [cmd ${i}] 0x${addr.toString(16)}: BRA.S 0x${target.toString(16)}`);
  } else {
    console.log(`  [cmd ${i}] 0x${addr.toString(16)}: .word 0x${w.toString(16).padStart(4,'0')} (非跳转)`);
    // 如果连续多个非跳转, 停止
    if (i > 16) {
      const w2 = rw(addr + 4);
      const w3 = rw(addr + 8);
      if (w2 !== 0x6000 && w3 !== 0x6000) {
        console.log(`  ... (停止, 后续都不是 BRA.W)`);
        break;
      }
    }
  }
}

// 2. 读取 0x14DA6-0x14DD8 的实际字节
console.log('\n=== 2. 0x14DA6-0x14DD8 原始字节 ===\n');
for (let i = 0; i < 0x32; i += 16) {
  const addr = 0x14DA6 + i;
  let hex = '';
  for (let j = 0; j < 16 && addr + j < 0x14DD8; j++) {
    hex += rb(addr + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${addr.toString(16)}: ${hex}`);
}

// 手工反汇编关键指令
console.log('\n手工反汇编 0x14DA6:');
// 0x14DA6: TST.B (0xFFFFAA11).L = 0x4A39 0xFFFF 0xAA11 (6字节)
console.log(`  0x14DA6: TST.B (0xFFFFAA11).L  [0x4A39 0xFFFF 0xAA11]`);
console.log(`    实际: 0x${rw(0x14DA6).toString(16)} 0x${rw(0x14DA8).toString(16)} 0x${rw(0x14DAA).toString(16)}`);

// 0x14DAC: BEQ.W
console.log(`  0x14DAC: BEQ.W 0x${(0x14DAC + 2 + sx16(rw(0x14DAE))).toString(16)}  [0x${rw(0x14DAC).toString(16)} 0x${rw(0x14DAE).toString(16)}]`);

// 0x14DB0: CLR.L (0xFFFFAA16).L
console.log(`  0x14DB0: CLR.L (0xFFFFAA16).L  [0x${rw(0x14DB0).toString(16)} 0x${rw(0x14DB2).toString(16)} 0x${rw(0x14DB4).toString(16)}]`);

// 0x14DB6: MOVE.W (0xFFFFA49C.W), D0 = 0x3038 0xA49C (4字节)
console.log(`  0x14DB6: MOVE.W (0xFFFFA49C.W), D0  [0x${rw(0x14DB6).toString(16)} 0x${rw(0x14DB8).toString(16)}]`);

// 0x14DBA: ??? 
console.log(`  0x14DBA: word=0x${rw(0x14DBA).toString(16)}`);
// 检查是否是 ADDQ.W #1, D1 = 0x5241
if (rw(0x14DBA) === 0x5241) {
  console.log(`    → ADDQ.W #1, D1 (但 D1 从哪来?)`);
}

// 0x14DBC: ADD.W D0, D0
console.log(`  0x14DBC: word=0x${rw(0x14DBC).toString(16)}`);
if ((rw(0x14DBC) & 0xF1C0) === 0xD040) {
  console.log(`    → ADD.W D${rw(0x14DBC)&7}, D${(rw(0x14DBC)>>9)&7}`);
}

// 0x14DBE: ADD.W D0, D0
console.log(`  0x14DBE: word=0x${rw(0x14DBE).toString(16)}`);

// 0x14DC0: LEA 0x18011A, A0 = 0x41F9 0x0001 0x8011A (6字节)
console.log(`  0x14DC0: LEA 0x18011A, A0  [0x${rw(0x14DC0).toString(16)} 0x${rw(0x14DC2).toString(16)} 0x${rw(0x14DC4).toString(16)}]`);
console.log(`    实际: 0x${rw(0x14DC0).toString(16)} addr=0x${rl(0x14DC2).toString(16)}`);

// 0x14DC6: 关键! MOVEA.L (A0,D0.W), A0
// 编码: 0x2070 + 扩展字
// 0x2070 = MOVEA.L (d8(An,Xn), An)
// 扩展字: D0.W 作为索引, A0 作为基址
console.log(`  0x14DC6: word=0x${rw(0x14DC6).toString(16)} (MOVEA.L indexed?)`);
console.log(`  0x14DC8: ext word=0x${rw(0x14DC8).toString(16)}`);
if (rw(0x14DC6) === 0x2070) {
  const ext = rw(0x14DC8);
  const idxReg = (ext >> 12) & 7;
  const idxSize = (ext & 0x8000) ? 'L' : 'W';
  const idxType = (ext & 0x800) ? 'A' : 'D';
  const baseReg = 0; // A0
  console.log(`    → MOVEA.L (${idxType}${idxReg}.${idxSize}, A${baseReg}), A0`);
  console.log(`    → A0 = *(A0 + D0.W*1) = *(0x18011A + D0)`);
}

// 0x14DCA: MOVE.B (A0), D0 (读取 (A0) 字节)
// 但反汇编显示 0x14DCA 处是 MOVE.B (0xFFFFFFFF.W), D0
// 让我检查实际字节
console.log(`\n  0x14DCA: word=0x${rw(0x14DCA).toString(16)}`);
console.log(`  0x14DCC: word=0x${rw(0x14DCC).toString(16)}`);
console.log(`  0x14DCE: word=0x${rw(0x14DCE).toString(16)}`);

// 检查 0x14DCA 是否是 MOVE.B (0xFFFFAA11).L, D0
// 0x1039 0xFFFF 0xAA11 (6字节)
if (rw(0x14DCA) === 0x1039) {
  const addr = rl(0x14DCC);
  console.log(`    → MOVE.B (0x${addr.toString(16)}).L, D0`);
}

// 0x14DD0: BTST #7, D0
console.log(`  0x14DD0: word=0x${rw(0x14DD0).toString(16)}`);
if (rw(0x14DD0) === 0x0800) {
  console.log(`  0x14DD2: BTST #${rw(0x14DD2)}, D0`);
}

// 3. 解析脚本 0x19f1a4
console.log('\n=== 3. 解析脚本 0x19f1a4 ===\n');

// 从字节码解释器分析:
// 0x15826: MOVE.B (A0)+, D0  ← 读取命令字节
// 0x15828: CMPI.B #0xFF, D0  ← 与 0xFF 比较
// 0x1582C: BEQ.W 0x1593C  ← 如果 0xFF, YIELD
// 0x15830: ADD.W D0, D0  ← D0 *= 2
// 0x15832: ADD.W D0, D0  ← D0 *= 4
// 0x15834: JMP 0x15838(PC, D0.W)  ← 跳转到跳转表

// 每个命令处理器的参数消耗不同
// 让我先读取脚本数据, 然后尝试解析

const scriptStart = 0x19f1a4;
console.log(`脚本数据 (从 0x${scriptStart.toString(16)} 开始, 前 512 字节):`);
for (let i = 0; i < 512; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(scriptStart + i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${(scriptStart + i).toString(16)}: ${hex} ${ascii}`);
}

// 4. 提取所有嵌入的 3字节大端地址 (00 19 XX XX 或 00 1X XX XX)
console.log('\n=== 4. 提取脚本中嵌入的 ROM 地址 ===\n');
const embeddedAddrs = new Set();
for (let i = 0; i < 1024; i++) {
  const b0 = rb(scriptStart + i);
  const b1 = rb(scriptStart + i + 1);
  // 检查 00 19 XX XX 模式 (ROM 地址 0x19XXXX)
  if (b0 === 0x00 && b1 === 0x19) {
    const addr = (b0 << 16) | (b1 << 8) | rb(scriptStart + i + 2);
    if (addr > 0x18000 && addr < 0x20000) {
      embeddedAddrs.add(addr);
    }
  }
  // 也检查 00 1A XX XX
  if (b0 === 0x00 && b1 === 0x1A) {
    const addr = (b0 << 16) | (b1 << 8) | rb(scriptStart + i + 2);
    if (addr > 0x1A000 && addr < 0x1B000) {
      embeddedAddrs.add(addr);
    }
  }
}

console.log(`找到 ${embeddedAddrs.size} 个嵌入地址:`);
const sortedAddrs = Array.from(embeddedAddrs).sort((a, b) => a - b);
for (const addr of sortedAddrs) {
  // 显示前 16 字节
  let hex = '';
  for (let j = 0; j < 16; j++) hex += rb(addr + j).toString(16).padStart(2, '0') + ' ';
  console.log(`  0x${addr.toString(16)}: ${hex}`);
}

// 5. 检查资源指针表 0x19efa2 的所有子表
console.log('\n=== 5. 资源指针表 0x19efa2 的子表 ===\n');
const tableAddr = 0x19efa2;
for (let i = 0; i < 32; i += 4) {
  const ptr = rl(tableAddr + i);
  console.log(`\n+0x${i.toString(16).padStart(2,'0')}: ptr=0x${ptr.toString(16)}`);
  if (ptr < 0xFF0000 && ptr > 0x100) {
    // 显示前 64 字节
    for (let j = 0; j < 64; j += 16) {
      let hex = '';
      for (let k = 0; k < 16; k++) hex += rb(ptr + j + k).toString(16).padStart(2, '0') + ' ';
      console.log(`  0x${(ptr + j).toString(16)}: ${hex}`);
    }
  }
}

// 6. 检查 0xFFFFA49C 的初始化 (可能是 sceneIndex)
console.log('\n=== 6. 搜索 0xFFFFA49C 的所有写入 ===\n');
const A49C = 0xFFFFA49C >>> 0;
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  // MOVE.W #imm, (0xFFFFA49C).L
  if (w === 0x31FC && rl(i+4) === A49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${rw(i+2).toString(16)}, (0xFFFFA49C).L`);
  }
  // MOVE.W #imm, (0xFFFFA49C.W)
  if (w === 0x31FC && rw(i+4) === 0xA49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${rw(i+2).toString(16)}, (0xFFFFA49C.W)`);
  }
  // MOVE.W Dn, (0xFFFFA49C).L
  if ((w & 0xF1F8) === 0x3139 && rl(i+2) === A49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W D${(w>>9)&7}, (0xFFFFA49C).L`);
  }
  // MOVE.W Dn, (0xFFFFA49C.W)
  if ((w & 0xF1F8) === 0x3138 && rw(i+2) === 0xA49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W D${(w>>9)&7}, (0xFFFFA49C.W)`);
  }
}

// 7. 检查 0xFFFF95A8 的所有读取 (0xC93A 设置为 15)
console.log('\n=== 7. 搜索读取 0xFFFF95A8 的代码 ===\n');
const A5A8 = 0xFFFF95A8 >>> 0;
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  if ((w & 0xF1F8) === 0x3039 && rl(i+2) === A5A8) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W (0xFFFF95A8).L, D${(w>>9)&7}`);
  }
  if ((w & 0xF1F8) === 0x3038 && rw(i+2) === 0x95A8) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W (0xFFFF95A8.W), D${(w>>9)&7}`);
  }
  if ((w & 0xF1F8) === 0x1039 && rl(i+2) === A5A8) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B (0xFFFF95A8).L, D${(w>>9)&7}`);
  }
}

// 8. 检查 0xC9A0 的完整反汇编 (它决定动画流程)
console.log('\n=== 8. 0xC9A0 原始字节 ===\n');
for (let i = 0; i < 96; i += 16) {
  const addr = 0xC9A0 + i;
  let hex = '';
  for (let j = 0; j < 16; j++) hex += rb(addr + j).toString(16).padStart(2, '0') + ' ';
  console.log(`  0x${addr.toString(16)}: ${hex}`);
}
