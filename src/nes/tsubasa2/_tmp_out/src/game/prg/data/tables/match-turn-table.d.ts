/**
 * match-turn-table.ts — bank11 比赛回合数据表 (声明式数组)
 * @bank 11 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 11)
 *
 * 说明: 数据由 node 脚本从原始 .nes 提取 (ROM 偏移 = 0x10 + 11*0x2000 = 0x16010)。
 * 服务层 (MatchTurnService) 只能通过本模块具名查询函数访问, 禁止裸地址随机访问。
 *
 * 表结构:
 *   TABLE_A_81AA      脚本道具 handler 跳转表 (9 × u16 LE)
 *   TABLE_B_81C6      脚本控制码 handler 跳转表 (3 × u16 LE)
 *   DISP_81D5         位移表 (120B, $81D5)
 *   DISP_827F         位移表 (120B, $827F)
 *   T_UNIT_TILE_86EE  tile→单位 tile 表 (512B, $86EE, tile*2 索引)
 *   SCRIPT_PTR_87F6   脚本指针表 (u16 LE, $87F6)
 *   PALETTE_ATTR_8B42 调色板组 attr 表 (34B, $8B42)
 *   BLOCK_8B64        block 表基址 ($8B64, tile>>3 索引块, 每块 $100B, 环绕覆盖全 bank)
 *   PATTERN_ATTR_9BE4 图案属性表基址 ($9BE4 + ca*$100)
 */
/** 表A $81AA — 脚本道具 handler (9 × u16 LE): 8327/83E7/83FF/8358/8377/8364/83D2/83E7/83EE */
export declare const TABLE_A_81AA: readonly number[];
/** 表B $81C6 — 脚本控制码 handler (3 × u16 LE): 81CC/8276/824D */
export declare const TABLE_B_81C6: readonly number[];
/** 位移表 $81D5 (120B) */
export declare const DISP_81D5: readonly number[];
/** 位移表 $827F (120B) */
export declare const DISP_827F: readonly number[];
/** tile→单位 tile 表 $86EE (512B, tile*2 索引 u16) */
export declare const T_UNIT_TILE_86EE: readonly number[];
/** 调色板组 attr 表 $8B42 (34B) */
export declare const PALETTE_ATTR_8B42: readonly number[];
/** 脚本指针表 $87F6 (844B = 422 × u16 LE, 至 $8B42 前) */
export declare const SCRIPT_PTR_87F6: readonly number[];
/** bank11 全字节 (8192B) — block 表环绕覆盖 + 脚本流数据源 */
export declare const MATCH_TURN_DATA: readonly number[];
/** 读 bank11 原始字节 (CPU 地址 $8000-$9FFF; ≥$A000 按旧语义减 0xA000) */
export declare function matchTurnByte(cpuAddr: number): number;
/** 读 16bit 小端 (CPU 地址) */
export declare function matchTurnU16(cpuAddr: number): number;
/** 表A 脚本道具 handler 入口 ($81AA, idx 0-8) */
export declare function tableAAt(idx: number): number;
/** 表B 脚本控制码 handler 入口 ($81C6, idx 0-2) */
export declare function tableBAt(idx: number): number;
/** 位移表 $81D5 (entry_81CC/81CF) */
export declare function disp81D5At(idx: number): number;
/** 位移表 $827F (entry_8276/827C) */
export declare function disp827FAt(idx: number): number;
/** T_UNIT_TILE $86EE — tile*2 索引 u16 (fn_8525) */
export declare function tUnitTileAt(tile: number): number;
/** 脚本指针表 $87F6 — ram_0524 索引 u16 (entry_814C) */
export declare function scriptPtrAt(idx: number): number;
/** 调色板组 attr $8B42 — Y = A>>2 索引 (fn_86D3) */
export declare function paletteAttrAt(y: number): number;
/** block 表 $8B64 — tile>>3 索引块, tile&7 块内行偏移, 后接位置偏移 off (环绕全 bank) */
export declare function blockByteAt(tile: number, off: number): number;
/** 图案属性表 $9BE4 + ca*$100 — tile 索引 (fn_85C2) */
export declare function patternAttrAt(ca: number, tile: number): number;
