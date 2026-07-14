/**
 * 搜索 ROM 中开场动画调色板加载代码
 *
 * CRAM 写入模式:
 * 1. MOVE.L #0xC000xxxx, (0xC00004).L — 设置 CRAM 写入地址 (CD=11)
 *    68K 编码: 0x33FC <imm32> <addr32>
 *    其中 imm32 = 0xC0000000 | (cramAddr << 0) (低16位是CRAM地址)
 *    addr32 = 0x00C00004
 *
 * 2. MOVE.W (A0)+, (0xC00000).L — 循环写入颜色
 *    或 MOVE.W #imm, (0xC00000).L
 *
 * 目标:
 * - 找到所有 CRAM 写入指令 (0xC0000000 + 0xC00004)
 * - 找到调色板数据起始地址 (LEA 指令)
 * - 重点关注 0xC7EC 附近的代码
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

console.log('=== 搜索 CRAM 加载代码 ===\n');

// ============================================================
// 1. 搜索 MOVE.L #imm32, (0xC00004).L (0x33FC + imm + 0x00C00004)
// ============================================================
console.log('--- 1. MOVE.L #imm32, (0xC00004).L (0x33FC) ---');
const cramAddrWrites = [];
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x33FC) {
    const imm = rl(i + 2);
    const addr = rl(i + 6);
    if (addr === 0x00C00004) {
      const cd = (imm >> 30) & 0x03;
      const cramAddr = imm & 0xFFFF;
      console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0xC00004).L [CD=${cd}, addr=0x${cramAddr.toString(16)}]`);
      if (cd === 3) { // CRAM 写
        cramAddrWrites.push({ romAddr: i, cramAddr, imm });
      }
    }
  }
}
console.log(`  CRAM 写入指令总数: ${cramAddrWrites.length}`);

// ============================================================
// 2. 搜索 MOVE.W #imm, (0xC00004).L (0x31FC + imm + 0x00C00004)
// ============================================================
console.log('\n--- 2. MOVE.W #imm, (0xC00004).L (0x31FC) ---');
const cramWordWrites = [];
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x31FC) {
    const imm = rw(i + 2);
    const addr = rl(i + 4);
    if (addr === 0x00C00004) {
      // MOVE.W 写入控制端口, 这是单 word 写入
      // 在 VDP 控制端口中, 单 word 写入用于:
      //   - 设置 DMA 长度/源地址 (寄存器写)
      //   - 或者作为两次 word 写的一部分
      // 这里先记录所有
      cramWordWrites.push({ romAddr: i, imm });
    }
  }
}
console.log(`  MOVE.W #imm, (0xC00004).L 总数: ${cramWordWrites.length}`);
// 只显示前 20 个
for (const w of cramWordWrites.slice(0, 20)) {
  console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W #0x${w.imm.toString(16).padStart(4, '0')}, (0xC00004).L`);
}

// ============================================================
// 3. 搜索 MOVE.W (An)+, (0xC00000).L (颜色循环写入)
// 68K: 0x33C0 | (An << 0) — MOVE.W (An)+, (xxx).L
// ============================================================
console.log('\n--- 3. MOVE.W (An)+, (0xC00000).L (颜色写入循环) ---');
// 0x33C0 + (reg << 9) — MOVE.W (An)+, (xxx).L
// 实际是 0x33C0 | (reg << 9) — 但这是 MOVE.W (An), (xxx).L
// 让我查下正确的 opcode
// MOVE.W (An)+, (xxx).L 模式: mode=011 (postinc), reg=An
// 68K move 格式: 00 ss DDD MMM mmm rrr — 不对, 这是 move 到 dest
// 实际上 MOVE.W (An)+, (xxx).L 的 dest 是绝对地址
// 68K move word: 0x30 | (src_mode << 3) | src_reg, 然后是 dest_mode << 6 | dest_reg
// src: (An)+ = mode 011 (postinc), src_reg = An
// dest: (xxx).L = mode 111, reg = 001
// 完整 word: 0x30 | (3 << 3) | An, 然后是 (7 << 6) | 1 = 0x71 | (An << 9)? 

// 实际上 68K move mnemonic 是: 0x00 ss DDD MMM mmm rrr
// 但 16位简化: opcode = (0b00 << 14) | (size << 12) | (dst_reg << 9) | (dst_mode << 6) | (src_mode << 3) | src_reg
// size: 01=byte, 11=word, 10=long
// MOVE.W (An)+, (xxx).L:
//   src_mode = 011 (postinc), src_reg = An
//   dst_mode = 111, dst_reg = 001 (abs.L)
//   size = 11 (word)
// opcode = (11 << 12) | (1 << 9) | (7 << 6) | (3 << 3) | An
//        = 0x3000 | 0x0200 | 0x01C0 | 0x0018 | An
//        = 0x33D8 | An  (An = 0-7)
// 但要看 68K 实际格式... 这里我直接搜索 0xC00000 地址引用
const cramLoopWrites = [];
for (let i = 0; i < rom.length - 6; i++) {
  // MOVE.W (xxx), (0xC00000).L — 模式: src_mode=111, src_reg=000 (abs short) 或 001 (abs long)
  // MOVE.W (An)+, (0xC00000).L: opcode 是 0x33D8 | An, 后跟 4 字节地址 0x00C00000
  const w = rw(i);
  // 检查 MOVE.W (An)+, (xxx).L 模式
  if ((w & 0xFFF8) === 0x33D8) {
    const reg = w & 0x0007;
    const addr = rl(i + 2);
    if (addr === 0x00C00000) {
      cramLoopWrites.push({ romAddr: i, opcode: w, srcReg: reg });
    }
  }
  // MOVE.W (An), (xxx).L: opcode 0x3390 | An?  实际上 mode=010 (AR indirect), reg=An
  // MOVE.W (d16,An), (xxx).L: mode=101 (displacement), reg=An
  // MOVE.W (d8,An,Xn), (xxx).L: mode=110 (indexed), reg=An
  // MOVE.W (xxx).W, (xxx).L: mode=111, reg=000 (abs short)
  // MOVE.W (xxx).L, (xxx).L: mode=111, reg=001 (abs long)
  // src_mode=111, src_reg=001: opcode = (11 << 12) | (1 << 9) | (7 << 6) | (7 << 3) | 1 = 0x33F9
  if (w === 0x33F9) {
    const srcAddr = rl(i + 2);
    const dstAddr = rl(i + 6);
    if (dstAddr === 0x00C00000) {
      cramLoopWrites.push({ romAddr: i, opcode: w, srcAddr });
    }
  }
  // MOVE.W (xxx).W, (xxx).L: src_mode=111, src_reg=000: opcode = 0x33F8
  if (w === 0x33F8) {
    const srcAddr = rw(i + 2);
    const dstAddr = rl(i + 4);
    if (dstAddr === 0x00C00000) {
      cramLoopWrites.push({ romAddr: i, opcode: w, srcAddr });
    }
  }
}
console.log(`  循环写入 0xC00000 指令总数: ${cramLoopWrites.length}`);
for (const w of cramLoopWrites.slice(0, 30)) {
  if (w.opcode === 0x33F9) {
    console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W (0x${w.srcAddr.toString(16).padStart(6, '0')}).L, (0xC00000).L`);
  } else if (w.opcode === 0x33F8) {
    console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W (0x${w.srcAddr.toString(16).padStart(4, '0')}).W, (0xC00000).L`);
  } else {
    console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W (A${w.srcReg})+, (0xC00000).L`);
  }
}

// ============================================================
// 4. 在 0xC7EC 附近反汇编 (开场 VDP setup)
// ============================================================
console.log('\n--- 4. 0xC7EC 附近代码 (开场 VDP setup) ---');
// 显示 0xC7EC 到 0xC900 之间的字节
console.log('  0xC7EC-0xC900 字节:');
let hex = '';
let ascii = '';
for (let i = 0xC7EC; i < 0xC900; i++) {
  if ((i - 0xC7EC) % 16 === 0) {
    if (hex) console.log(`  0x${(i - 16).toString(16).padStart(6, '0')}: ${hex}  ${ascii}`);
    hex = '';
    ascii = '';
  }
  const b = rom[i] & 0xff;
  hex += b.toString(16).padStart(2, '0') + ' ';
  ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
}
if (hex) console.log(`  0x${(0xC900 - 16).toString(16).padStart(6, '0')}: ${hex}  ${ascii}`);

// ============================================================
// 5. 搜索 0xC000 写入 (CRAM 命令高 word)
// 0x31FC 0xC000 0x00C0 0x0004 = MOVE.W #0xC000, (0xC00004).L
// 这是 CRAM 写入命令的高 word (CD=11)
// ============================================================
console.log('\n--- 5. 搜索 MOVE.W #0xC000, (0xC00004).L (CRAM 命令高 word) ---');
const cramCmdWrites = [];
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x31FC && rw(i + 2) === 0xC000 && rl(i + 4) === 0x00C00004) {
    cramCmdWrites.push(i);
  }
}
console.log(`  CRAM 命令写入总数: ${cramCmdWrites.length}`);
for (const addr of cramCmdWrites.slice(0, 20)) {
  // 这些位置之前应该有 MOVE.W #cramAddr, (0xC00004).L (低 word 写入)
  // 检查前 6 字节
  let prev = '';
  if (addr >= 6) {
    const prevOpcode = rw(addr - 6);
    const prevImm = rw(addr - 4);
    const prevAddr = rl(addr - 2);
    if (prevOpcode === 0x31FC && prevAddr === 0x00C00004) {
      prev = ` | 前: MOVE.W #0x${prevImm.toString(16).padStart(4, '0')}, (0xC00004).L [CRAM addr=0x${prevImm.toString(16)}]`;
    }
  }
  console.log(`  0x${addr.toString(16).padStart(6, '0')}: MOVE.W #0xC000, (0xC00004).L${prev}`);
}

// ============================================================
// 6. 重点关注 0xC7EC 附近, 看下完整的 CRAM 写入序列
// ============================================================
console.log('\n--- 6. 0xC7EC 周围 0x100 字节反汇编 ---');
// 搜索 0xC600-0xCA00 范围内的 CRAM 写入
console.log('  在 0xC600-0xCA00 范围搜索:');
for (let i = 0xC600; i < 0xCA00; i++) {
  // MOVE.W #imm, (0xC00004).L
  if (rw(i) === 0x31FC && rl(i + 4) === 0x00C00004) {
    const imm = rw(i + 2);
    console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0xC00004).L`);
  }
  // MOVE.W #imm, (0xC00000).L
  if (rw(i) === 0x31FC && rl(i + 4) === 0x00C00000) {
    const imm = rw(i + 2);
    console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0xC00000).L`);
  }
  // MOVE.L #imm, (0xC00004).L
  if (rw(i) === 0x33FC && rl(i + 6) === 0x00C00004) {
    const imm = rl(i + 2);
    console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0xC00004).L`);
  }
  // LEA (xxx).L, An
  if (rw(i) === 0x41F9 || rw(i) === 0x41F8) {
    const reg = rw(i) & 0x07;
    const mode = (rw(i) >> 6) & 0x07;
    if (mode === 7) {
      const srcAddr = rw(i) === 0x41F9 ? rl(i + 2) : rw(i + 2);
      console.log(`  0x${i.toString(16).padStart(6, '0')}: LEA (0x${srcAddr.toString(16).padStart(6, '0')}).L, A${reg}`);
    }
  }
}

console.log('\n=== 完成 ===');
