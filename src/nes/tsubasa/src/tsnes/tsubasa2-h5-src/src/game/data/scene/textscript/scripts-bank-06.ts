/**
 * PRG Bank 6 脚本数据 (ID 0x60-0xFE)
 *
 * 与 bank 03/04/05 同属一套脚本系统 ($8AEC 映射表确认):
 *   ID 0x00-0x0F → bank 03, 0x10-0x1F → bank 04,
 *   ID 0x20-0x5F → bank 05, 0x60-0xFE → bank 06
 *
 * TODO: 脚本区位于 bank06 偏移 0x000C-0x05FF (CPU $A00C-$A5FF),
 *   6 个入口指针: $A00C/$A01B/$A028/$A0E0/$A1A8/$A2F2。
 *   之前生成的数据被证实为错误解析, 已删除; 待按真实布局
 *   (对照 bank00 $84E7 分派器 + 入口指针逐块解析) 重新生成。
 *
 * 结构约定与 scripts-bank-03.ts 一致:
 *   { id, idHex, bank: 6, entryAddr, blocks: [{ label, bank, startOffset, startAddr, instructions }] }
 */
export const SCRIPTS_BANK_06: readonly any[] = [];
