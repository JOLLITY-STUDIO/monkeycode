"use strict";
/**
 * 升级数据表 — 具象化契约（v2 重构完成）
 *
 * 数据来源（从真 ROM 提取）：
 *   - 真实体力显示 (16-bit LE 30 项)        ROM 0x39F1E
 *   - 真实能力显示 (byte 30 项)              ROM 0x39E5E
 *
 * 翻译原则：
 *   - LEVEL_UP_TABLE 声明式具象化条目（已从真 ROM 提取填充）
 *   - 禁止 lo/hi 拆字节拼 16-bit，禁止暴露 CPU 地址
 *   - 业务查找走 findLevelByExp / findLevelById
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL_UP_TABLE = void 0;
exports.findLevelByExp = findLevelByExp;
exports.findLevelById = findLevelById;
const levelup_data_1 = require("./levelup-data");
/** 升级表（已从真 ROM 提取） */
exports.LEVEL_UP_TABLE = levelup_data_1.LEVEL_UP_TABLE;
/** 按累计经验查询等级 */
function findLevelByExp(exp) {
    const target = Math.max(0, exp | 0);
    let level = 1;
    for (const e of exports.LEVEL_UP_TABLE) {
        if (target >= e.expRequired)
            level = e.level;
        else
            break;
    }
    return level;
}
/** 按等级查询该等级 entry */
function findLevelById(level) {
    for (const e of exports.LEVEL_UP_TABLE) {
        if (e.level === (level & 0xff))
            return e;
    }
    return null;
}
