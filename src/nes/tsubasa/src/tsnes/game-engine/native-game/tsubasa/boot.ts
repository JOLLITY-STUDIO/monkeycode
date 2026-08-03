/**
 * Boot entry point — Bank-by-bank 6502 → TypeScript 翻译引擎
 * 
 * 测试写到了 sys.mem 但代码读的是 DATA_$8F6B_$927B 导入文件。这是 native game 模型的关键点
 *
 * ═══════════════════════════════════════
 * 启动流程 (纯翻译模式，不走 CPU 模拟器)
 * ═══════════════════════════════════════
 *
 * 1. 创建 PPU/APU 硬件模拟层 (保留，供渲染/音频)
 * 2. 创建 SystemState (替代 CPU 模拟器)
 * 3. SystemState 内部自动管理 bank ROM 注册与 MMC3 内存映射
 *    - 翻译代码直接通过import 调用接口拿数据，
 * 无需 6502 opcode 解释
 * 类似httpapi，code就是controller 提供接口和业务处理调用即可输出。但是数据基本由内部消费，不对外开放。
 * 4. 调用 translate_BANK31_RESET → 进入主循环
 *
 * ═══════════════════════════════════════
 * Bank 翻译状态
 * ═══════════════════════════════════════
 *
 *   ✅ bank 00 — 场景分派引擎 + boot 状态机 (逐帧)
 *   ✅ bank 01 — 比赛跳跃/标题渲染
 *   ✅ bank 02 — NMI 渲染器
 *   ✅ bank 11 — 背景/瓦片渲染器
 *   ✅ bank 12 — 音频引擎
 *   ✅ bank 16 — 场景脚本引擎 (per-frame tick + F3 sub-dispatch)
 *   ✅ bank 19 — 脚本解析器
 *   ✅ bank 20 — 队伍选择 (per-frame tick + ROM 阵型)
 *   ✅ bank 22 — 精灵/OAM 引擎
 *   ✅ bank 24 — 过场引擎
 *   ✅ bank 26 — 比赛引擎
 *   ✅ bank 27 — 球员数据 (ROM 指针表 + 名称解码)
 *   ✅ bank 28 — 球员属性/阵型引擎 (6 entry points)
 *   ✅ bank 30 — 系统库 (37 函数)
 *   ✅ bank 31 — 启动向量 + 主循环 (boot 状态机)
 *
 * ═══════════════════════════════════════
 * 旧版本留底
 * ═══════════════════════════════════════
 *
 *   原始 6502 CPU 模拟器版本保留在 game-engine-v1/ (git checkpoint 88170f9)。
 *   如需回滚: git checkout 88170f9 -- game-engine/
 */

import NES from '../../core/nes';
import type { NESOptions, ControllerId } from '../../core/nes';
import type { ButtonKey } from '../../core/controller';
import Tile from '../../core/tile';
import { createSystemState, SystemState } from './banks/system-state';
import { translate_BANK31_RESET } from './banks/prg/bank-31-code';
import { NES_CHR_ROM } from '../../../rom-data/index';

/**
 * 从 raw CHR-ROM 二进制数据填充 PPU 的 ptTile 缓存。
 * CHR-ROM 格式: 每 tile 16 bytes (8 low plane + 8 high plane)，共 512 tiles/8KB。
 */
function loadChrTiles(ptTile: Tile[], chrRom: readonly number[], bankStart: number): void {
  for (let ti = 0; ti < 512; ti++) {
    const off = bankStart + ti * 16;
    const scanline = new Uint8Array(16);
    for (let b = 0; b < 16; b++) scanline[b] = chrRom[off + b] ?? 0;
    ptTile[ti].setBuffer(scanline);
  }
}

/** MMC3 CHR 窗口定义: [ptTile 起始索引, tile 数, CHR 页大小(1=1KB,2=2KB)] */
const CHR_WINDOWS: [number, number, number][] = [
  [0,   128, 2],   // Reg 0: $0000-$07FF, 2KB, tiles 0-63  → but load 128 tiles for 2KB
  [64,  128, 2],   // Reg 1: $0800-$0FFF, 2KB, tiles 64-127
  [128,  64, 1],   // Reg 2: $1000-$13FF, 1KB, tiles 128-159
  [160,  64, 1],   // Reg 3: $1400-$17FF, 1KB, tiles 160-191
  [192,  64, 1],   // Reg 4: $1800-$1BFF, 1KB, tiles 192-223
  [224,  64, 1],   // Reg 5: $1C00-$1FFF, 1KB, tiles 224-255
];

/** 将 MMC3 CHR 页加载到 ptTile 指定偏移 */
export function _loadChrPage(
  ptTile: Tile[],
  chrRom: ReadonlyArray<number>,
  sel: number,
  pageNum: number,
): void {
  const win = CHR_WINDOWS[sel];
  if (!win) return;
  const [tileStart, tileLoadCount, pageSizeKB] = win;
  // 1KB page = 1024 bytes, 2KB page = 2048 bytes
  const byteOffset = pageNum * pageSizeKB * 1024;
  const tileCount = tileLoadCount; // number of tiles to load

  for (let ti = 0; ti < tileCount; ti++) {
    const chrOff = byteOffset + ti * 16;
    const scanline = new Uint8Array(16);
    for (let b = 0; b < 16; b++) {
      const idx = chrOff + b;
      scanline[b] = (idx < chrRom.length) ? (chrRom[idx] ?? 0) : 0;
    }
    ptTile[tileStart + ti].setBuffer(scanline);
  }
}

/**
 * 为 Bank 翻译引擎创建 mmap 对象（带 MMC3 CHR 切换支持）。
 * Bank 引擎不走 ROM 加载路径，PPU 需要 mmap 来拿 tile 数据和 mapper 回调。
 */
function createBankMmap(nes: any, chrRom: ReadonlyArray<number>): any {
  // 当前 MMC3 CHR 窗口值 (sel 0-5)，初始全 0
  const chrRegs = new Uint8Array(6);

  // 初始化: 加载所有窗口的默认数据 (页 0)
  for (let sel = 0; sel < 6; sel++) {
    _loadChrPage(nes.ppu.ptTile, chrRom, sel, 0);
  }

  return {
    nes,
    _chrRegs: chrRegs,
    clockIrqCounter: () => {},
    latchAccess: (_addr: number) => {},
    canWriteChr: (_addr: number) => false,
    onBgRender: () => {},
    onSpriteRender: () => {},
    getSpritePatternTile: (index: number) => nes.ppu.ptTile[index],
    getBgTileData: () => null,
    /** MMC3 寄存器写入 (sel 0-5 = CHR 窗口) */
    write(addr: number, val: number): void {
      if ((addr & 1) === 0) {
        // $8000: MMC3 bank select — 记录 sel (低3位)
        nes.__mmc3Sel = val & 7;
      } else {
        // $8001: MMC3 bank data — 只有 CHR 窗口 (sel 0-5) 需要处理
        const sel = nes.__mmc3Sel;
        if (sel <= 5) {
          const oldVal = chrRegs[sel];
          chrRegs[sel] = val;
          if (oldVal !== val) {
            _loadChrPage(nes.ppu.ptTile, chrRom, sel, val);
          }
        }
      }
    },
    toJSON: () => ({}),
    fromJSON: (_s: any) => {},
  };
}

/**
 * 创建 NES 实例（纯翻译路径，不走 CPU 模拟器）。
 *
 * 翻译路径:
 *   SystemState 直操内存/PPU，bank-by-bank 翻译为 TS。
 *   各 bank 的 ROM 数据通过 import 时自动 registerBankRom() 注册到 SystemState，
 *   MMC3 映射由 bank 翻译代码中的 bankSwitch 管理。
 *
 * 返回的 NES 实例上附加 `__tsSys` 属性供翻译路径使用。
 */
export function createTsubasaNES(opts?: NESOptions): NES {
  const nes = new NES(opts ?? {});

  // ── 注入 mmap（带 MMC3 CHR 切换支持）──
  const chrRom = NES_CHR_ROM as readonly number[];
  nes.mmap = createBankMmap(nes, chrRom);

  // ── 注入 fake ROM 对象 + 初始化 PPU 镜像模式 ──
  // Bank 引擎不走 loadROM，PPU.setMirroring 需要 this.nes.rom 提供 mirroring 常量
  (nes as any).rom = {
    VERTICAL_MIRRORING: 0,
    HORIZONTAL_MIRRORING: 1,
    FOURSCREEN_MIRRORING: 2,
    SINGLESCREEN_MIRRORING: 3,
    SINGLESCREEN_MIRRORING2: 4,
  };
  nes.ppu.setMirroring(1); // HORIZONTAL_MIRRORING

  // ── 翻译路径: 初始化 SystemState ──────────────
  const sys = createSystemState(nes.ppu, nes.papu);
  (nes as any).__tsSys = sys;
  // 注入 DMA 内存源 — bank 模式没有 CPU，sramDMA 直接从 SystemState.mem 读
  (nes.ppu as any)._dmaMem = sys.mem;
  translate_BANK31_RESET(sys);

  return nes;
}

/**
 * 从 NES 实例获取翻译 SystemState。
 * 用于在翻译路径中替代 CPU 模拟器直接操作内存。
 */
export function getSystemState(nes: NES & { __tsSys?: SystemState }): SystemState | null {
  return nes.__tsSys ?? null;
}

/** 翻译引擎完整实例（CPU 模拟器 + 翻译双路径） */
export interface TSEngine {
  nes: NES;
  sys: SystemState;
}

// 重新导出类型以保持兼容
export type { NESOptions, ControllerId, ButtonKey };
export { NES };
export type { SystemState };
// TSEngine already exported above (line 74)
