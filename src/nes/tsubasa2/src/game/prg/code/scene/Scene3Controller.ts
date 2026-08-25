/**
 * Scene3Controller — 场景 3 清 NT0/NT1（PRG $A581 实证）
 *
 * 行为：$2000-$23FF (16 行) + $2400-$27FF (32 行) 填 0 → 返回 4
 */
import { SceneController } from './SceneController';

export class Scene3Controller extends SceneController {
  readonly sceneId = 3;
  onEnter(): void {
    const store = this.store;
    for (let addr = 0x2000; addr <= 0x27ff; addr++) {
      store.writeByte(addr, 0);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return 0x04; // → Scene4
  }
}
