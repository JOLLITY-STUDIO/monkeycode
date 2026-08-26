/**
 * roster-prg-bytes.ts — Player + CPU 队 11 ID PRG byte 数据 (TypeScript 翻译产物)
 *
 * ## PRG bank 数据布局真相 (2026-08-25 验证)
 *
 * MMC3 mapper 用 R6/R7 寄存器切 PRG bank:
 * - R6 控制 CPU $8000-$9FFF
 * - R7 控制 CPU $A000-$BFFF
 * - $C000-$DFFF + $E000-$FFFF 是 fixed bank (last 16KB)
 *
 * ### 玩家控制 4 队 (R7 = bank 2)
 *
 * CPU 地址    | PRG index | 队
 * -----------|-----------|------
 * $AA47      | 0x4A47    | SaoPaulo 11 ID (0x02..0x0B)
 * $AA53      | 0x4A53    | Nankatsu 11 ID
 * $AA5F      | 0x4A5F    | AsianCup 11 ID
 * $AA6A      | 0x4A6A    | BenchReserve 11 ID
 *
 * Stride: 11 bytes/team (无战术字节)
 *
 * ### CPU 对手 23 队 (R7 = bank 29)
 *
 * CPU 地址    | PRG index   | 队
 * -----------|-------------|------
 * $BB0A      | 0x3BB0A     | team[0]  BrazilFlu (含 Riverio+Satilst+DaSilva+Meon 明星)
 * $BB20      | 0x3BB20     | team[1]  BrazilCor
 * $BB36      | 0x3BB36     | team[2]  BrazilGre
 * $BB4C      | 0x3BB4C     | team[3]  BrazilPal
 * $BB62      | 0x3BB62     | team[4]  BrazilSan
 * $BB78      | 0x3BB78     | team[5]  BrazilFla
 * $BB8E      | 0x3BB8E     | team[6]  Kunimi
 * $BBA4      | 0x3BBA4     | team[7]  Akita
 * $BBBA      | 0x3BBBA     | team[8]  Tatsunami
 * $BBD0      | 0x3BBD0     | team[9]  Musashi
 * $BBE6      | 0x3BBE6     | team[10] Furano
 * $BBFC      | 0x3BBFC     | team[11] Toho
 * $BC12      | 0x3BC12     | team[12] AsRome
 * $BC28      | 0x3BC28     | team[13] Uruguay
 * $BC3E      | 0x3BC3E     | team[14] Hamburg
 * $BC54      | 0x3BC54     | team[15] Japan
 * $BC6A      | 0x3BC6A     | team[16] NorthKorea
 * $BC80      | 0x3BC80     | team[17] SouthKorea
 * $BC96      | 0x3BC96     | team[18] Poland
 * $BCAC      | 0x3BCAC     | team[19] England
 * $BCC2      | 0x3BCC2     | team[20] Brazil Final 1st Half part 1
 * $BCD8      | 0x3BCD8     | team[21] Brazil Final 1st Half part 2 (含 0x6A-0x74 全明星 Carlos/Zagalo/Riverio/Nei/...)
 * $BCEE      | 0x3BCEE     | team[22] Brazil Final 2nd Half w/ Coinbra 0x75 swap
 *
 * Stride: 22 bytes/team (11 ID × 字节, + 11 padding)
 *
 * ## ⚠ 不是从 asm 翻译
 *
 * 1. `src/asm/bank02/_full.s` (ca65 反汇编) 只有**执行流** (.byte 段是指令片段),
 *    没有 CPU team roster .byte 表的 symbol label
 * 2. `src/asm/bank02/data_tables.s` 是 NT 坐标表 + 字体编码 + $FF 填充, **无 roster 表**
 * 3. bank29 的 23 队 byte data 也只在 _full.s 反汇编产物中可看到 (但无 labels)
 * 4. 队名/球员名 是 CHR tile graphics (给 PPU 用),asm 和 PRG 都无字符串
 *
 * → **唯一可行的 source**: 直接 dump PRG byte, 用 doc anchor 交叉验证
 *
 * ⚠ **也不是运行时从 ROM 读**: 这是 TypeScript 翻译产物,byte 数组**一次手动提取后即固化**,
 *   最终 H5 bundle 不依赖 PRG/nes 文件。修改就改这里,不会"自动同步 PRG"。
 *
 * ## Anchor 验证 (4 doc 锚点 全部命中 ✓)
 *
 * doc `CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt` 写的 `03BB1A` 等是 **ROM file offset**
 * (file_offset - 16 = PRG index):
 *
 * | doc 标的内容              | doc file offset | PRG index | 命中 byte | 球员      | 在哪个队 |
 * |--------------------------|----------------|-----------|----------|-----------|---------|
 * | Cor Pos10 锚点            | `03BB1A`        | `0x3BB0A` | `0x24`    | Riverio   | team[0] byte 0 |
 * | Cor Pos9  锚点            | `03BB1C`        | `0x3BB0C` | `0x23`    | Satilst   | team[0] byte 2 |
 * | Gre Pos1 (Meon GK) 锚点    | `03BB2A`        | `0x3BB1A` | `0x26`    | Meon GK   | team[0] byte 16 |
 * | Gre Pos9 (DaSilva) 锚点    | `03BB28`        | `0x3BB18` | `0x25`    | DaSilva   | team[0] byte 14 |
 *
 * 全部 4 anchor 都在同一 BrazilFlu 22-byte 段 (team[0] = $BB0A..$BB1F),说明 doc 把
 * 这些编辑点视为 Brazil star pool 的全局位置。
 *
 * ## 用法
 *
 *   import {
 *     CPU_ROSTER_PRG_BYTES,    // 23 CPU 队 11 ID 数组, stride 22 sequential
 *     PLAYER_ROSTER_PRG_BYTES, // 4 player 队 11 ID 数组
 *     CPU_TEAM_INDEX,          // 队 ID → CPU roster index 映射
 *     ANCHOR_VERIFIED_TEAMS,   // 验证过的队 ID
 *   } from './roster-prg-bytes';
 *
 *   import { findRosterById } from './team-roster';
 *   const team = findRosterById(0x85);
 *   const idx = CPU_TEAM_INDEX[team.id];
 *   const players = CPU_ROSTER_PRG_BYTES[idx];   // team[1] BrazilCor bytes
 */
/**
 * CPU 对手 23 队 11 ID byte 数组。
 *
 * **PRG 来源**: bank 29 (R7 = 29), PRG index 0x3BB0A..0x3BD0B (CPU $BB0A..$BD0B),
 * stride 22 sequential bytes/team (11 ID + 11 padding)。
 * **不是从 asm 翻译**,是 PRG 物理 dump,经 doc anchor 交叉验证 (Cor Pos10=0x24
 * Riverio, Pos9=0x23 Satilst, Gre Pos1=0x26 Meon GK, Pos9=0x25 DaSilva 全部命中 ✓)。
 * 队 ID 0x84..0xAF = 关 1-32, 0xB0=关33 Brazil Final 1st Half,
 * 0xB1=关33 Brazil Final 2nd Half w/ Coinbra 0x75 swap。
 *
 * IDE 鼠标悬停 `import { CPU_ROSTER_PRG_BYTES } from './roster-prg-bytes'` 即看到此说明。
 */
export declare const CPU_ROSTER_PRG_BYTES: Readonly<Record<number, ReadonlyArray<number>>>;
/**
 * Player team 11 ID byte 数组 (玩家控制 4 队)。
 *
 * **PRG 来源**: bank 2 (R7 = 2), PRG index 0x4A47..0x4A75 (CPU $AA47..$AA75),
 * stride 11 sequential bytes/team (无战术字节)。SaoPaulo/Nankatsu/AsianCup/BenchReserve
 * 11 ID 数组来自真 ROM PRG 物理 dump,不是 asm 翻译。
 *
 * IDE 鼠标悬停 `import { PLAYER_ROSTER_PRG_BYTES } from './roster-prg-bytes'` 即看到此说明。
 */
export declare const PLAYER_ROSTER_PRG_BYTES: Readonly<Record<number, ReadonlyArray<number>>>;
/** 战术字节 (12 字节中第 12 个, 高 4 bit=formation 低 4 bit=tactic) */
export declare const CPU_ROSTER_TACTIC_BYTES: Readonly<Record<number, number>>;
/** 哪些队 PRG byte 经 doc anchor 验证 */
export declare const ANCHOR_VERIFIED_TEAMS: ReadonlySet<number>;
