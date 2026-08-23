/**
 * HeadlessRuntime — 无头运行平台（核心 PPU 复用，不跑 CPU）
 *
 * 提供：
 *  - headless PPU（256×240 帧缓冲，直接驱动扫描线渲染）
 *  - CHR pattern 装载（初始 MMC3 配置，真实渲染基础）
 *  - 两套核心控制器（buttonDown/buttonUp）
 *
 * 用法（即插即用）：
 *   const runtime = new HeadlessRuntime();
 *   const game = new Tsubasa2();
 *   game.boot();
 *   runtime.setButton(1, Button.A, true); // 按下 A
 *   runtime.frame(game);                  // 跑一帧 → runtime.ppu.buffer 可绘制
 */
import PPU from '../../core/ppu/index';
import Tile from '../../core/tile';
import Controller from '../../core/controller';
import Mapper4 from '../../core/mappers/mapper4';
import { CHR_BANKS } from '../chr/index';
import type { GameRuntime, PpuRenderTarget } from './GameRuntime';
import type { Tsubasa2 } from '../index';

/**
 * MMC3 初始 CHR bank 配置（bank30 INIT_CHR，$C9E9 语义）。
 *
 * Ground truth（core 模拟器探针 scripts/_probe_orig2_out.txt，帧 10+）：
 *   原始 MMC3 chrBanks = [0,1,2,3,252,113,82,83]
 *   即 BG 表 $0000 = 1KB bank 0,1,2,3（CHR bank 0 前半）；SPR 表 $1000 = 252,113,82,83。
 * 此前硬编码 BG=4,5,6,7（CHR bank 0 后半）导致开场画面撕裂，已修正。
 */
const INIT_CHR_BANKS: ReadonlyArray<{ bank1k: number; addr: number }> = [
  { bank1k: 0, addr: 0x0000 }, // BG 表 0, tile 0x00-0x3F
  { bank1k: 1, addr: 0x0400 }, // BG 表 0, tile 0x40-0x7F
  { bank1k: 2, addr: 0x0800 }, // BG 表 0, tile 0x80-0xBF
  { bank1k: 3, addr: 0x0c00 }, // BG 表 0, tile 0xC0-0xFF
  { bank1k: 252, addr: 0x1000 }, // SPR 表 1, tile 0x00-0x3F
  { bank1k: 113, addr: 0x1400 }, // SPR 表 1, tile 0x40-0x7F
  { bank1k: 82, addr: 0x1800 }, // SPR 表 1, tile 0x80-0xBF
  { bank1k: 83, addr: 0x1c00 }, // SPR 表 1, tile 0xC0-0xFF
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
      // 构建 256 个 Tile（与 core ROM.load 相同的 setScanline 逻辑）
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
  /** 结构性类型：core PPU 构造器内赋值的数据成员（buffer/spriteMem/reg*）不在类类型中，运行时真实存在 */
  readonly ppu: PpuRenderTarget;
  readonly controllers: { 1: Controller; 2: Controller };
  private readonly mapper: Mapper4;
  private readonly nes: any;

  constructor() {
    this.controllers = { 1: new Controller(), 2: new Controller() };
    const chr = buildChrRom();
    // 最小 nes 骨架（仅满足 PPU/Mapper4 读依赖，CPU 不运行）
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
    this.nes = nes;
    const ppu = new PPU(nes);
    // 镜像设置（真实 header：Horizontal；core 常量 HORIZONTAL_MIRRORING=1）
    ppu.setMirroring(nes.rom.HORIZONTAL_MIRRORING);
    this.ppu = ppu as unknown as PpuRenderTarget;
    nes.ppu = ppu;
    this.mapper = new Mapper4(nes);
    nes.mmap = this.mapper;
    // PpuTarget.loadChrBank 实现（InterruptService $C9E9 请求表装载 → Mapper4）
    (ppu as any).loadChrBank = (slot: number, bank1k: number) => {
      this.mapper.load1kVromBank(bank1k & 0xff, (slot & 7) * 0x400);
    };
    // 初始 CHR 装载（真实渲染基础）
    this.loadInitChr();
  }

  /** 初始 MMC3 CHR bank 配置装载 */
  private loadInitChr(): void {
    for (const e of INIT_CHR_BANKS) {
      this.mapper.load1kVromBank(e.bank1k, e.addr);
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
