/**
 * globals.ts —— ARM9 主程序全局内存符号表
 * 来源：arm9.bin.asm 主入口 0x2003000 常量池（PC 相对加载字面量，已逐项从 arm9.bin 二进制核对）
 *
 * ROM地址 0x20035dc-0x200362c（常量池）
 *  LDR r0,[pc,#imm] 目标与字面量一一对应
 */
export const G = {
    // —— 常量池字面量（地址） ——
    HW_FLAG_WORD: 0x27ffc40, // 硬件状态半字（0x2003008 ldr r0,[pc,#0x5cc] → 0x27ffc40）
    IO_208: 0x04000208, // IO 0x04000208（0x2003030 ldr r2,[pc,#0x5a8] → 0x4000208）
    RAM_290400: 0x00290400, // 0x2003074 ldr r1,[pc,#0x568] → 0x290400
    RAM_28c400: 0x0028c400, // 0x20030a4 ldr r2,[pc,#0x53c] → 0x28c400
    G_de384: 0x020de384, // 全局字节/半字（0x20030ec → 0x20de384）
    G_dc148: 0x020dc148, // 全局字（0x20030f4 → 0x20dc148）
    G_de380: 0x020de380, // 全局字节（0x2003104 前一槽 0x20de380）
    VAL_1202: 0x1202, // 0x2003104 ldr r0,[pc,#0x4ec] → 0x1202
    FLAGS: 0x020dafa4, // 主标志字 r5（0x2003118 → 0x20dafa4）
    PAD_STATE: 0x020dafd8, // 按键/触摸状态结构 r8（0x200311c → 0x20dafd8）
    GAME_CTX: 0x020dafac, // 游戏上下文 r6（0x2003124 → 0x20dafac）
    SCN_CTX: 0x020de4f4, // 场景/屏幕上下文 r4（0x2003134 → 0x20de4f4）
    VAL_801f: 0x801f, // 0x20031a8 ldr r1,[pc,#0x45c] → 0x801f
    IO_4001000: 0x04001000, // 0x20031b4 ldr r0,[pc,#0x454] → 0x4001000
    IO_4000204: 0x04000204, // 0x20031f4 ldr r0,[pc,#0x418] → 0x4000204
    FLAGS2: 0x020dafa8, // 第二标志字（0x2003238 → 0x20dafa8）
    GFX_CTX: 0x020caeec, // 0x2003330 ldr r0,[pc,#0x2e4] → 0x20caeec
    KEY_VAL: 0x27fffa8, // 按键输入半字（0x2003388 → 0x27fffa8）
    VAL_2fff: 0x2fff, // 0x20033b0 ldr r1,[pc,#0x26c] → 0x2fff
    BRT_CTX: 0x020de4ac, // 亮度控制（0x2003580 → 0x20de4ac）
    HW_WORD2: 0x27ffc20, // 硬件状态字（0x20035cc → 0x27ffc20）
};
/** 主标志位定义（FLAGS） */
export const F = {
    B0: 0x1, // 0x200320c bic #1
    B1: 0x2, // 0x2003218 bic #2 / 0x200337c-3384 检查 bit1
    B3: 0x8, // 0x2003224 bic #8
    B4: 0x10, // 0x2003230 orr #0x10
    B2: 0x4, // 0x200333c orr #4
};
/** FLAGS2 位定义 */
export const F2 = {
    B0: 0x1, B1: 0x2, B2: 0x4, B3: 0x8, B4: 0x10, B5: 0x20, B6: 0x40,
};
