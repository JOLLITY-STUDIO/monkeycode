/**
 * Bank 00 单元测试 — Scene Dispatch Engine
 *
 * 用法: npx tsx game-engine/test/test-bank-00.ts
 */

// ── 代码导入 ──
import {
	bank00_dispatchScene,
	bank00_titleBoot,
	bank00_waitStartButton,
	bank00_postStartInit,
	bank00_waitFrame,
	bank00_titleTick,
	bank00_tickTimers,
	bank00_crossBankSave,
	bank00_clearTimerSlot,
	bank00_resetGameState,
	bank00_spriteAnimLoad,
	bank00_spriteAnimUpdate,
	bank00_sceneTransition,
	bank00_spriteRenderInit,
	bank00_spriteRenderTick,
	bank00_spritePlaceInit,
	bank00_spriteVMUpdate,
	bank00_hexToTiles,
	bank00_wordToTiles,
	bank00_bcdConvert,
	bank00_mul10,
	bank00_scriptWait,
	bank00_execBytecode,
} from '../native-game/tsubasa/banks/prg/bank-00-code';

// ── 数据导入 ──
import {
	DATA_$8398_$83B9,
	DATA_$83BA_$83DB,
	DATA_$83DC_$83FE,
	DATA_$83FF_$841F,
	DATA_$8420_$8441,
	DATA_$8442_$8463,
	DATA_$8545_$8574,
	DATA_$86C8_$86DD,
	DATA_$876E_$87B7,
	DATA_$8AB4_$8AD4,
	DATA_$8AD5_$8AE6,
	DATA_$9FE5_$9FFF,
} from '../native-game/tsubasa/banks/prg/bank-00-data';

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

function resetSys(s: SystemState): SystemState {
	s.mem.fill(0);
	s.regs = { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 };
	mmc3Map[0] = 0; mmc3Map[1] = 1; mmc3Map[2] = 30; mmc3Map[3] = 31;
	s.mmc3BankSelect = 0; s.mmc3BankData = 0;
	s.nmiPending = false; s.frameCount = 0; s.mmc3Shadow = 0;
	return s;
}

const mmc3Map = new Uint8Array(4);

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

function eq<T extends number | boolean | undefined>(a: T, b: T, label: string) {
	if (a !== b) throw new Error(`${label}: 期望=${String(b)}, 实际=${String(a)}`);
}

function ok(cond: boolean, label: string) {
	if (!cond) throw new Error(label);
}

console.log('╔══════════════════════════════════════════════════╗');
console.log('║ Bank 00 场景分派引擎测试                         ║');
console.log('╚══════════════════════════════════════════════════╝');

// ═══════════════════════════════════════════
// dispatchScene
// ═══════════════════════════════════════════

console.log('\n── dispatchScene ──');

for (const scene of [0, 1, 2, 3, 4, 0xFF]) {
	runTest(`dispatchScene mode=${scene} 不崩溃`, () => {
		const s = createMockSys(); s.mem[0x27] = scene;
		bank00_dispatchScene(s);
	});
}

// ═══════════════════════════════════════════
// title / start
// ═══════════════════════════════════════════

console.log('\n── title boot / start ──');

runTest('titleBoot 不崩溃', () => {
	const s = createMockSys();
	bank00_titleBoot(s);
});

runTest('waitStartButton 不崩溃', () => {
	const s = createMockSys();
	bank00_waitStartButton(s);
});

runTest('postStartInit 清空关键游戏状态变量', () => {
	const s = createMockSys();
	const keys = [0x05, 0x06, 0x09, 0x0A, 0x11, 0x12, 0x0D, 0x0E, 0x4C, 0x5B];
	for (const k of keys) s.mem[k] = 0xFF;
	bank00_postStartInit(s);
	for (const k of keys) eq(s.mem[k], 0, `ZP $${k.toString(16)}`);
	eq(s.mem[0x0700], 1, '$0700=1');
});

// ═══════════════════════════════════════════
// timers
// ═══════════════════════════════════════════

console.log('\n── waitFrame / tick ──');

runTest('waitFrame(1) 不崩溃', () => {
	const s = createMockSys();
	bank00_waitFrame(s, 1);
});

runTest('titleTick 不崩溃', () => {
	const s = createMockSys();
	bank00_titleTick(s);
});

runTest('tickTimers 不崩溃', () => {
	const s = createMockSys();
	bank00_tickTimers(s);
});

// ═══════════════════════════════════════════
// timer slots
// ═══════════════════════════════════════════

console.log('\n── timer slots ──');

for (let slot = 0; slot < 8; slot++) {
	runTest(`crossBankSave slot=${slot}`, () => {
		const s = createMockSys();
		bank00_crossBankSave(s, slot);
	});
}

runTest('clearTimerSlot slot=0', () => {
	const s = createMockSys();
	bank00_clearTimerSlot(s, 0);
});

// ═══════════════════════════════════════════
// resetGameState
// ═══════════════════════════════════════════

console.log('\n── resetGameState ──');

runTest('resetGameState 不崩溃', () => {
	const s = createMockSys();
	bank00_resetGameState(s);
});

// ═══════════════════════════════════════════
// spriteAnim
// ═══════════════════════════════════════════

console.log('\n── spriteAnim ──');

for (const id of [0, 1, 7, 15, 0x3F]) {
	runTest(`spriteAnimLoad id=${id}`, () => {
		const s = createMockSys();
		bank00_spriteAnimLoad(s, id);
	});
}

runTest('spriteAnimUpdate 返回 boolean', () => {
	const s = createMockSys();
	bank00_spriteAnimLoad(s, 0);
	eq(typeof bank00_spriteAnimUpdate(s), 'boolean', '返回值类型');
});

// ═══════════════════════════════════════════
// sceneTransition
// ═══════════════════════════════════════════

console.log('\n── sceneTransition ──');

const _mockBank07 = (_s: SystemState) => {};

for (const m of [0, 1, 2, 3]) {
	runTest(`sceneTransition mode=${m}`, () => {
		const s = createMockSys();
		bank00_sceneTransition(s, m, _mockBank07);
	});
}

// ═══════════════════════════════════════════
// spriteRender / spritePlace
// ═══════════════════════════════════════════

console.log('\n── spriteRender / spritePlace ──');

const _mockBank09 = (_s: SystemState) => {};

runTest('spriteRenderInit 不崩溃', () => {
	const s = createMockSys();
	bank00_spriteRenderInit(s, _mockBank07);
});

runTest('spriteRenderTick 返回数字', () => {
	const s = createMockSys();
	bank00_spriteRenderInit(s, _mockBank07);
	eq(typeof bank00_spriteRenderTick(s), 'number', '返回值类型');
});

runTest('spritePlaceInit 不崩溃', () => {
	const s = createMockSys();
	bank00_spritePlaceInit(s, 0, _mockBank09);
});

runTest('spriteVMUpdate 不崩溃', () => {
	const s = createMockSys();
	bank00_spritePlaceInit(s, 0, _mockBank09);
	bank00_spriteVMUpdate(s, 0);
});

// ═══════════════════════════════════════════
// bytecode
// ═══════════════════════════════════════════

console.log('\n── bytecode ──');

runTest('scriptWait 不崩溃', () => {
	const s = createMockSys();
	bank00_scriptWait(s);
});

runTest('execBytecode 返回数字', () => {
	const s = createMockSys();
	eq(typeof bank00_execBytecode(s), 'number', '返回值类型');
});

// ═══════════════════════════════════════════
// hexToTiles
// ═══════════════════════════════════════════

console.log('\n── hexToTiles ──');

runTest('0 → 0xCD + 0x33', () => {
	const s = createMockSys();
	bank00_hexToTiles(s, 0, 0);
	eq(s.mem[0x05E8], 0xCD, '$05E8');
	eq(s.mem[0x05E9], 0x33, '$05E9');
});

runTest('0x12 → 0x34 + 0x35', () => {
	const s = createMockSys();
	bank00_hexToTiles(s, 0x12, 0);
	eq(s.mem[0x05E8], 0x34, '$05E8');
	eq(s.mem[0x05E9], 0x35, '$05E9');
});

runTest('0xAB → 0x3D + 0x3E', () => {
	const s = createMockSys();
	bank00_hexToTiles(s, 0xAB, 0);
	eq(s.mem[0x05E8], 0x3D, '$05E8');
	eq(s.mem[0x05E9], 0x3E, '$05E9');
});

runTest('oamIdx=4 偏移正确', () => {
	const s = createMockSys();
	bank00_hexToTiles(s, 0x34, 4);
	eq(s.mem[0x05EC], 0x36, '$05EC');
	eq(s.mem[0x05ED], 0x37, '$05ED');
});

// ═══════════════════════════════════════════
// wordToTiles
// ═══════════════════════════════════════════

console.log('\n── wordToTiles ──');

runTest('0x1234 → 1,2,3,4', () => {
	const s = createMockSys();
	bank00_wordToTiles(s, 0x1234);
	eq(s.mem[0x05E8], 0x34, '$05E8');
	eq(s.mem[0x05E9], 0x35, '$05E9');
	eq(s.mem[0x05EA], 0x36, '$05EA');
	eq(s.mem[0x05EB], 0x37, '$05EB');
});

runTest('0xFFFF → F,F,F,F', () => {
	const s = createMockSys();
	bank00_wordToTiles(s, 0xFFFF);
	for (let i = 0; i < 4; i++) eq(s.mem[0x05E8 + i], 0x42, `$05E8+${i}`);
});

// ═══════════════════════════════════════════
// bcdConvert
// ═══════════════════════════════════════════

console.log('\n── bcdConvert ──');

runTest('0 → 0', () => {
	const s = createMockSys();
	eq(bank00_bcdConvert(s, 0, 10), 0, 'bcdConvert(0)');
});

runTest('25 → 0x25', () => {
	const s = createMockSys();
	eq(bank00_bcdConvert(s, 25, 10) & 0xFF, 0x25, 'bcdConvert(25)');
});

runTest('99 → 0x99', () => {
	const s = createMockSys();
	eq(bank00_bcdConvert(s, 99, 10) & 0xFF, 0x99, 'bcdConvert(99)');
});

runTest('每个 nibble 均 ≤ 9', () => {
	const s = createMockSys();
	for (const v of [1, 10, 25, 50, 63, 99, 127, 255, 500, 999]) {
		const r = bank00_bcdConvert(s, v, 10);
		ok((r & 0xF) <= 9, `v=${v}: lo nibble=${r & 0xF}`);
		ok(((r >> 4) & 0xF) <= 9, `v=${v}: hi nibble=${(r >> 4) & 0xF}`);
		ok(((r >> 8) & 0xF) <= 9, `v=${v}: byte2 nibble=${(r >> 8) & 0xF}`);
		ok(((r >> 12) & 0xF) <= 9, `v=${v}: byte3 nibble=${(r >> 12) & 0xF}`);
	}
});

// ═══════════════════════════════════════════
// mul10
// ═══════════════════════════════════════════

console.log('\n── mul10 ──');

runTest('0×10=0', () => {
	const s = createMockSys();
	eq(bank00_mul10(s, 0), 0, 'mul10(0)');
});

runTest('10×10=100', () => {
	const s = createMockSys();
	eq(bank00_mul10(s, 10), 100, 'mul10(10)');
});

runTest('255×10=2550', () => {
	const s = createMockSys();
	eq(bank00_mul10(s, 255), 2550 & 0xFFFF, 'mul10(255)');
});

runTest('1000×10=10000→mod', () => {
	const s = createMockSys();
	eq(bank00_mul10(s, 1000), (10000) & 0xFFFF, 'mul10(1000)');
});

// ═══════════════════════════════════════════
// data chunks
// ═══════════════════════════════════════════

console.log('\n── data chunks ──');

const B00_CHUNKS: Array<[string, readonly number[]]> = [
	['DATA_$8398_$83B9', DATA_$8398_$83B9],
	['DATA_$83BA_$83DB', DATA_$83BA_$83DB],
	['DATA_$83DC_$83FE', DATA_$83DC_$83FE],
	['DATA_$83FF_$841F', DATA_$83FF_$841F],
	['DATA_$8420_$8441', DATA_$8420_$8441],
	['DATA_$8442_$8463', DATA_$8442_$8463],
	['DATA_$8545_$8574', DATA_$8545_$8574],
	['DATA_$86C8_$86DD', DATA_$86C8_$86DD],
	['DATA_$876E_$87B7', DATA_$876E_$87B7],
	['DATA_$8AB4_$8AD4', DATA_$8AB4_$8AD4],
	['DATA_$8AD5_$8AE6', DATA_$8AD5_$8AE6],
	['DATA_$9FE5_$9FFF', DATA_$9FE5_$9FFF],
];

const b00Total = B00_CHUNKS.reduce((s, [, d]) => s + d.length, 0);

for (const [name, data] of B00_CHUNKS) {
	runTest(name, () => {
		ok(data.length > 0, `${name}: 空数组`);
		ok(data.every((b, i) => b >= 0 && b <= 0xFF), `${name}: 有非法字节`);
	});
}

runTest(`总字节 ${b00Total} > 100`, () => {
	ok(b00Total > 100, `bank-00 分块总字节=${b00Total}`);
});

// ═══════════════════════════════════════════
// 模块导出验证
// ═══════════════════════════════════════════

console.log('\n── 模块导出 ──');

const B00_EXPORTS: Array<[string, unknown]> = [
	['bank00_dispatchScene', bank00_dispatchScene],
	['bank00_titleBoot', bank00_titleBoot],
	['bank00_waitStartButton', bank00_waitStartButton],
	['bank00_postStartInit', bank00_postStartInit],
	['bank00_tickTimers', bank00_tickTimers],
	['bank00_resetGameState', bank00_resetGameState],
	['bank00_bcdConvert', bank00_bcdConvert],
	['bank00_mul10', bank00_mul10],
];

for (const [name, fn] of B00_EXPORTS) {
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
