/**
 * 球员属性数据表 (Data/Model 层) — 属性结构 & ROM 能力值地址
 *
 * 来源: CaptainTsubasaVol.II-SuperStrikerROM.txt (ROM Hacking Guide by Whipon)
 *   - Character Stats (RAM 布局: Player / Guts(16bit) / Level)
 *   - Stats Modifier  (ROM 能力值表: 每角色 23 字节, GK 8 字节)
 *
 * 注: 能力值 ROM 地址为 CPU 地址 (银行切换后映射到 $8000-$BFFF)。
 * 仅供 DataQueryService / MatchService 使用 (bank=service, data=model)。
 */

// ═══════════════════════════════════════════════════════════════
// RAM 球员属性布局 (Character Stats)
// 我方: $0300-$042B 共 21 人；CPU: $0384-$03FF 共 11 人
// 每球员 0x0C 字节: [Player 编号][Guts 16bit][Level]
// ═══════════════════════════════════════════════════════════════

/** 我方球员属性区起始地址 */
export const PLAYER_STATS_BASE = 0x0300;

/** 我方球员数 (含 2 名替补 GK, 共 21 人) */
export const PLAYER_STATS_COUNT = 21;

/** 单球员属性记录大小 (字节) */
export const PLAYER_STATS_STRIDE = 0x0C;

/** CPU 队属性区起始地址 */
export const CPU_TEAM_STATS_BASE = 0x0384;

/** CPU 队球员数 (11 人) */
export const CPU_TEAM_STATS_COUNT = 11;

/** 属性记录内字段偏移 */
export const PLAYER_STATS_FIELD = {
  PLAYER: 0x00, // 球员编号 (1 byte)
  GUTS_LO: 0x01, // 体力低字节
  GUTS_HI: 0x02, // 体力高字节 (16-bit)
  LEVEL: 0x03, // 等级 (1 byte)
} as const;

// ═══════════════════════════════════════════════════════════════
// ROM 能力值表 (Stats Modifier)
// 每角色 23 字节能力值; GK 仅 8 字节。地址为 CPU 地址。
// ═══════════════════════════════════════════════════════════════

/** 普通球员能力值块大小 (字节) */
export const PLAYER_ABILITY_SIZE = 23;

/** 门将能力值块大小 (字节) */
export const GK_ABILITY_SIZE = 8;

/** 角色能力值 ROM 地址表 (指南提供) */
export const PLAYER_ABILITY_ROM_ADDR: readonly { name: string; addr: number; isGK: boolean }[] = [
  { name: 'Tsubasa', addr: 0x9FE6, isGK: false },
  { name: 'Misaki', addr: 0x9FFE, isGK: false },
  { name: 'Nitta', addr: 0xA016, isGK: false },
  { name: 'Ishizaki', addr: 0xA11E, isGK: false },
  { name: 'Kazuo & Masao', addr: 0xA136, isGK: false },
  { name: 'Sano', addr: 0xA14E, isGK: false },
  { name: 'Hyuga', addr: 0xA166, isGK: false },
  { name: 'Souta', addr: 0xA17E, isGK: false },
  { name: 'Jitou', addr: 0xA196, isGK: false },
  { name: 'Matsuyama', addr: 0xA1AE, isGK: false },
  { name: 'Sawada', addr: 0xA1DE, isGK: false },
  { name: 'Misugi', addr: 0xA1F6, isGK: false },
  { name: 'Morisaki (GK)', addr: 0xAE8E, isGK: true },
  { name: 'Wakashimazu (GK)', addr: 0xAE96, isGK: true },
  { name: 'Wakabayashi (GK)', addr: 0xAE9E, isGK: true },
];

/** 角色名 → 能力值 ROM 地址 (快速查找) */
export const ABILITY_ROM_ADDR_MAP: ReadonlyMap<string, number> = new Map(
  PLAYER_ABILITY_ROM_ADDR.map(p => [p.name, p.addr]),
);
