"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_31_CPU_ADDR = exports.CHR_CFG_31_HEADER = void 0;
/**
 * chr-cfg-31 — bank07 CHR 配置 49
 *
 * 数据源：bank07 CPU $A70B (偏移 0x070B)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0753
 */
exports.CHR_CFG_31_HEADER = [
    0x5C, 0x5E, 0x0A, 0x04, 0x10, 0x00
];
exports.CHR_CFG_31_CPU_ADDR = 0xA70B;
