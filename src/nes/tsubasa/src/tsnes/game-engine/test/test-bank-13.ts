/**
 * Bank 13 数据提供器 — 独立测试
 * 验证 rom13、rom13Ptr16、getBank13Data 和底层数据完整性
 */
import { rom13, rom13Ptr16, getBank13Data } from '../native-game/tsubasa/banks/prg/bank-13-code';
import { PRG_BANK_13_DATA } from '../native-game/tsubasa/banks/prg/bank-13-data-only';

// ── 测试框架 ──
let passed = 0, failed = 0;
function runTest(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`  \u2713 ${name}`);
    passed++;
  } catch (e) {
    console.log(`  \u2717 ${name}: ${(e as Error).message}`);
    failed++;
  }
}
function eq(a: unknown, b: unknown, label?: string): void {
  if (a !== b) throw new Error(`${label ?? 'eq'} expected ${b}, got ${a}`);
}
function ok(cond: boolean, label?: string): void {
  if (!cond) throw new Error(`${label ?? 'ok'} failed`);
}

// ── 测试 ──
console.log('\n\u2554' + '\u2550'.repeat(50) + '\u2557');
console.log('\u2551 Bank 13 数据提供器测试' + ' '.repeat(30) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

runTest('8192 字节', () => {
  eq(PRG_BANK_13_DATA.length, 8192, 'PRG_BANK_13_DATA.length');
  eq(getBank13Data().length, 8192, 'getBank13Data().length');
});

runTest('首字节 = 0x04', () => {
  eq(PRG_BANK_13_DATA[0], 0x04, 'DATA[0]');
  eq(rom13(0x0000), 0x04, 'rom13(0x0000)');
});

runTest('末4字节匹配 (全 0xFF)', () => {
  const last4 = PRG_BANK_13_DATA.slice(-4);
  eq(last4[0], 0xFF, 'last4[0]');
  eq(last4[1], 0xFF, 'last4[1]');
  eq(last4[2], 0xFF, 'last4[2]');
  eq(last4[3], 0xFF, 'last4[3]');
  eq(rom13(0x1FFF), 0xFF, 'rom13(0x1FFF)');
});

runTest('越界地址 (0x2000) wrap', () => {
  eq(rom13(0x2000), PRG_BANK_13_DATA[0], '0x2000 wrap→0');
});

runTest('越界地址 (0x3FFF) wrap', () => {
  eq(rom13(0x3FFF), 0xFF, '0x3FFF wrap→0x1FFF');
});

runTest('ptr16 读取', () => {
  const lo = PRG_BANK_13_DATA[0x0100];
  const hi = PRG_BANK_13_DATA[0x0101];
  const expected = (hi << 8) | lo;
  eq(rom13Ptr16(0x0100), expected, 'rom13Ptr16(0x0100)');
});

runTest('ptr16 跨 0x1FFF 边界', () => {
  const lo = PRG_BANK_13_DATA[0x1FFF];
  const hi = PRG_BANK_13_DATA[0x0000];
  const expected = (hi << 8) | lo;
  eq(rom13Ptr16(0x1FFF), expected, 'rom13Ptr16(0x1FFF)');
});

runTest('抽样 5 点一致', () => {
  const points = [0x0000, 0x0400, 0x0800, 0x0C00, 0x1000];
  for (const off of points) {
    eq(rom13(off), PRG_BANK_13_DATA[off], `offset 0x${off.toString(16)}`);
  }
});

runTest('完整 8KB 扫描无差异', () => {
  for (let i = 0; i < 8192; i++) {
    if (rom13(i) !== PRG_BANK_13_DATA[i]) {
      throw new Error(`mismatch at offset ${i}`);
    }
  }
});

runTest('getData 重复调用一致', () => {
  const d1 = getBank13Data();
  const d2 = getBank13Data();
  ok(d1 === d2, 'should return same reference');
  eq(d2.length, 8192);
});

runTest('模块导出均非 undefined', () => {
  ok(typeof rom13 === 'function', 'rom13');
  ok(typeof rom13Ptr16 === 'function', 'rom13Ptr16');
  ok(typeof getBank13Data === 'function', 'getBank13Data');
  ok(Array.isArray(PRG_BANK_13_DATA), 'PRG_BANK_13_DATA');
});

// ── 结果 ──
console.log('\n\u2554' + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
