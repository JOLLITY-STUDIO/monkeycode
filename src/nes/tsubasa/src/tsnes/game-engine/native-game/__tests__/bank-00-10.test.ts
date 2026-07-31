/**
 * Bank 00–10 测试套件
 *
 * 运行方式:
 *   npx tsx --test game-engine/native-game/__tests__/bank-00-10.test.ts
 */

import { describe, it, before } from 'node:test';
import * as assert from 'node:assert';

import { createMockSystemState, resetMockSys, writeSysMem } from './mock-system-state';

// ── Bank 00: Scene Dispatch Engine ──────────────────────────
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
} from '../tsubasa/banks/prg/bank-00-code';

// ── Bank 01: Match Jump / Title ─────────────────────────────
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
} from '../tsubasa/banks/prg/bank-01-code';

// ── Bank 02: NMI Renderer ───────────────────────────────────
import {
	bank02_nmiHandler,
	bank02_ppuScrollUpdate,
	bank02_auxEntry1,
	bank02_auxEntry2,
	bank02_auxEntry8,
	bank02_sceneSwitchHelper,
	bank02_loadSceneData,
} from '../tsubasa/banks/prg/bank-02-code';

// ── Banks 03–10: Data Providers ─────────────────────────────
import { rom03, rom03Ptr16, getBank03Data } from '../tsubasa/banks/prg/bank-03-code';
import { rom04, rom04Ptr16, getBank04Data } from '../tsubasa/banks/prg/bank-04-code';
import { rom05, rom05Ptr16, getBank05Data } from '../tsubasa/banks/prg/bank-05-code';
import { rom06, rom06Ptr16, getBank06Data } from '../tsubasa/banks/prg/bank-06-code';
import { rom07, rom07Ptr16, getBank07Data } from '../tsubasa/banks/prg/bank-07-code';
import { rom08, rom08Ptr16, getBank08Data } from '../tsubasa/banks/prg/bank-08-code';
import { rom09, rom09Ptr16, getBank09Data } from '../tsubasa/banks/prg/bank-09-code';
import { rom10, rom10Ptr16, getBank10Data } from '../tsubasa/banks/prg/bank-10-code';

// ── Bank 00/01/02 Data Chunks (完整性验证) ──────────────────
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
} from '../tsubasa/banks/prg/bank-00-data';

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
} from '../tsubasa/banks/prg/bank-01-data';

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
} from '../tsubasa/banks/prg/bank-02-data';

// 08-10 data banks (8192B each)
import { PRG_BANK_03_DATA } from '../tsubasa/banks/prg/bank-03-data';
import { PRG_BANK_04_DATA } from '../tsubasa/banks/prg/bank-04-data';
import { PRG_BANK_05_DATA } from '../tsubasa/banks/prg/bank-05-data';
import { PRG_BANK_06_DATA } from '../tsubasa/banks/prg/bank-06-data';
import { PRG_BANK_07_DATA } from '../tsubasa/banks/prg/bank-07-data';
import { PRG_BANK_08_DATA } from '../tsubasa/banks/prg/bank-08-data';
import { PRG_BANK_09_DATA } from '../tsubasa/banks/prg/bank-09-data';
import { PRG_BANK_10_DATA } from '../tsubasa/banks/prg/bank-10-data';

// ══════════════════════════════════════════════════════════════
// 辅助
// ══════════════════════════════════════════════════════════════

let _sys: ReturnType<typeof createMockSystemState>;

function newSys() {
	_sys = createMockSystemState();
	return _sys;
}

function resetSys() {
	resetMockSys(_sys);
	return _sys;
}

/** data bank 元数据表 */
interface DataBankMeta {
	bankNum: number;
	romFn: (offset: number) => number;
	romPtr16Fn: (offset: number) => number;
	getDataFn: () => readonly number[];
	rawData: readonly number[];
	firstByte: number;
	lastBytes: number[];
}

const DATA_BANKS: DataBankMeta[] = [
	{ bankNum: 3,  romFn: rom03,  romPtr16Fn: rom03Ptr16,  getDataFn: getBank03Data,  rawData: PRG_BANK_03_DATA,  firstByte: 0x20, lastBytes: [0xED, 0x01, 0xFF, 0xFF] },
	{ bankNum: 4,  romFn: rom04,  romPtr16Fn: rom04Ptr16,  getDataFn: getBank04Data,  rawData: PRG_BANK_04_DATA,  firstByte: 0x20, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
	{ bankNum: 5,  romFn: rom05,  romPtr16Fn: rom05Ptr16,  getDataFn: getBank05Data,  rawData: PRG_BANK_05_DATA,  firstByte: 0x80, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
	{ bankNum: 6,  romFn: rom06,  romPtr16Fn: rom06Ptr16,  getDataFn: getBank06Data,  rawData: PRG_BANK_06_DATA,  firstByte: 0x0C, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
	{ bankNum: 7,  romFn: rom07,  romPtr16Fn: rom07Ptr16,  getDataFn: getBank07Data,  rawData: PRG_BANK_07_DATA,  firstByte: 0xD4, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
	{ bankNum: 8,  romFn: rom08,  romPtr16Fn: rom08Ptr16,  getDataFn: getBank08Data,  rawData: PRG_BANK_08_DATA,  firstByte: 0xAA, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
	{ bankNum: 9,  romFn: rom09,  romPtr16Fn: rom09Ptr16,  getDataFn: getBank09Data,  rawData: PRG_BANK_09_DATA,  firstByte: 0xDA, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
	{ bankNum: 10, romFn: rom10, romPtr16Fn: rom10Ptr16, getDataFn: getBank10Data, rawData: PRG_BANK_10_DATA, firstByte: 0xBE, lastBytes: [0xFF, 0xFF, 0xFF, 0xFF] },
];

/** 验证一个 data chunk 合法 */
function assertValidChunk(name: string, data: readonly number[]) {
	assert.ok(Array.isArray(data), `${name}: 不是数组`);
	assert.ok(data.length > 0, `${name}: 长度为 0`);
	for (let i = 0; i < data.length; i++) {
		assert.ok(typeof data[i] === 'number' && data[i] >= 0 && data[i] <= 0xFF,
			`${name}[${i}]: 非法字节值 0x${data[i].toString(16)}`);
	}
}

// ══════════════════════════════════════════════════════════════
// Bank 00: Scene Dispatch Engine
// ══════════════════════════════════════════════════════════════

describe('Bank 00 — Scene Dispatch Engine', () => {

	before(() => { newSys(); });

	describe('dispatchScene (场景分派)', () => {
		it('$27=0 场景初始化', () => {
			resetSys(); _sys.mem[0x27] = 0;
			assert.doesNotThrow(() => bank00_dispatchScene(_sys));
		});
		it('$27=1', () => { resetSys(); _sys.mem[0x27] = 1; assert.doesNotThrow(() => bank00_dispatchScene(_sys)); });
		it('$27=2', () => { resetSys(); _sys.mem[0x27] = 2; assert.doesNotThrow(() => bank00_dispatchScene(_sys)); });
		it('$27=3', () => { resetSys(); _sys.mem[0x27] = 3; assert.doesNotThrow(() => bank00_dispatchScene(_sys)); });
		it('$27=4', () => { resetSys(); _sys.mem[0x27] = 4; assert.doesNotThrow(() => bank00_dispatchScene(_sys)); });
		it('$27=0xFF (未知) 不崩溃', () => { resetSys(); _sys.mem[0x27] = 0xFF; assert.doesNotThrow(() => bank00_dispatchScene(_sys)); });
	});

	describe('titleBoot / waitStart / postStartInit', () => {
		it('bank00_titleBoot 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_titleBoot(_sys)); });
		it('bank00_waitStartButton 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_waitStartButton(_sys)); });

		it('postStartInit 清空关键游戏状态变量', () => {
			resetSys();
			// 先写脏数据
			const keys = [0x05, 0x06, 0x09, 0x0A, 0x11, 0x12, 0x0D, 0x0E, 0x4C, 0x5B];
			for (const k of keys) _sys.mem[k] = 0xFF;
			bank00_postStartInit(_sys);
			for (const k of keys) {
				assert.strictEqual(_sys.mem[k], 0, `ZP $${k.toString(16)}`);
			}
			// $0700 置为 1
			assert.strictEqual(_sys.mem[0x0700], 1);
		});
	});

	describe('waitFrame / titleTick / tickTimers', () => {
		it('waitFrame(1) 不崩溃 (创建定时器槽位)', () => {
			resetSys();
			// waitFrame 保存当前上下文到定时器槽位，不直接递增 frameCount
			assert.doesNotThrow(() => bank00_waitFrame(_sys, 1));
		});
		it('titleTick 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_titleTick(_sys)); });
		it('tickTimers 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_tickTimers(_sys)); });
	});

	describe('timer slots', () => {
		it('crossBankSave slot 0–7 不崩溃', () => {
			resetSys();
			for (let s = 0; s < 8; s++) assert.doesNotThrow(() => bank00_crossBankSave(_sys, s));
		});
		it('clearTimerSlot 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_clearTimerSlot(_sys, 0)); });
	});

	describe('resetGameState', () => {
		it('重置不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_resetGameState(_sys)); });
	});

	describe('spriteAnim (精灵动画)', () => {
		it('spriteAnimLoad id=0,1,7,15,63 不崩溃', () => {
			resetSys();
			for (const id of [0, 1, 7, 15, 0x3F]) assert.doesNotThrow(() => bank00_spriteAnimLoad(_sys, id), `id=${id}`);
		});
		it('spriteAnimUpdate 返回 boolean', () => {
			resetSys(); bank00_spriteAnimLoad(_sys, 0);
			const r = bank00_spriteAnimUpdate(_sys);
			assert.strictEqual(typeof r, 'boolean');
		});
	});

	describe('sceneTransition (场景过渡)', () => {
		const _mockBank07 = (_s: typeof _sys) => {};
		it('mode 0-3 不崩溃', () => {
			resetSys();
			for (const m of [0, 1, 2, 3]) assert.doesNotThrow(() => bank00_sceneTransition(_sys, m, _mockBank07));
		});
	});

	describe('spriteRender (精灵渲染)', () => {
		const _mockBank07 = (_s: typeof _sys) => {};
		const _mockBank09 = (_s: typeof _sys) => {};
		it('spriteRenderInit 不同参数不崩溃', () => {
			resetSys(); assert.doesNotThrow(() => bank00_spriteRenderInit(_sys, _mockBank07));
		});
		it('spriteRenderTick 返回数字', () => {
			resetSys(); bank00_spriteRenderInit(_sys, _mockBank07);
			assert.strictEqual(typeof bank00_spriteRenderTick(_sys), 'number');
		});
		it('spritePlaceInit 不崩溃', () => {
			resetSys(); assert.doesNotThrow(() => bank00_spritePlaceInit(_sys, 0, _mockBank09));
		});
		it('spriteVMUpdate 不崩溃', () => {
			resetSys(); bank00_spritePlaceInit(_sys, 0, _mockBank09);
			assert.doesNotThrow(() => bank00_spriteVMUpdate(_sys, 0));
		});
	});

	describe('bytecode (字节码引擎)', () => {
		it('scriptWait 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank00_scriptWait(_sys)); });
		it('execBytecode 返回数字', () => { resetSys(); assert.strictEqual(typeof bank00_execBytecode(_sys), 'number'); });
	});

	describe('hexToTiles', () => {
		it('0 → 0xCD + 0x33', () => {
			resetSys(); bank00_hexToTiles(_sys, 0, 0);
			assert.strictEqual(_sys.mem[0x05E8], 0xCD);
			assert.strictEqual(_sys.mem[0x05E9], 0x33);
		});
		it('0x12 → 0x34 + 0x35', () => {
			resetSys(); bank00_hexToTiles(_sys, 0x12, 0);
			assert.strictEqual(_sys.mem[0x05E8], 0x34);
			assert.strictEqual(_sys.mem[0x05E9], 0x35);
		});
		it('0xAB → 0x3D + 0x3E', () => {
			resetSys(); bank00_hexToTiles(_sys, 0xAB, 0);
			assert.strictEqual(_sys.mem[0x05E8], 0x3D); // A+0x33
			assert.strictEqual(_sys.mem[0x05E9], 0x3E); // B+0x33
		});
		it('oamIdx=4 偏移正确', () => {
			resetSys(); writeSysMem(_sys, 0x05E8, [0, 0, 0, 0, 0, 0]);
			bank00_hexToTiles(_sys, 0x34, 4);
			assert.strictEqual(_sys.mem[0x05EC], 0x36); // 3+0x33
			assert.strictEqual(_sys.mem[0x05ED], 0x37); // 4+0x33
		});
	});

	describe('wordToTiles', () => {
		it('0x1234 → 1,2,3,4', () => {
			resetSys(); bank00_wordToTiles(_sys, 0x1234);
			assert.strictEqual(_sys.mem[0x05E8], 0x34);
			assert.strictEqual(_sys.mem[0x05E9], 0x35);
			assert.strictEqual(_sys.mem[0x05EA], 0x36);
			assert.strictEqual(_sys.mem[0x05EB], 0x37);
		});
		it('0xFFFF → F,F,F,F', () => {
			resetSys(); bank00_wordToTiles(_sys, 0xFFFF);
			for (let i = 0; i < 4; i++) assert.strictEqual(_sys.mem[0x05E8 + i], 0x42);
		});
	});

	describe('bcdConvert', () => {
		it('0 → 0', () => { resetSys(); assert.strictEqual(bank00_bcdConvert(_sys, 0, 10), 0); });
		it('25 → 0x25', () => { resetSys(); assert.strictEqual(bank00_bcdConvert(_sys, 25, 10) & 0xFF, 0x25); });
		it('99 → 0x99', () => { resetSys(); assert.strictEqual(bank00_bcdConvert(_sys, 99, 10) & 0xFF, 0x99); });
		it('每个 nibble 均 ≤ 9', () => {
			resetSys();
			for (const v of [1, 10, 25, 50, 63, 99, 127, 255, 500, 999]) {
				const r = bank00_bcdConvert(_sys, v, 10);
				assert.ok((r & 0xF) <= 9, `v=${v}: lo nibble=${r & 0xF}`);
				assert.ok(((r >> 4) & 0xF) <= 9, `v=${v}: hi nibble=${(r >> 4) & 0xF}`);
				assert.ok(((r >> 8) & 0xF) <= 9, `v=${v}: byte2 nibble=${(r >> 8) & 0xF}`);
				assert.ok(((r >> 12) & 0xF) <= 9, `v=${v}: byte3 nibble=${(r >> 12) & 0xF}`);
			}
		});
	});

	describe('mul10', () => {
		it('0×10=0', () => { resetSys(); assert.strictEqual(bank00_mul10(_sys, 0), 0); });
		it('10×10=100', () => { resetSys(); assert.strictEqual(bank00_mul10(_sys, 10), 100); });
		it('255×10=2550', () => { resetSys(); assert.strictEqual(bank00_mul10(_sys, 255), 2550 & 0xFFFF); });
		it('1000×10=10000→mod', () => { resetSys(); assert.strictEqual(bank00_mul10(_sys, 1000), (10000) & 0xFFFF); });
	});

	// ── Data chunks ──────────────────────────────────────────
	describe('data chunks (bank-00-data)', () => {
		it('12 个 data chunk 均非空且值合法', () => {
			const chunks: Array<[string, readonly number[]]> = [
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
			for (const [name, data] of chunks) assertValidChunk(name, data);
		});
	});
});

// ══════════════════════════════════════════════════════════════
// Bank 01: Match Jump / Title
// ══════════════════════════════════════════════════════════════

describe('Bank 01 — Match Jump / Title', () => {

	before(() => { newSys(); });

	describe('入口函数', () => {
		it('titleInit 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank01_titleInit(_sys)); });
		it('titleProcess 不崩溃', () => { resetSys(); bank01_titleInit(_sys); assert.doesNotThrow(() => bank01_titleProcess(_sys)); });
		it('startGame 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank01_startGame(_sys)); });
		it('crossBankEntry 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank01_crossBankEntry(_sys)); });
		it('loadSceneData 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank01_loadSceneData(_sys)); });
	});

	describe('aux entries', () => {
		it('auxEntry1-8 全部不崩溃', () => {
			resetSys();
			const fns = [bank01_auxEntry1, bank01_auxEntry2, bank01_auxEntry3, bank01_auxEntry4,
			bank01_auxEntry5, bank01_auxEntry6, bank01_auxEntry7, bank01_auxEntry8];
			for (const fn of fns) assert.doesNotThrow(() => fn(_sys));
		});
	});

	describe('bytecode helpers', () => {
		it('bytecodeHelper 返回数字', () => { resetSys(); assert.strictEqual(typeof bank01_bytecodeHelper(_sys), 'number'); });
		it('bytecodeHelper2 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank01_bytecodeHelper2(_sys)); });
	});

	describe('sceneSwitchHelper1', () => {
		it('不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank01_sceneSwitchHelper1(_sys)); });
		it('寄存器 A=3', () => { resetSys(); bank01_sceneSwitchHelper1(_sys); assert.strictEqual(_sys.regs.A, 3); });
	});

	// ── Data chunks ──────────────────────────────────────────
	describe('data chunks (bank-01-data)', () => {
		it('34 个 data chunk 均非空且值合法', () => {
			const chunks: Array<[string, readonly number[]]> = [
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
			for (const [name, data] of chunks) assertValidChunk(name, data);
		});
	});
});

// ══════════════════════════════════════════════════════════════
// Bank 02: NMI Renderer
// ══════════════════════════════════════════════════════════════

describe('Bank 02 — NMI Renderer', () => {

	before(() => { newSys(); });

	describe('入口函数', () => {
		it('nmiHandler 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_nmiHandler(_sys)); });
		it('ppuScrollUpdate 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_ppuScrollUpdate(_sys)); });
		it('loadSceneData 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_loadSceneData(_sys)); });
		it('sceneSwitchHelper 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_sceneSwitchHelper(_sys)); });
	});

	describe('aux entries', () => {
		it('auxEntry1 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_auxEntry1(_sys)); });
		it('auxEntry2 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_auxEntry2(_sys)); });
		it('auxEntry8 不崩溃', () => { resetSys(); assert.doesNotThrow(() => bank02_auxEntry8(_sys)); });
	});

	// ── Data chunks ──────────────────────────────────────────
	describe('data chunks (bank-02-data)', () => {
		it('14 个 data chunk 均非空且值合法', () => {
			const chunks: Array<[string, readonly number[]]> = [
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
			for (const [name, data] of chunks) assertValidChunk(name, data);
		});
	});
});

// ══════════════════════════════════════════════════════════════
// Banks 03–10: Data Providers
// ══════════════════════════════════════════════════════════════

for (const meta of DATA_BANKS) {
	const label = `Bank ${String(meta.bankNum).padStart(2, '0')}`;

	describe(`${label} — Data Provider`, () => {

		it('8192 字节 (8KB)', () => {
			assert.strictEqual(meta.rawData.length, 8192);
			assert.strictEqual(meta.getDataFn().length, 8192);
		});

		it(`首字节 = 0x${meta.firstByte.toString(16).padStart(2, '0').toUpperCase()}`, () => {
			assert.strictEqual(meta.romFn(0), meta.firstByte);
		});

		it('末 4 字节匹配原始 ROM', () => {
			for (let i = 0; i < 4; i++) {
				const offset = 0x1FFF - 3 + i;
				assert.strictEqual(meta.romFn(offset), meta.lastBytes[i],
					`rom(0x${offset.toString(16)})`);
			}
		});

		it('越界地址返回 0 (0x2000+)', () => {
			assert.strictEqual(meta.romFn(0x2000), meta.romFn(0)); // wrap
			assert.strictEqual(meta.romFn(0x3FFF), meta.romFn(0x1FFF)); // wrap
		});

		it('ptr16 读取 16-bit little-endian', () => {
			const lo = meta.romFn(0);
			const hi = meta.romFn(1);
			const expected = (hi << 8) | lo;
			assert.strictEqual(meta.romPtr16Fn(0), expected);
		});

		it('ptr16 跨 0x1FFF 边界 wrap', () => {
			const vLo = meta.romFn(0x1FFF);
			const vHi = meta.romFn(0x0000);
			assert.strictEqual(meta.romPtr16Fn(0x1FFF), ((vHi << 8) | vLo) & 0xFFFF);
		});

		it('抽样 5 点一致', () => {
			const raw = meta.rawData;
			for (const off of [0, 2048, 4096, 6144, 8191]) {
				assert.strictEqual(meta.romFn(off), raw[off], `offset 0x${off.toString(16)}`);
			}
		});

		it('完整 8KB 扫描无差异', () => {
			const raw = meta.rawData;
			let mismatches = 0;
			for (let i = 0; i < 8192; i++) {
				if (meta.romFn(i) !== raw[i]) mismatches++;
			}
			assert.strictEqual(mismatches, 0, `${mismatches} 字节不匹配`);
		});

		it('getBankData() 重复调用返回一致', () => {
			const d1 = meta.getDataFn();
			const d2 = meta.getDataFn();
			for (let i = 0; i < 8192; i += 256) {
				assert.strictEqual(d1[i], d2[i], `index ${i}`);
			}
		});
	});
}

// ══════════════════════════════════════════════════════════════
// 跨 Bank 完整性
// ══════════════════════════════════════════════════════════════

describe('跨 Bank 数据完整性', () => {
	it('banks 03-10 均为 8192 字节', () => {
		for (const meta of DATA_BANKS) {
			assert.strictEqual(meta.rawData.length, 8192, `bank ${meta.bankNum}`);
		}
	});

	it('首字节互不相同 (≥4 个唯一值)', () => {
		const firstBytes = new Set(DATA_BANKS.map(m => m.firstByte));
		assert.ok(firstBytes.size >= 4);
	});

	it('romXX 与 rawData 抽样 64-步长全量一致', () => {
		for (const meta of DATA_BANKS) {
			for (let off = 0; off < 8192; off += 64) {
				assert.strictEqual(meta.romFn(off), meta.rawData[off],
					`bank ${meta.bankNum} off=0x${off.toString(16)}`);
			}
		}
	});

	it('bank-00/01/02 data chunk 总字节数 ≈ 8KB 量级', () => {
		const b00Total = [DATA_$8398_$83B9, DATA_$83BA_$83DB, DATA_$83DC_$83FE, DATA_$83FF_$841F,
			DATA_$8420_$8441, DATA_$8442_$8463, DATA_$8545_$8574, DATA_$86C8_$86DD,
			DATA_$876E_$87B7, DATA_$8AB4_$8AD4, DATA_$8AD5_$8AE6, DATA_$9FE5_$9FFF]
			.reduce((s, d) => s + d.length, 0);
		assert.ok(b00Total > 100, `bank-00 分块总字节=${b00Total}`);

		const b02Total = [DATA_$8066_$8072, DATA_$8138_$815F, DATA_$81E4_$820B, DATA_$83D8_$8483,
			DATA_$84A5_$84C0, DATA_$8582_$85A8, DATA_$85B9_$85DB, DATA_$878E_$87BD,
			DATA_$87FB_$882E, DATA_$88FE_$8A05, DATA_$8A20_$8A46, DATA_$8A47_$8A96,
			DATA_$8A97_$8B2E, DATA_$8B2F_$9FFF]
			.reduce((s, d) => s + d.length, 0);
		assert.ok(b02Total > 100 && b02Total <= 8192, `bank-02 分块总字节=${b02Total}`);
	});
});

// ══════════════════════════════════════════════════════════════
// 加载检查（确保全部模块可 import 无启动时崩溃）
// ══════════════════════════════════════════════════════════════

describe('模块加载验证', () => {
	it('所有 bank 00-10 导出均非 undefined', () => {
		const exports: Array<[string, unknown]> = [
			['bank00_dispatchScene', bank00_dispatchScene],
			['bank00_titleBoot', bank00_titleBoot],
			['bank00_waitStartButton', bank00_waitStartButton],
			['bank00_postStartInit', bank00_postStartInit],
			['bank00_tickTimers', bank00_tickTimers],
			['bank00_resetGameState', bank00_resetGameState],
			['bank00_bcdConvert', bank00_bcdConvert],
			['bank00_mul10', bank00_mul10],
			['bank01_titleInit', bank01_titleInit],
			['bank01_startGame', bank01_startGame],
			['bank01_crossBankEntry', bank01_crossBankEntry],
			['bank01_auxEntry1', bank01_auxEntry1],
			['bank01_auxEntry8', bank01_auxEntry8],
			['bank02_nmiHandler', bank02_nmiHandler],
			['bank02_ppuScrollUpdate', bank02_ppuScrollUpdate],
			['bank02_auxEntry1', bank02_auxEntry1],
			['rom03', rom03],
			['rom04', rom04],
			['rom05', rom05],
			['rom06', rom06],
			['rom07', rom07],
			['rom08', rom08],
			['rom09', rom09],
			['rom10', rom10],
		];
		for (const [name, fn] of exports) {
			assert.ok(fn !== undefined && fn !== null, `${name} is undefined`);
			assert.strictEqual(typeof fn, 'function', `${name} is not a function`);
		}
	});

	it('所有 data bank getData 返回 8192 字节', () => {
		const getters = [getBank03Data, getBank04Data, getBank05Data, getBank06Data,
			getBank07Data, getBank08Data, getBank09Data, getBank10Data];
		for (const fn of getters) {
			assert.strictEqual(fn().length, 8192);
		}
	});
});
