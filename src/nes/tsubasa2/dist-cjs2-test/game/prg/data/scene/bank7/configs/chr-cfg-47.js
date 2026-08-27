"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_47_CPU_ADDR = exports.CHR_CFG_47_HEADER = void 0;
/**
 * chr-cfg-47 — bank07 CHR 配置 71
 *
 * 数据源：bank07 CPU $AA4B (偏移 0x0A4B)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0A63
 */
exports.CHR_CFG_47_HEADER = [
    0x44, 0x46, 0x10, 0x02, 0x08, 0x10
];
exports.CHR_CFG_47_CPU_ADDR = 0xAA4B;
