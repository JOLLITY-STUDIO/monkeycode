"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_50_CPU_ADDR = exports.CHR_CFG_50_HEADER = void 0;
/**
 * chr-cfg-50 — bank07 CHR 配置 80
 *
 * 数据源：bank07 CPU $AC7B (偏移 0x0C7B)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0C93
 */
exports.CHR_CFG_50_HEADER = [
    0x5C, 0x5E, 0x0F, 0x02, 0x08, 0x10
];
exports.CHR_CFG_50_CPU_ADDR = 0xAC7B;
