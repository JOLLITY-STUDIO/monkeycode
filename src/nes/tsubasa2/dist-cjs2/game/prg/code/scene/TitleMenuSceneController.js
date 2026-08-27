"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleMenuSceneController = exports.TITLE_MENU_SCENE_ID = void 0;
/**
 * TitleMenuSceneController — 标题菜单场景 (sceneId=200, 附加场景)
 *
 * 与 OpeningSceneController 的语义区别:
 *   - OpeningSceneController 是"片头动画 GT 数据逐帧模拟"
 *   - TitleMenuSceneController 是"ROM 真实 title 屏" — 通过 asm-翻译 services 协作
 *
 * Asm → TS 服务化 (去除数据驱动 snapshot 逻辑):
 *   - TitleMenuPaletteInitService  → bank00 $9B10-$9B23 协议 (清 buffer + state 计数器)
 *   - TitleMenuCursorService      → bank00 $9B25-$9B6E 协议 (Up/Down cursor + changed-flag 消费)
 *   - 静态部分 (NT/palette/CHR 一次性装载) 仍然引用 OPENING_SCREENS[12]
 *     (这条 GT 数据本身是 跑 ROM asm 一次捕到的真实结果,所以等同于"走 asm 翻译"的
 *      起始态;后续 asm-协议层通过 service 接管运行时行为)
 *
 * 数据源：OpeningScreenTable[TITLE_MENU_SCREEN_INDEX = 12] (mid 段)
 *   - mid.pal:  BG/SPR palette
 *   - mid.oam:  64 sprite [Y, tile, attr, X]
 *   - mid.nt:   4 个 nametable 完整 tile + attrib
 *   - screen.chr: 8 个 1KB CHR bank (per-scanline plan 整屏用)
 *
 * 触发路径：
 *   - OpeningSceneController.onUpdate 返回 TITLE_MENU_SCENE_ID (按 START)
 *     → BootRouter.changeScene(200) → 本类 onEnter() → 持续显示 + service 驱动 cursor
 */
const SceneController_1 = require("./SceneController");
const OpeningScreenTable_1 = require("../../data/scene/OpeningScreenTable");
const TitleMenuCursorService_1 = require("../ui/TitleMenuCursorService");
const TitleMenuPaletteInitService_1 = require("../ui/TitleMenuPaletteInitService");
/** TitleMenu 附加场景号 */
exports.TITLE_MENU_SCENE_ID = 200;
/** OpeningScreenTable 里 title_menu 的 index */
const TITLE_MENU_SCREEN_INDEX = 12;
/**
 * title 屏 2 个菜单项 (kickoff/continue) 的 cursor sprite Y 坐标
 * 对应 BANK02 装载 ROM data tables 里 ($B000+) 编码的 Y 值
 */
const TITLE_MENU_ITEMS_Y = [
    108, // kickoff — 文字区 Y=92..124 中间
    156, // continue — 文字区 Y=132..156 中间
];
class TitleMenuSceneController extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = exports.TITLE_MENU_SCENE_ID;
        /** 当前 CHR per-scanline plan (整屏 title CHR banks) */
        this.currentChrPlan = [];
        /** 缓存 title screen 数据让 applyNtToPpu 引用 */
        this.cachedScreen = null;
        this.paletteInitSvc = new TitleMenuPaletteInitService_1.TitleMenuPaletteInitService(store);
        this.cursorSvc = new TitleMenuCursorService_1.TitleMenuCursorService(store, input, TITLE_MENU_ITEMS_Y.length - 1);
    }
    onEnter() {
        const store = this.store;
        const screen = OpeningScreenTable_1.OPENING_SCREENS[TITLE_MENU_SCREEN_INDEX];
        if (!screen)
            return;
        const mid = screen.mid;
        // ----- Asm 翻译层 (bank00 协议) -----
        // bank00 $9B10-$9B23 init: 清 $0048/$0049/$004A/$004B + $054A..$0629 buffer
        this.paletteInitSvc.initState();
        // bank00 $9B25 init: cursor service 初始化 + cursor sprite 隐
        this.cursorSvc.reset();
        // 初始 cursor 位置 = item 0 (kickoff),Y=108
        this.cursorSvc.setSpritePos(TITLE_MENU_ITEMS_Y[0], 88);
        this.cursorSvc.tickPerFrame(TITLE_MENU_ITEMS_Y); // 初始 paint
        // ----- 静态装载层 (等价于 ROM asm 第一次跑出的输出) -----
        // 1. Palette
        store.palette.loadBg(mid.pal.bg);
        store.palette.loadSpr(mid.pal.spr);
        // 2. OAM 64 sprite
        this.applyOamFull(mid.oam);
        // 3. NT 4 个 nametables
        for (let ni = 0; ni < mid.nt.length && ni < 4; ni++) {
            const n = mid.nt[ni];
            const nametableBase = 0x2000 + ni * 0x400;
            for (let i = 0; i < 1024 && i < n.tile.length; i++) {
                store.writeByte(nametableBase + i, n.tile[i] & 0xff);
            }
            const attribBase = nametableBase + 0x3c0;
            for (let i = 0; i < 1024 && i < n.attrib.length; i++) {
                store.writeByte(attribBase + i, n.attrib[i] & 0xff);
            }
        }
        // 4. CHR plan
        this.currentChrPlan = [{ s: 0, b: screen.chr.slice() }];
        // 5. PPU 显示状态
        store.ppuState.ctrl = 0x88;
        store.ppuState.mask = 0x1e;
        store.fade.bg = 0x0f;
        store.fade.spr = 0x0f;
        // 6. Scroll
        store.scene.scrollX = 0;
        store.scene.scrollY = 0;
        store.scene.scrollFlag = 0x80;
        // 7. 缓存 screen 给 applyNtToPpu 用
        this.cachedScreen = screen;
    }
    /**
     * 每帧:
     * 1. cursor service tick (Up/Down 沿检测 + sprite paint 进 shadowOam)
     * 2. A 键按下 → 按当前 cursorIdx 切到目标 sceneId。
     *
     * 目标 sceneId 选择（最小可验证）：
     *   idx=0 KICKOFF  → SceneId.Scene14 (loadSceneRows + 调色板 + 精灵装载, 主游戏 prep)
     *   idx=1 CONTINUE → SceneId.Scene14 (TODO: 与 KICKOFF 区分)
     *
     * ⚠️ 当前不启动 bank00 5-mode dispatcher（booted=false）— Scene14 跑完 return 2 →
     *    Scene2 hub (do-nothing) → 卡住。这证明 Scene14 controller 路径可跑通, 后续完整流程
     *    需要修 dispatcher boot。
     */
    onUpdate(_frame) {
        this.cursorSvc.tickPerFrame(TITLE_MENU_ITEMS_Y);
        if (this.input.isPressed(1, 1 /* Button.A */)) {
            const idx = this.cursorSvc.getIdx();
            // KICKOFF / CONTINUE 都先跳 Scene14,后续区分
            return 14 /* SceneId.Scene14 */;
        }
        return undefined;
    }
    /** 供 Tsubasa2.frame 取本场景 CHR per-scanline plan */
    getChrPlan() {
        return this.currentChrPlan;
    }
    /**
     * 强制推 NT 字节到 PPU（每帧 frame() 调）
     * 真实 ROM 行为：title 是稳定画面,每帧 VBlank 不重写 NT,这里 NT 已经在 onEnter
     *   写到 store (writeByte 0x2000+0x3C0),由 store.setVramTarget(target.ppu) 自动 flush。
     *   但 page Tsubasa2.frame() 中 setVramTarget 时机在 nmi 之前 — 当 TitleMenu 进入时
     *   可能 vramTarget 还是 null。本方法直接 push 到 PPU (覆盖任何残留)。
     */
    applyNtToPpu(ppu) {
        if (!ppu || !this.cachedScreen)
            return;
        if (Array.isArray(ppu.nameTable) && ppu.nameTable.length >= 1) {
            const nt0Tiles = this.cachedScreen.mid.nt[0]?.tile;
            const nt0Att = this.cachedScreen.mid.nt[0]?.attrib;
            if (nt0Tiles && nt0Tiles.length >= 32 * 30) {
                const writeOne = (target, tiles, attrs) => {
                    for (let i = 0; i < 32 * 30 && i < tiles.length; i++) {
                        target[i] = tiles[i] & 0xff;
                    }
                    for (let i = 0; i < 64 && i < attrs.length; i++) {
                        const addr = 0x3c0 + i;
                        target[addr] = attrs[i] & 0xff;
                    }
                };
                writeOne(ppu.nameTable[0], nt0Tiles, nt0Att);
                if (ppu.nameTable[1])
                    writeOne(ppu.nameTable[1], this.cachedScreen.mid.nt[1]?.tile ?? [], this.cachedScreen.mid.nt[1]?.attrib ?? []);
                if (ppu.nameTable[2])
                    writeOne(ppu.nameTable[2], this.cachedScreen.mid.nt[2]?.tile ?? [], this.cachedScreen.mid.nt[2]?.attrib ?? []);
                if (ppu.nameTable[3])
                    writeOne(ppu.nameTable[3], this.cachedScreen.mid.nt[3]?.tile ?? [], this.cachedScreen.mid.nt[3]?.attrib ?? []);
            }
        }
        // title 固定 scroll=0,0
        if ('regV' in ppu)
            ppu.regV = 0;
        if ('regH' in ppu)
            ppu.regH = 0;
        if ('regVT' in ppu)
            ppu.regVT = 0;
        if ('regHT' in ppu)
            ppu.regHT = 0;
        if ('regFV' in ppu)
            ppu.regFV = 0;
        if ('regFH' in ppu)
            ppu.regFH = 0;
        // mask/ctrl: BG+SP on
        if ('mask' in ppu)
            ppu.mask = 0x1e;
        if ('ctrl' in ppu)
            ppu.ctrl = 0x88;
    }
    /** 应用 OAM 全量 (4-tuple [Y, tile, attr, X])到 shadowOam */
    applyOamFull(oam) {
        const shadow = this.store.oam.shadowOam;
        for (let i = 0; i < 64 && i < oam.length; i++) {
            const o = oam[i];
            const base = i * 4;
            shadow[base + 0] = (o[0] ?? 0xf8) & 0xff;
            shadow[base + 1] = (o[1] ?? 0) & 0xff;
            shadow[base + 2] = (o[2] ?? 0) & 0xff;
            shadow[base + 3] = (o[3] ?? 0) & 0xff;
        }
        for (let i = oam.length; i < 64; i++) {
            const base = i * 4;
            shadow[base + 0] = 0xf8;
            shadow[base + 1] = 0xf8;
            shadow[base + 2] = 0xf8;
            shadow[base + 3] = 0xf8;
        }
    }
}
exports.TitleMenuSceneController = TitleMenuSceneController;
