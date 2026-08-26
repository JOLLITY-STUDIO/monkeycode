"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene17Controller = void 0;
/**
 * Scene17Controller — 场景 17 装载 CHR 配置
 *
 * @bank 02 (CPU $A77A)
 * 行为：loadChrConfig(0x80) → 返回 2 (hub)（ROM $A77A: LDA #$80; JSR $8AF7）
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const NEXT = 0x02;
class Scene17Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 17;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.loadChrConfig(0x80);
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
exports.Scene17Controller = Scene17Controller;
