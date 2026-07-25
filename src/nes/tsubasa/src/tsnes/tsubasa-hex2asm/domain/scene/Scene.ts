/**
 * 场景抽象基类
 *
 * 所有游戏场景的抽象父类。
 * 对应 ROM 中 ZP_SCENE_ID ($26) 控制的状态机。
 *
 * 每个子类实现：
 *   - enter(): 场景进入，初始化
 *   - update(): 每帧更新
 *   - exit():  场景退出，清理
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

/** 场景 ID 类型 */
export type SceneId = number;

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

/** 场景状态 */
export enum SceneState {
  /** 未激活 */
  INACTIVE = 0,
  /** 进入中 */
  ENTERING = 1,
  /** 运行中 */
  RUNNING  = 2,
  /** 退出中 */
  EXITING  = 3,
}

/**
 * Scene 抽象基类
 *
 * 生命周期: enter() → [update() 每帧循环] → exit()
 *
 * 子类应：
 * - enter() 中初始化场景资源、状态
 * - update() 中处理帧逻辑，返回当前帧是否已绘制完成
 * - exit()  中清理资源
 */
export abstract class Scene {
  /** 场景 ID */
  abstract readonly id: SceneId;
  /** 场景名称（调试用） */
  get name(): string { return SCENE_NAMES[this.id] ?? `Scene $${this.id.toString(16)}`; }

  /** 当前生命周期状态 */
  state: SceneState = SceneState.INACTIVE;

  /** 帧计数（从进入场景开始） */
  frameCount: number = 0;

  /**
   * 场景进入回调
   * 子类应在此初始化画面、加载资源、设置初始状态
   */
  abstract enter(): void;

  /**
   * 每帧更新
   * @returns `true` 表示画面已更新，需要渲染；`false` 表示本帧无变化
   */
  abstract update(): boolean;

  /**
   * 场景退出回调
   * 子类应在此清理资源
   */
  abstract exit(): void;

  /**
   * 请求切换到目标场景
   * 实际切换由 SceneManager 在帧末处理
   */
  requestTransition(targetSceneId: SceneId): void {
    this._nextSceneId = targetSceneId;
    this.state = SceneState.EXITING;
  }

  /** 内部：下一场景 ID（由 SceneManager 读取） */
  private _nextSceneId: SceneId = -1;
  get nextSceneId(): SceneId { return this._nextSceneId; }
}
