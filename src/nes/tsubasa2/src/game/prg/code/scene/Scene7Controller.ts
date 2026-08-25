/**
 * Scene7Controller — 场景 7 标记置 $FF
 *
 * 行为：$0099 = $FF（NMI 帧末标志）→ 返回 8
 */
import { SceneController } from './SceneController';

export class Scene7Controller extends SceneController {
  readonly sceneId = 7;
  onEnter(): void {
    this.store.writeByte(0x0099, 0xff);
  }
  onUpdate(_frame: number): number | undefined {
    return 0x08; // → Scene8
  }
}
