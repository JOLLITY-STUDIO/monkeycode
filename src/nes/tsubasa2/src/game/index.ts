/**
 * 天使之翼2 — game 层聚合出口 + Tsubasa2 主类（组合根）
 *
 * 组合约定: 主类就是 index 本身。page 只启动模拟器 (BrowserMini),
 * 本文件负责把 DataStore + 各 Service 组合成 Tsubasa2 主板, 每帧:
 *
 *   1. InterruptService.nmi(frame) — NMI 语义每帧更新 (OAM DMA / VRAM 缓冲
 *      回放 / 滚动 / 输入读取 / 主逻辑推进)
 *   2. writeStoreToPpu() — 把 DataStore 的 NT/调色板/OAM/滚动"直接写内存"
 *      进 PPU 渲染内存 (ppu.writeMem / oamStore / scrollStore)。
 *      去 CPU 化后不存在寄存器级同步, 不需要 PpuSync; 这就是直写。
 *   3. nes.frame() — PPU 扫描线渲染 (背景/精灵/调色板/滚动全在 PPU 内)
 *
 * 与模拟器模式 1:1: PPU 渲染读取源不变 (vramStore/nameTable/oamStore),
 * 只是灌入路径从"CPU 写 $2000-$2007 寄存器"变成"直写字节"。
 */
import type NES from '../core/nes';

import { DataStore } from './prg/data/store/DataStore';
import { GameSystemService } from './prg/code/system/GameSystemService';
import { BootRouter } from './prg/code/system/BootRouter';
import { InterruptService } from './prg/code/system/InterruptService';
import { HardwareInitService } from './prg/code/system/HardwareInitService';
import { SkillService } from './prg/code/skill/SkillService';
import type { PaletteTable, NameTableEntry } from '../../core/nes-ram';

export * from './header';
export * from './chr/index';
export * from './rom';
export * from './prg/index';

// ═══════════════════════════════════════════════════════════
// 直写函数 — "直接写内存": DataStore 结构化数据 → PPU 渲染内存字节
// ═══════════════════════════════════════════════════════════

/** RGB → 最近 NTSC 索引 (0-63), 基于 ppu.palTable.curTable (0xRRGGBB) */
export function rgbToNearestIndex(
  curTable: Uint32Array,
  r: number,
  g: number,
  b: number,
): number {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < 64; i++) {
    const c = curTable[i];
    const dr = ((c >> 16) & 0xff) - r;
    const dg = ((c >> 8) & 0xff) - g;
    const db = (c & 0xff) - b;
    const d = dr * dr + dg * dg + db * db;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

/** 写一个 NT (960 tile + 64 属性字节) 到 PPU VRAM ($2000/$2400 基址) */
function writeNameTable(ppu: any, base: number, nt: NameTableEntry[][]): void {
  for (let y = 0; y < 30; y++) {
    const row = nt[y];
    if (!row) continue;
    for (let x = 0; x < 32; x++) {
      ppu.writeMem(base + y * 32 + x, row[x].tile & 0xff);
    }
  }
  // 属性表: 每字节 = 4×4 tiles 的 4 个 2bit 调色板 (NES 布局)
  for (let ay = 0; ay < 8; ay++) {
    const y0 = ay * 4;
    const y1 = y0 + 2;
    for (let ax = 0; ax < 8; ax++) {
      const x0 = ax * 4;
      const x1 = x0 + 2;
      const p00 = nt[y0]?.[x0]?.palette ?? 0;
      const p01 = nt[y0]?.[x1]?.palette ?? 0;
      const p10 = nt[y1]?.[x0]?.palette ?? 0;
      const p11 = nt[y1]?.[x1]?.palette ?? 0;
      const v = (p00 & 3) | ((p01 & 3) << 2) | ((p10 & 3) << 4) | ((p11 & 3) << 6);
      ppu.writeMem(base + 0x3c0 + ay * 8 + ax, v);
    }
  }
}

/**
 * 直写调色板 — palWriteAll 语义 (注释要求的实现):
 * DataStore.paletteTable (RGB) → NTSC 索引 → ppu.writeMem($3F00-$3F1F)。
 * writeMem 在 $3F00 区触发 updatePalettes() → imgPalette/sprPalette。
 */
export function writePalettes(ppu: any, paletteTable: PaletteTable): void {
  const cur = ppu.palTable.curTable as Uint32Array;
  const bg = paletteTable.bgPalettes;
  const spr = paletteTable.sprPalettes;
  for (let p = 0; p < 4; p++) {
    const bpc = bg[p].colors;
    const spc = spr[p].colors;
    for (let c = 0; c < 4; c++) {
      ppu.writeMem(0x3f00 + p * 4 + c, rgbToNearestIndex(cur, bpc[c].r, bpc[c].g, bpc[c].b));
      ppu.writeMem(0x3f10 + p * 4 + c, rgbToNearestIndex(cur, spc[c].r, spc[c].g, spc[c].b));
    }
  }
}

/** 直写 OAM: ram_0200 硬件 OAM (ShadowOam.copyToHw 产物) → ppu.oamStore */
export function writeOam(store: DataStore, ppu: any): void {
  for (let i = 0; i < 0x100; i++) {
    ppu.oamStore.set(i, store.read(0x0200 + i));
  }
}

/** 直写滚动: store.scrollX/Y (pixel) → PPU 滚动寄存器 (fine/tile/nt) */
export function writeScroll(store: DataStore, ppu: any): void {
  const sx = store.scrollX & 0xff;
  const sy = store.scrollY & 0xff;
  const ss = ppu.scrollStore;
  ss.set('h_fine', sx & 7);
  ss.set('h_tile', (sx >> 3) & 31);
  ss.set('h_nt', (sx >> 8) & 1);
  ss.set('v_fine', sy & 7);
  ss.set('v_tile', (sy >> 3) & 31);
  ss.set('v_nt', (sy >> 8) & 1);
}

/** 全量直写: DataStore → PPU 渲染内存 (NT/调色板/OAM/滚动) */
export function writeStoreToPpu(store: DataStore, ppu: any): void {
  writeNameTable(ppu, 0x2000, store.nt0);
  writeNameTable(ppu, 0x2400, store.nt1);
  writePalettes(ppu, store.paletteTable);
  writeOam(store, ppu);
  writeScroll(store, ppu);
}

// ═══════════════════════════════════════════════════════════
// Tsubasa2 — 组合根 (主类)
// ═══════════════════════════════════════════════════════════
export class Tsubasa2 {
  readonly store: DataStore;
  readonly system: GameSystemService;
  readonly router: BootRouter;
  readonly skill: SkillService;
  readonly interrupts: InterruptService;
  readonly hardware: HardwareInitService;

  /** 帧计数 (NMI 帧号) */
  protected _frame = 0;

  constructor() {
    this.store = new DataStore();
    this.system = new GameSystemService(this.store);
    this.router = new BootRouter(this.store);
    this.skill = new SkillService(this.store);
    this.interrupts = new InterruptService(this.store, this.system);
    this.hardware = new HardwareInitService(this.store, this.system, this.router, this.skill);
  }

  /** 启动: RESET → 硬件初始化 → resetScene(0) → bootScene(0) → 进入 BOOT 场景 */
  boot(): void {
    this._frame = 0;
    this.store.reset();
    this.interrupts.reset();
    this.hardware.init();
  }

  /** 每帧: NMI 推进游戏逻辑 → 直写 PPU 渲染内存 → PPU 扫描线渲染 */
  frame(nes: NES): void {
    this.interrupts.nmi(this._frame);
    writeStoreToPpu(this.store, nes.ppu);
    nes.frame();
    this._frame++;
  }
}

export default Tsubasa2;
