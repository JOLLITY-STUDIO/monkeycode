"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_34_CPU_ADDR = exports.CHR_CFG_34_HEADER = void 0;
/**
 * chr-cfg-34 — bank07 CHR 配置 52
 *
 * 数据源：bank07 CPU $A793 (偏移 0x0793)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x07B3
 */
exports.CHR_CFG_34_HEADER = [
    0x5C, 0x5E, 0x0A, 0x03, 0x08, 0x08
];
exports.CHR_CFG_34_CPU_ADDR = 0xA793;
