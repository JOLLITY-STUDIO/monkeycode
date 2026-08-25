/**
 * Scene19Controller — 场景 19 精灵闪烁循环 0x40 次 {等1帧; 屏外精灵 attr |= $08}; 清扩展表; 等1帧 → 15
 *
 * 循环里的"等 1 帧"用基类 scheduleAfter(1, cb) 替代 this.wait-- 模式（PRG $9FA8 翻译）。
 */
import { SceneController } from './SceneController';

export class Scene19Controller extends SceneController {
  readonly sceneId = 19;
  private iter = 0;
  /** "等 1 帧" 调度态：true = 可跑下一拍；false = 等 scheduler callback */
  private ready = true;
  private cleared = false;
  /** 等 callback 时挂起的下一 stage（lazy FSM） */
  private pendingStage: 'tick' | 'cleanupWait' | null = null;
  onEnter(): void {
    this.iter = 0;
    this.ready = true;
    this.cleared = false;
    this.pendingStage = null;
  }
  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    if (!this.ready) return undefined;
    if (this.iter >= 0x40) {
      if (!this.cleared) {
        for (const addr of [0x0568, 0x0588, 0x05a8, 0x05c8]) {
          store.writeByte(addr, 0);
        }
        this.cleared = true;
        this.ready = false;
        this.scheduleAfter(1, () => { this.ready = true; });
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
    // PRG $9FA8 pushState 翻译：每 tick 后等 1 帧
    this.ready = false;
    this.scheduleAfter(1, () => { this.ready = true; });
    return undefined;
  }
}
