"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const skill_table_1 = require("../../data/tables/skill-table");
class SkillService {
    constructor(store) {
        this._store = store;
    }
    /**
     * 必杀技 ID 查询 (原 byMoveId)。
     *
     * asm: data_tables.s $89BF 明星必杀 ROM 地址表。
     * 以 moveId 索引地址表, 返回该必杀技动作脚本的起始地址。
     * 超出表范围或无 (0xFFFF) 时 scriptPtr 为 0xFFFF。
     */
    getMove(moveId) {
        const scriptPtr = (0, skill_table_1.getMovePtr)(moveId);
        return { moveId, scriptPtr };
    }
    /**
     * 角色必杀技分配 — 取某角色 7 个必杀槽位
     * (Shot/Pass/Dribble/1-2/Block/Tackle/PassCut)。
     *
     * asm: data_tables.s $8F00+ 区角色必杀表 (每人 7 项×2B)。
     * 未提取完成时返回 null。
     */
    getCharacterSkills(charIndex) {
        return (0, skill_table_1.getCharacterSkills)(charIndex);
    }
}
exports.SkillService = SkillService;
exports.default = SkillService;
