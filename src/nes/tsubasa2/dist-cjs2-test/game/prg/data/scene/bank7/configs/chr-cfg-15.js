"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_15_CPU_ADDR = exports.CHR_CFG_15_HEADER = void 0;
/**
 * chr-cfg-15 — bank07 CHR 配置 21
 *
 * 数据源：bank07 CPU $A31C (偏移 0x031C)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0337
 */
exports.CHR_CFG_15_HEADER = [
    0x76, 0x7E, 0x81, 0x03, 0x06, 0x19
];
exports.CHR_CFG_15_CPU_ADDR = 0xA31C;
