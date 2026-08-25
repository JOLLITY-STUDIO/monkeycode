/**
 * Scene22Controller — 场景 22 循环 0x80 次 {等1帧; 屏外精灵 attr |= $04}
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene22Controller extends SceneController {
  readonly sceneId = 22;
  private iter = 0;
  private wait = 0;
  onEnter(): void {
    this.iter = 0;
    this.wait = 0;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
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
    this.wait = 1;
    return undefined;
  }
}
