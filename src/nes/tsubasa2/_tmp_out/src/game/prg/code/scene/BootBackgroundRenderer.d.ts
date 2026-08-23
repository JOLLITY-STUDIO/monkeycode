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
export declare class BootBackgroundRenderer {
    protected _store: DataStore;
    constructor(store: DataStore);
    /**
     * 渲染 BOOT 开场背景: NT0 (metatile 网格展开) + BG/SPR 调色板。
     * 场景 = SCENE_0x0A (开场, ram_00ED=$0A), 对应 asm $8B1C 场景装载 + $8EF0 地图绘制。
     */
    render(): void;
    /** 解析场景描述符 header: [0]=ptrLo [1]=ptrHi [2]=ctrl [3]=w [4]=h [5]=pos */
    protected parseHeader(scene: readonly number[]): {
        ctrl: number;
        w: number;
        h: number;
        paletteIdx: number;
    };
    /** 把场景描述符的 metatile 索引网格平铺到 NT0 (行优先, 每 metatile 4×4 tile) */
    protected renderSceneNt(scene: readonly number[]): void;
    /** 写一个 metatile (16B tile, 4 行 × 4 列) 到 NT0 指定 (tileX, tileY) */
    protected writeMetatile(tiles: readonly number[], tileX: number, tileY: number): void;
    /** 应用场景调色板到 paletteTable (BG 4 组 + SPR 4 组, 每组 4 色) */
    protected renderPalette(scene: readonly number[]): void;
    /** PALETTE_BG_06[paletteIdx] (16B 组) → bgPalettes[0..3] */
    protected applyBgPalette(paletteIdx: number): void;
    /** PALETTE_SPR_06[paletteIdx] (16B 组) → sprPalettes[0..3] */
    protected applySprPalette(paletteIdx: number): void;
    /** NES 调色板索引 (0-63) → RGB (越界回退黑色) */
    protected nesColor(idx: number): PaletteColor;
}
export default BootBackgroundRenderer;
