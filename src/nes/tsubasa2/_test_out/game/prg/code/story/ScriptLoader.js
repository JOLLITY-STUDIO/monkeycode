"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptLoader = void 0;
exports.getScriptData = getScriptData;
exports.initScriptLoader = initScriptLoader;
const script_id_table_1 = require("../../data/tables/script-id-table");
const scripts_bank_03_1 = require("../../data/scene/textscript/scripts-bank-03");
const scripts_bank_04_1 = require("../../data/scene/textscript/scripts-bank-04");
const scripts_bank_05_1 = require("../../data/scene/textscript/scripts-bank-05");
const scripts_bank_06_1 = require("../../data/scene/textscript/scripts-bank-06");
/** bank 编号 → bank03-06 数据文件原始字节 */
function bankBytes(bank) {
    switch (bank) {
        case 3: return scripts_bank_03_1.SCRIPT_BANK_03_BYTES;
        case 4: return scripts_bank_04_1.SCRIPT_BANK_04_BYTES;
        case 5: return scripts_bank_05_1.SCRIPT_BANK_05_BYTES;
        case 6: return scripts_bank_06_1.SCRIPT_BANK_06_BYTES;
        default: return [];
    }
}
/**
 * 读取脚本 id 的入口数据。
 * 脚本流字节来自 bank03-06 数据文件 (scripts-bank-0X.ts 的 SCRIPT_BANK_0X_BYTES)。
 * 入口指针表: bank 内 CPU $A000 起 offset*2 → 16-bit 绝对指针 → 脚本流。
 * 返回 { bank, 脚本流 }。
 */
function getScriptData(store, scriptId) {
    void store;
    const entry = (0, script_id_table_1.scriptIdLookup)(scriptId);
    if (!entry)
        return undefined;
    const bankData = bankBytes(entry.bank);
    if (bankData.length === 0)
        return undefined;
    const entryLo = bankData[entry.offset * 2];
    const entryHi = bankData[entry.offset * 2 + 1];
    if (entryHi === undefined)
        return undefined;
    const absPtr = (entryHi << 8) | entryLo;
    // 绝对 CPU 指针 → bank 数组内偏移 (CPU $A000 基址)
    const ptr = absPtr - 0xa000;
    if (ptr < 0 || ptr >= bankData.length)
        return undefined;
    // 脚本流起始在 bankData[ptr..]
    const stream = bankData.slice(ptr);
    return { bank: entry.bank, data: stream };
}
class ScriptLoader {
    /** 脚本 id → bank 判定 (<0x10→3 / <0x20→4 / <0x60→5 / else→6) */
    static getScriptBank(scriptId) {
        const id = scriptId & 0xff;
        if (id < 0x10)
            return 3;
        if (id < 0x20)
            return 4;
        if (id < 0x60)
            return 5;
        return 6;
    }
    /**
     * 装载脚本 id (原 $8464 scriptLoader)。
     * 结果写入 store:
     *   ram_0056 = 脚本 bank
     *   ram_00ED = 原 bank ($0025)
     *   ram_004D/004E = 脚本流指针
     *   ram_000D/000E = 0
     *   ram_0652 = 0
     */
    static load(store, scriptId) {
        const entry = (0, script_id_table_1.scriptIdLookup)(scriptId);
        if (!entry)
            return 0;
        const data = getScriptData(store, scriptId);
        if (!data)
            return 0;
        const bank = entry.bank;
        // $847F STX $0056 → ram_0056 = bank
        store.write('ram_0056', bank);
        // $8481-$8483: ram_00ED = ram_0025 (当前 bank)
        store.write('ram_00ED', store.read('ram_0025'));
        // 指针 = $A000 + offset*2
        const ptr = 0xa000 + entry.offset * 2;
        // 读入口指针 (脚本流起始) → ram_004D/004E
        const streamLo = data.data[0] ?? 0;
        const streamHi = data.data[1] ?? 0;
        store.write('ram_004D', streamLo);
        store.write('ram_004E', streamHi);
        // 脚本流偏移位置 (由 ScriptEngine 维护, 存 ram_0057)
        store.write('ram_0057', (ptr & 0xff));
        // $84A5-$84AD: 清脚本状态
        store.write('ram_000D', 0);
        store.write('ram_000E', 0);
        store.write('ram_0652', 0);
        // ppuFill 属性区 ($23E0, 0x20 列 × 1 行, 值 $55) — 由 system 完成
        return bank;
    }
}
exports.ScriptLoader = ScriptLoader;
function initScriptLoader(_store) {
    // 注册脚本加载器 (无额外初始化)
}
exports.default = ScriptLoader;
