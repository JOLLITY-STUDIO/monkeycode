/**
 * 脚本 ID 表 $8AEC — 脚本 id → (脚本 bank, 区内偏移)
 *
 * 原始表 ($8AEE 起为阈值, $8AEF 起为 bank):
 *   scriptId < 0x10 (16) → bank 3, 区内偏移 = scriptId - 0    (bank3 有 16 个脚本, 全部有效)
 *   scriptId < 0x20 (32) → bank 4, 区内偏移 = scriptId - 16   (bank4 有 16 个脚本, 全部有效)
 *   scriptId < 0x60 (96) → bank 5, 区内偏移 = scriptId - 32   (bank5 有 64 个脚本, 全部有效)
 *   scriptId < 0xFF      → bank 6, 区内偏移 = scriptId - 96   (bank6 只有 6 个有效脚本 0x60-0x65!)
 *
 * 注意: bank06 是混合 bank (脚本+调色板), 入口指针表只有 6 项 (id 0x60-0x65)。
 *       id 0x66-0xFE 虽然映射到 bank6, 但入口表无对应项, getScriptData 会返回 undefined (安全失败)。
 *       游戏本身不会调用 id > 0x65 的脚本。
 *
 * 与 $8464 scriptLoader 逻辑一致。
 */
export interface ScriptIdEntry {
    /** 脚本所在 bank (3-6) */
    bank: number;
    /** 区内偏移 (进入该 bank $A000 指针表的下标*2) */
    offset: number;
}
/** 脚本 id → (bank, 偏移) 映射 */
export declare function scriptIdLookup(scriptId: number): ScriptIdEntry | undefined;
/** 脚本 id → 判定 bank (<0x10→3 / <0x20→4 / <0x60→5 / else→6) */
export declare function scriptIdToBank(scriptId: number): number;
