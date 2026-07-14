/**
 * 重新解析所有子脚本 (变量长度命令格式)
 * 并查找 0xFF603C 资源描述符表的初始化代码
 *
 * 关键发现:
 * - 8个指针指向的不是资源表,而是子脚本 (变量长度命令序列)
 * - 主脚本 0x19f1a4: cmd 0x00(4B) + 7×cmd 0x37(4B) + YIELD
 * - 子脚本包含 cmd 0x02(8B) 带 ROM 地址参数
 *
 * 本脚本目标:
 * 1. 用正确的命令大小重新解析所有子脚本
 * 2. 查找 0xFF603C 表的初始化代码
 * 3. 查找资源 ID → ROM 地址的静态映射
 * 4. 提取资源 0x15, 0x2a-0x2f 的实际数据
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
function addrW(w) { return ((w | 0xFFFF0000) >>> 0); }

// ============================================================
// 已知命令大小 (从 0xFFFFAA2C 设置推断)
// ============================================================
const cmdSizes = {
  0x00: 4, 0x02: 8, 0x04: 6, 0x06: 6, 0x07: 6, 0x08: 4,
  0x0c: 4, 0x0d: 4, 0x0e: 6, 0x0f: 6, 0x10: 6, 0x11: 6,
  0x12: 4, 0x13: 4, 0x15: 6, 0x16: 6, 0x17: 6, 0x19: 6,
  0x1a: 6, 0x1b: 8, 0x1d: 6, 0x20: 6, 0x21: 6, 0x22: 6,
  0x23: 6, 0x32: 8, 0x37: 4, 0xff: 1,
};

// ============================================================
// 1. 用正确的命令大小解析子脚本
// ============================================================
function parseScript(startAddr, maxCmds, label) {
  console.log(`\n=== ${label} (0x${startAddr.toString(16)}) ===\n`);
  let pos = startAddr;
  const cmds = [];
  
  for (let i = 0; i < maxCmds; i++) {
    if (pos >= rom.length) break;
    const cmd = rb(pos);
    
    if (cmd === 0xff) {
      // YIELD - 检查下一个字节
      const next = rb(pos + 1);
      if (next === 0xff) {
        console.log(`  [${i}] 0x${pos.toString(16)}: END (0xFF 0xFF)`);
        cmds.push({ addr: pos, cmd: 0xff, name: 'END', size: 2 });
        break;
      } else {
        console.log(`  [${i}] 0x${pos.toString(16)}: YIELD (0xFF)`);
        cmds.push({ addr: pos, cmd: 0xff, name: 'YIELD', size: 1 });
        pos += 1;
        continue;
      }
    }
    
    const size = cmdSizes[cmd];
    if (size === undefined) {
      console.log(`  [${i}] 0x${pos.toString(16)}: UNKNOWN cmd=0x${cmd.toString(16)}`);
      break;
    }
    
    // 提取参数
    const paramBytes = [];
    for (let j = 1; j < size; j++) paramBytes.push(rb(pos + j));
    
    let desc = '';
    if (cmd === 0x37) {
      // 资源加载: cmd id ?? ??
      const resId = paramBytes[0];
      desc = `LOAD_RESOURCE id=0x${resId.toString(16)}`;
    } else if (cmd === 0x02 && size === 8) {
      // 复杂命令: cmd [XX YY] [PP PP] [19 ZZ WW]
      const p0 = paramBytes[0];
      const p1 = paramBytes[1];
      const p2 = paramBytes[2];
      const p3 = paramBytes[3];
      // 最后 3 字节可能是地址 (0x19XXYY)
      const addr = (paramBytes[4] << 16) | (paramBytes[5] << 8) | paramBytes[6];
      desc = `cmd_02 p0=0x${p0.toString(16)} p1=0x${p1.toString(16)} p2=0x${p2.toString(16)} p3=0x${p3.toString(16)} addr=0x${addr.toString(16)}`;
    } else if (cmd === 0x00) {
      // cmd 0x00: 可能是设置子脚本地址
      const addr = (paramBytes[0] << 16) | (paramBytes[1] << 8) | paramBytes[2];
      desc = `cmd_00 addr=0x${addr.toString(16)}`;
    } else if (cmd === 0x1b) {
      // cmd 0x1b (8B)
      const addr = (paramBytes[4] << 16) | (paramBytes[5] << 8) | paramBytes[6];
      desc = `cmd_1b p0=0x${paramBytes[0].toString(16)} addr=0x${addr.toString(16)}`;
    } else {
      desc = `params=[${paramBytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' ')}]`;
    }
    
    console.log(`  [${i}] 0x${pos.toString(16)}: cmd=0x${cmd.toString(16).padStart(2,'0')} (${size}B) ${desc}`);
    cmds.push({ addr: pos, cmd, name: `cmd_0x${cmd.toString(16)}`, size, params: paramBytes });
    pos += size;
  }
  
  return cmds;
}

// ============================================================
// 2. 解析主脚本和所有子脚本
// ============================================================
console.log('=== 场景数据 0x19efa2 的 8 个指针 ===\n');
const scenePtrs = [];
for (let i = 0; i < 8; i++) {
  const ptr = rl(0x19efa2 + i * 4);
  scenePtrs.push(ptr);
  console.log(`  [+0x${(i*4).toString(16).padStart(2,'0')}] → 0x${ptr.toString(16)}`);
}

// 主脚本 [+0x14]
parseScript(scenePtrs[5], 30, '主脚本 [+0x14]');

// 子脚本 [+0x00]
parseScript(scenePtrs[0], 50, '子脚本 [+0x00]');

// 子脚本 [+0x1c]
parseScript(scenePtrs[7], 80, '子脚本 [+0x1c]');

// 子脚本 [+0x10]
parseScript(scenePtrs[4], 50, '子脚本 [+0x10]');

// 子脚本 [+0x08]
parseScript(scenePtrs[2], 50, '子脚本 [+0x08]');

// 子脚本 [+0x0c]
parseScript(scenePtrs[3], 50, '子脚本 [+0x0c]');

// ============================================================
// 3. 查找 0xFF603C 表初始化代码
// ============================================================
console.log('\n\n=== 查找 0xFF603C 表初始化 ===\n');

// 搜索所有 LEA 0xFF603C, An 指令
// LEA (xxx).L, An = 0x41F9 | (reg << 9)
// 0xFF603C 作为 4 字节地址
const targetAddr = 0xFF603C;
const leaMatches = [];

for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  // LEA (xxx).L, An: (w & 0xF1FF) === 0x41F9
  if ((w & 0xF1FF) === 0x41F9) {
    const addr = rl(i + 2);
    if (addr === targetAddr) {
      const reg = (w >> 9) & 7;
      leaMatches.push({ addr: i, reg });
    }
  }
}

console.log(`找到 ${leaMatches.length} 处 LEA 0xFF603C, An 指令`);
for (const m of leaMatches.slice(0, 30)) {
  console.log(`  0x${m.addr.toString(16)}: LEA 0xFF603C, A${m.reg}`);
}

// ============================================================
// 4. 反汇编前几个 LEA 0xFF603C 位置的上下文
// ============================================================
console.log('\n=== 反汇编 LEA 0xFF603C 上下文 ===\n');

function disasm(addr, length, label) {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  const end = addr + length;
  while (pc < end) {
    const w = rw(pc);
    let size = 2;
    let mn = '';
    
    if (w === 0x4E75) mn = 'RTS';
    else if (w === 0x4E71) mn = 'NOP';
    else if (w === 0x4E73) mn = 'RTE';
    else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { mn = `JSR (PC,d16) → 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
    else if ((w & 0xFF00) === 0x6100) { mn = `BSR.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { mn = `BRA.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { mn = `BEQ.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { mn = `BNE.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6000 && (w&0xFF)) { mn = `BRA.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6700 && (w&0xFF)) { mn = `BEQ.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6600 && (w&0xFF)) { mn = `BNE.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    // MOVE #imm
    else if (w === 0x11FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x13FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x33FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${addrW(rw(pc+6)).toString(16)}.W)`; size = 8; }
    else if (w === 0x23FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if ((w & 0xF1FF) === 0x003C) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x303C) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x203C) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
    // MOVE from (xxx)
    else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x1038) { mn = `MOVE.B (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2038) { mn = `MOVE.L (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    // MOVE to (xxx)
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x23C0) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x3138) { mn = `MOVE.W D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x1138) { mn = `MOVE.B D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xFFF8) === 0x21C8) { mn = `MOVE.L A${w&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    // LEA
    else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${addrW(rw(pc+2)).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x41E8) { const d=sx16(rw(pc+2)); mn = `LEA ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41D0) { mn = `LEA (A${w&7}), A${(w>>9)&7}`; }
    // CLR
    else if (w === 0x42B9) { mn = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mn = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B8) { mn = `CLR.L (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4278) { mn = `CLR.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4238) { mn = `CLR.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    // TST
    else if (w === 0x4A79) { mn = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mn = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A78) { mn = `TST.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4A38) { mn = `TST.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x4A40) { mn = `TST.W D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4A00) { mn = `TST.B D${w&7}`; }
    // CMPI
    else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C80) { mn = `CMPI.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x0C79) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F8) === 0x0C78) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    // BTST
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1C0) === 0x0100) { mn = `BTST D${(w>>9)&7}, D${w&7}`; }
    // MOVE (An), Dn
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2028) { const d=sx16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    // MOVE Dn, (An)
    else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3080) { mn = `MOVE.W D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x2080) { mn = `MOVE.L D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3128) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x2128) { const d=sx16(rw(pc+2)); mn = `MOVE.L D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x3148) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    // MOVE Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2000) { mn = `MOVE.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2040) { mn = `MOVEA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3040) { mn = `MOVEA.W D${w&7}, A${(w>>9)&7}`; }
    // ADD/SUB/CMP
    else if ((w & 0xF1C0) === 0xD040) { mn = `ADD.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD000) { mn = `ADD.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD080) { mn = `ADD.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9040) { mn = `SUB.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9000) { mn = `SUB.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9080) { mn = `SUB.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB040) { mn = `CMP.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB080) { mn = `CMP.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xC040) { mn = `MULU.W D${w&7}, D${(w>>9)&7}`; }
    // ADDA
    else if ((w & 0xF1C0) === 0xD0C0) { mn = `ADDA.W D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD1C0) { mn = `ADDA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0xD1F9) { mn = `ADDA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0xD0F9) { mn = `ADDA.W (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0xD1F8) { mn = `ADDA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0xD0F8) { mn = `ADDA.W (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    // ADDQ/SUBQ
    else if ((w & 0xF1F8) === 0x5340) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    // DBRA
    else if ((w & 0xF1F8) === 0x51C8) { mn = `DBRA D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    // Shifts
    else if ((w & 0xF1F8) === 0xE008) { mn = `LSR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE018) { mn = `LSL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE000) { mn = `ASR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE010) { mn = `ASL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4840) { mn = `SWAP D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4880) { mn = `EXT.W D${w&7}`; }
    // MOVEM
    else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75) break;
    pc += size;
  }
}

// 反汇编前 5 个 LEA 0xFF603C 的上下文 (前 20 字节 + 后 40 字节)
for (const m of leaMatches.slice(0, 8)) {
  const ctxStart = Math.max(0, m.addr - 20);
  disasm(ctxStart, 100, `0x${m.addr.toString(16)} 附近 (LEA 0xFF603C, A${m.reg})`);
}

// ============================================================
// 5. 查找资源指针表 (静态 ROM 表)
// ============================================================
console.log('\n\n=== 查找资源指针表 ===\n');

// 已知资源 ID: 0x15, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f
// 在 ROM 中搜索这些 ID 作为 word 值
const resIds = [0x15, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f];

// 搜索连续的 word: 0x0015 0x002a 0x002b ...
for (let i = 0; i < rom.length - 14; i++) {
  let match = true;
  for (let j = 0; j < resIds.length; j++) {
    if (rw(i + j * 2) !== resIds[j]) {
      match = false;
      break;
    }
  }
  if (match) {
    console.log(`  找到连续资源 ID 表: 0x${i.toString(16)}`);
    // 显示周围数据
    for (let k = 0; k < 32; k += 16) {
      let hex = '';
      for (let l = 0; l < 16; l++) hex += rb(i + k + l).toString(16).padStart(2, '0') + ' ';
      console.log(`    0x${(i+k).toString(16)}: ${hex}`);
    }
  }
}

// 也搜索 4 字节格式: 0x00000015 0x0000002a ...
for (let i = 0; i < rom.length - 28; i++) {
  let match = true;
  for (let j = 0; j < resIds.length; j++) {
    if (rl(i + j * 4) !== resIds[j]) {
      match = false;
      break;
    }
  }
  if (match) {
    console.log(`  找到 4 字节资源 ID 表: 0x${i.toString(16)}`);
    for (let k = 0; k < 48; k += 16) {
      let hex = '';
      for (let l = 0; l < 16; l++) hex += rb(i + k + l).toString(16).padStart(2, '0') + ' ';
      console.log(`    0x${(i+k).toString(16)}: ${hex}`);
    }
  }
}

// ============================================================
// 6. 查找 0xCC4E (已知加载资源 0x8001) 附近的代码
// ============================================================
console.log('\n=== 0xCC4E 附近代码 (已知资源加载) ===\n');
disasm(0xCC00, 200, '0xCC00 区域');

// ============================================================
// 7. 查找 0xC9A0 (开场动画入口) 的完整代码
// ============================================================
console.log('\n=== 0xC9A0 完整反汇编 ===\n');
disasm(0xC9A0, 300, '0xC9A0 开场动画入口');

// ============================================================
// 8. 反汇编 0x14D5E (动画状态机入口)
// ============================================================
console.log('\n=== 0x14D5E 动画状态机入口 ===\n');
disasm(0x14D5E, 200, '0x14D5E 动画状态机');
