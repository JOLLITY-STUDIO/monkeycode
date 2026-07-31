/**
 * Bank 01 单元测试 — Match Jump / Title
 *
 * 用法: npx tsx game-engine/test/test-bank-01.ts
 */

// ── 代码导入 ──
import {
	bank01_titleInit,
	bank01_titleProcess,
	bank01_startGame,
	bank01_crossBankEntry,
	bank01_auxEntry1,
	bank01_auxEntry2,
	bank01_auxEntry3,
	bank01_auxEntry4,
	bank01_auxEntry5,
	bank01_auxEntry6,
	bank01_auxEntry7,
	bank01_auxEntry8,
	bank01_loadSceneData,
	bank01_bytecodeHelper,
	bank01_bytecodeHelper2,
	bank01_sceneSwitchHelper1,
} from '../native-game/tsubasa/banks/prg/bank-01-code';

// ── 数据导入 ──
import {
	DATA_$8000_$8002,
	DATA_$89D4_$89E1,
	DATA_$8D8A_$8D9D,
	DATA_$8D9E_$8DE8,
	DATA_$9113_$912E,
	DATA_$914D_$9198,
	DATA_$91E8_$9240,
	DATA_$9241_$9254,
	DATA_$9255_$92FC,
	DATA_$92FD_$9392,
	DATA_$9393_$93B4,
	DATA_$93B5_$93D6,
	DATA_$93D7_$93E7,
	DATA_$93E8_$93F8,
	DATA_$93F9_$9409,
	DATA_$940A_$941A,
	DATA_$941B_$943C,
	DATA_$943D_$96DA,
	DATA_$96DB_$99E1,
	DATA_$99E2_$99FA,
	DATA_$99FB_$9A07,
	DATA_$9A08_$9A4B,
	DATA_$9A4C_$9A8F,
	DATA_$9A90_$9B3C,
	DATA_$9B3D_$9B7C,
	DATA_$9B7D_$9BA3,
	DATA_$9BA4_$9BC7,
	DATA_$9BC8_$9C57,
	DATA_$9C58_$9CF2,
	DATA_$9CF3_$9D73,
	DATA_$9D74_$9DA7,
	DATA_$9DA8_$9DF1,
	DATA_$9DF2_$9F14,
	DATA_$9F15_$9FFF,
} from '../native-game/tsubasa/banks/prg/bank-01-data';

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
console.log('║ Bank 01 比赛跳跃 / 标题测试                      ║');
console.log('╚══════════════════════════════════════════════════╝');

// ═══════════════════════════════════════════
// 入口函数
// ═══════════════════════════════════════════

console.log('\n── 入口函数 ──');

runTest('titleInit 不崩溃', () => {
	const s = createMockSys();
	bank01_titleInit(s);
});

runTest('titleProcess 不崩溃', () => {
	const s = createMockSys();
	bank01_titleInit(s);
	bank01_titleProcess(s);
});

runTest('startGame 不崩溃', () => {
	const s = createMockSys();
	bank01_startGame(s);
});

runTest('crossBankEntry 不崩溃', () => {
	const s = createMockSys();
	bank01_crossBankEntry(s);
});

runTest('loadSceneData 不崩溃', () => {
	const s = createMockSys();
	bank01_loadSceneData(s);
});

// ═══════════════════════════════════════════
// aux entries
// ═══════════════════════════════════════════

console.log('\n── aux entries ──');

const auxFns: Array<[string, (s: SystemState) => any]> = [
	['auxEntry1', bank01_auxEntry1],
	['auxEntry2', bank01_auxEntry2],
	['auxEntry3', bank01_auxEntry3],
	['auxEntry4', bank01_auxEntry4],
	['auxEntry5', bank01_auxEntry5],
	['auxEntry6', bank01_auxEntry6],
	['auxEntry7', bank01_auxEntry7],
	['auxEntry8', bank01_auxEntry8],
];

for (const [name, fn] of auxFns) {
	runTest(`${name} 不崩溃`, () => {
		const s = createMockSys();
		fn(s);
	});
}

// ═══════════════════════════════════════════
// bytecode helpers
// ═══════════════════════════════════════════

console.log('\n── bytecode helpers ──');

runTest('bytecodeHelper 返回数字', () => {
	const s = createMockSys();
	eq(typeof bank01_bytecodeHelper(s), 'number', '返回值类型');
});

runTest('bytecodeHelper2 不崩溃', () => {
	const s = createMockSys();
	bank01_bytecodeHelper2(s);
});

// ═══════════════════════════════════════════
// sceneSwitchHelper1
// ═══════════════════════════════════════════

console.log('\n── sceneSwitchHelper1 ──');

runTest('不崩溃', () => {
	const s = createMockSys();
	bank01_sceneSwitchHelper1(s);
});

runTest('寄存器 A=3', () => {
	const s = createMockSys();
	bank01_sceneSwitchHelper1(s);
	eq(s.regs.A, 3, 'regs.A');
});

// ═══════════════════════════════════════════
// data chunks
// ═══════════════════════════════════════════

console.log('\n── data chunks ──');

const B01_CHUNKS: Array<[string, readonly number[]]> = [
	['DATA_$8000_$8002', DATA_$8000_$8002],
	['DATA_$89D4_$89E1', DATA_$89D4_$89E1],
	['DATA_$8D8A_$8D9D', DATA_$8D8A_$8D9D],
	['DATA_$8D9E_$8DE8', DATA_$8D9E_$8DE8],
	['DATA_$9113_$912E', DATA_$9113_$912E],
	['DATA_$914D_$9198', DATA_$914D_$9198],
	['DATA_$91E8_$9240', DATA_$91E8_$9240],
	['DATA_$9241_$9254', DATA_$9241_$9254],
	['DATA_$9255_$92FC', DATA_$9255_$92FC],
	['DATA_$92FD_$9392', DATA_$92FD_$9392],
	['DATA_$9393_$93B4', DATA_$9393_$93B4],
	['DATA_$93B5_$93D6', DATA_$93B5_$93D6],
	['DATA_$93D7_$93E7', DATA_$93D7_$93E7],
	['DATA_$93E8_$93F8', DATA_$93E8_$93F8],
	['DATA_$93F9_$9409', DATA_$93F9_$9409],
	['DATA_$940A_$941A', DATA_$940A_$941A],
	['DATA_$941B_$943C', DATA_$941B_$943C],
	['DATA_$943D_$96DA', DATA_$943D_$96DA],
	['DATA_$96DB_$99E1', DATA_$96DB_$99E1],
	['DATA_$99E2_$99FA', DATA_$99E2_$99FA],
	['DATA_$99FB_$9A07', DATA_$99FB_$9A07],
	['DATA_$9A08_$9A4B', DATA_$9A08_$9A4B],
	['DATA_$9A4C_$9A8F', DATA_$9A4C_$9A8F],
	['DATA_$9A90_$9B3C', DATA_$9A90_$9B3C],
	['DATA_$9B3D_$9B7C', DATA_$9B3D_$9B7C],
	['DATA_$9B7D_$9BA3', DATA_$9B7D_$9BA3],
	['DATA_$9BA4_$9BC7', DATA_$9BA4_$9BC7],
	['DATA_$9BC8_$9C57', DATA_$9BC8_$9C57],
	['DATA_$9C58_$9CF2', DATA_$9C58_$9CF2],
	['DATA_$9CF3_$9D73', DATA_$9CF3_$9D73],
	['DATA_$9D74_$9DA7', DATA_$9D74_$9DA7],
	['DATA_$9DA8_$9DF1', DATA_$9DA8_$9DF1],
	['DATA_$9DF2_$9F14', DATA_$9DF2_$9F14],
	['DATA_$9F15_$9FFF', DATA_$9F15_$9FFF],
];

for (const [name, data] of B01_CHUNKS) {
	runTest(name, () => {
		ok(data.length > 0, `${name}: 空数组`);
		ok(data.every((b, i) => b >= 0 && b <= 0xFF), `${name}: 有非法字节`);
	});
}

// ═══════════════════════════════════════════
// 模块导出验证
// ═══════════════════════════════════════════

console.log('\n── 模块导出 ──');

const B01_EXPORTS: Array<[string, unknown]> = [
	['bank01_titleInit', bank01_titleInit],
	['bank01_startGame', bank01_startGame],
	['bank01_crossBankEntry', bank01_crossBankEntry],
	['bank01_auxEntry1', bank01_auxEntry1],
	['bank01_auxEntry8', bank01_auxEntry8],
];

for (const [name, fn] of B01_EXPORTS) {
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
