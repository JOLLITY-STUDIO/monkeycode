"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_12_CPU_ADDR = exports.CHR_CFG_12_HEADER = void 0;
/**
 * chr-cfg-12 — bank07 CHR 配置 18
 *
 * 数据源：bank07 CPU $A2D4 (偏移 0x02D4)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x02EC
 */
exports.CHR_CFG_12_HEADER = [
    0x3C, 0x3E, 0x00, 0x02, 0x08, 0x10
];
exports.CHR_CFG_12_CPU_ADDR = 0xA2D4;
