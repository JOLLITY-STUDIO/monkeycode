"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_49_CPU_ADDR = exports.CHR_CFG_49_HEADER = void 0;
/**
 * chr-cfg-49 — bank07 CHR 配置 73
 *
 * 数据源：bank07 CPU $AA7C (偏移 0x0A7C)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0A8A
 */
exports.CHR_CFG_49_HEADER = [
    0x3C, 0x6A, 0x0B, 0x02, 0x03, 0x15
];
exports.CHR_CFG_49_CPU_ADDR = 0xAA7C;
