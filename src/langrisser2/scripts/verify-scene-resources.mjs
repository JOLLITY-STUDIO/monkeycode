
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);
const cram = fs.readFileSync(CRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// LZSS 解压
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

// ============ 验证 Entry 3 → VRAM 0x2000 ============
console.log('=== Entry 3 (→ VRAM 0x2000, tile 256-511) ===');
const ptr3 = readLong(0x0B0000 + 3 * 4);
const res3 = decompressLZSS(ptr3);
console.log(`ROM地址: 0x${ptr3.toString(16)}, 解压大小: ${res3.size}B (${Math.floor(res3.size/32)} tiles)\n`);

// 对比 VRAM 0x2000
const VRAM_0x2000 = 0x2000;
let matchCount3 = 0;
for (let i = 0; i < res3.size; i++) {
  if (res3.data[i] === vram[VRAM_0x2000 + i]) matchCount3++;
}
console.log(`与 VRAM 0x2000 对比: ${matchCount3}/${res3.size} 字节匹配 (${(matchCount3/res3.size*100).toFixed(1)}%)`);

// 打印前几个 tile 对比
console.log('\n前 4 个 tile (Entry 3 解压 vs VRAM 0x2000):');
for (let t = 0; t < 4; t++) {
  console.log(`  Tile ${256 + t}:`);
  for (let y = 0; y < 8; y++) {
    let resLine = '    ';
    let vramLine = '    ';
    for (let p = 0; p < 4; p++) {
      resLine += res3.data[t*32 + y*4 + p].toString(16).padStart(2, '0') + ' ';
      vramLine += vram[VRAM_0x2000 + t*32 + y*4 + p].toString(16).padStart(2, '0') + ' ';
    }
    console.log(`    res: ${resLine}`);
    console.log(`    vram: ${vramLine}`);
  }
}

// ============ 验证 Entry 8 → VRAM 0x4000 ============
console.log('\n\n=== Entry 8 (→ VRAM 0x4000, tile 512-767) ===');
const ptr8 = readLong(0x0B0000 + 8 * 4);
const res8 = decompressLZSS(ptr8);
console.log(`ROM地址: 0x${ptr8.toString(16)}, 解压大小: ${res8.size}B (${Math.floor(res8.size/32)} tiles)\n`);

const VRAM_0x4000 = 0x4000;
let matchCount8 = 0;
for (let i = 0; i < res8.size; i++) {
  if (res8.data[i] === vram[VRAM_0x4000 + i]) matchCount8++;
}
console.log(`与 VRAM 0x4000 对比: ${matchCount8}/${res8.size} 字节匹配 (${(matchCount8/res8.size*100).toFixed(1)}%)`);

// 打印前几个 tile 对比
console.log('\n前 4 个 tile (Entry 8 解压 vs VRAM 0x4000):');
for (let t = 0; t < 4; t++) {
  console.log(`  Tile ${512 + t}:`);
  for (let y = 0; y < 8; y++) {
    let resLine = '    ';
    let vramLine = '    ';
    for (let p = 0; p < 4; p++) {
      resLine += res8.data[t*32 + y*4 + p].toString(16).padStart(2, '0') + ' ';
      vramLine += vram[VRAM_0x4000 + t*32 + y*4 + p].toString(16).padStart(2, '0') + ' ';
    }
    console.log(`    res: ${resLine}`);
    console.log(`    vram: ${vramLine}`);
  }
}

// ============ 如果匹配率低，检查字节序问题 ============
if (matchCount3 / res3.size < 0.5) {
  console.log('\n\n=== 检查 Entry 3 字节序问题 ===');
  
  // 尝试 word 字节交换
  let matchSwap = 0;
  for (let i = 0; i < res3.size; i += 2) {
    if (res3.data[i] === vram[VRAM_0x2000 + i + 1] && 
        res3.data[i+1] === vram[VRAM_0x2000 + i]) {
      matchSwap += 2;
    }
  }
  console.log(`Word 字节交换后匹配: ${matchSwap}/${res3.size} (${(matchSwap/res3.size*100).toFixed(1)}%)`);
  
  // 打印前16字节对比
  console.log('\n前16字节:');
  console.log(`  res:  ${Array.from(res3.data.slice(0, 16)).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
  console.log(`  vram: ${Array.from(vram.slice(VRAM_0x2000, VRAM_0x2000 + 16)).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
  console.log(`  swap: ${Array.from(res3.data.slice(0, 16)).map((b,i) => i%2===0 ? res3.data[i+1] : res3.data[i-1]).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
}

// ============ CRAM 调色板完整搜索 ============
console.log('\n\n=== CRAM 调色板 ROM 来源完整搜索 ===\n');

// 我们找到了第一个调色板 (32 字节) 在 ROM 0xA4582 (大端)
// 现在搜索其他 3 个调色板

const palettes = [];
for (let pal = 0; pal < 4; pal++) {
  const palData = [];
  for (let i = 0; i < 32; i += 2) {
    // 大端: 高字节在前
    palData.push(cram[pal * 32 + i + 1]); // 高字节
    palData.push(cram[pal * 32 + i]);     // 低字节
  }
  palettes.push(palData);
  console.log(`调色板 ${pal} (大端): ${palData.map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
}

// 搜索每个调色板
for (let pal = 0; pal < 4; pal++) {
  console.log(`\n搜索调色板 ${pal} (32 字节, 大端) ...`);
  const pattern = palettes[pal];
  let found = false;
  for (let off = 0; off <= rom.length - 32; off++) {
    let match = true;
    for (let i = 0; i < 32; i++) {
      if (rom[off + i] !== pattern[i]) { match = false; break; }
    }
    if (match) {
      console.log(`  ✓ 找到! ROM 0x${off.toString(16)}`);
      found = true;
    }
  }
  if (!found) {
    // 尝试搜索前 16 字节 (8 个颜色)
    console.log(`  32字节未找到, 尝试前 16 字节 (8 色) ...`);
    for (let off = 0; off <= rom.length - 16; off++) {
      let match = true;
      for (let i = 0; i < 16; i++) {
        if (rom[off + i] !== pattern[i]) { match = false; break; }
      }
      if (match) {
        console.log(`  ✓ 找到 16 字节匹配! ROM 0x${off.toString(16)}`);
        // 打印周围 64 字节
        const around = [];
        for (let i = 0; i < 64; i++) around.push(readByte(off + i));
        console.log(`  ${hexDump(around, off)}`);
        found = true;
        break;
      }
    }
    if (!found) console.log(`  未找到`);
  }
}

// 也检查 0xA4582 周围是否有其他调色板
console.log('\n=== ROM 0xA4582 周围 256 字节 ===');
const around = [];
for (let i = 0; i < 256; i++) around.push(readByte(0xA4582 + i));
console.log(hexDump(around, 0xA4582));

function hexDump(data, startAddr) {
  let result = '';
  for (let row = 0; row < Math.ceil(data.length / 16); row++) {
    const addr = startAddr + row * 16;
    let hex = '';
    let ascii = '';
    for (let col = 0; col < 16; col++) {
      const idx = row * 16 + col;
      if (idx < data.length) {
        const b = data[idx];
        hex += b.toString(16).padStart(2, '0') + ' ';
        ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
      } else {
        hex += '   ';
      }
    }
    result += `  ${addr.toString(16).padStart(6, '0')}: ${hex} ${ascii}\n`;
  }
  return result;
}
