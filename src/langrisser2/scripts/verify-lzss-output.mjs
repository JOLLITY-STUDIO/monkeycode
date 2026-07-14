
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// LZSS 解压 (修正版 - 模拟 SWAP D3 的 word 打包行为)
function decompressLZSS(resourceAddr) {
  const headerAddr = resourceAddr + 1;
  const decompressedSize = readWord(headerAddr);
  const compressedDataStart = resourceAddr + 3;
  
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  
  // SWAP D3 逻辑: D3 是 32-bit, 低字是计数器, 高字暂存上一个字节
  // 每当计数器为偶数时, 输出一个 word (prev_byte:curr_byte)
  // 实际上由于 68K 大端存储, word 输出到内存等同于顺序字节输出
  // 所以我们的 byte-by-byte 输出应该是正确的
  
  while (remaining > 0) {
    const flagByte = readByte(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = readByte(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = readByte(compressedPos++);
        const b2 = readByte(compressedPos++);
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
  return { data: output, size: decompressedSize };
}

// 解压 Entry 3
const ptr3 = readLong(0x0B0000 + 3 * 4);
const res3 = decompressLZSS(ptr3);

// 解压 Entry 8
const ptr8 = readLong(0x0B0000 + 8 * 4);
const res8 = decompressLZSS(ptr8);

console.log('=== Entry 3 → VRAM 0x2000 (tile 256-511) ===');
console.log(`解压大小: ${res3.size}B\n`);

// 直接对比
let directMatch = 0;
for (let i = 0; i < res3.size; i++) {
  if (res3.data[i] === vram[0x2000 + i]) directMatch++;
}
console.log(`直接对比: ${directMatch}/${res3.size} (${(directMatch/res3.size*100).toFixed(1)}%)`);

// Word 字节交换对比 (VRAM 是 byte-swapped)
let swapMatch = 0;
for (let i = 0; i < res3.size; i += 2) {
  if (res3.data[i] === vram[0x2000 + i + 1] && res3.data[i+1] === vram[0x2000 + i]) {
    swapMatch += 2;
  }
}
console.log(`Word交换: ${swapMatch}/${res3.size} (${(swapMatch/res3.size*100).toFixed(1)}%)`);

// 检查是否 Gens VRAM dump 是按 word 字节交换的
// 如果是, 那么 vram[0] 和 vram[1] 是一个 word 的两个字节, 但顺序相反
console.log('\n前 32 字节对比:');
console.log('  res3:  ' + Array.from(res3.data.slice(0, 32)).map(b => b.toString(16).padStart(2,'0')).join(' '));
console.log('  vram:  ' + Array.from(vram.slice(0x2000, 0x2020)).map(b => b.toString(16).padStart(2,'0')).join(' '));
console.log('  swap:  ' + Array.from(vram.slice(0x2000, 0x2020)).map((b,i) => i%2===0 ? vram[0x2000+i+1] : vram[0x2000+i-1]).map(b => b.toString(16).padStart(2,'0')).join(' '));

// 检查 Entry 3 解压数据是否是 0x20 (空格) 填充为主
const res3NibbleCounts = new Array(16).fill(0);
for (let i = 0; i < res3.size; i++) {
  res3NibbleCounts[(res3.data[i] >> 4) & 0xF]++;
  res3NibbleCounts[res3.data[i] & 0xF]++;
}
console.log('\nres3 nibble 分布:');
for (let i = 0; i < 16; i++) {
  if (res3NibbleCounts[i] > 0) console.log(`  ${i.toString(16)}: ${res3NibbleCounts[i]}`);
}

// VRAM 0x2000 的 nibble 分布
const vramNibbleCounts = new Array(16).fill(0);
for (let i = 0; i < res3.size; i++) {
  vramNibbleCounts[(vram[0x2000+i] >> 4) & 0xF]++;
  vramNibbleCounts[vram[0x2000+i] & 0xF]++;
}
console.log('\nVRAM 0x2000 nibble 分布:');
for (let i = 0; i < 16; i++) {
  if (vramNibbleCounts[i] > 0) console.log(`  ${i.toString(16)}: ${vramNibbleCounts[i]}`);
}

// 也检查 VRAM dump 是否整体是 byte-swapped
// 方法: 检查 nametable 区域 (0xC000) 的条目
// nametable 条目是 16-bit, 如果是 byte-swapped, 则读出的 word 顺序会反过来
console.log('\n=== 检查 VRAM nametable 字节序 ===');
// Plane A nametable 在 0xC000
// 第一个非空条目应该是 tile index + palette + priority
// 如果 byte-swap, high/low 字节会对调

// 取 0xC000 处的 word
const nt0_le = (vram[0xC001] << 8) | vram[0xC000]; // 小端
const nt0_be = (vram[0xC000] << 8) | vram[0xC001]; // 大端
console.log(`VRAM 0xC000 word: LE=0x${nt0_le.toString(16)}, BE=0x${nt0_be.toString(16)}`);

// 如果是有效的 nametable 条目:
// LE: priority = bit15, palette = bit14-13, tile = bit10-0
// 之前分析确认是 LE (小端), 所以 VRAM dump 不是 byte-swapped

// 那问题可能是: LZSS 解压的输出格式和 VRAM tile 格式不同
// 让我检查: res3 的数据是否是 planar 格式 (位平面) 而 VRAM 是 interleaved?

// 打印 res3 的第一个非空 tile
let firstNonEmptyTile = -1;
for (let t = 0; t < 256; t++) {
  let isEmpty = true;
  for (let i = 0; i < 32; i++) {
    if (res3.data[t * 32 + i] !== 0) { isEmpty = false; break; }
  }
  if (!isEmpty) { firstNonEmptyTile = t; break; }
}
console.log(`\n第一个非空 tile: ${firstNonEmptyTile}`);
if (firstNonEmptyTile >= 0) {
  console.log(`res3 tile ${firstNonEmptyTile}:`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let p = 0; p < 4; p++) {
      line += res3.data[firstNonEmptyTile*32 + y*4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
  
  // 对应的 VRAM tile
  console.log(`VRAM tile ${256 + firstNonEmptyTile}:`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let p = 0; p < 4; p++) {
      line += vram[0x2000 + firstNonEmptyTile*32 + y*4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
  
  // VRAM byte-swapped
  console.log(`VRAM tile ${256 + firstNonEmptyTile} (byte-swap):`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let p = 0; p < 4; p++) {
      const off = 0x2000 + firstNonEmptyTile*32 + y*4 + p;
      line += vram[off ^ 1].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
}

// 检查 Entry 3 的压缩数据前几个字节
console.log('\n=== Entry 3 压缩数据头部 ===');
console.log(`ROM 0x${ptr3.toString(16)}:`);
console.log(`  类型码: ${readByte(ptr3)}`);
console.log(`  解压大小: ${readWord(ptr3 + 1)}`);
console.log(`  压缩数据起始: 0x${(ptr3 + 3).toString(16)}`);
console.log(`  前 16 字节:`);
let hex = '';
for (let i = 0; i < 16; i++) hex += readByte(ptr3 + 3 + i).toString(16).padStart(2,'0') + ' ';
console.log(`    ${hex}`);

// Entry 0 (0x8001) 也检查一下
console.log('\n=== Entry 0 (0x8001) 压缩数据头部 ===');
const ptr0 = readLong(0x0B0000 + 0 * 4);
console.log(`ROM 0x${ptr0.toString(16)}:`);
console.log(`  类型码: ${readByte(ptr0)}`);
console.log(`  解压大小: ${readWord(ptr0 + 1)}`);
const res0 = decompressLZSS(ptr0);
console.log(`  解压大小(验证): ${res0.size}`);
console.log(`  前 32 字节:`);
hex = '';
for (let i = 0; i < 32; i++) hex += res0.data[i].toString(16).padStart(2,'0') + ' ';
console.log(`    ${hex}`);
console.log(`  VRAM 0x0000 前 32 字节:`);
hex = '';
for (let i = 0; i < 32; i++) hex += vram[i].toString(16).padStart(2,'0') + ' ';
console.log(`    ${hex}`);
hex = '';
for (let i = 0; i < 32; i++) hex += vram[i ^ 1].toString(16).padStart(2,'0') + ' ';
console.log(`    (swap) ${hex}`);
