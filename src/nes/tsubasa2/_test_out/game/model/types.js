"use strict";
/**
 * 天使之翼2 — 领域模型类型定义
 *
 * 替代 NES 原始 ROM 中的字节数组，用结构化 TypeScript 类型表达游戏世界。
 * 数据来源: Banks 03-10, 13-15, 17-18, 21, 23, 25, 27, 29
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLANK_PALETTE = exports.SceneType = exports.FormationType = exports.MatchPhase = exports.PlayerPosition = void 0;
exports.createBlankPaletteTable = createBlankPaletteTable;
// ═══════════════════════════════════════════════════════════════
// 枚举
// ═══════════════════════════════════════════════════════════════
/** 球员位置 */
var PlayerPosition;
(function (PlayerPosition) {
    PlayerPosition[PlayerPosition["GK"] = 0] = "GK";
    PlayerPosition[PlayerPosition["DF"] = 1] = "DF";
    PlayerPosition[PlayerPosition["MF"] = 2] = "MF";
    PlayerPosition[PlayerPosition["FW"] = 3] = "FW";
})(PlayerPosition || (exports.PlayerPosition = PlayerPosition = {}));
/** 比赛阶段 */
var MatchPhase;
(function (MatchPhase) {
    MatchPhase[MatchPhase["PRE_MATCH"] = 0] = "PRE_MATCH";
    MatchPhase[MatchPhase["KICK_OFF"] = 1] = "KICK_OFF";
    MatchPhase[MatchPhase["ATTACK"] = 2] = "ATTACK";
    MatchPhase[MatchPhase["DEFENSE"] = 3] = "DEFENSE";
    MatchPhase[MatchPhase["SHOOT"] = 4] = "SHOOT";
    MatchPhase[MatchPhase["GOAL"] = 5] = "GOAL";
    MatchPhase[MatchPhase["CORNER"] = 6] = "CORNER";
    MatchPhase[MatchPhase["THROW_IN"] = 7] = "THROW_IN";
    MatchPhase[MatchPhase["GOAL_KICK"] = 8] = "GOAL_KICK";
    MatchPhase[MatchPhase["HALF_TIME"] = 9] = "HALF_TIME";
    MatchPhase[MatchPhase["FULL_TIME"] = 10] = "FULL_TIME";
    MatchPhase[MatchPhase["PENALTY"] = 11] = "PENALTY";
})(MatchPhase || (exports.MatchPhase = MatchPhase = {}));
/** 阵型类型 */
var FormationType;
(function (FormationType) {
    FormationType[FormationType["FORM_433"] = 0] = "FORM_433";
    FormationType[FormationType["FORM_442"] = 1] = "FORM_442";
    FormationType[FormationType["FORM_352"] = 2] = "FORM_352";
    FormationType[FormationType["FORM_343"] = 3] = "FORM_343";
    FormationType[FormationType["FORM_451"] = 4] = "FORM_451";
})(FormationType || (exports.FormationType = FormationType = {}));
// ═══════════════════════════════════════════════════════════════
// 场景 / 剧情
// ═══════════════════════════════════════════════════════════════
/** 场景类型 */
var SceneType;
(function (SceneType) {
    SceneType[SceneType["TITLE"] = 0] = "TITLE";
    SceneType[SceneType["MENU"] = 1] = "MENU";
    SceneType[SceneType["PASSWORD"] = 2] = "PASSWORD";
    SceneType[SceneType["STORY"] = 3] = "STORY";
    SceneType[SceneType["MATCH"] = 4] = "MATCH";
    SceneType[SceneType["RESULT"] = 5] = "RESULT";
    SceneType[SceneType["CREDITS"] = 6] = "CREDITS";
})(SceneType || (exports.SceneType = SceneType = {}));
/** 默认/空白 PaletteEntry（全黑） */
exports.BLANK_PALETTE = {
    colors: [
        { r: 0, g: 0, b: 0, a: 255 },
        { r: 0, g: 0, b: 0, a: 255 },
        { r: 0, g: 0, b: 0, a: 255 },
        { r: 0, g: 0, b: 0, a: 255 },
    ],
};
/** 创建空白 PaletteTable */
function createBlankPaletteTable() {
    const blank = () => ({ colors: [...exports.BLANK_PALETTE.colors] });
    return {
        bgPalettes: [blank(), blank(), blank(), blank()],
        sprPalettes: [blank(), blank(), blank(), blank()],
    };
}
