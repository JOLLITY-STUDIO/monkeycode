/**
 * ScriptLoader — 脚本数据装载器
 * @bank 00 (脚本 ID 表 $8AEC → bank03-06 文本脚本)
 *
 * 职责: 脚本 id → bank 判定 (3/4/5/6) → 入口指针解析 → 指令流。
 *
 * 原 $8464 scriptLoader 流程:
 *   1. 查 $8AEC 脚本 ID 表, 得 (bank, 区内偏移)
 *   2. 指针 = $A000 + offset*2 (bank 内入口指针表)
 *   3. 读该入口 16-bit 指针 → ram_004D/004E (脚本流起始)
 *   4. 挂调度器栈帧 (dataWriteHelper), 清脚本状态
 *   5. ppuFill 属性区, 切回原 bank
 *
 * 命名规范: 旧名 script-data-loader → 新名 ScriptLoader。
 */
import type { DataStore } from '../../data/store/DataStore';
export interface ScriptData {
    bank: number;
    data: readonly number[];
}
/**
 * 读取脚本 id 的入口数据。
 * 脚本流来自 bank03-06 场景段数据 (SCRIPTS_BANK_0X), 按 id 查询后 flatten 为字节流。
 * 不再使用原始字节 _BYTES, 直接用结构化场景段。
 */
export declare function getScriptData(store: DataStore, scriptId: number): ScriptData | undefined;
export declare class ScriptLoader {
    /** 脚本 id → bank 判定 (<0x10→3 / <0x20→4 / <0x60→5 / else→6) */
    static getScriptBank(scriptId: number): number;
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
    static load(store: DataStore, scriptId: number): number;
}
export declare function initScriptLoader(_store: DataStore): void;
export default ScriptLoader;
