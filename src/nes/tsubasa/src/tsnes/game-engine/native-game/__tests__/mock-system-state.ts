/**
 * Mock SystemState — 测试用最小 PPU/PAPU，不依赖完整的 NES 硬件层。
 */

import type { SystemState, CpuRegs } from '../tsubasa/banks/system-state';

/** 创建最小化的 PPU mock（只提供 writeMem / readMem 会用到的接口） */
function createMockPPU(): Record<string, unknown> {
	return {
		readStatusRegister: () => 0x00,
		sramLoad: () => 0x00,
		vramLoad: () => 0x00,
		updateControlReg1: (_val: number) => { /* noop */ },
		updateControlReg2: (_val: number) => { /* noop */ },
		writeSRAMAddress: (_val: number) => { /* noop */ },
		sramWrite: (_val: number) => { /* noop */ },
		scrollWrite: (_val: number) => { /* noop */ },
		writeVRAMAddress: (_val: number) => { /* noop */ },
		vramWrite: (_val: number) => { /* noop */ },
		sramDMA: (_val: number) => { /* noop */ },
		// Extra properties that some code may check
		nes: null,
		writeLatch: 0,
		readLatch: 0,
	};
}

/** 创建最小化的 PAPU mock */
function createMockPAPU(): Record<string, unknown> {
	return { };
}

/** 创建测试用 SystemState（不依赖真实 NES 实例） */
export function createMockSystemState(): SystemState {
	const mem = new Uint8Array(0x10000);
	const regs: CpuRegs = { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 };
	const mmc3Map = new Uint8Array(4);
	mmc3Map[0] = 0;
	mmc3Map[1] = 1;
	mmc3Map[2] = 30;
	mmc3Map[3] = 31;

	return {
		mem,
		regs,
		ppu: createMockPPU() as any,
		papu: createMockPAPU() as any,
		mmc3Map,
		mmc3BankSelect: 0,
		mmc3BankData: 0,
		nmiPending: false,
		frameCount: 0,
		mmc3Shadow: 0,
	};
}

/**
 * 重置 SystemState 到已知初始状态（复用内存，清理关键区域）
 */
export function resetMockSys(sys: SystemState): void {
	sys.mem.fill(0);
	sys.regs = { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 };
	sys.mmc3Map[0] = 0;
	sys.mmc3Map[1] = 1;
	sys.mmc3Map[2] = 30;
	sys.mmc3Map[3] = 31;
	sys.mmc3BankSelect = 0;
	sys.mmc3BankData = 0;
	sys.nmiPending = false;
	sys.frameCount = 0;
	sys.mmc3Shadow = 0;
}

/**
 * 辅助: 批量写入 SystemState 内存
 */
export function writeSysMem(sys: SystemState, addr: number, data: readonly number[]): void {
	for (let i = 0; i < data.length; i++) {
		sys.mem[addr + i] = data[i];
	}
}
