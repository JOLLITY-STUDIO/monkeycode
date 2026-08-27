"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_4C_CPU_ADDR = exports.CHR_CFG_4C_HEADER = void 0;
/**
 * chr-cfg-4C — bank07 CHR 配置 76
 *
 * 数据源：bank07 CPU $AABA (偏移 0x0ABA)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0AD2
 */
exports.CHR_CFG_4C_HEADER = [
    0x44, 0x46, 0x10, 0x02, 0x08, 0x10
];
exports.CHR_CFG_4C_CPU_ADDR = 0xAABA;
