/**
 * team-roster.ts — 队伍名单具象化表（从真 ROM 提取）
 *
 * 数据源（docs/CaptainTsubasaVol.II-SuperStrikerROM修改参考.txt §Team Edit
 *         docs/网络游戏资料/密码选关.MD）：
 *   - 玩家队 (PRG 0x4A47-0x4A75)
 *   - 巴西联赛 5 队 @ PRG 0x3BB1A (但剧情打 6 关, Flamengo 关 1 + 关 6 循环)
 *   - 日本高中 6 队 @ PRG 0x3BB62 (剧情关 7-12)
 *   - 日本杯 4 队 @ PRG 0x3BBB4 (剧情关 13-16)
 *   - 亚预赛 6 队 (剧情关 17-22): 叙利亚/中国/伊朗/北朝鲜/沙特/韩国
 *   - 世青赛小组 8 队 (剧情关 23-30): 瓦斯科/波兰/英格兰/苏联/法兰西/墨西哥/意大利/荷兰
 *   - 世青赛淘汰赛 3 队 (剧情关 31-33): 阿根廷/西德/巴西 (含超级密码库因布拉)
 *
 * 总 33 关 = 6 + 6 + 4 + 6 + 8 + 3 关卡。
 * World Cup 区共 11 队 (8+3), 实际只上场 11 个, 但库因布拉 (Coinbra) 需超密码
 * 才能上半场首发 (参见 密码选关.MD §七.特殊密码)。
 *
 * ⚠ 2026-08-24 修正:
 *   关 32 WestGermany 0xAF = `encounterLevels: [32]` (仅 1 关)
 *   关 33 BrazilYouth 0xB0 = `encounterLevels: [33]` (独立队伍)
 *   doc 的 Brazil 决赛 roster 是 stride-2 11 字节数组:
 *     - 1st Half (默认)  @ PRG 0x3BCDA + stride 2 = [0x6A 0x6B 0x6C 0x6D 0x6E 0x6F 0x70 0x71 0x72 0x73 0x74]
 *     - 2nd Half (Coinbra 替换 0x6C) @ PRG 0x3DBEC = 0x75
 *   altLineups 字段保存变阵数据 (含 Coinbra 0x75)。
 *
 * ⚠ 重要修正 (2026-08):
 *   doc 里写的 "$AA47" 是 **CPU 地址**, 不是 PRG 偏移。
 *   实际 PRG 文件位置 = header(16 bytes 已扣) + PRG offset 0x4A47。
 *
 * 验证 (Node.js):
 *   const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);
 *   console.log([...prg.slice(0x4A47, 0x4A52)].map(x=>x.toString(16).padStart(2,'0').toUpperCase()).join(' '));
 *   // → "02 03 04 05 06 07 08 09 0A 01 0B"  ✓ SaoPaulo 真 11 人
 *
 * 重生：scripts/extract_teams.cjs
 */

/** 阵容（11 球员 ID + 阵型 + 战术 + 替补 ID + 关号） */
export interface TeamRosterEntry {
  readonly id: number;
  readonly name: string;
  readonly type: 'player' | 'cpu';
  readonly players: ReadonlyArray<number>;
  readonly subs: ReadonlyArray<number>;
  readonly formation: string;
  readonly tactic: string;
  /** 剧情关号 (1-33); 数组表示同一队可能出现在多个关 */
  readonly encounterLevels: ReadonlyArray<number>;
  /** 备用阵容 (变阵/替换, 含 Coinbra 超级密码阵容等); 不触发主 encounterLevels */
  readonly altLineups?: ReadonlyArray<ReadonlyArray<number>>;
}

/** 战术字节解码 (高 4 位 = formation, 低 4 位 = tactic) */
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

/** 队伍表 (4 player + 5 Brazil + 6 Japan HS + 4 Japan Cup + 6 Asia + 11 World Cup = 36 队) */
export const TEAM_ROSTER_TABLE: ReadonlyArray<TeamRosterEntry> = [
  // ─────────── 玩家队 (4 个, 真实 ID 从 PRG 0x4A47-0x4A75) ───────────
  { id: 0x80, name: 'SaoPaulo',     type: 'player', players: [0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x01, 0x0B], subs: [],                                                                                 formation: '4-3-3', tactic: 'Normal',   encounterLevels: [],  },

  { id: 0x81, name: 'Nankatsu',     type: 'player', players: [0x0F, 0x0D, 0x0E, 0x14, 0x10, 0x0C, 0x13, 0x12, 0x15, 0x11, 0x16], subs: [],                                                                                 formation: '4-4-2', tactic: 'Normal',   encounterLevels: [],  },

  { id: 0x82, name: 'AsianCup',     type: 'player', players: [0x22, 0x1B, 0x1C, 0x14, 0x1D, 0x17, 0x18, 0x11, 0x1A, 0x01, 0x15], subs: [0x19, 0x1F, 0x10, 0x12, 0x13, 0x16, 0x1E, 0x20, 0x21, 0x0F, 0x01, 0x00], formation: 'Brazil', tactic: 'Counter',   encounterLevels: [], },

  { id: 0x83, name: 'Exhibition',   type: 'cpu',    players: [0x21, 0x14, 0x17, 0x10, 0x0B, 0x18, 0x05, 0x06, 0x09, 0x02, 0x0C], subs: [],                                                                                 formation: '4-3-3', tactic: 'Normal',   encounterLevels: [], },

  // ─────────── 巴西联赛 (6 队 × 12 bytes, PRG 0x3BB0A; 关 1-6) ───────────
  // 全部落在 PRG bank 14 ($0E)。剧情顺序 = PRG 顺序 (stride 12):
  //   Fluminense (关1) → Corinthians (关2) → Gremio (关3) → Palmeiras (关4) → Santos (关5) → Flamengo (关6 循环)
  // 修正: 密码选关.MD §一.巴西联赛篇 第1关 = 弗卢米嫩塞, 不是 Flamengo
  // 修正: doc 漏列 Fluminense (0x84), 实际是 Brazil League 第 1 关
  { id: 0x84, name: 'Fluminense',   type: 'cpu',    players: [0x24, 0x09, 0x23, 0x0F, 0x21, 0x00, 0x76, 0x7C, 0x7D, 0x7D, 0xA0], subs: [],                                                                              formation: 'Form8',  tactic: 'Normal',  encounterLevels: [1] },

  { id: 0x85, name: 'Corinthians',  type: 'cpu',    players: [0x26, 0x0F, 0x20, 0x00, 0x7E, 0x7F, 0x80, 0x80, 0xB0, 0x1F, 0x1E], subs: [],                                                                              formation: 'Form9',  tactic: 'Normal',  encounterLevels: [2] },

  { id: 0x86, name: 'Gremio',       type: 'cpu',    players: [0x27, 0x0B, 0x28, 0x0F, 0x21, 0x00, 0x81, 0x82, 0x83, 0x83, 0x91], subs: [],                                                                              formation: 'Form15', tactic: 'Pressing', encounterLevels: [3] },

  { id: 0x87, name: 'Palmeiras',    type: 'cpu',    players: [0x1D, 0x09, 0x29, 0x04, 0x2A, 0x0F, 0x03, 0x00, 0x84, 0x85, 0x86], subs: [],                                                                              formation: 'Form6',  tactic: 'Tact8',   encounterLevels: [4] },

  { id: 0x88, name: 'Santos',       type: 'cpu',    players: [0x60, 0x1E, 0x1F, 0x0A, 0x2B, 0x06, 0x2C, 0x02, 0x2D, 0x0F, 0x00], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [5] },

  // 修正: Flamengo 仅关 6 (关 1 是 Fluminense, 不是 Flamengo)
  { id: 0x89, name: 'Flamengo',     type: 'cpu',    players: [0x87, 0x88, 0x89, 0x89, 0x91, 0x1F, 0x1D, 0x04, 0x2E, 0x09, 0x2F], subs: [],                                                                              formation: 'Form15', tactic: 'Normal',  encounterLevels: [6] },

  // ─────────── 日本高中 (6 队 × 12 bytes, PRG 0x3BB62; 关 7-12) ───────────
  { id: 0x8A, name: 'Kunimi',       type: 'cpu',    players: [0x31, 0x0F, 0x01, 0x00, 0x76, 0x8D, 0x8D, 0x8E, 0x40, 0x1E, 0x1E], subs: [],                                                                              formation: 'Form4',  tactic: 'Normal',  encounterLevels: [7] },

  { id: 0x8B, name: 'Akita',        type: 'cpu',    players: [0x32, 0x01, 0x33, 0x0F, 0x02, 0x00, 0x8F, 0x90, 0x91, 0x91, 0x70], subs: [],                                                                              formation: 'Form15', tactic: 'Pressing', encounterLevels: [8] },

  { id: 0x8C, name: 'Tatsunami',    type: 'cpu',    players: [0x1C, 0x0F, 0x00, 0x00, 0x92, 0x93, 0x94, 0x94, 0x70, 0x1F, 0x1F], subs: [],                                                                              formation: 'Form10', tactic: 'Normal',  encounterLevels: [9] },

  { id: 0x8D, name: 'Musashi',      type: 'cpu',    players: [0x35, 0x0F, 0x03, 0x00, 0x76, 0x95, 0x96, 0x96, 0x60, 0x1F, 0x1E], subs: [],                                                                              formation: 'Form9',  tactic: 'Normal',  encounterLevels: [10] },

  { id: 0x8E, name: 'Furano',       type: 'cpu',    players: [0x36, 0x0A, 0x37, 0x06, 0x38, 0x01, 0x39, 0x0F, 0x20, 0x00, 0x97], subs: [],                                                                              formation: 'Form8',  tactic: 'Tact9',   encounterLevels: [11] },

  { id: 0x8F, name: 'Toho',         type: 'cpu',    players: [0x99, 0x99, 0xA0, 0x1F, 0x1E, 0x09, 0x3A, 0x0F, 0x01, 0x00, 0x9A], subs: [],                                                                              formation: 'Form11', tactic: 'Tact9',   encounterLevels: [12] },

  // ─────────── 日本杯 (4 队 × 12 bytes, PRG 0x3BBB4; 关 13-16) ───────────
  { id: 0x90, name: 'AsRome',       type: 'cpu',    players: [0x03, 0x00, 0x76, 0x9D, 0x9E, 0x9E, 0x70, 0x1E, 0x1E, 0x07, 0x3D], subs: [],                                                                              formation: 'Form10', tactic: 'Normal',  encounterLevels: [13] },

  { id: 0x91, name: 'Uruguay',      type: 'cpu',    players: [0x3E, 0x06, 0x3F, 0x01, 0x40, 0x0F, 0x01, 0x00, 0x76, 0x77, 0x78], subs: [],                                                                              formation: 'Form9',  tactic: 'Tact7',   encounterLevels: [14] },

  { id: 0x92, name: 'Hamburg',      type: 'cpu',    players: [0x30, 0x1F, 0x1B, 0x09, 0x41, 0x0B, 0x42, 0x06, 0x43, 0x0A, 0x44], subs: [],                                                                              formation: 'Form8',  tactic: 'Normal',  encounterLevels: [15] },

  { id: 0x93, name: 'Japan',        type: 'cpu',    players: [0x46, 0x07, 0x47, 0x02, 0x48, 0x04, 0x49, 0x03, 0x4A, 0x05, 0x4B], subs: [],                                                                              formation: '4-4-2',  tactic: 'Normal',  encounterLevels: [16] },

  // ─────────── 亚预赛 (6 队, 剧情关 17-22) ───────────
  // (数据从 doc 推断, doc 列出队伍名但未给具体 PRG offset; 暂用 WorldCup ID 占位)
  { id: 0xA2, name: 'Syria',        type: 'cpu',    players: [0x70, 0x1F, 0x1C, 0x09, 0x4F, 0x0A, 0x50, 0x0F, 0x23, 0x00, 0xB1], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [17] },

  { id: 0xA3, name: 'China',        type: 'cpu',    players: [0xB2, 0xB2, 0xA0, 0x1F, 0x1F, 0x0F, 0x21, 0x00, 0x76, 0xB3, 0xB4], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [18] },

  { id: 0xA4, name: 'Iran',         type: 'cpu',    players: [0xA0, 0x1F, 0x1F, 0x0B, 0x51, 0x01, 0x52, 0x0F, 0x00, 0x00, 0xB5], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [19] },

  { id: 0xA5, name: 'NorthKorea',   type: 'cpu',    players: [0xB7, 0xB7, 0xA1, 0x1F, 0x1D, 0x09, 0x53, 0x04, 0x54, 0x0F, 0x12], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [20] },

  { id: 0xA6, name: 'SaudiArabia',  type: 'cpu',    players: [0x76, 0xB8, 0xB9, 0xB9, 0xA0, 0x1F, 0x1E, 0x09, 0x55, 0x01, 0x56], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [21] },

  { id: 0xA7, name: 'Korea',        type: 'cpu',    players: [0x11, 0x00, 0xBA, 0xBB, 0xBC, 0xBC, 0x70, 0x1F, 0x1E, 0x09, 0x57], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [22] },

  // ─────────── 世青赛小组 + 淘汰 (8 + 3 = 11 队, 关 23-33) ───────────
  { id: 0xA0, name: 'Vasco',        type: 'cpu',    players: [0xA8, 0xA9, 0xAA, 0xAA, 0xA0, 0x00, 0x00, 0x0F, 0x13, 0x00, 0xAB], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [23] },

  { id: 0xA1, name: 'Poland',       type: 'cpu',    players: [0xAD, 0xAD, 0xA0, 0x1F, 0x1F, 0x0F, 0x00, 0x00, 0xAE, 0xAF, 0xB0], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [24] },

  { id: 0xA8, name: 'England',      type: 'cpu',    players: [0x58, 0x0F, 0x20, 0x00, 0xBD, 0xBE, 0xBF, 0xBF, 0x70, 0x1F, 0x1C], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [25] },

  { id: 0xA9, name: 'SovietUnion',  type: 'cpu',    players: [0x59, 0x0F, 0x21, 0x00, 0x76, 0xC0, 0xC1, 0xC1, 0xA0, 0x1F, 0x1E], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [26] },

  { id: 0xAA, name: 'France',       type: 'cpu',    players: [0x5A, 0x01, 0x5B, 0x0F, 0x10, 0x00, 0xC2, 0xC3, 0xC4, 0xC4, 0x71], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [27] },

  { id: 0xAB, name: 'Mexico',       type: 'cpu',    players: [0x1D, 0x09, 0x5C, 0x04, 0x5D, 0x0F, 0x02, 0x00, 0xC5, 0xC6, 0xC6], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [28] },

  { id: 0xAC, name: 'Italy',        type: 'cpu',    players: [0xB0, 0x1F, 0x1A, 0x0B, 0x5E, 0x09, 0x5F, 0x0A, 0x60, 0x08, 0x61], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [29] },

  { id: 0xAD, name: 'Netherlands',  type: 'cpu',    players: [0x62, 0x0F, 0x02, 0x00, 0x76, 0xC7, 0xC7, 0xC7, 0x70, 0x1E, 0x1F], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [30] },

  { id: 0xAE, name: 'Argentina',    type: 'cpu',    players: [0x63, 0x09, 0x64, 0x08, 0x65, 0x05, 0x66, 0x0A, 0x67, 0x07, 0x68], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [31] },

  // 关 32 西德 0xAF + 关 33 巴西青年 0xB0 拆开 (数据源自 doc 文件 offset 0x3BCC2/0x3BCDA, stride 2)
  // 西德 doc 仅给 7 IDs (GK + 6 hint); 其余 4 个待反汇编 PRG 区间补全
  { id: 0xAF, name: 'WestGermany',  type: 'cpu',    players: [0x69, 0x0F, 0x03, 0x00, 0x76, 0x77, 0x78, 0x79, 0x61, 0x1E, 0x28], subs: [],                                                                              formation: '4-3-3',  tactic: 'Normal',  encounterLevels: [32] },

  // 关 33 巴西青年决赛 (BrazilYouth)
  // 默认阵容 = 1st Half @ PRG 0x3BCDA + stride 2
  // altLineups[0] = 2nd Half (Coinbra 替换 Pos3) @ PRG 0x3DBEC = 0x75
  // 触发条件: 密码选关.MD §七"决赛巴西队10号库因布拉上半场就在队中"
  //   ねききみげ ひひびわじ じくとうし じぜび  (Coinbra 上半场首发 super-password)
  { id: 0xB0, name: 'BrazilYouth',  type: 'cpu',    players: [0x6A, 0x6B, 0x6C, 0x6D, 0x6E, 0x6F, 0x70, 0x71, 0x72, 0x73, 0x74], subs: [],
    formation: '4-3-3',  tactic: 'Normal',
    encounterLevels: [33],
    altLineups: [
      // 超级密码阵容: Pos3 (GK? or FW?) 替换为 Coinbra 0x75
      [0x6A, 0x6B, 0x75, 0x6D, 0x6E, 0x6F, 0x70, 0x71, 0x72, 0x73, 0x74],
    ],
  },
];

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

/** 兼容 team-table.ts 的别名 (TEAM_TABLE = TEAM_ROSTER_TABLE) */
export const TEAM_TABLE = TEAM_ROSTER_TABLE as ReadonlyArray<TeamRosterEntry>;
