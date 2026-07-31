/**
 * Bank 08 单元测试 — ROM 数据提供器
 *
 * 用法: npx tsx game-engine/test/test-bank-08.ts
 */

import { rom08, rom08Ptr16, getBank08Data } from '../native-game/tsubasa/banks/prg/bank-08-code';
import { PRG_BANK_08_DATA } from '../native-game/tsubasa/banks/prg/bank-08-data-only';

// ═══════════════════════════════════════════
// 测试框架
// ═══════════════════════════════════════════

let passed = 0, failed = 0;
const failList: string[] = [];

function runTest(name: string, fn: () => void) {
	let ok = true;
	try { fn(); } catch (e) {
		ok = false;
		failList.push(name);
		console.log(`  ✗ ${name}`);
		console.log(`    ${String(e).split('\n')[0]}`);
	}
	if (ok) { passed++; console.log(`  ✓ ${name}`); }
	else failed++;
}

function eq(a: number, b: number, label: string) {
	if (a !== b) throw new Error(`${label}: 期望=${b}, 实际=${a}`);
}

function ok(cond: boolean, label: string) {
	if (!cond) throw new Error(label);
}

console.log('╔══════════════════════════════════════════════════╗');
console.log('║ Bank 08 数据提供器测试                           ║');
console.log('╚══════════════════════════════════════════════════╝');
console.log('');

const raw = PRG_BANK_08_DATA;

// 基本属性
runTest('8192 字节', () => { eq(raw.length, 8192, 'rawData.length'); eq(getBank08Data().length, 8192, 'getData().length'); });
runTest('首字节 = 0xAA', () => { eq(rom08(0), 0xAA, 'rom08(0)'); });
runTest('末4字节匹配 (全 0xFF)', () => {
	const last = [0xFF, 0xFF, 0xFF, 0xFF];
	for (let i = 0; i < 4; i++) eq(rom08(0x1FFF - 3 + i), last[i], `rom08(0x${(0x1FFF-3+i).toString(16)})`);
});

// 访问接口
runTest('越界地址 (0x2000) wrap', () => { eq(rom08(0x2000), rom08(0), 'rom08(0x2000)'); });
runTest('越界地址 (0x3FFF) wrap', () => { eq(rom08(0x3FFF), rom08(0x1FFF), 'rom08(0x3FFF)'); });
runTest('ptr16 读取', () => { eq(rom08Ptr16(0), ((raw[1] << 8) | raw[0]), 'rom08Ptr16(0)'); });
runTest('ptr16 跨 0x1FFF 边界', () => { eq(rom08Ptr16(0x1FFF), ((raw[0] << 8) | raw[0x1FFF]) & 0xFFFF, 'rom08Ptr16(0x1FFF)'); });

// 抽样验证
runTest('抽样 5 点一致', () => {
	for (const off of [0, 2048, 4096, 6144, 8191]) eq(rom08(off), raw[off], `offset 0x${off.toString(16)}`);
});

runTest('完整 8KB 扫描无差异', () => {
	let mismatches = 0;
	for (let i = 0; i < 8192; i++) { if (rom08(i) !== raw[i]) mismatches++; }
	eq(mismatches, 0, `${mismatches} 字节不匹配`);
});

runTest('getData 重复调用一致', () => {
	const d1 = getBank08Data(), d2 = getBank08Data();
	for (let i = 0; i < 8192; i += 256) eq(d1[i], d2[i], `index ${i}`);
});

runTest('模块导出均非 undefined', () => {
	ok(typeof rom08 === 'function', 'rom08');
	ok(typeof rom08Ptr16 === 'function', 'rom08Ptr16');
	ok(typeof getBank08Data === 'function', 'getBank08Data');
});

// ═══════════════════════════════════════════
// 结果
// ═══════════════════════════════════════════

console.log(`\n╔══════════════════════════════════════════════╗`);
console.log(`║  测试结果: ${passed} passed / ${failed} failed`);
if (failed > 0) { console.log(`║  失败列表:`); for (const f of failList) console.log(`║    ✗ ${f}`); }
console.log(`╚══════════════════════════════════════════════╝`);

process.exit(failed > 0 ? 1 : 0);
