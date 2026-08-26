/**
 * Scene9Controller — 场景 9 ram_001B 置 bit6（bank02 $85CB-$85D6 实证）
 *
 * 行为（PRG $85CB）：STA $A000（MMC3 寄存器写，H5 省略）→ $001B |= $40 → 返回 2 = hub
 */
import { SceneController } from './SceneController';
const NEXT = 0x02;
export class Scene9Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 9;
    }
    onEnter() {
        // STA $A000 = MMC3 bank select 写，H5 无硬件窗口，省略
        this.store.writeByte(0x001b, this.store.readByte(0x001b) | 0x40);
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
