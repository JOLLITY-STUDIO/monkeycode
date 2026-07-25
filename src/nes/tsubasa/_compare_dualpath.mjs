/**
 * 双路径对比工具: tsnes (6502) vs disasm (TS 翻译)
 *
 * 相同输入 → 逐帧对比 ZP + 关键内存状态 → 找分歧点
 *
 * 用法: node _compare_dualpath.mjs [--max-frames N] [--start-at N]
 */

import { GameContext } from './src/disasm/_context.js';
import { allBanks } from './src/disasm/banks/index.js';
import { ROM as rom00 } from './src/disasm/banks/_romdata/bank_00_data.js';
import { ROM as rom01 } from './src/disasm/banks/_romdata/bank_01_data.js';
import { ROM as rom02 } from './src/disasm/banks/_romdata/bank_02_data.js';
import { ROM as rom03 } from './src/disasm/banks/_romdata/bank_03_data.js';
import { ROM as rom04 } from './src/disasm/banks/_romdata/bank_04_data.js';
import { ROM as rom05 } from './src/disasm/banks/_romdata/bank_05_data.js';
import { ROM as rom06 } from './src/disasm/banks/_romdata/bank_06_data.js';
import { ROM as rom07 } from './src/disasm/banks/_romdata/bank_07_data.js';
import { ROM as rom08 } from './src/disasm/banks/_romdata/bank_08_data.js';
import { ROM as rom09 } from './src/disasm/banks/_romdata/bank_09_data.js';
import { ROM as rom10 } from './src/disasm/banks/_romdata/bank_10_data.js';
import { ROM as rom11 } from './src/disasm/banks/_romdata/bank_11_data.js';
import { ROM as rom12 } from './src/disasm/banks/_romdata/bank_12_data.js';
import { ROM as rom13 } from './src/disasm/banks/_romdata/bank_13_data.js';
import { ROM as rom14 } from './src/disasm/banks/_romdata/bank_14_data.js';
import { ROM as rom15 } from './src/disasm/banks/_romdata/bank_15_data.js';
import { ROM as rom16 } from './src/disasm/banks/_romdata/bank_16_data.js';
import { ROM as rom17 } from './src/disasm/banks/_romdata/bank_17_data.js';
import { ROM as rom18 } from './src/disasm/banks/_romdata/bank_18_data.js';
import { ROM as rom19 } from './src/disasm/banks/_romdata/bank_19_data.js';
import { ROM as rom20 } from './src/disasm/banks/_romdata/bank_20_data.js';
import { ROM as rom21 } from './src/disasm/banks/_romdata/bank_21_data.js';
import { ROM as rom22 } from './src/disasm/banks/_romdata/bank_22_data.js';
import { ROM as rom23 } from './src/disasm/banks/_romdata/bank_23_data.js';
import { ROM as rom24 } from './src/disasm/banks/_romdata/bank_24_data.js';
import { ROM as rom25 } from './src/disasm/banks/_romdata/bank_25_data.js';
import { ROM as rom26 } from './src/disasm/banks/_romdata/bank_26_data.js';
import { ROM as rom27 } from './src/disasm/banks/_romdata/bank_27_data.js';
import { ROM as rom28 } from './src/disasm/banks/_romdata/bank_28_data.js';
import { ROM as rom29 } from './src/disasm/banks/_romdata/bank_29_data.js';
import { ROM as rom30 } from './src/disasm/banks/_romdata/bank_30_data.js';
import { ROM as rom31 } from './src/disasm/banks/_romdata/bank_31_data.js';
import { ROM as rom32 } from './src/disasm/banks/_romdata/bank_32_data.js';
import { ROM as rom33 } from './src/disasm/banks/_romdata/bank_33_data.js';
import { ROM as rom34 } from './src/disasm/banks/_romdata/bank_34_data.js';
import { ROM as rom35 } from './src/disasm/banks/_romdata/bank_35_data.js';
import { ROM as rom36 } from './src/disasm/banks/_romdata/bank_36_data.js';
import { ROM as rom37 } from './src/disasm/banks/_romdata/bank_37_data.js';
import { ROM as rom38 } from './src/disasm/banks/_romdata/bank_38_data.js';
import { ROM as rom39 } from './src/disasm/banks/_romdata/bank_39_data.js';
import { ROM as rom40 } from './src/disasm/banks/_romdata/bank_40_data.js';
import { ROM as rom41 } from './src/disasm/banks/_romdata/bank_41_data.js';
import { ROM as rom42 } from './src/disasm/banks/_romdata/bank_42_data.js';
import { ROM as rom43 } from './src/disasm/banks/_romdata/bank_43_data.js';
import { ROM as rom44 } from './src/disasm/banks/_romdata/bank_44_data.js';
import { ROM as rom45 } from './src/disasm/banks/_romdata/bank_45_data.js';
import { ROM as rom46 } from './src/disasm/banks/_romdata/bank_46_data.js';
import { ROM as rom47 } from './src/disasm/banks/_romdata/bank_47_data.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { TsubasaNes } = require('./src/tsnes/tsubasa-code/tsubasa_nes.js');

// ============================================================
// 配置
// ============================================================
const args = process.argv.slice(2);
const MAX_FRAMES = parseInt(args.find((_, i) => args[i - 1] === '--max-frames') ?? '30');
const START_AT = parseInt(args.find((_, i) => args[i - 1] === '--start-at') ?? '0');
const DUMP_FULL_ZP = args.includes('--full-zp');

const H8 = v => (v & 0xFF).toString(16).toUpperCase().padStart(2, '0');
const H16 = v => (v & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');

// ============================================================
// 路径 A: tsnes (6502 CPU 模拟器)
// ============================================================
let tsnes;

function initTsnes() {
  tsnes = new TsubasaNes({
    onFrame: () => {},
    emulateSound: false,
  });
  // 初始复位后等一帧让 NES 进入第一个 VBlank
  for (let i = 0; i < 2; i++) tsnes.frame();
}

function readTsnesZp(addr) {
  return tsnes.cpu.mem[addr];
}
function readTsnesMem(addr) {
  return tsnes.cpu.mem[addr & 0xFFFF];
}

// ============================================================
// 路径 B: disasm (TS 翻译)
// ============================================================

const ROM_DATA = [
  rom00,rom01,rom02,rom03,rom04,rom05,rom06,rom07,
  rom08,rom09,rom10,rom11,rom12,rom13,rom14,rom15,
  rom16,rom17,rom18,rom19,rom20,rom21,rom22,rom23,
  rom24,rom25,rom26,rom27,rom28,rom29,rom30,rom31,
  rom32,rom33,rom34,rom35,rom36,rom37,rom38,rom39,
  rom40,rom41,rom42,rom43,rom44,rom45,rom46,rom47,
];

const PRG_BANK_SIZE = 0x2000;
const TOTAL_BANKS = ROM_DATA.length;

let disasmCtx;
let disasmBank8000 = 0;
let disasmBankA000 = 1;

function bankSlice(n) {
  const d = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[n]?.[i] ?? 0;
  return {
    u8(o) { return d[o] ?? 0; },
    u16le(o) { return (this.u8(o)) | (this.u8(o + 1) << 8); },
    data: d,
    romBase: n * PRG_BANK_SIZE,
  };
}

const disasmReader = {
  bank(a) {
    const ca = a & 0xFFFF;
    let bn;
    if (ca >= 0xE000) bn = TOTAL_BANKS - 1;
    else if (ca >= 0xC000) bn = TOTAL_BANKS - 2;
    else if (ca >= 0xA000) bn = disasmBankA000;
    else bn = disasmBank8000;
    return bankSlice(bn);
  },
  u8(a) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a) { return this.bank(a).u16le(a & 0x1FFF); },
};

function initDisasm() {
  disasmCtx = new GameContext();

  // Hook MMC3 tracking
  const origSet = disasmCtx.ram.setU8.bind(disasmCtx.ram);
  disasmCtx.ram.setU8 = (a, v) => {
    origSet(a, v);
    if (a === 0x8001) {
      const sel = disasmCtx.ram.u8(0x8000) & 0x07;
      if (sel === 6) disasmBank8000 = v;
      if (sel === 7) disasmBankA000 = v;
    }
  };
  disasmCtx.ram.setU8(0x24, 0);
  disasmCtx.ram.setU8(0x25, 1);

  // Boot: call RESET
  if (allBanks[31]?.fns?.['$FFF0']) {
    allBanks[31].fns['$FFF0'](disasmCtx, disasmReader);
  }

  // Init done: run a warmup frame
  if (disasmBank8000 === 0) {
    allBanks[0]?.dispatch(disasmCtx, disasmReader);
  }
}

function runDisasmFrame() {
  if (disasmBank8000 === 0) {
    allBanks[0]?.dispatch(disasmCtx, disasmReader);
  }
}

function readDisasmZp(addr) {
  return disasmCtx.ram.u8(addr);
}
function readDisasmMem(addr) {
  return disasmCtx.ram.u8(addr & 0xFFFF);
}

// ============================================================
// Joypad 辅助
// ============================================================
const BTN = {
  A: 0x01, B: 0x02, SELECT: 0x04, START: 0x08,
  UP: 0x10, DOWN: 0x20, LEFT: 0x40, RIGHT: 0x80,
};

function setJoypadTsnes(mask, prevMask = 0) {
  const buttons = [0,1,2,3,4,5,6,7];
  for (const btn of buttons) {
    const was = (prevMask >> btn) & 1;
    const now = (mask >> btn) & 1;
    if (now && !was) tsnes.buttonDown(1, btn);
    if (!now && was) tsnes.buttonUp(1, btn);
  }
}

function setJoypadDisasm(mask) {
  const prev = disasmCtx.ram.u8(0x1B);
  disasmCtx.ram.setU8(0x1B, mask);
  disasmCtx.ram.setU8(0x1C, mask & ~prev); // newly pressed
  disasmCtx.ram.setU8(0x1D, prev);         // prev state
}

// ============================================================
// 关键 ZP 地址
// ============================================================
const KEY_ZP = {
  0x1B: 'joypad1',
  0x1C: 'joyNew',
  0x20: 'ppuCtrl',
  0x24: 'bank8000',
  0x25: 'bankA000',
  0x26: 'scene',         // $26
  0x27: 'jumpIdx',       // $27
  0x28: 's28',           // $28
  0x29: 's29',           // $29
  0x2A: 'sceneType',     // $2A
  0x2B: 'sceneNum',      // $2B
  0x44: '$44',
  0x45: '$45',
  0x4A: 'counterLo',     // $4A
  0x4B: 'counterHi',     // $4B
  0x4C: 'sStat',         // $4C (scene status / rendering gate)
  0x4D: 'scriptLo',      // $4D
  0x4E: 'scriptHi',      // $4E
  0x50: 's50',
  0x52: 's52',
  0x67: 's67',
  0x78: 'nmiTimer',      // $78
  0x79: 'ppuMode',       // $79
  0x7A: '$7A',
  0x7B: '$7B',
  0xE0: 'nmiTrig',       // $E0
};

// ============================================================
// 对比逻辑
// ============================================================
function compareState(frame) {
  const diffs = [];
  const zpTsnes = [];
  const zpDisasm = [];

  // Check key ZP
  for (const addr of Object.keys(KEY_ZP).map(Number).sort((a,b) => a-b)) {
    const t = readTsnesZp(addr);
    const d = readDisasmZp(addr);
    zpTsnes.push({addr, val: t, name: KEY_ZP[addr]});
    zpDisasm.push({addr, val: d, name: KEY_ZP[addr]});
    if (t !== d) {
      diffs.push({
        path: 'ZP',
        addr: `$${H8(addr)}`,
        name: KEY_ZP[addr] || '',
        tsnes: H8(t),
        disasm: H8(d),
      });
    }
  }

  // Also check full ZP for critical diffs
  if (DUMP_FULL_ZP || diffs.length > 0) {
    for (let addr = 0; addr <= 0xFF; addr++) {
      const t = readTsnesZp(addr);
      const d = readDisasmZp(addr);
      if (t !== d && !KEY_ZP[addr]) {
        diffs.push({
          path: 'ZP',
          addr: `$${H8(addr)}`,
          name: '',
          tsnes: H8(t),
          disasm: H8(d),
        });
      }
    }
  }

  return { diffs, zpTsnes, zpDisasm };
}

// ============================================================
// 主执行逻辑
// ============================================================
console.log('=== 双路径对比: tsnes vs disasm ===');
console.log(`最大帧数: ${MAX_FRAMES} | 起始帧: ${START_AT}`);
console.log();

// 初始化双方
console.log('初始化 tsnes...');
initTsnes();
console.log('初始化 disasm...');
initDisasm();

// 初始对比
console.log('\n--- 初始状态 (boot 后) ---');
const initCompare = compareState(0);
printZpTable(initCompare.zpTsnes, initCompare.zpDisasm, initCompare.diffs);
if (initCompare.diffs.length > 0) {
  console.log(`⚠  初始差异: ${initCompare.diffs.length} 字节`);
}

// 逐帧执行并对比
let prevMask = 0;
const joypadScript = [
  // Opening 阶段: 前 30 帧无输入
  ...Array(10).fill(0x00),
  // 然后间歇按 START
  ...makePulse(30, BTN.START, 15, 10),
];

function makePulse(count, btn, hold, gap) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push((i % (hold + gap) < hold) ? btn : 0x00);
  }
  return result;
}

let firstDiffFrame = -1;
let dyingFrames = 0;

for (let f = 0; f < MAX_FRAMES; f++) {
  const mask = joypadScript[f] ?? 0x00;

  try {
    // Tsnes frame
    setJoypadTsnes(mask, prevMask);
    tsnes.frame();
  } catch(e) {
    console.log(`[F${f}] tsnes CRASH: ${e.message}`);
  }

  try {
    // Disasm frame
    setJoypadDisasm(mask);
    runDisasmFrame();
  } catch(e) {
    console.log(`[F${f}] disasm CRASH: ${e.message}`);
  }

  prevMask = mask;

  // Compare
  const cmp = compareState(f + 1);
  if (cmp.diffs.length > 0) {
    if (firstDiffFrame < 0) firstDiffFrame = f + 1;
    dyingFrames++;
    if (dyingFrames <= 3) {
      console.log(`\n[F${f + 1}] ⚠  ${cmp.diffs.length} 字节差异, joy=$${H8(mask)}:`);
      for (const d of cmp.diffs) {
        console.log(`  ZP ${d.addr} (${d.name}): tsnes=$${d.tsnes}  disasm=$${d.disasm}`);
      }
    }
  }

  // 每 10 帧汇总
  if ((f + 1) % 10 === 0) {
    const zt = cmp.zpTsnes;
    const zd = cmp.zpDisasm;
    const sceneT = zt.find(x => x.addr === 0x26)?.val ?? 0;
    const sceneD = zd.find(x => x.addr === 0x26)?.val ?? 0;
    process.stdout.write(`\r[F${String(f+1).padStart(4)}] scene=$${H8(sceneT)} dis=$${H8(sceneD)} | 差异累计: ${dyingFrames} 帧`);
  }
}

console.log();
console.log();

// 最终报告
const final = compareState(MAX_FRAMES);
console.log('=== 最终状态对比 ===');
printZpTable(final.zpTsnes, final.zpDisasm, final.diffs);

console.log();
console.log(`首次差异: F${firstDiffFrame}`);
console.log(`有差异的帧数: ${dyingFrames} / ${MAX_FRAMES}`);
console.log(`最终差异: ${final.diffs.length} 字节`);

// ============================================================
// 辅助打印
// ============================================================
function printZpTable(zt, zd, diffs) {
  const diffSet = new Set(diffs.map(d => d.addr));
  console.log('ZP addr  | 名称         | tsnes | disasm |');
  console.log('---------+-------------+-------+--------|');
  for (let i = 0; i < zt.length; i++) {
    const a = zt[i];
    const marker = diffSet.has(`$${H8(a.addr)}`) ? ' ⚠' : '  ';
    console.log(` $${H8(a.addr)}     | ${a.name.padEnd(12)}|  $${H8(a.val)}  |  $${H8(zd[i].val)}  |${marker}`);
  }
}
