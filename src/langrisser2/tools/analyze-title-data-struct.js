/**
 * 分析标题画面数据结构
 * 1. ROM 0x05DF40 - 标题画面参数 (DAT_ffff95a2 指向这里)
 * 2. ROM 0x97404 - 复制到 RAM 0xFFFFA5DE 的 DMA 命令列表
 * 3. 找出所有 DMA 命令, 解析资源加载请求
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return rom[off & 0xFFFFF]; }
function r16(off) { return (r8(off) << 8) | r8(off + 1); }
function r32(off) { return (r8(off) << 24) | (r8(off + 1) << 16) | (r8(off + 2) << 8) | r8(off + 3); }

console.log('=== 1. ROM 0x05DF40 (标题画面参数) ===\n');
console.log('DAT_ffff95a2 被设置为 0x05DF40 (任务 0xC93A 中)');
console.log('这个地址可能指向一个描述标题画面布局的数据结构\n');

// dump 0x05DF40 的前 128 字节
for (let i = 0; i < 128; i += 16) {
  const addr = 0x05DF40 + i;
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = r8(addr + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
  }
  console.log(`  ${addr.toString(16).padStart(6, '0')}: ${hex}  ${ascii}`);
}

console.log('\n=== 2. ROM 0x97404 (DMA 命令列表, 复制到 RAM 0xFFFFA5DE) ===\n');
console.log('FUN_0000c80c 将 0x97404 的数据复制到 RAM 0xFFFFA5DE');
console.log('数据以 0xFFFF 结尾\n');

// DMA 命令格式 (从 execution-trace.md):
// 5 word = 10 字节 per command
// word[0] = 命令码 (0xFFF5-0xFFFF)
// word[1-4] = 参数
const CMD_NAMES = {
  0xFFF5: 'VRAM_FILL',
  0xFFF6: 'DMA_TRANSFER',
  0xFFF8: 'DMA_SIMPLE',
  0xFFF9: 'DMA_STANDARD',
  0xFFFA: 'DMA_VRAM',
  0xFFFB: 'DMA_VSRAM',
  0xFFFC: 'WORD_WRITE',
  0xFFFD: 'VSRAM_WRITE',
  0xFFFE: 'VDP_REG_WRITE',
  0xFFFF: 'VDP_DATA_WRITE / END',
};

let off = 0x97404;
let cmdCount = 0;
while (cmdCount < 50) {
  const cmd = r16(off);
  if (cmd === 0xFFFF) {
    // 可能是结束标记, 也可能是 VDP_DATA_WRITE
    // 检查下一个 word
    const next = r16(off + 2);
    if (next === 0xFFFF || next === 0x0000) {
      console.log(`  [${cmdCount}] 0x${off.toString(16)}: END_MARKER (0xFFFF)`);
      break;
    }
  }
  
  const cmdName = CMD_NAMES[cmd] || `UNKNOWN(0x${cmd.toString(16)})`;
  const w0 = r16(off);
  const w1 = r16(off + 2);
  const w2 = r16(off + 4);
  const w3 = r16(off + 6);
  const w4 = r16(off + 8);
  
  console.log(`  [${cmdCount}] 0x${off.toString(16)}: ${cmdName}`);
  console.log(`        words: 0x${w0.toString(16).padStart(4,'0')} 0x${w1.toString(16).padStart(4,'0')} 0x${w2.toString(16).padStart(4,'0')} 0x${w3.toString(16).padStart(4,'0')} 0x${w4.toString(16).padStart(4,'0')}`);
  
  // 解析具体命令
  if (cmd === 0xFFF9) {
    // DMA_STANDARD: cmd, vdpAddr, srcHigh, srcLow, length
    const vdpAddr = w1;
    const srcAddr = (w2 << 16) | w3;
    const length = w4;
    console.log(`        → DMA: src=0x${srcAddr.toString(16)} → VRAM 0x${vdpAddr.toString(16)}, len=${length} words`);
    
    // 如果源地址在 ROM 范围内, 看看是什么数据
    if (srcAddr < rom.length) {
      const firstByte = r8(srcAddr);
      console.log(`        → 源数据首字节: 0x${firstByte.toString(16)} (${firstByte === 3 ? 'LZSS' : firstByte === 1 ? 'RLE' : 'raw?'})`);
    }
  } else if (cmd === 0xFFFE) {
    // VDP_REG_WRITE: cmd, regValue, ...
    const reg = (w1 >> 8) & 0x1F;
    const val = w1 & 0xFF;
    console.log(`        → VDP Reg R${reg} = 0x${val.toString(16).padStart(2,'0')}`);
  } else if (cmd === 0xFFFF) {
    // VDP_DATA_WRITE: cmd, vdpAddr, data, ...
    console.log(`        → VDP Data write to 0x${w1.toString(16)}: 0x${w2.toString(16).padStart(4,'0')} 0x${w3.toString(16).padStart(4,'0')}`);
  } else if (cmd === 0xFFFC) {
    // WORD_WRITE: cmd, vdpAddr, data
    console.log(`        → Word write to 0x${w1.toString(16)}: 0x${w2.toString(16).padStart(4,'0')}`);
  }
  
  off += 10; // 每条命令 5 word = 10 字节
  cmdCount++;
  
  // 安全检查: 如果读到全零, 停止
  if (w0 === 0 && w1 === 0 && w2 === 0 && w3 === 0 && w4 === 0) {
    console.log('  (全零, 停止)');
    break;
  }
}

// 看看 0x97404 原始数据
console.log('\n=== ROM 0x97404 原始数据 (前 256 字节) ===\n');
for (let i = 0; i < 256; i += 16) {
  const addr = 0x97404 + i;
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += r8(addr + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  ${addr.toString(16).padStart(6, '0')}: ${hex}`);
}

// 看看 0x05DF40 更后面一点的数据
console.log('\n=== ROM 0x05DF40 后续数据 (256-512 字节) ===\n');
for (let i = 256; i < 512; i += 16) {
  const addr = 0x05DF40 + i;
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += r8(addr + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  ${addr.toString(16).padStart(6, '0')}: ${hex}`);
}
