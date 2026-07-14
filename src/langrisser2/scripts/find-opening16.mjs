/**
 * 关键分析:
 * 1. 确认 0x14DCA 处的实际指令 (是否写入 0xFFFFAA11)
 * 2. 确认 case bit7 设置的 0xFFFFAA28 = 脚本指针
 * 3. 解析脚本数据 (0x18D60A)
 * 4. 提取资源数据
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
function signExtend16(v) { return v > 0x7FFF ? v - 0x10000 : v; }

// ============================================================
// 1. 读取 0x14DA6-0x14E30 的原始字节
// ============================================================
console.log('=== 1. 0x14DA6-0x14E30 原始字节 ===\n');

for (let i = 0; i < 0x90; i += 16) {
  const addr = 0x14DA6 + i;
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(addr + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${addr.toString(16)}: ${hex}`);
}

// 手工反汇编关键部分
console.log('\n手工反汇编 0x14DA6:');
let pc = 0x14DA6;
const instrs = [
  // 0x14DA6: TST.B (0xFFFFAA11).L = 0x4A39 0xFFFF 0xAA11
  { addr: 0x14DA6, size: 6, mn: 'TST.B (0xFFFFAA11).L' },
  // 0x14DAC: BEQ.W 0x14E10
  { addr: 0x14DAC, size: 4, mn: `BEQ.W 0x${(0x14DAC + 2 + signExtend16(rw(0x14DAE))).toString(16)}` },
];

// 直接读取 0x14DA6 处的 word
console.log(`  0x14DA6: word=0x${rw(0x14DA6).toString(16)} (TST.B?)`);
console.log(`  0x14DA8: long=0x${rl(0x14DA8).toString(16)} (addr 0xFFFFAA11?)`);

// 0x14DAC: BEQ.W
console.log(`  0x14DAC: word=0x${rw(0x14DAC).toString(16)} (BEQ.W?)`);
const beqOffset = signExtend16(rw(0x14DAE));
console.log(`  0x14DAE: offset=0x${rw(0x14DAE).toString(16)} (${beqOffset}) → target=0x${(0x14DAE + beqOffset).toString(16)}`);

// 0x14DB0: 接下来的指令
console.log(`  0x14DB0: word=0x${rw(0x14DB0).toString(16)}`);
console.log(`  0x14DB2: word=0x${rw(0x14DB2).toString(16)}`);
console.log(`  0x14DB4: word=0x${rw(0x14DB4).toString(16)}`);
console.log(`  0x14DB6: word=0x${rw(0x14DB6).toString(16)}`);
console.log(`  0x14DB8: word=0x${rw(0x14DB8).toString(16)}`);
console.log(`  0x14DBA: word=0x${rw(0x14DBA).toString(16)}`);
console.log(`  0x14DBC: word=0x${rw(0x14DBC).toString(16)}`);
console.log(`  0x14DBE: word=0x${rw(0x14DBE).toString(16)}`);
console.log(`  0x14DC0: word=0x${rw(0x14DC0).toString(16)} (LEA?)`);
console.log(`  0x14DC2: long=0x${rl(0x14DC2).toString(16)}`);
console.log(`  0x14DC6: word=0x${rw(0x14DC6).toString(16)} (MOVEA.L?)`);
console.log(`  0x14DC8: word=0x${rw(0x14DC8).toString(16)} (扩展字?)`);

// 关键: 0x14DCA 处
console.log(`\n  关键: 0x14DCA 处`);
console.log(`  0x14DCA: word=0x${rw(0x14DCA).toString(16)}`);
console.log(`  0x14DCC: word=0x${rw(0x14DCC).toString(16)}`);
console.log(`  0x14DCE: word=0x${rw(0x14DCE).toString(16)}`);
console.log(`  0x14DD0: word=0x${rw(0x14DD0).toString(16)}`);

// 如果 0x14DCA = 0x11C1, 这是 MOVE.B D1, (xxx).L
const w14DCA = rw(0x14DCA);
if (w14DCA === 0x11C1) {
  console.log(`  → 0x14DCA: MOVE.B D1, (0x${rl(0x14DCC).toString(16)}).L  ← 写入 0xFFFFAA11!`);
} else if ((w14DCA & 0xF1F8) === 0x1139) {
  console.log(`  → 0x14DCA: MOVE.B D${(w14DCA>>9)&7}, (0x${rl(0x14DCC).toString(16)}).L`);
} else {
  console.log(`  → 0x14DCA: 未识别 (word=0x${w14DCA.toString(16)})`);
  // 检查是否是 MOVE.B D1, (xxx).L
  // 0x11C1 = 0001 0001 1100 0001
  if ((w14DCA & 0xFFC0) === 0x11C0) {
    const reg = (w14DCA >> 9) & 7;
    console.log(`  → 实际是 MOVE.B D${reg}, (xxx).L`);
  }
}

// ============================================================
// 2. 确认 case bit7 的脚本指针设置
// ============================================================
console.log('\n=== 2. case bit7 脚本指针设置 ===\n');

// 0x14E26: MOVEA.L 20(A0), A0  (A0 = *(A0 + 20))
console.log('0x14E26: MOVEA.L 20(A0), A0');
console.log(`  A0 = 0x18011A (指针表)`);
console.log(`  A0 + 20 = 0x${(0x18011A + 20).toString(16)}`);
console.log(`  *(0x${(0x18011A + 20).toString(16)}) = 0x${rl(0x18011A + 20).toString(16)}`);
console.log(`  A0 = 0x${rl(0x18011A + 20).toString(16)}`);

// 0x14E2A: MOVE.L (A0), (0xFFFFAA12).L
const ptr1 = rl(0x18011A + 20);
console.log(`\n0x14E2A: MOVE.L (A0), (0xFFFFAA12).L`);
console.log(`  (A0) = *0x${ptr1.toString(16)} = 0x${rl(ptr1).toString(16)}`);
console.log(`  0xFFFFAA12 = 0x${rl(ptr1).toString(16)} (脚本数据地址)`);

// 0x14E30: MOVEA.L (A0), A0
console.log(`\n0x14E30: MOVEA.L (A0), A0`);
console.log(`  A0 = *0x${ptr1.toString(16)} = 0x${rl(ptr1).toString(16)}`);

// 0x14E32: MOVE.L #0x14E56, (0xFFFFAA20).L
console.log(`\n0x14E32: MOVE.L #0x14E56, (0xFFFFAA20).L`);
console.log(`  0xFFFFAA20 = 0x14E56 (返回地址)`);

// 0x14E3C: MOVE.L A0, (0xFFFFAA28).L
const scriptAddr = rl(ptr1);
console.log(`\n0x14E3C: MOVE.L A0, (0xFFFFAA28).L`);
console.log(`  A0 = 0x${scriptAddr.toString(16)}`);
console.log(`  0xFFFFAA28 = 0x${scriptAddr.toString(16)} (脚本指针, 用于字节码解释器)`);

// 0x14E42: MOVE.L #0xFFFFAE5C, (0xFFFFAA1A).L
console.log(`\n0x14E42: MOVE.L #0xFFFFAE5C, (0xFFFFAA1A).L`);
console.log(`  0xFFFFAA1A = 0xFFFFAE5C (数据缓冲区?)`);

// 0x14E4C: CLR.W (0xFFFFAA1E).L
console.log(`\n0x14E4C: CLR.W (0xFFFFAA1E).L`);
console.log(`  0xFFFFAA1E = 0`);

// 0x14E52: BRA.W 0x157F6 (跳转到字节码解释器)
console.log(`\n0x14E52: BRA.W 0x157F6 (跳转到字节码解释器)`);

// ============================================================
// 3. 解析脚本数据 (0x18D60A)
// ============================================================
console.log('\n=== 3. 解析脚本数据 ===\n');

// 命令参数消耗 (从 find-opening12 分析):
// cmd 0: 1B (MOVE.B (A0)+, D0)
// cmd 1: 1B (MOVE.B (A0)+, D0)
// cmd 2: 变长 (1+1+1+4 = 7B, 条件读取)
// cmd 3: 1B (MOVE.B (A0)+, D0)
// cmd 4: 0B (用 MOVE.B (A0), D0, 然后 LEA 1(A0), A0)
// cmd 5: 0B (用 MOVE.B (A0), D0, 然后 LEA 5(A0), A0)
// cmd 6-10: 0B (用 MOVE.B (A0), D0 但不递增)
// cmd 11: 1B (MOVE.B (A0)+, D0)
// cmd 12: 1B (MOVE.B (A0)+, D0)
// cmd 13: 1B (MOVE.B (A0)+, D0)
// cmd 14: 1B (MOVE.B (A0)+, D0)
// cmd 15: 0B (BRA.W 0x1592c)

// 但是 cmd 6-10 不递增 A0, 这会造成死循环
// 除非 0x1592c 处有其他机制递增 A0

// 让我检查 0x1592c 处的代码
console.log('0x1592c 处代码 (循环返回点):');
for (let i = 0; i < 32; i += 2) {
  const w = rw(0x1592c + i);
  console.log(`  0x${(0x1592c + i).toString(16)}: 0x${w.toString(16).padStart(4,'0')}`);
}

// 实际上, 0x1592c 可能是字节码解释器循环的开始
// 让我检查 0x1592c 和 0x157F6 的关系
console.log(`\n0x157F6 是字节码解释器入口`);
console.log(`0x1592c 可能是循环的某个位置`);
console.log(`差值: 0x${(0x1592c - 0x157F6).toString(16)} = ${0x1592c - 0x157F6}`);

// 从字节码解释器代码:
// 0x157F6: JSR 0xFE2A (帧推进)
// 0x157FE: MOVEA.L (0xFFFFAA28).L, A0  ← 读取脚本指针
// 0x15804: MOVE.W #0xFFFF, (0xFFFFAA2E).L  ← 清空?
// 0x1580C: MOVE.W #0xFFFF, (0xFFFFAA34).L
// 0x15814: MOVE.L (0xFFFFAA34).L, (0xFFFFAA30).L
// 0x1581E: MOVE.L A0, (0xFFFFAA28).L  ← 保存脚本指针
// 0x15824: MOVEQ #0, D0
// 0x15826: MOVE.B (A0)+, D0  ← 读取命令字节
// 0x15828: CMPI.B #0xFF, D0
// 0x1582C: BEQ.W 0x1593C  ← 如果 0xFF, 结束
// 0x15830: ADD.W D0, D0  ← D0 *= 2
// 0x15832: ADD.W D0, D0  ← D0 *= 4
// 0x15834: JMP 0x15838(PC, D0.W)  ← 跳转到跳转表

// 0x1592C 可能是跳转表之前的某个位置
// 让我检查 0x1592C 和 0x157FE 的关系

// 关键发现: 0x157FE 处 A0 = *(0xFFFFAA28)
// 但 0x1581E 处 A0 被保存回 0xFFFFAA28
// 这意味着每次循环都会从 0xFFFFAA28 读取 A0, 执行命令, 然后保存回 A0

// 所以如果命令不递增 A0, 下次循环会读到同样的字节
// 但是 0x1592c 可能不是直接跳回 0x157FE, 而是跳到其他地方

// 让我检查 0x1592c 的实际代码
console.log('\n0x1592c 附近代码 (反汇编):');
pc = 0x1592c;
for (let i = 0; i < 8; i++) {
  const w = rw(pc);
  let mn = '';
  let size = 2;
  
  if (w === 0x4E75) mn = 'RTS';
  else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if ((w & 0xFF00) === 0x6000) {
    const o = signExtend16(rw(pc+2));
    mn = `BRA.W 0x${(pc+2+o).toString(16)}`;
    size = 4;
  }
  else if ((w & 0xF000) === 0x6000 && (w & 0xFF) !== 0) {
    const o = (w & 0xFF) > 127 ? (w & 0xFF) - 256 : (w & 0xFF);
    mn = `BRA.S 0x${(pc+2+o).toString(16)}`;
  }
  else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
  else if (w === 0x23C8) { mn = `MOVE.L A0, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF100) === 0x7000) { mn = `MOVEQ #0x${(w&0xFF).toString(16)}, D${(w>>9)&7}`; }
  else { mn = `.word 0x${w.toString(16)}`; }
  
  console.log(`  0x${pc.toString(16)}: ${mn}`);
  pc += size;
}

// ============================================================
// 4. 解析脚本 (使用正确的参数消耗)
// ============================================================
console.log('\n=== 4. 解析脚本 (0x18D60A) ===\n');

// 重新分析命令参数消耗
// 关键: 命令处理器结束时, A0 应该已经递增到下一个命令
// 如果命令不消耗参数, A0 不变, 下次循环读到同样字节 -> 死循环
// 所以所有命令都必须消耗至少 1 字节 (命令字节本身)

// 实际上, 0x15826: MOVE.B (A0)+, D0 已经递增了 A0 (读取命令字节)
// 所以命令处理器只需要消耗额外的参数字节

// 重新理解:
// 1. 0x157FE: A0 = *(0xFFFFAA28) (读取脚本指针)
// 2. 0x15826: D0 = (A0)+ (读取命令字节, A0 递增)
// 3. 跳转到命令处理器
// 4. 命令处理器读取额外参数 (用 (A0)+)
// 5. 命令处理器结束时, 0x1592c 保存 A0 到 0xFFFFAA28, 然后跳回 0x157FE

// 所以 0x1592c 应该是:
// MOVE.L A0, (0xFFFFAA28).L  ← 保存脚本指针
// JMP 0x157FE  ← 跳回循环

// 让我验证
console.log('验证 0x1592c 是否保存 A0 并跳回循环:');

// 从上面的反汇编, 0x1592c 处的指令是什么?
// 如果 0x1592c = 0x23C8, 这是 MOVE.L A0, (xxx).L
const w1592c = rw(0x1592c);
if (w1592c === 0x23C8) {
  console.log(`  0x1592c: MOVE.L A0, (0x${rl(0x1592e).toString(16)}).L`);
  // 然后跳回
  const nextAddr = 0x1592c + 6;
  const wNext = rw(nextAddr);
  if ((wNext & 0xFF00) === 0x6000) {
    const o = signExtend16(rw(nextAddr + 2));
    console.log(`  0x${nextAddr.toString(16)}: BRA.W 0x${(nextAddr + 2 + o).toString(16)}`);
  }
}

// ============================================================
// 5. 解析脚本 (使用正确的参数消耗)
// ============================================================
console.log('\n=== 5. 解析脚本 ===\n');

// 命令参数消耗 (额外参数, 不包括命令字节本身):
// cmd 0: 1B
// cmd 1: 1B
// cmd 2: 变长 (条件读取, 最多 7B)
// cmd 3: 1B
// cmd 4: 1B (LEA 1(A0), A0 → 跳过 1 字节)
// cmd 5: 5B (LEA 5(A0), A0 → 跳过 5 字节)
// cmd 6: 0B (不消耗额外参数)
// cmd 7: 0B
// cmd 8: 0B (读取 +1(A0) 但不递增, 但可能修改 A0)
// cmd 9: 0B
// cmd 10: 0B
// cmd 11: 1B
// cmd 12: 1B
// cmd 13: 1B
// cmd 14: 1B
// cmd 15: 0B

// 但是 cmd 6-10 如果不消耗参数, 会死循环
// 除非它们修改 A0 的方式我没看到

// 让我假设所有命令都消耗至少 1 字节 (命令字节)
// 额外参数:
const extraParams = [1, 1, -1, 1, 1, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0];

console.log('脚本解析 (从 0x18D60A):');
let pos = 0x18D60A;
let cmdIdx = 0;
while (cmdIdx < 50) {
  const cmd = rb(pos);
  if (cmd === 0xFF) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: END (0xFF)`);
    break;
  }
  if (cmd > 15) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: INVALID cmd=${cmd} (0x${cmd.toString(16)})`);
    break;
  }
  const extra = extraParams[cmd];
  let line = `  [${cmdIdx}] 0x${pos.toString(16)}: cmd=${cmd}`;
  if (extra > 0) {
    const params = [];
    for (let p = 0; p < extra; p++) params.push(rb(pos + 1 + p));
    line += ` params=[${params.map(p => '0x' + p.toString(16).padStart(2,'0')).join(',')}]`;
    pos += 1 + extra;
  } else if (extra === 0) {
    pos += 1;
  } else {
    // 变长 (cmd 2)
    line += ` (变长)`;
    // 先跳过 1 字节
    pos += 1;
    break;
  }
  console.log(line);
  cmdIdx++;
}

// ============================================================
// 6. 检查 0xFFFFAA11 的写入位置
// ============================================================
console.log('\n=== 6. 搜索 0xFFFFAA11 的写入 ===\n');

// 0x14DCA 附近
console.log('0x14DCA 附近字节:');
for (let i = 0; i < 16; i++) {
  console.log(`  0x${(0x14DCA + i).toString(16)}: 0x${rb(0x14DCA + i).toString(16).padStart(2,'0')}`);
}

// 检查是否 0x14DCA 是 MOVE.B D1, (0xFFFFAA11).L
// 编码: 0x11C1 0xFFFF 0xAA11 (6 字节)
// 0x11C1 = 0001 0001 1100 0001
//        = MOVE.B D1, (xxx).L
console.log(`\n0x14DCA word = 0x${rw(0x14DCA).toString(16)}`);
if (rw(0x14DCA) === 0x11C1) {
  console.log('  → MOVE.B D1, (0xFFFFAA11).L  ← 写入 0xFFFFAA11!');
} else {
  console.log(`  → 不是 MOVE.B D1, (xxx).L`);
  // 检查其他可能
  const w = rw(0x14DCA);
  if ((w & 0xF1F8) === 0x11C0) {
    console.log(`  → MOVE.B D${(w>>9)&7}, (0x${rl(0x14DCC).toString(16)}).L`);
  } else if ((w & 0xF1F8) === 0x1139) {
    console.log(`  → MOVE.B D${(w>>9)&7}, (0x${rl(0x14DCC).toString(16)}).L`);
  }
}

// 直接搜索 0x11C1 后跟 0xFFFF 0xAA11
console.log('\n搜索 MOVE.B D1, (0xFFFFAA11).L (0x11C1 FFFF AA11):');
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x11C1 && rl(i + 2) === 0xFFFFAA11) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B D1, (0xFFFFAA11).L`);
  }
}

// 搜索所有 MOVE.B Dn, (0xFFFFAA11).L
console.log('\n搜索所有 MOVE.B Dn, (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  if ((w & 0xF1C0) === 0x11C0 && rl(i + 2) === 0xFFFFAA11) {
    const reg = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B D${reg}, (0xFFFFAA11).L`);
  }
}

// 搜索所有 MOVE.B (xxx).L, Dn (读取 0xFFFFAA11)
console.log('\n搜索 MOVE.B (0xFFFFAA11).L, Dn:');
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  if ((w & 0xF1C0) === 0x1039 && rl(i + 2) === 0xFFFFAA11) {
    const reg = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B (0xFFFFAA11).L, D${reg}`);
  }
}
