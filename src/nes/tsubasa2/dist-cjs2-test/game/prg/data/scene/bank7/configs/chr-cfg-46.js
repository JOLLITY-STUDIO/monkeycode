"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_46_CPU_ADDR = exports.CHR_CFG_46_HEADER = void 0;
/**
 * chr-cfg-46 — bank07 CHR 配置 70
 *
 * 数据源：bank07 CPU $AA31 (偏移 0x0A31)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0A4B
 */
exports.CHR_CFG_46_HEADER = [
    0x44, 0x46, 0x10, 0x03, 0x06, 0x09
];
exports.CHR_CFG_46_CPU_ADDR = 0xAA31;
