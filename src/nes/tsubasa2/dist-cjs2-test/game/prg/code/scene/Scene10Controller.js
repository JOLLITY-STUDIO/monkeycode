"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene10Controller = void 0;
/**
 * Scene10Controller — 场景 10 装载 CHR 配置 0 + 装载场景数据 5（bank02 $85DC-$85E8 实证）
 *
 * 行为：loadChrConfig(0x00) + loadSceneData(5) → 返回 2 = hub
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
class Scene10Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 10;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.loadChrConfig(0x00);
        this.prim.loadSceneData(5);
    }
    onUpdate(_frame) {
        return 0x02; // → hub
    }
}
exports.Scene10Controller = Scene10Controller;
