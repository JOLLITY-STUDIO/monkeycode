// ============================================================================
// 诊断 + 修复: 找 Reg_PC 并设置正确的 RESET 向量
// ============================================================================
import { updateFrame, load, store, HEAPU8, getMemorySize } from './pages/tsubasaFromCore/core_engine.js';
import fs from 'fs';

// 1. 注入 ROM 数据
const merged = fs.readFileSync('tools/6502-to-js-test/_prg_output/_merged_all.c', 'utf8');
const setmems = merged.matchAll(/SetMem\(0x([0-9a-f]+),\s*0x([0-9a-f]+)\)/gi);
let inj = 0;
for (const m of setmems) { store(parseInt(m[1],16), parseInt(m[2],16)); inj++; }
console.log('Injected:', inj, 'bytes');

const resetLo = load(0xFFFC);
const resetHi = load(0xFFFD);
const resetVec = resetLo | (resetHi << 8);
console.log(`RESET vector: $${resetVec.toString(16).padStart(4, '0')}`);

// 2. 找 NES memory[65536] 在 wasm heap 里的偏移
store(0x1234, 0xAB); store(0x5678, 0xCD);
let nesBase = -1;
for (let i = 0; i < HEAPU8.length - 0x6000; i++) {
  if (HEAPU8[i] === 0xAB && HEAPU8[i + 0x5678 - 0x1234] === 0xCD) {
    // verify
    if (HEAPU8[i + 0x5678] !== undefined) {
      nesBase = i - 0x1234;
      break;
    }
  }
}
store(0x1234, 0); store(0x5678, 0);
console.log(`NES memory base in HEAPU8: 0x${nesBase.toString(16)}`);

// 3. 找到 Reg_PC 在 heap 中的位置
// Reg_PC 在 C 代码中是全局变量，它在 wasm memory 的 DATA 段
// runner_3bank.c: uint16_t Reg_PC = 0;
// 在 wasm heap 的 DATA 初始化段里，值是 0
// 我们先读/写一些 NES 内存来定位 memory 数组，然后 regs 应该在 memory 数组附近

// 策略：找到 memory[0] 的位置，Reg_PC 就在附近
// 或者更直接：看看 runner_3bank.c 的变量布局
// uint8_t memory[65536];  (0x10000 bytes)
// uint16_t Reg_PC = 0;
// uint8_t Reg_A = 0, Reg_X = 0, Reg_Y = 0, Reg_SP = 0xff;
// Reg_SP 初始值是 0xff，很容易找

// 在 NES memory 前后扫描 0xFF 值
const scanStart = nesBase + 0x10000; // just after NES memory
let regSP = -1;
for (let i = scanStart; i < Math.min(scanStart + 100, HEAPU8.length); i++) {
  if (HEAPU8[i] === 0xFF) {
    // could be Reg_SP, check surrounding pattern
    // Reg_PC (2 bytes, 0), Reg_A (0), Reg_X (0), Reg_Y (0), Reg_SP (0xFF)
    if (HEAPU8[i-3] === 0 && HEAPU8[i-2] === 0 && HEAPU8[i-1] === 0 && HEAPU8[i] === 0xFF) {
      regSP = i;
      console.log(`Potential Reg_SP at heap[0x${regSP.toString(16)}]`);
      console.log(`  heap[${(regSP-5).toString(16)}]: ${HEAPU8[regSP-5]} ${HEAPU8[regSP-4]} ${HEAPU8[regSP-3]} ${HEAPU8[regSP-2]} ${HEAPU8[regSP-1]} ${HEAPU8[regSP]}`);
      break;
    }
  }
}

// 4. 如果找到了 Reg_PC，设置它为 RESET 向量
if (regSP >= 0) {
  // Reg_PC 应该在 Reg_SP 前面 5 字节起始
  const pcBase = regSP - 5;
  console.log(`Setting Reg_PC at HEAPU8[0x${pcBase.toString(16)}] = ${resetVec.toString(16)}`);
  HEAPU8[pcBase] = resetVec & 0xFF;       // low byte
  HEAPU8[pcBase + 1] = (resetVec >> 8) & 0xFF; // high byte
}

// 5. 跑第一帧，观察
console.log('\n=== Running first frame ===');
try {
  updateFrame();
} catch (e) {
  console.error('Frame 1 error:', e.message);
}

// 检查 Reg_PC 的新值（第一帧结束后）
const newPC = HEAPU8[regSP - 5] | (HEAPU8[regSP - 4] << 8);
console.log(`After frame 1: Reg_PC = $${newPC.toString(16).padStart(4, '0')}`);

// 检查零页是否有变化
function rd(s, n) { const r = []; for (let i = 0; i < n; i++) r.push(load(s + i)); return r; }
const zp = rd(0x0000, 0x40);
const nz = zp.filter(b => b !== 0).length;
console.log(`Zero page non-zero: ${nz}/64`);
if (nz) {
  for (let i = 0; i < 0x40; i += 16) {
    const row = zp.slice(i, i + 16);
    if (row.some(b => b !== 0)) {
      const hex = row.map(b => b.toString(16).padStart(2, '0')).join(' ');
      console.log(`$${(i).toString(16).padStart(2,'0')}: ${hex}`);
    }
  }
}

const stack = rd(0x01F0, 0x10);
console.log('Stack $01F0:', stack.map(b => b.toString(16).padStart(2, '0')).join(' '));

// 6. 跑更多帧
console.log('\n=== Running 10 more frames ===');
for (let f = 2; f <= 10; f++) {
  try { updateFrame(); } catch (e) { console.error(`Frame ${f}: ${e.message}`); }
  const newPC2 = HEAPU8[regSP - 5] | (HEAPU8[regSP - 4] << 8);
  const zp2 = rd(0x0000, 0x40);
  const nz2 = zp2.filter(b => b !== 0).length;
  if (f % 5 === 0 || nz2 > 0) {
    console.log(`Frame ${f}: PC=$${newPC2.toString(16).padStart(4,'0')}, zp_nz=${nz2}`);
  }
}
