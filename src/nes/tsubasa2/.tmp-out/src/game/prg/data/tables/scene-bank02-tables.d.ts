/**
 * scene-bank02-tables.ts — bank02 场景数据表（声明式表结构）
 *
 * 来源：PRG bank02（CPU $A000-$BFFF）逐字节提取（对照 src/asm/bank02/code_data.s / data_tables.s）
 * 原则：禁止 PRG_BANK_XX[addr] 裸地址访问；此处为唯一声明式数据入口。
 *
 * 表清单：
 *   SCENE15_AA97_TABLE       — 场景15 NT 填充记录表（CPU $AA97，3 字节/记录）
 *   SCENE16_A677_BLOB        — 场景16 复制到 RAM $03E8 的 0xFC 字节块（CPU $A677）
 *   SCENE16_A67B_BLOB        — 场景16 复制到 RAM $0460 的 0xFC 字节块（CPU $A67B）
 *   TILE_MAP_HIGH            — $88CA 高 tile（≥$A0）映射表（bank00 数据区，39 项）
 *   SCENE14_ROW_TEMPLATE     — $9085 行构建 32 字节模板（bank00 $978B）
 *   SCENE14_ROW_PTR_TABLE_B9 — $9085 行数据指针表（bank9 $A000，0x6D 项）
 *   SCENE14_ROW_PTR_TABLE_B10— $9085 行数据指针表（bank10 $A000，0x60 项）
 *   SCENE14_ROW_BLOCKS       — $9085 行数据块（key=指针地址；$9147 处理器消费）
 */
/** 场景15 NT 填充记录（3 字节：flag / addrLo / count） */
export interface Scene15NtRecord {
    /** 控制标志：bit7=结束（返回 hub）；bit6=写后等 2 帧；低 6 位参与 NT 地址高位 */
    readonly flag: number;
    /** NT 地址低字节 */
    readonly addrLo: number;
    /** 填充长度（实际长度 = count & $3F，$9B28 强制截断） */
    readonly count: number;
}
/**
 * SCENE15_AA97_TABLE — 场景15 逐行零填充 NT 记录（CPU $AA97 实证 24 条）。
 * PPU 地址 = (((ram_007B & 1) << 2) | (flag & $7F)) << 8 | addrLo，再 & $3FFF。
 */
export declare const SCENE15_AA97_TABLE: readonly Scene15NtRecord[];
/**
 * SCENE16_A677_BLOB — 场景16 $A767 复制源（CPU $A677，0xFC 字节 → RAM $03E8）。
 * 注：源为 bank02 代码段（code-as-data），逐字节提取，保持原值。
 */
export declare const SCENE16_A677_BLOB: readonly number[];
/**
 * SCENE16_A67B_BLOB — 场景16 分支2 复制源（CPU $A67B，0xFC 字节 → RAM $0460）。
 * 注：与 $A677 块同源偏移 4 字节，逐字节提取保持原值。
 */
export declare const SCENE16_A67B_BLOB: readonly number[];
/**
 * TILE_MAP_HIGH — $88CA 高 tile（≥$A0）映射表（bank00 数据区，39 项）。
 * 索引 = tile - $A0；Scene23 数字 tile（$33-$3C/$81-$86）< $A0 不走此表。
 */
export declare const TILE_MAP_HIGH: readonly number[];
/**
 * SCENE14_ROW_TEMPLATE — $9085 行构建 32 字节模板（bank00 CPU $978B，逐字节提取）。
 * 结构：[0]=flag(bit7=处理) [1]=计数器 [2:4]=行指针(u16) [4:6]/[6:8]=Y/X 偏移...
 */
export declare const SCENE14_ROW_TEMPLATE: readonly number[];
/**
 * SCENE14_ROW_PTR_TABLE_B9 — $9085 行数据指针表（PRG bank9 $A000-$A0D9，0x6D 项 u16）。
 * 索引 = 流索引 < $6D 时直接使用（如 Scene14 第二行 idx $23 → $A36B）。
 */
export declare const SCENE14_ROW_PTR_TABLE_B9: readonly number[];
/**
 * SCENE14_ROW_PTR_TABLE_B10 — $9085 行数据指针表（PRG bank10 $A000-$A0BF+，0x60 项 u16）。
 * 索引 = 流索引 ≥ $6D 时减去 $6D 后使用（如 Scene14 首行 idx $BD → rel $50 → $A6FA）。
 */
export declare const SCENE14_ROW_PTR_TABLE_B10: readonly number[];
/**
 * SCENE14_ROW_BLOCKS — $9085 行数据块（key = 指针 CPU 地址 hex；值为行数据字节流）。
 * 目前提取 Scene14 使用的两块：$A36B（bank9 idx $23）、$A6FA（bank10 idx $50）。
 * 流由 $9147 精灵场景处理器消费（控制码 $F1/$F7/$FF 家族，与 BANK19_TILE_DATA 同系）。
 * 其余索引块随对应场景翻译时再提取。
 */
export declare const SCENE14_ROW_BLOCKS: Readonly<Record<string, readonly number[]>>;
