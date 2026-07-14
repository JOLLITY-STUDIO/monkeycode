/**
 * 找出正确的 CRAM → 调色板映射
 * 
 * 截图背景: rgb(0,0,72)
 * CRAM[4] → rgb(0,0,72) ✓
 * 
 * 但当前代码: pal2[0] = CRAM[32] → rgb(0,0,0) ✗
 * 
 * 问题: Gens 的 CRAM dump 格式可能不是简单的 64×2 字节
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));
console.log('CRAM size:', cram.length, 'bytes');

// ============================================================
// Gens CRAM dump 格式分析
// Gens 的 CRAM dump 可能是按 128 字节存储的 (64色 × 2字节)
// 但实际硬件中 CRAM 只有 128 字节
// ============================================================
console.log('\n=== CRAM 布局测试 ===');

// 方式1: 标准 64×2 字节, LE
function decodeLE(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}

// 方式2: 标准 64×2 字节, BE
function decodeBE(i) {
  return (cram[i * 2] << 8) | cram[i * 2 + 1];
}

// 方式3: Gens 可能按 word 存储, 但字节序特殊
// Gens dump 每个颜色是 2字节, 但可能是 [bit8-1, bit0] 格式
// 即: cram[i*2] = bit8-1, cram[i*2+1] = bit0
function decodeGens1(i) {
  const lo = cram[i * 2];      // bit8-1
  const hi = cram[i * 2 + 1];  // bit0
  return ((lo & 0xFF) << 1) | (hi & 1);
}

// 方式4: 交换高低字节的 gens 格式
function decodeGens2(i) {
  const lo = cram[i * 2 + 1];  // bit8-1
  const hi = cram[i * 2];      // bit0
  return ((lo & 0xFF) << 1) | (hi & 1);
}

// 方式5: 每个颜色只存低字节 (bit7-0), 高字节是填充
function decodeLoByte(i) {
  return cram[i * 2];
}

// ============================================================
// 测试所有方式能否产生 rgb(0,0,72)
// ============================================================
console.log('\n=== 测试所有解码方式 ===');

function testDecoders(name, decoder) {
  console.log(`\n${name}:`);
  for (let i = 0; i < 64; i++) {
    const word = decoder(i);
    // BGR ×36
    const r = ((word >> 0) & 7) * 36;
    const g = ((word >> 3) & 7) * 36;
    const b = ((word >> 6) & 7) * 36;
    
    if (b === 72 && r === 0 && g === 0) {
      console.log(`  CRAM[${i}] word=0x${word.toString(16).padStart(4,'0')} → rgb(${r},${g},${b}) 匹配背景色!`);
    }
    if (r === 216 && g === 0 && b === 0) {
      console.log(`  CRAM[${i}] word=0x${word.toString(16).padStart(4,'0')} → rgb(${r},${g},${b}) 红色!`);
    }
  }
}

testDecoders('LE (标准)', decodeLE);
testDecoders('BE', decodeBE);
testDecoders('Gens1 (低字节=bit8-1, 高字节=bit0)', decodeGens1);
testDecoders('Gens2 (高字节=bit8-1, 低字节=bit0)', decodeGens2);
testDecoders('LoByte (只用低字节)', decodeLoByte);

// ============================================================
// 深入分析: CRAM[4] = rgb(0,0,72)
// 如果 CRAM[4] 是背景色, 那它在调色板中的位置是什么?
// ============================================================
console.log('\n=== CRAM[4] 分析 ===');
console.log(`CRAM[4] 字节: [${cram[8]}, ${cram[9]}] = [0x${cram[8].toString(16).padStart(2,'0')}, 0x${cram[9].toString(16).padStart(2,'0')}]`);
console.log(`LE word: 0x${decodeLE(4).toString(16).padStart(4,'0')}`);
console.log(`BE word: 0x${decodeBE(4).toString(16).padStart(4,'0')}`);

// ============================================================
// 重新思考: Gens 的 CRAM dump 格式
// 
// Genesis CRAM 硬件: 128字节 = 64色 × 2字节
// 每个颜色: 9位 BGR
//   bit8-6 = Blue (3位)
//   bit5-3 = Green (3位)  
//   bit2-0 = Red (3位)
// 
// Gens 内部存储: 可能是 16位 = { 7位填充 | B[2:0] | G[2:0] | R[2:0] }
// ============================================================
console.log('\n=== Gens 内部格式假设 ===');

// 假设 Gens 存储格式:
// cram[i*2] = { B2 B1 B0 G2 G1 G0 R2 R1 } (9位中的8位)
// cram[i*2+1] = { R0 (1位) } + 7位填充

function decodeGens9bit(i) {
  const lo = cram[i * 2];   // bit7-0: B2 B1 B0 G2 G1 G0 R2 R1
  const hi = cram[i * 2 + 1]; // bit0: R0
  
  const r = ((lo & 3) << 1) | (hi & 1);  // R2 R1 R0
  const g = (lo >> 2) & 7;               // G2 G1 G0
  const b = (lo >> 5) & 7;               // B2 B1 B0
  
  return { r, g, b };
}

console.log('Gens 9-bit 格式解码:');
for (let i = 0; i < 64; i++) {
  const { r, g, b } = decodeGens9bit(i);
  const rr = r * 36;
  const gg = g * 36;
  const bb = b * 36;
  
  if (bb === 72 && rr === 0 && gg === 0) {
    console.log(`  CRAM[${i}] → rgb(${rr},${gg},${bb}) 匹配背景色!`);
  }
}

// ============================================================
// 另一种可能: CRAM 按调色板分组存储
// 调色板0: CRAM[0-15]
// 调色板1: CRAM[16-31]
// 调色板2: CRAM[32-47]
// 调色板3: CRAM[48-63]
// ============================================================
console.log('\n=== 按调色板分组 ===');
for (let pal = 0; pal < 4; pal++) {
  console.log(`\n调色板 ${pal} (CRAM ${pal*16}-${(pal+1)*16-1}):`);
  for (let c = 0; c < 16; c++) {
    const i = pal * 16 + c;
    const w = decodeLE(i);
    const r = ((w >> 0) & 7) * 36;
    const g = ((w >> 3) & 7) * 36;
    const b = ((w >> 6) & 7) * 36;
    console.log(`  [${c}] word=0x${w.toString(16).padStart(4,'0')} → rgb(${r},${g},${b})`);
  }
}

// ============================================================
// 检查: CRAM 可能是 512 字节 (4倍)
// ============================================================
console.log('\n=== 检查 CRAM 512字节是否是 4个副本 ===');
const isCopy = [];
for (let i = 0; i < 4; i++) {
  let same = true;
  for (let j = 0; j < 128; j++) {
    if (cram[i * 128 + j] !== cram[j]) {
      same = false;
      break;
    }
  }
  isCopy.push(same);
}
console.log('4个128字节块是否相同:', isCopy.join(', '));

// ============================================================
// 检查: 是否每256字节是一个副本
// ============================================================
console.log('\n=== 检查 CRAM 是否 256字节重复 ===');
let same256 = true;
for (let j = 0; j < 256; j++) {
  if (cram[j] !== cram[j + 256]) {
    same256 = false;
    break;
  }
}
console.log('前256字节和后256字节是否相同:', same256);
