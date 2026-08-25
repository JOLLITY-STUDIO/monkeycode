/**
 * Scene5Controller — 场景 5 $0009 协程延迟（PRG $A5A8 实证）
 *
 * 行为：LDX #$09; JSR $9F96 — 若 $0009==$FF（协程挂起）→ 等 1 帧后清 $0009=0
 * 返回 6
 */
import { SceneController } from './SceneController';

export class Scene5Controller extends SceneController {
  readonly sceneId = 5;
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    if (store.readByte(0x0009) === 0xff) {
      store.writeByte(0x0009, 0);
      return undefined; // 等待一帧后再推进
    }
    return 0x06; // → Scene6
  }
}
