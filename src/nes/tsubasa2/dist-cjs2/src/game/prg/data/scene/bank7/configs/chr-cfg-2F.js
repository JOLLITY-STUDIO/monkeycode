"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_2F_CPU_ADDR = exports.CHR_CFG_2F_HEADER = void 0;
/**
 * chr-cfg-2F — bank07 CHR 配置 47
 *
 * 数据源：bank07 CPU $A6DF (偏移 0x06DF)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x06F3
 */
exports.CHR_CFG_2F_HEADER = [
    0x3C, 0x62, 0x09, 0x02, 0x06, 0x11
];
exports.CHR_CFG_2F_CPU_ADDR = 0xA6DF;
