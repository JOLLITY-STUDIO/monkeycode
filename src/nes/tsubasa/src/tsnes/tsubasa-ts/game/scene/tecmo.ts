/**
 * TecmoScene — TECMO Logo 開場場景
 *
 * ROM bank prg_01 控制，顯示 TECMO 動畫 logo 後轉入標題畫面。
 * 具體動畫序列待從 bank 解析。
 */

import { Scene, SceneState } from './base';
import { SCENE_TECMO_LOGO, SCENE_TITLE } from '../../constants/scene_codes';

export class TecmoScene extends Scene {
  readonly id = SCENE_TECMO_LOGO;

  enter(): void {
    this.frameCount = 0;
    this.state = SceneState.RUNNING;
    // TODO: 從 prg_01 解析 logo 動畫 tile 佈局和調色板
  }

  update(): boolean {
    this.frameCount++;
    // TODO: 逐幀推進 logo 動畫序列
    // 動畫結束後切到標題畫面
    if (this.frameCount > 180) {
      this.requestTransition(SCENE_TITLE);
    }
    return true;
  }

  exit(): void {
    // 清理 logo 畫面資源
  }
}
