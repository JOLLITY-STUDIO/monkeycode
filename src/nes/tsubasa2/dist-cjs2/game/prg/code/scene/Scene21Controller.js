"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene21Controller = void 0;
/**
 * Scene21Controller — 场景 21 装载 CHR 配置
 *
 * @bank 02 (CPU $A7CE)
 * 行为：loadChrConfig(0x81) → 返回 2 (hub)（ROM $A7CE: LDA #$81; JSR $8AF7）
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const NEXT = 0x16; // → Scene22 (主游戏 prep 链)
class Scene21Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 21;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.loadChrConfig(0x81);
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
exports.Scene21Controller = Scene21Controller;
