/**
 * Bank 11 背景渲染引擎 — 独立测试
 * 验证 bank11_init、scrollUpdate、tileWrite、attrSetup 及 dispatch 表
 */
import { bank11_init, bank11_scrollUpdate, bank11_tileWrite, bank11_attrSetup, bank11_dispatch } from '../native-game/tsubasa/banks/prg/bank-11-code';
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

/** 创建最小 mock SystemState */
function mockSys(): SystemState {
  const mem = new Uint8Array(0x8000);
  // 预填 MMC3 bank 映射，使 $B700-$B800 可以从 bank ROM 表读取
  // 初始化常用 RAM 值
  mem[0x05D4] = 0x40; // scrollX
  mem[0x05D5] = 0x20; // scrollY
  mem[0x0628] = 0x00; // PPU 队列索引
  mem[0x0515] = 0x00;
  mem[0x0516] = 0x00;
  mem[0x05D7] = 0x00;
  mem[0x05D1] = 0x00;
  mem[0x05D9] = 0x02;
  mem[0x0523] = 0x00;
  mem[0x0524] = 0x20;
  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 },
    ppu: {} as any,
    papu: {} as any,
    mmc3Map: new Uint8Array(4),
    mmc3BankSelect: 0,
    mmc3BankData: 0,
    nmiPending: false,
    frameCount: 0,
    mmc3Shadow: 0,
  };
}

console.log('\n\u2554' + '\u2550'.repeat(50) + '\u2557');
console.log('\u2551 Bank 11 背景渲染引擎测试' + ' '.repeat(26) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

// ── 模块导出检查 ──
runTest('导出 bank11_init (函数)', () => {
  ok(typeof bank11_init === 'function');
});

runTest('导出 bank11_scrollUpdate (函数)', () => {
  ok(typeof bank11_scrollUpdate === 'function');
});

runTest('导出 bank11_tileWrite (函数)', () => {
  ok(typeof bank11_tileWrite === 'function');
});

runTest('导出 bank11_attrSetup (函数)', () => {
  ok(typeof bank11_attrSetup === 'function');
});

runTest('导出 bank11_dispatch (对象)', () => {
  ok(typeof bank11_dispatch === 'object');
  ok(bank11_dispatch !== null);
});

// ── Dispatch 表结构 ──
runTest('dispatch 表: 0x00 → bank11_init', () => {
  eq(bank11_dispatch[0x00], bank11_init);
});

runTest('dispatch 表: 0x03 → bank11_scrollUpdate', () => {
  eq(bank11_dispatch[0x03], bank11_scrollUpdate);
});

runTest('dispatch 表: 0x06 → bank11_tileWrite', () => {
  eq(bank11_dispatch[0x06], bank11_tileWrite);
});

runTest('dispatch 表: 0x09 → bank11_attrSetup', () => {
  eq(bank11_dispatch[0x09], bank11_attrSetup);
});

runTest('dispatch 表: 共 4 个入口', () => {
  eq(Object.keys(bank11_dispatch).length, 4);
});

// ── 基础执行（不 crash 即通过） ──
runTest('bank11_init 不崩溃', () => {
  const sys = mockSys();
  bank11_init(sys);
  ok(sys.mem[0x0515] !== 0, 'NMI flag should be set');
});

runTest('bank11_scrollUpdate 不崩溃', () => {
  const sys = mockSys();
  bank11_scrollUpdate(sys);
});

runTest('bank11_tileWrite 不崩溃', () => {
  const sys = mockSys();
  bank11_tileWrite(sys);
});

runTest('bank11_attrSetup 不崩溃', () => {
  const sys = mockSys();
  bank11_attrSetup(sys);
});

// ── bank11_init 设置正确标志 ──
runTest('bank11_init 设置 NMI 完成标志', () => {
  const sys = mockSys();
  sys.mem[0x0515] = 0x00;
  sys.mem[0x0628] = 0x00;
  bank11_init(sys);
  // 完成后 NMI 标志应为 0x80
  eq(sys.mem[0x0515], 0x80, 'NMI status');
});

console.log('\n\u2554' + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
