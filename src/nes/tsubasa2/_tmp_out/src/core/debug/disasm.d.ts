/**
 * 6502 Disassembler — 参照 FCEUX asm.cpp Disassemble() + x6502.h optype/opsize 表
 *
 * 输入: 内存地址、操作码字节
 * 输出: 汇编字符串 (如 "JSR $C004")
 */
/**
 * 反汇编一条 6502 指令 (参照 FCEUX Disassemble)
 * @param addr - 程序计数器地址 (CPU 地址)
 * @param memRead - 内存读取函数 (addr) => byte
 * @returns { text, size, bytes }
 */
export declare function disassemble(addr: number, memRead: (addr: number) => number): {
    text: string;
    size: number;
    bytes: number[];
};
/**
 * 反汇编指定地址范围 (参照 FCEUX QAsmView updateAssemblyView)
 * @returns dbg_asm_entry_t 列表
 */
export interface AsmEntry {
    addr: number;
    size: number;
    bytes: number[];
    text: string;
}
export declare function disassembleRange(startAddr: number, lineCount: number, memRead: (addr: number) => number): AsmEntry[];
/**
 * 获取状态寄存器 flags 字符串 (参照 FCEUX ConsoleDebugger ppuCtrlRegDpy)
 * 格式: N-V-U-B-D-I-Z-C
 */
export declare function flagsToString(p: number): string;
