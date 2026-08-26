/**
 * TitleMenuSceneController — 标题菜单场景 (sceneId=200, 附加场景)
 *
 * 职责：装载并显示 ROM 主菜单 (title menu) 屏并处理 cursor 游标 + 输入。
 *
 * 与 OpeningSceneController 的语义区别：
 *   - OpeningSceneController 是"片头动画 GT 数据逐帧模拟"
 *     (boot logo / NTV / 10 屏字幕 / story_cup,title 显示仍内含)
 *   - TitleMenuSceneController 是"ROM 真实 title 屏"
 *     (EMU f3727-f4096 稳定态 GT:palette/NT/OAM/CHR 一次性装载,持续显示 + 游标 + 按键处理)
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
 *
 * 游标逻辑 (TS 对应原作 bank00 cursor handler @ $9B28-$9B6B):
 *   - 原作: 检测 Up/Down → 修改 $0629 (低 6 bit = cursor idx; bit 6 = "changed" 标志)
 *           → 写 OAM sprite X/Y 坐标表 $05E9+X / $05EA+X
 *   - H5:   检测 Up/Down → 修改 this.cursorIdx + set this.cursorChanged
 *           → shadowOam[63] (那个 1 个 [48,0,32,248] filler sprite) 重定位 Y
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
import { Button } from '../system/InputService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

/** TitleMenu 附加场景号 (BootRouter 注册表 + OpeningScene START 触发返回值) */
export const TITLE_MENU_SCENE_ID = 200;

/** OpeningScreenTable 里 title_menu 的 index (id=12, label=title_menu) */
const TITLE_MENU_SCREEN_INDEX = 12;

/** title 菜单项 — 当前 2 项: kickoff(开赛) / continue(继续) */
const TITLE_MENU_ITEMS_Y: ReadonlyArray<number> = [
  108, // kickoff — 文字区 Y=92..124 中间
  156, // continue — 文字区 Y=132..156 中间
];

/** cursor sprite 显示参数 (复用 shadowOam slot 63,即 mid.oam[63]=[48,0,32,248] placeholder) */
const TITLE_MENU_CURSOR_OAM_SLOT = 63;
const TITLE_MENU_CURSOR_X = 88;        // 文字左侧
const TITLE_MENU_CURSOR_TILE = 0;      // 待 CHR PNG 确认 cursor ▶ 图块 index(原作 cursor 不闪烁 — 单帧静态)
const TITLE_MENU_CURSOR_ATTR = 0x21;   // palette 1 (spr), no flip

export class TitleMenuSceneController extends SceneController {
  readonly sceneId = TITLE_MENU_SCENE_ID;

  /** 当前 CHR per-scanline plan (整屏 title CHR banks) */
  private currentChrPlan: ReadonlyArray<OpeningFrameChr> = [];

  /**
   * 当前 cursor 指向的菜单项 index (0..TITLE_MENU_ITEMS_Y.length-1)
   * 对应原作 bank00 `$0629` 低 6 bit
   */
  private cursorIdx = 0;

  /**
   * cursor 变化标志 — true 时下一帧 onUpdate 重新画 cursor sprite
   * 对应原作 bank00 `$0629` bit 6 ("changed" flag)
   */
  private cursorChanged = true;

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

    // 7. 初始化 cursor: 归零 + 标记 changed (下一帧 onUpdate paint)
    this.cursorIdx = 0;
    this.cursorChanged = true;
  }

  /**
   * 每帧逻辑: 检测 Up/Down → 改 cursorIdx + paint cursor sprite
   * 行为对照原作 (bank00 $9B28-$9B42 cursor handler):
   *   ROM: PHA down/up 值 → BIT $0629 → AND #$3F → ADC $0628 → CMP #$3D → wrap
   *        → ORA #$40 → STA $0629  (low 6 bit = 新位置; bit 6 = "changed")
   *   H5:  isPressed Down → cursorIdx = (cursorIdx + 1) % N
   *        isPressed Up   → cursorIdx = (cursorIdx - 1 + N) % N
   *        cursorChanged = true  (下一步 paintCursor 消费)
   */
  onUpdate(_frame: number): number | undefined {
    if (this.input.isPressed(1, Button.Down)) {
      this.cursorIdx = (this.cursorIdx + 1) % TITLE_MENU_ITEMS_Y.length;
      this.cursorChanged = true;
    } else if (this.input.isPressed(1, Button.Up)) {
      this.cursorIdx = (this.cursorIdx - 1 + TITLE_MENU_ITEMS_Y.length) % TITLE_MENU_ITEMS_Y.length;
      this.cursorChanged = true;
    }

    if (this.cursorChanged) this.paintCursor();
    return undefined;
  }

  /** 供 Tsubasa2.frame 在 PPU 渲染前取本场景 CHR plan */
  getChrPlan(): ReadonlyArray<OpeningFrameChr> {
    return this.currentChrPlan;
  }

  /**
   * 把 cursor sprite 写到 shadowOam 保留 slot (slot 63)。
   * 原作 (bank00 $9B6B-$9B6E consumer handler):
   *   LDA $0629 / AND #$BF / STA $0629  ← 消费 bit6 changed flag
   *   然后调 paint routine 写 OAM[$05E9+X] / [$05EA+X]
   * H5: cursorChanged = false (消费) + 重写 shadowOam[63]
   */
  private paintCursor(): void {
    const shadow = this.store.oam.shadowOam;
    const base = TITLE_MENU_CURSOR_OAM_SLOT * 4;
    const y = TITLE_MENU_ITEMS_Y[this.cursorIdx];
    if (y === undefined) {
      // 越界保护 — 隐藏 cursor
      shadow[base + 0] = 0xf8;
      shadow[base + 1] = 0xf8;
      shadow[base + 2] = 0xf8;
      shadow[base + 3] = 0xf8;
    } else {
      shadow[base + 0] = y & 0xff;
      shadow[base + 1] = TITLE_MENU_CURSOR_TILE & 0xff;
      shadow[base + 2] = TITLE_MENU_CURSOR_ATTR & 0xff;
      shadow[base + 3] = TITLE_MENU_CURSOR_X & 0xff;
    }
    this.cursorChanged = false;
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
