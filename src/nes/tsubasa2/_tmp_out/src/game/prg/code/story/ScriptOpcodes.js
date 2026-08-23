"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptOpcodes = exports.SubOp = exports.ScriptOp = exports.LONG_OPCODE_TABLE_ABS = exports.WAIT_FRAME_TABLE = exports.LONG_OPCODE_BASE = exports.CHAR_MAX = void 0;
exports.initScriptOpcodes = initScriptOpcodes;
const bank00_tables_1 = require("../../data/tables/bank00-tables");
/** 普通字符上限 */
exports.CHAR_MAX = 0xd8;
/** 长指令起始 */
exports.LONG_OPCODE_BASE = 0xe8;
/** 等待帧表 $8AE6 (指令码 $D8-$DF) */
exports.WAIT_FRAME_TABLE = bank00_tables_1.WAIT_FRAME_TABLE;
/** 长指令表 $8545 (指令码 $E8-$FF → 处理器地址) */
exports.LONG_OPCODE_TABLE_ABS = bank00_tables_1.LONG_OPCODE_TABLE;
/** 脚本长指令枚举 */
var ScriptOp;
(function (ScriptOp) {
    ScriptOp[ScriptOp["OpTableLoad"] = 232] = "OpTableLoad";
    ScriptOp[ScriptOp["OpFadeIn"] = 233] = "OpFadeIn";
    ScriptOp[ScriptOp["OpFadeOutClear"] = 234] = "OpFadeOutClear";
    ScriptOp[ScriptOp["OpAnimSeq"] = 235] = "OpAnimSeq";
    ScriptOp[ScriptOp["OpTextSeq"] = 236] = "OpTextSeq";
    ScriptOp[ScriptOp["OpFindSlot"] = 237] = "OpFindSlot";
    ScriptOp[ScriptOp["OpClearText"] = 238] = "OpClearText";
    ScriptOp[ScriptOp["OpSpriteFlip"] = 239] = "OpSpriteFlip";
    ScriptOp[ScriptOp["OpTextPos"] = 240] = "OpTextPos";
    ScriptOp[ScriptOp["OpTextPtr"] = 241] = "OpTextPtr";
    ScriptOp[ScriptOp["OpLineLen"] = 242] = "OpLineLen";
    ScriptOp[ScriptOp["OpPalette"] = 243] = "OpPalette";
    ScriptOp[ScriptOp["OpSubDispatch"] = 244] = "OpSubDispatch";
    ScriptOp[ScriptOp["OpSetPtr"] = 245] = "OpSetPtr";
    ScriptOp[ScriptOp["OpWaitAnim"] = 246] = "OpWaitAnim";
    ScriptOp[ScriptOp["OpToggle"] = 247] = "OpToggle";
    ScriptOp[ScriptOp["OpExternal"] = 248] = "OpExternal";
    ScriptOp[ScriptOp["OpFlagBit"] = 249] = "OpFlagBit";
    ScriptOp[ScriptOp["OpSceneLoad"] = 250] = "OpSceneLoad";
    ScriptOp[ScriptOp["OpClearBuf"] = 251] = "OpClearBuf";
    ScriptOp[ScriptOp["OpVramAdvance"] = 252] = "OpVramAdvance";
    ScriptOp[ScriptOp["OpFillWait"] = 253] = "OpFillWait";
    ScriptOp[ScriptOp["OpJump"] = 254] = "OpJump";
    ScriptOp[ScriptOp["OpEnd"] = 255] = "OpEnd";
})(ScriptOp || (exports.ScriptOp = ScriptOp = {}));
/** 子指令表 $86C6 (OpSubDispatch 操作码) */
var SubOp;
(function (SubOp) {
    SubOp[SubOp["SubFadeInBg"] = 0] = "SubFadeInBg";
    SubOp[SubOp["SubFadeInSpr"] = 1] = "SubFadeInSpr";
    SubOp[SubOp["SubWaitA"] = 2] = "SubWaitA";
    SubOp[SubOp["SubWaitB"] = 3] = "SubWaitB";
    SubOp[SubOp["SubPalAnim"] = 4] = "SubPalAnim";
    SubOp[SubOp["SubPalAnimRev"] = 5] = "SubPalAnimRev";
    SubOp[SubOp["SubClearSprites"] = 6] = "SubClearSprites";
})(SubOp || (exports.SubOp = SubOp = {}));
class ScriptOpcodes {
    /** 注册指令处理器 */
    static init(_store) {
        // 处理器注册由 ScriptEngine 实现 (见 handler* 方法)
    }
}
exports.ScriptOpcodes = ScriptOpcodes;
/** 指令码 → 处理器地址 */
ScriptOpcodes.OPCODES = {
    [ScriptOp.OpTableLoad]: 'handleTableLoad',
    [ScriptOp.OpFadeIn]: 'handleFadeIn',
    [ScriptOp.OpFadeOutClear]: 'handleFadeOutClear',
    [ScriptOp.OpAnimSeq]: 'handleAnimSeq',
    [ScriptOp.OpTextSeq]: 'handleTextSeq',
    [ScriptOp.OpFindSlot]: 'handleFindSlot',
    [ScriptOp.OpClearText]: 'handleClearText',
    [ScriptOp.OpSpriteFlip]: 'handleSpriteFlip',
    [ScriptOp.OpTextPos]: 'handleTextPos',
    [ScriptOp.OpTextPtr]: 'handleTextPtr',
    [ScriptOp.OpLineLen]: 'handleLineLen',
    [ScriptOp.OpPalette]: 'handlePalette',
    [ScriptOp.OpSubDispatch]: 'handleSubDispatch',
    [ScriptOp.OpSetPtr]: 'handleSetPtr',
    [ScriptOp.OpWaitAnim]: 'handleWaitAnim',
    [ScriptOp.OpToggle]: 'handleToggle',
    [ScriptOp.OpExternal]: 'handleExternal',
    [ScriptOp.OpFlagBit]: 'handleFlagBit',
    [ScriptOp.OpSceneLoad]: 'handleSceneLoad',
    [ScriptOp.OpClearBuf]: 'handleClearBuf',
    [ScriptOp.OpVramAdvance]: 'handleVramAdvance',
    [ScriptOp.OpFillWait]: 'handleFillWait',
    [ScriptOp.OpJump]: 'handleJump',
    [ScriptOp.OpEnd]: 'handleEnd',
};
function initScriptOpcodes(_store) {
    ScriptOpcodes.init(_store);
}
exports.default = ScriptOpcodes;
