/**
 * 技能数据表 — 原 bank16 必杀技数据（声明式表结构）
 *
 * 从 asm/bank16/data_tables.s + code_data.s 提取。
 * bank16 包含：必杀技指针表、动作序列、球员-技能映射、必杀动画帧。
 *
 * 当前为 stub（契约占位），逐个覆盖实现。
 */
export interface SkillEntry {
  /** 必杀技 ID（对应 ram_043C 的 moveId） */
  readonly moveId: number;
  /** 技能名（V0.2 从文本表接入） */
  readonly name: string;
  /** 威力值 */
  readonly power: number;
  /** 关联球员 ID 列表 */
  readonly players: ReadonlyArray<number>;
  /** 动作序列偏移（指向 bank16 动作数据） */
  readonly actionOffset: number;
}

/**
 * 必杀技指针表（原 $8Axx 区域）
 * 每条 2 字节：lo, hi → 动作序列地址
 */
export const SKILL_POINTER_TABLE: ReadonlyArray<{ readonly id: number; readonly lo: number; readonly hi: number }> = [
  // TODO B16: 从 bank16/data_tables.s 提取真实指针
];

export const SKILL_TABLE: ReadonlyArray<SkillEntry> = [];

/**
 * 球员-必杀技映射表（原 $86E3 区域，17 字节）
 * 索引 = 动作 ID，值 = 必杀技 ID
 */
export const SKILL_MOVE_ID_TABLE: ReadonlyArray<number> = [
  // TODO B16: 从 bank16/code_data.s $86E3 提取
];

/**
 * 必杀技触发值表（原 $86C8 区域，4 字节）
 * 检查 ram_043C & 0x7F 是否匹配
 */
export const SKILL_TRIGGER_TABLE: ReadonlyArray<number> = [
  // TODO B16: 从 bank16/code_data.s $86C8 提取
];

export function findSkillByMoveId(moveId: number): SkillEntry | null {
  for (const s of SKILL_TABLE) {
    if (s.moveId === moveId) return s;
  }
  return null;
}

export function findSkillsByPlayer(playerId: number): number[] {
  const ids: number[] = [];
  for (const s of SKILL_TABLE) {
    if (s.players.includes(playerId)) ids.push(s.moveId);
  }
  return ids;
}
