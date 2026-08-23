/**
 * textscript/index.ts — bank03-06 剧情脚本数据汇总出口
 *
 * 4 个 bank 全部按场景段拆分格式: SCRIPTS_BANK_0X (场景段数组的数组)。
 * bank06 额外导出调色板 (PALETTE_BG_06 / PALETTE_SPR_06), 因 bank06 是混合 bank (脚本+调色板)。
 *
 * 脚本 id 区间: <0x10→bank3 (16个) / <0x20→bank4 (16个) / <0x60→bank5 (64个) / <0x66→bank6 (6个)。
 * 注意: bank06 只有 6 个脚本 (id 0x60-0x65), 不是 0x60-0xFE。
 */
export { SCRIPTS_BANK_03 } from './scripts-bank-03';
export { SCRIPTS_BANK_04 } from './scripts-bank-04';
export { SCRIPTS_BANK_05 } from './scripts-bank-05';
export { SCRIPTS_BANK_06 } from './scripts-bank-06';
export { PALETTE_BG_06, PALETTE_SPR_06 } from '../../tables/bank06-palette';
/**
 * 按脚本 id 查询场景段列表 (0x00-0x65)。
 * 返回 readonly (readonly number[])[] = 该脚本的场景段数组, 每段一个 readonly number[]。
 * 规则: <0x10→bank3 / <0x20→bank4 / <0x60→bank5 / <0x66→bank6。
 */
export declare function getScriptScenes(id: number): readonly (readonly number[])[] | undefined;
