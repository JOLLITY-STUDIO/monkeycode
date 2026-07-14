/**
 * 搜索谁写入 0xFFFFAA11 (动画控制字节)
 * 并解析动画脚本
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

// ============================================================
// 1. 搜索直接写入 0xFFFFAA11 的指令
// ============================================================
console.log('=== 1. 搜索直接写入 0xFFFFAA11 ===\n');

// MOVE.B #imm, (0xFFFFAA11).L = 0x11FC <imm16> <addr32>
console.log('搜索 MOVE.B #imm, (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x11FC && rl(i + 4) === 0xFFFFAA11) {
    const imm = rw(i + 2);
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B #0x${imm.toString(16)}, (0xFFFFAA11).L`);
  }
}

// MOVE.B Dn, (0xFFFFAA11).L = 0x11C0 | (Dn<<9) <addr32>
console.log('\n搜索 MOVE.B Dn, (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  if ((w & 0xFFC0) === 0x11C0 && rl(i + 2) === 0xFFFFAA11) {
    const reg = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B D${reg}, (0xFFFFAA11).L`);
  }
}

// MOVE.W #imm, (0xFFFFAA11).L = 0x31FC <imm16> <addr32>
console.log('\n搜索 MOVE.W #imm, (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x31FC && rl(i + 4) === 0xFFFFAA11) {
    const imm = rw(i + 2);
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${imm.toString(16)}, (0xFFFFAA11).L`);
  }
}

// CLR.B (0xFFFFAA11).L = 0x4239 <addr32>
console.log('\n搜索 CLR.B (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x4239 && rl(i + 2) === 0xFFFFAA11) {
    console.log(`  ROM 0x${i.toString(16)}: CLR.B (0xFFFFAA11).L`);
  }
}

// ORI.B #imm, (0xFFFFAA11).L = 0x0039 <imm16> <addr32>
console.log('\n搜索 ORI.B #imm, (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x0039 && rl(i + 4) === 0xFFFFAA11) {
    const imm = rw(i + 2);
    console.log(`  ROM 0x${i.toString(16)}: ORI.B #0x${imm.toString(16)}, (0xFFFFAA11).L`);
  }
}

// BSET/BCLR #bit, (0xFFFFAA11).L = 0x08C0/0880 <bit> <addr32>
console.log('\n搜索 BSET/BCLR #bit, (0xFFFFAA11).L:');
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  if ((w === 0x0839 || w === 0x0879 || w === 0x08B9 || w === 0x08F9) && rl(i + 4) === 0xFFFFAA11) {
    const bit = rw(i + 2);
    const opName = ['BTST', 'BCHG', 'BCLR', 'BSET'][(w >> 6) & 3];
    console.log(`  ROM 0x${i.toString(16)}: ${opName} #${bit}, (0xFFFFAA11).L`);
  }
}

// ============================================================
// 2. 搜索写入 0xFFFFAA10-AA1F 范围 (可能用 (An) 间接寻址)
// ============================================================
console.log('\n=== 2. 搜索附近地址写入 (0xFFFFAA10-AA1F) ===\n');

// 搜索所有写入 0xFFFFAA00-AAFF 范围的指令
console.log('搜索 MOVE.B #imm, (0xFFFFAA00-AAFF).L:');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x11FC) {
    const addr = rl(i + 4);
    if ((addr & 0xFFFFFF00) === 0xFFFFAA00) {
      const imm = rw(i + 2);
      console.log(`  ROM 0x${i.toString(16)}: MOVE.B #0x${imm.toString(16)}, (0x${addr.toString(16)}).L`);
    }
  }
}

// ============================================================
// 3. 搜索 LEA 0xFFFFAA11, An (用于间接写入)
// ============================================================
console.log('\n=== 3. 搜索 LEA 0xFFFFAA11, An ===\n');
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  if ((w & 0xF1FF) === 0x41F9) {
    const addr = rl(i + 2);
    if (addr === 0xFFFFAA11) {
      const reg = (w >> 9) & 7;
      console.log(`  ROM 0x${i.toString(16)}: LEA 0xFFFFAA11, A${reg}`);
    }
  }
}

// ============================================================
// 4. 搜索引用 0xFFFFAA11 的所有地址
// ============================================================
console.log('\n=== 4. 搜索所有引用 0xFFFFAA11 ===\n');
const refs = [];
for (let i = 0; i < rom.length - 4; i++) {
  if (rl(i) === 0xFFFFAA11) {
    refs.push(i);
  }
}
console.log(`找到 ${refs.length} 处引用 0xFFFFAA11:`);
for (const r of refs) {
  // 反汇编前后文
  const prevWord = rw(r - 2);
  let ctx = '';
  if (prevWord === 0x11FC) ctx = 'MOVE.B #imm, (0xFFFFAA11).L';
  else if ((prevWord & 0xFFC0) === 0x11C0) ctx = `MOVE.B D${(prevWord>>9)&7}, (0xFFFFAA11).L`;
  else if (prevWord === 0x31FC) ctx = 'MOVE.W #imm, (0xFFFFAA11).L';
  else if (prevWord === 0x4239) ctx = 'CLR.B (0xFFFFAA11).L';
  else if (prevWord === 0x4A39) ctx = 'TST.B (0xFFFFAA11).L';
  else if (prevWord === 0x0839 || prevWord === 0x0879 || prevWord === 0x08B9 || prevWord === 0x08F9) {
    const opName = ['BTST', 'BCHG', 'BCLR', 'BSET'][(prevWord >> 6) & 3];
    ctx = `${opName} #${rw(r-4)}, (0xFFFFAA11).L`;
  }
  else if ((prevWord & 0xF1FF) === 0x41F9) ctx = `LEA 0xFFFFAA11, A${(prevWord>>9)&7}`;
  else if ((prevWord & 0xF1F8) === 0x1039) ctx = `MOVE.B (0xFFFFAA11).L, D${(prevWord>>9)&7}`;
  else if ((prevWord & 0xF1F8) === 0x3039) ctx = `MOVE.W (0xFFFFAA11).L, D${(prevWord>>9)&7}`;
  else if ((prevWord & 0xF1F8) === 0x1139) ctx = `MOVE.B D${(prevWord>>9)&7}, (0xFFFFAA11).L`;
  else if ((prevWord & 0xF1F8) === 0x3139) ctx = `MOVE.W D${(prevWord>>9)&7}, (0xFFFFAA11).L`;
  else ctx = `(前字 0x${prevWord.toString(16)})`;
  console.log(`  ROM 0x${r.toString(16)}: ${ctx}`);
}

// ============================================================
// 5. 查看 0xFFFFAA11 附近的写入 (AA10-AA20)
// ============================================================
console.log('\n=== 5. 查看 0xFFFFAA10-AA20 区域写入 ===\n');
for (let addr = 0xFFFFAA10; addr <= 0xFFFFAA20; addr++) {
  const hits = [];
  for (let i = 0; i < rom.length - 6; i++) {
    if (rl(i) === addr) {
      const prevWord = rw(i - 2);
      if (prevWord === 0x11FC || (prevWord & 0xFFC0) === 0x11C0 || 
          prevWord === 0x31FC || prevWord === 0x4239 || prevWord === 0x4279 ||
          prevWord === 0x4A39 || prevWord === 0x4A79 ||
          (prevWord & 0xF1F8) === 0x1139 || (prevWord & 0xF1F8) === 0x3139 ||
          (prevWord & 0xF1F8) === 0x1039 || (prevWord & 0xF1F8) === 0x3039 ||
          (prevWord & 0xF1FF) === 0x41F9) {
        hits.push({ rom: i - 2, prev: prevWord });
      }
    }
  }
  if (hits.length > 0) {
    console.log(`0x${addr.toString(16)}: ${hits.length} 处引用`);
    for (const h of hits) {
      console.log(`  ROM 0x${h.rom.toString(16)}: word=0x${h.prev.toString(16)}`);
    }
  }
}

// ============================================================
// 6. 确认脚本数据位置
// ============================================================
console.log('\n=== 6. 确认动画脚本数据位置 ===\n');

// 0x18011A 指针表
console.log('0x18011A 指针表 (16 条):');
for (let i = 0; i < 16; i++) {
  const ptr = rl(0x18011A + i * 4);
  console.log(`  [${i}] 0x${ptr.toString(16)}`);
}

// case bit7 路径: A0 = *(*(0x18011A + 0x14))
const ptr1 = rl(0x18011A + 0x14);  // = 0x18D5F2
console.log(`\n*(0x18011A + 0x14) = 0x${ptr1.toString(16)}`);

const ptr2 = rl(ptr1);  // 0x18D5F2 处的指针
console.log(`*(0x${ptr1.toString(16)}) = 0x${ptr2.toString(16)}`);

// 检查 0x18D60A 处的数据
console.log(`\n0x${ptr2.toString(16)} 处数据 (前 64B):`);
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(ptr2 + i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${(ptr2 + i).toString(16)}: ${hex} ${ascii}`);
}

// 尝试解析为脚本
console.log(`\n尝试解析脚本 (假设命令 0-15):`);
let pos = ptr2;
let cmdIdx = 0;
// 参数消耗 (简化版)
const paramSizes = [1, 1, -1, 1, 1, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0];
while (cmdIdx < 30) {
  const cmd = rb(pos);
  if (cmd === 0xFF) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: END (0xFF)`);
    break;
  }
  if (cmd > 15) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: INVALID cmd=${cmd} (0x${cmd.toString(16)})`);
    break;
  }
  const sz = paramSizes[cmd];
  let line = `  [${cmdIdx}] 0x${pos.toString(16)}: cmd=${cmd}`;
  if (sz > 0) {
    const params = [];
    for (let p = 0; p < sz; p++) params.push(rb(pos + 1 + p));
    line += ` params=[${params.map(p => '0x' + p.toString(16).padStart(2,'0')).join(',')}]`;
    pos += 1 + sz;
  } else if (sz === 0) {
    pos += 1;
  } else {
    // 变长 - cmd 2
    line += ` (变长)`;
    pos += 1;
  }
  console.log(line);
  cmdIdx++;
  if (sz < 0) break;  // 遇到变长暂停
}
