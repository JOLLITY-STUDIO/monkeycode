"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_59_CPU_ADDR = exports.CHR_CFG_59_HEADER = void 0;
/**
 * chr-cfg-59 — bank07 CHR 配置 89
 *
 * 数据源：bank07 CPU $AD9C (偏移 0x0D9C)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0DC4
 */
exports.CHR_CFG_59_HEADER = [
    0x3C, 0x4C, 0x00, 0x04, 0x08, 0x07
];
exports.CHR_CFG_59_CPU_ADDR = 0xAD9C;
