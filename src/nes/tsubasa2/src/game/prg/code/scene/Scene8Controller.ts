/**
 * Scene8Controller — 场景 8 ram_001B 清 bit6
 *
 * 行为：$001B &= ~0x40 → 返回 9
 */
import { SceneController } from './SceneController';

export class Scene8Controller extends SceneController {
  readonly sceneId = 8;
  onEnter(): void {
    this.store.writeByte(0x001b, this.store.readByte(0x001b) & 0xbf);
  }
  onUpdate(_frame: number): number | undefined {
    return 0x09; // → Scene9
  }
}
