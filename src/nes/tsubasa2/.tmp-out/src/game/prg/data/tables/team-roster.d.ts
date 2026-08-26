/**
 * team-roster.ts — 队伍名单 (合并 meta + PRG byte data)
 *
 * ## PRG bank 数据布局真相 (2026-08-25 验证)
 *
 * 项目用 MMC3 mapper, PRG bank 切换用 R6/R7 寄存器分别映射到
 * $8000-$9FFF (R6) 和 $A000-$BFFF (R7)。Team 数据分布在 2 个 PRG bank:
 *
 * ### 玩家控制 4 队 — PRG bank 2 (R7 = 2)
 *
 * - CPU $AA47 → PRG[0x4A47]  SaoPaulo       11 ID stride 11
 * - CPU $AA53 → PRG[0x4A53]  Nankatsu       11 ID
 * - CPU $AA5F → PRG[0x4A5F]  AsianCup       11 ID
 * - CPU $AA6A → PRG[0x4A6A]  BenchReserve   11 ID
 *
 * ### CPU 对手 23 队 — PRG bank 29 (R7 = 29)
 *
 * - CPU $BB0A → PRG[0x3BB0A]  team[ 0] Flu              (含 Riverio+Satilst+DaSilva+Meon GK 明星)
 * - CPU $BB20 → PRG[0x3BB20]  team[ 1] Cor
 * - CPU $BB36 → PRG[0x3BB36]  team[ 2] Gre
 * - ...
 * - CPU $BCEE → PRG[0x3BCEE]  team[22] Brazil Final 2nd Half (含 Coinbra 0x75 swap)
 *
 * **Strides:**
 * - Player teams:  **stride 11 sequential** (11 ID/队, 无战术字节)
 * - CPU opponents: **stride 22 sequential** (11 ID × 字节, + 11 padding/可选战术)
 *
 * ### 文件来源
 *
 * ⚠ **不是从 asm 翻译**: `bank02/_full.s` (ca65 反汇编) 只能看到**执行流** (.byte 段是指令片段),
 *   没有完整 CPU team roster .byte 表的 label; bank02/data_tables.s 是 NT/字体编码 + $FF 填充,
 *   无 roster 表。team data 只存在于 PRG 二进制字节中。
 *
 * ⚠ **不是从 PRG file 读**: 这是 TypeScript 翻译产物,**最终 H5 bundle 不依赖 ROM/nes 文件**。
 *   byte 数组一次手动提取后即固化,后续不会再改。
 *
 * ### Anchor 验证 (4 doc anchor 全部命中 ✓)
 *
 * doc `CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt` 写的是 **ROM file offset**
 * (file_off = PRG_index + 16):
 *
 * | doc 标的内容 | doc file offset | PRG index | 命中 byte | 球员 |
 * |---|---|---|---|---|
 * | Cor Pos10 | `03BB1A` | `0x3BB0A` | `0x24` | Riverio ✓ |
 * | Cor Pos9  | `03BB1C` | `0x3BB0C` | `0x23` | Satilst ✓ |
 * | Gre Pos1  | `03BB2A` | `0x3BB1A` | `0x26` | Meon GK ✓ |
 * | Gre Pos9  | `03BB28` | `0x3BB18` | `0x25` | DaSilva ✓ |
 *
 * 全部 4 anchor 都在 team[0] BrazilFlu 22-byte 段内 (byte 0/2/14/16 = 12,15,18,21 PRG offsets),
 * 说明 doc 编辑员认为这些是 Brazil star pool 的全局位置。
 */
/** 阵容（11 球员 ID + 阵型 + 战术 + 替补 ID + 关号） */
export interface TeamRosterEntry {
    readonly id: number;
    readonly name: string;
    readonly type: 'player' | 'cpu' | 'bench';
    readonly players: ReadonlyArray<number>;
    readonly subs: ReadonlyArray<number>;
    readonly formation: string;
    readonly tactic: string;
    /** 剧情关号 (1-33); 数组表示同一队可能出现在多个关 */
    readonly encounterLevels: ReadonlyArray<number>;
    /** 备用阵容 (变阵/替换, 含 Coinbra 超级密码阵容等) */
    readonly altLineups?: ReadonlyArray<ReadonlyArray<number>>;
    /** 那些 PRG byte 经 doc anchor 交叉验证 (true = 真实可靠) */
    readonly anchorVerified: boolean;
}
export declare const TEAM_ROSTER_TABLE: ReadonlyArray<TeamRosterEntry>;
/** 按 ID 找队伍 */
export declare function findRosterById(id: number): TeamRosterEntry | null;
/** 按关号找该关对手 (第一支) */
export declare function findByEncounterLevel(level: number): TeamRosterEntry | null;
/** 兼容 team-table.ts 的别名 */
export declare const TEAM_TABLE: ReadonlyArray<TeamRosterEntry>;
