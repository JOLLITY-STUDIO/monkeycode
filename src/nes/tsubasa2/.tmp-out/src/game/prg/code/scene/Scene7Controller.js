/**
 * Scene7Controller — 场景 7 标记置 $FF（bank02 $85B9-$85BE 实证）
 *
 * 行为（PRG $85B9）：$0099 = $FF（NMI 帧末标志）→ 返回 2 = hub
 */
import { SceneController } from './SceneController';
const NEXT = 0x02;
export class Scene7Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 7;
    }
    onEnter() {
        this.store.writeByte(0x0099, 0xff);
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
