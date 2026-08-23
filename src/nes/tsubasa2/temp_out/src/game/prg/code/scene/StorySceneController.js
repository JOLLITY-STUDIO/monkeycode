"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorySceneController = void 0;
/**
 * StorySceneController — 剧情场景（原 bank18/19 剧情）
 *
 * @bank 18/19（剧情脚本数据与播放）
 *
 * V0.1 stub：注册契约；剧情脚本引擎（ScriptEngine）在 V0.4 覆盖。
 */
const SceneController_1 = require("./SceneController");
class StorySceneController extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 4;
    }
    onEnter() {
        // TODO V0.4: 装载剧情脚本并进入播放
    }
    onUpdate(frame) {
        // TODO V0.4: 剧情文本打字 / 等待 / 选项
        void frame;
        return undefined;
    }
    onRender() {
        // TODO V0.4: 剧情文本渲染
    }
}
exports.StorySceneController = StorySceneController;
