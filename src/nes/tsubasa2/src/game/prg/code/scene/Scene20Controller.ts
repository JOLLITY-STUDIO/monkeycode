/**
 * Scene20Controller — 场景 20 等 1 帧；精灵装载
 */
import { SceneController } from './SceneController';

const NEXT = 0x02;

export class Scene20Controller extends SceneController {
  readonly sceneId = 20;
  private wait = 0;
  onEnter(): void {
    this.wait = 1;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    this.store.writeByte(0x0568, 0); // 精灵装载标记
    return NEXT;
  }
}
