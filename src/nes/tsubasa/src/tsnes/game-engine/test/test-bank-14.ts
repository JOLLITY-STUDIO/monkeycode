/**
 * Bank 14 数据提供器 — 独立测试
 * 验证 rom14、rom14Ptr16、getBank14Data 和底层数据完整性
 */
import { rom14, rom14Ptr16, getBank14Data } from '../native-game/tsubasa/banks/prg/bank-14-code';
import { PRG_BANK_14_DATA } from '../native-game/tsubasa/banks/prg/bank-14-data-only';

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
console.log('\u2551 Bank 14 数据提供器测试' + ' '.repeat(30) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

runTest('8192 字节', () => {
  eq(PRG_BANK_14_DATA.length, 8192);
  eq(getBank14Data().length, 8192);
});

runTest('首字节 = 0x04', () => {
  eq(PRG_BANK_14_DATA[0], 0x04);
  eq(rom14(0x0000), 0x04);
});

runTest('末4字节匹配 [0xE8,0xDC,0xBF,0xFF]', () => {
  eq(PRG_BANK_14_DATA[8188], 0xE8);
  eq(PRG_BANK_14_DATA[8189], 0xDC);
  eq(PRG_BANK_14_DATA[8190], 0xBF);
  eq(PRG_BANK_14_DATA[8191], 0xFF);
});

runTest('越界地址 (0x2000) wrap', () => {
  eq(rom14(0x2000), PRG_BANK_14_DATA[0]);
});

runTest('越界地址 (0x3FFF) wrap', () => {
  eq(rom14(0x3FFF), 0xFF);
});

runTest('ptr16 读取', () => {
  const lo = PRG_BANK_14_DATA[0x0100], hi = PRG_BANK_14_DATA[0x0101];
  eq(rom14Ptr16(0x0100), (hi << 8) | lo);
});

runTest('ptr16 跨 0x1FFF 边界', () => {
  const lo = PRG_BANK_14_DATA[0x1FFF], hi = PRG_BANK_14_DATA[0x0000];
  eq(rom14Ptr16(0x1FFF), (hi << 8) | lo);
});

runTest('抽样 5 点一致', () => {
  for (const off of [0x0000, 0x0400, 0x0800, 0x0C00, 0x1000])
    eq(rom14(off), PRG_BANK_14_DATA[off]);
});

runTest('完整 8KB 扫描无差异', () => {
  for (let i = 0; i < 8192; i++)
    if (rom14(i) !== PRG_BANK_14_DATA[i]) throw new Error(`mismatch at offset ${i}`);
});

runTest('getData 重复调用一致', () => {
  ok(getBank14Data() === getBank14Data());
});

runTest('模块导出均非 undefined', () => {
  ok(typeof rom14 === 'function');
  ok(typeof rom14Ptr16 === 'function');
  ok(typeof getBank14Data === 'function');
  ok(Array.isArray(PRG_BANK_14_DATA));
});

console.log('\n\u2554' + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
