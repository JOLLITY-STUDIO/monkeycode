/**
 * Scene22Controller — 场景 22 循环 0x80 次 {等1帧; 屏外精灵 attr |= $04}
 *
 * 等 1 帧用基类 scheduleAfter(1, cb) 替代 this.wait-- 模式（PRG $9FA8 翻译）。
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene22Controller extends SceneController {
  readonly sceneId = 22;
  private iter = 0;
  private ready = true;
  onEnter(): void {
    this.iter = 0;
    this.ready = true;
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.ready) return undefined;
    if (this.iter >= 0x80) return NEXT;
    const store = this.store;
    for (let i = 0; i < 0x100; i += 4) {
      const y = store.readByte(0x0200 + i);
      if (y >= 0xf0) {
        const attr = store.readByte(0x0202 + i);
        store.writeByte(0x0202 + i, attr | 0x04);
      }
    }
    this.iter++;
    this.ready = false;
    this.scheduleAfter(1, () => { this.ready = true; });
    return undefined;
  }
}
