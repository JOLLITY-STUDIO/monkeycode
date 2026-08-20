"use strict";
/**
 * 剧情脚本数据聚合导出
 *
 * 脚本按 bank 分割 (03-06 同属一套脚本系统, 见 $8AEC 映射表):
 *   - scripts-bank-03.ts: ID 0x00-0x0F (16 个, 标题/KICK OFF 剧情)
 *   - scripts-bank-04.ts: ID 0x10-0x1F (16 个, 中段剧情)
 *   - scripts-bank-05.ts: ID 0x20-0x5F (64 个, 比赛相关)
 *   - scripts-bank-06.ts: ID 0x60-0x65 (6 个入口块)
 *
 * 数据由 generate_script_data.cjs 自动生成, 禁止手改。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_SCRIPTS = exports.SCRIPT_ID_BANK = exports.SCRIPTS_BANK_06 = exports.SCRIPTS_BANK_05 = exports.SCRIPTS_BANK_04 = exports.SCRIPTS_BANK_03 = void 0;
exports.getScriptById = getScriptById;
exports.getScriptsByBank = getScriptsByBank;
const scripts_bank_03_1 = require("./scripts-bank-03");
Object.defineProperty(exports, "SCRIPTS_BANK_03", { enumerable: true, get: function () { return scripts_bank_03_1.SCRIPTS_BANK_03; } });
const scripts_bank_04_1 = require("./scripts-bank-04");
Object.defineProperty(exports, "SCRIPTS_BANK_04", { enumerable: true, get: function () { return scripts_bank_04_1.SCRIPTS_BANK_04; } });
const scripts_bank_05_1 = require("./scripts-bank-05");
Object.defineProperty(exports, "SCRIPTS_BANK_05", { enumerable: true, get: function () { return scripts_bank_05_1.SCRIPTS_BANK_05; } });
const scripts_bank_06_1 = require("./scripts-bank-06");
Object.defineProperty(exports, "SCRIPTS_BANK_06", { enumerable: true, get: function () { return scripts_bank_06_1.SCRIPTS_BANK_06; } });
/** 脚本 ID → 所在 bank 的映射表 (ID 0x00-0x5F 属于 bank03-05, 0x60-0x65 属于 bank06) */
exports.SCRIPT_ID_BANK = (() => {
    const m = {};
    for (const bank of [3, 4, 5, 6]) {
        const list = getScriptsForBank(bank);
        for (const s of list) {
            if (typeof s.id === 'number') {
                m[s.id] = bank;
            }
        }
    }
    return m;
})();
function getScriptsForBank(bank) {
    switch (bank) {
        case 3: return scripts_bank_03_1.SCRIPTS_BANK_03;
        case 4: return scripts_bank_04_1.SCRIPTS_BANK_04;
        case 5: return scripts_bank_05_1.SCRIPTS_BANK_05;
        case 6: return scripts_bank_06_1.SCRIPTS_BANK_06;
        default: return [];
    }
}
/** 所有脚本 (按 bank 分组, 3-6) */
exports.ALL_SCRIPTS = {
    3: scripts_bank_03_1.SCRIPTS_BANK_03,
    4: scripts_bank_04_1.SCRIPTS_BANK_04,
    5: scripts_bank_05_1.SCRIPTS_BANK_05,
    6: scripts_bank_06_1.SCRIPTS_BANK_06,
};
/**
 * 按脚本 ID 查找脚本数据。
 * @param id 脚本 ID (0x00-0xFE)
 * @returns 脚本条目或 undefined
 */
function getScriptById(id) {
    const bank = exports.SCRIPT_ID_BANK[id];
    if (bank === undefined)
        return undefined;
    const list = exports.ALL_SCRIPTS[bank];
    return list.find((s) => s.id === id);
}
/**
 * 获取指定 bank 的所有脚本。
 * @param bank bank 编号 (3-6)
 */
function getScriptsByBank(bank) {
    return exports.ALL_SCRIPTS[bank] ?? [];
}
