import Controller from '../../core/controller';
import type { GameRuntime, PpuRenderTarget } from './GameRuntime';
import type { Tsubasa2 } from '../index';
/** 单帧内按 scanline 切换的 CHR bank 计划（来源：emu GT） */
export interface ChrScanlinePlan {
    readonly s: number;
    readonly b: ReadonlyArray<number>;
}
export declare class HeadlessRuntime implements GameRuntime {
    readonly ppu: PpuRenderTarget;
    readonly controllers: {
        1: Controller;
        2: Controller;
    };
    /** bank1k → 256 个 Tile（供 loadChrSlot 直接写入 ppu.ptTile） */
    private readonly vromTilesByBank1k;
    /** 当前装载到 PPU 8 slot 的 bank1k（用于变更检测） */
    private readonly chrSlots;
    /** 本帧 per-scanline CHR 切换计划（sceneId=100 Opening 逐帧 GT 驱动） */
    private perScanlineChrPlan;
    constructor();
    /** 装载单个 1KB CHR slot（声明式，无切换语义；直接写入 ppu.ptTile[slot*64 + tileIdx]） */
    private loadChrSlot;
    /** 初始 CHR 装载（按 CHR_SLOT_MAP 声明） */
    private loadInitialChr;
    /** 按控制器/按钮设置按下/松开（core Controller 语义） */
    setButton(controllerId: 1 | 2, button: number, down: boolean): void;
    /**
     * Boot 期 CHR bank 立即装载（WBS_FRAME13 F6）。
     *
     * 在 frame=0 时, PPU ptTile 还没有任何非零 tile 数据。
     * BUG #005 已经修过 SCENE_END_BANK_TABLE,
     * 但 `HeadlessRuntime.loadChrSlot()` 仅在 `renderCommit()` 链路被触发, 而 frame 0
     * 还没到 renderCommit → ppu.ptTile 全 0.
     *
     * 修法: 让外部 (Tsubasa2.boot(runtime)) 直接调本方法, 把 frame=0 的 8 slot 立即推 PPU.
     * 真值 (emu frame 1-13): banks = [0,1,2,3,252,113,82,83].
     */
    bootInitialChrBanks(): void;
    /** 设置本帧 per-scanline CHR 切换计划（Opening GT 逐帧驱动） */
    setPerScanlineChrPlan(plan: ReadonlyArray<ChrScanlinePlan>): void;
    /** 按 scanline 应用 CHR 计划（找到 s <= scanline 的最后一组 bank） */
    private applyChrPlanAt;
    /** 跑一帧（游戏逻辑 + PPU 扫描线渲染），渲染结果在 ppu.buffer */
    frame(game: Tsubasa2): void;
}
