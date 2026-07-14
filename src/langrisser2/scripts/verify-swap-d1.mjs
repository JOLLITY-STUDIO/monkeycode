/**
 * 验证 FUN_00009FC2 中的 "pea d1" 实际是 "SWAP D1"
 * 并重新分析场景资源加载流程
 *
 * 关键发现: 反汇编器把 0x484x (SWAP Dn) 误认为 PEA
 * 导致场景资源 ID 读取逻辑被误解
 */

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

console.log('=== 1. 验证 0x9FE4 处的机器码 ===');
// pea d1 的机器码应该是 0x4841 (SWAP D1)
// 68K SWAP Dn 编码: 0100 1000 0100 0nnn  (nnn = reg)
// D1: nnn = 001, 所以 0x4841
// D3: nnn = 011, 所以 0x4843 (之前发现的)
const opcode_9FE4 = readWord(0x9FE4);
console.log(`ROM 0x9FE4: 0x${opcode_9FE4.toString(16).padStart(4, '0')}`);
console.log(`  二进制: ${opcode_9FE4.toString(2).padStart(16, '0')}`);
if ((opcode_9FE4 & 0xfff8) === 0x4840) {
  const reg = opcode_9FE4 & 0x7;
  console.log(`  ✓ 这是 SWAP D${reg} (不是 PEA)`);
} else {
  console.log(`  ✗ 不是 SWAP 指令`);
}

console.log('\n=== 2. 重新分析 FUN_00009FC2 资源加载 ===');
console.log('原始反汇编 (错误):');
console.log('  move.l (0,a0,d1.w), d1   ; D1 = longword (2 个资源 ID)');
console.log('  move.w d1, d0            ; D0 = D1.W (低 word = 资源1)');
console.log('  movea.w #$4000, a1       ; A1 = VRAM 0x4000');
console.log('  bsr.w loc_0099B2         ; loadResource(资源1 → 0x4000)');
console.log('  pea d1                   ; ← 实际是 SWAP D1!');
console.log('  move.w d1, d0            ; D0 = D1.W (现在是高 word = 资源2)');
console.log('  movea.w #$2000, a1       ; A1 = VRAM 0x2000');
console.log('  bsr.w loc_0099B2         ; loadResource(资源2 → 0x2000)');

console.log('\n=== 3. 读取场景 1 (title) 的资源 ID ===');
// 场景 1: scenarioIndex = 1, D1 = 1-1 = 0, D1*4 = 0
// 读取 (0x061C34 + 0) 的 4 字节
const sceneOffset = 0x061C34;
const scene1Long = readLong(sceneOffset + 0);
const scene1Low = scene1Long & 0xffff;   // 低 word (第一个资源 ID → 0x4000)
const scene1High = (scene1Long >> 16) & 0xffff; // 高 word (第二个资源 ID → 0x2000, SWAP 后)

console.log(`场景 1 (title) ROM 0x${sceneOffset.toString(16)}:`);
console.log(`  Long: 0x${scene1Long.toString(16).padStart(8, '0')}`);
console.log(`  低 word (→ VRAM 0x4000): 0x${scene1Low.toString(16).padStart(4, '0')}`);
console.log(`  高 word (→ VRAM 0x2000): 0x${scene1High.toString(16).padStart(4, '0')}`);

// 检查 DMA 标志 (0x8000)
const res1Id = scene1Low & 0x7fff;
const res1Dma = (scene1Low & 0x8000) !== 0;
const res2Id = scene1High & 0x7fff;
const res2Dma = (scene1High & 0x8000) !== 0;

console.log(`  资源1 (→0x4000): ID=${res1Id}, DMA=${res1Dma}`);
console.log(`  资源2 (→0x2000): ID=${res2Id}, DMA=${res2Dma}`);

console.log('\n=== 4. 读取资源指针表 ===');
const ptr1 = readLong(0x0B0000 + res1Id * 4);
const ptr2 = readLong(0x0B0000 + res2Id * 4);
console.log(`资源 ${res1Id} (→0x4000): ROM 0x${ptr1.toString(16)}`);
console.log(`  类型码: ${readByte(ptr1)}`);
console.log(`  解压大小: ${readWord(ptr1 + 1)}`);
console.log(`资源 ${res2Id} (→0x2000): ROM 0x${ptr2.toString(16)}`);
console.log(`  类型码: ${readByte(ptr2)}`);
console.log(`  解压大小: ${readWord(ptr2 + 1)}`);

console.log('\n=== 5. 对比场景 1-5 的资源 ID ===');
for (let s = 1; s <= 5; s++) {
  const off = (s - 1) * 4;
  const lw = readLong(sceneOffset + off);
  const lo = lw & 0xffff;
  const hi = (lw >> 16) & 0xffff;
  console.log(`场景 ${s}: low=0x${lo.toString(16)} (ID ${lo & 0x7fff}→0x4000), high=0x${hi.toString(16)} (ID ${hi & 0x7fff}→0x2000)`);
}
