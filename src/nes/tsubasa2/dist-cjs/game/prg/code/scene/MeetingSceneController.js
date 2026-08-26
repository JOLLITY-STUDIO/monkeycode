"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSceneController = exports.MEETING_SCENE_ID = void 0;
/**
 * MeetingSceneController — 第一关 meeting 页面 (剧情脚本入口)
 *
 * 链路位置：Scene14→15→16→17→18→20→21→22→23→Meeting (300)
 *
 * 当前为 stub：链路走通阶段，仅标记已到达 meeting 页面。
 * TODO：注入 ScriptEngine.start() 跑第一段剧情脚本
 */
const SceneController_1 = require("./SceneController");
/** Meeting scene id（链路终点 — Scene23 完成后跳到这里） */
exports.MEETING_SCENE_ID = 0x300;
class MeetingSceneController extends SceneController_1.SceneController {
    constructor() {
        super(...arguments);
        this.sceneId = exports.MEETING_SCENE_ID;
    }
    onEnter() {
        // TODO: ScriptEngine.start(firstMeetingScriptId) 跑剧情第一段
        // 当前 stub：仅记录到达，链路走通到此为止
        this.store.writeByte(0x0001, exports.MEETING_SCENE_ID & 0xff);
    }
    onUpdate(_frame) {
        // meeting 页面稳定显示 — 等用户按 A 跳过/继续（stub 暂不处理）
        return undefined;
    }
}
exports.MeetingSceneController = MeetingSceneController;
