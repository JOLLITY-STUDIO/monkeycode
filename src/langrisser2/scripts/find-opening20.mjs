/**
 * 分析 scenarioIndex 与脚本指针的关系
 * 动画状态机: A0 = *(*(0x18011A + (scenarioIndex-1)*4) + 20)
 * case bit7: 0xFFFFAA28 = *(*A0)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return (((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff)) >>> 0; }

// 1. 指针表 0x18011A (16 个条目)
console.log('=== 指针表 0x18011A ===');
for (let i = 0; i < 16; i++) {
  const ptr = rl(0x18011A + i * 4);
  console.log(`  [${i}] 0x${(0x18011A + i * 4).toString(16)}: 0x${ptr.toString(16)}`);
}

// 2. 对于每个 scenarioIndex (1-16),计算脚本指针
console.log('\n=== scenarioIndex → 脚本指针 ===');
for (let si = 1; si <= 16; si++) {
  const d0 = si - 1;
  const tableEntry = rl(0x18011A + d0 * 4);
  if (tableEntry === 0 || tableEntry >= rom.length) {
    console.log(`  scenarioIndex=${si}: tableEntry=0x${tableEntry.toString(16)} (无效)`);
    continue;
  }
  // case bit7: A0 = *(tableEntry + 20)
  const ptr5 = rl(tableEntry + 20);
  if (ptr5 === 0 || ptr5 >= rom.length) {
    console.log(`  scenarioIndex=${si}: tableEntry=0x${tableEntry.toString(16)}, ptr5=0x${ptr5.toString(16)} (无效)`);
    continue;
  }
  // 0xFFFFAA28 = *ptr5
  const scriptPtr = rl(ptr5);
  console.log(`  scenarioIndex=${si}: table=0x${tableEntry.toString(16)}, ptr5=0x${ptr5.toString(16)}, script=0x${scriptPtr.toString(16)}`);
}

// 3. 查看 0x18011A[0] 的完整结构 (前 64 字节)
console.log('\n=== 0x18011A[0] 结构 (scenarioIndex=1) ===');
const entry0 = rl(0x18011A);
console.log(`tableEntry = 0x${entry0.toString(16)}`);
console.log(`数据 (前 64B):`);
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) hex += rb(entry0 + i + j).toString(16).padStart(2, '0') + ' ';
  console.log(`  0x${(entry0 + i).toString(16)}: ${hex}`);
}

// 4. 查看 tableEntry+20 处的指针
console.log('\n=== tableEntry+20 处的指针 ===');
for (let i = 0; i < 16; i++) {
  const entry = rl(0x18011A + i * 4);
  if (entry === 0 || entry >= rom.length) continue;
  const p20 = rl(entry + 20);
  console.log(`  [${i}] table=0x${entry.toString(16)}, +20=0x${p20.toString(16)}`);
  if (p20 !== 0 && p20 < rom.length) {
    const script = rl(p20);
    console.log(`       *0x${p20.toString(16)} = 0x${script.toString(16)}`);
    if (script !== 0 && script < rom.length) {
      // 显示脚本前 32 字节
      let hex = '';
      for (let j = 0; j < 32; j++) hex += rb(script + j).toString(16).padStart(2, '0') + ' ';
      console.log(`       脚本数据: ${hex}`);
    }
  }
}
