/**
 * Scene2Controller — 场景 2 清精灵扩展表（PRG $A57B 实证）
 *
 * 行为：4 组影子 OAM 扩展字节清零 → 返回 2 = hub 自循环（空闲态）
 * ROM 真实：$A57B → JSR $9B91 → 返回 2（场景 14+ NEXT 落点）
 */
import { SceneController } from './SceneController';

export class Scene2Controller extends SceneController {
  readonly sceneId = 2;
  onEnter(): void {
    const store = this.store;
    for (const addr of [0x0568, 0x0588, 0x05a8, 0x05c8]) {
      store.writeByte(addr, 0);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return 0x02; // → hub 自循环（空闲态，保持 Scene2）
  }
}
