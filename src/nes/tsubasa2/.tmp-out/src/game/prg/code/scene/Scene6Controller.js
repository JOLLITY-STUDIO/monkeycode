/**
 * Scene6Controller — 场景 6 $0009 协程标志（bank02 $85B1-$85B8 实证）
 *
 * 行为（PRG $85B1）：LDX #$09; JSR $9F89
 *   $9F89（bank00）：若 $000A != 0 且 $0009 == 0 → $0009 = 1
 *   返回 2 = hub
 */
import { SceneController } from './SceneController';
const NEXT = 0x02;
export class Scene6Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 6;
    }
    onEnter() { }
    onUpdate(_frame) {
        const store = this.store;
        if (store.readByte(0x000a) !== 0 && store.readByte(0x0009) === 0) {
            store.writeByte(0x0009, 1);
        }
        return NEXT;
    }
}
