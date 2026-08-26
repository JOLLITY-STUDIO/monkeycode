/**
 * Scene19Controller — 场景 19 精灵闪烁循环（扩展精灵表 $0468）
 *
 * @bank 02 (CPU $A78D)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   0x40 次外迭代，每次 { 内层 X=$20..$C4 步长 4：
 *       若 $0468,X (y) 有符号 < 0（bit7=1，屏外）→ $046A,X |= $08；等 1 帧 }
 *   结束后清扩展表 $0568/$0588/$05A8/$05C8；等 1 帧；
 *   轮询 $0009 == 0（CHR 装载完成标志，非 0 则每帧再等）；
 *   返回 0x0f → Scene15（ROM: JMP $A651 落入 Scene15 循环）
 *
 * 等 1 帧用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';

const NEXT_SCENE = 0x0f; // → Scene15
const OUTER = 0x40;
const INNER_START = 0x20;
const INNER_END = 0xc4;
const EXT_TABLES = [0x0568, 0x0588, 0x05a8, 0x05c8] as const;

export class Scene19Controller extends SceneController {
  readonly sceneId = 19;
  private iter = 0;
  private cleared = false;
  private wait9 = false;
  /** "等 1 帧" 调度态 */
  private ready = true;
  onEnter(): void {
    this.iter = 0;
    this.cleared = false;
    this.wait9 = false;
    this.ready = true;
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.ready) return undefined;
    const store = this.store;
    if (this.iter >= OUTER) {
      if (!this.cleared) {
        // 清扩展表
        for (const addr of EXT_TABLES) store.writeByte(addr, 0);
        this.cleared = true;
        this.ready = false;
        this.scheduleAfter(1, () => { this.ready = true; });
        return undefined;
      }
      if (!this.wait9) {
        if (store.readByte(0x0009) !== 0) {
          // 等待 CHR 装载完成标志 $0009 清零，每帧轮询
          this.ready = false;
          this.scheduleAfter(1, () => { this.ready = true; });
          return undefined;
        }
        this.wait9 = true;
      }
      return NEXT_SCENE;
    }
    // 内层：$0468 扩展精灵表，X=$20..$C4 步长 4
    for (let x = INNER_START; x <= INNER_END; x += 4) {
      const y = store.readByte(0x0468 + x);
      if ((y & 0x80) !== 0) {
        store.writeByte(0x046a + x, store.readByte(0x046a + x) | 0x08);
      }
    }
    this.iter++;
    this.ready = false;
    this.scheduleAfter(1, () => { this.ready = true; });
    return undefined;
  }
}
