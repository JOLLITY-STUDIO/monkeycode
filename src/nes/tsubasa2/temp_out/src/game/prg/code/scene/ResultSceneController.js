"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSceneController = void 0;
/**
 * ResultSceneController — 结果场景（场景号 3）
 *
 * @bank 02 ($A581)
 *
 * 对应原始地址：$A581（跳转表第 3 项）— 比赛结果/队伍评价（原 ResultController）。
 *
 * V0.1 stub：注册契约；真实实现在 V0.5/V0.7 覆盖。
 */
const SceneController_1 = require("./SceneController");
class ResultSceneController extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 3;
    }
    onEnter() {
        // TODO V0.5: 翻译 $A581 结果场景（比分 / 评价 / 奖励）
    }
    onUpdate(frame) {
        // TODO V0.5: 结果流转
        void frame;
        return undefined;
    }
}
exports.ResultSceneController = ResultSceneController;
