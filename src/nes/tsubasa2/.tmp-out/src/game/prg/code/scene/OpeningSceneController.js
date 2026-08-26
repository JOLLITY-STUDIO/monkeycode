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
import { getOpeningFrame, } from '../../data/scene/OpeningFrameTable';
import { OPENING_SCREENS } from '../../data/scene/OpeningScreenTable';
/** OpeningScene 特殊场景号(BootRouter 注册表外附加) */
export const OPENING_SCENE_ID = 100;
/** 片头序列终点:emu-full 实测 f4200 切黑屏,GT 驱动含 f4200 后转 Scene2(hub) */
const OPENING_END_NES_FRAME = 4201;
/** H5 frame 0 = NES f10(tecmo_logo 起始) */
const H5_FRAME_OFFSET = 10;
/** story_cup 屏(Scene0 Drift30 下漂的精灵来源) */
const STORY_CUP_SCREEN_INDEX = 11;
export class OpeningSceneController extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = OPENING_SCENE_ID;
        this.audio = null;
        /** 当前帧 GT 数据 */
        this.currentFrame = null;
        /** 当前帧 CHR per-scanline 计划 */
        this.currentChrPlan = [];
        /** 待写入 ppu.nameTable 的 NT tile 变化行 */
        this.ntQueue = [];
        /** 待写入 ppu.nameTable 的属性表变化行 */
        this.attrQueue = [];
        /** 当前帧 GT scroll 寄存器(供 applyNtToPpu 写入 PPU) */
        this.currentScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0 };
    }
    attachAudio(audio) {
        this.audio = audio;
    }
    onEnter() {
        this.currentFrame = null;
        this.currentChrPlan = [];
        this.ntQueue = [];
        this.attrQueue = [];
        this.currentScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0 };
        // PPU 状态:GT 数据表已经包含真实 fade 后的 palette,这里把 fade 固定为满亮,
        // 让 InterruptService.flushPalette 直接输出 palette 原值。
        this.store.fade.bg = 0x0f;
        this.store.fade.spr = 0x0f;
        // BG 从 $0000,SPR 从 $1000;NMI 由 renderCommit 第 8 步统一置位
        this.store.ppuState.ctrl = 0x88;
        // 显示 BG + SPR,不禁用左 8 列(与 emu 一致)
        this.store.ppuState.mask = 0x1e;
        // scrollFlag bit7=1:跳过 InterruptService.applyScrollBank02 以 scene.scrollX/scrollY
        // 覆盖 scroll 的路径;GT 直接通过 applyNtToPpu 写 PPU scroll 寄存器。
        this.store.scene.scrollX = 0;
        this.store.scene.scrollY = 1;
        this.store.scene.scrollFlag = 0x80;
        // 禁用 InterruptService 的 applyChrRequest / midFrameChrSwitch / applyChrFrom009e 路径,
        // 这些会覆盖本类的 per-scanline CHR 计划。
        this.store.writeByte(0x0075, 0);
        this.store.writeByte(0x0076, 0);
        this.store.writeByte(0x005e, 0);
        this.store.writeByte(0x005f, 0);
        this.store.writeByte(0x009c, 0);
        this.store.writeByte(0x009d, 0);
        this.store.writeByte(0x009e, 0);
        this.store.writeByte(0x009f, 0);
        this.store.writeByte(0x00a0, 0);
        this.store.writeByte(0x00a1, 0);
        // tecmo_logo 首屏播 BGM 0x01(与 boot logo 音乐一致)
        if (this.audio) {
            this.audio.playBgm(0x01);
        }
    }
    /** H5 帧 -> NES 绝对帧(GT 时间线基准) */
    nesFrameOf(frame) {
        return frame + H5_FRAME_OFFSET;
    }
    onUpdate(frame) {
        const nesFrame = this.nesFrameOf(frame);
        if (nesFrame >= OPENING_END_NES_FRAME) {
            // 片头完整播完(含 title 装载/显示),转 Scene2(hub idle)保持最后画面,
            // 不再走 Scene0 的 BgFadeOut/Drift30 近似逻辑。
            return 2;
        }
        const fr = getOpeningFrame(nesFrame);
        if (!fr)
            return undefined;
        this.currentFrame = fr;
        // 调色板:仅在有变化时写入(节省写入)
        if (fr.p) {
            this.store.palette.loadBg(fr.p.bg);
            this.store.palette.loadSpr(fr.p.spr);
        }
        // OAM:应用与上帧的差异
        this.applyOamDiff(fr.o);
        // CHR 计划:由 Tsubasa2.frame 渲染前交给 HeadlessRuntime
        this.currentChrPlan = fr.c;
        // NT 与属性表变化行:供 applyNtToPpu 在 renderCommit 后写入 ppu
        this.ntQueue = fr.n.slice();
        this.attrQueue = fr.a.slice();
        // scroll 寄存器:供 applyNtToPpu 在 PPU 渲染前写入
        this.currentScroll = fr.s;
        return undefined;
    }
    /** 供 Tsubasa2.frame 取本帧 CHR per-scanline 计划 */
    getChrPlan() {
        return this.currentChrPlan;
    }
    /**
     * 在 InterruptService.renderCommit 之后、PPU 渲染之前调用。
     * 直接把本帧 NT/属性表 diff 写入 ppu.nameTable,并写入 GT scroll 寄存器,
     * 让 PPU renderBgScanline 按 cntV/cntH 选择正确的 nametable。
     */
    applyNtToPpu(ppu) {
        if (!ppu || !ppu.nameTable)
            return;
        // GT 驱动 scroll 寄存器:决定 nametable 选择(v/h)与细/粗滚动(vt/ht/fv/fh)
        const s = this.currentScroll;
        ppu.regV = s.v & 1;
        ppu.regH = s.h & 1;
        ppu.regVT = s.vt & 0x1f;
        ppu.regHT = s.ht & 0x1f;
        ppu.regFV = s.fv & 7;
        ppu.regFH = s.fh & 7;
        for (const row of this.ntQueue) {
            const nt = ppu.nameTable[row.ni];
            if (!nt || !nt.tile)
                continue;
            const base = row.r * 32;
            for (let c = 0; c < 32; c++) {
                nt.tile[base + c] = row.d[c] & 0xff;
            }
        }
        for (const row of this.attrQueue) {
            const nt = ppu.nameTable[row.ni];
            if (!nt || !nt.attrib)
                continue;
            this.applyAttrRow(nt, row.r, row.d);
        }
        this.ntQueue = [];
        this.attrQueue = [];
    }
    /** 标准 64 字节属性表行 -> 960 项逐 tile attrib(PPU 期望 palette group 偏移 0/4/8/12) */
    applyAttrRow(nt, ar, row8) {
        for (let ac = 0; ac < 8; ac++) {
            const v = row8[ac] & 0xff;
            const baseY = ar * 4;
            const baseX = ac * 4;
            // NES quirk:属性表字节同时写入 tile[0x3C0+addr]("attributes as tiles",
            // 滚动进入属性表区域时按 tile 取;emu nt.json 的 tile[960..1023] 含此)
            if (nt.tile)
                nt.tile[0x3c0 + ar * 8 + ac] = v;
            for (let dy = 0; dy < 4; dy++) {
                for (let dx = 0; dx < 4; dx++) {
                    // group = 2x2 子块索引:dy>=2 -> bit2, dx>=2 -> bit0(勿再 <<1,
                    // 否则 dy=2 得 4,超出 8 位导致下半块永远读到 0)
                    const group = (dy & 2) | ((dx & 2) >> 1); // 0,1,2,3
                    const pal = (v >> (group * 2)) & 3;
                    const ty = baseY + dy;
                    const tx = baseX + dx;
                    // 写满 32x32(含 30-31 行),与硬件 writeAttrib 一致(emu attrib 数组含 960-1023)
                    if (ty < 32 && tx < 32) {
                        nt.attrib[ty * 32 + tx] = pal << 2;
                    }
                }
            }
        }
    }
    /** 应用 OAM diff 到 shadowOam */
    applyOamDiff(diff) {
        const shadow = this.store.oam.shadowOam;
        for (const entry of diff) {
            const idx = entry[0] ?? 0;
            if (idx < 0 || idx >= 64)
                continue;
            const base = idx * 4;
            shadow[base + 0] = (entry[1] ?? 0xf8) & 0xff;
            shadow[base + 1] = (entry[2] ?? 0) & 0xff;
            shadow[base + 2] = (entry[3] ?? 0) & 0xff;
            shadow[base + 3] = (entry[4] ?? 0) & 0xff;
        }
    }
    /**
     * 供 Scene0Controller 承接 story_cup 精灵(f3600 切场景时 changeScene 清 OAM,
     * Scene0 Drift30 需要 story_cup 的 64 sprite 下漂)。
     */
    static loadStoryCupOam(store) {
        const screen = OPENING_SCREENS[STORY_CUP_SCREEN_INDEX];
        if (!screen)
            return;
        const oam = screen.mid.oam;
        const shadow = store.oam.shadowOam;
        for (let i = 0; i < 64 && i < oam.length; i++) {
            const o = oam[i];
            const base = i * 4;
            shadow[base + 0] = (o[0] ?? 0xf8) & 0xff;
            shadow[base + 1] = (o[1] ?? 0) & 0xff;
            shadow[base + 2] = (o[2] ?? 0) & 0xff;
            shadow[base + 3] = (o[3] ?? 0) & 0xff;
        }
    }
    /** 供 Scene0Controller 读取 story_cup 的 mid palette(BG 渐隐底色) */
    static storyCupPalette() {
        const screen = OPENING_SCREENS[STORY_CUP_SCREEN_INDEX];
        return screen ? screen.mid.pal : null;
    }
}
