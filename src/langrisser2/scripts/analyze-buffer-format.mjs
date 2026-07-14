
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-ram-in-title-page.ram');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');

const ram = fs.readFileSync(RAM_PATH);
const vram = fs.readFileSync(VRAM_PATH);
const rom = fs.readFileSync(ROM_PATH);

// 找 0xFF1000 区域有多少有效数据
const BUF_START = 0x1000; // RAM内偏移 = 0xFF1000 & 0xFFFF
let bufEnd = BUF_START;
for (let i = ram.length - 1; i >= BUF_START; i--) {
  if (ram[i] !== 0) {
    bufEnd = i + 1;
    break;
  }
}
const bufSize = bufEnd - BUF_START;
console.log(`解压缓冲区 (0xFF1000) 有效数据: ${bufSize} bytes`);
console.log(`Tile数: ${Math.floor(bufSize / 32)}\n`);

// 看看这些数据的 nibble 分布
const nibbleCounts = new Array(16).fill(0);
for (let i = BUF_START; i < bufEnd; i++) {
  nibbleCounts[(ram[i] >> 4) & 0xF]++;
  nibbleCounts[ram[i] & 0xF]++;
}
console.log('Nibble 值分布:');
for (let i = 0; i < 16; i++) {
  if (nibbleCounts[i] > 0) {
    console.log(`  ${i}: ${nibbleCounts[i]}`);
  }
}

// 尝试把 chunky 像素数据转换成 tile 格式
// 假设: 解压后是 chunky 格式 (每字节2个4bpp像素, 从左到右从上到下)
// 需要转换成 Genesis tile 格式 (4个位平面, 每平面8字节)

console.log('\n=== 测试 Chunky → Tile 转换 ===');

// 取 RAM 缓冲区中 0x20 处的 32 字节数据，假设是第一个非空tile的chunky数据
const chunkyTile = ram.slice(BUF_START + 0x20, BUF_START + 0x20 + 32);
console.log('RAM 缓冲区 tile 0 (chunky, 32 bytes = 64 pixels = 8x8):');
for (let y = 0; y < 8; y++) {
  let row = '';
  for (let x = 0; x < 8; x += 2) {
    const byte = chunkyTile[y * 4 + Math.floor(x / 2)];
    row += ((byte >> 4) & 0xF).toString(16) + (byte & 0xF).toString(16) + ' ';
  }
  console.log(`  row ${y}: ${row}`);
}

// 转换成 tile 格式 (4位平面)
function chunkyToTile(chunky, tileOffset) {
  const tile = new Uint8Array(32);
  for (let y = 0; y < 8; y++) {
    let p0 = 0, p1 = 0, p2 = 0, p3 = 0;
    for (let x = 0; x < 8; x++) {
      const pixelOffset = tileOffset * 64 + y * 8 + x;
      const byteIdx = Math.floor(pixelOffset / 2);
      const byte = chunky[byteIdx];
      const pixel = (pixelOffset % 2 === 0) ? ((byte >> 4) & 0xF) : (byte & 0xF);
      
      const bit = 7 - x; // MSB first
      if (pixel & 1) p0 |= (1 << bit);
      if (pixel & 2) p1 |= (1 << bit);
      if (pixel & 4) p2 |= (1 << bit);
      if (pixel & 8) p3 |= (1 << bit);
    }
    tile[y * 4] = p0;
    tile[y * 4 + 1] = p1;
    tile[y * 4 + 2] = p2;
    tile[y * 4 + 3] = p3;
  }
  return tile;
}

// 测试转换
const testTile = chunkyToTile(ram.slice(BUF_START, bufEnd), 1); // 第1个tile (跳过空的?)
console.log('\n转换后的 tile 格式:');
for (let y = 0; y < 8; y++) {
  let row = '';
  for (let p = 0; p < 4; p++) {
    row += testTile[y * 4 + p].toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  row ${y}: ${row}`);
}

// 与 VRAM 中的 tile 对比
console.log('\nVRAM tile 0x010 (offset 0x200):');
for (let y = 0; y < 8; y++) {
  let row = '';
  for (let p = 0; p < 4; p++) {
    row += vram[0x200 + y * 4 + p].toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  row ${y}: ${row}`);
}

// ============ 等等 ============
// DMA 大小 = 解压大小 / 2
// 如果解压后是 1568 字节 = 784 word
// 那么 DMA 传输 784 字节? 不对，lsr.w #1 是 word 右移 = 字节数 / 2

// 让我重新理解: 也许 Type 3 解压出来的是 16-bit 格式的数据 (word)
// 总大小 D0 (word 数?) 然后 DMA 传输字节数 = D0 >> 1 = word 数

// 或者: D0 是解压后的字节数, DMA 传输 D0/2 个 word
// 不对，DMA 的大小单位... VDP DMA 大小寄存器是 word 数

// 让我看看 0xFFF9 命令 + 大小的含义
console.log('\n=== 检查 DMA 命令格式 ===');
console.log('0xFFF9 = VRAM 写命令 (DMA)');

// 现在让我们换个思路:
// 直接从 ROM 中的 Type 2 资源找，因为 Type 2 是位平面压缩，应该直接产出 tile 格式
// 让我们检查 Type 2 资源解压后的数据

console.log('\n=== 检查 Type 2 资源 ===');

// 从 ROM 读 Type 2 资源
const RESOURCE_TABLE_BASE = 0x000b0000;

function readROMByte(o) { return rom[o] & 0xff; }
function readROMWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readROMLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// 读取所有 Type 2 资源指针
const type2Resources = [];
for (let i = 0; i < 256; i++) {
  const ptr = readROMLong(RESOURCE_TABLE_BASE + i * 4);
  if (ptr !== 0 && ptr < rom.length) {
    const type = readROMByte(ptr);
    if (type === 2) {
      type2Resources.push({ index: i, address: ptr });
    }
  }
}
console.log(`Type 2 资源数: ${type2Resources.length}`);

// 选一个 planes=4 的来测试 (应该是完整4bpp tile)
const planes4 = type2Resources.filter(r => {
  const b1 = readROMByte(r.address + 1);
  return (b1 & 0x7f) === 4;
});
console.log(`planes=4 的 Type 2 资源: ${planes4.length} 个`);
for (const r of planes4) {
  const b1 = readROMByte(r.address + 1);
  console.log(`  Entry ${r.index}: ROM 0x${r.address.toString(16)}, b1=0x${b1.toString(16)} (compressed=${(b1&0x80)!==0}, planes=${b1&0x7f})`);
}

// 选一个 planes=1 的 Type 2，看看解压后什么样
const planes1 = type2Resources.filter(r => (readROMByte(r.address + 1) & 0x7f) === 1);
console.log(`\nplanes=1 的 Type 2 资源: ${planes1.length} 个`);
console.log('前 5 个:');
for (let i = 0; i < Math.min(5, planes1.length); i++) {
  const r = planes1[i];
  const b1 = readROMByte(r.address + 1);
  const compressed = (b1 & 0x80) !== 0;
  // 读取 size
  const size = compressed ? readROMWord(r.address + 10) : readROMWord(r.address + 2);
  const outSize = size * 1 * 8; // planes * 8
  console.log(`  Entry ${r.index}: addr=0x${r.address.toString(16)}, compressed=${compressed}, size=${size}, outSize=${outSize}B (${Math.floor(outSize/32)} tiles)`);
}
