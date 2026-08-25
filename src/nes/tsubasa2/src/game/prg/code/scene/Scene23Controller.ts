/**
 * Scene23Controller — 场景 23 数值显示：转 16bit；查表高/低 4 位 → 写 OAM；各等 6 帧
 *
 * 用基类 scheduleAfter(6, cb) 替代 this.wait-- 模式（PRG $9FA8 pushState 翻译）。
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene23Controller extends SceneController {
  readonly sceneId = 23;
  private waitDone = false;
  onEnter(): void {
    this.waitDone = false;
    // PRG $9FA8 pushState 翻译：等 6 帧后切到末态
    this.scheduleAfter(6, () => {
      this.waitDone = true;
    });
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.waitDone) return undefined;
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
