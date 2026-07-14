/**
 * 修正版: 搜索 ROM 中所有 CRAM 加载代码
 *
 * 68K MOVE 指令编码 (立即数到绝对地址):
 * - 0x23FC <imm32> <addr32> = MOVE.L #imm32, (xxx).L
 * - 0x33FC <imm16> <addr32> = MOVE.W #imm16, (xxx).L
 * - 0x13FC <imm8>  <addr32> = MOVE.B #imm8,  (xxx).L
 *
 * VDP CRAM 写入命令格式 (32位, 分两次 word 写入):
 * - bit31-30 = 11 (CD=3, CRAM 写)
 * - bit29-21 = 0
 * - bit20-16 = 0
 * - bit15-1  = CRAM 地址 (0-63, 6位)
 * - bit0     = DMA flag
 * 完整命令 = 0xC0000000 | (cramAddr << 1) | dmaFlag
 *
 * 常见加载方式:
 * 1. MOVE.L #0xC0000000, (0xC00004).L — 设置 CRAM 地址 0
 * 2. MOVE.W (A0)+, (0xC00000).L      — 循环写入颜色
 *
 * 或者用 MOVE.W 两次 (不推荐):
 * - MOVE.W #cramAddr, (0xC00004).L — 第一次 word 写 (低16位)
 * - MOVE.W #0xC000, (0xC00004).L   — 第二次 word 写 (高 word)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

console.log('=== 搜索 CRAM 加载代码 (修正版) ===\n');

// ============================================================
// 1. 搜索 MOVE.L #0xC000xxxx, (0xC00004).L — CRAM 地址设置
// ============================================================
console.log('--- 1. MOVE.L #0xC000xxxx, (0xC00004).L (CRAM 地址设置) ---');
const cramAddrSet = [];
for (let i = 0; i < rom.length - 10; i++) {
  if (rw(i) === 0x23FC) { // MOVE.L #imm, (xxx).L
    const imm = rl(i + 2);
    const addr = rl(i + 6);
    if (addr === 0x00C00004 && (imm & 0xC0000000) === 0xC0000000) {
      const cd = (imm >>> 30) & 0x03;
      const cramAddr = (imm >> 1) & 0x7F;
      if (cd === 3) { // CRAM 写
        cramAddrSet.push({ romAddr: i, cramAddr, imm, dmaFlag: imm & 1 });
      }
    }
  }
}
console.log(`  CRAM 地址设置指令数: ${cramAddrSet.length}`);
for (const w of cramAddrSet.slice(0, 30)) {
  console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.L #0x${w.imm.toString(16).padStart(8, '0')}, (0xC00004).L [CRAM addr=0x${w.cramAddr.toString(16)}, DMA=${w.dmaFlag}]`);
}

// ============================================================
// 2. 搜索 MOVE.W (An)+, (0xC00000).L — 颜色写入循环
// 68K: 0x33C0 | (src_mode << 3) | src_reg, 后跟 4字节地址
// 实际 MOVE.W (An)+, (xxx).L 的编码:
//   bit15-12 = 0011 (MOVE.W)
//   bit11-9 = 001 (dest reg=1, for abs.L)
//   bit8-6 = 111 (dest mode = abs.L)
//   bit5-3 = 011 (src mode = postinc)
//   bit2-0 = reg (0-7)
// opcode = 0x33D8 | reg
// ============================================================
console.log('\n--- 2. MOVE.W (An)+, (0xC00000).L (颜色循环写入) ---');
const colorLoops = [];
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  // MOVE.W (An)+, (xxx).L
  if ((w & 0xFFF8) === 0x33D8) {
    const reg = w & 0x0007;
    const addr = rl(i + 2);
    if (addr === 0x00C00000) {
      colorLoops.push({ romAddr: i, srcReg: reg, type: 'postinc' });
    }
  }
  // MOVE.W (An), (xxx).L: opcode = 0x3390 | reg? 实际是 0x30 | mode=010 | reg, then dest
  // MOVE.W (d16,An), (xxx).L: mode=101
  // MOVE.W (xxx).L, (xxx).L: src mode=111, src reg=001
  // 0x33F9: MOVE.W (xxx).L, (xxx).L
  if (w === 0x33F9) {
    const srcAddr = rl(i + 2);
    const dstAddr = rl(i + 6);
    if (dstAddr === 0x00C00000) {
      colorLoops.push({ romAddr: i, srcAddr, type: 'absL' });
    }
  }
  // MOVE.W (xxx).W, (xxx).L: src mode=111, src reg=000
  // 0x33F8
  if (w === 0x33F8) {
    const srcAddr = rw(i + 2);
    const dstAddr = rl(i + 4);
    if (dstAddr === 0x00C00000) {
      colorLoops.push({ romAddr: i, srcAddr, type: 'absW' });
    }
  }
}
console.log(`  颜色写入指令数: ${colorLoops.length}`);
for (const w of colorLoops.slice(0, 30)) {
  if (w.type === 'postinc') {
    console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W (A${w.srcReg})+, (0xC00000).L`);
  } else if (w.type === 'absL') {
    console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W (0x${w.srcAddr.toString(16).padStart(6, '0')}).L, (0xC00000).L`);
  } else {
    console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W (0x${w.srcAddr.toString(16).padStart(4, '0')}).W, (0xC00000).L`);
  }
}

// ============================================================
// 3. 搜索连续的 MOVE.W #imm, (0xC00000).L (单色写入)
// ============================================================
console.log('\n--- 3. MOVE.W #imm, (0xC00000).L (单色写入) ---');
const singleColors = [];
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x33FC) {
    const imm = rw(i + 2);
    const addr = rl(i + 4);
    if (addr === 0x00C00000) {
      singleColors.push({ romAddr: i, color: imm });
    }
  }
}
console.log(`  单色写入指令数: ${singleColors.length}`);
for (const w of singleColors.slice(0, 30)) {
  console.log(`  0x${w.romAddr.toString(16).padStart(6, '0')}: MOVE.W #0x${w.color.toString(16).padStart(4, '0')}, (0xC00000).L`);
}

// ============================================================
// 4. 搜索 CRAM 加载函数模式:
//    LEA palette, A0
//    MOVE.L #0xC0000000, (0xC00004).L  (CRAM addr=0)
//    MOVE.W count, D0
//    loop: MOVE.W (A0)+, (0xC00000).L
//          DBF D0, loop
// ============================================================
console.log('\n--- 4. CRAM 加载函数模式 (LEA + MOVE.L + loop) ---');
for (const addrSet of cramAddrSet) {
  // 在该指令前 20 字节内找 LEA 指令
  for (let off = 1; off <= 20; off++) {
    const leaAddr = addrSet.romAddr - off;
    if (leaAddr < 0) continue;
    const w = rw(leaAddr);
    // LEA (xxx).L, An: 0x41F9 | (reg << 9), 然后 4字节地址
    if (w === 0x41F9 || w === 0x41F8 || w === 0x43F9 || w === 0x43F8) {
      const reg = (w >> 9) & 0x07;
      const srcAddr = (w & 0x01) === 0x01 ? rl(leaAddr + 2) : rw(leaAddr + 2);
      console.log(`  0x${leaAddr.toString(16).padStart(6, '0')}: LEA (0x${srcAddr.toString(16).padStart(6, '0')}).L, A${reg} → 后接 CRAM addr 设置 @ 0x${addrSet.romAddr.toString(16)}`);
      // 显示后续 30 字节
      console.log(`    后续字节:`);
      let hex = '';
      for (let i = 0; i < 30; i++) {
        hex += rom[addrSet.romAddr + i].toString(16).padStart(2, '0') + ' ';
      }
      console.log(`    ${hex}`);
      break;
    }
  }
}

// ============================================================
// 5. 在 0xC7EC 附近搜索 CRAM 加载 (扩大到 0xC000-0xD000)
// ============================================================
console.log('\n--- 5. 0xC000-0xD000 范围所有 VDP 寄存器写入 ---');
for (let i = 0xC000; i < 0xD000; i++) {
  // MOVE.W #imm, (0xC00004).L — 寄存器写 (高字节 bit15=1, bit14=0)
  if (rw(i) === 0x33FC && rl(i + 4) === 0x00C00004) {
    const imm = rw(i + 2);
    if ((imm & 0x8000) && !(imm & 0x4000)) {
      const reg = (imm >> 8) & 0x1F;
      const val = imm & 0xFF;
      console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0xC00004).L [R${reg}=0x${val.toString(16)}]`);
    }
  }
  // MOVE.L #0xC000xxxx, (0xC00004).L — CRAM 写
  if (rw(i) === 0x23FC && rl(i + 6) === 0x00C00004) {
    const imm = rl(i + 2);
    const cd = (imm >>> 30) & 0x03;
    if (cd === 3) {
      const cramAddr = (imm >> 1) & 0x7F;
      console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0xC00004).L [CRAM addr=0x${cramAddr.toString(16)}]`);
    }
  }
  // MOVE.W (An)+, (0xC00000).L
  const w = rw(i);
  if ((w & 0xFFF8) === 0x33D8 && rl(i + 2) === 0x00C00000) {
    console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.W (A${w & 0x07})+, (0xC00000).L`);
  }
}

// ============================================================
// 6. 搜索 ROM 中可能是调色板数据的区域
// 调色板数据特征:
// - 连续的 16 个 word (32 字节) 颜色值
// - 每个颜色 word: bit0-2=R, bit3-5=G, bit6-8=B (3位每通道)
// - 第一个颜色通常是 0 (透明)
// - 颜色值不会超过 0x0FFF (9位)
// ============================================================
console.log('\n--- 6. ROM 中可能的调色板数据 (16色连续 word, 首色=0) ---');
const paletteCandidates = [];
for (let i = 0; i < rom.length - 32; i += 2) {
  // 检查 32 字节 (16 word) 是否都是有效颜色
  let valid = true;
  let zeroCount = 0;
  for (let j = 0; j < 16; j++) {
    const w = rw(i + j * 2);
    if (w > 0x0FFF) { valid = false; break; } // 超过 9 位
    if (w === 0) zeroCount++;
    // 检查 bit9-15 是否为 0 (除了 bit9-15 保留位)
    if ((w & 0xFE00) !== 0) { valid = false; break; }
  }
  if (valid && zeroCount >= 1 && zeroCount <= 8) {
    // 第一个颜色必须是 0 (透明色)
    if (rw(i) === 0) {
      paletteCandidates.push(i);
    }
  }
}
console.log(`  调色板候选数: ${paletteCandidates.length}`);
// 显示前 30 个候选
for (const addr of paletteCandidates.slice(0, 30)) {
  const colors = [];
  for (let j = 0; j < 16; j++) {
    colors.push('0x' + rw(addr + j * 2).toString(16).padStart(3, '0'));
  }
  console.log(`  0x${addr.toString(16).padStart(6, '0')}: ${colors.join(' ')}`);
}

console.log('\n=== 完成 ===');
