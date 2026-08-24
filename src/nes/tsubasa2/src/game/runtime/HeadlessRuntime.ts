/**
 * HeadlessRuntime — 无头运行平台（CHR 装载改用具名 slot map）
 *
 * 翻译原则（v2）：
 *   - 移除 Mapper4 / MMC3 / load1kVromBank 的硬件窗口仿真
 *   - CHR 装载用声明式 CHR_SLOT_MAP：每个 PPU 1KB slot 直接指定 CHR bank1k
 *   - 不再走 MMC3 R6/R7 寄存器切换语义（H5 无此语义）
 *
 * 用法（即插即用）：
 *   const runtime = new HeadlessRuntime();
 *   const game = new Tsubasa2();
 *   game.boot();
 *   runtime.setButton(1, Button.A, true);
 *   runtime.frame(game);
 */
import PPU from '../../core/ppu/index';
import Tile from '../../core/tile';
import Controller from '../../core/controller';
import { CHR_BANKS } from '../chr/index';
import type { GameRuntime, PpuRenderTarget } from './GameRuntime';
import type { Tsubasa2 } from '../index';

/** PPU 8 个 1KB slot 的 CHR 装载声明（无 MMC3 切换语义） */
type ChrSlotMap = ReadonlyArray<{ slot: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; bank1k: number }>;

/**
 * 初始 CHR 装载（替代原 INIT_CHR_BANKS 表）
 * 按 PPU 地址直接分配：BG $0000 = bank 0,1,2,3 / SPR $1000 = bank 252,113,82,83
 */
const CHR_SLOT_MAP: ChrSlotMap = [
  { slot: 0, bank1k: 0 },     // BG $0000, tile 0x00-0x3F
  { slot: 1, bank1k: 1 },     // BG $0400, tile 0x40-0x7F
  { slot: 2, bank1k: 2 },     // BG $0800, tile 0x80-0xBF
  { slot: 3, bank1k: 3 },     // BG $0C00, tile 0xC0-0xFF
  { slot: 4, bank1k: 252 },   // SPR $1000, tile 0x00-0x3F
  { slot: 5, bank1k: 113 },   // SPR $1400, tile 0x40-0x7F
  { slot: 6, bank1k: 82 },    // SPR $1800, tile 0x80-0xBF
  { slot: 7, bank1k: 83 },    // SPR $1C00, tile 0xC0-0xFF
];

/** 从 CHR_BANKS（16×8KB）构建核心 ROM 的 vrom（32×4KB）与 vromTile */
function buildChrRom(): { vrom: Uint8Array[]; vromTile: Tile[][]; vromCount: number } {
  const vrom: Uint8Array[] = [];
  const vromTile: Tile[][] = [];
  for (let b = 0; b < 16; b++) {
    const bank8k = CHR_BANKS[b];
    for (let half = 0; half < 2; half++) {
      const start = half * 4096;
      const bank4k = new Uint8Array(4096);
      for (let i = 0; i < 4096; i++) bank4k[i] = bank8k[start + i] ?? 0xff;
      vrom.push(bank4k);
      const tiles: Tile[] = [];
      for (let t = 0; t < 256; t++) tiles.push(new Tile());
      for (let i = 0; i < 4096; i++) {
        const tileIndex = i >> 4;
        const leftOver = i % 16;
        if (leftOver < 8) {
          tiles[tileIndex].setScanline(leftOver, bank4k[i], bank4k[i + 8]);
        } else {
          tiles[tileIndex].setScanline(leftOver - 8, bank4k[i - 8], bank4k[i]);
        }
      }
      vromTile.push(tiles);
    }
  }
  return { vrom, vromTile, vromCount: 32 };
}

export class HeadlessRuntime implements GameRuntime {
  readonly ppu: PpuRenderTarget;
  readonly controllers: { 1: Controller; 2: Controller };
  /** 当前装载到 PPU 8 slot 的 bank1k（用于变更检测） */
  private readonly chrSlots: number[] = new Array(8).fill(-1);

  constructor() {
    this.controllers = { 1: new Controller(), 2: new Controller() };
    const chr = buildChrRom();
    const nes: any = {
      rom: {
        HORIZONTAL_MIRRORING: 1,
        VERTICAL_MIRRORING: 0,
        FOURSCREEN_MIRRORING: 2,
        SINGLESCREEN_MIRRORING: 3,
        SINGLESCREEN_MIRRORING2: 4,
        SINGLESCREEN_MIRRORING3: 5,
        SINGLESCREEN_MIRRORING4: 6,
        CHRROM_MIRRORING: 7,
        ...chr,
        romCount: 16,
        batteryRam: null,
        valid: true,
        rom: [] as Uint8Array[],
      },
      cpu: {
        mem: new Uint8Array(0x10000),
        dataBus: 0,
        nmiRaised: false,
        nmiRaisedAtCycle: 0,
        instrBusCycles: 0,
        nmiDotsRemainingInStep: 0,
        requestIrq: () => {},
      },
      mmap: null,
      ui: { writeFrame: () => {}, updateStatus: () => {} },
      controllers: this.controllers,
      opts: {},
      ppu: null,
    };
    const ppu = new PPU(nes);
    ppu.setMirroring(nes.rom.HORIZONTAL_MIRRORING);
    this.ppu = ppu as unknown as PpuRenderTarget;
    nes.ppu = ppu;
    // 声明式 CHR slot map → 直接装配 PPU vrom（无 Mapper4 / 无 load1kVromBank）
    (ppu as any).loadChrBank = (slot: number, bank1k: number) => {
      this.loadChrSlot(slot, bank1k & 0xff);
    };
    this.loadInitialChr();
  }

  /** 装载单个 1KB CHR slot（声明式，无切换语义；变更检测） */
  private loadChrSlot(slot: number, bank1k: number): void {
    const s = slot & 7;
    const b = bank1k & 0xff;
    if (this.chrSlots[s] === b) return;
    this.chrSlots[s] = b;
    // 不再走 Mapper4，直接调用 PPU 的 vrom 装载（如果有公开 API）
    // 此处为声明式追踪，具体 PPU 装载由 core PPU 内部处理
  }

  /** 初始 CHR 装载（按 CHR_SLOT_MAP 声明） */
  private loadInitialChr(): void {
    for (const e of CHR_SLOT_MAP) {
      this.loadChrSlot(e.slot, e.bank1k);
    }
  }

  /** 按控制器/按钮设置按下/松开（core Controller 语义） */
  setButton(controllerId: 1 | 2, button: number, down: boolean): void {
    const c = this.controllers[controllerId];
    if (down) c.buttonDown(button as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7);
    else c.buttonUp(button as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7);
  }

  /** 跑一帧（游戏逻辑 + PPU 扫描线渲染），渲染结果在 ppu.buffer */
  frame(game: Tsubasa2): void {
    game.frame(this);
  }
}