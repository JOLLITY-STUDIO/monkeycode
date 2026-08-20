"use strict";
/**
 * 比赛配置数据 — bank7 指针表 + 各场配置原始字节 + 字段偏移。
 *
 * 真实 ROM 结构 (2026-08 逆向):
 *   bank0 $8B1C: LDA ram_00ED (比赛索引); ASL; → 索引×2
 *   bank0 $8B28: STA ram_0063; ADC #$A0 → ram_0064=$A0 (指针表在 bank7 $A000区)
 *   bank0 $8B0D: LDX #$07; JSR $C4B9 (切 bank7 到 $A000 窗口)
 *   指针表 @ bank7 $8000(运行时$A000), 每项2字节小端, 索引=ram_00ED
 *   指针表项 → 配置数据 (bank7 内 $80xx-$A3xx 区)
 *
 * 配置数据是多级指针结构 (bank0 $8B31-$8B6F 读取链):
 *   cfg[0]: 二级指针低位 → 覆盖 ram_0063 (bank0 $8B39: STX ram_0063)
 *   cfg[1]: → ram_0064 ($8B37: STA ram_0064)
 *   之后 ram_0063 被覆盖, 用新指针读二级数据:
 *   二级数据[0]: ram_0075 ($8B3D)
 *   二级数据[1]: ram_0076 ($8B42)
 *   二级数据[2]: ram_0048 (& $3F) + ram_005B (高2位) ($8B47-$8B52)
 *   二级数据[3]: ram_005E ← 回合倒计时 ($8B55)
 *   二级数据[4]: ram_005F ($8B5A)
 *   二级数据[5]: ram_005C (& $F8) ($8B5F)
 *
 * 二级指针值由 IRQ/任务恢复动态设置 (ram_003C/ram_007C 等), 静态提取困难。
 * 此模块记录一级配置字节 + 字段偏移, 供运行时二级指针解析完成后对齐。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RIO_CUP_CONFIG_BYTES = exports.MATCH_CONFIG_PTR_TABLE = void 0;
exports.getMatchConfig = getMatchConfig;
/** bank7 指针表 (索引→运行时$A0xx地址, 反汇编标注$8xxx) */
exports.MATCH_CONFIG_PTR_TABLE = [
    0xA0D4, 0xA0DF, 0xA127, 0xA13F, 0xA150, 0xA164, // idx 0-5 里约杯6场
    0xA174, 0xA190, 0xA1A1, 0xA1C9, // idx 6-9
    0xA1F1, 0xA22A, 0xA23B, 0xA274, 0xA284, 0xA294, // idx 10-15
    0xA2A4, 0xA2BC, 0xA2D4, 0xA2EC, 0xA304, 0xA31C, // idx 16-21
    0xA337, 0xA373, // idx 22-23
];
/** 里约杯6场配置原始字节 (反汇编偏移, 运行时=$A0xx) */
exports.RIO_CUP_CONFIG_BYTES = [
    // idx0 $A0D4: 7c 7e 81 01 03 1b 22 23 24 00 a0 3c 3e 02 04 10 00 42 42 42
    [0x7c, 0x7e, 0x81, 0x01, 0x03, 0x1b, 0x22, 0x23, 0x24, 0x00, 0xa0, 0x3c, 0x3e, 0x02, 0x04, 0x10, 0x00, 0x42, 0x42, 0x42],
    // idx1 $A0DF: 3c 3e 02 04 10 00 42 42 42 42 42 42 42 42 42 42 42 42 42 42
    [0x3c, 0x3e, 0x02, 0x04, 0x10, 0x00, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42],
    // idx2 $A127: 5c 5e 06 02 08 10 a5 a6 a7 a7 a7 a7 a7 a8 a9 4f aa ff ff ff
    [0x5c, 0x5e, 0x06, 0x02, 0x08, 0x10, 0xa5, 0xa6, 0xa7, 0xa7, 0xa7, 0xa7, 0xa7, 0xa8, 0xa9, 0x4f, 0xaa, 0xff, 0xff, 0xff],
    // idx3 $A13F: 3a 00 04 02 04 12 93 75 42 43 94 (后续待dump)
    [0x3a, 0x00, 0x04, 0x02, 0x04, 0x12, 0x93, 0x75, 0x42, 0x43, 0x94],
    // idx4 $A150: (待dump)
    [],
    // idx5 $A164: (待dump)
    [],
];
/**
 * 读取指定比赛索引的配置数据。
 * 对应 bank0 $8B1C-$8B6F: ram_00ED 索引 → 指针表 → 配置数据。
 * @param matchIdx 比赛索引 (ram_00ED)
 * @returns 配置字节数组 (多级指针结构, 字段含义待完整解析)
 */
function getMatchConfig(matchIdx) {
    if (matchIdx < 0 || matchIdx >= exports.RIO_CUP_CONFIG_BYTES.length)
        return [];
    return exports.RIO_CUP_CONFIG_BYTES[matchIdx];
}
