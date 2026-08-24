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

import {
  CPU_ROSTER_PRG_BYTES,
  PLAYER_ROSTER_PRG_BYTES,
  CPU_ROSTER_TACTIC_BYTES,
  ANCHOR_VERIFIED_TEAMS,
} from './roster-prg-bytes';

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

/** 把 12 字节中第 12 字节 (= 战术) 解码成 formation/tactic */
function decodeTacticByte(b: number): { formation: string; tactic: string } {
  const f = (b >> 4) & 0x0f;
  const t = b & 0x0f;
  const formations = ['4-3-3', '4-4-2', '3-5-2', 'Brazil', '4-2-4', '5-3-2', '4-4-2B'];
  const tactics = ['Normal', 'Pressing', 'Counter', 'LongPass', 'Speed', 'Direct', 'Tactic7', 'Tactic8', 'Tactic9', 'Tactic10'];
  return {
    formation: f < 7 ? formations[f] : `Form${f}`,
    tactic: t < 10 ? tactics[t] : `Tact${t}`,
  };
}

/** meta 配置 (队名/formation/tactic/encounterLevels/替补) */
interface TeamMeta {
  readonly id: number;
  readonly name: string;
  readonly type: 'player' | 'cpu' | 'bench';
  readonly encounterLevels: ReadonlyArray<number>;
  readonly formation?: string;
  readonly tactic?: string;
  readonly subs?: ReadonlyArray<number>;
  readonly altLineups?: ReadonlyArray<ReadonlyArray<number>>;
}

/** meta 表 — 来源: docs/CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt +
 *              docs/网络游戏资料/密码选关.MD
 */
const TEAM_META: ReadonlyArray<TeamMeta> = [
  // ─────────── 玩家队 (4 个) ───────────
  { id: 0x80, name: 'SaoPaulo',     type: 'player', encounterLevels: [] },
  { id: 0x81, name: 'Nankatsu',     type: 'player', encounterLevels: [] },
  { id: 0x82, name: 'AsianCup',     type: 'player', encounterLevels: [], subs: [0x19, 0x1F, 0x10, 0x12, 0x13, 0x16, 0x1E, 0x20, 0x21, 0x0F, 0x01, 0x00] },
  { id: 0x83, name: 'BenchReserve', type: 'bench',  encounterLevels: [] },

  // ─────────── Brazil League (6 队, 关 1-6) ───────────
  { id: 0x84, name: 'Fluminense',   type: 'cpu',    encounterLevels: [1] },
  { id: 0x85, name: 'Corinthians',  type: 'cpu',    encounterLevels: [2] },
  { id: 0x86, name: 'Gremio',       type: 'cpu',    encounterLevels: [3] },
  { id: 0x87, name: 'Palmeiras',    type: 'cpu',    encounterLevels: [4] },
  { id: 0x88, name: 'Santos',       type: 'cpu',    encounterLevels: [5] },
  { id: 0x89, name: 'Flamengo',     type: 'cpu',    encounterLevels: [6] },

  // ─────────── Japan HS (6 队, 关 7-12) ───────────
  { id: 0x8A, name: 'Kunimi',       type: 'cpu',    encounterLevels: [7] },
  { id: 0x8B, name: 'Akita',        type: 'cpu',    encounterLevels: [8] },
  { id: 0x8C, name: 'Tatsunami',    type: 'cpu',    encounterLevels: [9] },
  { id: 0x8D, name: 'Musashi',      type: 'cpu',    encounterLevels: [10] },
  { id: 0x8E, name: 'Furano',       type: 'cpu',    encounterLevels: [11] },
  { id: 0x8F, name: 'Toho',         type: 'cpu',    encounterLevels: [12] },

  // ─────────── Japan Cup (4 队, 关 13-16) ───────────
  { id: 0x90, name: 'AsRome',       type: 'cpu',    encounterLevels: [13] },
  { id: 0x91, name: 'Uruguay',      type: 'cpu',    encounterLevels: [14] },
  { id: 0x92, name: 'Hamburg',      type: 'cpu',    encounterLevels: [15] },
  { id: 0x93, name: 'Japan',        type: 'cpu',    encounterLevels: [16] },

  // ─────────── World Cup (12 队, 关 17-32) ───────────
  { id: 0xA2, name: 'Poland',       type: 'cpu',    encounterLevels: [19] },
  { id: 0xA5, name: 'NorthKorea',   type: 'cpu',    encounterLevels: [17] },
  { id: 0xA7, name: 'SouthKorea',   type: 'cpu',    encounterLevels: [18] },
  { id: 0xA8, name: 'England',      type: 'cpu',    encounterLevels: [20] },
  { id: 0xA9, name: 'Russia',       type: 'cpu',    encounterLevels: [21] },
  { id: 0xAA, name: 'France',       type: 'cpu',    encounterLevels: [22] },
  { id: 0xAB, name: 'Mexico',       type: 'cpu',    encounterLevels: [23] },
  { id: 0xAC, name: 'Italy',        type: 'cpu',    encounterLevels: [24] },
  { id: 0xAD, name: 'Netherlands',  type: 'cpu',    encounterLevels: [25] },
  { id: 0xAE, name: 'Argentina',    type: 'cpu',    encounterLevels: [26] },
  { id: 0xAF, name: 'WestGermany',  type: 'cpu',    encounterLevels: [27] }, // 半决赛关 27

  // ─────────── Brazil Youth Final (关 33, 含超级密码阵容) ───────────
  {
    id: 0xB0,
    name: 'BrazilYouth',
    type: 'cpu',
    encounterLevels: [33],
    altLineups: [
      // 超级密码阵容: Pos3 (GK? or FW?) 替换为 Coinbra 0x75
      [0x6A, 0x6B, 0x75, 0x6D, 0x6E, 0x6F, 0x70, 0x71, 0x72, 0x73, 0x74],
    ],
  },
];

/**
 * 把 meta + PRG bytes 合并成完整 TeamRosterEntry
 */
function buildTeam(meta: TeamMeta): TeamRosterEntry {
  const isPlayer = meta.type === 'player' || meta.type === 'bench';
  const byteTable = isPlayer ? PLAYER_ROSTER_PRG_BYTES : CPU_ROSTER_PRG_BYTES;
  const players = byteTable[meta.id] ?? [];
  let formation = meta.formation ?? '4-3-3';
  let tactic = meta.tactic ?? 'Normal';
  if (!meta.formation && !meta.tactic) {
    const tb = CPU_ROSTER_TACTIC_BYTES[meta.id];
    if (tb !== undefined) {
      const decoded = decodeTacticByte(tb);
      formation = decoded.formation;
      tactic = decoded.tactic;
    }
  }
  return {
    id: meta.id,
    name: meta.name,
    type: meta.type,
    players,
    subs: meta.subs ?? [],
    formation,
    tactic,
    encounterLevels: meta.encounterLevels,
    altLineups: meta.altLineups,
    anchorVerified: ANCHOR_VERIFIED_TEAMS.has(meta.id),
  };
}

export const TEAM_ROSTER_TABLE: ReadonlyArray<TeamRosterEntry> = TEAM_META.map(buildTeam);

/** 按 ID 找队伍 */
export function findRosterById(id: number): TeamRosterEntry | null {
  for (const t of TEAM_ROSTER_TABLE) {
    if (t.id === (id & 0xff)) return t;
  }
  return null;
}

/** 按关号找该关对手 (第一支) */
export function findByEncounterLevel(level: number): TeamRosterEntry | null {
  for (const t of TEAM_ROSTER_TABLE) {
    if (t.encounterLevels.includes(level)) return t;
  }
  return null;
}

/** 兼容 team-table.ts 的别名 */
export const TEAM_TABLE = TEAM_ROSTER_TABLE as ReadonlyArray<TeamRosterEntry>;
