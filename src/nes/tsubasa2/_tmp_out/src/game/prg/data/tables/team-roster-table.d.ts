/**
 * team-roster-table.ts — bank29 球队名单/阵型数据表 (声明式数组)
 * @bank 29 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 29)
 *
 * bank29 纯数据 bank:
 *   ROSTER_DATA_29 全 8192B; 偏移结构:
 *     0x0000- 球队球员 ID 序列 (每队一组, 组内以 0x00 分隔, 见 TEAM_PTR)
 *   TeamRosterService 通过具名访问器按需取用。
 */
/** bank29 全字节 (8192B) */
export declare const ROSTER_DATA_29: readonly number[];
