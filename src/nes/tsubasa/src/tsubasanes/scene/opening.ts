// ============================================================================
// scene/opening.ts — TECMO Logo 开场动画
//
// 动画阶段:
//   FADE_IN  (0~14帧)  — 亮度 0→15, 画面从黑渐亮
//   DISPLAY  (15~364帧) — 全亮度显示 logo
//   FADE_OUT (365~379帧) — 亮度 15→0, 画面渐黑
//
// Start 按键随时跳过 → 标题画面
// ============================================================================

import { Scene, SceneState, NO_INPUT, SceneId } from './types';
import type { JoypadInput } from './types';

// ---- 动画时序 (来源 ROM z4A/z4B 亮度计数器) ----

const FADE_IN_FRAMES   = 15;
const DISPLAY_FRAMES   = 350;
const FADE_OUT_FRAMES  = 15;
const TOTAL_FRAMES     = FADE_IN_FRAMES + DISPLAY_FRAMES + FADE_OUT_FRAMES;

enum AnimPhase {
  FADE_IN  = 0,
  DISPLAY  = 1,
  FADE_OUT = 2,
}

export class OpeningScene extends Scene {
  readonly id = SceneId.TECMO_LOGO;

  /** 当前动画阶段 */
  animPhase: AnimPhase = AnimPhase.FADE_IN;
  /** 亮度 0~15 */
  brightness: number = 0;
  /** 上一帧 Start 状态 (上升沿检测) */
  private prevStart: boolean = false;

  enter(): void {
    this.frameCount = 0;
    this.animPhase  = AnimPhase.FADE_IN;
    this.brightness = 0;
    this.prevStart  = false;
    this.state      = SceneState.RUNNING;
    // 场景数据 (CHR / nametable / palette) 由引擎层在 enter 前注入
  }

  update(input: JoypadInput = NO_INPUT): boolean {
    // Start 上升沿 → 跳过
    if (input.start && !this.prevStart) {
      this.requestTransition(SceneId.TITLE);
      return true;
    }
    this.prevStart = input.start;

    // 推进动画 phase
    this._advancePhase();

    // 动画播完 → 标题
    if (this.frameCount >= TOTAL_FRAMES) {
      this.requestTransition(SceneId.TITLE);
    }

    return true;
  }

  private _advancePhase(): void {
    const fc = this.frameCount;
    if (fc < FADE_IN_FRAMES) {
      this.animPhase  = AnimPhase.FADE_IN;
      this.brightness = Math.floor((fc / FADE_IN_FRAMES) * 15);
    } else if (fc < FADE_IN_FRAMES + DISPLAY_FRAMES) {
      this.animPhase  = AnimPhase.DISPLAY;
      this.brightness = 15;
    } else {
      this.animPhase  = AnimPhase.FADE_OUT;
      const outFrame  = fc - FADE_IN_FRAMES - DISPLAY_FRAMES;
      this.brightness = 15 - Math.floor((outFrame / FADE_OUT_FRAMES) * 15);
    }
  }

  get phaseName(): string {
    return ['FADE_IN', 'DISPLAY', 'FADE_OUT'][this.animPhase];
  }

  exit(): void {
    // 渲染层在 exit 后释放 tiles/palette
  }
}
