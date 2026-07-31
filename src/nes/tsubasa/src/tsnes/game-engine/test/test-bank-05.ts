/**
 * Bank 05 单元测试 — ROM 数据提供器
 *
 * 用法: npx tsx game-engine/test/test-bank-05.ts
 */

import { rom05, rom05Ptr16, getBank05Data } from '../native-game/tsubasa/banks/prg/bank-05-code';
import { PRG_BANK_05_DATA } from '../native-game/tsubasa/banks/prg/bank-05-data-only';

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
console.log('║ Bank 05 数据提供器测试                           ║');
console.log('╚══════════════════════════════════════════════════╝');
console.log('');

const raw = PRG_BANK_05_DATA;

// 基本属性
runTest('8192 字节', () => { eq(raw.length, 8192, 'rawData.length'); eq(getBank05Data().length, 8192, 'getData().length'); });
runTest('首字节 = 0x80', () => { eq(rom05(0), 0x80, 'rom05(0)'); });
runTest('末4字节匹配 (全 0xFF)', () => {
	const last = [0xFF, 0xFF, 0xFF, 0xFF];
	for (let i = 0; i < 4; i++) eq(rom05(0x1FFF - 3 + i), last[i], `rom05(0x${(0x1FFF-3+i).toString(16)})`);
});

// 访问接口
runTest('越界地址 (0x2000) wrap', () => { eq(rom05(0x2000), rom05(0), 'rom05(0x2000)'); });
runTest('越界地址 (0x3FFF) wrap', () => { eq(rom05(0x3FFF), rom05(0x1FFF), 'rom05(0x3FFF)'); });
runTest('ptr16 读取', () => { eq(rom05Ptr16(0), ((raw[1] << 8) | raw[0]), 'rom05Ptr16(0)'); });
runTest('ptr16 跨 0x1FFF 边界', () => { eq(rom05Ptr16(0x1FFF), ((raw[0] << 8) | raw[0x1FFF]) & 0xFFFF, 'rom05Ptr16(0x1FFF)'); });

// 抽样验证
runTest('抽样 5 点一致', () => {
	for (const off of [0, 2048, 4096, 6144, 8191]) eq(rom05(off), raw[off], `offset 0x${off.toString(16)}`);
});

runTest('完整 8KB 扫描无差异', () => {
	let mismatches = 0;
	for (let i = 0; i < 8192; i++) { if (rom05(i) !== raw[i]) mismatches++; }
	eq(mismatches, 0, `${mismatches} 字节不匹配`);
});

runTest('getData 重复调用一致', () => {
	const d1 = getBank05Data(), d2 = getBank05Data();
	for (let i = 0; i < 8192; i += 256) eq(d1[i], d2[i], `index ${i}`);
});

runTest('模块导出均非 undefined', () => {
	ok(typeof rom05 === 'function', 'rom05');
	ok(typeof rom05Ptr16 === 'function', 'rom05Ptr16');
	ok(typeof getBank05Data === 'function', 'getBank05Data');
});

// ═══════════════════════════════════════════
// 结果
// ═══════════════════════════════════════════

console.log(`\n╔══════════════════════════════════════════════╗`);
console.log(`║  测试结果: ${passed} passed / ${failed} failed`);
if (failed > 0) { console.log(`║  失败列表:`); for (const f of failList) console.log(`║    ✗ ${f}`); }
console.log(`╚══════════════════════════════════════════════╝`);

process.exit(failed > 0 ? 1 : 0);
