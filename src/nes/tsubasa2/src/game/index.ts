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

import { GameSystemService } from './prg/code/system/GameSystemService';
import { BootRouter } from './prg/code/system/BootRouter';
import { InterruptService } from './prg/code/system/InterruptService';
import { HardwareInitService } from './prg/code/system/HardwareInitService';
import { SkillService } from './prg/code/skill/SkillService';
import { AudioService } from './prg/code/audio/AudioService';
import type { PaletteTable, NameTableEntry } from '../core/nes-ram';

// 小程序编译器对 `export *` re-export 支持有限, 改为先 import 再 export (与 src/index.ts 一致)
import { HEADER, CONFIG, Mirroring } from './header';
import { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT } from './chr/index';
import { PRG } from './rom';
import { DataStore } from './prg/data/store/DataStore';

export { HEADER, CONFIG, Mirroring };
export { NES_CHR_ROM, CHR_BANKS, CHR_BANK_SIZE, CHR_BANK_COUNT };
export { PRG };
export { DataStore };

// ═══════════════════════════════════════════════════════════
// 直写函数 — "直接写内存": DataStore 结构化数据 → PPU 渲染内存字节
// ═══════════════════════════════════════════════════════════

/** 统计 NT 网格非零 tile 数 (调试用) */
export function countNtNonZero(nt: NameTableEntry[][]): number {
  let n = 0;
  for (let y = 0; y < 30; y++) {
    const row = nt[y];
    if (!row) continue;
    for (let x = 0; x < 32; x++) {
      if (row[x] && row[x].tile !== 0) n++;
    }
  }
  return n;
}

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
      const entry = row[x];
      const tile = entry && entry.tile != null ? entry.tile & 0xff : 0;
      ppu.writeMem(base + y * 32 + x, tile);
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
 * 直写调色板 — palWriteAll 语义:
 * 优先用 ram_062A (NES 索引, paletteLoadBG/paletteLoadSPR 写入) 直写 PPU $3F00。
 * 若 ram_062A 全 0 (调色板未装载), 用 paletteTable (RGB) fallback。
 */
export function writePalettes(store: any, ppu: any, paletteTable: PaletteTable): void {
  // 检查 ram_062A 是否有调色板数据 (paletteLoadBG/paletteLoadSPR 写入)
  let ramPalNonZero = false;
  for (let i = 0; i < 0x20; i++) {
    const key = 'ram_0' + (0x62A + i).toString(16).toUpperCase().padStart(3, '0');
    if ((store.read(key) & 0x3f) !== 0) { ramPalNonZero = true; break; }
  }
  if (ramPalNonZero) {
    // 用 ram_062A 的 NES 索引直写 PPU $3F00-$3F1F
    // 渐显偏移: BG 用 ram_004A, SPR 用 ram_004B (原版 $9A7E 语义)
    const fadeBg = store.read('ram_004A') & 0x0f;
    const fadeSpr = store.read('ram_004B') & 0x0f;
    for (let i = 0; i < 0x10; i++) {
      const key = 'ram_0' + (0x62A + i).toString(16).toUpperCase().padStart(3, '0');
      const v = (store.read(key) & 0x0f) | fadeBg;
      ppu.writeMem(0x3f00 + i, v & 0x3f);
    }
    for (let i = 0; i < 0x10; i++) {
      const key = 'ram_0' + (0x63A + i).toString(16).toUpperCase().padStart(3, '0');
      const v = (store.read(key) & 0x0f) | fadeSpr;
      ppu.writeMem(0x3f10 + i, v & 0x3f);
    }
    return;
  }
  // Fallback: paletteTable (RGB) → NTSC 索引
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

/** 直写 OAM: ram_0200 硬件 OAM (ShadowOam.copyToHw 产物) → ppu.spriteMem */
import { TSNES_FRAME10_OAM_0200 } from './prg/data/tables/tsnes-frame10-dump';
export function writeOam(store: DataStore, ppu: any): void {
  // TODO: 后续由 sub9085/sub9148 完整翻译后用 ram_0200 数据, 当前用 dump 过渡
  // 检查 ram_0200 是否有真实精灵 (非 $F8 隐藏值)
  let hasRealSprites = false;
  for (let i = 0; i < 64; i++) {
    const key = 'ram_0' + (0x200 + i * 4).toString(16).toUpperCase().padStart(3, '0');
    const y = store.read(key) & 0xff;
    if (y > 0 && y < 240) { hasRealSprites = true; break; }
  }
  if (hasRealSprites) {
    for (let i = 0; i < 0x100; i++) {
      const key = 'ram_0' + (0x200 + i).toString(16).toUpperCase().padStart(3, '0');
      ppu.spriteMem[i] = store.read(key) & 0xff;
    }
  } else {
    // ram_0200 全隐藏, 用 dump 数据过渡
    for (let i = 0; i < TSNES_FRAME10_OAM_0200.length && i < 0x100; i++) {
      ppu.spriteMem[i] = TSNES_FRAME10_OAM_0200[i];
    }
  }
}

/**
 * 直写滚动: store.scrollX/Y (pixel) → PPU 滚动寄存器。
 * tsnes PPU 直接用 regHT/regFH/regH/regV/regVT/regFV 字段。
 * 注意: 这些是 tsnes PPU 的可写字段 (非只读 getter), 写入后 startVBlank 会复制到 cnt* 触发渲染。
 */
export function writeScroll(store: DataStore, ppu: any): void {
  const sx = store.scrollX & 0xff;
  const sy = store.scrollY & 0xff;
  // tsnes PPU 的 regHT/regFH/regH/regVT/regFV/regV 是只读 getter (从 scrollStore KV 读取),
  // 直接赋值会抛 "Cannot set property regHT ... has only a getter"。
  // 正确写入: 用 ppu.scrollStore (ScrollStore) 的语义化 setter, setter 内部做 &31/&7/&1 掩码。
  const ss = ppu.scrollStore;
  if (ss) {
    ss.hTile = (sx >> 3) & 31;
    ss.hFine = sx & 7;
    ss.hNt = (sx >> 5) & 1;
    ss.vTile = (sy >> 3) & 31;
    ss.vFine = sy & 7;
    ss.vNt = (sy >> 5) & 1;
  }
}

/**
 * 直写 BOOT 精灵 CHR pattern → PPU pattern table 1 (ptTile[0x100+tile])。
 * MMC3 映射 (去 CPU 化等价): SPR table=1, tile 0x40-0x7F → CHR bank 14,
 * tile 0xC0-0xFF → CHR bank 10。
 * 注意: BOOT_SPR_CHR_SEGMENTS 已删除 (模拟器 dump 数据), CHR pattern 由正常 CHR bank 切换管理。
 */
export function writeBootChrPatterns(_ppu: any): void {
  // 去CPU化: CHR pattern 由 mapper4 CHR bank 配置管理, 不再直写
}

/** 全量直写: DataStore → PPU 渲染内存 (CTRL/MASK/NT/调色板/OAM/滚动/精灵pattern) */
export function writeStoreToPpu(store: DataStore, ppu: any): void {
  // PPU $2000/$2001 寄存器直写 (去 CPU 化后 CPU 写寄存器触发 updateControlReg 的等价):
  // ram_0020=PPU CTRL (NMI/精灵尺寸/背景图案表), ram_0021=PPU MASK (背景/精灵可见性)
  ppu.updateControlReg1(store.read('ram_0020'));
  ppu.updateControlReg2(store.read('ram_0021'));
  writeNameTable(ppu, 0x2000, store.nt0);
  // 水平镜像 (ntable1=[0,0,1,1]): $2400-$27BF 映射 nameTable[0] (与 $2000 同一物理 NT)。
  // 若把 nt1 写到 $2400, 空 nt1 会清掉刚填充的 NT0 → 黑屏。
  // 正确目标: $2800 (物理 NT B, ntable1[2]=1 → nameTable[1])。
  writeNameTable(ppu, 0x2800, store.nt1);
  writePalettes(store, ppu, store.paletteTable);
  writeOam(store, ppu);
  writeScroll(store, ppu);
  writeBootChrPatterns(ppu);
}

/** 直写 APU: DataStore apu_XXXX → tsnes PAPU writeReg */
export function writeApuToPapu(store: DataStore, papu: any): void {
  for (let addr = 0x4000; addr <= 0x4017; addr++) {
    const key = `apu_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
    const val = store.read(key);
    if (val !== undefined && val >= 0) {
      papu.writeReg(addr, val & 0xff);
    }
  }
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
  readonly audio: AudioService;

  /** 帧计数 (NMI 帧号) */
  protected _frame = 0;

  constructor() {
    this.store = new DataStore();
    this.system = new GameSystemService(this.store);
    this.router = new BootRouter(this.store);
    this.skill = new SkillService(this.store, this.system);
    this.interrupts = new InterruptService(this.store, this.system);
    this.audio = new AudioService(this.store);
    this.hardware = new HardwareInitService(this.store, this.system, this.router, this.skill);
    // 注入 bank30 引用到 GameSystemService, 供 $C5xx 派发表转发
    this.system.setHardwareInit(this.hardware);
    // 注入 bank02 NMI 渲染执行器到 InterruptService, 每帧 NMI 回放 $05E8 PPU buffer
    this.interrupts.attachRouter(this.router);
  }

  /** 启动: RESET → 硬件初始化 → resetScene(0) → 进入场景 (走正常场景装载流程) */
  boot(): void {
    this._frame = 0;
    this.store.reset();
    this.interrupts.reset();
    this.hardware.init();
    // BOOT 场景走正常 sceneLoad 流程 (GameSystemService.sceneLoad + NMI 回调),
    // 不再用模拟器 dump 的预存快照 (已删除 boot-scene.ts/OpeningSceneController)。
    console.log(
      `[Tsubasa2] boot() done. nt0=${countNtNonZero(this.store.nt0)}` +
        ` nt1=${countNtNonZero(this.store.nt1)} scrollX=${this.store.scrollX}` +
        ` scrollY=${this.store.scrollY} ram_00ED=${this.store.read('ram_00ED')}`,
    );
  }

  /** 每帧: NMI 推进游戏逻辑 → 直写 PPU 渲染内存 → PPU 扫描线渲染 */
  frame(nes: NES): void {
    this.interrupts.nmi(this._frame);
    // AudioService 每帧推进 (bank12 音频引擎 update: 读 $0700 请求队列, 写 $4000-$400F APU 寄存器)
    this.audio.update();
    try {
      writeStoreToPpu(this.store, nes.ppu);
    } catch (e) {
      console.error('writeStoreToPpu error at frame ' + this._frame + ': ' + (e as Error).message);
      throw e;
    }
    // APU 同步: DataStore apu_XXXX → tsnes PAPU writeReg
    if (nes.papu) {
      writeApuToPapu(this.store, nes.papu);
    }
    // H5 翻译版不跑 CPU (游戏逻辑由 interrupts.nmi + sys.update 驱动),
    // 直接调 PPU 渲染方法把 VRAM 画到 pixel buffer:
    //   startFrame → renderFramePartially(0,240) → endFrame (→ ui.writeFrame)
    const ppu: any = nes.ppu;
    try {
      ppu.startFrame();
      // H5 不跑 CPU, 用 advanceDots 推进 PPU 一整帧 (262 scanlines × 341 dots)
      // advanceDots 内部每 341 dots 调 endScanline, endScanline 调 renderBgScanline 渲染 bgbuffer
      ppu.advanceDots(262 * 341);
      // renderFramePartially 把 bgbuffer 复制到 buffer (检查 pixrendered > 0xff)
      ppu.renderFramePartially(0, 240);
      ppu.endFrame();
    } catch (e) {
      console.error('PPU render error at frame ' + this._frame + ': ' + (e as Error).message);
      throw e;
    }
    this._frame++;
    // 调试日志: 每 30 帧输出渲染数据摘要 (黑屏排查用, 微信开发者工具控制台可观察)
    if (this._frame % 30 === 0) {
      const buf = ppu.buffer as Uint32Array;
      let nz = 0;
      for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nz++;
      console.log(
        `[Tsubasa2] frame=${this._frame} nt0=${countNtNonZero(this.store.nt0)}` +
          ` nt1=${countNtNonZero(this.store.nt1)} bgVis=${ppu.f_bgVisibility}` +
          ` sprVis=${ppu.f_spVisibility} bufNonZero=${nz}` +
          ` scrollX=${this.store.scrollX} scrollY=${this.store.scrollY}` +
          ` ram_0538=${this.store.read('ram_0538')}`,
      );
    }
  }
}

export default Tsubasa2;
