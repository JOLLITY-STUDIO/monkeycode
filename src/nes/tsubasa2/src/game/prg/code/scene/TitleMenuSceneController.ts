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
import { SceneController } from './SceneController';
import { OPENING_SCREENS, OpeningFrameState } from '../../data/scene/OpeningScreenTable';
import type { OpeningFrameChr } from '../../data/scene/OpeningFrameTable';
import { Button } from '../system/InputService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import { TitleMenuCursorService } from '../ui/TitleMenuCursorService';
import { TitleMenuPaletteInitService } from '../ui/TitleMenuPaletteInitService';

/** TitleMenu 附加场景号 */
export const TITLE_MENU_SCENE_ID = 200;

/** OpeningScreenTable 里 title_menu 的 index */
const TITLE_MENU_SCREEN_INDEX = 12;

/**
 * title 屏 2 个菜单项 (kickoff/continue) 的 cursor sprite Y 坐标
 * 对应 BANK02 装载 ROM data tables 里 ($B000+) 编码的 Y 值
 */
const TITLE_MENU_ITEMS_Y: ReadonlyArray<number> = [
  108, // kickoff — 文字区 Y=92..124 中间
  156, // continue — 文字区 Y=132..156 中间
];

export class TitleMenuSceneController extends SceneController {
  readonly sceneId = TITLE_MENU_SCENE_ID;

  /** 当前 CHR per-scanline plan (整屏 title CHR banks) */
  private currentChrPlan: ReadonlyArray<OpeningFrameChr> = [];

  /** bank00 $9B10-$9B23 协议翻译 — 状态/buffer init */
  private readonly paletteInitSvc: TitleMenuPaletteInitService;
  /** bank00 $9B25-$9B6E 协议翻译 — cursor state machine */
  private readonly cursorSvc: TitleMenuCursorService;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.paletteInitSvc = new TitleMenuPaletteInitService(store);
    this.cursorSvc = new TitleMenuCursorService(store, input, TITLE_MENU_ITEMS_Y.length - 1);
  }

  onEnter(): void {
    const store = this.store;
    const screen = OPENING_SCREENS[TITLE_MENU_SCREEN_INDEX];
    if (!screen) return;
    const mid: OpeningFrameState = screen.mid;

    // ----- Asm 翻译层 (bank00 协议) -----

    // bank00 $9B10-$9B23 init: 清 $0048/$0049/$004A/$004B + $054A..$0629 buffer
    this.paletteInitSvc.initState();
    // bank00 $9B25 init: cursor service 初始化 + cursor sprite 隐
    this.cursorSvc.reset();
    // 初始 cursor 位置 = item 0 (kickoff),Y=108
    this.cursorSvc.setSpritePos(TITLE_MENU_ITEMS_Y[0], 88);
    this.cursorSvc.tickPerFrame(TITLE_MENU_ITEMS_Y);  // 初始 paint

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
  }

  /**
   * 每帧: 调 asm-翻译的 cursor service。每帧检测 Up/Down 沿 → 改 idx →
   * paint cursor sprite 进 shadowOam。Service 内部消费 changed flag ($9B66 协议)。
   */
  onUpdate(_frame: number): number | undefined {
    this.cursorSvc.tickPerFrame(TITLE_MENU_ITEMS_Y);
    return undefined;
  }

  /** 供 Tsubasa2.frame 取本场景 CHR per-scanline plan */
  getChrPlan(): ReadonlyArray<OpeningFrameChr> {
    return this.currentChrPlan;
  }

  /** 应用 OAM 全量 (4-tuple [Y, tile, attr, X])到 shadowOam */
  private applyOamFull(oam: ReadonlyArray<ReadonlyArray<number>>): void {
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
