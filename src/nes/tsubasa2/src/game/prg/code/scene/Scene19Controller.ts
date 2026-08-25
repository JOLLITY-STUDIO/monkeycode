/**
 * Scene19Controller — 场景 19 精灵闪烁循环 0x40 次 {等1帧; 屏外精灵 attr |= $08}; 清扩展表; 等1帧 → 15
 */
import { SceneController } from './SceneController';

export class Scene19Controller extends SceneController {
  readonly sceneId = 19;
  private iter = 0;
  private wait = 0;
  private cleared = false;
  onEnter(): void {
    this.iter = 0;
    this.wait = 0;
    this.cleared = false;
  }
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    if (this.iter >= 0x40) {
      if (!this.cleared) {
        for (const addr of [0x0568, 0x0588, 0x05a8, 0x05c8]) {
          store.writeByte(addr, 0);
        }
        this.cleared = true;
        this.wait = 1;
        return undefined;
      }
      return 0x0f; // → Scene15
    }
    if (this.iter > 0) {
      for (let i = 0; i < 0x100; i += 4) {
        const y = store.readByte(0x0200 + i);
        if (y >= 0xf0) {
          const attr = store.readByte(0x0202 + i);
          store.writeByte(0x0202 + i, attr | 0x08);
        }
      }
    }
    this.iter++;
    this.wait = 1;
    return undefined;
  }
}
