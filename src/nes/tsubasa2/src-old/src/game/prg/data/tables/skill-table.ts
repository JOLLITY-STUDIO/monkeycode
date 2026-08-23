/**
 * SkillService 数据表 — 从 asm/bank16/*.s (data_tables.s / code_main.s / code_sub.s)
 * 的 .byte 段逐段提取的声明式数组。
 * @bank 16 ($A000-$BFFF 窗口)
 *
 * 说明: bank16 存储一套字节码驱动的必杀技/特殊动作脚本系统。
 * 翻译版禁止 PRG_BANK_16[addr] 裸地址随机访问, 一律使用本模块声明式数组。
 */

/**
 * 明星必杀 ROM 地址表 $89BF — 必杀技脚本入口指针表 (16-bit LE)。
 *
 * 对应 data_tables.s 开头 `LDA $05E3/ORA #$40/STA $05E3/LDA #$FF/RTS` (约 $89B4-$89BE)
 * 之后的指针表。每个元素是某必杀技动作脚本在 bank16 内的起始地址
 * (JSR $C509 之后的间接跳转目标, 配合 getMove() 的 moveId 索引)。
 *
 * 共 121 项 (索引 0-120)。值 0xFFFF 表示无 (空必杀)。
 */
export const STAR_SKILL_PTR_TABLE: readonly number[] = [
  0x8ab1, 0x91f2, 0x91ff, 0xb48e, 0x9bcb, 0x9259, 0x9263, 0x9285,
  0x932c, 0x9369, 0x9811, 0x98ed, 0x96e3, 0x96f7, 0x91ea, 0x9205,
  0x9259, 0x9269, 0x927f, 0x91d3, 0x9b82, 0xb80a, 0xb817, 0xb8a1,
  0x9e3e, 0xbbd4, 0xbc6d, 0xb486, 0x9be3, 0x9cee, 0xb7da, 0xb733,
  0xb738, 0xba3b, 0xb749, 0xbb3f, 0x9bf2, 0x9cdd, 0x9e2d, 0x9bf8,
  0xb4cc, 0x9bfe, 0xb4e0, 0xb72c, 0x9f54, 0xb4d6, 0xb74e, 0xb773,
  0x9c30, 0xb78c, 0x9e57, 0x9c04, 0xbbcc, 0xb7cd, 0xb7e4, 0xb7bf,
  0xb7c6, 0xbdb3, 0xb47c, 0xbda1, 0x9f3e, 0x9fba, 0x9c0a, 0xb754,
  0xbd95, 0xbd9a, 0xbda6, 0xbdad, 0xb7d5, 0xbdb8, 0xbdbd, 0x9c19,
  0xbe01, 0xbe01, 0xbe01, 0xbe01, 0xbe01, 0xbe01, 0xbe01, 0xbe01,
  0xbe01, 0xbe0d, 0xbe18, 0xbe20, 0xbe2a, 0xbe32, 0xbe3a, 0xbe42,
  0xbe4a, 0xbe52, 0xbe5a, 0xbe69, 0xbe73, 0xbe7c, 0xbe86, 0xbe8e,
  0xbe96, 0xbe9e, 0xbea6, 0xbeae, 0xbeb6, 0xbebe, 0xbec6, 0xbed8,
  0xbef7, 0xbf05, 0xaa62, 0xbf0d, 0xbf13, 0xbf23, 0xbf2c, 0xbf54,
  0xbf61, 0xbf73, 0xbf7f, 0xbf94, 0xbf9c, 0xbfd2, 0xb01b, 0xbfd8,
  0xa197,
];

/**
 * 必杀技 7 类槽位索引 — 角色必杀技分配表 (每人 7 项×2B)。
 * 顺序对应 ROM 中角色必杀表每人的 7 个 2 字节槽位。
 */
export const SKILL_SLOT_INDEX = {
  SHOT: 0,     // 射门
  PASS: 1,     // 传球
  DRIBBLE: 2,  // 盘带
  ONE_TWO: 3,  // 1-2
  BLOCK: 4,    // 挡球
  TACKLE: 5,   // 抢球
  PASS_CUT: 6, // 断传球
} as const;

/**
 * 必杀技定义查询表 $89BF (别名) — 由 getMove() 使用。
 * moveId 直接索引 STAR_SKILL_PTR_TABLE。
 *
 * @returns 该必杀技脚本在 bank16 内的起始 ROM 地址 (0xFFFF 表示无/空)。
 */
export function getMovePtr(moveId: number): number {
  if (moveId < 0 || moveId >= STAR_SKILL_PTR_TABLE.length) {
    return 0xffff;
  }
  return STAR_SKILL_PTR_TABLE[moveId];
}

/**
 * 角色必杀技分配表 (占位/待补) — 每人 7 项×2B:
 * Shot / Pass / Dribble / 1-2 / Block / Tackle / PassCut。
 *
 * TODO: 从 asm/bank16 data_tables.s $8F00+ 区逐角色提取。
 * 每个元素 [shot, pass, dribble, oneTwo, block, tackle, passCut] 均为
 * 2 字节小端必杀技 ID (指向 STAR_SKILL_PTR_TABLE)。
 */
export const CHARACTER_SKILL_TABLE: readonly (readonly [number, number, number, number, number, number, number])[] = [
  // TODO: 逐角色从 $8F00+ 区提取
];

/**
 * 由角色号 (charIndex) 取该角色 7 个必杀槽位 (2 字节小端 ID)。
 * 未实现时返回 null。
 */
export function getCharacterSkills(charIndex: number): readonly number[] | null {
  if (charIndex < 0 || charIndex >= CHARACTER_SKILL_TABLE.length) {
    return null;
  }
  return CHARACTER_SKILL_TABLE[charIndex];
}
