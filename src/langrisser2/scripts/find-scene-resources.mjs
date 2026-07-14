
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const cram = fs.readFileSync(CRAM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// ============ 1. 读取场景资源 ID 表 (ROM 0x061C34) ============
console.log('=== 场景资源 ID 表 (ROM 0x061C34) ===\n');

// FUN_00009FC2 中:
// d1 = (sceneIndex - 1) * 4
// lea ($061C34).l, a0
// move.l (a0, d1.w), d1  → 读取 32-bit 值
// 然后:
//   move.w d1, d0 → d0 = d1 低16位 (第一个资源ID)
//   movea.w #$4000, a1 → VRAM 0x4000
//   bsr loc_0099B2
// 接着:
//   pea d1 → 保存 d1
//   move.w d1, d0 → d0 = d1 低16位??? 不对
//   movea.w #$2000, a1 → VRAM 0x2000
//   bsr loc_0099B2
// 等等，pea d1 是压栈。然后 move.w d1,d0... 但 d1 没有变化?
// 不对，让我重新看汇编

// 实际上代码是:
// move.l  (a0,d1.w), d1   ; d1 = 32-bit 资源描述符
// move.w  d1, d0           ; d0 = 低16位
// movea.w #$4000, a1
// bsr     loc_0099B2       ; 加载到 VRAM 0x4000
// pea     d1               ; 保存 d1
// move.w  d1, d0           ; d0 = ??? d1 没变, 还是同一个值??
// movea.w #$2000, a1
// bsr     loc_0099B2       ; 加载到 VRAM 0x2000
// 不对... 等等, loc_0099B2 会修改 d0! 它返回解压后的大小到 d0

// 让我重新看: 在 loc_0099B2 中, 开头有:
// move.w d0, d2   ; d2 = d0
// ...
// 然后返回时 d0 被修改了吗? 看汇编:
// loc_0099C2:
//   andi.w #$7FFF, d0   ; d0 被修改了!
//   bsr.s loc_009A0E    ; 这个函数返回 A0, 不改 D0
//   bsr.s loc_0099FA    ; 这个函数... 返回什么到 D0?

// loc_0099FA:
//   move.l a0, -(a7)  ; 保存 a0
//   moveq  #0, d0      ; d0 = 0
//   move.b (a0)+, d0   ; d0 = 类型码
//   add.w  d0, d0      ; d0 *= 2
//   ...跳转到对应 handler

// Type 3 handler 返回时 d0 是什么? 
// 看 loc_009EBC: move.w (a7)+, d0 → 从栈恢复 d0 (这是解压前的计数?)
// 实际上解压 handler 返回的是... 让我看 Type 2 的返回

// 算了, 直接看表数据更直接
// 读 32-bit: 可能是两个 16-bit 资源ID拼在一起

console.log('前 10 个场景的资源描述符:');
for (let s = 0; s < 10; s++) {
  const addr = 0x061C34 + s * 4;
  const val = readLong(addr);
  const low = val & 0xFFFF;
  const high = (val >> 16) & 0xFFFF;
  console.log(`  场景 ${s+1}: 0x${val.toString(16).padStart(8, '0')} (low=0x${low.toString(16)}, high=0x${high.toString(16)})`);
  
  // 检查 low 和 high 是否是资源 ID
  for (const [name, id] of [['low', low], ['high', high]]) {
    if (id === 0) {
      console.log(`    ${name}: 0 (无资源)`);
    } else if ((id & 0x8000) !== 0 && (id & 0x7FFF) < 256) {
      const entryIdx = id & 0x7FFF;
      const ptr = readLong(0x0B0000 + entryIdx * 4);
      const type = readByte(ptr);
      console.log(`    ${name}: 资源ID 0x${id.toString(16)} → Entry ${entryIdx} (Type ${type}, ROM 0x${ptr.toString(16)})`);
    } else if (id < 256) {
      const ptr = readLong(0x0B0000 + id * 4);
      const type = readByte(ptr);
      console.log(`    ${name}: Entry ${id} (Type ${type}, ROM 0x${ptr.toString(16)})`);
    } else {
      console.log(`    ${name}: 0x${id.toString(16)} (不像资源ID)`);
    }
  }
}

// 场景 1 = 标题画面
console.log('\n=== 场景 1 (标题画面) 详细分析 ===');
const scene1Desc = readLong(0x061C34);
const resId1 = scene1Desc & 0xFFFF;
const resId2 = (scene1Desc >> 16) & 0xFFFF;
console.log(`32-bit 描述符: 0x${scene1Desc.toString(16).padStart(8, '0')}`);
console.log(`第一个资源 (→ VRAM 0x4000): 0x${resId1.toString(16)}`);
console.log(`第二个资源 (→ VRAM 0x2000): 0x${resId2.toString(16)}`);

// 解析资源
for (const [label, id] of [['第一个(→VRAM 0x4000)', resId1], ['第二个(→VRAM 0x2000)', resId2]]) {
  const entryIdx = id & 0x7FFF;
  const ptr = readLong(0x0B0000 + entryIdx * 4);
  const type = readByte(ptr);
  
  let typeInfo = '';
  if (type === 3) {
    const size = readWord(ptr + 1);
    typeInfo = `Type 3 (LZSS), 解压大小=${size}B (${Math.floor(size/32)} tiles)`;
  } else if (type === 2) {
    const b1 = readByte(ptr + 1);
    const planes = b1 & 0x7F;
    const compressed = (b1 & 0x80) !== 0;
    typeInfo = `Type 2 (位平面), planes=${planes}, compressed=${compressed}`;
  } else if (type === 1) {
    const size = readWord(ptr + 1);
    typeInfo = `Type 1 (Nibble RLE), 解压大小=${size}B`;
  }
  
  console.log(`  ${label}: ${typeInfo}`);
  
  // VRAM 0x4000 = tile 512, VRAM 0x2000 = tile 256
  const vramTileBase = (id === resId1) ? 512 : 256;
  console.log(`    → VRAM 0x${vramTileBase * 32 < 0x10000 ? (vramTileBase*32).toString(16) : (vramTileBase*32).toString(16)} (tile ${vramTileBase} 起)`);
}

// ============ 2. 在 ROM 中搜索 CRAM 调色板 ============
console.log('\n\n=== 在 ROM 中搜索 CRAM 调色板来源 ===\n');

// CRAM dump 是 512 字节 = 256 个颜色 (4个调色板 x 16色 x 2字节)
// 但 VDP 只有 4 个调色板 x 16 色 = 64 色 = 128 字节
// 所以 CRAM dump 可能包含了所有 256 个颜色槽 (包括 sprite 调色板等)

// 先看 CRAM 前 128 字节 (4个调色板 x 16色)
console.log('CRAM 前 128 字节 (4 调色板 x 16 色):');
const cramPalette = cram.slice(0, 128);
console.log(hexDump(Array.from(cramPalette), 0));

// 在 ROM 中搜索这个调色板序列
// 注意: CRAM 是小端存储, ROM 中调色板可能是大端
// 先尝试直接搜索小端
console.log('搜索 CRAM 前 128 字节 (小端) ...');
const cramPattern = Array.from(cramPalette);
let found = false;
for (let off = 0; off <= rom.length - 128; off++) {
  let match = true;
  for (let i = 0; i < 128; i++) {
    if (rom[off + i] !== cramPattern[i]) { match = false; break; }
  }
  if (match) {
    console.log(`  ✓ 找到! ROM 0x${off.toString(16)}`);
    found = true;
  }
}
if (!found) console.log('  未找到小端匹配');

// 尝试搜索大端 (字节交换)
console.log('搜索 CRAM 前 128 字节 (大端, 字节交换) ...');
const cramSwapped = [];
for (let i = 0; i < 128; i += 2) {
  cramSwapped.push(cramPalette[i + 1]);
  cramSwapped.push(cramPalette[i]);
}
found = false;
for (let off = 0; off <= rom.length - 128; off++) {
  let match = true;
  for (let i = 0; i < 128; i++) {
    if (rom[off + i] !== cramSwapped[i]) { match = false; break; }
  }
  if (match) {
    console.log(`  ✓ 找到! ROM 0x${off.toString(16)}`);
    found = true;
  }
}
if (!found) console.log('  未找到大端匹配');

// 尝试只搜索第一个调色板 (32 字节 = 16 色)
console.log('\n搜索第一个调色板 (32 字节, 小端) ...');
const pal0 = Array.from(cram.slice(0, 32));
found = false;
for (let off = 0; off <= rom.length - 32; off++) {
  let match = true;
  for (let i = 0; i < 32; i++) {
    if (rom[off + i] !== pal0[i]) { match = false; break; }
  }
  if (match) {
    console.log(`  ✓ 找到! ROM 0x${off.toString(16)}`);
    found = true;
  }
}
if (!found) console.log('  未找到');

// 大端
console.log('搜索第一个调色板 (32 字节, 大端) ...');
const pal0Swap = [];
for (let i = 0; i < 32; i += 2) {
  pal0Swap.push(pal0[i + 1]);
  pal0Swap.push(pal0[i]);
}
found = false;
for (let off = 0; off <= rom.length - 32; off++) {
  let match = true;
  for (let i = 0; i < 32; i++) {
    if (rom[off + i] !== pal0Swap[i]) { match = false; break; }
  }
  if (match) {
    console.log(`  ✓ 找到! ROM 0x${off.toString(16)}`);
    found = true;
  }
}
if (!found) console.log('  未找到');

// 尝试搜索前 4 个颜色 (8 字节)
console.log('\n搜索前 4 个颜色 (8 字节, 大端) ...');
const pal4 = [];
for (let i = 0; i < 8; i += 2) {
  pal4.push(cram[i + 1]);
  pal4.push(cram[i]);
}
console.log(`  指纹: ${pal4.map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
found = false;
for (let off = 0; off <= rom.length - 8; off++) {
  let match = true;
  for (let i = 0; i < 8; i++) {
    if (rom[off + i] !== pal4[i]) { match = false; break; }
  }
  if (match) {
    console.log(`  ✓ 找到! ROM 0x${off.toString(16)}`);
    // 打印周围数据
    const around = [];
    for (let i = 0; i < 64; i++) around.push(readByte(off + i));
    console.log(hexDump(around, off));
    found = true;
    if (found) break; // 只找第一个
  }
}
if (!found) console.log('  未找到');

// 也搜索 CRAM 的某些特征值
// 调色板 3 的颜色 #3 = 0x048E (大端) 或 0x8E04 (小端)
// 从 CRAM: index 3*16+3 = 51, offset = 51*2 = 102
console.log('\n搜索调色板3 颜色3 (CRAM offset 102-103) ...');
const c3 = [cram[103], cram[102]]; // 大端
console.log(`  大端: ${c3.map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
found = false;
for (let off = 0; off <= rom.length - 2; off++) {
  if (rom[off] === c3[0] && rom[off+1] === c3[1]) {
    // 检查是否连续出现多个非零颜色
    let count = 0;
    for (let i = 0; i < 64; i += 2) {
      if (rom[off+i] === 0 && rom[off+i+1] === 0) break;
      count++;
    }
    if (count >= 4) {
      console.log(`  候选: ROM 0x${off.toString(16)} (连续 ${count} 个非零颜色)`);
      const around = [];
      for (let i = 0; i < 64; i++) around.push(readByte(off + i));
      console.log(hexDump(around, off));
      found = true;
      if (count >= 8) break;
    }
  }
}
if (!found) console.log('  未找到合适候选');

// ============ 3. 检查 ROM 中已知的调色板位置 ============
// execution-trace.md 提到 ROM 0xA4582 处有匹配的 BE 顺序调色板
console.log('\n=== 检查已知调色板位置 ROM 0xA4582 ===');
const knownPal = [];
for (let i = 0; i < 64; i++) knownPal.push(readByte(0xA4582 + i));
console.log(hexDump(knownPal, 0xA4582));

// 与 CRAM 对比 (大端)
console.log('与 CRAM 调色板3 (大端) 对比:');
const cramPal3BE = [];
for (let i = 48; i < 80; i += 2) {
  cramPal3BE.push(cram[i+1]);
  cramPal3BE.push(cram[i]);
}
console.log(`  CRAM pal3 (大端): ${cramPal3BE.slice(0,16).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
console.log(`  ROM  0xA4582+48:  ${knownPal.slice(48,64).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);

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
