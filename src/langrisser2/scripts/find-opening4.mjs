/**
 * 分析开场动画的核心逻辑:
 * 1. 反汇编 0x1A438 (scene param=6 的处理器, 开场动画核心)
 * 2. 提取场景 1 的所有资源
 * 3. 查找动画帧序列控制
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

function decompressLZSS(resourceAddr) {
  const decompressedSize = rw(resourceAddr + 1);
  const compressedDataStart = resourceAddr + 3;
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  while (remaining > 0) {
    const flagByte = rb(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = rb(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = rb(compressedPos++);
        const b2 = rb(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return output;
}

// 简化反汇编器
function disasm(addr, length) {
  let pc = addr;
  while (pc < addr + length) {
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    
    if (w === 0x4E75) { line += 'RTS'; }
    else if (w === 0x4EF9) { line += `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { line += `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x6100) { line += `BSR.W 0x${(pc+4+(rw(pc+2)>32767?rw(pc+2)-65536:rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6100 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { 
      const off = w & 0xFF; line += `BSR.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if (w === 0x6600) { const o=rw(pc+2); line += `BNE.W 0x${(pc+4+(o>32767?o-65536:o)).toString(16)}`; size = 4; }
    else if (w === 0x6700) { const o=rw(pc+2); line += `BEQ.W 0x${(pc+4+(o>32767?o-65536:o)).toString(16)}`; size = 4; }
    else if (w === 0x6000) { const o=rw(pc+2); line += `BRA.W 0x${(pc+4+(o>32767?o-65536:o)).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000 && (w & 0xFF) !== 0) { 
      const off = w & 0xFF; line += `BRA.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x6700 && (w & 0xFF) !== 0) { 
      const off = w & 0xFF; line += `BEQ.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x6600 && (w & 0xFF) !== 0) { 
      const off = w & 0xFF; line += `BNE.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if ((w & 0xF1F0) === 0x0C40) { const r=(w>>9)&7; line += `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { const r=(w>>9)&7; line += `CMPI.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF100) === 0x7000) { const r=(w>>9)&7; line += `MOVEQ #0x${(w&0xFF).toString(16)}, D${r}`; }
    else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; line += `MOVE.W 0x${rl(pc+2).toString(16)}, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3038) { const r=(w>>9)&7; line += `MOVE.W 0x${rw(pc+2).toString(16).padStart(4,'0')}, D${r}`; size = 4; }
    else if (w === 0x31FC) { line += `MOVE.W #0x${rw(pc+2).toString(16)}, 0x${rl(pc+4).toString(16)}`; size = 8; }
    else if (w === 0x21FC) { line += `MOVE.L #0x${rl(pc+2).toString(16)}, 0x${rl(pc+6).toString(16)}`; size = 10; }
    else if (w === 0x33FC) { line += `MOVE.W #0x${rw(pc+2).toString(16)}, 0x${rl(pc+4).toString(16)}`; size = 8; }
    else if (w === 0x11FC) { line += `MOVE.B #0x${rw(pc+2).toString(16)}, 0x${rl(pc+4).toString(16)}`; size = 8; }
    else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; line += `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
    else if (w === 0x4A79) { line += `TST.W 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4279) { line += `CLR.W 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4239) { line += `CLR.B 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x48E7) { line += `MOVEM.L -(A7) 0x${rw(pc+2).toString(16)}`; size = 4; }
    else if (w === 0x4CDF) { line += `MOVEM.L (A7)+ 0x${rw(pc+2).toString(16)}`; size = 4; }
    else if (w === 0x51C8) { const r=w&7; const o=rw(pc+2); line += `DBRA D${r}, 0x${(pc+4+(o>32767?o-65536:o)).toString(16)}`; size = 4; }
    else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; line += `ADD.W D${s&7}, D${r}`; }
    else if (w === 0x5340) { line += `SUBQ.W #1, D0`; }
    else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; line += `SUBQ.W #1, D${r}`; }
    else if (w === 0x4EBA) { const o=rw(pc+2); line += `JSR (PC,d16) → 0x${(pc+4+(o>32767?o-65536:o)).toString(16)}`; size = 4; }
    else if (w === 0x4EB8) { line += `JSR 0x${rw(pc+2).toString(16)}`; size = 4; }
    else if (w === 0x4EF8) { line += `JMP 0x${rw(pc+2).toString(16)}`; size = 4; }
    else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; line += `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F0) === 0x323C) { const r=(w>>9)&7; line += `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if (w === 0x0839) { const bit=rw(pc+2); const dst=rl(pc+4); line += `BTST #${bit}, 0x${dst.toString(16)}`; size = 8; }
    else if ((w & 0xF1FF) === 0x2270) { line += `MOVEA.L (A1, D0.W), A1`; }
    else if ((w & 0xF1FF) === 0x2070) { line += `MOVEA.L (A0, D0.W), A0`; }
    else { line += `.word 0x${w.toString(16)}`; }
    
    console.log(`  ${line}`);
    pc += size;
  }
}

console.log('=== 1. 0x1A438 (scene param=6 处理器) ===');
disasm(0x1A438, 256);

console.log('\n=== 2. 0x19174 跳转表完整分析 ===');
// 跳转表起始
console.log('0x19174 跳转表:');
for (let i = 0; i < 16; i++) {
  const addr = 0x19174 + i * 4;
  const w = rw(addr);
  if (w === 0x60 || w === 0x4EFB || w === 0x60FA) {
    // BRA.W
    const offset = rw(addr + 2);
    const target = addr + 4 + (offset > 32767 ? offset - 65536 : offset);
    console.log(`  [${i}] 0x${addr.toString(16)}: BRA.W 0x${target.toString(16)}`);
  } else {
    console.log(`  [${i}] 0x${addr.toString(16)}: .word 0x${w.toString(16)} (非跳转)`);
    break;
  }
}

console.log('\n=== 3. 0x19022 跳转表完整分析 ===');
console.log('0x19022 跳转表:');
// 第一个条目可能是偏移量
const firstWord = rw(0x19022);
console.log(`  首字: 0x${firstWord.toString(16)} (= ${firstWord})`);
for (let i = 0; i < 16; i++) {
  const addr = 0x19024 + i * 4;
  const w = rw(addr);
  if (w === 0x6000) {
    const offset = rw(addr + 2);
    const target = addr + 4 + (offset > 32767 ? offset - 65536 : offset);
    console.log(`  [${i}] 0x${addr.toString(16)}: BRA.W 0x${target.toString(16)}`);
  } else {
    console.log(`  [${i}] 0x${addr.toString(16)}: .word 0x${w.toString(16)} (结束)`);
    break;
  }
}

console.log('\n=== 4. 场景 1 资源详细分析 ===');
// 场景 1: resIds=0x647a8, layout=0x64b8c, data=0x65a58
const scene1ResIds = 0x647A8;
const scene1Layout = 0x64B8C;
const scene1Data = 0x65A58;

console.log(`场景 1 资源ID表 (0x${scene1ResIds.toString(16)}):`);
for (let i = 0; i < 16; i++) {
  const id = rw(scene1ResIds + i * 2);
  if (id === 0x7F7F || id === 0xFFFF || id === 0) break;
  console.log(`  res[${i}]: 0x${id.toString(16)} (DMA=${!!(id & 0x8000)}, idx=${id & 0x7FFF})`);
}

console.log(`\n场景 1 布局数据 (0x${scene1Layout.toString(16)}, 前 128B):`);
for (let i = 0; i < 128; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(scene1Layout + i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${(scene1Layout + i).toString(16)}: ${hex} ${ascii}`);
}

console.log(`\n场景 1 数据指针 (0x${scene1Data.toString(16)}, 前 128B):`);
for (let i = 0; i < 128; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(scene1Data + i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${(scene1Data + i).toString(16)}: ${hex} ${ascii}`);
}

console.log('\n=== 5. 提取场景 1 的所有 tile 资源 ===');
// 场景 1 使用的资源: 0x8003, 0x8007, 0x8003, 0x800f
// 加上 0xCA68 加载的 0x8001
const resourceIds = [0x8001, 0x8003, 0x8007, 0x800F];
for (const id of resourceIds) {
  const idx = id & 0x7FFF;
  const ptr = rl(0x0B0000 + idx * 4);
  const flag = rb(ptr);
  if (flag === 3) {
    const data = decompressLZSS(ptr);
    console.log(`资源 0x${id.toString(16)} (Entry ${idx}): ${data.length}B (${data.length / 32} tiles) from 0x${ptr.toString(16)}`);
    
    // 渲染前 4 个 tile
    console.log(`  Tile 0-3 ASCII art:`);
    for (let t = 0; t < 4; t++) {
      let row = `  T${t}: `;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const rowBase = t * 32 + y * 4;
          const p0 = data[rowBase];
          const p1 = data[rowBase + 1];
          const p2 = data[rowBase + 2];
          const p3 = data[rowBase + 3];
          const bit = 7 - x;
          const pixel =
            ((p0 >> bit) & 1) |
            ((p1 >> bit) & 1) << 1 |
            ((p2 >> bit) & 1) << 2 |
            ((p3 >> bit) & 1) << 3;
          row += pixel ? pixel.toString(16).toUpperCase() : '.';
        }
        if (y < 7) row += '|';
      }
      console.log(row);
    }
  }
}

console.log('\n=== 6. 分析 0x11D7A (场景切换/推进) ===');
disasm(0x11D7A, 96);

console.log('\n=== 7. 分析 0xC7AE (VDP 设置) ===');
disasm(0xC7AE, 64);

console.log('\n=== 8. 搜索开场动画帧计数器 ===');
// 开场动画可能使用帧计数器来控制帧序列
// 搜索对帧计数器 0xFFFF815C 的读取后跟比较
console.log('搜索帧计数器比较 (0xFFFF815C):');
for (let i = 0; i < rom.length - 10; i++) {
  if (rw(i) === 0x3039 && rl(i + 2) === 0xFFFF815C) {
    const reg = (rw(i) >> 9) & 7;
    // 查找后面的 CMPI
    for (let j = i + 6; j < i + 16; j += 2) {
      const w2 = rw(j);
      if ((w2 & 0xF1F0) === 0x0C40 && ((w2 >> 9) & 7) === reg) {
        const cmpVal = rw(j + 2);
        console.log(`  ROM 0x${i.toString(16)}: MOVE.W frameCounter, D${reg} → CMPI.W #0x${cmpVal.toString(16)}`);
        break;
      }
    }
  }
}

console.log('\n=== 9. 分析 0xFB82 (0xCA8A 调用的函数) ===');
disasm(0xFB82, 64);

console.log('\n=== 10. 分析 0xF67E (0xC9FA 附近引用) ===');
disasm(0xF67E, 64);
