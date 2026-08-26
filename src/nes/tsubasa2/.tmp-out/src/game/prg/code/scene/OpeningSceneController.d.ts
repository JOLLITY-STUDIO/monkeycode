/**
 * OpeningSceneController — 片头序列场景(sceneId=100,附加场景)
 *
 * 数据源:OpeningFrameTable.ts(emu-full f10-f4200 逐帧 Ground Truth)
 *   - 每帧完整驱动:CHR per-scanline 计划 / palette / OAM diff / NT tile diff / 属性表 diff / scroll 寄存器
 *   - 完全逐帧还原片头动画(Tecmo logo / NTV logo / 10 屏字幕 / story_cup / title 装载与显示)
 *
 * 渲染协作:
 *   - CHR:本类只记录当前帧的 per-scanline plan,由 Tsubasa2.frame 在 PPU 渲染前
 *     通过 HeadlessRuntime.setPerScanlineChrPlan 交给 PPU mmap hook 按 scanline 切换
 *   - NT:本类把 diff 行暂存在队列,Tsubasa2.frame 在 renderCommit 后、PPU 渲染前
 *     调用 applyNtToPpu(ppu) 直接写入 ppu.nameTable
 *   - scroll:applyNtToPpu 在 PPU 渲染前把 GT 的 {v,h,vt,ht,fv,fh} 写入 PPU 寄存器,
 *     驱动 renderBgScanline 的 nametable 选择(cntV/cntH)
 *   - palette/OAM:通过 store 标准视图写入,由 InterruptService.renderCommit 正常提交
 *
 * 翻译原则(v2):无 CPU、无 bank 切换;行为数据直接查表。
 */
import { SceneController } from './SceneController';
import { type OpeningFrameEntry, type OpeningFrameChr } from '../../data/scene/OpeningFrameTable';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';
/** OpeningScene 特殊场景号(BootRouter 注册表外附加) */
export declare const OPENING_SCENE_ID = 100;
export declare class OpeningSceneController extends SceneController {
    readonly sceneId = 100;
    private audio;
    /** 当前帧 GT 数据 */
    private currentFrame;
    /** 当前帧 CHR per-scanline 计划 */
    private currentChrPlan;
    /** 待写入 ppu.nameTable 的 NT tile 变化行 */
    private ntQueue;
    /** 待写入 ppu.nameTable 的属性表变化行 */
    private attrQueue;
    /** 当前帧 GT scroll 寄存器(供 applyNtToPpu 写入 PPU) */
    private currentScroll;
    constructor(store: DataStore, input: InputService);
    attachAudio(audio: AudioService): void;
    onEnter(): void;
    /** H5 帧 -> NES 绝对帧(GT 时间线基准) */
    private nesFrameOf;
    onUpdate(frame: number): number | undefined;
    /** 供 Tsubasa2.frame 取本帧 CHR per-scanline 计划 */
    getChrPlan(): ReadonlyArray<OpeningFrameChr>;
    /**
     * 在 InterruptService.renderCommit 之后、PPU 渲染之前调用。
     * 直接把本帧 NT/属性表 diff 写入 ppu.nameTable,并写入 GT scroll 寄存器,
     * 让 PPU renderBgScanline 按 cntV/cntH 选择正确的 nametable。
     */
    applyNtToPpu(ppu: any): void;
    /** 标准 64 字节属性表行 -> 960 项逐 tile attrib(PPU 期望 palette group 偏移 0/4/8/12) */
    private applyAttrRow;
    /** 应用 OAM diff 到 shadowOam */
    private applyOamDiff;
    /**
     * 供 Scene0Controller 承接 story_cup 精灵(f3600 切场景时 changeScene 清 OAM,
     * Scene0 Drift30 需要 story_cup 的 64 sprite 下漂)。
     */
    static loadStoryCupOam(store: DataStore): void;
    /** 供 Scene0Controller 读取 story_cup 的 mid palette(BG 渐隐底色) */
    static storyCupPalette(): {
        bg: ReadonlyArray<number>;
        spr: ReadonlyArray<number>;
    } | null;
}
export type { OpeningFrameEntry };
