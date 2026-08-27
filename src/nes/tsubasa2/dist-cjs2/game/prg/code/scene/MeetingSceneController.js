"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSceneController = exports.MEETING_SCENE_ID = void 0;
/**
 * MeetingSceneController — 第一关 meeting 页面 (剧情脚本入口)
 *
 * 链路位置：Scene14→15→16→17→18→20→21→22→23→Meeting (300)
 *
 * 行为：onEnter() 调 ScriptEngine.start(0) 跑 BANK18 第 0 段剧情
 *       onUpdate() 调 ScriptEngine.step() 推进 VM
 *       ScriptContext.finished → stay 在 meeting 等用户输入
 *
 * 数据来源：title-kick-off-to-meeting.log f52731+ 实证
 *   bank00 $9A86: JSR $9AA2 (NT cell writer) — ScriptEngine 写剧情文本到 NT
 *   bank0F $C43A: JSR $A000 — 6-slot dispatcher 持续触发 Scene0 main handler
 */
const SceneController_1 = require("./SceneController");
/** Meeting scene id（链路终点 — Scene23 完成后跳到这里） */
exports.MEETING_SCENE_ID = 0x300;
/** meeting 第一段剧情 script id (BANK18 段 0 - BANK18_DATA_TABLES[0x0000-0x0FFF]) */
const FIRST_MEETING_SCRIPT_ID = 0x00;
class MeetingSceneController extends SceneController_1.SceneController {
    constructor() {
        super(...arguments);
        this.sceneId = exports.MEETING_SCENE_ID;
        this.scriptEngine = null;
        this.scriptCtx = null;
    }
    /** Tsubasa2 构造时注入（跟 OpeningScene.attachAudio 同模式） */
    attachScriptEngine(engine) {
        this.scriptEngine = engine;
    }
    onEnter() {
        this.store.writeByte(0x0001, exports.MEETING_SCENE_ID & 0xff);
        // NT cursor 重置: $05E7 = 0 (PRG $9AA2 NT cell writer 起点)
        this.store.writeByte(0x05e7, 0x00);
        if (this.scriptEngine) {
            // 启动 meeting 第一段剧情（bank18 段 0 — TitleOpener/Meeting 入口）
            this.scriptCtx = this.scriptEngine.start(FIRST_MEETING_SCRIPT_ID);
        }
        else {
            // ScriptEngine 未注入（链路走通 stub 模式）
            this.scriptCtx = null;
        }
    }
    onUpdate(_frame) {
        if (!this.scriptEngine || !this.scriptCtx) {
            // 没 ScriptEngine：链路走通 stub，等用户按 A 跳过
            return undefined;
        }
        // 推进 VM 一帧（PRG $90E4-$94D2 dispatch loop 翻译）
        const stillRunning = this.scriptEngine.step(this.scriptCtx);
        if (!stillRunning && !this.scriptCtx.waitingInput) {
            // VM 第一段结束（EndSegment / EndScript / ctx.finished）
            // chain advance 到 MatchStart (主比赛入口)
            return 0x400;
        }
        return undefined;
    }
}
exports.MeetingSceneController = MeetingSceneController;
