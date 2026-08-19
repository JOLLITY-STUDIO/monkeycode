"use strict";
/**
 * 脚本数据加载器 — 按 ID 加载解析后的剧情脚本
 *
 * 数据按 bank 分割存储 (03-06 同属一套脚本系统, 见 $8AEC 映射表):
 *   - scripts-bank-03.ts: ID 0x00-0x0F (16 个, 标题/KICK OFF 剧情)
 *   - scripts-bank-04.ts: ID 0x10-0x1F (16 个, 中段剧情)
 *   - scripts-bank-05.ts: ID 0x20-0x5F (64 个, 比赛相关)
 *   - scripts-bank-06.ts: ID 0x60-0x65 (6 个入口块, 见 $A000 指针表)
 *     * 0x60 → $A00C 开场短块 | 0x61 → $A01B 开场短块
 *     * 0x62 → $A028 主流程 (469 条) | 0x63 → $A0E0 检查点 2
 *     * 0x64 → $A1A8 检查点 3 | 0x65 → $A2F2 检查点 4
 *     * 入口 2-5 为同一线性流程的不同切入点, 数据有重叠 (忠实还原 ROM)
 *
 * 数据由脚本自动生成, 禁止手改。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScriptData = getScriptData;
exports.getScriptsByBank = getScriptsByBank;
exports.getScriptCount = getScriptCount;
exports.getScriptCategories = getScriptCategories;
const scripts_bank_03_1 = require("../../data/scene/textscript/scripts-bank-03");
const scripts_bank_04_1 = require("../../data/scene/textscript/scripts-bank-04");
const scripts_bank_05_1 = require("../../data/scene/textscript/scripts-bank-05");
const scripts_bank_06_1 = require("../../data/scene/textscript/scripts-bank-06");
const script_opcodes_1 = require("./script-opcodes");
// ── 所有脚本数据 (按 bank 分组) ──
const ALL_SCRIPTS = {
    3: scripts_bank_03_1.SCRIPTS_BANK_03,
    4: scripts_bank_04_1.SCRIPTS_BANK_04,
    5: scripts_bank_05_1.SCRIPTS_BANK_05,
    6: scripts_bank_06_1.SCRIPTS_BANK_06,
};
// ── 脚本缓存 (按 ID 索引) ──
const scriptCache = new Map();
/**
 * 按脚本 ID 加载脚本数据
 * @param scriptId 脚本 ID (0x00-0xFE)
 * @returns 脚本数据, 如果不存在返回 undefined
 */
function getScriptData(scriptId) {
    if (scriptId < 0 || scriptId >= 0xFF)
        return undefined;
    if (scriptCache.has(scriptId)) {
        return scriptCache.get(scriptId);
    }
    const bank = (0, script_opcodes_1.getScriptBank)(scriptId);
    const scripts = ALL_SCRIPTS[bank];
    if (!scripts) {
        scriptCache.set(scriptId, undefined);
        return undefined;
    }
    const script = scripts.find(s => s.id === scriptId);
    scriptCache.set(scriptId, script);
    return script;
}
/**
 * 获取指定 bank 的所有脚本
 * @param bank bank 编号 (3-6)
 */
function getScriptsByBank(bank) {
    return ALL_SCRIPTS[bank] ?? [];
}
/**
 * 获取脚本总数
 */
function getScriptCount() {
    return Object.values(ALL_SCRIPTS).reduce((sum, scripts) => sum + scripts.length, 0);
}
/**
 * 获取脚本分类信息
 * @returns 每个 bank 的脚本范围和分类
 */
function getScriptCategories() {
    return [
        { bank: 3, range: '0x00-0x0F', count: scripts_bank_03_1.SCRIPTS_BANK_03.length, category: '标题/KICK OFF 剧情' },
        { bank: 4, range: '0x10-0x1F', count: scripts_bank_04_1.SCRIPTS_BANK_04.length, category: '中段剧情' },
        { bank: 5, range: '0x20-0x5F', count: scripts_bank_05_1.SCRIPTS_BANK_05.length, category: '比赛相关' },
        { bank: 6, range: '0x60-0x65', count: scripts_bank_06_1.SCRIPTS_BANK_06.length, category: '主流程剧情/对话 (6 入口块)' },
    ];
}
