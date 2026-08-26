/**
 * TitleMenuSceneController — 标题菜单场景 (sceneId=200, 附加场景)
 *
 * 职责：装载并显示 ROM 主菜单 (title menu) 屏。
 *
 * 与 OpeningSceneController 的语义区别：
 *   - OpeningSceneController 是"片头动画 GT 数据逐帧模拟"
 *     (boot logo / NTV / 10 屏字幕 / story_cup,title 显示仍内含)
 *   - TitleMenuSceneController 是"ROM 真实 title 屏"
 *     (EMU f3727-f4096 稳定态 GT:palette/NT/OAM/CHR 一次性装载,持续显示)
 *
 * 数据源：OpeningScreenTable[TITLE_MENU_SCREEN_INDEX = 12] (mid 段)
 *   - mid.pal:  BG/SPR palette
 *   - mid.oam:  64 sprite [Y, tile, attr, X]
 *   - mid.nt:   4 个 nametable 完整 tile + attrib
 *   - screen.chr: 8 个 1KB CHR bank (per-scanline plan 整屏用)
 *
 * 触发路径：
 *   - 在片头时按 START → OpeningSceneController.onUpdate 返回
 *     TITLE_MENU_SCENE_ID → BootRouter.changeScene(200)
 *     → onEnter() 装载 title → 持续显示
 *   - Scene0 主菜单完成后也可能未来 return TITLE_MENU_SCENE_ID 回到 title (V0.x TODO)
 *
 * 为什么 sceneId=200：
 *   - 0-23 是 ROM Scene0-23 标准 scene (BootRouter 自动注册)
 *   - 100 = OpeningScene (附加场景)
 *   - 200 = TitleMenu (附加场景,本类承接 ROM 主菜单)
 *   - 类似 OpeningScene 模式,挂 BootRouter 注册表,不与主流程混淆
 */
import { SceneController } from './SceneController';
import { OPENING_SCREENS, OpeningFrameState } from '../../data/scene/OpeningScreenTable';
import type { OpeningFrameChr } from '../../data/scene/OpeningFrameTable';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

/** TitleMenu 附加场景号 (BootRouter 注册表 + OpeningScene START 触发返回值) */
export const TITLE_MENU_SCENE_ID = 200;

/** OpeningScreenTable 里 title_menu 的 index (id=12, label=title_menu) */
const TITLE_MENU_SCREEN_INDEX = 12;

export class TitleMenuSceneController extends SceneController {
  readonly sceneId = TITLE_MENU_SCENE_ID;
  /** 当前 CHR per-scanline plan (整屏 title CHR banks) */
  private currentChrPlan: ReadonlyArray<OpeningFrameChr> = [];

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  onEnter(): void {
    const store = this.store;
    const screen = OPENING_SCREENS[TITLE_MENU_SCREEN_INDEX];
    if (!screen) return;
    const mid: OpeningFrameState = screen.mid;

    // 1. Palette (满亮 — mid.pal 已是 fade 后的真实色)
    store.palette.loadBg(mid.pal.bg);
    store.palette.loadSpr(mid.pal.spr);

    // 2. OAM 64 sprite (4-tuple [Y, tile, attr, X] → shadowOam)
    this.applyOamFull(mid.oam);

    // 3. NT 4 个 nametables 完整 tile + attrib 写到 store
    //    store.writeByte 缓存 → renderCommit step 1 flushVram 推到 PPU VRAM
    for (let ni = 0; ni < mid.nt.length && ni < 4; ni++) {
      const n = mid.nt[ni];
      const nametableBase = 0x2000 + ni * 0x400;
      // tile[0..1023] → $2000-$23BF
      for (let i = 0; i < 1024 && i < n.tile.length; i++) {
        store.writeByte(nametableBase + i, n.tile[i] & 0xff);
      }
      // attrib[0..1023] → $23C0-$23FF (NES 属性表区域)
      const attribBase = nametableBase + 0x3C0;
      for (let i = 0; i < 1024 && i < n.attrib.length; i++) {
        store.writeByte(attribBase + i, n.attrib[i] & 0xff);
      }
    }

    // 4. CHR plan: 整屏使用 title_menu 装载的 bank set (per-scanline 一段 [s=0, b=chr[]])
    this.currentChrPlan = [{ s: 0, b: screen.chr.slice() }];

    // 5. PPU 显示状态
    store.ppuState.ctrl = 0x88;  // NMI on + SPR $1000
    store.ppuState.mask = 0x1e;  // BG+SPR 可见
    store.fade.bg = 0x0f;
    store.fade.spr = 0x0f;

    // 6. Scroll (重置为 (0,0), title 是静态画面)
    store.scene.scrollX = 0;
    store.scene.scrollY = 0;
    store.scene.scrollFlag = 0x80;  // 跳过 renderCommit.applyScrollBank02 覆盖
  }

  /** Title 屏静态显示,onUpdate 不做事 (后续 V0.x 可加按键处理) */
  onUpdate(_frame: number): number | undefined {
    return undefined;
  }

  /** 供 Tsubasa2.frame 在 PPU 渲染前取本场景 CHR plan */
  getChrPlan(): ReadonlyArray<OpeningFrameChr> {
    return this.currentChrPlan;
  }

  /** 应用 OAM 全量 (4-tuple [Y, tile, attr, X])到 shadowOam — 64 sprite 完整覆盖 */
  private applyOamFull(oam: ReadonlyArray<ReadonlyArray<number>>): void {
    const shadow = this.store.oam.shadowOam;
    for (let i = 0; i < 64 && i < oam.length; i++) {
      const o = oam[i];
      const base = i * 4;
      shadow[base + 0] = (o[0] ?? 0xf8) & 0xff; // Y
      shadow[base + 1] = (o[1] ?? 0) & 0xff;    // tile
      shadow[base + 2] = (o[2] ?? 0) & 0xff;    // attr
      shadow[base + 3] = (o[3] ?? 0) & 0xff;    // X
    }
    // 剩余 sprite 隐藏 (Y >= 0xEF → NES 自动 offscreen)
    for (let i = oam.length; i < 64; i++) {
      const base = i * 4;
      shadow[base + 0] = 0xf8;
      shadow[base + 1] = 0xf8;
      shadow[base + 2] = 0xf8;
      shadow[base + 3] = 0xf8;
    }
  }
}
