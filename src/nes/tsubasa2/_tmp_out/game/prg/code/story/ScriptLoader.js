"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptLoader = void 0;
exports.getScriptData = getScriptData;
exports.initScriptLoader = initScriptLoader;
const script_id_table_1 = require("../../data/tables/script-id-table");
const index_1 = require("../../data/scene/textscript/index");
/**
 * 读取脚本 id 的入口数据。
 * 脚本流来自 bank03-06 场景段数据 (SCRIPTS_BANK_0X), 按 id 查询后 flatten 为字节流。
 * 不再使用原始字节 _BYTES, 直接用结构化场景段。
 */
function getScriptData(store, scriptId) {
    void store;
    const entry = (0, script_id_table_1.scriptIdLookup)(scriptId);
    if (!entry)
        return undefined;
    const scenes = (0, index_1.getScriptScenes)(scriptId);
    if (!scenes || scenes.length === 0)
        return undefined;
    // 场景段 flatten 为字节流
    const data = [];
    for (const scene of scenes) {
        for (const b of scene)
            data.push(b);
    }
    return { bank: entry.bank, data };
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
     *   ram_004D/004E = 脚本流指针 (从0开始, 指向 flatten 场景段字节流)
     *   ram_000D/000E = 0
     *   ram_0652 = 0
     *   ram_0057 = 脚本流长度低字节 (供 ScriptEngine 判断结束)
     */
    static load(store, scriptId) {
        const entry = (0, script_id_table_1.scriptIdLookup)(scriptId);
        if (!entry)
            return 0;
        const data = getScriptData(store, scriptId);
        if (!data)
            return 0;
        const bank = entry.bank;
        store.write('ram_0056', bank);
        store.write('ram_00ED', store.read('ram_0025'));
        // 脚本流指针从 0 开始 (data.data 已是 flatten 场景段字节流, 无入口指针表)
        store.write('ram_004D', 0);
        store.write('ram_004E', 0);
        // 脚本流存入 DataStore 缓存 (ScriptEngine 按 ram_0056 读)
        store.set(`scriptStream_${bank}`, data.data);
        store.write('ram_0057', data.data.length & 0xff);
        store.write('ram_000D', 0);
        store.write('ram_000E', 0);
        store.write('ram_0652', 0);
        return bank;
    }
}
exports.ScriptLoader = ScriptLoader;
function initScriptLoader(_store) {
    // 注册脚本加载器 (无额外初始化)
}
exports.default = ScriptLoader;
