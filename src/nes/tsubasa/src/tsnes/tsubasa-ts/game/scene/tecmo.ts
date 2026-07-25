/**
 * TecmoScene — TECMO Logo 開場動畫
 *
 * ROM 行為:
 *   - 播放 TECMO logo 動畫
 *   - Start 按鍵可隨時跳過 → 標題畫面
 *   - 無操作則動畫播完自動進入標題畫面
 *   - attract mode 由 Title scene 驅動
 *
 * 動畫階段:
 *   FADE_IN (0~14幀)   — 亮度 0→15，畫面從黑漸亮
 *   DISPLAY (15~364幀) — 全亮度顯示 logo
 *   FADE_OUT (365~379幀) — 亮度 15→0，畫面漸黑
 *
 * 靜態數據:
 *   - CHR tiles:   game/data/opening/tiles.ts     (CHR bank 15, 256×16B)
 *   - Nametable:   game/data/opening/nametable.ts  (960 tiles + 64 attrs)
 *   - Palette:     game/data/opening/palette.ts    (BG + SPR palettes)
 */
import { Scene, SceneState, NO_INPUT } from './base';
import type { JoypadInput } from './base';
import { SCENE_TECMO_LOGO, SCENE_TITLE } from '../../constants/scene_codes';

// ══════════════════════════════════════════════════════
// 動畫時序常量 (來源: ROM z4A/z4B 亮度計數器)
// ══════════════════════════════════════════════════════

/** 淡入持續幀數 (亮度 0→15) */
const FADE_IN_FRAMES  = 15;
/** 全亮顯示持續幀數 */
const DISPLAY_FRAMES  = 350;
/** 淡出持續幀數 (亮度 15→0) */
const FADE_OUT_FRAMES = 15;
/** 總動畫長度 */
const TOTAL_FRAMES    = FADE_IN_FRAMES + DISPLAY_FRAMES + FADE_OUT_FRAMES;

// ══════════════════════════════════════════════════════
// 動畫狀態
// ══════════════════════════════════════════════════════

const enum AnimPhase {
  FADE_IN  = 0,
  DISPLAY  = 1,
  FADE_OUT = 2,
}

export class TecmoScene extends Scene {
  readonly id = SCENE_TECMO_LOGO;

  /** 當前動畫階段 */
  private animPhase = AnimPhase.FADE_IN;
  /** 亮度 (0-15) */
  brightness = 0;
  /** 上一幀按鍵狀態 */
  private prevStart = false;

  enter(): void {
    this.frameCount = 0;
    this.animPhase  = AnimPhase.FADE_IN;
    this.brightness = 0;
    this.prevStart  = false;
    this.state      = SceneState.RUNNING;

    // 場景數據由渲染層在 enter 前注入:
    //   renderer.loadOpeningTiles()  → CHR bank 15
    //   renderer.loadNametable()     → TECMO_NAMETABLE
    //   renderer.loadPalette()       → PAL_BG + PAL_SPR
  }

  update(input: JoypadInput = NO_INPUT): boolean {
    // ── 上升沿檢測 — Start 按鍵隨時跳過 ──
    if (input.start && !this.prevStart) {
      this.requestTransition(SCENE_TITLE);
      return true;
    }
    this.prevStart = input.start;

    // ── 動畫階段推進 ──
    this.advancePhase();

    // ── 動畫播完 → 標題 ──
    if (this.frameCount >= TOTAL_FRAMES) {
      this.requestTransition(SCENE_TITLE);
    }

    return true;
  }

  private advancePhase(): void {
    const fc = this.frameCount;

    if (fc < FADE_IN_FRAMES) {
      // 淡入: 亮度 0→15
      this.animPhase  = AnimPhase.FADE_IN;
      this.brightness = Math.floor((fc / FADE_IN_FRAMES) * 15);
    } else if (fc < FADE_IN_FRAMES + DISPLAY_FRAMES) {
      // 全亮顯示
      this.animPhase  = AnimPhase.DISPLAY;
      this.brightness = 15;
    } else {
      // 淡出: 亮度 15→0
      this.animPhase  = AnimPhase.FADE_OUT;
      const outFrame  = fc - FADE_IN_FRAMES - DISPLAY_FRAMES;
      this.brightness = 15 - Math.floor((outFrame / FADE_OUT_FRAMES) * 15);
    }
  }

  /** 獲取動畫階段名稱 (調試用) */
  get phaseName(): string {
    return ['FADE_IN', 'DISPLAY', 'FADE_OUT'][this.animPhase];
  }

  exit(): void {
    // 清理: 由渲染層在 exit 後釋放 tiles/palette
  }
}
