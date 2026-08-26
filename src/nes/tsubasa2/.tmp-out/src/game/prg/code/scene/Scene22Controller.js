/**
 * Scene22Controller — 场景 22 精灵属性置位循环（扩展精灵表 $0468）
 *
 * @bank 02 (CPU $A7D6)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   0x80 次外迭代，每次 { 内层 X=$20..$C4 步长 4：
 *       若 $0468,X (y) 有符号 < 0（bit7=1，屏外）→ $046A,X |= $04；等 1 帧 }
 *   完成 → 返回 2 (hub)
 *
 * 等 1 帧用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
const NEXT = 0x02;
const OUTER = 0x80;
const INNER_START = 0x20;
const INNER_END = 0xc4;
export class Scene22Controller extends SceneController {
    constructor() {
        super(...arguments);
        this.sceneId = 22;
        this.iter = 0;
        this.ready = true;
    }
    onEnter() {
        this.iter = 0;
        this.ready = true;
    }
    onUpdate(_frame) {
        if (!this.ready)
            return undefined;
        if (this.iter >= OUTER)
            return NEXT;
        const store = this.store;
        // 内层：$0468 扩展精灵表，X=$20..$C4 步长 4
        for (let x = INNER_START; x <= INNER_END; x += 4) {
            const y = store.readByte(0x0468 + x);
            if ((y & 0x80) !== 0) {
                store.writeByte(0x046a + x, store.readByte(0x046a + x) | 0x04);
            }
        }
        this.iter++;
        this.ready = false;
        this.scheduleAfter(1, () => { this.ready = true; });
        return undefined;
    }
}
