/**
 * 解析标题画面 DMA 队列残留命令
 *
 * 队列已被处理 (DAT_ffff81c4 重置到队首)
 * 但残留数据仍在 RAM 0x81CC 之后
 * 直接扫描残留命令, 找出从 ROM 加载的数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const ram = fs.readFileSync(path.join(root, '20260713', 'Langrisser II (Japan)_68K-gens-ram-dump.ram'));
const rom = fs.readFileSync(path.join(root, '20260713', 'Langrisser II (Japan).md'));

function readU16BE(data, addr) {
  return (data[addr] << 8) | data[addr + 1];
}

function readU32BE(data, addr) {
  return ((data[addr] << 24) | (data[addr + 1] << 16) | (data[addr + 2] << 8) | data[addr + 3]) >>> 0;
}

// 扫描 RAM 0x81CC 到 0x8600 范围, 找所有 DMA 命令
console.log('=== 扫描 DMA 队列残留命令 ===\n');

let offset = 0x81CC;
let cmdCount = 0;
const dmaCommands = []; // 收集所有 DMA 传输命令

while (offset < 0x8600 && cmdCount < 100) {
  const cmd = readU16BE(ram, offset);

  // 检查是否是有效命令码
  if (cmd < 0xFFF5 || cmd > 0xFFFF) {
    offset += 2;
    continue;
  }

  // 找到一条命令, 解析 5 word
  const w1 = readU16BE(ram, offset + 2);
  const srcAddr = readU32BE(ram, offset + 4);
  const length = readU16BE(ram, offset + 8);

  const vdpAddr = w1 & 0x3FFF;
  const vdpType = (w1 >> 14) & 0x03;
  const typeStr = ['VRAM', 'CRAM', 'VSRAM', '?'][vdpType];

  // 判断源地址是否有效
  const isRomSrc = srcAddr < rom.length && srcAddr > 0x200;
  const isRamSrc = srcAddr >= 0xFF0000 && srcAddr <= 0xFFFFFF;
  const srcValid = isRomSrc || isRamSrc;

  // 长度合理性检查
  const lenValid = length > 0 && length < 0x10000;

  let srcDesc = '';
  if (isRomSrc) srcDesc = `ROM@0x${srcAddr.toString(16).toUpperCase()}`;
  else if (isRamSrc) srcDesc = `RAM@0x${srcAddr.toString(16).toUpperCase()}`;
  else srcDesc = `0x${srcAddr.toString(16).toUpperCase()}`;

  console.log(`[${cmdCount}] RAM@0x${offset.toString(16).toUpperCase()}: cmd=0x${cmd.toString(16).toUpperCase()}`);
  console.log(`     目标: ${typeStr}@0x${vdpAddr.toString(16).toUpperCase()}`);

  if (cmd === 0xFFF9 || cmd === 0xFFF6 || cmd === 0xFFFA || cmd === 0xFFFB) {
    console.log(`     源: ${srcDesc}`);
    console.log(`     长度: ${length} word = ${length * 2} 字节`);

    if (isRomSrc && lenValid) {
      console.log(`     源数据前 32 字节:`);
      let hex = '';
      for (let i = 0; i < Math.min(32, length * 2); i++) {
        hex += rom[srcAddr + i].toString(16).padStart(2, '0') + ' ';
      }
      console.log(`     ${hex}`);

      dmaCommands.push({
        cmd, vdpAddr, vdpType, srcAddr, length,
        typeStr, srcType: isRomSrc ? 'ROM' : 'RAM'
      });
    }
  } else if (cmd === 0xFFF8) {
    // FFF8 是内联源, 源数据在命令本身里?
    console.log(`     长度: ${length} word (内联源)`);
    // 实际上 FFF8 的源地址也是 srcAddr, 看反编译
  } else if (cmd === 0xFFFC) {
    console.log(`     值: 0x${readU16BE(ram, offset + 4).toString(16).toUpperCase()}`);
  } else if (cmd === 0xFFFE) {
    console.log(`     VDP REG[${w1 & 0xFF}] = 0x${readU16BE(ram, offset + 4).toString(16).toUpperCase()}`);
  } else if (cmd === 0xFFFF) {
    console.log(`     VDP DATA = 0x${readU16BE(ram, offset + 4).toString(16).toUpperCase()}`);
  }

  offset += 10;
  cmdCount++;
  console.log('');
}

// ============================================================
// 总结: 找到的所有 ROM → VRAM DMA 传输
// ============================================================
console.log('=== ROM → VRAM/CRAM DMA 传输汇总 ===\n');
for (const d of dmaCommands) {
  console.log(`  ${d.srcType}@0x${d.srcAddr.toString(16).toUpperCase()} → ${d.typeStr}@0x${d.vdpAddr.toString(16).toUpperCase()} (${d.length} word = ${d.length * 2} 字节)`);
}
