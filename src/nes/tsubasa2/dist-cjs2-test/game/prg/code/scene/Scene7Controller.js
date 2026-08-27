"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene7Controller = void 0;
/**
 * Scene7Controller — 场景 7 标记置 $FF（bank02 $85B9-$85BE 实证）
 *
 * 行为（PRG $85B9）：$0099 = $FF（NMI 帧末标志）→ 返回 2 = hub
 */
const SceneController_1 = require("./SceneController");
const NEXT = 0x02;
class Scene7Controller extends SceneController_1.SceneController {
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
exports.Scene7Controller = Scene7Controller;
