// ============================================================================
// 核心运行脚本：注入 ROM → 设置 PC 到 RESET 向量 → 跑帧
// ============================================================================
import { updateFrame, load, store, HEAPU8, HEAPU16, getMemorySize } from './pages/tsubasaFromCore/core_engine.js';
import fs from 'fs';

console.log(`WASM memory size: ${(getMemorySize()/1024/1024).toFixed(1)} MB`);

// ─── 1. 注入 ROM 数据 ───────────────────────────────────────────────
const merged = fs.readFileSync('tools/6502-to-js-test/_prg_output/_merged_all.c', 'utf8');
const setmems = [...merged.matchAll(/SetMem\(0x([0-9a-f]+),\s*0x([0-9a-f]+)\)/gi)];
for (const m of setmems) {
  store(parseInt(m[1], 16), parseInt(m[2], 16));
}
console.log(`注入 ${setmems.length} 字节 ROM 数据`);

// 验证 RESET 向量
const rvLo = load(0xFFFC), rvHi = load(0xFFFD);
const resetVec = rvLo | (rvHi << 8);
console.log(`RESET 向量: $${resetVec.toString(16).padStart(4, '0')} = ${rvHi.toString(16)}:${rvLo.toString(16)}`);

// ─── 2. 在 WASM heap 中定位 memory[] 和 Reg_PC ────────────────────
// memory[65536] 是 NES 内存，之后是 Reg_PC, Reg_A, Reg_X, Reg_Y, Reg_SP...
// 用标记法定位 memory 数组的起始位置
store(0x1337, 0xDE); store(0xBEEF, 0xAD);
let memBase = -1;
for (let i = 0; i < HEAPU8.length - 0xBF00; i++) {
  if (HEAPU8[i] === 0xDE && HEAPU8[i + 0xBEEF - 0x1337] === 0xAD) {
    memBase = i - 0x1337;
    break;
  }
}
store(0x1337, 0); store(0xBEEF, 0);
if (memBase < 0) { console.error('找不到 NES memory 数组！'); process.exit(1); }
console.log(`memory[] 基址: HEAPU8[0x${memBase.toString(16)}] (${memBase})`);

// 找 Reg_PC / Reg_A / Reg_X / Reg_Y / Reg_SP（紧跟在 memory 后面）
// C 代码布局: uint16_t Reg_PC(2B); uint8_t Reg_A,Reg_X,Reg_Y,Reg_SP(4B); uint8_t SR flags(7B)
// 特征: Reg_SP = 0xFF 初始值
const afterMem = memBase + 0x10000;
const region = HEAPU8.slice(afterMem, afterMem + 64);
console.log(`memory 之后的 64 字节:`, [...region].map(b => b.toString(16).padStart(2,'0')).join(' '));

// 搜索 Reg_SP = 0xFF 的模式
let pcOfs = -1, spOfs = -1;
for (let i = 0; i < 20; i++) {
  // Reg_PC(0,0) + Reg_A(0) + Reg_X(0) + Reg_Y(0) + Reg_SP(0xFF)
  if (region[i] === 0xFF && region[i-1] === 0 && region[i-2] === 0 && region[i-3] === 0) {
    spOfs = afterMem + i;
    pcOfs = afterMem + i - 5; // Reg_PC 在 Reg_SP 前 5 字节
    console.log(`找到 Reg_SP=0xFF @ HEAPU8[0x${spOfs.toString(16)}]`);
    console.log(`  Reg_PC 应位于 HEAPU8[0x${pcOfs.toString(16)}]: [${HEAPU8[pcOfs].toString(16)} ${HEAPU8[pcOfs+1].toString(16)} ${HEAPU8[pcOfs+2].toString(16)} ${HEAPU8[pcOfs+3].toString(16)} ${HEAPU8[pcOfs+4].toString(16)} ${HEAPU8[pcOfs+5].toString(16)}]`);
    break;
  }
}

if (pcOfs < 0) {
  // 尝试 HEAPU16 找 0 值后跟 0xFF
  for (let i = 0; i < 10; i++) {
    if (HEAPU16[(afterMem >> 1) + i] === 0) {
      // 可能 Reg_PC 有 padding，跳过继续找
    }
  }
  console.error('未找到 Reg_SP 特征。尝试直接查找...');
  // 放宽条件：找 afterMem 之后第一个 0xFF
  for (let i = 0; i < 32; i++) {
    if (HEAPU8[afterMem + i] === 0xFF) {
      console.log(`找到 0xFF @ HEAPU8[0x${(afterMem+i).toString(16)}], 周围:`,
        [...Array(8)].map((_,j) => HEAPU8[afterMem+i-4+j].toString(16).padStart(2,'0')).join(' '));
    }
  }
  process.exit(1);
}

// ─── 3. 设置 PC 到 RESET 向量 ──────────────────────────────────────
const pcLo = resetVec & 0xFF;
const pcHi = (resetVec >> 8) & 0xFF;
console.log(`设置 Reg_PC = 0x${resetVec.toString(16)} (${pcLo},${pcHi}) 到 HEAPU8[0x${pcOfs.toString(16)}]`);
HEAPU8[pcOfs] = pcLo;
HEAPU8[pcOfs + 1] = pcHi;
// 确认写入
const readback = load ? 'done' : 'skip';
console.log(`写入验证: Reg_PC 现在 = 0x${(HEAPU8[pcOfs] | (HEAPU8[pcOfs+1] << 8)).toString(16)}`);

// ─── 4. 跑帧并监控 ─────────────────────────────────────────────────
function rd(addr, n) { const r = []; for (let i = 0; i < n; i++) r.push(load(addr + i)); return r; }
function dumpZP() {
  const zp = rd(0x00, 0x40);
  const nz = zp.filter(b => b !== 0).length;
  if (nz > 0) {
    for (let i = 0; i < 0x40; i += 16) {
      if (zp.slice(i, i+16).some(b => b !== 0)) {
        console.log(`  $${(i).toString(16).padStart(2,'0')}: ${zp.slice(i,i+16).map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
      }
    }
  }
  return nz;
}

const framesToCheck = [1, 5, 10, 20, 50, 100, 200, 500];
let nextCheckIdx = 0;

console.log('\n========== 开始跑帧 ==========');
for (let f = 1; f <= 500; f++) {
  try {
    updateFrame();
  } catch (e) {
    console.error(`帧 ${f} 报错: ${e.message}`);
    break;
  }

  // 监控 PC
  const currentPC = HEAPU8[pcOfs] | (HEAPU8[pcOfs + 1] << 8);
  const spVal = HEAPU8[spOfs];
  const aVal = HEAPU8[spOfs - 3];
  const xVal = HEAPU8[spOfs - 2];
  const yVal = HEAPU8[spOfs - 1];

  if (framesToCheck[nextCheckIdx] === f) {
    nextCheckIdx++;
    const zpNz = rd(0x00, 0x40).filter(b => b !== 0).length;
    const nmiz = load(0xFF) !== 0; // NMI flag area
    
    console.log(`\n--- 帧 ${f} ---`);
    console.log(`PC=$${currentPC.toString(16).padStart(4,'0')} A=$${aVal.toString(16)} X=$${xVal.toString(16)} Y=$${yVal.toString(16)} SP=$${spVal.toString(16)}`);
    console.log(`零页非零: ${zpNz}/64, NMI/状态: $${load(0xFF).toString(16)}`);
    
    // 打印关键地址
    const keyAddr = [0x00, 0x27, 0x2000, 0x2001, 0x2002, 0x4014];
    const keyVals = keyAddr.map(a => `$${a.toString(16)}=$${load(a).toString(16).padStart(2,'0')}`);
    console.log(`关键寄存器: ${keyVals.join(' ')}`);
    
    if (zpNz > 0) dumpZP();

    // 检查 PPU OAM 是否有数据（说明图形在生成）
    const oamStart = 0x0200;
    const oamData = rd(oamStart, 16);
    const oamNz = oamData.filter(b => b !== 0).length;
    if (oamNz > 0) {
      console.log(`OAM($0200): ${oamData.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
    }
  }
}

// 最终状态
console.log('\n========== 最终状态 ==========');
const finalPC = HEAPU8[pcOfs] | (HEAPU8[pcOfs + 1] << 8);
const finalSP = HEAPU8[spOfs];
console.log(`PC=$${finalPC.toString(16).padStart(4,'0')} SP=$${finalSP.toString(16)}`);
console.log(`零页最终状态:`);
dumpZP();
