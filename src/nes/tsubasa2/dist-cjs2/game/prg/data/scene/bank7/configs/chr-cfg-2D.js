"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_2D_CPU_ADDR = exports.CHR_CFG_2D_HEADER = void 0;
/**
 * chr-cfg-2D — bank07 CHR 配置 45
 *
 * 数据源：bank07 CPU $A69E (偏移 0x069E)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x06C7
 */
exports.CHR_CFG_2D_HEADER = [
    0x3C, 0x3E, 0x00, 0x02, 0x10, 0x10
];
exports.CHR_CFG_2D_CPU_ADDR = 0xA69E;
