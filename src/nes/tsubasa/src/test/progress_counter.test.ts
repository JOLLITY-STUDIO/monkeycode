/**
 * 进度计数器系统单元测试
 * 
 * 来源: ProgressCounter.ts ($00:8204-$8284)
 * 
 * 测试目标:
 * 1. 场景索引查表函数 (lookupSceneIndex_*)
 * 2. progressPhase0 状态推进
 * 3. 进度推进边界条件
 */

import { describe, it, expect, beforeEach } from './_expect.js';
import {
  lookupSceneIndex_83DC,
  lookupSceneIndex_83FE,
  lookupSceneIndex_8420,
  lookupSceneIndex_8442,
  progressPhase0,
  progressPhase1_4,
  progressPhase5,
  initMatchSequence,
} from '../code/ProgressCounter';
import { GameState, NesRam, Mmc3Regs, PpuState, BUTTON } from '../types';
import { NesMemory, createMemory } from '../code/Memory';
import { NesRom, NesHeader } from '../types';

// ==============================================================
// Mock 工厂函数
// ==============================================================

function createMockRom(): NesRom {
  const header: NesHeader = {
    prgSize: 24, // 24 * 16KB = 384KB
    chrSize: 16,  // 16 * 8KB = 128KB
    mapper: 4,    // MMC3
    mirroring: 'horizontal',
    battery: true,
    trainer: false,
  };
  const prg = new Uint8Array(header.prgSize * 16384);
  const chr = new Uint8Array(header.chrSize * 8192);
  // Fill PRG with identifiable data (not zero)
  for (let i = 0; i < prg.length; i++) prg[i] = i & 0xFF;
  return { header, prg, chr };
}

function createMockNesRam(): NesRam {
  return {
    ram: new Uint8Array(0x0800), // 2KB
    stack: 0xFF,
    pc: 0x8000,
    a: 0,
    x: 0,
    y: 0,
    flags: 0x04, // I flag set (IRQ disabled)
  };
}

function createMockPpu(): PpuState {
  return {
    ctrl: 0x00,
    mask: 0x00,
    status: 0x00,
    oamAddr: 0x00,
    scroll: 0x00,
    addr: 0x00,
    v: 0x2000,
    t: 0x0000,
    x: 0,
    w: 0,
    vram: new Uint8Array(0x0800),
    palette: new Uint8Array(32),
    oam: new Uint8Array(256),
    oamDma: new Uint8Array(256),
    frameBuffer: new Uint32Array(256 * 240),
  };
}

function createMockMmc3(): Mmc3Regs {
  return {
    bankSelect: 0,
    bankData: [0, 1, 2, 3, 4, 5, 0x00, 0x01],
    prgBankMode: 0,
    chrBankMode: 0,
    mirroring: 0,
    prgRamProtect: false,
    irqLatch: 0,
    irqCounter: 0,
    irqReload: false,
    irqEnable: false,
  };
}

function createMockGameState(): GameState {
  return {
    frame: 0,
    scene: 'boot',
    mode: 0,
    controller1: 0,
    controller2: 0,
    mmc3: createMockMmc3(),
    ppu: createMockPpu(),
    cpu: createMockNesRam(),
  };
}

function createMockMem(): NesMemory {
  const rom = createMockRom();
  const ppu = createMockPpu();
  const mmc3 = createMockMmc3();
  return createMemory(rom, ppu, mmc3);
}

// ==============================================================
// 场景索引查表测试
// ==============================================================

describe('lookupSceneIndex_83DC (主场景表)', () => {
  it('progress=0 → 返回场景索引 0x02', () => {
    expect(lookupSceneIndex_83DC(0)).toBe(0x02);
  });

  it('progress=5 → 返回 0x07', () => {
    expect(lookupSceneIndex_83DC(5)).toBe(0x07);
  });

  it('progress=10 → 返回 0x0C', () => {
    expect(lookupSceneIndex_83DC(10)).toBe(0x0C);
  });

  it('progress=15 → 返回 0x12', () => {
    expect(lookupSceneIndex_83DC(15)).toBe(0x12);
  });

  it('progress=26 → 返回 0x18', () => {
    expect(lookupSceneIndex_83DC(26)).toBe(0x18);
  });

  it('progress=31 → 返回 0x1E', () => {
    expect(lookupSceneIndex_83DC(31)).toBe(0x1E);
  });

  it('progress=32 → 返回 0x20', () => {
    expect(lookupSceneIndex_83DC(32)).toBe(0x20);
  });

  it('progress=33 → 返回 0x00 (结束)', () => {
    expect(lookupSceneIndex_83DC(33)).toBe(0x00);
  });

  it('progress>=34 → 返回 0x00 (越界保护)', () => {
    expect(lookupSceneIndex_83DC(34)).toBe(0x00);
    expect(lookupSceneIndex_83DC(100)).toBe(0x00);
    expect(lookupSceneIndex_83DC(255)).toBe(0x00);
  });
});

describe('lookupSceneIndex_83FE (第二场景表)', () => {
  it('progress=0-8 → 全为零 (无过场)', () => {
    for (let i = 0; i <= 8; i++) {
      expect(lookupSceneIndex_83FE(i)).toBe(0x00);
    }
  });

  it('progress=9 → 0x0A (有过场)', () => {
    expect(lookupSceneIndex_83FE(9)).toBe(0x0A);
  });

  it('progress=30 → 0x21', () => {
    expect(lookupSceneIndex_83FE(30)).toBe(0x21);
  });

  it('progress=32 → 0x03', () => {
    expect(lookupSceneIndex_83FE(32)).toBe(0x03);
  });

  it('progress=33 → 0x04', () => {
    expect(lookupSceneIndex_83FE(33)).toBe(0x04);
  });
});

describe('lookupSceneIndex_8420 (第三场景表)', () => {
  it('progress=0 → 0x05', () => {
    expect(lookupSceneIndex_8420(0)).toBe(0x05);
  });

  it('progress=7 → 0x0B', () => {
    expect(lookupSceneIndex_8420(7)).toBe(0x0B);
  });

  it('progress=15 → 0x14', () => {
    expect(lookupSceneIndex_8420(15)).toBe(0x14);
  });

  it('progress=32/33 → 0x00 (无更多)', () => {
    expect(lookupSceneIndex_8420(32)).toBe(0x00);
    expect(lookupSceneIndex_8420(33)).toBe(0x00);
  });
});

describe('lookupSceneIndex_8442 (第四场景表)', () => {
  it('progress=3 → 0x08', () => {
    expect(lookupSceneIndex_8442(3)).toBe(0x08);
  });

  it('progress=9 → 0x0F', () => {
    expect(lookupSceneIndex_8442(9)).toBe(0x0F);
  });

  it('progress=13 → 0x13', () => {
    expect(lookupSceneIndex_8442(13)).toBe(0x13);
  });

  it('progress=19 → 0x15', () => {
    expect(lookupSceneIndex_8442(19)).toBe(0x15);
  });

  it('progress=30 → 0x22', () => {
    expect(lookupSceneIndex_8442(30)).toBe(0x22);
  });
});

// ==============================================================
// progressPhase0 测试
// ==============================================================

describe('progressPhase0', () => {
  let ctx: GameState;
  let mem: NesMemory;

  beforeEach(() => {
    ctx = createMockGameState();
    mem = createMockMem();
  });

  it('progress=0 (< 0x20) → INC $26: $00→$01', () => {
    ctx.cpu.ram[0x26] = 0x00; // 初始进度
    ctx.cpu.ram[0x27] = 0x00; // Phase 0

    progressPhase0(ctx, mem);

    // $26 应该 +1
    expect(ctx.cpu.ram[0x26]).toBe(0x01);
    // $0700 设为 1
    expect(mem.ram[0x0700]).toBe(1);
  });

  it('progress=ox02 (< 0x20) → $26: $02→$03', () => {
    ctx.cpu.ram[0x26] = 0x02;
    ctx.cpu.ram[0x27] = 0x00;

    progressPhase0(ctx, mem);

    expect(ctx.cpu.ram[0x26]).toBe(0x03);
  });

  it('progress=0x02 → 触发 $0446 = 5 (因为 >=3)', () => {
    ctx.cpu.ram[0x26] = 0x02;
    ctx.cpu.ram[0x27] = 0x00;

    progressPhase0(ctx, mem);

    // $26 推进后 = 3, >= 3 → $0446=5
    expect(ctx.cpu.ram[0x26]).toBe(0x03);
    expect(mem.ram[0x0446]).toBe(5);
  });

  it('progress=0x1F (刚好在比赛阈值前) → INC 到 $20', () => {
    ctx.cpu.ram[0x26] = 0x1F;
    ctx.cpu.ram[0x27] = 0x00;

    progressPhase0(ctx, mem);

    expect(ctx.cpu.ram[0x26]).toBe(0x20);
    expect(ctx.cpu.ram[0x27]).toBe(0x00); // 仍在 Phase 0
    // $0446 should be set since 0x20 >= 3
    expect(mem.ram[0x0446]).toBe(5);
  });

  it('progress=0x20 (>= MATCH_THRESHOLD) → $27=5 进入竞赛模式', () => {
    ctx.cpu.ram[0x26] = 0x20; // >= 0x20
    ctx.cpu.ram[0x27] = 0x00;

    progressPhase0(ctx, mem);

    // >= threshold → 不 INC $26, 而是 $27=5
    expect(ctx.cpu.ram[0x26]).toBe(0x20);
    expect(ctx.cpu.ram[0x27]).toBe(5);
  });

  it('progress 推进后 ZP 索引清空', () => {
    ctx.cpu.ram[0x26] = 0x05;
    ctx.cpu.ram[0x28] = 0x55; // 脏数据
    ctx.cpu.ram[0x29] = 0xAA;

    progressPhase0(ctx, mem);

    expect(ctx.cpu.ram[0x28]).toBe(0x00);
    expect(ctx.cpu.ram[0x29]).toBe(0x00);
  });
});

// ==============================================================
// progressPhase1_4 测试
// ==============================================================

describe('progressPhase1_4', () => {
  let ctx: GameState;
  let mem: NesMemory;

  beforeEach(() => {
    ctx = createMockGameState();
    mem = createMockMem();
  });

  it('中间过场完成 → 清索引 ($28,$29,$27=0)', () => {
    ctx.cpu.ram[0x28] = 0xAA; // 脏
    ctx.cpu.ram[0x29] = 0x55;
    ctx.cpu.ram[0x27] = 0x03;

    progressPhase1_4(ctx, mem);

    expect(ctx.cpu.ram[0x28]).toBe(0x00);
    expect(ctx.cpu.ram[0x29]).toBe(0x00);
    expect(ctx.cpu.ram[0x27]).toBe(0x00); // 重置为 Phase 0
  });
});

// ==============================================================
// progressPhase5 测试
// ==============================================================

describe('progressPhase5', () => {
  let ctx: GameState;
  let mem: NesMemory;

  beforeEach(() => {
    ctx = createMockGameState();
    mem = createMockMem();
  });

  it('竞赛模式启动 → $0700=1, $27=0', () => {
    ctx.cpu.ram[0x27] = 5;

    progressPhase5(ctx, mem);

    expect(mem.ram[0x0700]).toBe(1);
    expect(ctx.cpu.ram[0x27]).toBe(0); // 重置
  });
});

// ==============================================================
// initMatchSequence 测试
// ==============================================================

describe('initMatchSequence', () => {
  let ctx: GameState;
  let mem: NesMemory;

  beforeEach(() => {
    ctx = createMockGameState();
    mem = createMockMem();
  });

  it('比赛初始化: 清索引 + 设 $0700', () => {
    ctx.cpu.ram[0x28] = 0x99; // 脏
    ctx.cpu.ram[0x29] = 0x88;

    initMatchSequence(ctx, mem);

    expect(ctx.cpu.ram[0x28]).toBe(0x00);
    expect(ctx.cpu.ram[0x29]).toBe(0x00);
    expect(ctx.cpu.ram[0x27]).toBe(0x00);
    expect(mem.ram[0x0700]).toBe(0x55);
  });

  it('正常难度 (progress < 0x20) → diffVal=0x55', () => {
    ctx.cpu.ram[0x26] = 0x05;

    initMatchSequence(ctx, mem);

    expect(mem.ram[0x0700]).toBe(0x55);
  });

  it('高难度 (progress >= 0x20) → diffVal=0x4C', () => {
    ctx.cpu.ram[0x26] = 0x20;

    initMatchSequence(ctx, mem);

    expect(mem.ram[0x0700]).toBe(0x4C);
  });

  it('清 $0450-$0453 比赛状态区', () => {
    mem.ram[0x0450] = 0xFF;
    mem.ram[0x0451] = 0xFF;
    mem.ram[0x0452] = 0xFF;
    mem.ram[0x0453] = 0xFF;

    initMatchSequence(ctx, mem);

    expect(mem.ram[0x0450]).toBe(0);
    expect(mem.ram[0x0451]).toBe(0);
    expect(mem.ram[0x0452]).toBe(0);
    expect(mem.ram[0x0453]).toBe(0);
  });
});

// ==============================================================
// 边界条件: $26 状态全表遍历
// ==============================================================

describe('$26 全表遍历', () => {
  it('所有 34 个进度值查表不抛异常', () => {
    for (let i = 0; i <= 34; i++) {
      expect(() => {
        lookupSceneIndex_83DC(i);
        lookupSceneIndex_83FE(i);
        lookupSceneIndex_8420(i);
        lookupSceneIndex_8442(i);
      }).not.toThrow();
    }
  });

  it('每个进度的主场景表至少有一个有意义的索引 (或 0)', () => {
    const nonZeroCounts: Record<number, number> = {};
    for (let i = 0; i <= 33; i++) {
      const tables = [
        lookupSceneIndex_83DC(i),
        lookupSceneIndex_83FE(i),
        lookupSceneIndex_8420(i),
        lookupSceneIndex_8442(i),
      ];
      nonZeroCounts[i] = tables.filter(v => v !== 0).length;
    }
    // 至少有 20+ 个进度值有非零场景
    const activePhases = Object.values(nonZeroCounts).filter(c => c > 0).length;
    expect(activePhases).toBeGreaterThan(20);
  });
});
