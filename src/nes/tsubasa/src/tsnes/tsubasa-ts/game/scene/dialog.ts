/**
 * DialogScene — 對話 / 過場場景
 *
 * 驅動 ROM bytecode 引擎，逐幀繪製旁白、對話框、人物表情。
 *
 * 對接：
 *   - domain/script/BytecodeEngine.ts
 *   - domain/script/BytecodeOp.ts
 */

import { Scene, SceneState } from './base';
import type { SceneId } from './base';
import { SCENE_BRAZIL_DIALOG, SCENE_HIGH_SCHOOL_DIALOG, SCENE_JAPAN_CUP_DIALOG, SCENE_WORLD_YOUTH_DIALOG } from '../../constants/scene_codes';

// 對話場景 ID 列表
export const DIALOG_SCENES: SceneId[] = [
  SCENE_BRAZIL_DIALOG,
  SCENE_HIGH_SCHOOL_DIALOG,
  SCENE_JAPAN_CUP_DIALOG,
  SCENE_WORLD_YOUTH_DIALOG,
];

export class DialogScene extends Scene {
  readonly id: SceneId;

  constructor(sceneId: SceneId) {
    super();
    this.id = sceneId;
  }

  enter(): void {
    this.frameCount = 0;
    this.state = SceneState.RUNNING;
    // TODO: 載入該場景的 bytecode 腳本
    // TODO: 初始化對話框 UI 佈局
  }

  update(): boolean {
    this.frameCount++;
    // TODO: 逐幀步進 bytecode 引擎，渲染文字/表情
    // TODO: 檢測結束條件 → 切換到對應比賽場景
    return true;
  }

  exit(): void {
    // 清理對話資源
  }
}
