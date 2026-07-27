// ============================================================================
// scene/types.ts — 场景系统基础类型
// ============================================================================

// ---- 场景 ID (与 ROM ZP_SCENE_ID 对应) ----

export const SceneId = {
  TECMO_LOGO:       0,
  TITLE:            1,
  LOAD_GAME:        2,
  MAIN_MENU:        3,
  STORY_INTRO:      4,
  BRAZIL_LEAGUE:    5,
  BRAZIL_DIALOG:    6,
  BRAZIL_END:       7,
  HIGH_SCHOOL:      8,
  HIGH_SCHOOL_DIALOG: 9,
  HIGH_SCHOOL_END:  10,
  JAPAN_CUP:        11,
  JAPAN_CUP_DIALOG: 12,
  WORLD_YOUTH:      13,
  WORLD_YOUTH_DIALOG: 14,
  WORLD_YOUTH_END:  15,
  ENDING:           16,
  FINAL_ENDING:     17,
} as const;

export type SceneId = typeof SceneId[keyof typeof SceneId];

// ---- 手柄输入 ----

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

export const NO_INPUT: JoypadInput = {
  a: false, b: false, select: false, start: false,
  up: false, down: false, left: false, right: false,
};

// ---- 场景状态 ----

export enum SceneState {
  INACTIVE = 0,
  ENTERING = 1,
  RUNNING  = 2,
  EXITING  = 3,
}

// ---- 场景名称映射 ----

export const SCENE_NAMES: Record<SceneId, string> = {
  [SceneId.TECMO_LOGO]:        'TECMO Logo',
  [SceneId.TITLE]:             'Title Screen',
  [SceneId.LOAD_GAME]:         'Load Game',
  [SceneId.MAIN_MENU]:         'Main Menu',
  [SceneId.STORY_INTRO]:       'Story Prologue',
  [SceneId.BRAZIL_LEAGUE]:     'Brazil League',
  [SceneId.BRAZIL_DIALOG]:     'Brazil Dialog',
  [SceneId.BRAZIL_END]:        'Brazil End',
  [SceneId.HIGH_SCHOOL]:       'High School',
  [SceneId.HIGH_SCHOOL_DIALOG]: 'High School Dialog',
  [SceneId.HIGH_SCHOOL_END]:   'High School End',
  [SceneId.JAPAN_CUP]:         'Japan Cup',
  [SceneId.JAPAN_CUP_DIALOG]:  'Japan Cup Dialog',
  [SceneId.WORLD_YOUTH]:       'World Youth',
  [SceneId.WORLD_YOUTH_DIALOG]: 'World Youth Dialog',
  [SceneId.WORLD_YOUTH_END]:   'World Youth End',
  [SceneId.ENDING]:            'Ending',
  [SceneId.FINAL_ENDING]:      'Final Ending',
};

// ---- 显示列表命令 ----

export interface DlCommand {
  type: 'rect_fill' | 'palette' | 'oam';
  addr: number;
  data: Uint8Array | number[];
  count: number;
}

// ---- 场景抽象基类 ----

export abstract class Scene {
  abstract readonly id: SceneId;

  get name(): string { return SCENE_NAMES[this.id] ?? `Scene #${this.id}`; }

  /** 当前生命周期状态 */
  state: SceneState = SceneState.INACTIVE;
  /** 帧计数 (从进入场景开始) */
  frameCount: number = 0;

  abstract enter(): void;
  abstract update(input: JoypadInput): boolean;
  abstract exit(): void;

  /** 请求切换到目标场景 */
  requestTransition(targetSceneId: SceneId): void {
    this._nextSceneId = targetSceneId;
    this.state = SceneState.EXITING;
  }

  private _nextSceneId: SceneId = -1;
  get nextSceneId(): SceneId { return this._nextSceneId; }
}
