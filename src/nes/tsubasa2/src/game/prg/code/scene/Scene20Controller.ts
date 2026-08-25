/**
 * Scene20Controller — 场景 20 等 1 帧；精灵装载
 *
 * 用基类 scheduleAfter(1, cb) 替代 this.wait-- 模式（PRG $9FA8 pushState 翻译）。
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene20Controller extends SceneController {
  readonly sceneId = 20;
  private waitDone = false;
  onEnter(): void {
    this.waitDone = false;
    // PRG $9FA8 pushState 翻译：等 1 帧后调 精灵装载标记
    this.scheduleAfter(1, () => {
      this.waitDone = true;
    });
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.waitDone) return undefined;
    this.store.writeByte(0x0568, 0); // 精灵装载标记
    return NEXT;
  }
}
