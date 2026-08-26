/**
 * Scene5Controller — 场景 5 $0009 协程延迟（bank02 $85A9-$85B0 实证）
 *
 * 行为（PRG $85A9）：LDX #$09; JSR $9F96
 *   $9F96（bank00）：若 $0009 == $FF → LDA #$01; JSR $9FA8（等 1 帧）后 $0009 = 0
 *   返回 2 = hub
 */
import { SceneController } from './SceneController';
const NEXT = 0x02;
export class Scene5Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 5;
    }
    onEnter() { }
    onUpdate(_frame) {
        const store = this.store;
        if (store.readByte(0x0009) === 0xff) {
            // JSR $9FA8 等 1 帧后 $0009 = 0
            this.scheduleAfter(1, () => {
                store.writeByte(0x0009, 0);
            });
        }
        return NEXT;
    }
}
