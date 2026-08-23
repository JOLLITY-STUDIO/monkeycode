"use strict";
/**
 * Bank 02 数据表结构化解析 — Schema 定义
 * 基于 ASM 代码分析，每张表的每个字节都有明确含义
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_TABLES = exports.S16LE = exports.U16LE = exports.U8 = exports.S8 = void 0;
// ── 辅助函数（在页面端实现 decode，这里只标记语义） ──
/** 有符号 8-bit */
const S8 = (v) => (v >= 128 ? v - 256 : v);
exports.S8 = S8;
/** unsigned 8-bit */
const U8 = (v) => v;
exports.U8 = U8;
/** 16-bit little-endian (lo, hi) */
const U16LE = (lo, hi) => lo + (hi << 8);
exports.U16LE = U16LE;
/** 16-bit signed LE */
const S16LE = (lo, hi) => {
    const v = lo + (hi << 8);
    return v >= 32768 ? v - 65536 : v;
};
exports.S16LE = S16LE;
// ── 全部数据表定义 ──
exports.DATA_TABLES = [
    // ==========================================================
    // 1. 跳转表 — $806A-$8076  (13 bytes)
    // ==========================================================
    {
        name: '初始跳转表',
        addr: 0x406A,
        length: 13,
        recordSize: 0,
        note: 'CPU 地址表，LDA absolute 读取，用于场景初始化跳转分发',
        fields: [
            { offset: 0, size: 1, name: 'flag', desc: '?? 未知标志' },
            { offset: 1, size: 12, name: 'jumpTargets', desc: '跳转地址 (12×1 byte = 6×16-bit)' },
        ],
    },
    // ==========================================================
    // 2. 帧同步后参数区 — $813C-$815F  (40 bytes)
    // ==========================================================
    {
        name: '帧同步参数区',
        addr: 0x413C,
        length: 40,
        recordSize: 0,
        note: 'NMI 退出后加载到零页，PPU 控制 / MMC3 配置参数',
        fields: [
            { offset: 0, size: 8, name: 'ppuCtrl', desc: 'PPU 控制寄存器碎片（scroll/nametable/nmi/vram）' },
            { offset: 8, size: 4, name: 'mmc3Regs', desc: 'MMC3 Bank 寄存器写入序列' },
            { offset: 12, size: 8, name: 'bankSwitch', desc: 'PRG/CHR Bank 选择值' },
            { offset: 20, size: 4, name: 'scrollXY', desc: '卷轴 X/Y (2×16-bit)' },
            { offset: 24, size: 4, name: 'irqLatch', desc: 'IRQ latch 参数' },
            { offset: 28, size: 12, name: 'padding', desc: '保留/未使用' },
        ],
    },
    // ==========================================================
    // 3. IRQ 后参数区 — $81E8-$8203  (28 bytes)
    // ==========================================================
    {
        name: 'IRQ 参数区',
        addr: 0x41E8,
        length: 28,
        recordSize: 0,
        note: 'IRQ 处理完成后配置，scanline 中断后续参数',
        fields: [
            { offset: 0, size: 4, name: 'mmc3Cmd', desc: 'MMC3 命令序列' },
            { offset: 4, size: 8, name: 'scrollSet', desc: '滚动参数设置' },
            { offset: 12, size: 8, name: 'irqNext', desc: '下一次 IRQ 参数' },
            { offset: 20, size: 8, name: 'padding', desc: '保留区域' },
        ],
    },
    // ==========================================================
    // 4. 场景跳转/分发表 — $83DC-$8480  (165 bytes)
    // ==========================================================
    {
        name: '场景跳转/分发表',
        addr: 0x43DC,
        length: 165,
        recordSize: 3,
        note: '每个条目 3 字节: [BANK, ADDR_LO, ADDR_HI]，场景选择时查表跳转',
        fields: [
            { offset: 0, size: 1, name: 'bank', desc: '目标 PRG Bank 号 ($00-$1F)' },
            { offset: 1, size: 1, name: 'addrLo', desc: '目标地址低字节' },
            { offset: 2, size: 1, name: 'addrHi', desc: '目标地址高字节' },
        ],
    },
    // ==========================================================
    // 5. 场地参数表 — $AA97-$AADF  (via code at $8655)
    // 注：实际范围 $8A9B-$8AEC，代码用 $AA97 访问
    // ==========================================================
    {
        name: '场地参数表 (AA97 → A697 查表)',
        addr: 0x4A97,
        length: 82,
        recordSize: 0,
        note: '由 $8655 循环读取。每 3 字节一组：[控制, 来源Bank:偏移, X计数]。第 0 字节高位置 1 表示循环继续，bit6=1 表示换 VRAM 页面',
        fields: [
            { offset: 0, size: 1, name: 'ctrl', desc: '控制字节 | bit7=循环标志 bit6=翻页标志' },
            { offset: 1, size: 1, name: 'srcBankOfs', desc: '数据来源 Bank:偏移 (到 $9B28 查询)' },
            { offset: 2, size: 1, name: 'xDstCount', desc: '目标写入次数+1 (=实际次数-1)' },
        ],
    },
    // ==========================================================
    // 6. AA47 Metatile→Tile 展开表 — $8A47-$8A96  (79 bytes)
    // ==========================================================
    {
        name: 'Metatile→Tile 展开表 (AA47)',
        addr: 0x4A47,
        length: 79,
        recordSize: 0,
        note: '3 组 × 12×2=72B + 额外 7B。组 0=上半场(草地), 组 1=中场中圈, 组 2=下半场(禁区)。每 12 字节：[10 tile 索引, attribute, scrollX]，$8895 读取',
        fields: [
            { offset: 0, size: 10, name: 'tiles_g0', desc: '组 0: 10 个 tile 索引 → ram_0408' },
            { offset: 10, size: 1, name: 'attr_g0', desc: '组 0: 属性字节 → ram_002C' },
            { offset: 11, size: 1, name: 'scrollX_g0', desc: '组 0: 水平滚动索引 → ram_002A' },
            { offset: 12, size: 10, name: 'tiles_g1', desc: '组 1: 10 个 tile 索引' },
            { offset: 22, size: 1, name: 'attr_g1', desc: '组 1: 属性字节' },
            { offset: 23, size: 1, name: 'scrollX_g1', desc: '组 1: 水平滚动索引' },
            { offset: 24, size: 10, name: 'tiles_g2', desc: '组 2: 10 个 tile 索引' },
            { offset: 34, size: 1, name: 'attr_g2', desc: '组 2: 属性字节' },
            { offset: 35, size: 1, name: 'scrollX_g2', desc: '组 2: 水平滚动索引' },
            { offset: 36, size: 43, name: 'extra', desc: '附加数据 (备用/对齐填充)' },
        ],
    },
    // ==========================================================
    // 7. $8A24-$8A46 AA47 前导段 (39 bytes)
    // ==========================================================
    {
        name: 'AA47 前导段',
        addr: 0x4A24,
        length: 39,
        recordSize: 0,
        note: 'AA47 表之前的数据段，$88B7 通过 $88BD 读取写入 ram_0300（11 次每 12 字节步进）',
        fields: [
            { offset: 0, size: 12, name: 'block0', desc: '写入 ram_0300+$00..+$0B' },
            { offset: 12, size: 12, name: 'block1', desc: '写入 ram_0300+$0C..+$17' },
            { offset: 24, size: 12, name: 'block2', desc: '写入 ram_0300+$18..+$23' },
            { offset: 36, size: 3, name: 'tail', desc: '末尾 3 字节' },
        ],
    },
    // ==========================================================
    // 8. 滚动参数表 — $8AF3-$8AFC  (10 bytes)
    // ==========================================================
    {
        name: '滚动参数表',
        addr: 0x4AF3,
        length: 10,
        recordSize: 2,
        note: '5 组 × 2 字节: [scrollLo, scrollHi] signed 16-bit，在不同场地段应用的水平滚动 delta',
        fields: [
            { offset: 0, size: 1, name: 'scrollLo', desc: '滚动增量低字节 (signed)' },
            { offset: 1, size: 1, name: 'scrollHi', desc: '滚动增量高字节 (signed)' },
        ],
    },
    // ==========================================================
    // 9. 边界修正表 v1 — $8B03-$8B0C  (10 bytes)
    // ==========================================================
    {
        name: 'OAM 边界修正表 v1 (AB1F/AB21/AB22)',
        addr: 0x4B03,
        length: 10,
        recordSize: 0,
        note: '$8379-$839E 使用。Y = 0,4,8,12 查表，修正在屏 OAM 精灵 X/Y 坐标。',
        fields: [
            { offset: 0, size: 2, name: 'group0', desc: 'Y=0: [cmpThresh, addend] — 若 X>=cmpThresh 则置 0，然后 X += addend(lo) & Y += addend(hi)' },
            { offset: 2, size: 2, name: 'group1', desc: 'Y=4' },
            { offset: 4, size: 2, name: 'group2', desc: 'Y=8' },
            { offset: 6, size: 2, name: 'group3', desc: 'Y=12' },
            { offset: 8, size: 2, name: 'group4', desc: 'Y=16 (? 超出实际范围)' },
        ],
    },
    // ==========================================================
    // 10. 边界修正表 v2 — $8B13-$8B1C  (10 bytes)
    // ==========================================================
    {
        name: 'OAM 边界修正表 v2',
        addr: 0x4B13,
        length: 10,
        recordSize: 0,
        note: '与 v1 结构相同，用于不同场地类型的边界修正',
        fields: [
            { offset: 0, size: 2, name: 'group0', desc: 'Y=0: [cmpThresh, addend]' },
            { offset: 2, size: 2, name: 'group1', desc: 'Y=4' },
            { offset: 4, size: 2, name: 'group2', desc: 'Y=8' },
            { offset: 6, size: 2, name: 'group3', desc: 'Y=12' },
            { offset: 8, size: 2, name: 'group4', desc: 'Y=16' },
        ],
    },
    // ==========================================================
    // 11. 大段数据区 Header — $8902-$89D6  (213 bytes)
    // ==========================================================
    {
        name: '场地大段数据 Header',
        addr: 0x4902,
        length: 213,
        recordSize: 0,
        note: '包含 $84C1-$85DC 使用的初始化参数，含 PPU 写入序列、NT 地址、CHR 映射等',
        fields: [
            { offset: 0, size: 2, name: 'ppuAddr', desc: 'PPU 目标地址 (16-bit)' },
            { offset: 2, size: 1, name: 'length', desc: '写入字节数' },
            { offset: 3, size: 20, name: 'palette', desc: '调色板/属性数据' },
            { offset: 23, size: 6, name: 'ntScroll', desc: 'NT 卷轴/坐标参数' },
            { offset: 29, size: 8, name: 'chrBanks', desc: 'CHR Bank 选择' },
            { offset: 37, size: 16, name: 'sprSetup', desc: '精灵初始化参数' },
            { offset: 53, size: 160, name: 'blockData', desc: '场地块数据 (→ ram_0500 区域)' },
        ],
    },
    // ==========================================================
    // 12. 球门/场地数据 — $8792-$87C1  (48 bytes)
    // ==========================================================
    {
        name: '球门/场地数据',
        addr: 0x4792,
        length: 48,
        recordSize: 4,
        note: '球门区域 metatile 及矩形填充参数',
        fields: [
            { offset: 0, size: 1, name: 'x', desc: 'X 坐标 tile 索引' },
            { offset: 1, size: 1, name: 'y', desc: 'Y 坐标 tile 索引' },
            { offset: 2, size: 1, name: 'w', desc: '宽度 tiles' },
            { offset: 3, size: 1, name: 'h', desc: '高度 tiles' },
        ],
    },
    // ==========================================================
    // 13. 球门后数据 — $87FF-$8832  (52 bytes)
    // ==========================================================
    {
        name: '球门后/边界数据',
        addr: 0x47FF,
        length: 52,
        recordSize: 0,
        note: '球门后方装饰 tile 及边界 metatile 填充',
        fields: [
            { offset: 0, size: 4, name: 'goalType', desc: '球门类型标识 (4 bytes)' },
            { offset: 4, size: 16, name: 'goalTiles', desc: '球门后方 tile 序列' },
            { offset: 20, size: 16, name: 'boundTiles', desc: '边界 tile 序列' },
            { offset: 36, size: 16, name: 'colorAttrs', desc: '颜色属性区' },
        ],
    },
    // ==========================================================
    // 14. 计数器初始值 — $A677-$A67A  (4 bytes)
    // ==========================================================
    {
        name: '计数器初始值表',
        addr: 0x4677,
        length: 4,
        recordSize: 0,
        note: '$8767 A767 重置计数器逻辑读取此表',
        fields: [
            { offset: 0, size: 1, name: 'counterA', desc: '计数器 A 初始值' },
            { offset: 1, size: 1, name: 'counterB', desc: '计数器 B 初始值' },
            { offset: 2, size: 1, name: 'flagC', desc: '标志 C' },
            { offset: 3, size: 1, name: 'flagD', desc: '标志 D' },
        ],
    },
    // ==========================================================
    // 15. AADF 镜头/滚动低字节表 — $AADF-$AB1E  (64 bytes)
    // ==========================================================
    {
        name: '镜头滚动低字节表 (AADF)',
        addr: 0x4ADF,
        length: 64,
        recordSize: 2,
        note: '$8308 读取: LDA $AADF,Y → ADC ram_00E6,X。每 2 字节: [signed deltaLo, signed deltaHi] = 16-bit 有符号增量加到 X scroll',
        fields: [
            { offset: 0, size: 1, name: 'dxLo', desc: '水平滚动 delta 低字节 (signed 8)' },
            { offset: 1, size: 1, name: 'dxHi', desc: '水平滚动 delta 高字节 (signed 8)' },
        ],
    },
    // ==========================================================
    // 16. AAE0 镜头/滚动高字节表 — $AAE0-$AB1E  (63 bytes)
    // ==========================================================
    {
        name: '镜头滚动高字节表 (AAE0)',
        addr: 0x4AE0,
        length: 63,
        recordSize: 2,
        note: '$8312 读取: LDA $AAE0,Y → ADC ram_007A,X。Y 方向滚动 delta',
        fields: [
            { offset: 0, size: 1, name: 'dyLo', desc: '垂直滚动 delta 低字节 (signed 8)' },
            { offset: 1, size: 1, name: 'dyHi', desc: '垂直滚动 delta 高字节 (signed 8)' },
        ],
    },
];
