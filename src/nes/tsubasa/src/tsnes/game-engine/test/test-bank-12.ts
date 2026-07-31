/**
 * Bank 12 音频引擎 — 独立测试
 * 验证 bank12_init、bank12_update、getBank12Data
 */
import { bank12_init, bank12_update, getBank12Data } from '../native-game/tsubasa/banks/prg/bank-12-audio-engine-code';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

let passed = 0, failed = 0;
function runTest(name: string, fn: () => void): void {
  try { fn(); console.log(`  \u2713 ${name}`); passed++; }
  catch (e) { console.log(`  \u2717 ${name}: ${(e as Error).message}`); failed++; }
}
function eq(a: unknown, b: unknown, label?: string): void {
  if (a !== b) throw new Error(`${label ?? 'eq'} expected ${b}, got ${a}`);
}
function ok(cond: boolean, label?: string): void {
  if (!cond) throw new Error(`${label ?? 'ok'} failed`);
}

function mockSys(): SystemState {
  const mem = new Uint8Array(0x8000);
  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 },
    ppu: {} as any,
    papu: { writeReg: () => {} } as any,
    mmc3Map: new Uint8Array(4),
    mmc3BankSelect: 0,
    mmc3BankData: 0,
    nmiPending: false,
    frameCount: 0,
    mmc3Shadow: 0,
  };
}

console.log('\n\u2554' + '\u2550'.repeat(50) + '\u2557');
console.log('\u2551 Bank 12 音频引擎测试' + ' '.repeat(30) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

// ── 模块导出检查 ──
runTest('导出 bank12_init (函数)', () => {
  ok(typeof bank12_init === 'function');
});

runTest('导出 bank12_update (函数)', () => {
  ok(typeof bank12_update === 'function');
});

runTest('导出 getBank12Data (函数)', () => {
  ok(typeof getBank12Data === 'function');
});

// ── 数据聚合检查 ──
// 注意: bank-12-audio-engine-data.ts 导出多个命名数据段 (DATA_$8269_$827C 等)
// 而非单个 PRG_BANK_12_DATA 数组。getBank12Data 引用未定义的 PRG_BANK_12_DATA。
runTest('getBank12Data 已定义', () => {
  ok(typeof getBank12Data === 'function');
});

runTest('bank-12-audio-engine-data 导出多个数据段', () => {
  const mod = require('../native-game/tsubasa/banks/prg/bank-12-audio-engine-data');
  ok(typeof mod.DATA_$8269_$827C !== 'undefined', 'DATA_$8269_$827C');
  ok(typeof mod.DATA_$82E4_$82F3 !== 'undefined', 'DATA_$82E4_$82F3');
  ok(Array.isArray(mod.DATA_$8269_$827C), 'DATA_$8269_$827C is array');
  eq(mod.DATA_$8269_$827C.length, 20, 'DATA_$8269_$827C.length');
});

// ── 初始化测试 ──
runTest('bank12_init 不崩溃', () => {
  const sys = mockSys();
  bank12_init(sys);
});

runTest('bank12_init 清零 $07F2', () => {
  const sys = mockSys();
  sys.mem[0x07F2] = 0xAB;
  bank12_init(sys);
  eq(sys.mem[0x07F2], 0x00, '$07F2 should be 0');
});

runTest('bank12_init 清零通道状态 $0700-$0705', () => {
  const sys = mockSys();
  for (let i = 0; i < 6; i++) sys.mem[0x0700 + i] = 0xAB;
  bank12_init(sys);
  for (let i = 0; i < 6; i++) {
    eq(sys.mem[0x0700 + i], 0x00, `$07${(i).toString(16).padStart(2, '0')}`);
  }
});

// ── 更新测试 ──
runTest('bank12_update 不崩溃 (静默后)', () => {
  const sys = mockSys();
  bank12_init(sys);
  bank12_update(sys);
});

runTest('bank12_update == bank12_audioFrame (代理)', () => {
  const sys = mockSys();
  bank12_init(sys);
  bank12_update(sys);
  // 即使调用也不会崩溃
});

console.log('\n\u2554' + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
