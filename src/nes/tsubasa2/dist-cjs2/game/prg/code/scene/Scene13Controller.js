"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene13Controller = void 0;
/**
 * Scene13Controller — 场景 13 装载 CHR 0x20 + 装载场景数据 7（bank02 $861D-$8629 实证）
 *
 * 行为：loadChrConfig(0x20) + loadSceneData(7) → 返回 2 = hub
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
class Scene13Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 13;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.loadChrConfig(0x20);
        this.prim.loadSceneData(7);
    }
    onUpdate(_frame) {
        return 0x02; // → hub
    }
}
exports.Scene13Controller = Scene13Controller;
