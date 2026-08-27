"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene3Controller = void 0;
/**
 * Scene3Controller — 场景 3 清 NT0/NT1（bank02 $8582-$85A2 实证）
 *
 * 行为（PRG $8582）：
 *   fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00)  // NT0 $2000，16 行 × 32 列
 *   fillNametableRows(0x00, 0x24, 0x20, 0x20, 0x00)  // NT1 $2400，32 行 × 32 列
 *   返回 2 = hub
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const NEXT = 0x02;
class Scene3Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 3;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00);
        this.prim.fillNametableRows(0x00, 0x24, 0x20, 0x20, 0x00);
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
exports.Scene3Controller = Scene3Controller;
