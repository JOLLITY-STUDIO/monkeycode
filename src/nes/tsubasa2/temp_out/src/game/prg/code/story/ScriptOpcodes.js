"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptOpcode = void 0;
exports.initScriptOpcodes = initScriptOpcodes;
/**
 * ScriptOpcodes — 剧情脚本操作码定义（原 bank00 脚本 opcode 表）
 *
 * @bank 00（脚本 VM 指令集）
 *
 * opcode 数值在 V0.4 从 asm/bank00 脚本解释器提取，禁止臆造。
 * 以下枚举仅为契约占位，数值待提取后覆盖。
 */
var ScriptOpcode;
(function (ScriptOpcode) {
    // TODO V0.4: 从脚本解释器提取真实 opcode 数值
    ScriptOpcode[ScriptOpcode["Nop"] = 0] = "Nop";
    ScriptOpcode[ScriptOpcode["Text"] = 1] = "Text";
    ScriptOpcode[ScriptOpcode["WaitFrames"] = 2] = "WaitFrames";
    ScriptOpcode[ScriptOpcode["WaitInput"] = 3] = "WaitInput";
    ScriptOpcode[ScriptOpcode["Jump"] = 4] = "Jump";
    ScriptOpcode[ScriptOpcode["Branch"] = 5] = "Branch";
    ScriptOpcode[ScriptOpcode["Call"] = 6] = "Call";
    ScriptOpcode[ScriptOpcode["Return"] = 7] = "Return";
    ScriptOpcode[ScriptOpcode["End"] = 255] = "End";
})(ScriptOpcode || (exports.ScriptOpcode = ScriptOpcode = {}));
/** 初始化 opcode 表（V0.4 后改为从数据表加载真实映射） */
function initScriptOpcodes() {
    // TODO V0.4: 从 asm 提取 opcode → handler 映射
}
