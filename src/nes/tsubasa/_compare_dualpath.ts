/**
 * 双路径对比工具: tsnes (6502 CPU) vs disasm (TS 翻译)
 * 相同输入 → 逐帧对比 ZP + 关键内存状态 → 找分歧点
 *
 * 用法: npx tsx _compare_dualpath.ts [--max-frames N]
 */
import { GameContext } from './src/disasm/_context';
import { allBanks } from './src/disasm/banks/index';
import { ROM as rom00 } from './src/disasm/banks/_romdata/bank_00_data';
import { ROM as rom01 } from './src/disasm/banks/_romdata/bank_01_data';
import { ROM as rom02 } from './src/disasm/banks/_romdata/bank_02_data';
import { ROM as rom03 } from './src/disasm/banks/_romdata/bank_03_data';
import { ROM as rom04 } from './src/disasm/banks/_romdata/bank_04_data';
import { ROM as rom05 } from './src/disasm/banks/_romdata/bank_05_data';
import { ROM as rom06 } from './src/disasm/banks/_romdata/bank_06_data';
import { ROM as rom07 } from './src/disasm/banks/_romdata/bank_07_data';
import { ROM as rom08 } from './src/disasm/banks/_romdata/bank_08_data';
import { ROM as rom09 } from './src/disasm/banks/_romdata/bank_09_data';
import { ROM as rom10 } from './src/disasm/banks/_romdata/bank_10_data';
import { ROM as rom11 } from './src/disasm/banks/_romdata/bank_11_data';
import { ROM as rom12 } from './src/disasm/banks/_romdata/bank_12_data';
import { ROM as rom13 } from './src/disasm/banks/_romdata/bank_13_data';
import { ROM as rom14 } from './src/disasm/banks/_romdata/bank_14_data';
import { ROM as rom15 } from './src/disasm/banks/_romdata/bank_15_data';
import { ROM as rom16 } from './src/disasm/banks/_romdata/bank_16_data';
import { ROM as rom17 } from './src/disasm/banks/_romdata/bank_17_data';
import { ROM as rom18 } from './src/disasm/banks/_romdata/bank_18_data';
import { ROM as rom19 } from './src/disasm/banks/_romdata/bank_19_data';
import { ROM as rom20 } from './src/disasm/banks/_romdata/bank_20_data';
import { ROM as rom21 } from './src/disasm/banks/_romdata/bank_21_data';
import { ROM as rom22 } from './src/disasm/banks/_romdata/bank_22_data';
import { ROM as rom23 } from './src/disasm/banks/_romdata/bank_23_data';
import { ROM as rom24 } from './src/disasm/banks/_romdata/bank_24_data';
import { ROM as rom25 } from './src/disasm/banks/_romdata/bank_25_data';
import { ROM as rom26 } from './src/disasm/banks/_romdata/bank_26_data';
import { ROM as rom27 } from './src/disasm/banks/_romdata/bank_27_data';
import { ROM as rom28 } from './src/disasm/banks/_romdata/bank_28_data';
import { ROM as rom29 } from './src/disasm/banks/_romdata/bank_29_data';
import { ROM as rom30 } from './src/disasm/banks/_romdata/bank_30_data';
import { ROM as rom31 } from './src/disasm/banks/_romdata/bank_31_data';
import { ROM as rom32 } from './src/disasm/banks/_romdata/bank_32_data';
import { ROM as rom33 } from './src/disasm/banks/_romdata/bank_33_data';
import { ROM as rom34 } from './src/disasm/banks/_romdata/bank_34_data';
import { ROM as rom35 } from './src/disasm/banks/_romdata/bank_35_data';
import { ROM as rom36 } from './src/disasm/banks/_romdata/bank_36_data';
import { ROM as rom37 } from './src/disasm/banks/_romdata/bank_37_data';
import { ROM as rom38 } from './src/disasm/banks/_romdata/bank_38_data';
import { ROM as rom39 } from './src/disasm/banks/_romdata/bank_39_data';
import { ROM as rom40 } from './src/disasm/banks/_romdata/bank_40_data';
import { ROM as rom41 } from './src/disasm/banks/_romdata/bank_41_data';
import { ROM as rom42 } from './src/disasm/banks/_romdata/bank_42_data';
import { ROM as rom43 } from './src/disasm/banks/_romdata/bank_43_data';
import { ROM as rom44 } from './src/disasm/banks/_romdata/bank_44_data';
import { ROM as rom45 } from './src/disasm/banks/_romdata/bank_45_data';
import { ROM as rom46 } from './src/disasm/banks/_romdata/bank_46_data';
import { ROM as rom47 } from './src/disasm/banks/_romdata/bank_47_data';
import { TsubasaNes } from './src/tsnes/tsubasa-code/tsubasa_nes';

// ============================================================
// 配置
// ============================================================
const args = process.argv.slice(2);
const MAX_FRAMES = parseInt(args.find((_, i) => args[i - 1] === '--max-frames') ?? '30');

const H8 = (v: number) => (v & 0xFF).toString(16).toUpperCase().padStart(2, '0');

// ============================================================
// 路径 A: tsnes (6502 CPU 模拟器)
// ============================================================
let tsnes: any;

function initTsnes() {
  tsnes = new TsubasaNes({
    onFrame: (_buf: any) => {},
    emulateSound: false,
  });
}

function readTsnesZp(addr: number): number {
  return tsnes.cpu.mem[addr];
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

let disasmCtx: GameContext;
let disasmBank8000 = 0;
let disasmBankA000 = 1;

function bankSlice(n: number) {
  const d = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[n]?.[i] ?? 0;
  return {
    u8(o: number) { return d[o] ?? 0; },
    u16le(o: number) { return (this.u8(o)) | (this.u8(o + 1) << 8); },
    data: d,
    romBase: n * PRG_BANK_SIZE,
  };
}

const disasmReader = {
  bank(a: number) {
    const ca = a & 0xFFFF;
    let bn: number;
    if (ca >= 0xE000) bn = TOTAL_BANKS - 1;
    else if (ca >= 0xC000) bn = TOTAL_BANKS - 2;
    else if (ca >= 0xA000) bn = disasmBankA000;
    else bn = disasmBank8000;
    return bankSlice(bn);
  },
  u8(a: number) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a: number) { return this.bank(a).u16le(a & 0x1FFF); },
};

function initDisasm() {
  disasmCtx = new GameContext();
  const origSet = disasmCtx.ram.setU8.bind(disasmCtx.ram);
  disasmCtx.ram.setU8 = (a: number, v: number) => {
    origSet(a, v);
    if (a === 0x8001) {
      const sel = disasmCtx.ram.u8(0x8000) & 0x07;
      if (sel === 6) disasmBank8000 = v;
      if (sel === 7) disasmBankA000 = v;
    }
  };
  disasmCtx.ram.setU8(0x24, 0);
  disasmCtx.ram.setU8(0x25, 1);
}

function runDisasmFrame() {
  if (disasmBank8000 === 0) {
    allBanks[0]?.dispatch(disasmCtx, disasmReader);
  }
}

function readDisasmZp(addr: number): number {
  return disasmCtx.ram.u8(addr);
}

// ============================================================
// Joypad
// ============================================================
const BTN = { A:0x01, B:0x02, SELECT:0x04, START:0x08, UP:0x10, DOWN:0x20, LEFT:0x40, RIGHT:0x80 };

function setJoypadTsnes(mask: number, prevMask: number = 0) {
  const buttons = [0,1,2,3,4,5,6,7];
  for (const btn of buttons) {
    const was = (prevMask >> btn) & 1;
    const now = (mask >> btn) & 1;
    if (now && !was) tsnes.buttonDown(1, btn);
    if (!now && was) tsnes.buttonUp(1, btn);
  }
}

function setJoypadDisasm(mask: number) {
  const prev = disasmCtx.ram.u8(0x1B);
  disasmCtx.ram.setU8(0x1B, mask);
  disasmCtx.ram.setU8(0x1C, mask & ~prev);
  disasmCtx.ram.setU8(0x1D, prev);
}

// ============================================================
// 关键 ZP
// ============================================================
const KEY_ZP: Record<number, string> = {
  0x1B:'joypad', 0x1C:'joyNew', 0x20:'ppuCtrl',
  0x24:'bank8', 0x25:'bankA', 0x26:'scene', 0x27:'jumpIdx',
  0x28:'s28', 0x29:'s29', 0x2A:'scnType', 0x2B:'scnNum',
  0x44:'$44', 0x45:'$45', 0x4A:'ctrLo', 0x4B:'ctrHi',
  0x4C:'sStat', 0x4D:'scrLo', 0x4E:'scrHi',
  0x52:'$52', 0x67:'$67', 0x78:'nmiTmr', 0x79:'ppuMode',
  0x7A:'$7A', 0x7B:'$7B', 0xE0:'nmiTrig',
};

// ============================================================
// 对比
// ============================================================
function compareState(frame: number) {
  const diffs: string[] = [];
  const keys = Object.keys(KEY_ZP).map(Number).sort((a,b)=>a-b);

  for (const addr of keys) {
    const t = readTsnesZp(addr);
    const d = readDisasmZp(addr);
    if (t !== d) {
      diffs.push(`ZP${H8(addr)}(${KEY_ZP[addr]}): tsnes=$${H8(t)} disasm=$${H8(d)}`);
    }
  }

  // Also full ZP scan if diffs found
  if (diffs.length > 0) {
    for (let addr = 0; addr <= 0xFF; addr++) {
      if (KEY_ZP[addr]) continue;
      const t = readTsnesZp(addr);
      const d = readDisasmZp(addr);
      if (t !== d) {
        diffs.push(`ZP${H8(addr)}: tsnes=$${H8(t)} disasm=$${H8(d)}`);
      }
    }
  }

  return diffs;
}

// ============================================================
// Main
// ============================================================
console.log('=== 双路径对比: tsnes(6502) vs disasm(TS) ===');
console.log(`最大帧: ${MAX_FRAMES}`);
console.log();

// Init tsnes
console.log('加载 tsnes...');
initTsnes();
// Boot warmup: frame 0 is first actual VBlank
console.log('tsnes boot: running frame 0...');
tsnes.frame();
tsnes.frame();

// Init disasm
console.log('加载 disasm...');
initDisasm();
// Boot: call RESET then one frame
if (allBanks[31]?.fns?.['$FFF0']) {
  allBanks[31].fns['$FFF0'](disasmCtx, disasmReader);
}
runDisasmFrame();

// Post-boot compare
const bootDiffs = compareState(0);
console.log(`\n[F0] boot 后差异: ${bootDiffs.length} 处`);
for (const d of bootDiffs) console.log('  ' + d);

// Get initial key values
const getKeys = (read: (a: number) => number) => {
  const o: Record<string, string> = {};
  for (const [k, v] of Object.entries(KEY_ZP)) {
    o[v] = H8(read(Number(k)));
  }
  return o;
};

const tsInit = getKeys(readTsnesZp);
const dsInit = getKeys(readDisasmZp);

console.log('\n初始状态:');
const kk = Object.keys(KEY_ZP).map(Number).sort((a,b)=>a-b);
console.log('Addr | Name    | tsnes | disasm');
console.log('-----+---------+-------+------');
for (const a of kk) {
  const name = KEY_ZP[a];
  console.log(` $${H8(a)} | ${name.padEnd(8)}|  $${H8(readTsnesZp(a))}  |  $${H8(readDisasmZp(a))}  ${readTsnesZp(a) !== readDisasmZp(a) ? '⚠' : ''}`);
}

// 逐帧执行
console.log('\n逐帧执行...');
let prevMask = 0;
const joypadScript = [
  0x00,0x00,0x00,0x00,0x00,  // 帧 1-5: 无输入
  0x08,0x08,0x00,0x00,0x00,  // 帧 6-7: START, 8-10: 释放
  0x00,0x00,0x00,0x00,0x00,  // 帧 11-15: 无
  0x08,0x08,0x08,0x00,0x00, // 帧 16-18: START hold
  0x00,0x00,0x00,0x00,0x00, // ...
  0x00,0x00,0x00,0x00,0x00,
];

let firstDiffFrame = -1;
let dyingFrames = 0;

for (let f = 0; f < MAX_FRAMES; f++) {
  const mask = joypadScript[f] ?? 0x00;

  try {
    setJoypadTsnes(mask, prevMask);
    tsnes.frame();
  } catch(e: any) {
    console.log(`[F${f+1}] tsnes CRASH: ${e.message}`);
  }

  try {
    setJoypadDisasm(mask);
    runDisasmFrame();
  } catch(e: any) {
    console.log(`[F${f+1}] disasm CRASH: ${e.message}`);
  }

  prevMask = mask;

  const diffs = compareState(f + 1);
  if (diffs.length > 0) {
    if (firstDiffFrame < 0) firstDiffFrame = f + 1;
    dyingFrames++;

    // 首次差异详细打印
    if (dyingFrames <= 8) {
      const tsScene = H8(readTsnesZp(0x26));
      const dsScene = H8(readDisasmZp(0x26));
      const tsJmp = H8(readTsnesZp(0x27));
      const dsJmp = H8(readDisasmZp(0x27));
      const ts4C = H8(readTsnesZp(0x4C));
      const ds4C = H8(readDisasmZp(0x4C));

      console.log(`\n[F${f+1}] ⚠ ${diffs.length} 差异 | joy=$${H8(mask)}`);
      console.log(`  scene: tsnes=$${tsScene} disasm=$${dsScene}`);
      console.log(`  jumpIdx: tsnes=$${tsJmp} disasm=$${dsJmp}`);
      console.log(`  sStat: tsnes=$${ts4C} disasm=$${ds4C}`);
      for (const d of diffs.slice(0, 5)) console.log('  ' + d);
      if (diffs.length > 5) console.log(`  ...还有 ${diffs.length-5} 处差异`);
    }
  }

  if ((f + 1) % 10 === 0) {
    process.stdout.write(`\rF${String(f+1).padStart(3)} | scene:ts=$${H8(readTsnesZp(0x26))} ds=$${H8(readDisasmZp(0x26))} | 差异帧: ${dyingFrames}`);
  }
}

console.log('\n');

// 最终对比
const finalDiffs = compareState(MAX_FRAMES);
console.log('=== 最终状态对比 ===');
const tsFinal = getKeys(readTsnesZp);
const dsFinal = getKeys(readDisasmZp);
console.log('Addr | Name    | tsnes | disasm');
console.log('-----+---------+-------+------');
for (const a of kk) {
  const name = KEY_ZP[a];
  console.log(` $${H8(a)} | ${name.padEnd(8)}|  $${H8(readTsnesZp(a))}  |  $${H8(readDisasmZp(a))}  ${readTsnesZp(a) !== readDisasmZp(a) ? '⚠' : ''}`);
}

console.log();
console.log(`首次差异: ${firstDiffFrame < 0 ? '无' : 'F'+firstDiffFrame}`);
console.log(`差异帧数: ${dyingFrames} / ${MAX_FRAMES}`);
console.log(`最终差异: ${finalDiffs.length} 处`);
