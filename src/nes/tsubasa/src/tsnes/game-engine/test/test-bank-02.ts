/**
 * Bank 02 单元测试 — NMI Renderer
 *
 * 用法: npx tsx game-engine/test/test-bank-02.ts
 */

// ── 代码导入 ──
import {
	bank02_nmiHandler,
	bank02_ppuScrollUpdate,
	bank02_auxEntry1,
	bank02_auxEntry2,
	bank02_auxEntry8,
	bank02_sceneSwitchHelper,
	bank02_loadSceneData,
} from '../native-game/tsubasa/banks/prg/bank-02-nmi-code';

// ── 数据导入 ──
import {
	DATA_$8066_$8072,
	DATA_$8138_$815F,
	DATA_$81E4_$820B,
	DATA_$83D8_$8483,
	DATA_$84A5_$84C0,
	DATA_$8582_$85A8,
	DATA_$85B9_$85DB,
	DATA_$878E_$87BD,
	DATA_$87FB_$882E,
	DATA_$88FE_$8A05,
	DATA_$8A20_$8A46,
	DATA_$8A47_$8A96,
	DATA_$8A97_$8B2E,
	DATA_$8B2F_$9FFF,
} from '../native-game/tsubasa/banks/prg/bank-02-nmi-data';

import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ═══════════════════════════════════════════
// Mock SystemState
// ═══════════════════════════════════════════

function createMockPPU() {
	return {
		updateControlReg1: (_v: number) => {},
		updateControlReg2: (_v: number) => {},
		readStatusRegister: () => 0,
		sramLoad: () => 0,
		vramLoad: () => 0,
		writeSRAMAddress: (_v: number) => {},
		sramWrite: (_v: number) => {},
		scrollWrite: (_v: number) => {},
		writeVRAMAddress: (_v: number) => {},
		vramWrite: (_v: number) => {},
		sramDMA: (_v: number) => {},
		nes: null as any,
		writeLatch: 0,
		readLatch: 0,
	};
}

function createMockSys(): SystemState {
	const mem = new Uint8Array(0x10000);
	const mmc3Map = new Uint8Array(4);
	mmc3Map[0] = 0; mmc3Map[1] = 1; mmc3Map[2] = 30; mmc3Map[3] = 31;
	return {
		mem,
		regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 },
		ppu: createMockPPU() as any,
		papu: {} as any,
		mmc3Map,
		mmc3BankSelect: 0,
		mmc3BankData: 0,
		nmiPending: false,
		frameCount: 0,
		mmc3Shadow: 0,
	};
}

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

function eq<T extends number | boolean>(a: T, b: T, label: string) {
	if (a !== b) throw new Error(`${label}: 期望=${String(b)}, 实际=${String(a)}`);
}

function ok(cond: boolean, label: string) {
	if (!cond) throw new Error(label);
}

console.log('╔══════════════════════════════════════════════════╗');
console.log('║ Bank 02 NMI 渲染器测试                           ║');
console.log('╚══════════════════════════════════════════════════╝');

// ═══════════════════════════════════════════
// 入口函数
// ═══════════════════════════════════════════

console.log('\n── 入口函数 ──');

runTest('nmiHandler 不崩溃', () => {
	const s = createMockSys();
	bank02_nmiHandler(s);
});

runTest('ppuScrollUpdate 不崩溃', () => {
	const s = createMockSys();
	bank02_ppuScrollUpdate(s);
});

runTest('loadSceneData 不崩溃', () => {
	const s = createMockSys();
	bank02_loadSceneData(s);
});

runTest('sceneSwitchHelper 不崩溃', () => {
	const s = createMockSys();
	bank02_sceneSwitchHelper(s);
});

// ═══════════════════════════════════════════
// aux entries
// ═══════════════════════════════════════════

console.log('\n── aux entries ──');

runTest('auxEntry1 不崩溃', () => {
	const s = createMockSys();
	bank02_auxEntry1(s);
});

runTest('auxEntry2 不崩溃', () => {
	const s = createMockSys();
	bank02_auxEntry2(s);
});

runTest('auxEntry8 不崩溃', () => {
	const s = createMockSys();
	bank02_auxEntry8(s);
});

// ═══════════════════════════════════════════
// data chunks
// ═══════════════════════════════════════════

console.log('\n── data chunks ──');

const B02_CHUNKS: Array<[string, readonly number[]]> = [
	['DATA_$8066_$8072', DATA_$8066_$8072],
	['DATA_$8138_$815F', DATA_$8138_$815F],
	['DATA_$81E4_$820B', DATA_$81E4_$820B],
	['DATA_$83D8_$8483', DATA_$83D8_$8483],
	['DATA_$84A5_$84C0', DATA_$84A5_$84C0],
	['DATA_$8582_$85A8', DATA_$8582_$85A8],
	['DATA_$85B9_$85DB', DATA_$85B9_$85DB],
	['DATA_$878E_$87BD', DATA_$878E_$87BD],
	['DATA_$87FB_$882E', DATA_$87FB_$882E],
	['DATA_$88FE_$8A05', DATA_$88FE_$8A05],
	['DATA_$8A20_$8A46', DATA_$8A20_$8A46],
	['DATA_$8A47_$8A96', DATA_$8A47_$8A96],
	['DATA_$8A97_$8B2E', DATA_$8A97_$8B2E],
	['DATA_$8B2F_$9FFF', DATA_$8B2F_$9FFF],
];

const b02Total = B02_CHUNKS.reduce((s, [, d]) => s + d.length, 0);

for (const [name, data] of B02_CHUNKS) {
	runTest(name, () => {
		ok(data.length > 0, `${name}: 空数组`);
		ok(data.every((b, i) => b >= 0 && b <= 0xFF), `${name}: 有非法字节`);
	});
}

runTest(`总字节 ${b02Total} ≤ 8192`, () => {
	ok(b02Total > 100 && b02Total <= 8192, `bank-02 分块总字节=${b02Total}`);
});

// ═══════════════════════════════════════════
// 模块导出验证
// ═══════════════════════════════════════════

console.log('\n── 模块导出 ──');

const B02_EXPORTS: Array<[string, unknown]> = [
	['bank02_nmiHandler', bank02_nmiHandler],
	['bank02_ppuScrollUpdate', bank02_ppuScrollUpdate],
	['bank02_auxEntry1', bank02_auxEntry1],
];

for (const [name, fn] of B02_EXPORTS) {
	runTest(`export ${name}`, () => {
		ok(fn !== undefined && fn !== null, `${name} is undefined`);
		eq(typeof fn, 'function', `${name} 类型`);
	});
}

// ═══════════════════════════════════════════
// 结果
// ═══════════════════════════════════════════

console.log(`\n╔══════════════════════════════════════════════╗`);
console.log(`║  测试结果: ${passed} passed / ${failed} failed`);
if (failed > 0) {
	console.log(`║  失败列表:`);
	for (const f of failList) console.log(`║    ✗ ${f}`);
}
console.log(`╚══════════════════════════════════════════════╝`);

process.exit(failed > 0 ? 1 : 0);
