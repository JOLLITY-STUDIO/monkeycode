/**
 * Scene9Controller — 场景 9 ram_001B 置 bit6
 *
 * 行为：$001B |= 0x40 → 返回 10
 */
import { SceneController } from './SceneController';

export class Scene9Controller extends SceneController {
  readonly sceneId = 9;
  onEnter(): void {
    this.store.writeByte(0x001b, this.store.readByte(0x001b) | 0x40);
  }
  onUpdate(_frame: number): number | undefined {
    return 0x0a; // → Scene10
  }
}
