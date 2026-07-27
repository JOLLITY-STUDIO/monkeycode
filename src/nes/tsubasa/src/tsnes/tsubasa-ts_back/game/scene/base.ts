/**
 * Scene 抽象基类 — 所有场景的契约
 *
 * 生命周期: enter() → [update(input) 每帧循环] → exit()
 */

import {
  SCENE_TECMO_LOGO,
  SCENE_TITLE,
  SCENE_LOAD_GAME,
  SCENE_MAIN_MENU,
  SCENE_STORY_INTRO,
  SCENE_BRAZIL_LEAGUE,
  SCENE_BRAZIL_DIALOG,
  SCENE_BRAZIL_END,
  SCENE_HIGH_SCHOOL,
  SCENE_HIGH_SCHOOL_DIALOG,
  SCENE_HIGH_SCHOOL_END,
  SCENE_JAPAN_CUP,
  SCENE_JAPAN_CUP_DIALOG,
  SCENE_WORLD_YOUTH,
  SCENE_WORLD_YOUTH_DIALOG,
  SCENE_WORLD_YOUTH_END,
  SCENE_ENDING,
  SCENE_FINAL_ENDING,
} from '../../constants/scene_codes';

// ============================================================
// §1 类型 / 常量
// ============================================================

/** 场景 ID */
export type SceneId = number;

/** 手柄输入 */
export interface JoypadInput {
  a: boolean;
  b: boolean;
  select: boolean;
  start: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

/** 空输入常量 */
export const NO_INPUT: JoypadInput = {
  a: false, b: false, select: false, start: false,
  up: false, down: false, left: false, right: false,
};

/** 场景状态 */
export enum SceneState {
  INACTIVE = 0,
  ENTERING = 1,
  RUNNING  = 2,
  EXITING  = 3,
}

/** 场景名称映射 */
export const SCENE_NAMES: Record<SceneId, string> = {
  [SCENE_TECMO_LOGO]:      'TECMO Logo',
  [SCENE_TITLE]:           'Title Screen',
  [SCENE_LOAD_GAME]:       'Load Game / Password',
  [SCENE_MAIN_MENU]:       'Main Menu',
  [SCENE_STORY_INTRO]:     'Story Prologue',
  [SCENE_BRAZIL_LEAGUE]:   'Brazil League',
  [SCENE_BRAZIL_DIALOG]:   'Brazil League Dialog',
  [SCENE_BRAZIL_END]:      'Brazil League End',
  [SCENE_HIGH_SCHOOL]:     'Japan High School',
  [SCENE_HIGH_SCHOOL_DIALOG]: 'High School Dialog',
  [SCENE_HIGH_SCHOOL_END]: 'High School End',
  [SCENE_JAPAN_CUP]:       'Japan Cup',
  [SCENE_JAPAN_CUP_DIALOG]: 'Japan Cup Dialog',
  [SCENE_WORLD_YOUTH]:     'World Youth',
  [SCENE_WORLD_YOUTH_DIALOG]: 'World Youth Dialog',
  [SCENE_WORLD_YOUTH_END]: 'World Youth End',
  [SCENE_ENDING]:          'Ending',
  [SCENE_FINAL_ENDING]:    'Final Ending',
};

// ============================================================
// §2 抽象基类
// ============================================================

export abstract class Scene {
  /** 场景 ID */
  abstract readonly id: SceneId;
  /** 场景名称（调试用） */
  get name(): string { return SCENE_NAMES[this.id] ?? `Scene #${this.id}`; }

  /** 当前生命周期状态 */
  state: SceneState = SceneState.INACTIVE;
  /** 帧计数（从进入场景开始） */
  frameCount: number = 0;

  /** 场景进入 */
  abstract enter(): void;
  /** 每帧更新，接收手柄输入 */
  abstract update(input: JoypadInput): boolean;
  /** 场景退出 */
  abstract exit(): void;

  /** 请求切换到目标场景 */
  requestTransition(targetSceneId: SceneId): void {
    this._nextSceneId = targetSceneId;
    this.state = SceneState.EXITING;
  }

  private _nextSceneId: SceneId = -1;
  get nextSceneId(): SceneId { return this._nextSceneId; }
}
