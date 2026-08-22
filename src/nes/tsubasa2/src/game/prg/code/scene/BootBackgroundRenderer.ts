/**
 * BootBackgroundRenderer — BOOT 开场背景渲染 (真实 ROM 数据)
 *
 * 数据链路 (全部真实 ROM, 禁止模拟器 dump 快照):
 *   SCENE_0x0A (bank07 场景描述符) ── header [ptrLo,ptrHi,ctrl,w,h,pos] + w×h metatile 索引网格
 *   → METATILE_TABLE[idx] (bank08 map-metatile 字典, 16B tile 数据 = 4×4 个 8×8 tile)
 *   → 平铺 NT0 (32×30 tile 网格, 每 metatile 占 4×4 tile)
 *   → PALETTE_BG_06 / PALETTE_SPR_06 (bank06, 每组 16B) → DataStore.paletteTable (RGB)
 *   → writeStoreToPpu (src/game/index.ts) → PPU 渲染
 *
 * 对应 asm: bank00/code_scene.s $8B1C 场景装载 (读 header 写 ram_0075/76/48/5E/5F/5C/5D)
 *          + bank00/code_render.s $8EF0 地图画面绘制 (metatile 展开写 NT)
 *          + bank30 $CB35 清双名称表 (NT 清零基线)
 *
 * @bank 07 (场景描述符) / 08 (metatile 字典) / 06 (调色板)
 */
import type { PaletteColor } from '../../../../core/nes-ram';
import { DataStore } from '../../data/store/DataStore';
import { SCENE_0x0A } from '../../data/tables/bank07-scenes-metatile';
import { getMetatile } from '../../data/tables/bank08-map-metatile';
import { PALETTE_BG_06, PALETTE_SPR_06 } from '../../data/tables/bank06-palette';

/** 标准 NES NTSC 64 色调色板 (0xRRGGBB, 与模拟器 PPU palTable.loadNTSCPalette 一致) */
const NES_NTSC_RGB: readonly number[] = [
  0x525252, 0xB40000, 0xA00000, 0xB1003D, 0x740069, 0x00005B, 0x00005F, 0x001840,
  0x002F10, 0x084A08, 0x006700, 0x124200, 0x6D2800, 0x000000, 0x000000, 0x000000,
  0xC4D5E7, 0xFF4000, 0xDC0E22, 0xFF476B, 0xD7009F, 0x680AD7, 0x0019BC, 0x0054B1,
  0x006A5B, 0x008C03, 0x00AB00, 0x2C8800, 0xA47200, 0x000000, 0x000000, 0x000000,
  0xF8F8F8, 0xFFAB3C, 0xFF7981, 0xFF5BC5, 0xFF48F2, 0xDF49FF, 0x476DFF, 0x00B4F7,
  0x00E0FF, 0x00E375, 0x03F42B, 0x78B82E, 0xE5E218, 0x787878, 0x000000, 0x000000,
  0xFFFFFF, 0xFFF2BE, 0xF8B8B8, 0xF8B8D8, 0xFFB6FF, 0xFFC3FF, 0xC7D1FF, 0x9ADAFF,
  0x88EDF8, 0x83FFDD, 0xB8F8B8, 0xF5F8AC, 0xFFFFB0, 0xF8D8F8, 0x000000, 0x000000,
] as const;

/** NT 宽度 (tile 数) */
const NT_W = 32;
/** NT 高度 (tile 数) */
const NT_H = 30;

export class BootBackgroundRenderer {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /**
   * 渲染 BOOT 开场背景: NT0 (metatile 网格展开) + BG/SPR 调色板。
   * 场景 = SCENE_0x0A (开场, ram_00ED=$0A), 对应 asm $8B1C 场景装载 + $8EF0 地图绘制。
   */
  render(): void {
    this.renderSceneNt(SCENE_0x0A);
    this.renderPalette(SCENE_0x0A);
  }

  // ════════════════════════════════════════════════
  // 场景描述符解析 + metatile 网格平铺 → NT0
  // 对应 asm $8B31-$8B6F 读 header + $8E15/$8EF0 展开写 NT
  // ════════════════════════════════════════════════

  /** 解析场景描述符 header: [0]=ptrLo [1]=ptrHi [2]=ctrl [3]=w [4]=h [5]=pos */
  protected parseHeader(scene: readonly number[]): {
    ctrl: number; w: number; h: number; paletteIdx: number;
  } {
    const ctrl = scene[2] ?? 0;
    return {
      ctrl,
      w: scene[3] ?? 0,
      h: scene[4] ?? 0,
      paletteIdx: ctrl & 0x3F,
    };
  }

  /** 把场景描述符的 metatile 索引网格平铺到 NT0 (行优先, 每 metatile 4×4 tile) */
  protected renderSceneNt(scene: readonly number[]): void {
    const { w, h } = this.parseHeader(scene);
    const grid = scene.slice(6, 6 + w * h);
    // 行优先平铺: 每行 NT_W/4 个 metatile, 占满 32 tile 宽
    const perRow = NT_W / 4;
    for (let i = 0; i < grid.length; i++) {
      const idx = grid[i];
      const rec = getMetatile(idx);
      if (!rec) continue; // 索引越界 (bank08 无此记录) 跳过
      const gx = i % perRow;
      const gy = Math.floor(i / perRow);
      this.writeMetatile(rec.tiles, gx * 4, gy * 4);
    }
  }

  /** 写一个 metatile (16B tile, 4 行 × 4 列) 到 NT0 指定 (tileX, tileY) */
  protected writeMetatile(tiles: readonly number[], tileX: number, tileY: number): void {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const x = tileX + c;
        const y = tileY + r;
        if (x >= NT_W || y >= NT_H) continue; // NT 边界裁剪
        const tile = tiles[r * 4 + c] ?? 0;
        this._store.writeNT(0, x, y, {
          tile, palette: 0, bank: 0,
          flipH: false, flipV: false, behindBg: false,
        });
      }
    }
  }

  // ════════════════════════════════════════════════
  // 调色板: ctrl 低 6 位 → bank06 组 (16B) → DataStore.paletteTable (RGB)
  // 对应 asm $8B4A: AND #$3F; STA $0048 → paletteLoadBG/paletteLoadSPR
  // ════════════════════════════════════════════════

  /** 应用场景调色板到 paletteTable (BG 4 组 + SPR 4 组, 每组 4 色) */
  protected renderPalette(scene: readonly number[]): void {
    const { paletteIdx } = this.parseHeader(scene);
    this.applyBgPalette(paletteIdx);
    this.applySprPalette(paletteIdx);
  }

  /** PALETTE_BG_06[paletteIdx] (16B 组) → bgPalettes[0..3] */
  protected applyBgPalette(paletteIdx: number): void {
    const grp = PALETTE_BG_06[paletteIdx & 0xff] ?? [];
    for (let p = 0; p < 4; p++) {
      const colors: [PaletteColor, PaletteColor, PaletteColor, PaletteColor] = [
        this.nesColor(grp[p * 4 + 0] ?? 0),
        this.nesColor(grp[p * 4 + 1] ?? 0),
        this.nesColor(grp[p * 4 + 2] ?? 0),
        this.nesColor(grp[p * 4 + 3] ?? 0),
      ];
      this._store.writeBgPalette(p as 0 | 1 | 2 | 3, { colors });
    }
  }

  /** PALETTE_SPR_06[paletteIdx] (16B 组) → sprPalettes[0..3] */
  protected applySprPalette(paletteIdx: number): void {
    const grp = PALETTE_SPR_06[paletteIdx & 0xff] ?? [];
    for (let p = 0; p < 4; p++) {
      const colors: [PaletteColor, PaletteColor, PaletteColor, PaletteColor] = [
        this.nesColor(grp[p * 4 + 0] ?? 0),
        this.nesColor(grp[p * 4 + 1] ?? 0),
        this.nesColor(grp[p * 4 + 2] ?? 0),
        this.nesColor(grp[p * 4 + 3] ?? 0),
      ];
      this._store.writeSprPalette(p as 0 | 1 | 2 | 3, { colors });
    }
  }

  /** NES 调色板索引 (0-63) → RGB (越界回退黑色) */
  protected nesColor(idx: number): PaletteColor {
    const rgb = NES_NTSC_RGB[idx & 0x3f] ?? 0;
    return {
      r: (rgb >> 16) & 0xff,
      g: (rgb >> 8) & 0xff,
      b: rgb & 0xff,
      a: 0xff,
    };
  }
}

export default BootBackgroundRenderer;
