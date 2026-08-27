"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene4Controller = void 0;
/**
 * Scene4Controller — 场景 4 隐藏全部 OAM（bank02 $85A3-$85A8 实证）
 *
 * 行为（PRG $85A3）：JSR $9B7F（hideOam）→ 返回 2 = hub
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const NEXT = 0x02;
class Scene4Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 4;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.hideOam();
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
exports.Scene4Controller = Scene4Controller;
