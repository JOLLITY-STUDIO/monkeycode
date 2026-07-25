/**
 * TitleScene — 標題畫面場景
 *
 * ROM bank prg_07 控制。
 * 無操作一段時間後進入 attract mode (demo 比賽 → reset)。
 */

import { Scene, SceneState, NO_INPUT } from './base';
import type { JoypadInput } from './base';
import { SCENE_TITLE, SCENE_MAIN_MENU } from '../../constants/scene_codes';

export class TitleScene extends Scene {
  readonly id = SCENE_TITLE;

  private selectedOption: number = 0;

  enter(): void {
    this.frameCount = 0;
    this.selectedOption = 0;
    this.state = SceneState.RUNNING;
    // TODO: 載入標題畫面 CHR 和 nametable 佈局
  }

  update(input: JoypadInput = NO_INPUT): boolean {
    // TODO: 處理按鍵 → 移動選項游標
    // TODO: 確認選擇 → 切換到對應場景
    // TODO: attract mode — 無操作超時 → demo 比賽
    return true;
  }

  exit(): void {
    // 清理標題畫面資源
  }
}
