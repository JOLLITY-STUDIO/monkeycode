/**
 * TitleScene — 標題畫面場景
 *
 * 顯示天使之翼 II 標題、選單：
 *   - 開始遊戲
 *   - 讀取存檔
 *   - 密碼輸入
 *
 * ROM bank prg_07 控制。
 * 具體 UI 佈局和選單交互，待從 bank 解析。
 */

import { Scene, SceneState } from './base';
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

  update(): boolean {
    this.frameCount++;
    // TODO: 處理按鍵 → 移動選項游標
    // TODO: 確認選擇 → 切換到對應場景
    return true;
  }

  exit(): void {
    // 清理標題畫面資源
  }
}
