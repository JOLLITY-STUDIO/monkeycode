"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchStartSceneController = exports.MATCH_START_SCENE_ID = void 0;
/**
 * MatchStartSceneController — meeting 完后进入主比赛 (链路终点)
 *
 * 链路位置：...→Scene23→Meeting(300)→MatchStart(400)
 *
 * 行为：
 *   - onEnter(): 标记 sceneId + 等用户按 START 触发 MatchEngineService 启动
 *   - onUpdate(): 检查 START input, 按下后调 matchEngine.startMatch() + stay
 *
 * V0.5 (本次): 接 MatchEngineService.startMatch() — 真实比赛入口。
 *   - 启动比赛 (home/away 队初始化)
 *   - 比赛页面化由 MatchHudService/MatchTurnService 等驱动 (V0.6 接入)
 *   - onUpdate 改为 stay（不再 chain advance — 比赛是多帧循环）
 *
 * 附加 (原 stub 行为保留): chain 到 MatchStartScene 的入口已经存在, 没有下一站
 */
const SceneController_1 = require("./SceneController");
/** MatchStart scene id — meeting 后的下一站 */
exports.MATCH_START_SCENE_ID = 0x400;
class MatchStartSceneController extends SceneController_1.SceneController {
    constructor() {
        super(...arguments);
        this.sceneId = exports.MATCH_START_SCENE_ID;
        this.matchEngine = null;
        /** false = 等 START; true = 比赛已启动（stay 在比赛页面） */
        this.matchStarted = false;
    }
    /** Tsubasa2 入口注入 MatchEngineService */
    attachMatchEngine(engine) {
        this.matchEngine = engine;
    }
    onEnter() {
        this.store.writeByte(0x0001, exports.MATCH_START_SCENE_ID & 0xff);
        this.matchStarted = false;
    }
    onUpdate(_frame) {
        if (this.matchStarted || !this.matchEngine) {
            // 比赛已启动：stay 在 MatchStart 控制器（后续由 MatchEngine/MatchTurnService 驱动）
            return undefined;
        }
        // 等用户按 START (Button.Start = 0x10) 触发比赛启动
        //   默认对手: $0628 (场景选择) -> fallback SaoPaulo (0x02) 第一节 vs Nankatsu (0x01)
        if (this.input.isPressed(0x10)) {
            const home = this.store.readByte(0x0628) || 0x02; // SaoPaulo
            const away = 0x01; // Nankatsu 第一关固定
            this.matchEngine.startMatch(home, away);
            this.matchStarted = true;
        }
        return undefined;
    }
}
exports.MatchStartSceneController = MatchStartSceneController;
