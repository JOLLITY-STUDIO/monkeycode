"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAuxService = exports.RestartType = void 0;
var RestartType;
(function (RestartType) {
    RestartType[RestartType["None"] = 0] = "None";
    RestartType[RestartType["ThrowIn"] = 1] = "ThrowIn";
    RestartType[RestartType["CornerKick"] = 2] = "CornerKick";
    RestartType[RestartType["GoalKick"] = 3] = "GoalKick";
    RestartType[RestartType["KickOff"] = 4] = "KickOff";
})(RestartType || (exports.RestartType = RestartType = {}));
class MatchAuxService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 处理死球/界外事件（V0.5 实现）
     *
     * 对应 asm $814C 死球回合入口：检测球坐标 → 越界 → 写重启类型
     * → 通知 MatchTurnService 重启回合（间接通过更新 ram_003B）。
     */
    handleDeadBall() {
        const ballX = this.store.readByte(0x0430);
        const ballY = this.store.readByte(0x0431);
        const restart = this.detectRestart(ballX, ballY);
        if (restart !== RestartType.None) {
            // 写回合状态（ram_003B）让 MatchTurnService 看到重启事件
            this.store.writeByte(0x003b, restart & 0xff);
        }
    }
    /**
     * 越界检测：球 X 越界 → 角球或球门球；球 Y 越界 → 界外球
     * - X ≤ 0 或 X ≥ 250 → X 越界（角球/球门球）
     * - Y ≤ 0 或 Y ≥ 230 → Y 越界（界外）
     *
     * 控球方（ram_043B）决定是角球还是球门球：
     * - 进攻方碰出底线 → 角球
     * - 防守方碰出底线 → 球门球
     */
    detectRestart(ballX, ballY) {
        // X 越界（左右底线）
        if (ballX <= 1 || ballX >= 254) {
            const possession = this.store.readByte(0x043b) & 0xff;
            // 进攻方（0）碰出 → 球门球（防守方重启）
            // 防守方/丢球方（1/3）碰出 → 角球（进攻方重启）
            return possession === 0 ? RestartType.GoalKick : RestartType.CornerKick;
        }
        // Y 越界（上下边线）
        if (ballY <= 1 || ballY >= 238) {
            return RestartType.ThrowIn;
        }
        return RestartType.None;
    }
    /**
     * 换人操作（按战术配置）。
     * 当前 stub：将换人标志置位，真实逻辑由 MatchEventService 接管。
     *
     * @param playerIdx  换上球员 idx
     * @param slot       被换下球员 slot
     */
    handleSubstitution(playerIdx, slot) {
        // 简化：置位换人标志 ram_0612 bit7；具体交换由 MatchEngineService.swapPlayers
        this.store.writeByte(0x0612, (this.store.readByte(0x0612) | 0x80) & 0xff);
        void playerIdx;
        void slot;
    }
    /**
     * 查询球是否在界内。
     */
    isBallInBounds() {
        return this.detectRestart(this.store.readByte(0x0430), this.store.readByte(0x0431)) === RestartType.None;
    }
    /**
     * 球坐标查询。
     */
    getBallXY() {
        return {
            x: this.store.readByte(0x0430) & 0xff,
            y: this.store.readByte(0x0431) & 0xff,
        };
    }
}
exports.MatchAuxService = MatchAuxService;
