/**
 * Scene6Controller — 场景 6 $0009 协程标志（PRG $A5B0 实证）
 *
 * 行为：LDX #$09; JSR $9F89 — 若 $000A≠0 且 $0009==0 → 置 $0009=1（就绪标志）
 * 返回 7
 */
import { SceneController } from './SceneController';

export class Scene6Controller extends SceneController {
  readonly sceneId = 6;
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    if (store.readByte(0x000a) !== 0 && store.readByte(0x0009) === 0) {
      store.writeByte(0x0009, 1);
    }
    return 0x07; // → Scene7
  }
}
