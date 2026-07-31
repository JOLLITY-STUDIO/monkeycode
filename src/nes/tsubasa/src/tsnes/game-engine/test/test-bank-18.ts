/**
 * Bank 18 数据提供器 — 独立测试
 * 验证 rom18、rom18Ptr16、getBank18Data 和底层数据完整性
 * 注意: bank-18-code.ts 缺少 PRG_BANK_18_DATA 的 import（bug），测试直接从 data-only 导入
 */
import { PRG_BANK_18_DATA } from '../native-game/tsubasa/banks/prg/bank-18-data-only';

function rom18(offset: number): number {
  return PRG_BANK_18_DATA[offset & 0x1FFF] ?? 0;
}
function rom18Ptr16(offset: number): number {
  const lo = PRG_BANK_18_DATA[offset & 0x1FFF] ?? 0;
  const hi = PRG_BANK_18_DATA[(offset + 1) & 0x1FFF] ?? 0;
  return (hi << 8) | lo;
}
function getBank18Data(): readonly number[] {
  return PRG_BANK_18_DATA;
}

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

console.log('\n\u2554' + '\u2550'.repeat(50) + '\u2557');
console.log('\u2551 Bank 18 数据提供器测试' + ' '.repeat(30) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

runTest('8192 字节', () => {
  eq(PRG_BANK_18_DATA.length, 8192);
  eq(getBank18Data().length, 8192);
});

runTest('首字节 = 0x01', () => {
  eq(PRG_BANK_18_DATA[0], 0x01);
  eq(rom18(0x0000), 0x01);
});

runTest('末4字节匹配 [0x01,0x01,0x01,0x01]', () => {
  eq(PRG_BANK_18_DATA[8188], 0x01);
  eq(PRG_BANK_18_DATA[8189], 0x01);
  eq(PRG_BANK_18_DATA[8190], 0x01);
  eq(PRG_BANK_18_DATA[8191], 0x01);
});

runTest('越界地址 (0x2000) wrap', () => {
  eq(rom18(0x2000), PRG_BANK_18_DATA[0]);
});

runTest('越界地址 (0x3FFF) wrap', () => {
  eq(rom18(0x3FFF), 0x01);
});

runTest('ptr16 读取', () => {
  const lo = PRG_BANK_18_DATA[0x0100], hi = PRG_BANK_18_DATA[0x0101];
  eq(rom18Ptr16(0x0100), (hi << 8) | lo);
});

runTest('ptr16 跨 0x1FFF 边界', () => {
  const lo = PRG_BANK_18_DATA[0x1FFF], hi = PRG_BANK_18_DATA[0x0000];
  eq(rom18Ptr16(0x1FFF), (hi << 8) | lo);
});

runTest('抽样 5 点一致', () => {
  for (const off of [0x0000, 0x0400, 0x0800, 0x0C00, 0x1000])
    eq(rom18(off), PRG_BANK_18_DATA[off]);
});

runTest('完整 8KB 扫描无差异', () => {
  for (let i = 0; i < 8192; i++)
    if (rom18(i) !== PRG_BANK_18_DATA[i]) throw new Error(`mismatch at offset ${i}`);
});

runTest('getData 重复调用一致', () => {
  ok(getBank18Data() === getBank18Data());
});

runTest('数据导出非 undefined', () => {
  ok(Array.isArray(PRG_BANK_18_DATA));
});

console.log('\n\u2554' + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
