// ============================================================================
// 找 Reg_PC/Reg_SP 在 WASM heap 中的位置
// core_engine.js: updateFrame() 开头: m=v[1048]; n=v[1047]; o=v[1025]; p=v[1...
// memory[] 基址在 HEAPU8[1056] = 0x420
// 所以寄存器变量在 memory[] 之前的 1056-8=1048, 1056-9=1047, 1056-31=1025
// v 可能是 HEAP8（有符号）但 Uint8Array 读出来也一样
// ============================================================================
import { updateFrame, load, store, HEAPU8, HEAPU16, getMemorySize } from './pages/tsubasaFromCore/core_engine.js';
import fs from 'fs';

// 注入 ROM
const merged = fs.readFileSync('tools/6502-to-js-test/_prg_output/_merged_all.c', 'utf8');
for (const m of merged.matchAll(/SetMem\(0x([0-9a-f]+),\s*0x([0-9a-f]+)\)/gi)) {
  store(parseInt(m[1], 16), parseInt(m[2], 16));
}
console.log('ROM 注入完成');

// 跑一帧前后对比 memory[] 前面的字节
function dumpRange(label, start, len) {
  console.log(`\n${label}:`);
  for (let i = 0; i < len; i += 16) {
    const row = [];
    for (let j = 0; j < 16 && (i + j) < len; j++) {
      row.push(HEAPU8[start + i + j].toString(16).padStart(2, '0'));
    }
    console.log(`  0x${(start+i).toString(16)}: ${row.join(' ')}`);
  }
}

// memory[] 基址前面 64 字节
const memBase = 0x420; // 1056
dumpRange('BEFORE 帧 1 (reg 区域)', memBase - 64, 64);

// 跑一帧
console.log('\n=== 跑第一帧 ===');
try {
  updateFrame();
} catch (e) {
  console.error('帧 1 报错:', e.message);
}

dumpRange('AFTER 帧 1 (reg 区域)', memBase - 64, 64);

// 再跑一帧看变化
try {
  updateFrame();
} catch (e) {
  console.error('帧 2 报错:', e.message);
}

dumpRange('AFTER 帧 2 (reg 区域)', memBase - 64, 64);

// 也看看 memory[] 开头和零页
console.log('\nmemory[0x00-0x0F]:');
for (let i = 0; i < 16; i++) console.log(`  $${i.toString(16).padStart(2,'0')}: ${load(i).toString(16).padStart(2, '0')}`);

// RESET 向量
console.log(`\nRESET 向量: $${(load(0xFFFD)<<8|load(0xFFFC)).toString(16).padStart(4,'0')}`);
