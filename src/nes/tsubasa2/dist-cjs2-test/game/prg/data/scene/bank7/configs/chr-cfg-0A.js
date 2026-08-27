"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_0A_CPU_ADDR = exports.CHR_CFG_0A_HEADER = void 0;
/**
 * chr-cfg-0A — bank07 CHR 配置 10
 *
 * 数据源：bank07 CPU $A1F1 (偏移 0x01F1)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x022A
 */
exports.CHR_CFG_0A_HEADER = [
    0x3C, 0x4C, 0x00, 0x04, 0x0C, 0x07
];
exports.CHR_CFG_0A_CPU_ADDR = 0xA1F1;
