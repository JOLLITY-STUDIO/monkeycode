/**
 * Scene23Controller — 场景 23 数值显示：转 16bit；查表高/低 4 位 → 写 OAM；各等 6 帧
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene23Controller extends SceneController {
  readonly sceneId = 23;
  private wait = 0;
  onEnter(): void {
    this.wait = 6;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    const store = this.store;
    const lo = store.readByte(0x0468);
    const hi = store.readByte(0x0469);
    const value = (hi << 8) | lo;
    const hiNib = (value >> 4) & 0x0f;
    const loNib = value & 0x0f;
    store.writeByte(0x0201, hiNib);
    store.writeByte(0x0205, loNib);
    return NEXT;
  }
}
