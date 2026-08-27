"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene8Controller = void 0;
/**
 * Scene8Controller — 场景 8 ram_001B 清 bit6（bank02 $85BF-$85CA 实证）
 *
 * 行为（PRG $85BF）：STA $A000（MMC3 寄存器写，H5 省略）→ $001B &= ~$40 → 返回 2 = hub
 */
const SceneController_1 = require("./SceneController");
const NEXT = 0x02;
class Scene8Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 8;
    }
    onEnter() {
        // STA $A000 = MMC3 bank select 写，H5 无硬件窗口，省略
        this.store.writeByte(0x001b, this.store.readByte(0x001b) & 0xbf);
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
exports.Scene8Controller = Scene8Controller;
