// ============================================================================
// scene/title.ts — 标题画面
//
// 对应 ROM prg_07 控制。
// 菜单选项: New Game / Load Game
// 无操作超时 → attract mode
// ============================================================================

import { Scene, SceneState, NO_INPUT, SceneId } from './types';
import type { JoypadInput } from './types';

/** 无操作超时帧数 (~10 秒 @ 60fps) */
const ATTRACT_TIMEOUT = 600;

export class TitleScene extends Scene {
  readonly id = SceneId.TITLE;

  /** 菜单选项索引 */
  cursorIdx: number = 0;
  /** 选项数 */
  readonly optionCount: number = 2;
  /** 选项标签 */
  readonly options: string[] = ['NEW GAME', 'LOAD GAME'];

  /** 无操作计时 */
  private idleFrames: number = 0;
  /** 上一帧按键 (上升沿检测) */
  private prevUp: boolean = false;
  private prevDown: boolean = false;
  private prevStart: boolean = false;
  /** 是否正在播放 attract demo */
  private attractMode: boolean = false;

  enter(): void {
    this.frameCount = 0;
    this.cursorIdx  = 0;
    this.idleFrames = 0;
    this.attractMode = false;
    this.state = SceneState.RUNNING;
    // 标题画面 CHR / nametable 由引擎层在 enter 前注入
  }

  update(input: JoypadInput = NO_INPUT): boolean {
    // attract mode 中按任何键退出
    if (this.attractMode) {
      if (input.start || input.a || input.b) {
        this.attractMode = false;
        this.idleFrames = 0;
      }
      return true;
    }

    let moved = false;

    // 上
    if (input.up && !this.prevUp) {
      this.cursorIdx = (this.cursorIdx - 1 + this.optionCount) % this.optionCount;
      moved = true;
    }
    // 下
    if (input.down && !this.prevDown) {
      this.cursorIdx = (this.cursorIdx + 1) % this.optionCount;
      moved = true;
    }
    // Start / A — 确认
    if ((input.start && !this.prevStart) || (input.a && !this.prevUp)) {
      this._selectOption();
      return true;
    }

    this.prevUp = input.up;
    this.prevDown = input.down;
    this.prevStart = input.start;

    // 无操作计时
    if (moved || input.start || input.a) {
      this.idleFrames = 0;
    } else {
      this.idleFrames++;
    }

    // attract mode 触发
    if (this.idleFrames >= ATTRACT_TIMEOUT) {
      this.attractMode = true;
      // TODO: 开始 demo 比赛
    }

    return true;
  }

  private _selectOption(): void {
    switch (this.cursorIdx) {
      case 0: // New Game
        this.requestTransition(SceneId.STORY_INTRO);
        break;
      case 1: // Load Game
        this.requestTransition(SceneId.LOAD_GAME);
        break;
    }
  }

  exit(): void {
    this.attractMode = false;
  }
}
