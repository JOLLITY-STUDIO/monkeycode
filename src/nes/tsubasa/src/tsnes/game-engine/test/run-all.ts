/**
 * game-engine 全部 bank 整合測試
 *
 * 測試類別:
 *   1. ROM 數據註冊 — 各 bank 數據是否正確註冊
 *   2. 系統狀態 — 創建/記憶體/MMC3 mapping
 *   3. Bank 切換 — MMC3 窗口切換正確性
 *   4. 音訊引擎 — bank12 init/update
 *   5. 場景引擎 — bank00 dispatch
 *   6. NMI 渲染 — bank02 nmi handler
 *   7. 系統庫 — bank30 乘法/除法/場景初始化
 *   8. 跨 bank 調用完整性
 */

import { createSystemState, writeMem, readMem, registerAllBanks } from '../native-game/tsubasa/banks/system-state';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';
import { getBank06Data } from '../native-game/tsubasa/banks/bank-06';
import { getBank15Data } from '../native-game/tsubasa/banks/bank-15';
import { getBank12Data, bank12_init, bank12_audioFrame } from '../native-game/tsubasa/banks/bank-12';
import { bankSwitch, bankSwitch_Win6, bankSwitch_Win7, multiply16_$CD3C, divide16_$CD0D, randomGen_$DCDF } from '../native-game/tsubasa/banks/bank-30';
import { bank00_dispatchScene, bank00_execBytecode } from '../native-game/tsubasa/banks/bank-00';
import { bank01_startGame } from '../native-game/tsubasa/banks/bank-01';
import { bank02_nmiHandler, bank02_loadSceneData } from '../native-game/tsubasa/banks/bank-02';
import { PRG_ROM_BANKS } from '../data/rom-data';

// ═════════════════════════════════════════
// 模擬 PPU/APU
// ═════════════════════════════════════════

class MockPPU {
  buffer = new Uint32Array(256 * 240);
  updateControlReg1(_v: number): void {}
  updateControlReg2(_v: number): void {}
  readStatusRegister(): number { return 0x80; }
  writeSRAMAddress(_v: number): void {}
  sramWrite(_v: number): void {}
  sramLoad(): number { return 0; }
  scrollWrite(_v: number): void {}
  writeVRAMAddress(_v: number): void {}
  vramWrite(_v: number): void {}
  vramLoad(): number { return 0; }
  sramDMA(_v: number): void {}
  startFrame(): void {}
  endFrame(): void {}
}

class MockAPU {
  writeReg(_a: number, _v: number): void {}
  readReg(_a: number): number { return 0; }
  clockFrame(_c: number): void {}
}

function makeSys(): SystemState {
  return createSystemState(new MockPPU() as any, new MockAPU() as any);
}

// ═════════════════════════════════════════
// 測試框架
// ═════════════════════════════════════════

interface TestResult { name: string; passed: boolean; error?: string; }
const results: TestResult[] = [];
let currentCategory = '';

function cat(name: string): void {
  currentCategory = name;
  console.log(`\n[${name}]`);
}

function test(name: string, fn: () => void): void {
  try {
    fn();
    results.push({ name: `${currentCategory}/${name}`, passed: true });
    console.log(`  ✅ ${name}`);
  } catch (e: any) {
    results.push({ name: `${currentCategory}/${name}`, passed: false, error: e.message });
    console.log(`  ❌ ${name}: ${e.message}`);
  }
}

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

// ═════════════════════════════════════════
// 測試
// ═════════════════════════════════════════

console.log('══════════════════════════════════════');
console.log('game-engine 全部 bank 整合測試');
console.log('══════════════════════════════════════');

// ── 注册所有 32 个 PRG-ROM bank ──
registerAllBanks(PRG_ROM_BANKS);

// ── 1. ROM 數據 ──
cat('1. ROM 數據');

test('bank-06 data not empty', () => {
  assert(getBank06Data().length === 8192, 'should be 8KB');
});

test('bank-15 data not empty', () => {
  assert(getBank15Data().length === 8192, 'should be 8KB');
});

test('bank-12 data not empty', () => {
  assert(getBank12Data().length === 8192, 'should be 8KB');
});

// ── 2. 系統狀態 ──
cat('2. 系統狀態');

test('create system state', () => {
  const sys = makeSys();
  assert(sys.mem instanceof Uint8Array, 'mem should be Uint8Array');
  assert(sys.mem.length === 0x10000, 'mem should be 64KB');
  assert(sys.mmc3Map[0] === 0, '$8000 → bank 0');
  assert(sys.mmc3Map[1] === 1, '$A000 → bank 1');
  assert(sys.mmc3Map[2] === 30, '$C000 → bank 30');
  assert(sys.mmc3Map[3] === 31, '$E000 → bank 31');
});

test('memory read/write', () => {
  const sys = makeSys();
  writeMem(sys, 0x0010, 0xAB);
  assert(sys.mem[0x0010] === 0xAB, 'ZP write');
  writeMem(sys, 0x0300, 0xCD);
  assert(sys.mem[0x0300] === 0xCD, 'RAM write');
});

test('MMC3 bank register', () => {
  const sys = makeSys();
  writeMem(sys, 0x8000, 0x06);
  writeMem(sys, 0x8001, 0x02);
  assert(sys.mmc3Map[0] === 2, 'MMC3 window 6 → bank 2');
});

// ── 3. Bank 切換 ──
cat('3. Bank 切換');

test('bankSwitch sets $24/$25 and MMC3', () => {
  const sys = makeSys();
  bankSwitch(sys, 12);
  assert(sys.mem[0x24] === 12, '$24=12');
  assert(sys.mem[0x25] === 13, '$25=13');
  assert(sys.mmc3Map[0] === 12, 'MMC3[0]=12');
  assert(sys.mmc3Map[1] === 13, 'MMC3[1]=13');
});

test('bankSwitch_Win6', () => {
  const sys = makeSys();
  bankSwitch_Win6(sys, 15);
  assert(sys.mmc3Map[0] === 15, 'MMC3[0]=15');
});

test('bankSwitch_Win7', () => {
  const sys = makeSys();
  bankSwitch_Win7(sys, 5);
  assert(sys.mmc3Map[1] === 5, 'MMC3[1]=5');
});

// ── 4. 音訊引擎 ──
cat('4. 音訊引擎 bank-12');

test('bank12_init mutes audio', () => {
  const sys = makeSys();
  bank12_init(sys);
  assert(sys.mem[0x07F2] === 0, '$07F2=0');
  assert(sys.mem[0x0700] === 0, '$0700=0');
});

test('bank12_audioFrame does not crash', () => {
  const sys = makeSys();
  bank12_init(sys);
  bank12_audioFrame(sys);
});

// ── 5. 場景引擎 ──
cat('5. 場景引擎 bank-00');

test('bank00_dispatchScene is function', () => {
  assert(typeof bank00_dispatchScene === 'function', 'should be function');
});

test('bank00_execBytecode is function', () => {
  assert(typeof bank00_execBytecode === 'function', 'should be function');
});

// ── 6. NMI 渲染 ──
cat('6. NMI 渲染 bank-02');

test('bank02_nmiHandler does not crash', () => {
  const sys = makeSys();
  sys.mem[0x0628] = 0;
  bank02_nmiHandler(sys);
});

test('bank02_loadSceneData is function', () => {
  assert(typeof bank02_loadSceneData === 'function', 'should be function');
});

// ── 7. 系統庫 ──
cat('7. 系統庫 bank-30');

test('multiply16: 6 * 7 = 42', () => {
  const sys = makeSys();
  // $67-$68 = multiplier, $69-$6A = multiplicand
  sys.mem[0x67] = 6;   // multiplier lo
  sys.mem[0x68] = 0;   // multiplier hi
  sys.mem[0x69] = 7;   // multiplicand lo
  sys.mem[0x6A] = 0;   // multiplicand hi
  multiply16_$CD3C(sys);
  const r = (sys.mem[0x6C] << 8) | sys.mem[0x6B]; // result lo 16-bit
  assert(r === 42, `6*7 should be 42, got ${r}`);
});

test('divide16: 42 / 6 = 7 r0', () => {
  const sys = makeSys();
  // $6F-$70 = dividend, $73-$74 = divisor
  sys.mem[0x6F] = 42;  // dividend lo
  sys.mem[0x70] = 0;   // dividend hi
  sys.mem[0x73] = 6;   // divisor lo
  sys.mem[0x74] = 0;   // divisor hi
  divide16_$CD0D(sys);
  const q = (sys.mem[0x70] << 8) | sys.mem[0x6F];
  const r = (sys.mem[0x72] << 8) | sys.mem[0x71];
  assert(q === 7, `quotient: ${q}`);
  assert(r === 0, `remainder: ${r}`);
});

test('randomGen: $E2 bit0 → 1 or 2', () => {
  const sys = makeSys();
  // randomGen uses $E2 bit0 + 1
  sys.mem[0xE2] = 0x01; // bit0=1 → 2
  // Clear $044E so it recalculates
  sys.mem[0x044E] = 0;
  const r = randomGen_$DCDF(sys);
  assert(r === 2, `randomGen($E2=0x01) should be 2, got ${r}`);
  assert(sys.mem[0x044E] === 2, '$044E should cache result');
});

// ── 8. 跨 bank 調用 ──
cat('8. 跨 bank 調用');

test('bank01_startGame importable', () => {
  assert(typeof bank01_startGame === 'function', 'should be function');
});

test('bank02_loadSceneData importable', () => {
  assert(typeof bank02_loadSceneData === 'function', 'should be function');
});

test('bankSwitch from bank-30 importable', () => {
  assert(typeof bankSwitch === 'function', 'should be function');
});

// ═════════════════════════════════════════
// 結果
// ═════════════════════════════════════════

console.log('\n══════════════════════════════════════');
const passed = results.filter(r => r.passed).length;
const failed = results.filter(r => !r.passed).length;
console.log(`結果: ${passed} 通過, ${failed} 失敗, 共 ${results.length} 項`);
console.log('══════════════════════════════════════');

if (failed > 0) {
  console.log('\n失敗:');
  results.filter(r => !r.passed).forEach(r => console.log(`  ❌ ${r.name}: ${r.error}`));
  process.exit(1);
}
console.log('\n全部通過！');
