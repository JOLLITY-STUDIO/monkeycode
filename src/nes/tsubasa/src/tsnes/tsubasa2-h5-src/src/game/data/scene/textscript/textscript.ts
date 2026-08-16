/**
 * 剧情脚本数据模块入口 — Bank 03-06 脚本系统 (纯数据层)
 *
 * 模块结构 (仅数据/常量/只读查询, 不含执行逻辑):
 *   - script-opcodes.ts: 指令集定义 (opcode → 含义 → 参数格式)
 *   - char-map.ts: 字符映射表 (脚本字节 → 可读字符)
 *   - scripts-bank-03.ts ~ scripts-bank-06.ts: 各 bank 解析后的脚本数据
 *   - script-data-loader.ts: 数据索引 (按 ID/bank 只读查询)
 *
 * 脚本执行引擎 (VM) 属业务逻辑, 已移至 service/script-vm.ts。
 *
 * 脚本系统架构 (基于 _tmp_bzk_out/bank_00.asm 反编译):
 *   - 脚本分派器: $84E7 (bank 00)
 *   - 脚本指针: ram_004D/004E (16 位)
 *   - 脚本启动函数: $8464 (输入 A = 脚本 ID)
 *   - 脚本 ID 映射表: $8AEC (bank 00)
 *       ID 0x00-0x0F → bank 03 (标题/KICK OFF 剧情)
 *       ID 0x10-0x1F → bank 04 (中段剧情)
 *       ID 0x20-0x5F → bank 05 (比赛相关)
 *       ID 0x60-0xFE → bank 06 (大量剧情/对话, 待解析)
 *
 * 数据来源:
 *   - rom-data/prg-bank-03.ts ~ prg-bank-06.ts (脚本字节码)
 *   - scripts/generate_script_data.cjs (解析器, 生成 scripts-bank-03~06.ts)
 */

export * from './script-opcodes';
export * from './char-map';
export * from './script-data-loader';
